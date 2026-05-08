import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prospectUrl, senderContext } = await req.json();

    if (!prospectUrl) {
      return NextResponse.json({ error: 'Prospect URL is required' }, { status: 400 });
    }

    // Fetch prospect page content
    let prospectContent = '';
    try {
      const res = await fetch(prospectUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ReplyForge/1.0)' },
        signal: AbortSignal.timeout(8000),
      });
      const html = await res.text();
      // Strip HTML tags for a rough text extract
      prospectContent = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 3000);
    } catch {
      prospectContent = `Could not fetch content from ${prospectUrl}`;
    }

    const senderInfo = senderContext
      ? `The sender's pitch: ${senderContext}`
      : 'The sender wants to start a business conversation with this prospect.';

    const prompt = `You are an expert cold email copywriter. Write a personalized cold email based on the prospect information below.

Prospect URL: ${prospectUrl}
Prospect page content (scraped):
${prospectContent}

${senderInfo}

Write a cold email that:
- Has a compelling, personalized subject line (prefix with "Subject: ")
- Opens with a specific, genuine observation about the prospect (not generic flattery)
- Clearly states the value proposition in 1-2 sentences
- Ends with a low-friction CTA (e.g., "Worth a 15-min call?")
- Is under 150 words total
- Sounds human, not like a robot

Format: Subject line first, then a blank line, then the email body. No extra commentary.`;

    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }],
    });

    const email = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ email });
  } catch (err) {
    console.error('Generate error:', err);
    return NextResponse.json({ error: 'Failed to generate email' }, { status: 500 });
  }
}

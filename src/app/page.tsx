'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [context, setContext] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateEmail = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setEmail('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospectUrl: input, senderContext: context }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setEmail(data.email);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="text-xl font-bold">ReplyForge</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/pricing" className="text-gray-400 hover:text-white text-sm transition">Pricing</a>
          <a
            href="/api/checkout"
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Get Pro →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Cold emails that actually<br />
          <span className="text-indigo-400">get replies.</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Paste a LinkedIn or company URL. Get a personalized cold email in seconds.<br />
          No templates. No fluff. Just emails that convert.
        </p>

        {/* Generator */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Prospect URL
            </label>
            <input
              type="url"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="https://linkedin.com/in/johndoe or https://acmecorp.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your pitch <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g. I help SaaS companies reduce churn with onboarding automation"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>
          <button
            onClick={generateEmail}
            disabled={loading || !input.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? '✨ Generating...' : '⚡ Generate Email'}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {email && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Your personalized email</label>
                <button
                  onClick={() => navigator.clipboard.writeText(email)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                >
                  Copy to clipboard
                </button>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-200 text-sm whitespace-pre-wrap leading-relaxed">
                {email}
              </div>
            </div>
          )}
        </div>

        <p className="text-gray-500 text-sm mt-4">3 free emails/month · No credit card required</p>
      </section>

      {/* Social proof */}
      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-500 text-sm mb-6">Built for founders, SDRs, and anyone who hates generic outreach</p>
        <div className="grid grid-cols-3 gap-6">
          {[
            { stat: '< 10s', label: 'to generate' },
            { stat: '3x', label: 'higher reply rates' },
            { stat: '$0', label: 'to start' },
          ].map(({ stat, label }) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="text-2xl font-bold text-indigo-400">{stat}</div>
              <div className="text-gray-400 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-6 text-center text-gray-600 text-sm">
        © 2026 ReplyForge · Built by Bobby ⚡
      </footer>
    </main>
  );
}

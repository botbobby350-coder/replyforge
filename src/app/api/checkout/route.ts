import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICES = {
  pro: 'price_1TUz0J2K7WqlXGcCYEyEdhQc',   // $29/mo
  team: 'price_1TUz0Z2K7WqlXGcCKFbAEhgE',  // $79/mo
};

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://replyforge-beta.vercel.app';
  const plan = req.nextUrl.searchParams.get('plan') || 'pro';
  const priceId = PRICES[plan as keyof typeof PRICES] || PRICES.pro;

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/?success=true`,
    cancel_url: `${appUrl}/pricing`,
  });

  return NextResponse.redirect(session.url!);
}

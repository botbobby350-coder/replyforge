import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'ReplyForge Pro',
            description: 'Unlimited AI-personalized cold emails',
          },
          unit_amount: 2900, // $29.00
          recurring: { interval: 'month' },
        },
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/?success=true`,
    cancel_url: `${appUrl}/pricing`,
  });

  return NextResponse.redirect(session.url!);
}

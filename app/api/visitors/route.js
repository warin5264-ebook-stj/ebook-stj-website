// app/api/visitors/route.js
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
  try {
    const pageviews = await kv.incr('pageviews');
    return NextResponse.json({ count: pageviews });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pageviews' }, { status: 500 });
  }
}
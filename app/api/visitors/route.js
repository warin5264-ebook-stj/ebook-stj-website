// app/api/visitors/route.js
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const revalidate = 0; // บอกให้ API นี้ไม่เก็บ Cache

export async function GET() {
  try {
    // บวกค่า 'pageviews' เพิ่ม 1 และดึงค่าใหม่กลับมา
    const pageviews = await kv.incr('pageviews');

    // ส่งค่า pageviews กลับไปเป็น JSON
    return NextResponse.json({ count: pageviews });
  } catch (error) {
    // ในกรณีที่เกิด Error
    return NextResponse.json({ error: 'Failed to fetch pageviews' }, { status: 500 });
  }
}
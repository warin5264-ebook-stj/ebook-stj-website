// app/api/dashboard/route.js
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const revalidate = 0; // ป้องกันการ Cache

// ฟังก์ชันสำหรับอ่านข้อมูลเริ่มต้นจากไฟล์ dashboards.json
function getInitialData() {
  const filePath = path.join(process.cwd(), 'data', 'dashboards.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent);
  return data;
}

// --- ฟังก์ชัน GET: สำหรับดึงข้อมูลไปแสดง ---
export async function GET() {
  try {
    const data = await kv.get('dashboards_data'); // เปลี่ยน key เป็น dashboards_data

    if (!data) {
      const initialData = getInitialData();
      return NextResponse.json(initialData);
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to get dashboards data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// --- ฟังก์ชัน POST: สำหรับรับข้อมูลใหม่มาบันทึก ---
export async function POST(request) {
  try {
    const newData = await request.json();
    await kv.set('dashboards_data', newData); // เปลี่ยน key เป็น dashboards_data
    return NextResponse.json({ message: 'Dashboard data updated successfully' });
  } catch (error) {
    console.error('Failed to update dashboards data:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
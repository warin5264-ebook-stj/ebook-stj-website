// app/api/dashboard/route.js
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import fs from 'fs'; // 1. Import 'fs' สำหรับอ่านไฟล์
import path from 'path'; // 2. Import 'path' สำหรับสร้างที่อยู่ไฟล์

export const revalidate = 0;

// ฟังก์ชันสำหรับอ่านข้อมูลเริ่มต้นจากไฟล์ JSON
function getInitialData() {
  // 3. สร้าง path ที่ถูกต้องไปยังไฟล์ data/dashboardData.json
  const filePath = path.join(process.cwd(), 'data', 'dashboardData.json');
  // 4. อ่านไฟล์ขึ้นมา
  const fileContent = fs.readFileSync(filePath, 'utf8');
  // 5. แปลงข้อความ JSON ให้เป็น Object
  const data = JSON.parse(fileContent);
  return data;
}

export async function GET() {
  try {
    const data = await kv.get('dashboard_data');

    if (!data) {
      // 6. ถ้าไม่มีข้อมูลใน KV ให้เรียกใช้ฟังก์ชันเพื่ออ่านจากไฟล์
      const initialData = getInitialData();
      return NextResponse.json(initialData);
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to get dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// ... ฟังก์ชัน POST เหมือนเดิม ...
export async function POST(request) {
  try {
    const newData = await request.json();
    await kv.set('dashboard_data', newData);
    return NextResponse.json({ message: 'Dashboard data updated successfully' });
  } catch (error) {
    console.error('Failed to update dashboard data:', error);
    return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
  }
}
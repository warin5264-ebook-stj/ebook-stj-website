// app/assessment/page.js
"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./assessment.module.css";
import NextImage from 'next/image'; // เปลี่ยนชื่อเป็น NextImage

const questions = [
  { id: 1, text: 'ไอทุกวันเกิน 2 สัปดาห์', score: 3 },
  { id: 2, text: 'ไอเป็นเลือดใน 1 เดือนที่ผ่านมา', score: 3 },
  { id: 3, text: 'ไอน้อยกว่า 2 สัปดาห์', score: 2 },
  { id: 4, text: 'น้ำหนักลดโดยไม่ทราบสาเหตุใน 1 เดือนที่ผ่านมา', score: 1 },
  { id: 5, text: 'มีไข้ทุกวันนาน 1 สัปดาห์ใน 1 เดือนที่ผ่านมา', score: 1 },
  { id: 6, text: 'เหงื่อออกผิดปกติตอนกลางคืนใน 1 เดือนที่ผ่านมา', score: 1 },
];

export default function AssessmentPage() {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [assessmentDate, setAssessmentDate] = useState(''); // 1. State ใหม่สำหรับเก็บวันที่

  const handleAnswerChange = (questionId, score) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: score,
    }));
  };
  
  // 2. ฟังก์ชันใหม่สำหรับจัดการเมื่อกดปุ่มดูผล
  const handleSubmit = () => {
    // สร้างวันที่และจัดรูปแบบเป็นภาษาไทย
    const today = new Date();
    const formattedDate = today.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setAssessmentDate(formattedDate);
    setShowResult(true);
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((total, score) => total + score, 0);
  };

  const totalScore = calculateScore();
  const result = totalScore >= 3 ? 'มีความเสี่ยง' : 'มีความเสี่ยงต่ำ';

  // 3. กรองเฉพาะคำถามที่ผู้ใช้ตอบว่า "มี" (คะแนน > 0)
  const answeredYes = questions.filter(q => answers[q.id] > 0);

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>แบบประเมินความเสี่ยงวัณโรค</h1>
          <p className={styles.subtitle}>
            เลือกอาการที่ตรงกับท่านมากที่สุดในแต่ละข้อ
          </p>
          
          <div className={styles.assessmentForm}>
            {/* ... ส่วนของคำถามเหมือนเดิม ... */}
            {questions.map((q) => (
              <div key={q.id} className={styles.questionRow}>
                <p className={styles.questionText}>{q.id}. {q.text}</p>
                <div className={styles.options}>
                  <label>
                    <input 
                      type="radio" 
                      name={`question-${q.id}`} 
                      onChange={() => handleAnswerChange(q.id, q.score)}
                    /> มี ({q.score} คะแนน)
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name={`question-${q.id}`} 
                      onChange={() => handleAnswerChange(q.id, 0)}
                      defaultChecked
                    /> ไม่มี (0 คะแนน)
                  </label>
                </div>
              </div>
            ))}
          </div>
          
          {/* 4. เปลี่ยน onClick ให้เรียกใช้ handleSubmit */}
          <button onClick={handleSubmit} className={styles.submitButton}>
            ดูผลประเมิน
          </button>

          {/* 5. อัปเดตส่วนแสดงผลลัพธ์ทั้งหมด */}
          {showResult && (
            <div className={`${styles.resultBox} ${result === 'มีความเสี่ยง' ? styles.risk : styles.noRisk}`}>
              <h2>ผลการประเมิน</h2>
              <p className={styles.dateText}>วันที่ประเมิน: {assessmentDate}</p>
              <p>คะแนนรวมของคุณคือ: <strong>{totalScore}</strong> คะแนน</p>
              <p>ผลลัพธ์: <strong>{result}</strong></p>
              <strong>หากคุณอยู่ในกลุ่มเสี่ยงเหล่านนี้  คุณควร ตรวจเอกซเรย์ปอด เพื่อคนหาวัณโรค อย่างน้อยปีละ 1 ครั้ง</strong><br />
               <div className={styles.imageContainer}>
                  <NextImage
                    src="/images/stj/risk-groups.png" // เปลี่ยนเป็นชื่อไฟล์รูปของคุณ
                    alt="ข้อมูลเพิ่มเติมเกี่ยวกับการตรวจวัณโรค"
                    width={700} // กำหนดความกว้างต้นฉบับ
                    height={400} // กำหนดความสูงต้นฉบับ
                    style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '1rem' }}
                  />
                </div>
              {/* เงื่อนไข: ถ้าคะแนน >= 3 ให้แสดงส่วนนี้ */}
              {totalScore >= 3 && (
                <div className={styles.recommendation}>
                  <p><strong>ท่านมีอาการที่เข้าข่ายสงสัยวัณโรค ดังนี้:</strong></p>
                  <ul className={styles.symptomList}>
                    {answeredYes.map(q => (
                      <li key={q.id}>{q.text}</li>
                    ))}
                  </ul>
                  <p className={styles.advice}>
                    <strong>รีบไปตรวจหาวัณโรค ให้เร็วที่สุด ณ โรงพยาบาลใกล้บ้าน</strong><br />
                    <strong>แนะนำให้บันทึกภาพหน้าจอนี้ และไปพบแพทย์เพื่อรับการตรวจวินิจฉัยโดยละเอียด</strong>
                    
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
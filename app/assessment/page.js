// app/assessment/page.js
"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./assessment.module.css";
import NextImage from 'next/image';

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
  const [assessmentDate, setAssessmentDate] = useState('');

  const handleAnswerChange = (questionId, score) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: score,
    }));
  };
  
  const handleSubmit = () => {
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
  const result = totalScore >= 3 ? 'มีความเสี่ยงสูงมาก' : 'มีความเสี่ยงต่ำ';
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
            {questions.map((q) => (
              <div key={q.id} className={styles.questionRow}>
                <p className={styles.questionText}>{q.id}. {q.text}</p>
                <div className={styles.options}>
                  <label>
                    <input type="radio" name={`question-${q.id}`} onChange={() => handleAnswerChange(q.id, q.score)} />
                    <span></span>
                     มี ({q.score} คะแนน)
                    
                  </label>
                  <label>
                    <input type="radio" name={`question-${q.id}`} onChange={() => handleAnswerChange(q.id, 0)} defaultChecked />
                    <span></span>
                     ไม่มี (0 คะแนน)
                  </label>
                </div>
              </div>
            ))}
          </div>
          
          <button onClick={handleSubmit} className={styles.submitButton}>
            ดูผลประเมิน
          </button>

          {showResult && (
            <div className={`${styles.resultBox} ${result === 'มีความเสี่ยงสูงมาก' ? styles.risk : styles.noRisk}`}>
              <h2>ผลการประเมิน</h2>
              <p className={styles.dateText}>วันที่ประเมิน: {assessmentDate}</p>
              <p>คะแนนรวมของคุณคือ: <strong><br></br><h2>{totalScore}</h2> คะแนน</strong></p>
              <p>ผลลัพธ์: <strong>{result}</strong></p>
              
              {/* --- ส่วนที่แก้ไขคือตรงนี้ --- */}
              {/* เงื่อนไข: ถ้าคะแนน < 3 (คือ 0, 1, 2) ให้แสดงส่วนนี้ */}
              {totalScore < 3 && (
                <div className={styles.generalAdvice}>
                  <strong>หากคุณอยู่ในกลุ่มเสี่ยงเหล่านี้ คุณควรตรวจเอกซเรย์ปอด เพื่อค้นหาวัณโรค อย่างน้อยปีละ 1 ครั้ง</strong>
                  <div className={styles.imageContainer}>
                    <NextImage
                      src="/images/stj/risk-groups.png"
                      alt="ข้อมูลเพิ่มเติมเกี่ยวกับการตรวจวัณโรค"
                      width={700}
                      height={400}
                      style={{ width: '100%', height: 'auto', borderRadius: '8px', marginTop: '1rem' }}
                    />
                  </div>
                </div>
              )}
              
              {/* เงื่อนไข: ถ้าคะแนน >= 3 ให้แสดงส่วนนี้ */}
              {totalScore >= 3 && (
                <div className={styles.recommendation}>
                  <p><strong>ท่านมีอาการที่เข้าข่ายสงสัยวัณโรค ดังนี้:</strong></p>
                  <ul className={styles.symptomList}>
                    {answeredYes.map(q => (
                      <li key={q.id}>{q.text}</li>
                    ))}
                  </ul>
                  {/* --- ส่วนที่แก้ไข: ใส่ div ครอบคำแนะนำสำคัญ --- */}
                  <div className={styles.importantAdviceBox}>
                    <p>
                      <strong>แนะนำให้บันทึกภาพหน้าจอนี้ และไปพบแพทย์เพื่อรับการตรวจวินิจฉัยโดยละเอียด ณ โรงพยาบาลใกล้บ้าน</strong>
                    </p>
                  </div>
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
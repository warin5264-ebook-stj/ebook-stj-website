// app/stj/[slug]/page.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from 'next/navigation';
import stjData from "@/data/stjContent.json";
import styles from "./stj-dynamic-page.module.css"; // ใช้ไฟล์ CSS ใหม่

// --- ฟังก์ชันสำหรับดึงข้อมูล ---
function getData(slug) {
  // ตรวจสอบว่าเป็นหน้า Category (s, t, j) หรือไม่
  if (['s', 't', 'j'].includes(slug)) {
    return {
      type: 'category',
      ...stjData[slug],
      letter: slug.toUpperCase()
    };
  }
  // ถ้าไม่ใช่ ให้ค้นหาใน Topic
  for (const key in stjData) {
    const foundTopic = stjData[key].topics.find(topic => topic.slug === slug);
    if (foundTopic) {
      return {
        type: 'topic',
        ...foundTopic,
        categoryTitle: stjData[key].title
      };
    }
  }
  return null;
}

export default function STJDynamicPage({ params }) {
  const data = getData(params.slug);

  if (!data) {
    notFound();
  }

  // --- การแสดงผลสำหรับหน้าสารบัญ ---
  if (data.type === 'category') {
    return (
      <div>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.category}>
              <h2>{data.letter} - {data.title}</h2>
              <ul>
                {data.topics.map((topic) => (
                  <li key={topic.slug}>
                    <Link href={`/stj/${topic.slug}`}>{topic.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- การแสดงผลสำหรับหน้าเนื้อหา ---
  if (data.type === 'topic') {
    return (
      <div>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <p className={styles.breadcrumb}>STJ Model / {data.categoryTitle}</p>
            <h1 className={styles.title}>{data.title}</h1>
            {data.images && data.images.length > 0 && (
              <div className={styles.imageGallery}>
                {data.images.map((imgSrc, index) => (
                  <div key={index} className={styles.imageContainer}>
                    <Image src={imgSrc} alt={`${data.title} image ${index + 1}`} width={800} // ยังคงใส่ width ไว้เพื่อ performance
                      height={1200} // เพิ่ม height ให้สูงขึ้นตามสัดส่วนรูปแนวตั้ง
                      style={{ width: '100%', height: 'auto' }} // <-- เพิ่มบรรทัดนี้
                      className={styles.topicImage}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className={styles.content}>
              {data.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return null; // Fallback
}
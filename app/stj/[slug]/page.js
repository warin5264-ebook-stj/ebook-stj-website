// app/stj/[slug]/page.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image"; // 1. ตรวจสอบว่า Import Image แล้ว
import { notFound } from 'next/navigation';
import stjData from "@/data/stjContent.json";
import styles from "./stj-topic.module.css";

// ... (ฟังก์ชัน getTopicData เหมือนเดิม)
function getTopicData(slug) {
  for (const key in stjData) {
    const foundTopic = stjData[key].topics.find(topic => topic.slug === slug);
    if (foundTopic) {
      return {
        ...foundTopic,
        category: stjData[key].title
      };
    }
  }
  return null;
}

export default function STJTopicPage({ params }) {
  const topic = getTopicData(params.slug);

  if (!topic) {
    notFound();
  }

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <p className={styles.breadcrumb}>STJ Model / {topic.category}</p>
          <h1 className={styles.title}>{topic.title}</h1>
          
           {/* --- แก้ไขส่วนนี้ --- */}
          {/* ตรวจสอบว่ามี images และ array ไม่ว่าง */}
          {topic.images && topic.images.length > 0 && (
            <div className={styles.imageGallery}>
              {topic.images.map((imgSrc, index) => (
                <div key={index} className={styles.imageContainer}>
                  <Image 
                    src={imgSrc} 
                    alt={`${topic.title} image ${index + 1}`} 
                    width={800} 
                    height={450}
                    className={styles.topicImage}
                  />
                </div>
              ))}
            </div>
          )}

          <div className={styles.content}>
            {topic.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
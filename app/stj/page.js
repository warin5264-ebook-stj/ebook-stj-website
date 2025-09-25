// app/stj/page.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import stjData from "@/data/stjContent.json";
import styles from "./stj.module.css";
import InteractiveCard from "@/components/InteractiveCard"; // 1. Import Component ใหม่เข้ามา

// 2. จัดการข้อมูลสำหรับการ์ดแบบ Interactive
const stjCardsData = [
  {
    letter: 'S',
    title: 'Screening',
    description: 'กระบวนการค้นหาผู้ป่วยวัณโรคในชุมชน ได้อย่างรวดเร็วและมีประสิทธิภาพ',
    hoverImage: '/images/stj/s-card.png' // อย่าลืมใส่รูปภาพของคุณที่นี่
  },
  {
    letter: 'T',
    title: 'Treatment',
    description: 'กระบวนการรักษาผู้ป่วยวัณโรค ให้ได้รับการดูแลรักษาตามมาตรฐาน อย่างต่อเนื่องในชุมชนจนสิ้นสุดการรักษา',
    hoverImage: '/images/stj/t-card.png' // อย่าลืมใส่รูปภาพของคุณที่นี่
  },
  {
    letter: 'J',
    title: 'Join team',
    description: 'กระบวนการดูแลผู้ป่วยวัณโรคและการเฝ้าระวัง ป้องกัน ในชุมชน ด้วยการประสานงานภาคีเครือข่ายทุกภาคส่วน',
    hoverImage: '/images/stj/j-card.png' // อย่าลืมใส่รูปภาพของคุณที่นี่
  }
];

export default function STJPage() {
  const { s, t, j } = stjData;

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.mainTitle}>STJ TB Model</h1>
          <p className={styles.description}>
            STJ TB model คือ รูปแบบการเฝ้าระวัง ป้องกัน ควบคุมวัณโรค ที่พัฒนาขึ้นเพื่อตอบสนองต่อสถานการณ์วัณโรคในพื้นที่จังหวัดอุบลราชธานี โมเดลนี้เน้นการมีส่วนร่วมของชุมชน หน่วยงานสาธารณสุขทุกระดับ และภาคีเครือข่ายทุกภาคส่วน เพื่อให้การค้นหาผู้ป่วยและการดูแลผู้ป่วยวัณโรคเป็นไปอย่างมีคุณภาพ และประสิทธิภาพ
          </p>
          
          {/* 3. เปลี่ยนจากการ์ดแบบเดิมเป็นการ์ด Interactive */}
          <div className={styles.principles}>
            {stjCardsData.map(card => (
              <InteractiveCard 
                key={card.letter}
                letter={card.letter}
                title={card.title}
                description={card.description}
                hoverImage={card.hoverImage}
              />
            ))}
          </div>

          {/* --- ส่วนของสารบัญลิงก์ยังคงอยู่เหมือนเดิม --- */}
          <div className={styles.category}>
            <h2>S - {s.title}</h2>
            <ul>
              {s.topics.map((topic) => (
                <li key={topic.slug}>
                  <Link href={`/stj/${topic.slug}`}>{topic.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.category}>
            <h2>T - {t.title}</h2>
            <ul>
              {t.topics.map((topic) => (
                <li key={topic.slug}>
                  <Link href={`/stj/${topic.slug}`}>{topic.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.category}>
            <h2>J - {j.title}</h2>
            <ul>
              {j.topics.map((topic) => (
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
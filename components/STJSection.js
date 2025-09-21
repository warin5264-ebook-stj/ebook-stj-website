// components/STJSection.js
import React from 'react';
import styles from './STJSection.module.css'; // เราจะใช้ไฟล์ CSS เดิม แต่จะอัปเดตเนื้อหาข้างใน

const STJSection = () => {
  return (
    // ใช้ <section> เพื่อความหมายที่ดี และใช้ className จาก CSS Module
    <section className={styles.sectionContainer}>
      <h1 className={styles.title}>STJ Model คืออะไร?</h1>
      <p className={styles.description}>
        <strong>STJ Model</strong> คือรูปแบบการดำเนินงานเฝ้าระวัง ป้องกัน และควบคุมวัณโรคที่พัฒนาขึ้นเพื่อตอบสนองต่อสถานการณ์ในพื้นที่ โมเดลนี้เน้นการมีส่วนร่วมของชุมชน อสม. และหน่วยงานสาธารณสุขในระดับต่างๆ เพื่อให้การค้นหาผู้ป่วยและการดูแลเป็นไปอย่างมีประสิทธิภาพสูงสุด
      </p>

      <div className={styles.principles}>
        <div className={styles.principleCard}>
          <h2>S - Search</h2>
          <p>การค้นหาผู้ป่วยเชิงรุกในกลุ่มเสี่ยง เพื่อค้นหาผู้ป่วยให้ได้รวดเร็วที่สุด</p>
        </div>
        <div className={styles.principleCard}>
          <h2>T - Treat</h2>
          <p>การรักษาผู้ป่วยทุกรายด้วยระบบยามาตรฐาน พร้อมการติดตามอย่างใกล้ชิดเพื่อให้หายขาด</p>
        </div>
        <div className={styles.principleCard}>
          <h2>J - Joint</h2>
          <p>การประสานงานความร่วมมือจากทุกภาคส่วน ทั้งภาครัฐ เอกชน และชุมชน</p>
        </div>
      </div>
    </section>
  );
};

export default STJSection;
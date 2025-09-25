// components/HeroBanner.js
import Image from 'next/image';
import styles from './HeroBanner.module.css';

const HeroBanner = () => {
  return (
    <div className={styles.bannerContainer}>
      <Image
        src="/images/hero-banner.png" // เปลี่ยนเป็นชื่อไฟล์รูปของคุณ
        alt="Banner Image"
        fill // ทำให้รูปภาพเติมเต็มพื้นที่ของ Container
        style={{ objectFit: 'center' }} // ทำให้รูปภาพปรับขนาดแบบ Center
        priority // ให้โหลดรูปภาพนี้เป็นอันดับแรกๆ
      />
      {/* <div className={styles.overlay}>
        <h1 className={styles.bannerTitle}>E-Book STJ Model</h1>
        <p className={styles.bannerSubtitle}>เพื่อสุขภาพที่ดีของชุมชน</p>
      </div> */}
    </div>
  );
};

export default HeroBanner;
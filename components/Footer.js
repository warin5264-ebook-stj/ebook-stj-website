// components/Footer.js
"use client";

import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const currentYear = new Date().getFullYear() + 543;

  useEffect(() => {
    // ฟังก์ชันสำหรับเรียก API จริง
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitors');
        if (!response.ok) return; // ถ้า API error ก็ไม่ต้องทำอะไรต่อ
        const data = await response.json();
        setVisitorCount(data.count);
      } catch (error) {
        console.error('Could not fetch visitor count:', error);
      }
    };

    fetchVisitorCount();
  }, []); // [] หมายถึงให้รันแค่ครั้งแรกครั้งเดียว

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.info}>
          <h4>E-Book STJ TB Model</h4>
          <p>การพัฒนารูปแบบการเฝ้าระวัง ป้องกัน ควบคุมวัณโรค STJ TB Model จังหวัดอุบลราชธานี</p>
          <p>© {currentYear} กลุ่มงานควบคุมโรคติดต่อสำนักงานสาธารณสุข จังหวัดอุบลราชธานี (สสจ.)</p>
          <p>นายกฤศวิสุทธิ์ ธีวสุเกิดมงคล นักสาธารณสุขชำนาญการ</p>
          <p className={styles.footerLink}>
            <a href="https://www.tbthailand.org/" target="_blank" rel="noopener noreferrer">
              เว็บไซต์กองวัณโรค คลิกที่นี่
            </a>
          </p>
          
          <div className={styles.visitorCounter}>
            <p>จำนวนผู้เข้าชมเว็บไซต์: {visitorCount > 0 ? visitorCount.toLocaleString() : '...'}</p>
          </div>
        </div>
        <div className={styles.facebookPlugin}>
          <iframe 
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61561417884153&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
            width="340" 
            height="130" 
            style={{border:'none', overflow:'hidden'}} 
            scrolling="no" 
            frameBorder="0" 
            allowFullScreen={true} 
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
          </iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// // components/Footer.js
// "use client";

// import React, { useState, useEffect } from 'react';
// import styles from './Footer.module.css';

// const Footer = () => {
//   const [visitorCount, setVisitorCount] = useState(0);
//   const currentYear = new Date().getFullYear() + 543;

//   useEffect(() => {
//     // ฟังก์ชันสำหรับเรียก API
//     const fetchVisitorCount = async () => {
//       try {
//         // เปลี่ยนจากเลขสมมติเป็นการ fetch API จริง
//         const response = await fetch('/api/visitors');
//         const data = await response.json();
//         setVisitorCount(data.count);
//       } catch (error) {
//         console.error('Could not fetch visitor count:', error);
//       }
//     };

//     fetchVisitorCount();
//   }, []); // [] หมายถึงให้รันแค่ครั้งแรกครั้งเดียว

//   return (
//     <footer className={styles.footer}>
//       <div className={styles.footerContent}>
//         <div className={styles.info}>
//           <h4>E-Book STJ TB Model</h4>
//           <p>กลุ่มงานควบคุมโรคติดต่อ </p>
//           <p>© {currentYear} สำนักงานสาธารณสุขจังหวัดอุบลราชธานีฯ (สสจ.)</p>
          
//           <div className={styles.visitorCounter}>
//             <p>จำนวนผู้เข้าชมเว็บไซต์: {visitorCount > 0 ? visitorCount.toLocaleString() : '...'}</p>
//           </div>
//         </div>
//         <div className={styles.facebookPlugin}>
//           {/* ... โค้ด iframe ของ Facebook Plugin เหมือนเดิม ... */}
//           <iframe 
//             src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61561417884153&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
//             width="340" 
//             height="130" 
//             style={{border:'none', overflow:'hidden'}} 
//             scrolling="no" 
//             frameBorder="0" 
//             allowFullScreen={true} 
//             allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
//           </iframe>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
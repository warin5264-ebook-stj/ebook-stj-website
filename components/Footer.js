// components/Footer.js
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.info}>
          <h4>E-Book STJ Model</h4>
          <p>โครงการเฝ้าระวัง ป้องกัน และควบคุมวัณโรค</p>
          <p>© 2025 สำนักงานสาธารณสุขจังหวัด (สสจ.)</p>
        </div>
        <div className={styles.facebookPlugin}>
          <iframe 
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61561417884153&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=836581391386386"
            width="340" 
            height="500" 
            style={{border:'none', overflow:'hidden'}} 
            scrolling="no" 
            frameBorder="0" // แก้ไข 1: frameborder -> frameBorder
            allowFullScreen={true} // แก้ไข 2: allowfullscreen -> allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
          </iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
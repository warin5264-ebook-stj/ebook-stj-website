// components/LongButton.js
import Link from 'next/link';
import Image from 'next/image';
import styles from './LongButton.module.css';

const LongButton = () => {
  return (
    <div className={styles.container}>
      <Link href="/assessment" className={styles.buttonLink}>
        <Image
          src="/images/long-btn.png" // รูปสำหรับปุ่มยาว
          alt="Long Button"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </Link>
    </div>
  );
};

export default LongButton;
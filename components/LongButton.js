// components/LongButton.js
import Link from 'next/link';
import Image from 'next/image';
import styles from './LongButton.module.css';
import allButtons from '../data/buttons.json'; // 1. Import ข้อมูล

const LongButton = () => {
  // 2. ค้นหาข้อมูลของ Long Button (id: 100)
  const buttonData = allButtons.find(button => button.id === 100);

  // ถ้าหาไม่เจอ ก็ไม่ต้องแสดงผลอะไรเลย
  if (!buttonData) {
    return null;
  }

  return (
    <div className={styles.container}>
      {/* 3. เปลี่ยน div เป็น div ที่มี className */}
      <div className={styles.buttonCard}>
        <Link href={buttonData.href}>
          <div className={styles.imageContainer}>
            <Image
              src={buttonData.image}
              alt={buttonData.title}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </Link>
        <div className={styles.textContainer}>
          <h3 className={styles.buttonTitle}>{buttonData.title}</h3>
          <div className={styles.buttonTags}>
            {buttonData.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongButton;
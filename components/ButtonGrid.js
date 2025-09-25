// components/ButtonGrid.js
import Link from 'next/link';
import Image from 'next/image';
import styles from './ButtonGrid.module.css';

// 1. เพิ่ม id ที่ไม่ซ้ำกันให้ปุ่มแต่ละอัน
const allButtons = [
  { id: 1, image: '/images/btn-stj.png', href: '/stj' },
  { id: 2, image: '/images/btn-ebook.png', href: '/ebook' },
  { id: 3, image: '/images/btn-situation.png', href: '/situation' },
  { id: 4, image: '/images/btn4.jpg', href: '/contact' },
  { id: 5, image: '/images/btn5.jpg', href: '/link5' },
  { id: 6, image: '/images/btn6.jpg', href: '/link6' },
  { id: 7, image: '/images/btn7.jpg', href: '/link7' },
  { id: 8, image: '/images/Tuberculosis-and-tuberculosis-screening.png', href: '/link8' },
  { id: 9, image: '/images/btn9.jpg', href: '/link9' },
  { id: 10, image: '/images/btn10.jpg', href: '/link10' },
  { id: 11, image: '/images/btn11.jpg', href: '/link11' },
  { id: 12, image: '/images/btn12.jpg', href: '/link12' },
  { id: 13, image: '/images/btn13.jpg', href: '/link13' },
  { id: 14, image: '/images/btn14.jpg', href: '/link14' },
  { id: 15, image: '/images/btn15.jpg', href: '/link15' },
  { id: 16, image: '/images/btn16.jpg', href: '/link16' },
  { id: 17, image: '/images/btn17.jpg', href: '/link17' },
  { id: 18, image: '/images/btn18.jpg', href: '/link18' },
  { id: 19, image: '/images/btn19.jpg', href: '/link19' },
  { id: 20, image: '/images/btn20.jpg', href: '/link20' },
];

// 2. เปลี่ยน prop จาก count เป็น buttonIds
const ButtonGrid = ({ buttonIds }) => {
  // 3. กรองปุ่มตาม id ที่ส่งเข้ามา, ถ้าไม่ส่งมา ให้แสดงทั้งหมด
  const buttonsToShow = buttonIds
    ? allButtons.filter(button => buttonIds.includes(button.id))
    : allButtons;

  return (
    <div className={styles.gridContainer}>
      {buttonsToShow.map((button) => (
        // 4. เปลี่ยน key เป็น button.id เพื่อความแม่นยำ
        <Link key={button.id} href={button.href} className={styles.buttonLink}>
          <Image
            src={button.image}
            alt={`Button ${button.id}`}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </Link>
      ))}
    </div>
  );
};

export default ButtonGrid;
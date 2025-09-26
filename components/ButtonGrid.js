// components/ButtonGrid.js
import Link from 'next/link';
import Image from 'next/image';
import styles from './ButtonGrid.module.css';
import allButtons from '../data/buttons.json';

const ButtonGrid = ({ buttonIds }) => {
  const buttonsToShow = buttonIds
    ? allButtons.filter(button => buttonIds.includes(button.id))
    : allButtons;

  return (
    <div className={styles.gridContainer}>
      {buttonsToShow.map((button) => (
        <div key={button.id} className={styles.buttonCard}>
          <Link href={button.href}>
            <div className={styles.imageContainer}>
              <Image
                src={button.image}
                alt={button.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Link>
          <div className={styles.textContainer}>
            <h3 className={styles.buttonTitle}>{button.title}</h3>
            <div className={styles.buttonTags}>
              {button.tags.map(tag => (
                // --- แก้ไข className ที่บรรทัดนี้ ---
                <span key={tag} className={`${styles.tag} ${styles[tag.replace(/[^a-zA-Z0-9]/g, "")]}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ButtonGrid;
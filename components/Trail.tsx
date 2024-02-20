// Trail.tsx

import styles from './Trail.module.css';

export default function Trail(locale: string) {
  const tailMap = {
    '/en-US': {
      title: 'The goal is to provide value',
      description1: 'Efficiency and Productivity',
      description2: 'Security and Privacy Protection',
      description3: 'Flexibility and scalability',
    },
    '/zh-CN': {
      title: '以提供价值为目标',
      description1: '关注效率和生产力',
      description2: '安全性和隐私保护',
      description3: '灵活性和可扩展性',
    }
  }
  return (
    <div className={styles.trailContainer}>
      <h3 className={styles.sectionTitle}>{tailMap[locale].title}</h3>
      <p className={styles.trailDescription}>{tailMap[locale].description1}</p>
      <p className={styles.trailDescription}>{tailMap[locale].description2}</p>
      <p className={styles.trailDescription}>{tailMap[locale].description3}</p>
    </div>
  );
};

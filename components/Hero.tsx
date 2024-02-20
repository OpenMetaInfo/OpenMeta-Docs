import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero(locale: string) {
  const heroMap = {
    '/en-US': {
      headlineOne: 'Metadata-driven framework ',
      headlineTwo: 'Medium and large enterprise applications',
      subtitleOne: 'OpenMeta is a framework designed for medium to large-scale application.',
      subtitleTwo: 'Safety, professionalism, strict, and sustainable evolution.',
      cta: 'Get Started'
    },
    '/zh-CN': {
      headlineOne: '元数据驱动架构 ',
      headlineTwo: '中大型企业级应用',
      subtitleOne: 'OpenMeta 是基于元数据驱动的应用开发框架，定位中大型企业级应用。',
      subtitleTwo: '安全，专业，严谨，可持续演化，是 OpenMeta 追求的目标。',
      cta: '开始使用'
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.headline}>
          <p className={styles.head}>
            <span></span>
            <span>
              {heroMap[locale].headlineOne}<br className="max-md:_hidden" />
              {heroMap[locale].headlineTwo}
            </span>
            <span></span>
          </p>
        </h1>
        <p className={styles.subtitle}>
          {heroMap[locale].subtitleOne}<br className="max-md:_hidden" />
          {heroMap[locale].subtitleTwo}
        </p>
        <div className={styles.actions}>
          <Link className={styles.cta} href={`${locale}/docs`}>
            {heroMap[locale].cta}
          </Link>
          <a
            className={styles.secondaryAction}
            href="https://github.com/OpenMetaInfo/OpenMeta"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  )
}

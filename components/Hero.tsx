import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero(locale: string) {
  const heroMap = {
    '/en-US': {
      headlineOne: 'Metadata-driven framework ',
      headlineTwo: 'Built-in AI integration and interaction',
      subtitleOne: 'OpenMeta is an enterprise-grade framework with the upcoming milestone of open-sourcing ERP applications.',
      subtitleTwo: 'Safety, professionalism, strict, and sustainable evolution are the core values of OpenMeta.',
      cta: 'Start Reading'
    },
    '/zh-CN': {
      headlineOne: '元数据驱动架构 ',
      headlineTwo: '内置 AI 能力的企业级应用',
      subtitleOne: 'OpenMeta 是一个企业级应用开发框架，下一个里程碑是开源ERP应用。',
      subtitleTwo: '安全，专业，严谨，可持续演化，是 OpenMeta 的核心价值。',
      cta: '开始阅读'
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

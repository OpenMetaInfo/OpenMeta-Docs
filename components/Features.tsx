
import styles from './Features.module.css';

export default function Features(locale: string) {
  const featuresMap = {
    '/en-US': {
      feature1: 'Metadata Management',
      feature1Description: 'Model metadata, field metadata, interface metadata, etc. Metadata versioning and multi-environment publishing',
      feature2: 'Flow',
      feature2Description: 'Automation flows, business processes, scheduled task flows. Built-in AI integration and interaction capabilities.',
      feature3: 'OpenAPI',
      feature3Description: 'Standard OpenAPI, AI-understandable API, Swagger API documentation.',
      feature4: 'Security Control',
      feature4Description: 'ABAC fine-grained access control, row-level and field-level security, data encryption and masking, user security policies, etc.',
      feature5: 'Data Integration',
      feature5Description: 'Configurable data integration capabilities, API orchestration capabilities, common integration authentication.',
      feature6: 'Timeline Model',
      feature6Description: 'Configurable timeline model, supports querying data by effective date, business event tracking.',
      feature7: 'Multi-language',
      feature7Description: 'Interface localization, message localization, business data localization.',
      feature8: 'Multi-database',
      feature8Description: 'Supports mainstream relational databases, such as PostgreSQL, MySQL, etc., with database dialect abstraction.',
      feature9: 'Multi-tenancy',
    },
    '/zh-CN': {
      feature1: '元数据管理',
      feature1Description: '模型元数据，字段元数据，界面元数据等，元数据版本化和多环境发布。',
      feature2: 'Flow',
      feature2Description: '自动化流程，业务审批流程，定时任务流程，内置AI集成与交互能力。',
      feature3: 'OpenAPI',
      feature3Description: '标准 OpenAPI，AI 可理解的 API，Swagger 接口文档。',
      feature4: '安全管控',
      feature4Description: 'ABAC 细粒度权限管控，行级、字段级，数据加密、脱敏，用户安全策略等。',
      feature5: '数据集成',
      feature5Description: '可配置化数据集成能力，内外部接口编排，常见集成认证。',
      feature6: '时间轴模型',
      feature6Description: '可配置时间轴模型，支持按日期查询有效数据，业务事件追踪。',
      feature7: '多语言',
      feature7Description: '界面多语言，消息提示多语言，业务数据多语言。',
      feature8: '多数据库',
      feature8Description: '支持主流关系型数据库，PostgreSQL、MySQL 等，数据库方言抽象。',
      feature9: '多租户',
      feature9Description: '支持多租户共享 Schema，仅用于标准化 SaaS 场景。',
    }
  }
  return (
    <div className={styles.featuresContainer}>
      <div className={styles.featureItem}>
        <h2>{featuresMap[locale].feature1}</h2>
        <p>{featuresMap[locale].feature1Description}</p>
      </div>
      <div className={styles.featureItem}>
        <h2>{featuresMap[locale].feature2}</h2>
        <p>{featuresMap[locale].feature2Description}</p>
      </div>
      <div className={styles.featureItem}>
        <h2>{featuresMap[locale].feature3}</h2>
        <p>{featuresMap[locale].feature3Description}</p>
      </div>
       <div className={styles.featureItem}>
        <h2>{featuresMap[locale].feature4}</h2>
        <p>{featuresMap[locale].feature4Description}</p>
      </div>
      <div className={styles.featureItem}>
        <h2>{featuresMap[locale].feature5}</h2>
        <p>{featuresMap[locale].feature5Description}</p>
      </div>
      <div className={styles.featureItem}>
        <h2>{featuresMap[locale].feature6}</h2>
        <p>{featuresMap[locale].feature6Description}</p>
      </div>
       <div className={styles.featureItem}>
        <h2>{featuresMap[locale].feature7}</h2>
        <p>{featuresMap[locale].feature7Description}</p>
      </div>
      <div className={styles.featureItem}>
        <h2>{featuresMap[locale].feature8}</h2>
        <p>{featuresMap[locale].feature8Description}</p>
      </div>
      <div className={styles.featureItem}>
        <h2>{featuresMap[locale].feature9}</h2>
        <p>{featuresMap[locale].feature9Description}</p>
      </div>
    </div>
  )
}

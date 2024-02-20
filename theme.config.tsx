import { useRouter } from 'next/router'
import { DocsThemeConfig, LocaleSwitch, ThemeSwitch, useConfig } from 'nextra-theme-docs'


const config: DocsThemeConfig = {
  logoLink: false,
  logo: () => {
    const { route } = useRouter()
    const locate = route.includes('/en-US') ? '/en-US' : '/zh-CN'
    return (
      <a className='_flex _items-center hover:_opacity-75 ltr:_mr-auto rtl:_ml-auto' href={locate}>
        <p style={{ display: 'flex', alignItems: 'center' }}><img src="/icon.png" alt="OpenMeta" width={56} height={56} /> OpenMeta</p>
      </a>
    )
  },
  i18n: [
    { locale: 'en-US', name: 'English' },
    { locale: 'zh-CN', name: '简体中文' }
  ],
  project: {
    link: 'https://github.com/OpenMetaInfo/OpenMeta',
  },
  docsRepositoryBase: 'https://github.com/OpenMetaInfo/OpenMeta-Docs',
  navbar: {
    extraContent: () => {
      return (
        <>
          {ThemeSwitch({ lite: true, className: 'button-switch theme-switch' })}
          {LocaleSwitch({ lite: false, className: 'button-switch' })}
        </>
      )
    }
  },
  editLink: {
    content: 'Edit this page on GitHub →'
  },
  footer: {
    content: (
      <span>
        Copyright ©{new Date().getFullYear()} OpenMeta
      </span>
    )
  },
  head: function useHead() {
    const config = useConfig()
    const logo = 'https://openmeta.info/logo.png'
    const title = config.title + ' - OpenMeta'
    const description = 'Metadata-driven application development framework'
    return (
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta name="og:image" content={logo} />
        <meta name="og:description" content={description} />

        <meta name="apple-mobile-web-app-title" content="OpenMeta" />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={logo} />
        <meta name="twitter:site:domain" content="openmeta.info" />
        <meta name="twitter:url" content="https://openmeta.info" />
      </>
    )
  },
}

export default config

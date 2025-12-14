export default {
  title: 'Quik',
  description: '响应式XML UI框架 - 无需QML的Qt响应式界面开发',
  lang: 'zh-CN',
  
  // GitHub Pages 部署时需要设置 base 路径
  // 如果部署到 https://<username>.github.io/quik-docs/，则设置为 '/quik-docs/'
  // 如果部署到 https://<username>.github.io/，则设置为 '/'
  base: '/quik-docs/',

  markdown: {
    // 代码块行号
    lineNumbers: false,
    // 代码块主题
    theme: 'one-dark-pro',
    
    // 代码块容器配置
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/quik-docs/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'Quik - 响应式XML UI框架' }],
    ['meta', { name: 'og:description', content: '无需QML，用XML声明式构建Qt响应式界面' }],
  ],
  
  appearance: 'dark',  // 默认暗黑主题
  
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Quik',
    
    nav: [
      { text: '📖 指南', link: '/guide/introduction' },
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '简介', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装配置', link: '/guide/installation' }
          ]
        },
        {
          text: '核心概念',
          link: '/guide/core-concepts',
          items: [
            { text: '声明式 UI', link: '/guide/declarative-ui' },
            { text: '响应式绑定', link: '/guide/reactive-bindng' },
            { text: '循环渲染 (q-for)', link: '/guide/list-rendering' },
            { text: 'UI 热更新', link: '/guide/hot-reload' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liewstar/quik' }
    ],
    
    footer: {
      message: '基于 MIT 协议开源',
      copyright: 'Copyright © 2025 Quik'
    },
    
    editLink: {
      pattern: 'https://github.com/liewstar/quik-docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },
    
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },
    
    outline: {
      level: [2, 3],
      label: '页面导航'
    }
  }
}

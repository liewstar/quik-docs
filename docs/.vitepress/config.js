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
  
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Quik',
    
    nav: [
      { text: '📖 指南', link: '/guide/introduction' },
      { text: '🔧 API', link: '/api/overview' },
      { text: '💡 示例', link: '/examples/basic' },
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: '入门',
          items: [
            { text: '简介', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装配置', link: '/guide/installation' }
          ]
        },
        {
          text: '核心概念',
          items: [
            { text: 'XML语法', link: '/guide/xml-syntax' },
            { text: '数据绑定', link: '/guide/data-binding' },
            { text: '条件表达式', link: '/guide/expressions' },
            { text: 'ViewModel', link: '/guide/viewmodel' }
          ]
        },
        {
          text: '组件',
          items: [
            { text: '组件概览', link: '/guide/widgets-overview' },
            { text: '输入组件', link: '/guide/input-widgets' },
            { text: '容器组件', link: '/guide/container-widgets' },
            { text: '布局组件', link: '/guide/layout-widgets' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API参考',
          items: [
            { text: '概览', link: '/api/overview' },
            { text: 'XMLUIBuilder', link: '/api/xmluibuilder' },
            { text: 'QuikViewModel', link: '/api/viewmodel' },
            { text: 'QuikContext', link: '/api/context' },
            { text: 'ExpressionParser', link: '/api/expression-parser' },
            { text: 'WidgetFactory', link: '/api/widget-factory' }
          ]
        }
      ],
      '/examples/': [
        {
          text: '示例',
          items: [
            { text: '基础示例', link: '/examples/basic' },
            { text: '表单示例', link: '/examples/form' },
            { text: '高级用法', link: '/examples/advanced' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liewstar/quik' }
    ],
    
    footer: {
      message: '基于 MIT 协议开源',
      copyright: 'Copyright © 2025 Quik | 用 ❤️ 构建'
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

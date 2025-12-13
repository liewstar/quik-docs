export default {
  title: 'Quik',
  description: '响应式XML UI框架 - 无需QML的Qt响应式界面开发',
  lang: 'zh-CN',
  
  // GitHub Pages 部署时需要设置 base 路径
  // 如果部署到 https://<username>.github.io/quik-docs/，则设置为 '/quik-docs/'
  // 如果部署到 https://<username>.github.io/，则设置为 '/'
  base: '/quik-docs/',
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: 'API', link: '/api/overview' },
      { text: '示例', link: '/examples/basic' },
      { text: 'GitHub', link: 'https://github.com/liewstar/quik' }
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
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Quik'
    },
    
    search: {
      provider: 'local'
    },
    
    outline: {
      level: [2, 3],
      label: '页面导航'
    }
  }
}

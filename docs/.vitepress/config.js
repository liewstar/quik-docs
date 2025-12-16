export default {
  title: 'Quik',
  description: '响应式XML UI框架 - 无需QML的Qt响应式界面开发',
  
  // GitHub Pages 部署时需要设置 base 路径
  // 如果部署到 https://<username>.github.io/quik-docs/，则设置为 '/quik-docs/'
  // 如果部署到 https://<username>.github.io/，则设置为 '/'
  base: '/quik-docs/',

  markdown: {
    // 代码块行号
    lineNumbers: false,
    // 代码块主题
    theme: 'one-dark-pro'
  },

  head: [
    ['link', { rel: 'icon', href: '/quik-docs/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'Quik - Reactive XML UI Framework' }],
    ['meta', { name: 'og:description', content: 'Build reactive Qt UIs with XML - no QML required' }],
  ],
  
  appearance: 'dark',  // 默认暗黑主题

  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '📖 指南', link: '/guide/introduction' },
          { text: '🎮 演练场', link: '/guide/playground' },
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
            },
            {
              text: '工具',
              items: [
                { text: '🎮 在线演练场', link: '/guide/playground' },
                { text: '💻 VSCode 插件', link: '/guide/vscode-extension' }
              ]
            }
          ]
        },
        
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
        
        outline: {
          level: [2, 3],
          label: '页面导航'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: '📖 Guide', link: '/en/guide/introduction' },
          { text: '🎮 Playground', link: '/en/guide/playground' },
        ],
        
        sidebar: {
          '/en/guide/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Introduction', link: '/en/guide/introduction' },
                { text: 'Quick Start', link: '/en/guide/getting-started' },
                { text: 'Installation', link: '/en/guide/installation' }
              ]
            },
            {
              text: 'Core Concepts',
              link: '/en/guide/core-concepts',
              items: [
                { text: 'Declarative UI', link: '/en/guide/declarative-ui' },
                { text: 'Reactive Binding', link: '/en/guide/reactive-binding' },
                { text: 'List Rendering (q-for)', link: '/en/guide/list-rendering' },
                { text: 'Hot Reload', link: '/en/guide/hot-reload' }
              ]
            },
            {
              text: 'Tools',
              items: [
                { text: '🎮 Online Playground', link: '/en/guide/playground' },
                { text: '💻 VSCode Extension', link: '/en/guide/vscode-extension' }
              ]
            }
          ]
        },
        
        footer: {
          message: 'Released under the MIT License',
          copyright: 'Copyright © 2025 Quik'
        },
        
        editLink: {
          pattern: 'https://github.com/liewstar/quik-docs/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        },
        
        lastUpdated: {
          text: 'Last updated',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'short'
          }
        },
        
        docFooter: {
          prev: 'Previous',
          next: 'Next'
        },
        
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Theme',
        
        outline: {
          level: [2, 3],
          label: 'On this page'
        }
      }
    }
  },
  
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Quik',
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liewstar/quik' }
    ],
    
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
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
          },
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search'
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear query',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate'
                }
              }
            }
          }
        }
      }
    }
  }
}

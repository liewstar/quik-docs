<div align="center">

# 📖 Quik Docs

**Quik 框架官方文档**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![VitePress](https://img.shields.io/badge/VitePress-1.x-646CFF?logo=vite&logoColor=white)](https://vitepress.dev/) [![Deployed](https://img.shields.io/badge/docs-online-brightgreen)](https://liewstar.github.io/quik-docs/)

[🌐 在线文档](https://liewstar.github.io/quik-docs/) · [🚀 快速开始](https://liewstar.github.io/quik-docs/guide/getting-started) · [📚 API 参考](https://liewstar.github.io/quik-docs/api/overview)

[English](README_EN.md) | 中文

</div>

---

这是 [Quik](https://github.com/liewstar/quik) 框架的官方文档仓库，使用 [VitePress](https://vitepress.dev/) 构建。

## ✨ 文档内容

- **入门指南** - 快速上手 Quik 框架
- **XML 语法** - 声明式 UI 语法详解
- **组件参考** - 内置组件完整文档
- **API 参考** - C++ API 详细说明
- **示例教程** - 实战案例与最佳实践

## 🚀 本地运行

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run docs:dev
```

访问 `http://localhost:5173` 查看文档。

### 构建静态文件

```bash
npm run docs:build
```

构建产物位于 `docs/.vitepress/dist` 目录。

## 📁 目录结构

```
quik-docs/
├── docs/
│   ├── .vitepress/          # VitePress 配置
│   │   └── config.ts
│   ├── guide/               # 入门指南
│   ├── api/                 # API 参考
│   ├── components/          # 组件文档
│   ├── public/              # 静态资源
│   └── index.md             # 首页
├── package.json
└── README.md
```

## 🤝 贡献文档

欢迎贡献文档！如果你发现文档有错误或想添加新内容：

1. Fork 本仓库
2. 创建分支 (`git checkout -b docs/improve-xxx`)
3. 提交更改 (`git commit -m 'docs: 改进 xxx 文档'`)
4. 推送分支 (`git push origin docs/improve-xxx`)
5. 创建 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

## 🔗 相关项目

| 项目 | 描述 | 链接 |
|------|------|------|
| **Quik** | 核心框架 | [GitHub](https://github.com/liewstar/quik) |
| **Quik Docs** | 官方文档 | [GitHub](https://github.com/liewstar/quik-docs) · [在线文档](https://liewstar.github.io/quik-docs/) |
| **Quik VSCode** | VSCode 预览插件 | [GitHub](https://github.com/liewstar/quik-vscode) |

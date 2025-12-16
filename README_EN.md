<div align="center">

# 📖 Quik Docs

**Official Documentation for Quik Framework**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![VitePress](https://img.shields.io/badge/VitePress-1.x-646CFF?logo=vite&logoColor=white)](https://vitepress.dev/) [![Deployed](https://img.shields.io/badge/docs-online-brightgreen)](https://liewstar.github.io/quik-docs/)

[🌐 Online Docs](https://liewstar.github.io/quik-docs/) · [🚀 Quick Start](https://liewstar.github.io/quik-docs/guide/getting-started) · [📚 API Reference](https://liewstar.github.io/quik-docs/api/overview)

English | [中文](README.md)

</div>

---

This is the official documentation repository for the [Quik](https://github.com/liewstar/quik) framework, built with [VitePress](https://vitepress.dev/).

## ✨ Documentation Contents

- **Getting Started** - Quick introduction to Quik framework
- **XML Syntax** - Declarative UI syntax guide
- **Component Reference** - Complete built-in component documentation
- **API Reference** - Detailed C++ API documentation
- **Examples & Tutorials** - Practical examples and best practices

## 🚀 Run Locally

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run docs:dev
```

Visit `http://localhost:5173` to view the documentation.

### Build Static Files

```bash
npm run docs:build
```

Build output is located in `docs/.vitepress/dist` directory.

## 📁 Directory Structure

```
quik-docs/
├── docs/
│   ├── .vitepress/          # VitePress configuration
│   │   └── config.ts
│   ├── guide/               # Getting started guide
│   ├── api/                 # API reference
│   ├── components/          # Component documentation
│   ├── public/              # Static assets
│   └── index.md             # Homepage
├── package.json
└── README.md
```

## 🤝 Contributing

Documentation contributions are welcome! If you find errors or want to add new content:

1. Fork this repository
2. Create a branch (`git checkout -b docs/improve-xxx`)
3. Commit changes (`git commit -m 'docs: improve xxx documentation'`)
4. Push branch (`git push origin docs/improve-xxx`)
5. Create a Pull Request

## 📄 License

This project is open source under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Related Projects

| Project | Description | Links |
|---------|-------------|-------|
| **Quik** | Core Framework | [GitHub](https://github.com/liewstar/quik) |
| **Quik Docs** | Official Documentation | [GitHub](https://github.com/liewstar/quik-docs) · [Online Docs](https://liewstar.github.io/quik-docs/) |
| **Quik VSCode** | VSCode Preview Extension | [GitHub](https://github.com/liewstar/quik-vscode) |

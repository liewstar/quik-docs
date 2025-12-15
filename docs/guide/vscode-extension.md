# VSCode 插件

Quik 提供了一个 VSCode 扩展插件，让你可以在编辑器中实时预览 XML UI 文件。

## 功能特性

- 🚀 **实时预览** - 点击预览面板即可查看最新的 UI 效果
- 🎨 **WASM 驱动** - 使用 Qt WebAssembly 实现原生 Qt 渲染效果
- ⚡ **轻量快速** - 无需额外依赖
- 🔧 **简单易用** - 一键预览，支持快捷键

## 安装

### 方式一：从 VSIX 安装

1. 下载最新的 `.vsix` 文件
2. 在 VSCode 中按 `Ctrl+Shift+P`，输入 `Install from VSIX`
3. 选择下载的 `.vsix` 文件

### 方式二：从源码构建

```bash
cd quik-vscode/extension
npm install
npm run compile
npx vsce package
```

## 使用方法

### 打开预览

1. 打开任意 `.xml` 文件
2. 使用以下方式之一打开预览：
   - 按 `Ctrl+Shift+V`（macOS: `Cmd+Shift+V`）
   - 点击编辑器右上角的预览图标
   - 按 `Ctrl+Shift+P` 输入 `Quik: Preview XML`

### 刷新预览

编辑 XML 文件后，**点击预览面板**即可自动刷新显示最新效果。

::: tip 提示
预览面板不会自动刷新，这是为了避免打断你的编辑流程。只需点击预览区域即可更新。
:::

## 快捷键

| 命令 | Windows/Linux | macOS |
|------|---------------|-------|
| 打开预览 | `Ctrl+Shift+V` | `Cmd+Shift+V` |

## 示例

创建一个简单的 XML 文件并预览：

```xml
<Panel>
    <Label text="Hello Quik!" alignment="center"/>
    <LineEdit title="姓名" var="name" default=""/>
    <Slider title="音量" var="volume" min="0" max="100"/>
    <ProgressBar var="volume" min="0" max="100"/>
    <CheckBox title="启用通知" var="notify" default="1"/>
    <PushButton text="提交"/>
</Panel>
```

## 常见问题

### 预览加载缓慢？

首次加载需要下载 WASM 文件（约 30MB），后续会使用缓存。

### 预览显示空白？

请检查 XML 语法是否正确，确保根元素是有效的 Quik 组件。

## 源码

- [GitHub 仓库](https://github.com/liewstar/Quik)
- [问题反馈](https://github.com/liewstar/Quik/issues)

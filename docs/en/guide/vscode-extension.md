# VSCode Extension

Quik provides a VSCode extension that lets you preview XML UI files in real-time within the editor.

## Features

- 🚀 **Real-time Preview** - Click the preview panel to see the latest UI effect
- 🎨 **WASM Powered** - Uses Qt WebAssembly for native Qt rendering
- ⚡ **Lightweight & Fast** - No additional dependencies
- 🔧 **Easy to Use** - One-click preview with keyboard shortcuts

## Installation

### Method 1: Install from VSIX

1. Download the latest `.vsix` file
2. In VSCode, press `Ctrl+Shift+P`, type `Install from VSIX`
3. Select the downloaded `.vsix` file

### Method 2: Build from Source

```bash
cd quik-vscode/extension
npm install
npm run compile
npx vsce package
```

## Usage

### Open Preview

1. Open any `.xml` file
2. Use one of the following methods to open preview:
   - Press `Ctrl+Shift+V` (macOS: `Cmd+Shift+V`)
   - Click the preview icon in the top right corner of the editor
   - Press `Ctrl+Shift+P` and type `Quik: Preview XML`

### Refresh Preview

After editing the XML file, **click the preview panel** to automatically refresh and show the latest effect.

::: tip Note
The preview panel doesn't auto-refresh to avoid interrupting your editing flow. Just click the preview area to update.
:::

## Keyboard Shortcuts

| Command | Windows/Linux | macOS |
|---------|---------------|-------|
| Open Preview | `Ctrl+Shift+V` | `Cmd+Shift+V` |

## Example

Create a simple XML file and preview:

```xml
<Panel>
    <Label text="Hello Quik!" alignment="center"/>
    <LineEdit title="Name" var="name" default=""/>
    <Slider title="Volume" var="volume" min="0" max="100"/>
    <ProgressBar var="volume" min="0" max="100"/>
    <CheckBox title="Enable Notifications" var="notify" default="1"/>
    <PushButton text="Submit"/>
</Panel>
```

## FAQ

### Preview loading slowly?

First load needs to download WASM files (~30MB), subsequent loads will use cache.

### Preview showing blank?

Please check if XML syntax is correct, ensure root element is a valid Quik component.

## Source Code

- [GitHub Repository](https://github.com/liewstar/quik-vscode)
- [Issue Tracker](https://github.com/liewstar/quik-vscode/issues)

# Quik Playground WASM 文件

此目录用于托管 Quik 演练场所需的 WASM 文件。

## 需要的文件

请从 `quik-vscode/extension/wasm/` 目录复制以下文件到此目录：

- `qtloader.js` - Qt WASM 加载器
- `quik-preview.js` - Quik 预览脚本
- `quik-preview.wasm` - Quik WASM 二进制文件

## 复制命令

Windows (PowerShell):
```powershell
Copy-Item ..\..\..\quik-vscode\extension\wasm\qtloader.js .
Copy-Item ..\..\..\quik-vscode\extension\wasm\quik-preview.js .
Copy-Item ..\..\..\quik-vscode\extension\wasm\quik-preview.wasm .
```

Linux/macOS:
```bash
cp ../../../quik-vscode/extension/wasm/qtloader.js .
cp ../../../quik-vscode/extension/wasm/quik-preview.js .
cp ../../../quik-vscode/extension/wasm/quik-preview.wasm .
```

## 注意

由于 `.wasm` 文件较大（约 31MB），建议在 `.gitignore` 中排除它，并使用 Git LFS 或其他方式管理。

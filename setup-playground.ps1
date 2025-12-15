# Quik Playground Setup Script
# 复制 WASM 文件到文档 playground 目录

$sourceDir = "..\quik-vscode\extension\wasm"
$targetDir = "docs\public\playground"

Write-Host "Setting up Quik Playground..." -ForegroundColor Cyan

# 检查源目录
if (-not (Test-Path $sourceDir)) {
    Write-Host "Error: Source directory not found: $sourceDir" -ForegroundColor Red
    exit 1
}

# 创建目标目录
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
}

# 复制文件
$files = @("qtloader.js", "quik-preview.js", "quik-preview.wasm")

foreach ($file in $files) {
    $src = Join-Path $sourceDir $file
    $dst = Join-Path $targetDir $file
    
    if (Test-Path $src) {
        Write-Host "Copying $file..." -ForegroundColor Yellow
        Copy-Item $src $dst -Force
        Write-Host "  Done!" -ForegroundColor Green
    } else {
        Write-Host "Warning: $file not found in source" -ForegroundColor Yellow
    }
}

Write-Host "`nPlayground setup complete!" -ForegroundColor Green
Write-Host "You can now run 'npm run docs:dev' to test the playground." -ForegroundColor Cyan

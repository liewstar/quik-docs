# 快速开始

## 安装

```makefile
# .pro 文件
include(path/to/Quik/Quik.pri)
```

## 5 分钟体验 Quik 魔力

一个完整的联动面板：勾选启用 → 滑块可用 → 拖动同步进度条 → 点击按钮动态添加选项。

::: code-group
```xml [Panel.xml]
<Panel>
    <CheckBox title="启用" var="enable" default="1"/>
    <Slider title="音量" var="volume" min="0" max="100" enabled="$enable==1"/>
    <ProgressBar var="volume" min="0" max="100"/>
    <ComboBox title="模式" var="mode">
        <Choice q-for="item in modes" text="$item.label" val="$item.val"/>
    </ComboBox>
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="添加模式" var="btnAdd"/>
    </HLayoutWidget>
</Panel>
```

```cpp [main.cpp]
#include "Quik/Quik.h"

Quik::XMLUIBuilder builder;
QWidget* ui = Quik_BUILD(builder, "Panel.xml");  // 热更新自动启用

Quik::QuikViewModel vm(&builder);
auto enable = vm.var<bool>("enable");
auto volume = vm.var<int>("volume");
auto mode = vm.var<QString>("mode");
auto modes = vm.list("modes");
auto btnAdd = vm.button("btnAdd");

// 初始化下拉选项
modes = {
    {{"label", "快速"}, {"val", "fast"}},
    {{"label", "精确"}, {"val", "accurate"}}
};

// 监听变化
volume.watch([](int v) {
    // 拖动滑块时触发
});

// 按钮点击 → 动态添加选项
btnAdd.onClick([&]() {
    modes.append({{"label", "自定义"}, {"val", "custom"}});
});
```
:::

**你刚刚体验了**：
- **响应式绑定** - `var` 绑定变量，赋值即更新 UI
- **条件渲染** - `enabled="$enable==1"` 联动控制
- **共享变量** - 同一个 `volume` 驱动 Slider + ProgressBar
- **q-for 循环** - 数据驱动列表，`append` 即时生效
- **热更新** - 修改 XML 保存，UI 立即刷新

## 下一步

- [核心概念](/guide/core-concepts) - 深入理解 Quik 的设计

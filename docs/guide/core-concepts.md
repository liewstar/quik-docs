# 核心概念

Quik 的设计围绕四个核心能力，点击下方链接深入了解：

- **[声明式 UI](/guide/declarative-ui)** - 用 XML 描述界面结构，自动生成 Qt Widgets
- **[响应式绑定](/guide/reactive-bindng)** - 变量与 UI 双向同步，条件渲染，事件监听
- **[循环渲染 (q-for)](/guide/list-rendering)** - 数据驱动的列表渲染，动态增删自动同步
- **[UI 热更新](/guide/hot-reload)** - 修改 XML 即时刷新，无需重新编译

## 快速一览

::: code-group
```xml [Panel.xml]
<Panel>
    <CheckBox title="启用" var="enable" default="1"/>
    <LineEdit title="参数" var="param" visible="$enable==1"/>
    <ComboBox title="模式" var="mode">
        <Choice q-for="item in modes" text="$item.label" val="$item.val"/>
    </ComboBox>
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="执行" var="btnRun"/>
    </HLayoutWidget>
</Panel>
```

```cpp [main.cpp]
Quik::XMLUIBuilder builder;
QWidget* ui = Quik_BUILD(builder, "Panel.xml");

Quik::QuikViewModel vm(&builder);
auto enable = vm.var<bool>("enable");
auto param = vm.var<QString>("param");
auto mode = vm.var<QString>("mode");
auto modes = vm.list("modes");
auto btnRun = vm.button("btnRun");

modes = {
    {{"label", "快速"}, {"val", "fast"}},
    {{"label", "精确"}, {"val", "accurate"}}
};

enable.watch([](bool v) {
    // 值变化时触发
});

btnRun.onClick([&]() {
    if (enable) {
        run(mode, param);
    }
});
```
:::

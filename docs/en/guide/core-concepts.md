# Core Concepts

Quik's design revolves around four core capabilities. Click the links below to learn more:

- **[Declarative UI](/en/guide/declarative-ui)** - Describe interface structure with XML, auto-generate Qt Widgets
- **[Reactive Binding](/en/guide/reactive-binding)** - Two-way sync between variables and UI, conditional rendering, event listening
- **[List Rendering (q-for)](/en/guide/list-rendering)** - Data-driven list rendering, auto-sync on add/remove
- **[Hot Reload](/en/guide/hot-reload)** - Edit XML for instant refresh, no recompilation needed

## Quick Overview

::: code-group
```xml [Panel.xml]
<Panel>
    <CheckBox title="Enable" var="enable" default="1"/>
    <LineEdit title="Parameter" var="param" visible="$enable==1"/>
    <ComboBox title="Mode" var="mode">
        <Choice q-for="item in modes" text="$item.label" val="$item.val"/>
    </ComboBox>
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="Run" var="btnRun"/>
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
    {{"label", "Fast"}, {"val", "fast"}},
    {{"label", "Accurate"}, {"val", "accurate"}}
};

enable.watch([](bool v) {
    // Triggered on value change
});

btnRun.onClick([&]() {
    if (enable) {
        run(mode, param);
    }
});
```
:::

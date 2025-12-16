---
layout: home

hero:
  name: Quik
  text: Reactive XML UI Framework
  tagline: Build reactive Qt UIs with XML — no QML required. Simple, efficient, type-safe.
  image:
    src: /logo.svg
    alt: Quik Logo
  actions:
    - theme: brand
      text: 🚀 Quick Start
      link: /en/guide/getting-started
    - theme: alt
      text: 📖 Introduction
      link: /en/guide/introduction
    - theme: alt
      text: ⭐ GitHub
      link: https://github.com/liewstar/quik

features:
  - icon: 📝
    title: XML Declarative + Reactive Binding
    details: Define UI structure with XML, use $ expressions for conditional rendering, UI auto-updates on variable changes
  - icon: 🔄
    title: q-for List Rendering
    details: Data-driven list rendering, UI automatically syncs when data is added or removed
  - icon: ⚡
    title: Hot Reload
    details: Modify XML files during development, UI refreshes instantly without recompilation
  - icon: 🎯
    title: Variables as UI
    details: Use vm.var like regular variables, assignment equals UI update
---

<div class="vp-doc" style="padding: 0 24px; max-width: 1152px; margin: 0 auto;">

## 20 Lines of Code: Reactive Binding & Dynamic Lists

  - **Reactive Binding**: Check enable, slider/dropdown become available
  - **Shared Variables**: Same `volume` drives both Slider + ProgressBar
  - **Dynamic Lists**: Click button to instantly append dropdown options (`q-for`)
  - **Real-time Response**: Volume changes instantly update hint text (`watch`)
  - **Button Interaction**: Click button to add mode options

```xml[Panel.xml]
<Panel>
    <CheckBox title="Enable Binding" var="enable" default="1"/>
    <LineEdit title="Hint" var="message" enabled="0"/>
    <Slider title="Volume" var="volume" min="0" max="100" enabled="$enable==1"/>
    <ProgressBar var="volume" min="0" max="100"/>
    <ComboBox title="Mode" var="mode" enabled="$enable==1">
        <Choice q-for="item in modes" text="$item.label" val="$item.value"/>
    </ComboBox>
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="Add Mode" var="btnAddMode"/>
    </HLayoutWidget>
</Panel>
```

```cpp[main.cpp]
Quik::XMLUIBuilder builder;
QWidget* ui = Quik_BUILD(builder, "Panel.xml");  // Hot reload enabled

Quik::QuikViewModel vm(&builder);
auto enable = vm.var<bool>("enable");
auto message = vm.var<QString>("message");
auto volume = vm.var<int>("volume");
auto mode = vm.var<QString>("mode");
auto modes = vm.list("modes");
auto btnAddMode = vm.button("btnAddMode");

modes = {
    {{"label", "Fast"}, {"value", "fast"}},
    {{"label", "Standard"}, {"value", "normal"}},
    {{"label", "Accurate"}, {"value", "accurate"}}
};

volume.watch([&](int v) {
    message = QString("Current volume: %1").arg(v);
});

btnAddMode.onClick([&]() {
    modes.append({{"label", "Custom"}, {"value", "custom"}});
});
```

</div>

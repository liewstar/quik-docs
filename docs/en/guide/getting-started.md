# Quick Start

## Installation

```makefile
# .pro file
include(path/to/Quik/Quik.pri)
```

## Experience Quik Magic in 5 Minutes

A complete reactive panel: Check enable → Slider becomes available → Drag to sync progress bar → Click button to dynamically add options.

::: code-group
```xml [Panel.xml]
<Panel>
    <CheckBox title="Enable" var="enable" default="1"/>
    <Slider title="Volume" var="volume" min="0" max="100" enabled="$enable==1"/>
    <ProgressBar var="volume" min="0" max="100"/>
    <ComboBox title="Mode" var="mode">
        <Choice q-for="item in modes" text="$item.label" val="$item.val"/>
    </ComboBox>
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="Add Mode" var="btnAdd"/>
    </HLayoutWidget>
</Panel>
```

```cpp [main.cpp]
#include "Quik/Quik.h"

Quik::XMLUIBuilder builder;
QWidget* ui = Quik_BUILD(builder, "Panel.xml");  // Hot reload auto-enabled

Quik::QuikViewModel vm(&builder);
auto enable = vm.var<bool>("enable");
auto volume = vm.var<int>("volume");
auto mode = vm.var<QString>("mode");
auto modes = vm.list("modes");
auto btnAdd = vm.button("btnAdd");

// Initialize dropdown options
modes = {
    {{"label", "Fast"}, {"val", "fast"}},
    {{"label", "Accurate"}, {"val", "accurate"}}
};

// Watch for changes
volume.watch([](int v) {
    // Triggered when slider is dragged
});

// Button click → Dynamically add option
btnAdd.onClick([&]() {
    modes.append({{"label", "Custom"}, {"val", "custom"}});
});
```
:::

**What you just experienced**:
- **Reactive Binding** - `var` binds variables, assignment updates UI
- **Conditional Rendering** - `enabled="$enable==1"` reactive control
- **Shared Variables** - Same `volume` drives Slider + ProgressBar
- **q-for Loop** - Data-driven list, `append` takes effect instantly
- **Hot Reload** - Modify XML and save, UI refreshes immediately

## Next Steps

- [Core Concepts](/en/guide/core-concepts) - Deep dive into Quik's design

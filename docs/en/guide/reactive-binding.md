# Reactive Binding

Quik's core feature is reactive binding: when variable values change, UI updates automatically; when users interact with UI, variable values sync automatically.

## Variable Binding

Use the `var` attribute to bind a component to a variable:

```xml
<CheckBox title="Enable" var="enable"/>
<LineEdit title="Name" var="name"/>
<SpinBox title="Count" var="count"/>
```

In C++, access these variables through `QuikViewModel`:

```cpp
Quik::XMLUIBuilder builder;
QWidget* ui = Quik_BUILD(builder, "Panel.xml");

Quik::QuikViewModel vm(&builder);
auto enable = vm.var<bool>("enable");
auto name = vm.var<QString>("name");
auto count = vm.var<int>("count");
```

## Reading and Writing

`Var<T>` objects can be used like regular variables:

```cpp
// Read values
if (enable) {
    QString currentName = name;
    int currentCount = count;
}

// Write values - UI updates automatically
enable = true;      // CheckBox auto-checks
name = "Test";      // LineEdit auto-displays "Test"
count = 42;         // SpinBox auto-displays 42
```

You can also use explicit getter/setter methods:

```cpp
bool v = enable.get();
enable.set(true);
```

::: tip Two-way Binding
When users interact with UI (e.g., check a CheckBox, enter text), variable values update automatically. You can always read the latest values.
:::

## Supported Types

| Type | Corresponding Component | Example |
|------|------------------------|---------|
| bool | CheckBox | `vm.var<bool>("enable")` |
| int | SpinBox, Slider | `vm.var<int>("count")` |
| double | DoubleSpinBox | `vm.var<double>("precision")` |
| QString | LineEdit, ComboBox | `vm.var<QString>("name")` |

## Conditional Rendering

`visible` and `enabled` attributes support expressions to dynamically control component visibility and enabled state based on variable values:

```xml
<!-- Show when enable is true -->
<LineEdit title="Parameter" var="param" visible="$enable==1"/>

<!-- Enable when mode is "advanced" -->
<SpinBox title="Count" var="count" enabled="$mode==advanced"/>
```

Expression syntax:
- `$variableName` - Reference variable value
- `==` / `!=` - Comparison operators
- `and` / `or` - Logical operators

Compound condition examples:

```xml
<!-- Show only when both conditions are met -->
<GroupBox title="Advanced Settings" visible="$enable==1 and $mode==advanced"/>

<!-- Show when either condition is met -->
<Label text="Notice" visible="$error==1 or $warning==1"/>
```

::: warning Note
Boolean values in expressions use `1` and `0`, not `true` and `false`.
:::

## Watching Changes

Use the `watch` method to listen for variable value changes:

```cpp
auto enable = vm.var<bool>("enable");
auto mode = vm.var<QString>("mode");
auto count = vm.var<int>("count");

// Watch boolean changes
enable.watch([](bool v) {
    // v is the new value after change
});

// Watch string changes
mode.watch([](QString v) {
    // Triggered when user selects a different mode
});

// Watch integer changes, update other variables reactively
count.watch([&](int v) {
    // Example: sync update progress bar
    progress = v;
});
```

### Watching Multiple Variables

Use `vm.watch()` to watch multiple variables, callback triggers when any changes:

```cpp
auto enable = vm.var<bool>("enable");
auto mode = vm.var<QString>("mode");
auto count = vm.var<int>("count");

// Watch multiple variables (triggers on any change)
vm.watch({enable, mode, count}, [&]() {
    // Triggered when any one changes
    qDebug() << "enable:" << enable() << "mode:" << mode() << "count:" << count();
});
```

### Watching All Variables

Use `vm.watchAll()` to watch all variable changes:

```cpp
vm.watchAll([](const QString& name, const QVariant& value) {
    // Triggered when any variable changes
    qDebug() << name << "=" << value;
});
```

## Shared Variables Across Components

Multiple components can bind to the same variable name for reactive linking:

```xml
<CheckBox title="Enable Feature A" var="enable"/>
<CheckBox title="Enable Feature B" var="enable"/>
<LineEdit title="Parameter" var="param" visible="$enable==1"/>
```

In this example:
- Two CheckBoxes bind to the same `enable` variable
- Checking either one syncs the other
- LineEdit visibility toggles based on `enable` value

## Button Events

Buttons use `vm.button()` to get, bind click events with `onClick`:

```xml
<HLayoutWidget>
    <addStretch/>
    <PushButton text="Apply" var="btnApply"/>
    <PushButton text="Cancel" var="btnCancel"/>
</HLayoutWidget>
```

```cpp
auto btnApply = vm.button("btnApply");
auto btnCancel = vm.button("btnCancel");

btnApply.onClick([&]() {
    // Read current values and process
    if (enable) {
        applySettings(name, count);
    }
});

btnCancel.onClick([&dialog]() {
    dialog.reject();
});
```

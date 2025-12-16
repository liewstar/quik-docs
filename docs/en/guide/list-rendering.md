# List Rendering (q-for)

The `q-for` directive is used for data-driven list rendering. When data changes, UI automatically syncs.

## Basic Usage

Use the `q-for` directive in XML to iterate over a list:

```xml
<ComboBox title="Mode" var="mode">
    <Choice q-for="item in modes" text="$item.label" val="$item.value"/>
</ComboBox>
```

Define list data in C++:

```cpp
auto modes = vm.list("modes");

// Set data using initializer list
modes = {
    {{"label", "Fast Mode"}, {"value", "fast"}},
    {{"label", "Standard Mode"}, {"value", "normal"}},
    {{"label", "Accurate Mode"}, {"value", "accurate"}}
};
```

ComboBox will automatically generate three options, with display text from `label` and selected value from `value`.

## Syntax Format

`q-for` supports two syntaxes:

```xml
<!-- Simple iteration -->
<Choice q-for="item in modes" text="$item.label" val="$item.value"/>

<!-- Iteration with index -->
<Choice q-for="(item, idx) in modes" text="$item.label" val="$idx"/>
```

- `item` - Alias for current item, customizable
- `modes` - List variable name
- `idx` - Current index (starting from 0)
- `$item.xxx` - Access current item's property
- `$idx` - Access current index

## Data Structure

Each item in the list is a key-value map:

```cpp
// Each item contains multiple key-value pairs
modes = {
    {{"label", "Option A"}, {"value", "a"}, {"icon", "iconA.png"}},
    {{"label", "Option B"}, {"value", "b"}, {"icon", "iconB.png"}}
};
```

Access in XML via `$item.keyName`:

```xml
<Choice q-for="item in modes" 
        text="$item.label" 
        val="$item.value"
        icon="$item.icon"/>
```

## Dynamic Operations

Lists support dynamic add/remove/modify operations, UI syncs automatically:

```cpp
auto modes = vm.list("modes");

// Append an item
modes.append({{"label", "New Mode"}, {"value", "new"}});

// Clear list
modes.clear();

// Reassign
modes = {
    {{"label", "Mode 1"}, {"value", "1"}},
    {{"label", "Mode 2"}, {"value", "2"}}
};
```

::: tip Real-time Sync
All list operations are immediately reflected in the UI. For example, after calling `append`, ComboBox immediately adds a new option.
:::

## Applicable Components

`q-for` can be used in any scenario requiring repeated rendering:

```xml
<!-- ComboBox options -->
<ComboBox title="Select" var="selected">
    <Choice q-for="item in options" text="$item.text" val="$item.val"/>
</ComboBox>

<!-- Dynamically generate multiple buttons -->
<HLayoutWidget>
    <PushButton q-for="btn in buttons" text="$btn.text" var="$btn.id"/>
</HLayoutWidget>
```

# 循环渲染 (q-for)

`q-for` 指令用于数据驱动的列表渲染。当数据变化时，UI 自动同步更新。

## 基本用法

在 XML 中使用 `q-for` 指令遍历列表：

```xml
<ComboBox title="模式" var="mode">
    <Choice q-for="item in modes" text="$item.label" val="$item.value"/>
</ComboBox>
```

在 C++ 中定义列表数据：

```cpp
auto modes = vm.list("modes");

// 使用初始化列表设置数据
modes = {
    {{"label", "快速模式"}, {"value", "fast"}},
    {{"label", "标准模式"}, {"value", "normal"}},
    {{"label", "精确模式"}, {"value", "accurate"}}
};
```

ComboBox 会自动生成三个选项，显示文字为 `label`，选中值为 `value`。

## 语法格式

`q-for` 支持两种语法：

```xml
<!-- 简单遍历 -->
<Choice q-for="item in modes" text="$item.label" val="$item.value"/>

<!-- 带索引遍历 -->
<Choice q-for="(item, idx) in modes" text="$item.label" val="$idx"/>
```

- `item` - 当前项的别名，可以自定义
- `modes` - 列表变量名
- `idx` - 当前索引（从 0 开始）
- `$item.xxx` - 访问当前项的属性
- `$idx` - 访问当前索引

## 数据结构

列表中的每一项是一个键值对映射：

```cpp
// 每一项包含多个键值对
modes = {
    {{"label", "选项A"}, {"value", "a"}, {"icon", "iconA.png"}},
    {{"label", "选项B"}, {"value", "b"}, {"icon", "iconB.png"}}
};
```

在 XML 中通过 `$item.键名` 访问：

```xml
<Choice q-for="item in modes" 
        text="$item.label" 
        val="$item.value"
        icon="$item.icon"/>
```

## 动态操作

列表支持动态增删改操作，UI 会自动同步：

```cpp
auto modes = vm.list("modes");

// 追加一项
modes.append({{"label", "新模式"}, {"value", "new"}});

// 清空列表
modes.clear();

// 重新赋值
modes = {
    {{"label", "模式1"}, {"value", "1"}},
    {{"label", "模式2"}, {"value", "2"}}
};
```

::: tip 实时同步
所有对列表的操作都会立即反映到 UI 上。例如，调用 `append` 后，ComboBox 会立即新增一个选项。
:::

## 适用组件

`q-for` 可用于任何需要重复渲染的场景：

```xml
<!-- ComboBox 选项 -->
<ComboBox title="选择" var="selected">
    <Choice q-for="item in options" text="$item.text" val="$item.val"/>
</ComboBox>

<!-- 动态生成多个按钮 -->
<HLayoutWidget>
    <PushButton q-for="btn in buttons" text="$btn.text" var="$btn.id"/>
</HLayoutWidget>
```

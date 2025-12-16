# 响应式绑定

Quik 的核心特性是响应式绑定：当变量值改变时，UI 自动更新；当用户操作 UI 时，变量值自动同步。

## 变量绑定

使用 `var` 属性将组件绑定到一个变量：

```xml
<CheckBox title="启用" var="enable"/>
<LineEdit title="名称" var="name"/>
<SpinBox title="数量" var="count"/>
```

在 C++ 中，通过 `QuikViewModel` 访问这些变量：

```cpp
Quik::XMLUIBuilder builder;
QWidget* ui = Quik_BUILD(builder, "Panel.xml");

Quik::QuikViewModel vm(&builder);
auto enable = vm.var<bool>("enable");
auto name = vm.var<QString>("name");
auto count = vm.var<int>("count");
```

## 读取和写入

`Var<T>` 对象可以像普通变量一样使用：

```cpp
// 读取值
if (enable) {
    QString currentName = name;
    int currentCount = count;
}

// 写入值 - UI 自动更新
enable = true;      // CheckBox 自动勾选
name = "测试";      // LineEdit 自动显示"测试"
count = 42;         // SpinBox 自动显示 42
```

也可以使用显式的 getter/setter 方法：

```cpp
bool v = enable.get();
enable.set(true);
```

::: tip 双向绑定
当用户在 UI 上操作（如勾选 CheckBox、输入文字），变量值会自动更新。你可以随时读取到最新的值。
:::

## 支持的类型

| 类型 | 对应组件 | 示例 |
|------|---------|------|
| bool | CheckBox | `vm.var<bool>("enable")` |
| int | SpinBox, Slider | `vm.var<int>("count")` |
| double | DoubleSpinBox | `vm.var<double>("precision")` |
| QString | LineEdit, ComboBox | `vm.var<QString>("name")` |

## 条件渲染

`visible` 和 `enabled` 属性支持表达式，根据变量值动态控制组件的显示和启用状态：

```xml
<!-- 当 enable 为 true 时显示 -->
<LineEdit title="参数" var="param" visible="$enable==1"/>

<!-- 当 mode 为 "advanced" 时启用 -->
<SpinBox title="数量" var="count" enabled="$mode==advanced"/>
```

表达式语法：
- `$变量名` - 引用变量值
- `==` / `!=` - 比较运算符
- `and` / `or` - 逻辑运算符

复合条件示例：

```xml
<!-- 同时满足两个条件才显示 -->
<GroupBox title="高级设置" visible="$enable==1 and $mode==advanced"/>

<!-- 满足任一条件就显示 -->
<Label text="提示" visible="$error==1 or $warning==1"/>
```

::: warning 注意
布尔值在表达式中用 `1` 和 `0` 表示，而不是 `true` 和 `false`。
:::

## 监听变化

使用 `watch` 方法监听变量值的变化：

```cpp
auto enable = vm.var<bool>("enable");
auto mode = vm.var<QString>("mode");
auto count = vm.var<int>("count");

// 监听布尔值变化
enable.watch([](bool v) {
    // v 是变化后的新值
});

// 监听字符串变化
mode.watch([](QString v) {
    // 当用户选择不同的模式时触发
});

// 监听整数变化，联动更新其他变量
count.watch([&](int v) {
    // 例如：同步更新进度条
    progress = v;
});
```

### 监听多个变量

使用 `vm.watch()` 监听多个变量，任意一个变化时触发回调：

```cpp
auto enable = vm.var<bool>("enable");
auto mode = vm.var<QString>("mode");
auto count = vm.var<int>("count");

// 监听多个变量（任一变化触发）
vm.watch({enable, mode, count}, [&]() {
    // 任意一个变化时触发
    qDebug() << "enable:" << enable() << "mode:" << mode() << "count:" << count();
});
```

### 监听所有变量

使用 `vm.watchAll()` 监听所有变量的变化：

```cpp
vm.watchAll([](const QString& name, const QVariant& value) {
    // 任意变量变化时触发
    qDebug() << name << "=" << value;
});
```

## 多组件共享变量

多个组件可以绑定同一个变量名，实现联动效果：

```xml
<CheckBox title="启用功能A" var="enable"/>
<CheckBox title="启用功能B" var="enable"/>
<LineEdit title="参数" var="param" visible="$enable==1"/>
```

在这个例子中：
- 两个 CheckBox 绑定同一个 `enable` 变量
- 勾选任意一个，另一个也会同步勾选
- LineEdit 的显隐会根据 `enable` 的值自动切换

## 按钮事件

按钮使用 `vm.button()` 获取，通过 `onClick` 绑定点击事件：

```xml
<HLayoutWidget>
    <addStretch/>
    <PushButton text="应用" var="btnApply"/>
    <PushButton text="取消" var="btnCancel"/>
</HLayoutWidget>
```

```cpp
auto btnApply = vm.button("btnApply");
auto btnCancel = vm.button("btnCancel");

btnApply.onClick([&]() {
    // 读取当前值并处理
    if (enable) {
        applySettings(name, count);
    }
});

btnCancel.onClick([&dialog]() {
    dialog.reject();
});
```

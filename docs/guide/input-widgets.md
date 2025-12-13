# 输入组件

本章详细介绍 Quik 的输入组件。

## CheckBox

复选框，用于布尔值选择。

```xml
<CheckBox title="启用功能" var="chkEnable" default="1"/>
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | string | 显示文本 |
| `var` | string | 变量名 |
| `default` | 0/1 | 默认状态 |

### 绑定值

- **类型**: `bool` 或 `int`
- **值**: `true`/`false` 或 `1`/`0`

### 示例

```xml
<CheckBox title="自动保存" var="chkAutoSave" default="1"/>
<CheckBox title="显示详情" var="chkShowDetail"/>
```

```cpp
auto autoSave = vm.var<bool>("chkAutoSave");
if (autoSave) {
    enableAutoSave();
}
```

---

## LineEdit

文本输入框，支持验证。

```xml
<LineEdit title="名称" var="txtName" default="默认值" valid="string"/>
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | string | 标签文本 |
| `var` | string | 变量名 |
| `default` | string | 默认值 |
| `valid` | string | 验证类型：`int`、`double`、`string` |
| `placeholder` | string | 占位符文本 |

### 验证类型

- `int` - 只允许输入整数
- `double` - 只允许输入浮点数
- `string` - 允许任意文本（默认）

### 绑定值

- **类型**: `QString`
- 使用 `valid="double"` 时可用 `vm.var<double>()` 访问

### 示例

```xml
<LineEdit title="用户名" var="txtUsername" placeholder="请输入用户名"/>
<LineEdit title="数值" var="txtValue" default="100" valid="double"/>
<LineEdit title="整数" var="txtInt" valid="int"/>
```

```cpp
auto username = vm.var<QString>("txtUsername");
auto value = vm.var<double>("txtValue");

QString name = username;
double val = value;
```

---

## ComboBox

下拉选择框。

```xml
<ComboBox title="模式" var="cboMode" default="mode1">
    <Choice text="模式一" val="mode1"/>
    <Choice text="模式二" val="mode2"/>
    <Choice text="模式三" val="mode3"/>
</ComboBox>
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | string | 标签文本 |
| `var` | string | 变量名 |
| `default` | string | 默认选中的 `val` 值 |

### Choice 子元素

| 属性 | 说明 |
|------|------|
| `text` | 显示文本 |
| `val` | 实际值 |

### 绑定值

- **类型**: `QString`
- **值**: 选中项的 `val` 值

### 示例

```xml
<ComboBox title="颜色" var="cboColor" default="red">
    <Choice text="红色" val="red"/>
    <Choice text="绿色" val="green"/>
    <Choice text="蓝色" val="blue"/>
</ComboBox>
```

```cpp
auto color = vm.var<QString>("cboColor");

if (color() == "red") {
    setColor(Qt::red);
} else if (color() == "green") {
    setColor(Qt::green);
}
```

---

## SpinBox

整数输入框，带增减按钮。

```xml
<SpinBox title="数量" var="spnCount" min="0" max="100" default="10" step="5"/>
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | string | 标签文本 |
| `var` | string | 变量名 |
| `min` | int | 最小值 |
| `max` | int | 最大值 |
| `default` | int | 默认值 |
| `step` | int | 步进值 |
| `suffix` | string | 后缀文本 |
| `prefix` | string | 前缀文本 |

### 绑定值

- **类型**: `int`

### 示例

```xml
<SpinBox title="年龄" var="spnAge" min="0" max="150" default="25"/>
<SpinBox title="数量" var="spnQty" min="1" max="999" step="10" suffix=" 个"/>
```

```cpp
auto age = vm.var<int>("spnAge");
auto qty = vm.var<int>("spnQty");

int totalAge = age * qty;
```

---

## DoubleSpinBox

浮点数输入框。

```xml
<DoubleSpinBox title="精度" var="dspPrecision" 
               min="0.001" max="1.0" default="0.1" 
               decimals="3" step="0.01"/>
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | string | 标签文本 |
| `var` | string | 变量名 |
| `min` | double | 最小值 |
| `max` | double | 最大值 |
| `default` | double | 默认值 |
| `decimals` | int | 小数位数 |
| `step` | double | 步进值 |
| `suffix` | string | 后缀文本 |
| `prefix` | string | 前缀文本 |

### 绑定值

- **类型**: `double`

### 示例

```xml
<DoubleSpinBox title="比例" var="dspRatio" 
               min="0.0" max="1.0" default="0.5" 
               decimals="2" step="0.1"/>
<DoubleSpinBox title="温度" var="dspTemp" 
               min="-50" max="100" default="25" 
               decimals="1" suffix=" °C"/>
```

```cpp
auto ratio = vm.var<double>("dspRatio");
auto temp = vm.var<double>("dspTemp");

double scaledValue = baseValue * ratio;
```

---

## RadioButton

单选按钮，同一 `var` 的多个 RadioButton 自动成组。

```xml
<RadioButton title="选项A" var="rdoOption" val="A"/>
<RadioButton title="选项B" var="rdoOption" val="B"/>
<RadioButton title="选项C" var="rdoOption" val="C" default="1"/>
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | string | 显示文本 |
| `var` | string | 变量名（同组相同） |
| `val` | string | 选中时的值 |
| `default` | 0/1 | 是否默认选中 |

### 绑定值

- **类型**: `QString`
- **值**: 选中项的 `val` 值

### 示例

```xml
<GroupBox title="对齐方式">
    <RadioButton title="左对齐" var="rdoAlign" val="left" default="1"/>
    <RadioButton title="居中" var="rdoAlign" val="center"/>
    <RadioButton title="右对齐" var="rdoAlign" val="right"/>
</GroupBox>
```

```cpp
auto align = vm.var<QString>("rdoAlign");

if (align() == "left") {
    setAlignment(Qt::AlignLeft);
} else if (align() == "center") {
    setAlignment(Qt::AlignCenter);
} else {
    setAlignment(Qt::AlignRight);
}
```

---

## ListBox

列表框，用于从列表中选择。

```xml
<ListBox title="选择项目" var="lstItems">
    <Item text="项目1" val="item1"/>
    <Item text="项目2" val="item2"/>
    <Item text="项目3" val="item3"/>
</ListBox>
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | string | 标签文本 |
| `var` | string | 变量名 |

### Item 子元素

| 属性 | 说明 |
|------|------|
| `text` | 显示文本 |
| `val` | 实际值 |

### 绑定值

- **类型**: `QString`
- **值**: 选中项的 `val` 值

### 示例

```xml
<ListBox title="选择文件" var="lstFiles">
    <Item text="文档.txt" val="doc.txt"/>
    <Item text="图片.png" val="img.png"/>
    <Item text="数据.csv" val="data.csv"/>
</ListBox>
```

```cpp
auto selectedFile = vm.var<QString>("lstFiles");
QString filename = selectedFile;
```

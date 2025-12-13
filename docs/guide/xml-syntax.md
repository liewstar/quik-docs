# XML 语法

本章详细介绍 Quik 的 XML 语法规范。

## 基本结构

```xml
<Panel>
    <!-- 组件定义 -->
</Panel>
```

根元素通常是 `<Panel>`，但也可以是任何容器组件。

## 通用属性

所有组件都支持以下属性：

| 属性 | 类型 | 说明 |
|------|------|------|
| `var` | string | 变量名，用于数据绑定 |
| `title` | string | 标签文本（显示在组件左侧） |
| `default` | any | 默认值 |
| `visible` | expr | 可见性条件表达式 |
| `enabled` | expr | 启用条件表达式 |
| `tooltip` | string | 提示文本 |

### 示例

```xml
<LineEdit 
    var="txtName" 
    title="名称" 
    default="默认值"
    visible="$chkShow==1"
    enabled="$chkEnable==1"
    tooltip="请输入名称"/>
```

## 输入组件

### CheckBox - 复选框

```xml
<CheckBox title="启用功能" var="chkEnable" default="1"/>
```

| 属性 | 说明 |
|------|------|
| `default` | `0` 或 `1` |

**绑定值类型**: `bool` (true/false) 或 `int` (0/1)

### LineEdit - 文本输入框

```xml
<LineEdit title="数值" var="txtValue" default="100" valid="double"/>
```

| 属性 | 说明 |
|------|------|
| `default` | 默认文本 |
| `valid` | 验证类型：`int`、`double`、`string` |
| `placeholder` | 占位符文本 |

**绑定值类型**: `QString` 或根据 `valid` 转换

### ComboBox - 下拉框

```xml
<ComboBox title="模式" var="cboMode" default="mode1">
    <Choice text="模式一" val="mode1"/>
    <Choice text="模式二" val="mode2"/>
    <Choice text="模式三" val="mode3"/>
</ComboBox>
```

| 属性 | 说明 |
|------|------|
| `default` | 默认选中的 `val` 值 |

**子元素 `<Choice>`**:
- `text` - 显示文本
- `val` - 实际值

**绑定值类型**: `QString` (选中项的 `val` 值)

### SpinBox - 整数输入框

```xml
<SpinBox title="数量" var="spnCount" min="0" max="100" default="10"/>
```

| 属性 | 说明 |
|------|------|
| `min` | 最小值 |
| `max` | 最大值 |
| `default` | 默认值 |
| `step` | 步进值 |

**绑定值类型**: `int`

### DoubleSpinBox - 浮点数输入框

```xml
<DoubleSpinBox title="精度" var="dspPrecision" 
               min="0.0" max="1.0" default="0.5" 
               decimals="3" step="0.1"/>
```

| 属性 | 说明 |
|------|------|
| `min` | 最小值 |
| `max` | 最大值 |
| `default` | 默认值 |
| `decimals` | 小数位数 |
| `step` | 步进值 |

**绑定值类型**: `double`

### RadioButton - 单选按钮

```xml
<RadioButton title="选项A" var="rdoOption" val="A"/>
<RadioButton title="选项B" var="rdoOption" val="B"/>
```

同一 `var` 的多个 RadioButton 自动成组。

**绑定值类型**: `QString` (选中项的 `val` 值)

### ListBox - 列表框

```xml
<ListBox title="选择项" var="lstItems">
    <Item text="项目1" val="item1"/>
    <Item text="项目2" val="item2"/>
</ListBox>
```

**绑定值类型**: `QString` (选中项的 `val` 值)

## 容器组件

### GroupBox - 分组框

```xml
<GroupBox title="设置">
    <CheckBox title="选项1" var="chk1"/>
    <CheckBox title="选项2" var="chk2"/>
</GroupBox>
```

| 属性 | 说明 |
|------|------|
| `title` | 分组标题 |
| `checkable` | 是否可勾选 |
| `checked` | 默认勾选状态 |

### InnerGroupBox - 内嵌分组框

```xml
<InnerGroupBox title="子设置">
    <!-- 子组件 -->
</InnerGroupBox>
```

样式比 GroupBox 更轻量，适合嵌套使用。

### TabBar - 标签页

```xml
<TabBar var="tabMain">
    <Tab title="基本" val="basic">
        <!-- 基本设置内容 -->
    </Tab>
    <Tab title="高级" val="advanced">
        <!-- 高级设置内容 -->
    </Tab>
</TabBar>
```

**绑定值类型**: `QString` (当前标签的 `val` 值)

## 布局组件

### HLayoutWidget - 水平布局

```xml
<HLayoutWidget>
    <PushButton text="按钮1"/>
    <PushButton text="按钮2"/>
</HLayoutWidget>
```

### VLayoutWidget - 垂直布局

```xml
<VLayoutWidget>
    <Label text="第一行"/>
    <Label text="第二行"/>
</VLayoutWidget>
```

### addStretch - 弹性空间

```xml
<HLayoutWidget>
    <addStretch/>  <!-- 左侧弹性空间 -->
    <PushButton text="确定"/>
    <PushButton text="取消"/>
</HLayoutWidget>
```

## 其他组件

### Label - 标签

```xml
<Label text="这是一段文本"/>
```

### PushButton - 按钮

```xml
<PushButton text="点击" var="btnClick"/>
```

使用 `builder.connectButton()` 连接点击事件。

### HLine / VLine - 分隔线

```xml
<HLine/>  <!-- 水平分隔线 -->
<VLine/>  <!-- 垂直分隔线 -->
```

### PointLineEdit - 点坐标输入

```xml
<PointLineEdit title="位置" var="ptPosition"/>
```

用于输入 X, Y, Z 坐标。

### TwoPointLineEdit - 两点坐标输入

```xml
<TwoPointLineEdit title="范围" var="ptRange"/>
```

用于输入起点和终点坐标。

## 完整示例

```xml
<Panel>
    <GroupBox title="基本设置">
        <CheckBox title="启用功能" var="chkEnable" default="1"/>
        <LineEdit title="名称" var="txtName" default="默认名称"/>
        <ComboBox title="类型" var="cboType" default="type1">
            <Choice text="类型一" val="type1"/>
            <Choice text="类型二" val="type2"/>
        </ComboBox>
        <SpinBox title="数量" var="spnCount" min="1" max="100" default="10"/>
    </GroupBox>
    
    <GroupBox title="高级选项" visible="$chkEnable==1">
        <DoubleSpinBox title="精度" var="dspPrecision" 
                       min="0.001" max="1.0" default="0.1" decimals="3"/>
        <CheckBox title="详细模式" var="chkVerbose"/>
        <LineEdit title="参数" var="txtParam" visible="$chkVerbose==1"/>
    </GroupBox>
    
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="应用" var="btnApply"/>
        <PushButton text="取消" var="btnCancel"/>
    </HLayoutWidget>
</Panel>
```

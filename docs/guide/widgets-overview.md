# 组件概览

Quik 内置了丰富的 Qt 组件，满足常见 UI 需求。

## 组件分类

### 输入组件

| 组件 | 说明 | 绑定类型 |
|------|------|---------|
| [CheckBox](/guide/input-widgets#checkbox) | 复选框 | bool |
| [LineEdit](/guide/input-widgets#lineedit) | 文本输入框 | QString |
| [ComboBox](/guide/input-widgets#combobox) | 下拉选择框 | QString |
| [SpinBox](/guide/input-widgets#spinbox) | 整数输入框 | int |
| [DoubleSpinBox](/guide/input-widgets#doublespinbox) | 浮点数输入框 | double |
| [RadioButton](/guide/input-widgets#radiobutton) | 单选按钮 | QString |
| [ListBox](/guide/input-widgets#listbox) | 列表框 | QString |

### 容器组件

| 组件 | 说明 |
|------|------|
| [GroupBox](/guide/container-widgets#groupbox) | 分组框 |
| [InnerGroupBox](/guide/container-widgets#innergroupbox) | 内嵌分组框 |
| [TabBar](/guide/container-widgets#tabbar) | 标签页 |

### 布局组件

| 组件 | 说明 |
|------|------|
| [HLayoutWidget](/guide/layout-widgets#hlayoutwidget) | 水平布局 |
| [VLayoutWidget](/guide/layout-widgets#vlayoutwidget) | 垂直布局 |
| [addStretch](/guide/layout-widgets#addstretch) | 弹性空间 |

### 显示组件

| 组件 | 说明 |
|------|------|
| Label | 文本标签 |
| HLine | 水平分隔线 |
| VLine | 垂直分隔线 |

### 交互组件

| 组件 | 说明 |
|------|------|
| PushButton | 按钮 |

### 特殊组件

| 组件 | 说明 |
|------|------|
| PointLineEdit | 点坐标输入 (X, Y, Z) |
| TwoPointLineEdit | 两点坐标输入 |
| LabelList | 标签列表 |

## 通用属性

所有组件都支持以下属性：

```xml
<组件名
    var="变量名"
    title="标签文本"
    default="默认值"
    visible="条件表达式"
    enabled="条件表达式"
    tooltip="提示文本"
/>
```

| 属性 | 说明 | 必需 |
|------|------|------|
| `var` | 变量名，用于数据绑定 | 否 |
| `title` | 标签文本，显示在组件左侧 | 否 |
| `default` | 默认值 | 否 |
| `visible` | 可见性条件表达式 | 否 |
| `enabled` | 启用条件表达式 | 否 |
| `tooltip` | 鼠标悬停提示 | 否 |

## 布局规则

### 带标签的组件

当组件设置了 `title` 属性时，会自动创建 "标签 + 组件" 的行布局：

```xml
<LineEdit title="名称" var="txtName"/>
```

渲染效果：
```
名称:  [________________]
```

### 容器内的组件

容器内的组件会自动垂直排列：

```xml
<GroupBox title="设置">
    <CheckBox title="选项1" var="chk1"/>
    <CheckBox title="选项2" var="chk2"/>
    <LineEdit title="数值" var="txtValue"/>
</GroupBox>
```

渲染效果：
```
┌─ 设置 ─────────────────┐
│ ☑ 选项1                │
│ ☐ 选项2                │
│ 数值:  [__________]    │
└────────────────────────┘
```

### 水平布局

使用 `HLayoutWidget` 实现水平排列：

```xml
<HLayoutWidget>
    <PushButton text="按钮1"/>
    <PushButton text="按钮2"/>
    <PushButton text="按钮3"/>
</HLayoutWidget>
```

渲染效果：
```
[按钮1] [按钮2] [按钮3]
```

### 弹性空间

使用 `addStretch` 添加弹性空间：

```xml
<HLayoutWidget>
    <addStretch/>
    <PushButton text="确定"/>
    <PushButton text="取消"/>
</HLayoutWidget>
```

渲染效果：
```
                    [确定] [取消]
```

## 组件嵌套

组件可以任意嵌套：

```xml
<Panel>
    <GroupBox title="外层">
        <InnerGroupBox title="内层1">
            <CheckBox title="选项" var="chk1"/>
        </InnerGroupBox>
        <InnerGroupBox title="内层2">
            <LineEdit title="数值" var="txt1"/>
        </InnerGroupBox>
    </GroupBox>
    
    <TabBar var="tabMain">
        <Tab title="标签1" val="tab1">
            <LineEdit title="内容1" var="txtTab1"/>
        </Tab>
        <Tab title="标签2" val="tab2">
            <LineEdit title="内容2" var="txtTab2"/>
        </Tab>
    </TabBar>
</Panel>
```

## 自定义组件

可以通过 `WidgetFactory` 注册自定义组件：

```cpp
#include "widget/WidgetFactory.h"

// 注册自定义组件
Quik::WidgetFactory::instance().registerCreator("MyWidget", 
    [](const QDomElement& element, Quik::QuikContext* context) -> QWidget* {
        auto* widget = new MyCustomWidget();
        // 处理属性...
        return widget;
    }
);
```

然后在 XML 中使用：

```xml
<MyWidget var="myVar" title="自定义组件"/>
```

详见 [WidgetFactory API](/api/widget-factory)。

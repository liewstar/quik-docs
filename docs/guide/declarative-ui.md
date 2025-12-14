# 声明式 UI

Quik 使用 XML 描述界面结构，每个 XML 文件对应一个 UI 面板。

## 基本结构

根元素通常是 `<Panel>`，内部嵌套各种组件：

```xml
<Panel>
    <CheckBox title="启用" var="enable"/>
    <LineEdit title="名称" var="name"/>
</Panel>
```

Quik 会自动将 XML 解析并生成对应的 Qt Widgets。你不需要手动创建 `QCheckBox`、`QLineEdit` 等对象。

## 组件属性

每个组件支持多种属性，用于配置外观和行为：

```xml
<SpinBox 
    title="数量"           
    var="count"           
    min="0"               
    max="100"             
    default="10"          
/>
```

- **title** - 组件左侧的标签文字
- **var** - 绑定的变量名，用于在 C++ 中读写值
- **min/max** - 数值范围限制
- **default** - 默认值

## 布局容器

Quik 提供多种布局容器来组织组件：

```xml
<Panel>
    <!-- 分组框 -->
    <GroupBox title="基本设置">
        <CheckBox title="启用" var="enable"/>
        <LineEdit title="名称" var="name"/>
    </GroupBox>
    
    <!-- 水平布局 -->
    <HLayoutWidget>
        <PushButton text="确定" var="btnOK"/>
        <PushButton text="取消" var="btnCancel"/>
    </HLayoutWidget>
    
    <!-- 垂直布局 -->
    <VLayoutWidget>
        <Label text="第一行"/>
        <Label text="第二行"/>
    </VLayoutWidget>
</Panel>
```

使用 `<addStretch/>` 可以添加弹性空间，将组件推向一侧：

```xml
<HLayoutWidget>
    <addStretch/>  <!-- 左侧弹性空间 -->
    <PushButton text="确定" var="btnOK"/>
    <PushButton text="取消" var="btnCancel"/>
</HLayoutWidget>
```

## 组件一览

### 输入组件

| 组件 | 说明 | 变量类型 | 常用属性 |
|------|------|---------|----------|
| CheckBox | 复选框 | bool | title, default |
| RadioButton | 单选按钮 | bool | title, default |
| LineEdit | 单行文本输入 | QString | title, placeholder, valid |
| SpinBox | 整数输入 | int | title, min, max, default |
| DoubleSpinBox | 浮点输入 | double | title, min, max, decimals |
| ComboBox | 下拉选择 | QString | title, default |
| ListBox | 列表选择 | QString | title |
| Slider | 滑块 | int | title, min, max, ticks, tickInterval |
| PointLineEdit | 三维坐标输入 | 多变量 | title, valid, hasButton |
| TwoPointLineEdit | 两点坐标输入 | 多变量 | title, left, right, valid |

### 显示组件

| 组件 | 说明 | 变量类型 | 常用属性 |
|------|------|---------|----------|
| Label | 文本标签 | - | text |
| LabelList | 标签列表 | - | - |
| ProgressBar | 进度条 | int | min, max |
| HLine | 水平分隔线 | - | - |
| VLine | 垂直分隔线 | - | - |

### 按钮组件

| 组件 | 说明 | 变量类型 | 常用属性 |
|------|------|---------|----------|
| PushButton | 按钮 | - | text |

### 容器与布局

| 组件 | 说明 | 常用属性 |
|------|------|----------|
| GroupBox | 分组容器 | title |
| InnerGroupBox | 内嵌分组容器 | title |
| TabBar | 标签页容器 | - |
| HLayoutWidget | 水平布局 | - |
| VLayoutWidget | 垂直布局 | - |
| addStretch | 弹性空间 | - |

## 特殊组件用法

针对工业软件场景，Quik 提供了一些常用的封装组件，简化三维坐标、点位等数据的输入与处理。

### PointLineEdit（三维坐标输入）

用于输入 X、Y、Z 三个坐标值。可以配合布局容器实现多点并排：

```xml
<!-- 单个坐标点 -->
<PointLineEdit title="起点" var="origin" hasButton="true"/>

<!-- 两个坐标点并排 -->
<HLayoutWidget>
    <PointLineEdit title="" var="origin" hasButton="true"/>
    <PointLineEdit title="" var="end" hasButton="true"/>
</HLayoutWidget>
```

在 C++ 中使用 `vm.point()` 获取访问器：

```cpp
auto origin = vm.point("origin");
auto end = vm.point("end");

// 读取
QVector3D pos = origin;

// 写入
origin = QVector3D(1.0, 2.0, 3.0);

// 监听变化
origin.watch([](QVector3D pos) {
    // 任意坐标变化时触发
});

// 如果设置了 hasButton="true"，获取关联按钮
origin.button().onClick([&]() {
    // 点击选择按钮时触发
});
```

属性说明：
- **valid** - 验证类型：`double`（默认）或 `int`
- **hasButton** - 是否显示选择按钮（默认 `false`）

### TwoPointLineEdit（两点坐标输入）

用于输入两个三维坐标点（上下两行布局）：

```xml
<TwoPointLineEdit title="范围" var="range" left="起点" right="终点"/>
```

在 C++ 中使用 `vm.twoPoint()` 获取访问器：

```cpp
auto range = vm.twoPoint("range");

// 读取
QPair<QVector3D, QVector3D> points = range;
QVector3D p1 = points.first;
QVector3D p2 = points.second;

// 写入
range = qMakePair(QVector3D(0, 0, 0), QVector3D(100, 100, 100));

// 监听变化
range.watch([](QPair<QVector3D, QVector3D> pts) {
    // 任意坐标变化时触发
});
```

属性说明：
- **left** - 第一行标签文字（默认 "Point 1"）
- **right** - 第二行标签文字（默认 "Point 2"）
- **valid** - 验证类型：`double`（默认）或 `int`

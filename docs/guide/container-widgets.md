# 容器组件

容器组件用于组织和分组其他组件。

## GroupBox

分组框，用于将相关组件分组显示。

```xml
<GroupBox title="基本设置">
    <CheckBox title="选项1" var="chk1"/>
    <CheckBox title="选项2" var="chk2"/>
    <LineEdit title="数值" var="txtValue"/>
</GroupBox>
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | string | 分组标题 |
| `checkable` | bool | 是否可勾选 |
| `checked` | bool | 默认勾选状态 |
| `var` | string | 变量名（仅当 checkable 时有效） |

### 可勾选分组框

```xml
<GroupBox title="高级选项" checkable="true" checked="false" var="grpAdvanced">
    <LineEdit title="参数1" var="txtParam1"/>
    <LineEdit title="参数2" var="txtParam2"/>
</GroupBox>
```

当取消勾选时，分组框内的所有组件会被禁用。

### 嵌套使用

```xml
<GroupBox title="外层">
    <GroupBox title="内层1">
        <CheckBox title="选项A" var="chkA"/>
    </GroupBox>
    <GroupBox title="内层2">
        <CheckBox title="选项B" var="chkB"/>
    </GroupBox>
</GroupBox>
```

### 条件显示

```xml
<CheckBox title="显示高级选项" var="chkShowAdvanced"/>

<GroupBox title="高级选项" visible="$chkShowAdvanced==1">
    <LineEdit title="参数" var="txtParam"/>
</GroupBox>
```

---

## InnerGroupBox

内嵌分组框，样式比 GroupBox 更轻量，适合在 GroupBox 内部使用。

```xml
<GroupBox title="设置">
    <InnerGroupBox title="子设置1">
        <CheckBox title="选项1" var="chk1"/>
    </InnerGroupBox>
    <InnerGroupBox title="子设置2">
        <CheckBox title="选项2" var="chk2"/>
    </InnerGroupBox>
</GroupBox>
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | string | 分组标题 |

### 与 GroupBox 的区别

| 特性 | GroupBox | InnerGroupBox |
|------|----------|---------------|
| 边框样式 | 完整边框 | 轻量边框 |
| 适用场景 | 顶层分组 | 嵌套分组 |
| checkable | 支持 | 不支持 |

---

## TabBar

标签页容器，用于在多个页面间切换。

```xml
<TabBar var="tabMain">
    <Tab title="基本" val="basic">
        <LineEdit title="名称" var="txtName"/>
        <LineEdit title="描述" var="txtDesc"/>
    </Tab>
    <Tab title="高级" val="advanced">
        <CheckBox title="启用" var="chkEnable"/>
        <SpinBox title="数量" var="spnCount"/>
    </Tab>
    <Tab title="关于" val="about">
        <Label text="版本 1.0"/>
    </Tab>
</TabBar>
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `var` | string | 变量名 |

### Tab 子元素

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | string | 标签页标题 |
| `val` | string | 标签页值 |

### 绑定值

- **类型**: `QString`
- **值**: 当前选中标签页的 `val` 值

### 监听标签切换

```cpp
builder.watch("tabMain", [](const QVariant& v) {
    QString tab = v.toString();
    qDebug() << "切换到标签:" << tab;
});
```

### 条件显示标签页内容

```xml
<TabBar var="tabSettings">
    <Tab title="常规" val="general">
        <ComboBox title="模式" var="cboMode" default="simple">
            <Choice text="简单" val="simple"/>
            <Choice text="高级" val="advanced"/>
        </ComboBox>
        
        <!-- 仅在高级模式显示 -->
        <LineEdit title="参数" var="txtParam" visible="$cboMode==advanced"/>
    </Tab>
    <Tab title="输出" val="output">
        <LineEdit title="路径" var="txtPath"/>
    </Tab>
</TabBar>
```

### 程序控制标签切换

```cpp
auto tab = vm.var<QString>("tabMain");

// 切换到指定标签
tab = "advanced";

// 获取当前标签
QString currentTab = tab;
```

---

## 容器嵌套示例

```xml
<Panel>
    <GroupBox title="项目设置">
        <LineEdit title="项目名称" var="txtProjectName"/>
        
        <InnerGroupBox title="构建选项">
            <CheckBox title="优化" var="chkOptimize" default="1"/>
            <CheckBox title="调试信息" var="chkDebug"/>
        </InnerGroupBox>
        
        <InnerGroupBox title="输出选项">
            <LineEdit title="输出目录" var="txtOutputDir"/>
            <ComboBox title="格式" var="cboFormat">
                <Choice text="二进制" val="bin"/>
                <Choice text="文本" val="txt"/>
            </ComboBox>
        </InnerGroupBox>
    </GroupBox>
    
    <TabBar var="tabDetails">
        <Tab title="源文件" val="source">
            <ListBox title="文件列表" var="lstFiles">
                <Item text="main.cpp" val="main"/>
                <Item text="utils.cpp" val="utils"/>
            </ListBox>
        </Tab>
        <Tab title="依赖" val="deps">
            <CheckBox title="Qt Core" var="chkQtCore" default="1"/>
            <CheckBox title="Qt Gui" var="chkQtGui" default="1"/>
            <CheckBox title="Qt Widgets" var="chkQtWidgets" default="1"/>
        </Tab>
    </TabBar>
    
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="构建" var="btnBuild"/>
        <PushButton text="取消" var="btnCancel"/>
    </HLayoutWidget>
</Panel>
```

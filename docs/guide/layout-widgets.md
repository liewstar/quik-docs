# 布局组件

布局组件用于控制子组件的排列方式。

## HLayoutWidget

水平布局容器，子组件从左到右排列。

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

### 常见用法

#### 按钮组

```xml
<HLayoutWidget>
    <addStretch/>
    <PushButton text="确定" var="btnOK"/>
    <PushButton text="取消" var="btnCancel"/>
</HLayoutWidget>
```

渲染效果：
```
                         [确定] [取消]
```

#### 表单行

```xml
<HLayoutWidget>
    <Label text="用户名:"/>
    <LineEdit var="txtUsername"/>
</HLayoutWidget>
```

#### 工具栏

```xml
<HLayoutWidget>
    <PushButton text="新建"/>
    <PushButton text="打开"/>
    <PushButton text="保存"/>
    <addStretch/>
    <PushButton text="帮助"/>
</HLayoutWidget>
```

渲染效果：
```
[新建] [打开] [保存]              [帮助]
```

---

## VLayoutWidget

垂直布局容器，子组件从上到下排列。

```xml
<VLayoutWidget>
    <Label text="第一行"/>
    <Label text="第二行"/>
    <Label text="第三行"/>
</VLayoutWidget>
```

渲染效果：
```
第一行
第二行
第三行
```

### 常见用法

#### 表单

```xml
<VLayoutWidget>
    <LineEdit title="姓名" var="txtName"/>
    <LineEdit title="邮箱" var="txtEmail"/>
    <LineEdit title="电话" var="txtPhone"/>
</VLayoutWidget>
```

#### 选项列表

```xml
<VLayoutWidget>
    <CheckBox title="选项1" var="chk1"/>
    <CheckBox title="选项2" var="chk2"/>
    <CheckBox title="选项3" var="chk3"/>
</VLayoutWidget>
```

---

## addStretch

弹性空间，用于在布局中添加可伸缩的空白区域。

```xml
<HLayoutWidget>
    <addStretch/>
    <PushButton text="按钮"/>
</HLayoutWidget>
```

### 单侧弹性

```xml
<!-- 按钮靠右 -->
<HLayoutWidget>
    <addStretch/>
    <PushButton text="按钮"/>
</HLayoutWidget>

<!-- 按钮靠左 -->
<HLayoutWidget>
    <PushButton text="按钮"/>
    <addStretch/>
</HLayoutWidget>
```

### 两侧弹性（居中）

```xml
<HLayoutWidget>
    <addStretch/>
    <PushButton text="居中按钮"/>
    <addStretch/>
</HLayoutWidget>
```

渲染效果：
```
          [居中按钮]
```

### 多个弹性空间

```xml
<HLayoutWidget>
    <PushButton text="左"/>
    <addStretch/>
    <PushButton text="中"/>
    <addStretch/>
    <PushButton text="右"/>
</HLayoutWidget>
```

渲染效果：
```
[左]        [中]        [右]
```

---

## 嵌套布局

布局组件可以相互嵌套，实现复杂的界面布局。

### 水平嵌套垂直

```xml
<HLayoutWidget>
    <VLayoutWidget>
        <Label text="左侧"/>
        <CheckBox title="选项1" var="chk1"/>
        <CheckBox title="选项2" var="chk2"/>
    </VLayoutWidget>
    
    <VLayoutWidget>
        <Label text="右侧"/>
        <LineEdit title="输入1" var="txt1"/>
        <LineEdit title="输入2" var="txt2"/>
    </VLayoutWidget>
</HLayoutWidget>
```

### 复杂布局示例

```xml
<Panel>
    <!-- 顶部工具栏 -->
    <HLayoutWidget>
        <PushButton text="新建"/>
        <PushButton text="打开"/>
        <addStretch/>
        <Label text="状态: 就绪"/>
    </HLayoutWidget>
    
    <HLine/>
    
    <!-- 主内容区 -->
    <HLayoutWidget>
        <!-- 左侧面板 -->
        <VLayoutWidget>
            <GroupBox title="选项">
                <CheckBox title="选项A" var="chkA"/>
                <CheckBox title="选项B" var="chkB"/>
            </GroupBox>
        </VLayoutWidget>
        
        <!-- 右侧面板 -->
        <VLayoutWidget>
            <GroupBox title="参数">
                <LineEdit title="参数1" var="txtParam1"/>
                <LineEdit title="参数2" var="txtParam2"/>
            </GroupBox>
        </VLayoutWidget>
    </HLayoutWidget>
    
    <HLine/>
    
    <!-- 底部按钮 -->
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="应用" var="btnApply"/>
        <PushButton text="取消" var="btnCancel"/>
    </HLayoutWidget>
</Panel>
```

---

## 分隔线

### HLine - 水平分隔线

```xml
<GroupBox title="设置">
    <CheckBox title="选项1" var="chk1"/>
    <HLine/>
    <CheckBox title="选项2" var="chk2"/>
</GroupBox>
```

### VLine - 垂直分隔线

```xml
<HLayoutWidget>
    <PushButton text="按钮1"/>
    <VLine/>
    <PushButton text="按钮2"/>
</HLayoutWidget>
```

---

## 布局最佳实践

### 1. 使用 GroupBox 组织相关内容

```xml
<Panel>
    <GroupBox title="输入设置">
        <!-- 输入相关组件 -->
    </GroupBox>
    <GroupBox title="输出设置">
        <!-- 输出相关组件 -->
    </GroupBox>
</Panel>
```

### 2. 按钮放在底部右侧

```xml
<Panel>
    <!-- 主内容 -->
    
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="确定" var="btnOK"/>
        <PushButton text="取消" var="btnCancel"/>
    </HLayoutWidget>
</Panel>
```

### 3. 使用分隔线区分区域

```xml
<Panel>
    <GroupBox title="基本设置">
        <!-- ... -->
    </GroupBox>
    
    <HLine/>
    
    <GroupBox title="高级设置">
        <!-- ... -->
    </GroupBox>
</Panel>
```

### 4. 避免过深嵌套

```xml
<!-- 不推荐：嵌套过深 -->
<VLayoutWidget>
    <HLayoutWidget>
        <VLayoutWidget>
            <HLayoutWidget>
                <!-- ... -->
            </HLayoutWidget>
        </VLayoutWidget>
    </HLayoutWidget>
</VLayoutWidget>

<!-- 推荐：使用 GroupBox 组织 -->
<Panel>
    <GroupBox title="区域1">
        <!-- ... -->
    </GroupBox>
    <GroupBox title="区域2">
        <!-- ... -->
    </GroupBox>
</Panel>
```

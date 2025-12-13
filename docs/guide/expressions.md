# 条件表达式

Quik 支持在 `visible` 和 `enabled` 属性中使用条件表达式，实现动态 UI 控制。

## 基本语法

```
$变量名 运算符 值
```

### 示例

```xml
<LineEdit visible="$chkEnable==1"/>
<SpinBox enabled="$cboMode==advanced"/>
```

## 运算符

| 运算符 | 说明 | 示例 |
|--------|------|------|
| `==` | 等于 | `$var==1` |
| `!=` | 不等于 | `$var!=0` |
| `>` | 大于 | `$count>10` |
| `<` | 小于 | `$count<100` |
| `>=` | 大于等于 | `$value>=0.5` |
| `<=` | 小于等于 | `$value<=1.0` |

## 值类型

### 数字

```xml
<LineEdit visible="$chkEnable==1"/>
<SpinBox visible="$count>10"/>
<DoubleSpinBox visible="$ratio>=0.5"/>
```

### 字符串

```xml
<GroupBox visible="$cboMode==advanced"/>
<LineEdit visible="$txtType==custom"/>
```

::: tip
字符串值不需要引号，直接写即可。
:::

## 复合表达式

### AND 逻辑

```xml
<LineEdit visible="$chkA==1 and $chkB==1"/>
```

只有当 `chkA` 和 `chkB` 都为 1 时才显示。

### OR 逻辑

```xml
<GroupBox visible="$mode==A or $mode==B"/>
```

当 `mode` 为 A 或 B 时显示。

### 混合使用

```xml
<LineEdit visible="$chkEnable==1 and ($mode==A or $mode==B)"/>
```

支持括号改变优先级。

## 变量引用

### 引用其他变量

```xml
<LineEdit visible="$varA==$varB"/>
```

当 `varA` 的值等于 `varB` 的值时显示。

## 实际应用

### 条件显示

```xml
<Panel>
    <CheckBox title="启用高级选项" var="chkAdvanced"/>
    
    <!-- 仅当勾选时显示 -->
    <GroupBox title="高级选项" visible="$chkAdvanced==1">
        <LineEdit title="参数1" var="txtParam1"/>
        <LineEdit title="参数2" var="txtParam2"/>
    </GroupBox>
</Panel>
```

### 多级联动

```xml
<Panel>
    <ComboBox title="类型" var="cboType" default="simple">
        <Choice text="简单" val="simple"/>
        <Choice text="标准" val="standard"/>
        <Choice text="高级" val="advanced"/>
    </ComboBox>
    
    <!-- 标准和高级模式显示 -->
    <LineEdit title="参数A" var="txtA" visible="$cboType!=simple"/>
    
    <!-- 仅高级模式显示 -->
    <LineEdit title="参数B" var="txtB" visible="$cboType==advanced"/>
    
    <!-- 高级模式下的额外选项 -->
    <GroupBox title="高级设置" visible="$cboType==advanced">
        <CheckBox title="详细模式" var="chkVerbose"/>
        <LineEdit title="详细参数" var="txtVerbose" visible="$chkVerbose==1"/>
    </GroupBox>
</Panel>
```

### 条件启用

```xml
<Panel>
    <CheckBox title="手动设置" var="chkManual"/>
    
    <!-- 手动模式时启用输入 -->
    <LineEdit title="数值" var="txtValue" enabled="$chkManual==1"/>
    
    <!-- 自动模式时显示提示 -->
    <Label text="自动计算中..." visible="$chkManual==0"/>
</Panel>
```

### 互斥选项

```xml
<Panel>
    <RadioButton title="选项A" var="rdoOption" val="A"/>
    <RadioButton title="选项B" var="rdoOption" val="B"/>
    <RadioButton title="选项C" var="rdoOption" val="C"/>
    
    <GroupBox title="A的设置" visible="$rdoOption==A">
        <!-- A 相关设置 -->
    </GroupBox>
    
    <GroupBox title="B的设置" visible="$rdoOption==B">
        <!-- B 相关设置 -->
    </GroupBox>
    
    <GroupBox title="C的设置" visible="$rdoOption==C">
        <!-- C 相关设置 -->
    </GroupBox>
</Panel>
```

### 数值范围

```xml
<Panel>
    <SpinBox title="数量" var="spnCount" min="0" max="100"/>
    
    <!-- 数量大于0时显示 -->
    <GroupBox title="详细设置" visible="$spnCount>0">
        <LineEdit title="名称" var="txtName"/>
    </GroupBox>
    
    <!-- 数量为0时显示提示 -->
    <Label text="请设置数量" visible="$spnCount==0"/>
</Panel>
```

## 表达式求值

表达式在以下时机自动求值：

1. **初始化时** - UI 构建完成后
2. **变量变化时** - 依赖的变量值改变时

```
用户操作 → 变量更新 → 表达式求值 → UI 更新
```

## 注意事项

::: warning 注意
- 变量名必须以 `$` 开头
- 运算符两侧不要有多余空格
- 字符串比较区分大小写
:::

### 正确写法

```xml
<LineEdit visible="$chkEnable==1"/>
<LineEdit visible="$mode==advanced"/>
<LineEdit visible="$a==1 and $b==2"/>
```

### 错误写法

```xml
<!-- 错误：缺少 $ -->
<LineEdit visible="chkEnable==1"/>

<!-- 错误：多余空格 -->
<LineEdit visible="$chkEnable == 1"/>
```

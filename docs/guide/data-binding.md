# 数据绑定

Quik 提供强大的双向数据绑定机制，让 UI 和数据自动同步。

## 基本概念

### 变量 (Variable)

每个带有 `var` 属性的组件都会创建一个变量：

```xml
<CheckBox title="启用" var="chkEnable"/>
```

这里 `chkEnable` 就是变量名，它的值会随 CheckBox 的状态变化。

### 双向绑定

```
┌─────────────┐      自动同步      ┌─────────────┐
│   UI 组件    │ ◄──────────────► │   变量值     │
└─────────────┘                   └─────────────┘
```

- **UI → 变量**: 用户操作 UI 时，变量自动更新
- **变量 → UI**: 代码修改变量时，UI 自动更新

## 获取和设置值

### 方式一：通过 Builder

```cpp
// 获取值
QVariant value = builder.getValue("chkEnable");
bool enabled = value.toBool();

// 设置值
builder.setValue("chkEnable", true);
```

### 方式二：通过 ViewModel（推荐）

```cpp
Quik::QuikViewModel vm(&builder);

// 创建类型安全的访问器
auto chkEnable = vm.var<bool>("chkEnable");
auto txtValue = vm.var<double>("txtValue");
auto cboMode = vm.var<QString>("cboMode");

// 获取值 - 多种方式
bool b1 = chkEnable();      // 函数调用风格
bool b2 = chkEnable;        // 隐式转换
bool b3 = chkEnable.value(); // 显式方法

// 设置值 - 多种方式
chkEnable(true);            // 函数调用风格
chkEnable = true;           // 赋值操作符
chkEnable.setValue(true);   // 显式方法
```

## 监听变化

### watch - 监听单个变量

```cpp
builder.watch("chkEnable", [](const QVariant& value) {
    qDebug() << "chkEnable 变为:" << value.toBool();
});
```

### 取消监听

```cpp
builder.unwatch("chkEnable");
```

### 监听多个变量

```cpp
QStringList vars = {"var1", "var2", "var3"};
for (const auto& var : vars) {
    builder.watch(var, [var](const QVariant& v) {
        qDebug() << var << "=" << v;
    });
}
```

## 变量类型

| 组件类型 | 变量类型 | 示例值 |
|---------|---------|--------|
| CheckBox | bool/int | true, 1 |
| LineEdit | QString | "text" |
| SpinBox | int | 42 |
| DoubleSpinBox | double | 3.14 |
| ComboBox | QString | "option1" |
| RadioButton | QString | "optionA" |

### 类型转换

ViewModel 自动处理类型转换：

```cpp
auto txtValue = vm.var<double>("txtValue");

// LineEdit 存储的是 QString，但会自动转换为 double
double v = txtValue;  // 自动从 QString 转换
```

## 批量操作

### 获取所有值

```cpp
QVariantMap allValues = builder.getAllValues();

for (auto it = allValues.begin(); it != allValues.end(); ++it) {
    qDebug() << it.key() << "=" << it.value();
}
```

### 批量设置

```cpp
QVariantMap values;
values["chkEnable"] = true;
values["txtValue"] = "100";
values["cboMode"] = "mode2";

for (auto it = values.begin(); it != values.end(); ++it) {
    builder.setValue(it.key(), it.value());
}
```

## 默认值

在 XML 中设置默认值：

```xml
<CheckBox var="chkEnable" default="1"/>
<LineEdit var="txtValue" default="100"/>
<ComboBox var="cboMode" default="mode1">
    <Choice text="模式一" val="mode1"/>
</ComboBox>
```

## 实际应用示例

### 表单提交

```cpp
builder.connectButton("btnSubmit", [&]() {
    auto name = vm.var<QString>("txtName");
    auto age = vm.var<int>("spnAge");
    auto gender = vm.var<QString>("cboGender");
    
    // 验证
    if (name().isEmpty()) {
        QMessageBox::warning(nullptr, "错误", "请输入名称");
        return;
    }
    
    // 提交数据
    submitForm(name(), age(), gender());
});
```

### 联动更新

```cpp
// 当类型改变时，更新相关选项
builder.watch("cboType", [&](const QVariant& v) {
    QString type = v.toString();
    
    if (type == "advanced") {
        vm.var<bool>("chkAdvanced") = true;
        vm.var<double>("dspPrecision") = 0.001;
    } else {
        vm.var<bool>("chkAdvanced") = false;
        vm.var<double>("dspPrecision") = 0.1;
    }
});
```

### 保存和恢复状态

```cpp
// 保存状态
QVariantMap state = builder.getAllValues();
QSettings settings;
settings.setValue("panelState", state);

// 恢复状态
QVariantMap savedState = settings.value("panelState").toMap();
for (auto it = savedState.begin(); it != savedState.end(); ++it) {
    builder.setValue(it.key(), it.value());
}
```

# ViewModel

`QuikViewModel` 提供类型安全的变量访问，是访问 Quik 变量的推荐方式。

## 基本用法

```cpp
#include "Quik/Quik.h"

// 创建 ViewModel
Quik::XMLUIBuilder builder;
QWidget* ui = builder.buildFromFile("panel.xml");
Quik::QuikViewModel vm(&builder);

// 创建变量访问器
auto chkEnable = vm.var<bool>("chkEnable");
auto txtValue = vm.var<double>("txtValue");
auto cboMode = vm.var<QString>("cboMode");
auto spnCount = vm.var<int>("spnCount");
```

## Var 访问器

`Var<T>` 是一个模板类，提供多种访问方式：

### 获取值

```cpp
auto value = vm.var<double>("txtValue");

// 方式1：函数调用
double v1 = value();

// 方式2：隐式转换
double v2 = value;

// 方式3：显式方法
double v3 = value.value();
```

### 设置值

```cpp
auto value = vm.var<double>("txtValue");

// 方式1：函数调用
value(100.0);

// 方式2：赋值操作符
value = 100.0;

// 方式3：显式方法
value.setValue(100.0);
```

## 支持的类型

| 类型 | 适用组件 |
|------|---------|
| `bool` | CheckBox |
| `int` | SpinBox |
| `double` | DoubleSpinBox, LineEdit (valid="double") |
| `QString` | LineEdit, ComboBox, RadioButton |

### 类型示例

```cpp
// bool - 复选框
auto chkEnable = vm.var<bool>("chkEnable");
if (chkEnable) {
    // ...
}

// int - 整数输入
auto spnCount = vm.var<int>("spnCount");
int count = spnCount;

// double - 浮点数输入
auto dspValue = vm.var<double>("dspValue");
double value = dspValue;

// QString - 文本/选择
auto cboMode = vm.var<QString>("cboMode");
QString mode = cboMode;
```

## 在条件中使用

```cpp
auto enabled = vm.var<bool>("chkEnable");
auto mode = vm.var<QString>("cboMode");
auto count = vm.var<int>("spnCount");

// 直接在条件中使用
if (enabled && mode() == "advanced" && count > 10) {
    // 执行操作
}
```

## 在表达式中使用

```cpp
auto a = vm.var<double>("txtA");
auto b = vm.var<double>("txtB");

// 数学运算
double sum = a() + b();
double product = a() * b();

// 注意：隐式转换在某些情况下可能有歧义
// 建议使用 () 或 .value() 明确获取值
```

## 实际应用

### 表单处理

```cpp
void onApply() {
    auto name = vm.var<QString>("txtName");
    auto age = vm.var<int>("spnAge");
    auto email = vm.var<QString>("txtEmail");
    auto subscribe = vm.var<bool>("chkSubscribe");
    
    // 验证
    if (name().isEmpty()) {
        showError("请输入名称");
        return;
    }
    
    if (age < 18) {
        showError("年龄必须大于18");
        return;
    }
    
    // 提交
    User user;
    user.name = name;
    user.age = age;
    user.email = email;
    user.subscribe = subscribe;
    
    saveUser(user);
}
```

### 状态同步

```cpp
void loadSettings(const Settings& settings) {
    vm.var<bool>("chkAutoSave") = settings.autoSave;
    vm.var<int>("spnInterval") = settings.interval;
    vm.var<QString>("cboTheme") = settings.theme;
}

Settings saveSettings() {
    Settings s;
    s.autoSave = vm.var<bool>("chkAutoSave");
    s.interval = vm.var<int>("spnInterval");
    s.theme = vm.var<QString>("cboTheme");
    return s;
}
```

### 动态更新

```cpp
// 根据模式更新其他值
builder.watch("cboMode", [&](const QVariant& v) {
    QString mode = v.toString();
    
    auto precision = vm.var<double>("dspPrecision");
    auto iterations = vm.var<int>("spnIterations");
    
    if (mode == "fast") {
        precision = 0.1;
        iterations = 10;
    } else if (mode == "accurate") {
        precision = 0.001;
        iterations = 100;
    }
});
```

## 访问原始 Builder

```cpp
Quik::QuikViewModel vm(&builder);

// 获取原始 builder
Quik::XMLUIBuilder* b = vm.builder();

// 使用 builder 的其他功能
b->connectButton("btnApply", []() { /* ... */ });
b->watch("varName", [](const QVariant& v) { /* ... */ });
```

## 最佳实践

### 1. 在类中定义访问器

```cpp
class MyPanel {
public:
    MyPanel() {
        ui = builder.buildFromFile("panel.xml");
        vm = new Quik::QuikViewModel(&builder);
        
        // 定义访问器为成员
        chkEnable = vm->var<bool>("chkEnable");
        txtValue = vm->var<double>("txtValue");
    }
    
    void apply() {
        if (chkEnable) {
            processValue(txtValue);
        }
    }
    
private:
    Quik::XMLUIBuilder builder;
    Quik::QuikViewModel* vm;
    QWidget* ui;
    
    Quik::Var<bool> chkEnable;
    Quik::Var<double> txtValue;
};
```

### 2. 使用 auto 简化声明

```cpp
// 推荐
auto value = vm.var<double>("txtValue");

// 也可以显式声明
Quik::Var<double> value = vm.var<double>("txtValue");
```

### 3. 注意生命周期

```cpp
// ViewModel 必须在 builder 有效期内使用
Quik::XMLUIBuilder builder;
QWidget* ui = builder.buildFromFile("panel.xml");

{
    Quik::QuikViewModel vm(&builder);
    auto value = vm.var<double>("txtValue");
    // value 在此作用域内有效
}
// vm 销毁后，之前创建的 Var 访问器仍可使用
// 因为它们持有的是 builder 的引用
```

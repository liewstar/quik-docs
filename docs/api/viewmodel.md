# QuikViewModel

`QuikViewModel` 提供类型安全的变量访问，是访问 Quik 变量的推荐方式。

## 类定义

```cpp
namespace Quik {

template<typename T>
class Var {
public:
    Var();
    Var(std::function<T()> getter, std::function<void(const T&)> setter);
    
    T operator()() const;           // 获取值
    void operator()(const T& val);  // 设置值
    operator T() const;             // 隐式转换
    Var& operator=(const T& val);   // 赋值操作符
    T value() const;                // 显式获取
    void setValue(const T& val);    // 显式设置
};

class QuikViewModel {
public:
    explicit QuikViewModel(XMLUIBuilder* builder);
    
    template<typename T>
    Var<T> var(const QString& name);
    
    XMLUIBuilder* builder() const;
};

}
```

## 构造函数

```cpp
explicit QuikViewModel(XMLUIBuilder* builder);
```

创建 ViewModel 实例。

**参数**:
- `builder` - XMLUIBuilder 指针

**示例**:
```cpp
Quik::XMLUIBuilder builder;
QWidget* ui = builder.buildFromFile("panel.xml");

Quik::QuikViewModel vm(&builder);
```

## 方法

### var\<T\>

```cpp
template<typename T>
Var<T> var(const QString& name);
```

创建类型安全的变量访问器。

**模板参数**:
- `T` - 变量类型（`bool`, `int`, `double`, `QString`）

**参数**:
- `name` - 变量名

**返回**: `Var<T>` 访问器

**示例**:
```cpp
auto chkEnable = vm.var<bool>("chkEnable");
auto spnCount = vm.var<int>("spnCount");
auto dspValue = vm.var<double>("dspValue");
auto txtName = vm.var<QString>("txtName");
```

### builder

```cpp
XMLUIBuilder* builder() const;
```

获取原始 builder。

**返回**: XMLUIBuilder 指针

**示例**:
```cpp
XMLUIBuilder* b = vm.builder();
b->connectButton("btnApply", []() { /* ... */ });
```

## Var\<T\> 类

### 获取值

```cpp
// 方式1：函数调用
T value = var();

// 方式2：隐式转换
T value = var;

// 方式3：显式方法
T value = var.value();
```

### 设置值

```cpp
// 方式1：函数调用
var(newValue);

// 方式2：赋值操作符
var = newValue;

// 方式3：显式方法
var.setValue(newValue);
```

## 支持的类型

| 类型 | 适用组件 | 示例 |
|------|---------|------|
| `bool` | CheckBox | `vm.var<bool>("chkEnable")` |
| `int` | SpinBox | `vm.var<int>("spnCount")` |
| `double` | DoubleSpinBox, LineEdit | `vm.var<double>("dspValue")` |
| `QString` | LineEdit, ComboBox | `vm.var<QString>("txtName")` |

## 使用示例

### 基本用法

```cpp
Quik::QuikViewModel vm(&builder);

// 创建访问器
auto enabled = vm.var<bool>("chkEnable");
auto count = vm.var<int>("spnCount");
auto ratio = vm.var<double>("dspRatio");
auto name = vm.var<QString>("txtName");

// 获取值
bool b = enabled;
int n = count;
double d = ratio;
QString s = name;

// 设置值
enabled = true;
count = 100;
ratio = 0.5;
name = "新名称";
```

### 在条件中使用

```cpp
auto enabled = vm.var<bool>("chkEnable");
auto mode = vm.var<QString>("cboMode");

if (enabled && mode() == "advanced") {
    // 执行高级操作
}
```

### 数学运算

```cpp
auto a = vm.var<double>("txtA");
auto b = vm.var<double>("txtB");

// 使用 () 获取值进行运算
double sum = a() + b();
double product = a() * b();
```

### 表单处理

```cpp
void MyDialog::onApply()
{
    auto name = vm.var<QString>("txtName");
    auto age = vm.var<int>("spnAge");
    auto email = vm.var<QString>("txtEmail");
    
    // 验证
    if (name().isEmpty()) {
        QMessageBox::warning(this, "错误", "请输入名称");
        return;
    }
    
    // 保存
    User user;
    user.name = name;
    user.age = age;
    user.email = email;
    saveUser(user);
}
```

### 状态保存和恢复

```cpp
void saveState()
{
    QSettings settings;
    settings.setValue("enabled", vm.var<bool>("chkEnable")());
    settings.setValue("count", vm.var<int>("spnCount")());
    settings.setValue("mode", vm.var<QString>("cboMode")());
}

void loadState()
{
    QSettings settings;
    vm.var<bool>("chkEnable") = settings.value("enabled", true).toBool();
    vm.var<int>("spnCount") = settings.value("count", 10).toInt();
    vm.var<QString>("cboMode") = settings.value("mode", "default").toString();
}
```

### 类成员访问器

```cpp
class MyPanel : public QWidget {
public:
    MyPanel() {
        ui = builder.buildFromFile("panel.xml");
        vm = new Quik::QuikViewModel(&builder);
        
        // 初始化访问器
        m_enabled = vm->var<bool>("chkEnable");
        m_value = vm->var<double>("txtValue");
        m_mode = vm->var<QString>("cboMode");
        
        // 连接按钮
        builder.connectButton("btnApply", [this]() { onApply(); });
    }
    
    void onApply() {
        if (m_enabled) {
            processValue(m_value, m_mode);
        }
    }
    
private:
    Quik::XMLUIBuilder builder;
    Quik::QuikViewModel* vm;
    QWidget* ui;
    
    Quik::Var<bool> m_enabled;
    Quik::Var<double> m_value;
    Quik::Var<QString> m_mode;
};
```

## 注意事项

### 生命周期

`Var<T>` 内部持有 builder 的引用，确保 builder 在使用 Var 期间有效：

```cpp
// 正确
Quik::XMLUIBuilder builder;
QWidget* ui = builder.buildFromFile("panel.xml");
Quik::QuikViewModel vm(&builder);
auto value = vm.var<double>("txtValue");
// builder 在作用域内有效

// 错误
Quik::Var<double> value;
{
    Quik::XMLUIBuilder builder;
    QWidget* ui = builder.buildFromFile("panel.xml");
    Quik::QuikViewModel vm(&builder);
    value = vm.var<double>("txtValue");
} // builder 已销毁
double v = value; // 未定义行为！
```

### 类型匹配

确保使用正确的类型：

```cpp
// CheckBox 使用 bool
auto chk = vm.var<bool>("chkEnable");  // 正确
auto chk = vm.var<int>("chkEnable");   // 可以，但不推荐

// SpinBox 使用 int
auto spn = vm.var<int>("spnCount");    // 正确
auto spn = vm.var<double>("spnCount"); // 可以，会自动转换

// ComboBox 使用 QString
auto cbo = vm.var<QString>("cboMode"); // 正确
```

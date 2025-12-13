# XMLUIBuilder

`XMLUIBuilder` 是 Quik 的核心类，负责解析 XML 文件并构建 Qt 界面。

## 类定义

```cpp
namespace Quik {

class XMLUIBuilder : public QObject {
    Q_OBJECT
    
public:
    explicit XMLUIBuilder(QObject* parent = nullptr);
    ~XMLUIBuilder();
    
    // 构建方法
    QWidget* buildFromFile(const QString& filePath, QWidget* parent = nullptr);
    QWidget* buildFromString(const QString& xmlContent, QWidget* parent = nullptr);
    
    // 上下文访问
    QuikContext* context() const;
    
    // 变量操作
    QWidget* getWidget(const QString& varName) const;
    QVariant getValue(const QString& varName) const;
    void setValue(const QString& varName, const QVariant& value);
    QVariantMap getAllValues() const;
    
    // 事件连接
    void connectButton(const QString& varName, std::function<void()> callback);
    
    // 变量监听
    void watch(const QString& varName, std::function<void(const QVariant&)> callback);
    void unwatch(const QString& varName);
    
    // 表单验证
    bool isValid() const;
    QMap<QString, QString> getValidationErrors() const;
    
signals:
    void buildCompleted(QWidget* rootWidget);
    void buildError(const QString& errorMessage);
};

}
```

## 构造函数

```cpp
explicit XMLUIBuilder(QObject* parent = nullptr);
```

创建一个新的 XMLUIBuilder 实例。

**参数**:
- `parent` - 父对象，用于 Qt 对象树管理

**示例**:
```cpp
Quik::XMLUIBuilder builder;
// 或
Quik::XMLUIBuilder* builder = new Quik::XMLUIBuilder(this);
```

## 构建方法

### buildFromFile

```cpp
QWidget* buildFromFile(const QString& filePath, QWidget* parent = nullptr);
```

从 XML 文件构建 UI。

**参数**:
- `filePath` - XML 文件路径
- `parent` - 父组件

**返回**: 构建的根组件，失败返回 `nullptr`

**示例**:
```cpp
QWidget* ui = builder.buildFromFile("D:/project/MyPanel.xml");
if (!ui) {
    qWarning() << "构建失败";
}
```

### buildFromString

```cpp
QWidget* buildFromString(const QString& xmlContent, QWidget* parent = nullptr);
```

从 XML 字符串构建 UI。

**参数**:
- `xmlContent` - XML 内容字符串
- `parent` - 父组件

**返回**: 构建的根组件

**示例**:
```cpp
QString xml = R"(
    <Panel>
        <CheckBox title="启用" var="chkEnable"/>
    </Panel>
)";
QWidget* ui = builder.buildFromString(xml);
```

## 上下文访问

### context

```cpp
QuikContext* context() const;
```

获取响应式上下文。

**返回**: `QuikContext` 指针

**示例**:
```cpp
QuikContext* ctx = builder.context();
ctx->setValue("varName", value);
```

## 变量操作

### getWidget

```cpp
QWidget* getWidget(const QString& varName) const;
```

通过变量名获取组件。

**参数**:
- `varName` - 变量名

**返回**: 组件指针，未找到返回 `nullptr`

**示例**:
```cpp
QWidget* widget = builder.getWidget("txtName");
if (auto* lineEdit = qobject_cast<QLineEdit*>(widget)) {
    lineEdit->setFocus();
}
```

### getValue

```cpp
QVariant getValue(const QString& varName) const;
```

获取变量值。

**参数**:
- `varName` - 变量名

**返回**: 变量值

**示例**:
```cpp
QVariant value = builder.getValue("chkEnable");
bool enabled = value.toBool();
```

### setValue

```cpp
void setValue(const QString& varName, const QVariant& value);
```

设置变量值，UI 会自动更新。

**参数**:
- `varName` - 变量名
- `value` - 新值

**示例**:
```cpp
builder.setValue("chkEnable", true);
builder.setValue("txtName", "新名称");
builder.setValue("spnCount", 42);
```

### getAllValues

```cpp
QVariantMap getAllValues() const;
```

获取所有变量值。

**返回**: 变量名到值的映射

**示例**:
```cpp
QVariantMap values = builder.getAllValues();
for (auto it = values.begin(); it != values.end(); ++it) {
    qDebug() << it.key() << "=" << it.value();
}
```

## 事件连接

### connectButton

```cpp
void connectButton(const QString& varName, std::function<void()> callback);
```

连接按钮点击事件。

**参数**:
- `varName` - 按钮变量名
- `callback` - 点击回调函数

**示例**:
```cpp
builder.connectButton("btnApply", [&]() {
    qDebug() << "应用按钮被点击";
    applySettings();
});

builder.connectButton("btnCancel", [&dialog]() {
    dialog.reject();
});
```

## 变量监听

### watch

```cpp
void watch(const QString& varName, std::function<void(const QVariant&)> callback);
```

监听变量变化。

**参数**:
- `varName` - 变量名
- `callback` - 变化回调函数

**示例**:
```cpp
builder.watch("chkEnable", [](const QVariant& v) {
    qDebug() << "启用状态:" << v.toBool();
});

builder.watch("cboMode", [this](const QVariant& v) {
    updateMode(v.toString());
});
```

### unwatch

```cpp
void unwatch(const QString& varName);
```

取消监听变量。

**参数**:
- `varName` - 变量名

**示例**:
```cpp
builder.unwatch("chkEnable");
```

## 表单验证

### isValid

```cpp
bool isValid() const;
```

检查所有表单字段是否有效。

**返回**: 所有字段验证通过返回 `true`

**示例**:
```cpp
if (builder.isValid()) {
    submitForm();
} else {
    showErrors();
}
```

### getValidationErrors

```cpp
QMap<QString, QString> getValidationErrors() const;
```

获取所有验证错误。

**返回**: 变量名到错误信息的映射

**示例**:
```cpp
auto errors = builder.getValidationErrors();
for (auto it = errors.begin(); it != errors.end(); ++it) {
    qWarning() << it.key() << ":" << it.value();
}
```

## 信号

### buildCompleted

```cpp
void buildCompleted(QWidget* rootWidget);
```

UI 构建完成时发出。

**参数**:
- `rootWidget` - 构建的根组件

### buildError

```cpp
void buildError(const QString& errorMessage);
```

构建出错时发出。

**参数**:
- `errorMessage` - 错误信息

**示例**:
```cpp
connect(&builder, &Quik::XMLUIBuilder::buildError, [](const QString& msg) {
    QMessageBox::critical(nullptr, "错误", msg);
});
```

## 完整示例

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include "Quik/Quik.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    QDialog dialog;
    dialog.setWindowTitle("XMLUIBuilder 示例");
    auto* layout = new QVBoxLayout(&dialog);
    
    // 创建 builder
    Quik::XMLUIBuilder builder;
    
    // 连接错误信号
    QObject::connect(&builder, &Quik::XMLUIBuilder::buildError,
        [](const QString& msg) {
            qCritical() << "构建错误:" << msg;
        });
    
    // 构建 UI
    QWidget* ui = Quik_BUILD(builder, "MyPanel.xml");
    if (!ui) {
        return -1;
    }
    layout->addWidget(ui);
    
    // 监听变量
    builder.watch("chkEnable", [](const QVariant& v) {
        qDebug() << "启用:" << v.toBool();
    });
    
    // 连接按钮
    builder.connectButton("btnApply", [&]() {
        if (builder.isValid()) {
            auto values = builder.getAllValues();
            qDebug() << "提交数据:" << values;
        }
    });
    
    builder.connectButton("btnCancel", [&dialog]() {
        dialog.reject();
    });
    
    return dialog.exec();
}
```

# QuikContext

`QuikContext` 是响应式上下文管理器，负责管理变量、依赖追踪和响应式更新。

## 类定义

```cpp
namespace Quik {

class QuikContext : public QObject {
    Q_OBJECT
    
public:
    explicit QuikContext(QObject* parent = nullptr);
    ~QuikContext();
    
    // 变量管理
    void registerVariable(const QString& name, QWidget* widget);
    void setValue(const QString& name, const QVariant& value);
    QVariant getValue(const QString& name) const;
    QWidget* getWidget(const QString& name) const;
    
    // 属性绑定
    void bindVisible(QWidget* widget, const QString& expression);
    void bindEnabled(QWidget* widget, const QString& expression);
    void bindProperty(QWidget* widget, const QString& property, const QString& expression);
    
    // 响应式更新
    void initializeBindings();
    QVariantMap getContext() const;
    
    // 变量监听
    void watch(const QString& name, std::function<void(const QVariant&)> callback);
    void unwatch(const QString& name);
    
signals:
    void variableChanged(const QString& name, const QVariant& value);
    
public slots:
    void onVariableChanged(const QString& name, const QVariant& value);
};

}
```

## 变量管理

### registerVariable

```cpp
void registerVariable(const QString& name, QWidget* widget);
```

注册变量并关联到组件。

**参数**:
- `name` - 变量名
- `widget` - 关联的组件

**示例**:
```cpp
QCheckBox* checkBox = new QCheckBox("启用");
context->registerVariable("chkEnable", checkBox);
```

### setValue

```cpp
void setValue(const QString& name, const QVariant& value);
```

设置变量值，触发响应式更新。

**参数**:
- `name` - 变量名
- `value` - 新值

**示例**:
```cpp
context->setValue("chkEnable", true);
context->setValue("txtName", "新名称");
```

### getValue

```cpp
QVariant getValue(const QString& name) const;
```

获取变量值。

**参数**:
- `name` - 变量名

**返回**: 变量值

**示例**:
```cpp
QVariant value = context->getValue("chkEnable");
bool enabled = value.toBool();
```

### getWidget

```cpp
QWidget* getWidget(const QString& name) const;
```

获取变量关联的组件。

**参数**:
- `name` - 变量名

**返回**: 组件指针

**示例**:
```cpp
QWidget* widget = context->getWidget("txtName");
```

## 属性绑定

### bindVisible

```cpp
void bindVisible(QWidget* widget, const QString& expression);
```

绑定组件的 visible 属性到表达式。

**参数**:
- `widget` - 目标组件
- `expression` - 条件表达式

**示例**:
```cpp
context->bindVisible(lineEdit, "$chkEnable==1");
```

### bindEnabled

```cpp
void bindEnabled(QWidget* widget, const QString& expression);
```

绑定组件的 enabled 属性到表达式。

**参数**:
- `widget` - 目标组件
- `expression` - 条件表达式

**示例**:
```cpp
context->bindEnabled(spinBox, "$cboMode==advanced");
```

### bindProperty

```cpp
void bindProperty(QWidget* widget, const QString& property, const QString& expression);
```

通用属性绑定。

**参数**:
- `widget` - 目标组件
- `property` - 属性名
- `expression` - 条件表达式

**示例**:
```cpp
context->bindProperty(widget, "visible", "$chkShow==1");
context->bindProperty(widget, "enabled", "$chkEnable==1");
```

## 响应式更新

### initializeBindings

```cpp
void initializeBindings();
```

触发所有绑定的初始化更新。在 UI 构建完成后调用。

**示例**:
```cpp
// 构建完成后初始化绑定
context->initializeBindings();
```

### getContext

```cpp
QVariantMap getContext() const;
```

获取所有变量的当前值。

**返回**: 变量名到值的映射

**示例**:
```cpp
QVariantMap ctx = context->getContext();
for (auto it = ctx.begin(); it != ctx.end(); ++it) {
    qDebug() << it.key() << "=" << it.value();
}
```

## 变量监听

### watch

```cpp
void watch(const QString& name, std::function<void(const QVariant&)> callback);
```

监听变量变化。

**参数**:
- `name` - 变量名
- `callback` - 回调函数

**示例**:
```cpp
context->watch("chkEnable", [](const QVariant& value) {
    qDebug() << "chkEnable changed to:" << value.toBool();
});
```

### unwatch

```cpp
void unwatch(const QString& name);
```

取消监听变量。

**参数**:
- `name` - 变量名

## 信号

### variableChanged

```cpp
void variableChanged(const QString& name, const QVariant& value);
```

变量值改变时发出。

**参数**:
- `name` - 变量名
- `value` - 新值

**示例**:
```cpp
connect(context, &QuikContext::variableChanged,
    [](const QString& name, const QVariant& value) {
        qDebug() << name << "=" << value;
    });
```

## 响应式机制

### 依赖追踪

当绑定表达式时，QuikContext 会自动追踪表达式中的变量依赖：

```cpp
// 绑定 visible="$chkA==1 and $chkB==1"
// 自动追踪 chkA 和 chkB 的变化
context->bindVisible(widget, "$chkA==1 and $chkB==1");
```

### 更新流程

```
变量改变 → 查找依赖绑定 → 重新求值表达式 → 更新组件属性
```

### 双向绑定

QuikContext 自动连接组件的值变化信号：

```
用户操作组件 → 组件信号 → 更新变量值 → 触发依赖更新
```

## 使用示例

```cpp
// 通常通过 XMLUIBuilder 访问 context
Quik::XMLUIBuilder builder;
QWidget* ui = builder.buildFromFile("panel.xml");

QuikContext* ctx = builder.context();

// 监听变量
ctx->watch("cboMode", [](const QVariant& v) {
    QString mode = v.toString();
    qDebug() << "模式切换到:" << mode;
});

// 手动设置值
ctx->setValue("chkEnable", true);

// 获取所有值
QVariantMap values = ctx->getContext();
```

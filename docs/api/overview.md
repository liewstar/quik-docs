# API 概览

本章提供 Quik 框架的 API 参考文档。

## 命名空间

所有 Quik 类都在 `Quik` 命名空间下：

```cpp
namespace Quik {
    class XMLUIBuilder;
    class QuikViewModel;
    class QuikContext;
    class ExpressionParser;
    class WidgetFactory;
    // ...
}
```

## 核心类

### XMLUIBuilder

XML UI 构建器，负责解析 XML 并构建 Qt 界面。

```cpp
Quik::XMLUIBuilder builder;
QWidget* ui = builder.buildFromFile("panel.xml");
```

[详细文档 →](/api/xmluibuilder)

### QuikViewModel

视图模型，提供类型安全的变量访问。

```cpp
Quik::QuikViewModel vm(&builder);
auto value = vm.var<double>("txtValue");
```

[详细文档 →](/api/viewmodel)

### QuikContext

响应式上下文，管理变量和数据绑定。

```cpp
QuikContext* ctx = builder.context();
ctx->setValue("varName", value);
```

[详细文档 →](/api/context)

### ExpressionParser

表达式解析器，解析和求值条件表达式。

```cpp
bool result = Quik::ExpressionParser::evaluate("$a==1", context);
```

[详细文档 →](/api/expression-parser)

### WidgetFactory

组件工厂，负责创建 Qt 组件。

```cpp
Quik::WidgetFactory::instance().registerCreator("MyWidget", creator);
```

[详细文档 →](/api/widget-factory)

## 辅助类

### Var\<T\>

类型安全的变量访问器。

```cpp
Quik::Var<double> value = vm.var<double>("txtValue");
double v = value;    // 获取
value = 100.0;       // 设置
```

### Condition

条件表达式结构体。

```cpp
struct Condition {
    QString variable;
    QString op;
    QVariant compareValue;
    bool isValid;
};
```

### PropertyBinding

属性绑定信息。

```cpp
struct PropertyBinding {
    QWidget* widget;
    QString property;
    QString expression;
    Condition condition;
};
```

## 宏定义

### Quik_XML

获取与源文件同目录的 XML 文件路径。

```cpp
QString path = Quik_XML("MyPanel.xml");
```

### Quik_BUILD

一行代码构建 UI。

```cpp
QWidget* ui = Quik_BUILD(builder, "MyPanel.xml");
```

## 头文件

### 主头文件

```cpp
#include "Quik/Quik.h"  // 包含所有必要头文件
```

### 单独头文件

```cpp
#include "Quik/QuikAPI.h"
#include "parser/XMLUIBuilder.h"
#include "core/QuikViewModel.h"
#include "core/QuikContext.h"
#include "parser/ExpressionParser.h"
#include "widget/WidgetFactory.h"
```

## 信号

### XMLUIBuilder 信号

| 信号 | 说明 |
|------|------|
| `buildCompleted(QWidget*)` | UI 构建完成 |
| `buildError(QString)` | 构建出错 |

### QuikContext 信号

| 信号 | 说明 |
|------|------|
| `variableChanged(QString, QVariant)` | 变量值改变 |

## 类型定义

```cpp
// 组件创建函数类型
using WidgetCreator = std::function<QWidget*(const QDomElement&, QuikContext*)>;
```

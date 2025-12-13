# ExpressionParser

`ExpressionParser` 负责解析和求值条件表达式。

## 类定义

```cpp
namespace Quik {

struct Condition {
    QString variable;           // 左侧变量名
    QString op;                 // 运算符
    QVariant compareValue;      // 比较值
    QString compareVariable;    // 右侧变量名（如果是变量）
    bool isRightVariable;       // 右侧是否是变量
    bool isValid;               // 是否解析成功
};

struct CompoundCondition {
    QList<Condition> conditions;  // 条件列表
    QStringList logicOps;         // 逻辑运算符
    bool isCompound;              // 是否是复合表达式
    bool isValid;
};

class ExpressionParser {
public:
    // 解析
    static Condition parse(const QString& expr);
    static CompoundCondition parseCompound(const QString& expr);
    
    // 求值
    static bool evaluate(const Condition& condition, const QVariantMap& context);
    static bool evaluate(const QString& expr, const QVariantMap& context);
    static bool evaluate(const CompoundCondition& compound, const QVariantMap& context);
    
    // 工具方法
    static bool isExpression(const QString& str);
    static QStringList extractVariables(const QString& expr);
};

}
```

## 表达式语法

### 基本语法

```
$变量名 运算符 值
```

### 支持的运算符

| 运算符 | 说明 |
|--------|------|
| `==` | 等于 |
| `!=` | 不等于 |
| `>` | 大于 |
| `<` | 小于 |
| `>=` | 大于等于 |
| `<=` | 小于等于 |

### 复合表达式

```
$var1==value1 and $var2==value2
$var1==value1 or $var2==value2
($var1==1 and $var2==2) or $var3==3
```

## 解析方法

### parse

```cpp
static Condition parse(const QString& expr);
```

解析简单条件表达式。

**参数**:
- `expr` - 表达式字符串

**返回**: `Condition` 结构体

**示例**:
```cpp
Condition cond = ExpressionParser::parse("$chkEnable==1");
if (cond.isValid) {
    qDebug() << "变量:" << cond.variable;  // "chkEnable"
    qDebug() << "运算符:" << cond.op;       // "=="
    qDebug() << "值:" << cond.compareValue; // 1
}
```

### parseCompound

```cpp
static CompoundCondition parseCompound(const QString& expr);
```

解析复合条件表达式。

**参数**:
- `expr` - 表达式字符串

**返回**: `CompoundCondition` 结构体

**示例**:
```cpp
CompoundCondition cond = ExpressionParser::parseCompound("$a==1 and $b==2");
if (cond.isValid) {
    qDebug() << "条件数量:" << cond.conditions.size();  // 2
    qDebug() << "逻辑运算符:" << cond.logicOps;         // ["and"]
}
```

## 求值方法

### evaluate (Condition)

```cpp
static bool evaluate(const Condition& condition, const QVariantMap& context);
```

求值已解析的条件。

**参数**:
- `condition` - 已解析的条件
- `context` - 变量上下文

**返回**: 求值结果

**示例**:
```cpp
QVariantMap context;
context["chkEnable"] = true;

Condition cond = ExpressionParser::parse("$chkEnable==1");
bool result = ExpressionParser::evaluate(cond, context);  // true
```

### evaluate (QString)

```cpp
static bool evaluate(const QString& expr, const QVariantMap& context);
```

直接求值表达式字符串。

**参数**:
- `expr` - 表达式字符串
- `context` - 变量上下文

**返回**: 求值结果

**示例**:
```cpp
QVariantMap context;
context["count"] = 15;

bool result = ExpressionParser::evaluate("$count>10", context);  // true
```

### evaluate (CompoundCondition)

```cpp
static bool evaluate(const CompoundCondition& compound, const QVariantMap& context);
```

求值复合条件。

**参数**:
- `compound` - 已解析的复合条件
- `context` - 变量上下文

**返回**: 求值结果

**示例**:
```cpp
QVariantMap context;
context["a"] = 1;
context["b"] = 2;

CompoundCondition cond = ExpressionParser::parseCompound("$a==1 and $b==2");
bool result = ExpressionParser::evaluate(cond, context);  // true
```

## 工具方法

### isExpression

```cpp
static bool isExpression(const QString& str);
```

检查字符串是否是表达式。

**参数**:
- `str` - 待检查的字符串

**返回**: 是否是表达式

**示例**:
```cpp
bool is1 = ExpressionParser::isExpression("$chkEnable==1");  // true
bool is2 = ExpressionParser::isExpression("普通文本");        // false
```

### extractVariables

```cpp
static QStringList extractVariables(const QString& expr);
```

从表达式中提取变量名。

**参数**:
- `expr` - 表达式字符串

**返回**: 变量名列表

**示例**:
```cpp
QStringList vars = ExpressionParser::extractVariables("$a==1 and $b==2");
// vars = ["a", "b"]
```

## 使用示例

### 简单条件

```cpp
QVariantMap ctx;
ctx["chkEnable"] = true;
ctx["cboMode"] = "advanced";
ctx["spnCount"] = 50;

// 布尔比较
bool r1 = ExpressionParser::evaluate("$chkEnable==1", ctx);  // true

// 字符串比较
bool r2 = ExpressionParser::evaluate("$cboMode==advanced", ctx);  // true

// 数值比较
bool r3 = ExpressionParser::evaluate("$spnCount>10", ctx);  // true
bool r4 = ExpressionParser::evaluate("$spnCount<=100", ctx);  // true
```

### 复合条件

```cpp
QVariantMap ctx;
ctx["a"] = 1;
ctx["b"] = 2;
ctx["c"] = 3;

// AND
bool r1 = ExpressionParser::evaluate("$a==1 and $b==2", ctx);  // true

// OR
bool r2 = ExpressionParser::evaluate("$a==0 or $b==2", ctx);  // true

// 混合
bool r3 = ExpressionParser::evaluate("($a==1 and $b==2) or $c==0", ctx);  // true
```

### 变量比较

```cpp
QVariantMap ctx;
ctx["min"] = 10;
ctx["max"] = 100;
ctx["value"] = 50;

// 变量与变量比较
bool r1 = ExpressionParser::evaluate("$value>$min", ctx);   // true
bool r2 = ExpressionParser::evaluate("$value<$max", ctx);   // true
bool r3 = ExpressionParser::evaluate("$min<$max", ctx);     // true
```

### 依赖追踪

```cpp
QString expr = "$chkA==1 and $chkB==1 or $chkC==1";
QStringList deps = ExpressionParser::extractVariables(expr);
// deps = ["chkA", "chkB", "chkC"]

// 用于建立依赖关系
for (const QString& var : deps) {
    // 当 var 变化时，重新求值表达式
}
```

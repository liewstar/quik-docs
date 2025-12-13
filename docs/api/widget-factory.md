# WidgetFactory

`WidgetFactory` 是组件工厂，负责根据 XML 标签名创建对应的 Qt 组件。

## 类定义

```cpp
namespace Quik {

using WidgetCreator = std::function<QWidget*(const QDomElement&, QuikContext*)>;

class WidgetFactory {
public:
    static WidgetFactory& instance();
    
    void registerCreator(const QString& tagName, WidgetCreator creator);
    QWidget* create(const QString& tagName, const QDomElement& element, QuikContext* context);
    bool hasCreator(const QString& tagName) const;
    void registerBuiltinWidgets();
};

}
```

## 获取实例

```cpp
static WidgetFactory& instance();
```

获取单例实例。

**示例**:
```cpp
Quik::WidgetFactory& factory = Quik::WidgetFactory::instance();
```

## 方法

### registerCreator

```cpp
void registerCreator(const QString& tagName, WidgetCreator creator);
```

注册组件创建器。

**参数**:
- `tagName` - XML 标签名
- `creator` - 创建函数

**示例**:
```cpp
Quik::WidgetFactory::instance().registerCreator("MyWidget",
    [](const QDomElement& element, Quik::QuikContext* context) -> QWidget* {
        auto* widget = new MyCustomWidget();
        // 处理属性...
        return widget;
    }
);
```

### create

```cpp
QWidget* create(const QString& tagName, const QDomElement& element, QuikContext* context);
```

创建组件。

**参数**:
- `tagName` - XML 标签名
- `element` - XML 元素
- `context` - 响应式上下文

**返回**: 创建的组件，未注册返回 `nullptr`

**示例**:
```cpp
QWidget* widget = factory.create("CheckBox", element, context);
```

### hasCreator

```cpp
bool hasCreator(const QString& tagName) const;
```

检查标签是否已注册。

**参数**:
- `tagName` - XML 标签名

**返回**: 是否已注册

**示例**:
```cpp
if (factory.hasCreator("MyWidget")) {
    // 已注册
}
```

### registerBuiltinWidgets

```cpp
void registerBuiltinWidgets();
```

注册所有内置组件。在首次使用时自动调用。

## 内置组件

| 标签名 | Qt 组件 |
|--------|---------|
| `Label` | QLabel |
| `LineEdit` | QLineEdit |
| `CheckBox` | QCheckBox |
| `ComboBox` | QComboBox |
| `SpinBox` | QSpinBox |
| `DoubleSpinBox` | QDoubleSpinBox |
| `PushButton` | QPushButton |
| `GroupBox` | QGroupBox |
| `InnerGroupBox` | QGroupBox (轻量样式) |
| `RadioButton` | QRadioButton |
| `HLine` | QFrame (水平线) |
| `VLine` | QFrame (垂直线) |
| `ListBox` | QListWidget |
| `TabBar` | QTabWidget |
| `HLayoutWidget` | QWidget + QHBoxLayout |
| `VLayoutWidget` | QWidget + QVBoxLayout |
| `addStretch` | QSpacerItem |
| `PointLineEdit` | 自定义点坐标输入 |
| `TwoPointLineEdit` | 自定义两点坐标输入 |

## 自定义组件

### 创建自定义组件

```cpp
// 1. 定义自定义组件类
class ColorPicker : public QWidget {
    Q_OBJECT
public:
    ColorPicker(QWidget* parent = nullptr);
    
    QColor color() const;
    void setColor(const QColor& color);
    
signals:
    void colorChanged(const QColor& color);
    
private:
    QColor m_color;
};

// 2. 注册到工厂
void registerColorPicker() {
    Quik::WidgetFactory::instance().registerCreator("ColorPicker",
        [](const QDomElement& element, Quik::QuikContext* context) -> QWidget* {
            auto* picker = new ColorPicker();
            
            // 处理 var 属性
            QString var = element.attribute("var");
            if (!var.isEmpty()) {
                context->registerVariable(var, picker);
                
                // 连接信号
                QObject::connect(picker, &ColorPicker::colorChanged,
                    [context, var](const QColor& color) {
                        context->setValue(var, color.name());
                    });
            }
            
            // 处理 default 属性
            QString defaultColor = element.attribute("default", "#ffffff");
            picker->setColor(QColor(defaultColor));
            
            return picker;
        }
    );
}
```

### 在 XML 中使用

```xml
<Panel>
    <ColorPicker title="选择颜色" var="pickerColor" default="#ff0000"/>
</Panel>
```

### 处理通用属性

```cpp
Quik::WidgetFactory::instance().registerCreator("MyWidget",
    [](const QDomElement& element, Quik::QuikContext* context) -> QWidget* {
        auto* widget = new MyWidget();
        
        // 处理 var
        QString var = element.attribute("var");
        if (!var.isEmpty()) {
            context->registerVariable(var, widget);
        }
        
        // 处理 visible
        QString visible = element.attribute("visible");
        if (!visible.isEmpty()) {
            context->bindVisible(widget, visible);
        }
        
        // 处理 enabled
        QString enabled = element.attribute("enabled");
        if (!enabled.isEmpty()) {
            context->bindEnabled(widget, enabled);
        }
        
        // 处理 tooltip
        QString tooltip = element.attribute("tooltip");
        if (!tooltip.isEmpty()) {
            widget->setToolTip(tooltip);
        }
        
        return widget;
    }
);
```

## 辅助方法

WidgetFactory 提供了一些静态辅助方法：

```cpp
// 获取属性值
static QString getAttribute(const QDomElement& element, const QString& name, 
                           const QString& defaultValue = QString());

// 获取布尔属性
static bool getBoolAttribute(const QDomElement& element, const QString& name, 
                            bool defaultValue = false);

// 获取整数属性
static int getIntAttribute(const QDomElement& element, const QString& name, 
                          int defaultValue = 0);

// 获取浮点属性
static double getDoubleAttribute(const QDomElement& element, const QString& name, 
                                double defaultValue = 0.0);
```

## 完整示例

```cpp
#include "Quik/Quik.h"
#include "widget/WidgetFactory.h"

// 自定义滑块组件
class LabeledSlider : public QWidget {
    Q_OBJECT
public:
    LabeledSlider(QWidget* parent = nullptr) : QWidget(parent) {
        auto* layout = new QHBoxLayout(this);
        m_slider = new QSlider(Qt::Horizontal);
        m_label = new QLabel("0");
        layout->addWidget(m_slider);
        layout->addWidget(m_label);
        
        connect(m_slider, &QSlider::valueChanged, [this](int v) {
            m_label->setText(QString::number(v));
            emit valueChanged(v);
        });
    }
    
    int value() const { return m_slider->value(); }
    void setValue(int v) { m_slider->setValue(v); }
    void setRange(int min, int max) { m_slider->setRange(min, max); }
    
signals:
    void valueChanged(int value);
    
private:
    QSlider* m_slider;
    QLabel* m_label;
};

// 注册
void registerCustomWidgets() {
    Quik::WidgetFactory::instance().registerCreator("LabeledSlider",
        [](const QDomElement& element, Quik::QuikContext* context) -> QWidget* {
            auto* slider = new LabeledSlider();
            
            // 范围
            int min = element.attribute("min", "0").toInt();
            int max = element.attribute("max", "100").toInt();
            slider->setRange(min, max);
            
            // 默认值
            int defaultVal = element.attribute("default", "0").toInt();
            slider->setValue(defaultVal);
            
            // 变量绑定
            QString var = element.attribute("var");
            if (!var.isEmpty()) {
                context->registerVariable(var, slider);
                context->setValue(var, defaultVal);
                
                QObject::connect(slider, &LabeledSlider::valueChanged,
                    [context, var](int v) {
                        context->setValue(var, v);
                    });
            }
            
            return slider;
        }
    );
}

// 使用
int main() {
    registerCustomWidgets();
    
    QString xml = R"(
        <Panel>
            <LabeledSlider title="音量" var="sldVolume" min="0" max="100" default="50"/>
        </Panel>
    )";
    
    Quik::XMLUIBuilder builder;
    QWidget* ui = builder.buildFromString(xml);
    // ...
}
```

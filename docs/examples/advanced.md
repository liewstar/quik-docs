# 高级用法

本章展示 Quik 的高级用法示例。

## 动态表单

根据配置动态生成表单。

### 配置驱动的表单

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include "Quik/Quik.h"

// 动态生成 XML
QString generateFormXml(const QStringList& fields) {
    QString xml = "<Panel><GroupBox title=\"动态表单\">";
    
    for (const QString& field : fields) {
        xml += QString("<LineEdit title=\"%1\" var=\"txt%1\"/>").arg(field);
    }
    
    xml += "</GroupBox>";
    xml += "<HLayoutWidget><addStretch/>";
    xml += "<PushButton text=\"提交\" var=\"btnSubmit\"/>";
    xml += "</HLayoutWidget></Panel>";
    
    return xml;
}

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    // 动态字段列表
    QStringList fields = {"姓名", "邮箱", "电话", "地址"};
    
    QString xml = generateFormXml(fields);
    
    QDialog dialog;
    dialog.setWindowTitle("动态表单");
    auto* layout = new QVBoxLayout(&dialog);
    
    Quik::XMLUIBuilder builder;
    QWidget* ui = builder.buildFromString(xml);
    layout->addWidget(ui);
    
    Quik::QuikViewModel vm(&builder);
    
    builder.connectButton("btnSubmit", [&]() {
        for (const QString& field : fields) {
            QString varName = "txt" + field;
            qDebug() << field << ":" << vm.var<QString>(varName)();
        }
        dialog.accept();
    });
    
    return dialog.exec();
}
```

## 多面板管理

管理多个独立的 UI 面板。

```cpp
#include <QApplication>
#include <QMainWindow>
#include <QDockWidget>
#include <QVBoxLayout>
#include "Quik/Quik.h"

class PanelManager {
public:
    struct Panel {
        Quik::XMLUIBuilder* builder;
        Quik::QuikViewModel* vm;
        QWidget* widget;
    };
    
    Panel createPanel(const QString& xmlFile, QWidget* parent = nullptr) {
        Panel panel;
        panel.builder = new Quik::XMLUIBuilder();
        panel.widget = panel.builder->buildFromFile(xmlFile, parent);
        panel.vm = new Quik::QuikViewModel(panel.builder);
        m_panels.append(panel);
        return panel;
    }
    
    void connectPanels() {
        // 面板间联动示例
        if (m_panels.size() >= 2) {
            // 面板1的变化影响面板2
            m_panels[0].builder->watch("cboMode", [this](const QVariant& v) {
                if (m_panels.size() > 1) {
                    m_panels[1].vm->var<QString>("txtStatus") = 
                        "模式: " + v.toString();
                }
            });
        }
    }
    
private:
    QList<Panel> m_panels;
};

// 主窗口示例
class MainWindow : public QMainWindow {
public:
    MainWindow() {
        setWindowTitle("多面板示例");
        resize(800, 600);
        
        // 创建左侧面板
        auto leftPanel = manager.createPanel("left_panel.xml");
        auto* leftDock = new QDockWidget("控制面板", this);
        leftDock->setWidget(leftPanel.widget);
        addDockWidget(Qt::LeftDockWidgetArea, leftDock);
        
        // 创建右侧面板
        auto rightPanel = manager.createPanel("right_panel.xml");
        auto* rightDock = new QDockWidget("属性面板", this);
        rightDock->setWidget(rightPanel.widget);
        addDockWidget(Qt::RightDockWidgetArea, rightDock);
        
        // 连接面板
        manager.connectPanels();
    }
    
private:
    PanelManager manager;
};
```

## 表单验证器

自定义验证逻辑。

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include <QMessageBox>
#include "Quik/Quik.h"

class FormValidator {
public:
    using ValidatorFunc = std::function<bool(const QVariant&, QString&)>;
    
    void addRule(const QString& varName, ValidatorFunc validator) {
        m_rules[varName] = validator;
    }
    
    bool validate(Quik::XMLUIBuilder& builder, QStringList& errors) {
        errors.clear();
        bool allValid = true;
        
        for (auto it = m_rules.begin(); it != m_rules.end(); ++it) {
            QVariant value = builder.getValue(it.key());
            QString error;
            
            if (!it.value()(value, error)) {
                errors << QString("%1: %2").arg(it.key()).arg(error);
                allValid = false;
            }
        }
        
        return allValid;
    }
    
private:
    QMap<QString, ValidatorFunc> m_rules;
};

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    QString xml = R"(
        <Panel>
            <GroupBox title="注册">
                <LineEdit title="用户名" var="txtUsername"/>
                <LineEdit title="邮箱" var="txtEmail"/>
                <SpinBox title="年龄" var="spnAge" min="0" max="150"/>
            </GroupBox>
            <HLayoutWidget>
                <addStretch/>
                <PushButton text="提交" var="btnSubmit"/>
            </HLayoutWidget>
        </Panel>
    )";
    
    QDialog dialog;
    dialog.setWindowTitle("表单验证示例");
    auto* layout = new QVBoxLayout(&dialog);
    
    Quik::XMLUIBuilder builder;
    QWidget* ui = builder.buildFromString(xml);
    layout->addWidget(ui);
    
    // 设置验证规则
    FormValidator validator;
    
    validator.addRule("txtUsername", [](const QVariant& v, QString& err) {
        QString s = v.toString();
        if (s.isEmpty()) {
            err = "用户名不能为空";
            return false;
        }
        if (s.length() < 4) {
            err = "用户名至少4个字符";
            return false;
        }
        return true;
    });
    
    validator.addRule("txtEmail", [](const QVariant& v, QString& err) {
        QString s = v.toString();
        if (!s.contains("@") || !s.contains(".")) {
            err = "邮箱格式不正确";
            return false;
        }
        return true;
    });
    
    validator.addRule("spnAge", [](const QVariant& v, QString& err) {
        int age = v.toInt();
        if (age < 18) {
            err = "年龄必须大于18岁";
            return false;
        }
        return true;
    });
    
    builder.connectButton("btnSubmit", [&]() {
        QStringList errors;
        if (validator.validate(builder, errors)) {
            QMessageBox::information(&dialog, "成功", "验证通过！");
            dialog.accept();
        } else {
            QMessageBox::warning(&dialog, "验证失败", errors.join("\n"));
        }
    });
    
    return dialog.exec();
}
```

## 状态机集成

将 Quik 与状态机结合使用。

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include <QStateMachine>
#include <QState>
#include "Quik/Quik.h"

class StatefulDialog : public QDialog {
public:
    StatefulDialog() {
        setWindowTitle("状态机示例");
        
        auto* layout = new QVBoxLayout(this);
        
        QString xml = R"(
            <Panel>
                <GroupBox title="状态">
                    <Label text="当前状态: 初始" var="lblStatus"/>
                </GroupBox>
                <GroupBox title="操作">
                    <PushButton text="开始" var="btnStart"/>
                    <PushButton text="暂停" var="btnPause"/>
                    <PushButton text="停止" var="btnStop"/>
                </GroupBox>
                <GroupBox title="参数" var="grpParams">
                    <SpinBox title="速度" var="spnSpeed" min="1" max="100" default="50"/>
                </GroupBox>
            </Panel>
        )";
        
        ui = builder.buildFromString(xml);
        layout->addWidget(ui);
        
        vm = new Quik::QuikViewModel(&builder);
        
        setupStateMachine();
    }
    
private:
    void setupStateMachine() {
        machine = new QStateMachine(this);
        
        // 定义状态
        auto* idleState = new QState();
        auto* runningState = new QState();
        auto* pausedState = new QState();
        
        // 状态进入时的动作
        connect(idleState, &QState::entered, [this]() {
            updateUI("初始", true, false, false, true);
        });
        
        connect(runningState, &QState::entered, [this]() {
            updateUI("运行中", false, true, true, false);
        });
        
        connect(pausedState, &QState::entered, [this]() {
            updateUI("已暂停", true, false, true, false);
        });
        
        // 获取按钮
        auto* btnStart = qobject_cast<QPushButton*>(builder.getWidget("btnStart"));
        auto* btnPause = qobject_cast<QPushButton*>(builder.getWidget("btnPause"));
        auto* btnStop = qobject_cast<QPushButton*>(builder.getWidget("btnStop"));
        
        // 定义转换
        idleState->addTransition(btnStart, &QPushButton::clicked, runningState);
        runningState->addTransition(btnPause, &QPushButton::clicked, pausedState);
        runningState->addTransition(btnStop, &QPushButton::clicked, idleState);
        pausedState->addTransition(btnStart, &QPushButton::clicked, runningState);
        pausedState->addTransition(btnStop, &QPushButton::clicked, idleState);
        
        machine->addState(idleState);
        machine->addState(runningState);
        machine->addState(pausedState);
        machine->setInitialState(idleState);
        
        machine->start();
    }
    
    void updateUI(const QString& status, bool startEnabled, bool pauseEnabled, 
                  bool stopEnabled, bool paramsEnabled) {
        // 更新状态标签
        if (auto* label = qobject_cast<QLabel*>(builder.getWidget("lblStatus"))) {
            label->setText("当前状态: " + status);
        }
        
        // 更新按钮状态
        if (auto* btn = builder.getWidget("btnStart")) btn->setEnabled(startEnabled);
        if (auto* btn = builder.getWidget("btnPause")) btn->setEnabled(pauseEnabled);
        if (auto* btn = builder.getWidget("btnStop")) btn->setEnabled(stopEnabled);
        
        // 更新参数面板
        if (auto* grp = builder.getWidget("grpParams")) grp->setEnabled(paramsEnabled);
    }
    
    Quik::XMLUIBuilder builder;
    Quik::QuikViewModel* vm;
    QWidget* ui;
    QStateMachine* machine;
};

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    StatefulDialog dialog;
    return dialog.exec();
}
```

## 自定义组件注册

注册和使用自定义组件。

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include <QSlider>
#include <QLabel>
#include "Quik/Quik.h"
#include "widget/WidgetFactory.h"

// 自定义滑块组件
class LabeledSlider : public QWidget {
    Q_OBJECT
public:
    LabeledSlider(QWidget* parent = nullptr) : QWidget(parent) {
        auto* layout = new QHBoxLayout(this);
        layout->setContentsMargins(0, 0, 0, 0);
        
        m_slider = new QSlider(Qt::Horizontal);
        m_label = new QLabel("0");
        m_label->setMinimumWidth(40);
        m_label->setAlignment(Qt::AlignRight);
        
        layout->addWidget(m_slider, 1);
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

// 注册自定义组件
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

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    // 注册自定义组件
    registerCustomWidgets();
    
    QString xml = R"(
        <Panel>
            <GroupBox title="自定义组件示例">
                <LabeledSlider title="音量" var="sldVolume" min="0" max="100" default="50"/>
                <LabeledSlider title="亮度" var="sldBrightness" min="0" max="255" default="128"/>
                <LabeledSlider title="对比度" var="sldContrast" min="-100" max="100" default="0"/>
            </GroupBox>
            <HLayoutWidget>
                <addStretch/>
                <PushButton text="应用" var="btnApply"/>
            </HLayoutWidget>
        </Panel>
    )";
    
    QDialog dialog;
    dialog.setWindowTitle("自定义组件示例");
    auto* layout = new QVBoxLayout(&dialog);
    
    Quik::XMLUIBuilder builder;
    QWidget* ui = builder.buildFromString(xml);
    layout->addWidget(ui);
    
    Quik::QuikViewModel vm(&builder);
    
    // 监听变化
    builder.watch("sldVolume", [](const QVariant& v) {
        qDebug() << "音量:" << v.toInt();
    });
    
    builder.connectButton("btnApply", [&]() {
        qDebug() << "音量:" << vm.var<int>("sldVolume")();
        qDebug() << "亮度:" << vm.var<int>("sldBrightness")();
        qDebug() << "对比度:" << vm.var<int>("sldContrast")();
        dialog.accept();
    });
    
    return dialog.exec();
}

#include "main.moc"
```

## 数据绑定到模型

将 Quik 变量绑定到数据模型。

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include "Quik/Quik.h"

// 数据模型
class UserModel : public QObject {
    Q_OBJECT
    Q_PROPERTY(QString name READ name WRITE setName NOTIFY nameChanged)
    Q_PROPERTY(int age READ age WRITE setAge NOTIFY ageChanged)
    Q_PROPERTY(QString email READ email WRITE setEmail NOTIFY emailChanged)
    
public:
    QString name() const { return m_name; }
    void setName(const QString& v) { if (m_name != v) { m_name = v; emit nameChanged(); } }
    
    int age() const { return m_age; }
    void setAge(int v) { if (m_age != v) { m_age = v; emit ageChanged(); } }
    
    QString email() const { return m_email; }
    void setEmail(const QString& v) { if (m_email != v) { m_email = v; emit emailChanged(); } }
    
signals:
    void nameChanged();
    void ageChanged();
    void emailChanged();
    
private:
    QString m_name;
    int m_age = 0;
    QString m_email;
};

// 绑定器
class ModelBinder {
public:
    static void bind(Quik::XMLUIBuilder& builder, UserModel* model) {
        // UI → Model
        builder.watch("txtName", [model](const QVariant& v) {
            model->setName(v.toString());
        });
        builder.watch("spnAge", [model](const QVariant& v) {
            model->setAge(v.toInt());
        });
        builder.watch("txtEmail", [model](const QVariant& v) {
            model->setEmail(v.toString());
        });
        
        // Model → UI
        QObject::connect(model, &UserModel::nameChanged, [&builder, model]() {
            builder.setValue("txtName", model->name());
        });
        QObject::connect(model, &UserModel::ageChanged, [&builder, model]() {
            builder.setValue("spnAge", model->age());
        });
        QObject::connect(model, &UserModel::emailChanged, [&builder, model]() {
            builder.setValue("txtEmail", model->email());
        });
    }
};

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    QString xml = R"(
        <Panel>
            <GroupBox title="用户信息">
                <LineEdit title="姓名" var="txtName"/>
                <SpinBox title="年龄" var="spnAge" min="0" max="150"/>
                <LineEdit title="邮箱" var="txtEmail"/>
            </GroupBox>
            <HLayoutWidget>
                <PushButton text="从模型加载" var="btnLoad"/>
                <addStretch/>
                <PushButton text="保存到模型" var="btnSave"/>
            </HLayoutWidget>
        </Panel>
    )";
    
    QDialog dialog;
    dialog.setWindowTitle("模型绑定示例");
    auto* layout = new QVBoxLayout(&dialog);
    
    Quik::XMLUIBuilder builder;
    QWidget* ui = builder.buildFromString(xml);
    layout->addWidget(ui);
    
    // 创建模型
    UserModel model;
    model.setName("张三");
    model.setAge(25);
    model.setEmail("zhangsan@example.com");
    
    // 绑定
    ModelBinder::bind(builder, &model);
    
    builder.connectButton("btnLoad", [&]() {
        builder.setValue("txtName", model.name());
        builder.setValue("spnAge", model.age());
        builder.setValue("txtEmail", model.email());
    });
    
    builder.connectButton("btnSave", [&]() {
        qDebug() << "模型数据:";
        qDebug() << "  姓名:" << model.name();
        qDebug() << "  年龄:" << model.age();
        qDebug() << "  邮箱:" << model.email();
    });
    
    return dialog.exec();
}

#include "main.moc"
```

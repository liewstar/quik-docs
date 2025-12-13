# 基础示例

本章展示 Quik 的基础用法示例。

## Hello World

最简单的 Quik 程序：

### XML 文件 (hello.xml)

```xml
<Panel>
    <Label text="Hello, Quik!"/>
    <PushButton text="点击我" var="btnHello"/>
</Panel>
```

### C++ 代码

```cpp
#include <QApplication>
#include <QWidget>
#include <QMessageBox>
#include "Quik/Quik.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    Quik::XMLUIBuilder builder;
    QWidget* ui = Quik_BUILD(builder, "hello.xml");
    
    builder.connectButton("btnHello", []() {
        QMessageBox::information(nullptr, "提示", "Hello, Quik!");
    });
    
    ui->show();
    return app.exec();
}
```

## 简单表单

### XML 文件 (form.xml)

```xml
<Panel>
    <GroupBox title="用户信息">
        <LineEdit title="姓名" var="txtName" placeholder="请输入姓名"/>
        <LineEdit title="邮箱" var="txtEmail" placeholder="请输入邮箱"/>
        <SpinBox title="年龄" var="spnAge" min="0" max="150" default="25"/>
    </GroupBox>
    
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="提交" var="btnSubmit"/>
        <PushButton text="重置" var="btnReset"/>
    </HLayoutWidget>
</Panel>
```

### C++ 代码

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include <QMessageBox>
#include "Quik/Quik.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    QDialog dialog;
    dialog.setWindowTitle("用户表单");
    auto* layout = new QVBoxLayout(&dialog);
    
    Quik::XMLUIBuilder builder;
    QWidget* ui = Quik_BUILD(builder, "form.xml");
    layout->addWidget(ui);
    
    Quik::QuikViewModel vm(&builder);
    auto name = vm.var<QString>("txtName");
    auto email = vm.var<QString>("txtEmail");
    auto age = vm.var<int>("spnAge");
    
    builder.connectButton("btnSubmit", [&]() {
        if (name().isEmpty()) {
            QMessageBox::warning(&dialog, "错误", "请输入姓名");
            return;
        }
        
        QString info = QString("姓名: %1\n邮箱: %2\n年龄: %3")
            .arg(name())
            .arg(email())
            .arg(age());
        QMessageBox::information(&dialog, "提交成功", info);
    });
    
    builder.connectButton("btnReset", [&]() {
        name = "";
        email = "";
        age = 25;
    });
    
    return dialog.exec();
}
```

## 条件显示

### XML 文件 (conditional.xml)

```xml
<Panel>
    <GroupBox title="设置">
        <CheckBox title="启用高级选项" var="chkAdvanced"/>
        
        <LineEdit title="基本参数" var="txtBasic" default="默认值"/>
        
        <!-- 仅当勾选时显示 -->
        <LineEdit title="高级参数1" var="txtAdv1" visible="$chkAdvanced==1"/>
        <LineEdit title="高级参数2" var="txtAdv2" visible="$chkAdvanced==1"/>
    </GroupBox>
    
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="确定" var="btnOK"/>
    </HLayoutWidget>
</Panel>
```

### C++ 代码

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include "Quik/Quik.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    QDialog dialog;
    dialog.setWindowTitle("条件显示示例");
    auto* layout = new QVBoxLayout(&dialog);
    
    Quik::XMLUIBuilder builder;
    QWidget* ui = Quik_BUILD(builder, "conditional.xml");
    layout->addWidget(ui);
    
    // 监听复选框变化
    builder.watch("chkAdvanced", [](const QVariant& v) {
        qDebug() << "高级选项:" << (v.toBool() ? "启用" : "禁用");
    });
    
    builder.connectButton("btnOK", [&dialog]() {
        dialog.accept();
    });
    
    return dialog.exec();
}
```

## 下拉联动

### XML 文件 (combo.xml)

```xml
<Panel>
    <GroupBox title="选择">
        <ComboBox title="类型" var="cboType" default="type1">
            <Choice text="类型一" val="type1"/>
            <Choice text="类型二" val="type2"/>
            <Choice text="类型三" val="type3"/>
        </ComboBox>
        
        <!-- 根据类型显示不同内容 -->
        <LineEdit title="类型一参数" var="txtParam1" visible="$cboType==type1"/>
        <SpinBox title="类型二数量" var="spnParam2" visible="$cboType==type2" min="1" max="100"/>
        <CheckBox title="类型三选项" var="chkParam3" visible="$cboType==type3"/>
    </GroupBox>
    
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="确定" var="btnOK"/>
    </HLayoutWidget>
</Panel>
```

### C++ 代码

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include "Quik/Quik.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    QDialog dialog;
    dialog.setWindowTitle("下拉联动示例");
    auto* layout = new QVBoxLayout(&dialog);
    
    Quik::XMLUIBuilder builder;
    QWidget* ui = Quik_BUILD(builder, "combo.xml");
    layout->addWidget(ui);
    
    Quik::QuikViewModel vm(&builder);
    auto type = vm.var<QString>("cboType");
    
    builder.connectButton("btnOK", [&]() {
        QString t = type;
        qDebug() << "选择的类型:" << t;
        
        if (t == "type1") {
            qDebug() << "参数1:" << vm.var<QString>("txtParam1")();
        } else if (t == "type2") {
            qDebug() << "数量:" << vm.var<int>("spnParam2")();
        } else if (t == "type3") {
            qDebug() << "选项:" << vm.var<bool>("chkParam3")();
        }
        
        dialog.accept();
    });
    
    return dialog.exec();
}
```

## 单选按钮组

### XML 文件 (radio.xml)

```xml
<Panel>
    <GroupBox title="对齐方式">
        <RadioButton title="左对齐" var="rdoAlign" val="left" default="1"/>
        <RadioButton title="居中" var="rdoAlign" val="center"/>
        <RadioButton title="右对齐" var="rdoAlign" val="right"/>
    </GroupBox>
    
    <GroupBox title="预览" visible="$rdoAlign==left">
        <Label text="[左对齐文本示例]"/>
    </GroupBox>
    
    <GroupBox title="预览" visible="$rdoAlign==center">
        <Label text="[居中文本示例]"/>
    </GroupBox>
    
    <GroupBox title="预览" visible="$rdoAlign==right">
        <Label text="[右对齐文本示例]"/>
    </GroupBox>
    
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="应用" var="btnApply"/>
    </HLayoutWidget>
</Panel>
```

### C++ 代码

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include "Quik/Quik.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    QDialog dialog;
    dialog.setWindowTitle("单选按钮示例");
    auto* layout = new QVBoxLayout(&dialog);
    
    Quik::XMLUIBuilder builder;
    QWidget* ui = Quik_BUILD(builder, "radio.xml");
    layout->addWidget(ui);
    
    Quik::QuikViewModel vm(&builder);
    auto align = vm.var<QString>("rdoAlign");
    
    // 监听变化
    builder.watch("rdoAlign", [](const QVariant& v) {
        qDebug() << "对齐方式:" << v.toString();
    });
    
    builder.connectButton("btnApply", [&]() {
        qDebug() << "应用对齐:" << align();
        dialog.accept();
    });
    
    return dialog.exec();
}
```

## 数值输入

### XML 文件 (numbers.xml)

```xml
<Panel>
    <GroupBox title="数值设置">
        <SpinBox title="整数" var="spnInt" min="-100" max="100" default="0"/>
        <DoubleSpinBox title="浮点数" var="dspDouble" 
                       min="-10.0" max="10.0" default="0.0" 
                       decimals="2" step="0.1"/>
        <LineEdit title="文本数值" var="txtNumber" default="123.456" valid="double"/>
    </GroupBox>
    
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="计算" var="btnCalc"/>
    </HLayoutWidget>
</Panel>
```

### C++ 代码

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include <QMessageBox>
#include "Quik/Quik.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    QDialog dialog;
    dialog.setWindowTitle("数值输入示例");
    auto* layout = new QVBoxLayout(&dialog);
    
    Quik::XMLUIBuilder builder;
    QWidget* ui = Quik_BUILD(builder, "numbers.xml");
    layout->addWidget(ui);
    
    Quik::QuikViewModel vm(&builder);
    auto intVal = vm.var<int>("spnInt");
    auto doubleVal = vm.var<double>("dspDouble");
    auto textVal = vm.var<double>("txtNumber");
    
    builder.connectButton("btnCalc", [&]() {
        double sum = intVal + doubleVal + textVal;
        QString msg = QString("整数: %1\n浮点数: %2\n文本数值: %3\n\n总和: %4")
            .arg(intVal())
            .arg(doubleVal())
            .arg(textVal())
            .arg(sum);
        QMessageBox::information(&dialog, "计算结果", msg);
    });
    
    return dialog.exec();
}
```

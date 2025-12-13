# 快速开始

本指南将帮助你在 5 分钟内上手 Quik。

## 前置要求

- Qt 5.x 或 Qt 6.x
- C++11 或更高版本
- qmake 或 CMake

## 第一步：添加 Quik 到项目

在你的 `.pro` 文件中添加：

```makefile
# 包含 Quik 库
include(path/to/Quik/Quik.pri)

# 或者链接静态库
LIBS += -L$$PWD/libs -lQuik
INCLUDEPATH += $$PWD/include
```

## 第二步：创建 XML 界面文件

创建 `MyPanel.xml`：

```xml
<Panel>
    <GroupBox title="基本设置">
        <CheckBox title="启用功能" var="chkEnable" default="1"/>
        <LineEdit title="数值" var="txtValue" default="100" 
                  visible="$chkEnable==1" valid="double"/>
        <ComboBox title="模式" var="cboMode" default="mode1">
            <Choice text="模式一" val="mode1"/>
            <Choice text="模式二" val="mode2"/>
        </ComboBox>
    </GroupBox>
    
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="应用" var="btnApply"/>
        <PushButton text="取消" var="btnCancel"/>
    </HLayoutWidget>
</Panel>
```

## 第三步：在 C++ 中使用

```cpp
#include <QApplication>
#include <QDialog>
#include <QVBoxLayout>
#include "Quik/Quik.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    // 创建对话框
    QDialog dialog;
    dialog.setWindowTitle("Quik 示例");
    auto* layout = new QVBoxLayout(&dialog);
    
    // 从 XML 构建 UI
    Quik::XMLUIBuilder builder;
    QWidget* ui = Quik_BUILD(builder, "MyPanel.xml");
    layout->addWidget(ui);
    
    // 创建 ViewModel
    Quik::QuikViewModel vm(&builder);
    
    // 定义变量访问器
    auto chkEnable = vm.var<bool>("chkEnable");
    auto txtValue = vm.var<double>("txtValue");
    auto cboMode = vm.var<QString>("cboMode");
    
    // 连接按钮
    builder.connectButton("btnApply", [&]() {
        qDebug() << "启用:" << chkEnable();
        qDebug() << "数值:" << txtValue();
        qDebug() << "模式:" << cboMode();
    });
    
    builder.connectButton("btnCancel", [&dialog]() {
        dialog.reject();
    });
    
    return dialog.exec();
}
```

## 运行效果

运行程序后，你会看到：

1. 一个带有 "基本设置" 分组框的界面
2. 勾选 "启用功能" 时，"数值" 输入框显示
3. 取消勾选时，"数值" 输入框隐藏
4. 点击 "应用" 按钮，控制台输出当前值

## 核心概念速览

### 变量绑定 (`var`)

每个组件可以通过 `var` 属性绑定到一个变量：

```xml
<CheckBox title="启用" var="chkEnable"/>
```

### 条件表达式 (`visible`/`enabled`)

使用 `$变量名==值` 语法控制显示/启用：

```xml
<LineEdit visible="$chkEnable==1"/>
```

### ViewModel 访问

类型安全地访问变量：

```cpp
auto value = vm.var<double>("txtValue");
double v = value;      // 获取值
value = 50.0;          // 设置值，UI 自动更新
```

## 下一步

- [安装配置](/guide/installation) - 详细安装说明
- [XML 语法](/guide/xml-syntax) - 完整 XML 语法参考
- [数据绑定](/guide/data-binding) - 深入理解数据绑定

# 安装配置

## 获取源码

```bash
git clone https://github.com/liewstar/quik.git
```

## 编译 Quik 库

### 使用 qmake

```bash
cd quik
qmake Quik.pro
make
```

编译完成后会生成 `libQuik.a`（Linux/macOS）或 `Quik.lib`（Windows）静态库。

### 使用 Qt Creator

1. 打开 `Quik.pro`
2. 选择构建套件
3. 点击构建

## 集成到项目

### 方式一：直接包含源码

将 Quik 源码目录复制到项目中，在 `.pro` 文件添加：

```makefile
# 添加 Quik 源码
include($$PWD/Quik/Quik.pri)
```

### 方式二：链接静态库

```makefile
# 头文件路径
INCLUDEPATH += $$PWD/path/to/quik/include

# 链接库
LIBS += -L$$PWD/path/to/quik/lib -lQuik
```

### 方式三：子项目

在 `.pro` 文件中：

```makefile
TEMPLATE = subdirs
SUBDIRS = Quik MyApp

MyApp.depends = Quik
```

## Qt 模块依赖

Quik 需要以下 Qt 模块：

```makefile
QT += core gui widgets xml
```

## 编译选项

### 静态库（默认）

```makefile
TEMPLATE = lib
CONFIG += staticlib
```

### 动态库

在 `QuikAPI.h` 中取消注释：

```cpp
#define QUIK_BUILD_DLL
```

然后修改 `.pro`：

```makefile
TEMPLATE = lib
CONFIG += shared
DEFINES += QUIK_LIBRARY
```

## 验证安装

创建测试程序：

```cpp
#include <QApplication>
#include <QWidget>
#include "Quik/Quik.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    QString xml = R"(
        <Panel>
            <Label text="Quik 安装成功！"/>
        </Panel>
    )";
    
    Quik::XMLUIBuilder builder;
    QWidget* ui = builder.buildFromString(xml);
    ui->show();
    
    return app.exec();
}
```

如果窗口正常显示 "Quik 安装成功！"，说明安装配置正确。

## 常见问题

### Q: 编译报错找不到头文件

确保 `INCLUDEPATH` 包含了 Quik 的 `include` 目录：

```makefile
INCLUDEPATH += $$PWD/quik/include
```

### Q: 链接报错未定义符号

检查是否正确链接了库文件，以及 Qt 模块是否完整：

```makefile
QT += core gui widgets xml
LIBS += -lQuik
```

### Q: XML 文件找不到

使用 `Quik_XML` 宏自动定位同目录下的 XML 文件：

```cpp
QWidget* ui = Quik_BUILD(builder, "MyPanel.xml");
```

或使用绝对路径：

```cpp
QWidget* ui = builder.buildFromFile("/path/to/MyPanel.xml");
```

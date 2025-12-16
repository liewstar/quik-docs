# Installation

## Get Source Code

```bash
git clone https://github.com/liewstar/quik.git
```

## Build Quik Library

### Using qmake

```bash
cd quik
qmake Quik.pro
make
```

After compilation, `libQuik.a` (Linux/macOS) or `Quik.lib` (Windows) static library will be generated.

### Using Qt Creator

1. Open `Quik.pro`
2. Select build kit
3. Click Build

## Integrate into Project

### Method 1: Include Source Directly

Copy Quik source directory into your project, add to `.pro` file:

```makefile
# Add Quik source
include($$PWD/Quik/Quik.pri)
```

### Method 2: Link Static Library

```makefile
# Header path
INCLUDEPATH += $$PWD/path/to/quik/include

# Link library
LIBS += -L$$PWD/path/to/quik/lib -lQuik
```

### Method 3: Subproject

In `.pro` file:

```makefile
TEMPLATE = subdirs
SUBDIRS = Quik MyApp

MyApp.depends = Quik
```

## Qt Module Dependencies

Quik requires the following Qt modules:

```makefile
QT += core gui widgets xml
```

## Build Options

### Static Library (Default)

```makefile
TEMPLATE = lib
CONFIG += staticlib
```

### Dynamic Library

Uncomment in `QuikAPI.h`:

```cpp
#define QUIK_BUILD_DLL
```

Then modify `.pro`:

```makefile
TEMPLATE = lib
CONFIG += shared
DEFINES += QUIK_LIBRARY
```

## Verify Installation

Create a test program:

```cpp
#include <QApplication>
#include <QWidget>
#include "Quik/Quik.h"

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    QString xml = R"(
        <Panel>
            <Label text="Quik installed successfully!"/>
        </Panel>
    )";
    
    Quik::XMLUIBuilder builder;
    QWidget* ui = builder.buildFromString(xml);
    ui->show();
    
    return app.exec();
}
```

If the window displays "Quik installed successfully!", the installation is correct.

## FAQ

### Q: Compilation error - header file not found

Ensure `INCLUDEPATH` includes Quik's `include` directory:

```makefile
INCLUDEPATH += $$PWD/quik/include
```

### Q: Link error - undefined symbol

Check if library is correctly linked and Qt modules are complete:

```makefile
QT += core gui widgets xml
LIBS += -lQuik
```

### Q: XML file not found

Use `Quik_XML` macro to auto-locate XML files in the same directory:

```cpp
QWidget* ui = Quik_BUILD(builder, "MyPanel.xml");
```

Or use absolute path:

```cpp
QWidget* ui = builder.buildFromFile("/path/to/MyPanel.xml");
```

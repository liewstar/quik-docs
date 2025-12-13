---
layout: home

hero:
  name: Quik
  text: 响应式XML UI框架
  tagline: 无需QML，用XML声明式构建Qt响应式界面
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 查看API
      link: /api/overview
    - theme: alt
      text: GitHub
      link: https://github.com/liewstar/quik

features:
  - icon: 📝
    title: XML声明式UI
    details: 使用简洁的XML语法定义界面，无需学习QML，降低学习成本
  - icon: 🔄
    title: 双向数据绑定
    details: 自动同步UI和数据，修改变量UI自动更新，UI变化自动同步到变量
  - icon: ⚡
    title: 条件表达式
    details: 支持visible/enabled条件绑定，轻松实现动态显示/隐藏逻辑
  - icon: 🎯
    title: 类型安全
    details: QuikViewModel提供类型安全的变量访问，IDE智能补全支持
  - icon: 🧩
    title: 丰富组件
    details: 内置常用Qt组件，支持自定义组件扩展
  - icon: 🚀
    title: 轻量高效
    details: 纯C++实现，无额外运行时依赖，编译为静态库
---

## 快速一览

```cpp
#include "Quik/Quik.h"

// 从XML构建UI
Quik::XMLUIBuilder builder;
QWidget* ui = builder.buildFromFile("MyPanel.xml");

// 类型安全的变量访问
Quik::QuikViewModel vm(&builder);
auto enabled = vm.var<bool>("chkEnable");
auto value = vm.var<double>("txtValue");

// 像普通变量一样使用
if (enabled) {
    value = 100.0;  // UI自动更新
}

// 监听变化
builder.watch("chkEnable", [](const QVariant& v) {
    qDebug() << "Enable changed:" << v.toBool();
});
```

```xml
<Panel>
    <GroupBox title="设置">
        <CheckBox title="启用" var="chkEnable" default="1"/>
        <LineEdit title="数值" var="txtValue" visible="$chkEnable==1"/>
    </GroupBox>
</Panel>
```

---
layout: home

hero:
  name: Quik
  text: 响应式XML UI框架
  tagline: 无需QML，用XML声明式构建Qt响应式界面。简洁、高效、类型安全。
  image:
    src: /logo.svg
    alt: Quik Logo
  actions:
    - theme: brand
      text: 🚀 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 📖 简介
      link: /guide/introduction
    - theme: alt
      text: ⭐ GitHub
      link: https://github.com/liewstar/quik

features:
  - icon: 📝
    title: XML声明式 + 响应式绑定
    details: XML定义UI结构，$表达式实现条件渲染，变量修改UI自动更新
  - icon: 🔄
    title: q-for 循环渲染
    details: 数据驱动的列表渲染，动态增删数据自动同步UI
  - icon: ⚡
    title: UI热更新
    details: 开发时修改XML文件，UI实时刷新，无需重新编译
  - icon: 🎯
    title: 变量即UI
    details: vm.var像普通变量一样使用，赋值即更新UI
---

<div class="vp-doc" style="padding: 0 24px; max-width: 1152px; margin: 0 auto;">

## 20行代码，看见联动与动态列表

  - **联动**：勾选启用后，滑块/下拉框自动可用
  - **共享变量**：同一个 `volume` 同步驱动 Slider + ProgressBar
  - **动态列表**：点击按钮即时追加下拉选项（`q-for`）
  - **实时响应**：音量变化即时更新提示文本（`watch`）
  - **按钮交互**：点击按钮追加模式选项

 <!-- <div style="margin: 14px 0 18px;">
   <video
     src="/quik-docs/demo.mp4"
     autoplay
     loop
     muted
     playsinline
     controls
     style="width: 100%; max-width: 960px; border-radius: 12px; box-shadow: 0 10px 30px rgb(0 0 0 / 20%);"
   ></video>
 </div> -->
 
```xml[Panel.xml]
<Panel>
    <CheckBox title="启用联动" var="enable" default="1"/>
    <LineEdit title="提示" var="message" enabled="0"/>
    <Slider title="音量" var="volume" min="0" max="100" enabled="$enable==1"/>
    <ProgressBar var="volume" min="0" max="100"/>
    <ComboBox title="模式" var="mode" enabled="$enable==1">
        <Choice q-for="item in modes" text="$item.label" val="$item.value"/>
    </ComboBox>
    <HLayoutWidget>
        <addStretch/>
        <PushButton text="添加模式" var="btnAddMode"/>
    </HLayoutWidget>
</Panel>
```

```cpp[main.cpp]
Quik::XMLUIBuilder builder;
QWidget* ui = Quik_BUILD(builder, "Panel.xml");  // 自动启用热更新

Quik::QuikViewModel vm(&builder);
auto enable = vm.var<bool>("enable");
auto message = vm.var<QString>("message");
auto volume = vm.var<int>("volume");
auto mode = vm.var<QString>("mode");
auto modes = vm.list("modes");
auto btnAddMode = vm.button("btnAddMode");

modes = {
    {{"label", "快速"}, {"value", "fast"}},
    {{"label", "标准"}, {"value", "normal"}},
    {{"label", "精确"}, {"value", "accurate"}}
};

volume.watch([&](int v) {
    message = QString("当前音量：%1").arg(v);
});

btnAddMode.onClick([&]() {
    modes.append({{"label", "自定义"}, {"value", "custom"}});
});
```

</div>

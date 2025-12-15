# 在线演练场

<script setup>
import QuikPlayground from '../.vitepress/components/QuikPlayground.vue'
</script>

在这里你可以直接编写 Quik XML 代码并实时查看渲染效果，无需安装任何工具。

::: tip 提示
这个演练场使用 Qt WebAssembly 在浏览器中运行真实的 Qt 渲染引擎，所以你看到的效果与桌面应用完全一致。
:::

<QuikPlayground />

## 示例代码

复制以下示例到编辑器中体验 Quik 的特色功能：

### 一个变量绑定多个组件

同一个 `volume` 变量同时驱动 Slider、ProgressBar 和 SpinBox，修改任意一个都会同步更新：

```xml
<Panel>
    <Label text="一个变量，多处联动" alignment="center"/>
    <Slider title="滑块" var="volume" min="0" max="100"/>
    <ProgressBar var="volume" min="0" max="100"/>
    <SpinBox title="数值" var="volume" min="0" max="100"/>
    <addStretch/>
</Panel>
```

### enabled 条件控制

勾选复选框后，下方组件才可用：

```xml
<Panel>
    <CheckBox title="启用高级设置" var="advanced" default="0"/>
    <Slider title="亮度" var="brightness" min="0" max="100" enabled="$advanced==1"/>
    <Slider title="对比度" var="contrast" min="0" max="100" enabled="$advanced==1"/>
    <ComboBox title="模式" var="mode" enabled="$advanced==1">
        <Choice text="自动" val="auto"/>
        <Choice text="手动" val="manual"/>
        <Choice text="专业" val="pro"/>
    </ComboBox>
    <addStretch/>
</Panel>
```

### visible 条件显隐

根据下拉框选择动态显示/隐藏不同组件：

```xml
<Panel>
    <ComboBox title="登录方式" var="loginType" default="password">
        <Choice text="密码登录" val="password"/>
        <Choice text="验证码登录" val="code"/>
        <Choice text="扫码登录" val="qrcode"/>
    </ComboBox>
    <LineEdit title="密码" var="pwd" visible="$loginType==password"/>
    <LineEdit title="验证码" var="code" visible="$loginType==code"/>
    <Label text="请打开APP扫描二维码" visible="$loginType==qrcode"/>
    <addStretch/>
</Panel>
```

### q-for 循环渲染

上面是写死的城市选项，下面用 q-for 渲染动态列表：

```xml
<Panel>
    <ComboBox title="选择城市" var="city">
        <Choice text="北京" val="beijing"/>
        <Choice text="上海" val="shanghai"/>
        <Choice text="广州" val="guangzhou"/>
        <Choice text="深圳" val="shenzhen"/>
    </ComboBox>
    <ComboBox title="动态选项" var="item">
        <Choice q-for="opt in options" text="$opt.label" val="$opt.value"/>
    </ComboBox>
    <addStretch/>
</Panel>
```

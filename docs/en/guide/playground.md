# Online Playground

<script setup>
import QuikPlayground from '../../.vitepress/components/QuikPlayground.vue'
</script>

Here you can write Quik XML code directly and see the rendering result in real-time, without installing any tools.

::: tip Note
This playground uses Qt WebAssembly to run the real Qt rendering engine in the browser, so what you see is exactly the same as desktop applications.
:::

<QuikPlayground />

## Example Code

Copy the following examples to the editor to experience Quik's features:

### One Variable Binding Multiple Components

The same `volume` variable drives Slider, ProgressBar, and SpinBox simultaneously. Modifying any one will sync update the others:

```xml
<Panel>
    <Label text="One variable, multiple bindings" alignment="center"/>
    <Slider title="Slider" var="volume" min="0" max="100"/>
    <ProgressBar var="volume" min="0" max="100"/>
    <SpinBox title="Value" var="volume" min="0" max="100"/>
    <addStretch/>
</Panel>
```

### enabled Conditional Control

Components below become available only after checking the checkbox:

```xml
<Panel>
    <CheckBox title="Enable Advanced Settings" var="advanced" default="0"/>
    <Slider title="Brightness" var="brightness" min="0" max="100" enabled="$advanced==1"/>
    <Slider title="Contrast" var="contrast" min="0" max="100" enabled="$advanced==1"/>
    <ComboBox title="Mode" var="mode" enabled="$advanced==1">
        <Choice text="Auto" val="auto"/>
        <Choice text="Manual" val="manual"/>
        <Choice text="Pro" val="pro"/>
    </ComboBox>
    <addStretch/>
</Panel>
```

### visible Conditional Show/Hide

Dynamically show/hide different components based on dropdown selection:

```xml
<Panel>
    <ComboBox title="Login Method" var="loginType" default="password">
        <Choice text="Password" val="password"/>
        <Choice text="Verification Code" val="code"/>
        <Choice text="QR Code" val="qrcode"/>
    </ComboBox>
    <LineEdit title="Password" var="pwd" visible="$loginType==password"/>
    <LineEdit title="Code" var="code" visible="$loginType==code"/>
    <Label text="Please open APP to scan QR code" visible="$loginType==qrcode"/>
    <addStretch/>
</Panel>
```

### q-for List Rendering

Above are hardcoded city options, below uses q-for to render dynamic list:

```xml
<Panel>
    <ComboBox title="Select City" var="city">
        <Choice text="Beijing" val="beijing"/>
        <Choice text="Shanghai" val="shanghai"/>
        <Choice text="Guangzhou" val="guangzhou"/>
        <Choice text="Shenzhen" val="shenzhen"/>
    </ComboBox>
    <ComboBox title="Dynamic Options" var="item">
        <Choice q-for="opt in options" text="$opt.label" val="$opt.value"/>
    </ComboBox>
    <addStretch/>
</Panel>
```

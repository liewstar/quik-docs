# Declarative UI

Quik uses XML to describe interface structure. Each XML file corresponds to a UI panel.

## Basic Structure

The root element is typically `<Panel>`, with various components nested inside:

```xml
<Panel>
    <CheckBox title="Enable" var="enable"/>
    <LineEdit title="Name" var="name"/>
</Panel>
```

Quik automatically parses the XML and generates corresponding Qt Widgets. You don't need to manually create `QCheckBox`, `QLineEdit`, etc.

## Component Attributes

Each component supports various attributes to configure appearance and behavior:

```xml
<SpinBox 
    title="Quantity"           
    var="count"           
    min="0"               
    max="100"             
    default="10"          
/>
```

- **title** - Label text on the left side of the component
- **var** - Bound variable name for reading/writing values in C++
- **min/max** - Numeric range limits
- **default** - Default value

## Layout Containers

Quik provides various layout containers to organize components:

```xml
<Panel>
    <!-- Group box -->
    <GroupBox title="Basic Settings">
        <CheckBox title="Enable" var="enable"/>
        <LineEdit title="Name" var="name"/>
    </GroupBox>
    
    <!-- Horizontal layout -->
    <HLayoutWidget>
        <PushButton text="OK" var="btnOK"/>
        <PushButton text="Cancel" var="btnCancel"/>
    </HLayoutWidget>
    
    <!-- Vertical layout -->
    <VLayoutWidget>
        <Label text="Line 1"/>
        <Label text="Line 2"/>
    </VLayoutWidget>
</Panel>
```

Use `<addStretch/>` to add flexible space, pushing components to one side:

```xml
<HLayoutWidget>
    <addStretch/>  <!-- Left flexible space -->
    <PushButton text="OK" var="btnOK"/>
    <PushButton text="Cancel" var="btnCancel"/>
</HLayoutWidget>
```

## Component Reference

### Input Components

| Component | Description | Variable Type | Common Attributes |
|-----------|-------------|---------------|-------------------|
| CheckBox | Checkbox | bool | title, default |
| RadioButton | Radio button | bool | title, default |
| LineEdit | Single-line text input | QString | title, placeholder, valid |
| SpinBox | Integer input | int | title, min, max, default |
| DoubleSpinBox | Float input | double | title, min, max, decimals |
| ComboBox | Dropdown selection | QString | title, default |
| ListBox | List selection | QString | title |
| Slider | Slider | int | title, min, max, ticks, tickInterval |
| PointLineEdit | 3D coordinate input | Multiple | title, valid, hasButton |
| TwoPointLineEdit | Two-point coordinate input | Multiple | title, left, right, valid |

### Display Components

| Component | Description | Variable Type | Common Attributes |
|-----------|-------------|---------------|-------------------|
| Label | Text label | - | text |
| LabelList | Label list | - | - |
| ProgressBar | Progress bar | int | min, max |
| HLine | Horizontal separator | - | - |
| VLine | Vertical separator | - | - |

### Button Components

| Component | Description | Variable Type | Common Attributes |
|-----------|-------------|---------------|-------------------|
| PushButton | Button | - | text |

### Containers & Layouts

| Component | Description | Common Attributes |
|-----------|-------------|-------------------|
| GroupBox | Group container | title |
| InnerGroupBox | Inner group container | title |
| TabBar | Tab container | - |
| HLayoutWidget | Horizontal layout | - |
| VLayoutWidget | Vertical layout | - |
| addStretch | Flexible space | - |

## Special Component Usage

For industrial software scenarios, Quik provides commonly used encapsulated components to simplify 3D coordinate and point data input and processing.

### PointLineEdit (3D Coordinate Input)

For inputting X, Y, Z coordinate values. Can be combined with layout containers for side-by-side multi-point input:

```xml
<!-- Single coordinate point -->
<PointLineEdit title="Origin" var="origin" hasButton="true"/>

<!-- Two coordinate points side by side -->
<HLayoutWidget>
    <PointLineEdit title="" var="origin" hasButton="true"/>
    <PointLineEdit title="" var="end" hasButton="true"/>
</HLayoutWidget>
```

Use `vm.point()` in C++ to get the accessor:

```cpp
auto origin = vm.point("origin");
auto end = vm.point("end");

// Read
QVector3D pos = origin;

// Write
origin = QVector3D(1.0, 2.0, 3.0);

// Watch for changes
origin.watch([](QVector3D pos) {
    // Triggered when any coordinate changes
});

// If hasButton="true", get the associated button
origin.button().onClick([&]() {
    // Triggered when select button is clicked
});
```

Attribute descriptions:
- **valid** - Validation type: `double` (default) or `int`
- **hasButton** - Whether to show select button (default `false`)

### TwoPointLineEdit (Two-Point Coordinate Input)

For inputting two 3D coordinate points (two-row layout):

```xml
<TwoPointLineEdit title="Range" var="range" left="Start" right="End"/>
```

Use `vm.twoPoint()` in C++ to get the accessor:

```cpp
auto range = vm.twoPoint("range");

// Read
QPair<QVector3D, QVector3D> points = range;
QVector3D p1 = points.first;
QVector3D p2 = points.second;

// Write
range = qMakePair(QVector3D(0, 0, 0), QVector3D(100, 100, 100));

// Watch for changes
range.watch([](QPair<QVector3D, QVector3D> pts) {
    // Triggered when any coordinate changes
});
```

Attribute descriptions:
- **left** - First row label text (default "Point 1")
- **right** - Second row label text (default "Point 2")
- **valid** - Validation type: `double` (default) or `int`

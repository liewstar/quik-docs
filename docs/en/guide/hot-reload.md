# Hot Reload

Quik supports UI hot reload during development: after modifying and saving an XML file, the interface refreshes automatically without recompiling the program.

## Enable Hot Reload

Use the `Quik_BUILD` macro to build UI, hot reload is automatically enabled:

```cpp
Quik::XMLUIBuilder builder;
QWidget* ui = Quik_BUILD(builder, "Panel.xml");
```

The `Quik_BUILD` macro will:
1. Automatically get the full path of the XML file
2. Enable file watcher to detect file changes
3. Automatically reload UI when file is saved

## Development Workflow

1. Start the program, display UI
2. Modify XML file in editor
3. Save file (Ctrl+S)
4. UI refreshes immediately, no restart needed

This greatly speeds up UI debugging and iteration.

## Disable for Release

When releasing production versions, disable hot reload for better performance. Set in `Quik.h`:

```cpp
#define QUIK_HOT_RELOAD_ENABLED false
```

When disabled, `Quik_BUILD` uses embedded resource files instead of watching external files.

::: tip Recommendation
Use compile macros to distinguish development and release modes:
```cpp
#ifdef QT_DEBUG
    #define QUIK_HOT_RELOAD_ENABLED true
#else
    #define QUIK_HOT_RELOAD_ENABLED false
#endif
```
:::

## Notes

- Hot reload only refreshes UI structure, doesn't reset variable values
- If XML has syntax errors, error messages are output to console
- Hot reload doesn't affect already-bound event handlers

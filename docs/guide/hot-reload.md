# UI 热更新

Quik 支持开发时的 UI 热更新：修改 XML 文件并保存后，界面会自动刷新，无需重新编译程序。

## 启用热更新

使用 `Quik_BUILD` 宏构建 UI，热更新会自动启用：

```cpp
Quik::XMLUIBuilder builder;
QWidget* ui = Quik_BUILD(builder, "Panel.xml");
```

`Quik_BUILD` 宏会：
1. 自动获取 XML 文件的完整路径
2. 启用文件监视器，检测文件变化
3. 文件保存时自动重新加载 UI

## 开发工作流

1. 启动程序，显示 UI 界面
2. 在编辑器中修改 XML 文件
3. 保存文件（Ctrl+S）
4. UI 立即刷新，无需重启程序

这大大加快了 UI 调试和迭代的速度。

## 发布时禁用

发布正式版本时，应禁用热更新以提升性能。在 `Quik.h` 中设置：

```cpp
#define QUIK_HOT_RELOAD_ENABLED false
```

禁用后，`Quik_BUILD` 会使用嵌入的资源文件，而不是监视外部文件。

::: tip 建议
可以使用编译宏区分开发和发布模式：
```cpp
#ifdef QT_DEBUG
    #define QUIK_HOT_RELOAD_ENABLED true
#else
    #define QUIK_HOT_RELOAD_ENABLED false
#endif
```
:::

## 注意事项

- 热更新只刷新 UI 结构，不会重置变量值
- 如果 XML 语法错误，会在控制台输出错误信息
- 热更新不影响已绑定的事件处理函数

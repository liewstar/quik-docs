# Introduction

**Quik** is a reactive XML UI framework based on Qt. Define interfaces with XML, manipulate data with C++, and UI syncs automatically.

## Pain Points Solved

Traditional QWidget development has these issues:

- **Verbose UI code** - Creating widgets, setting properties, adding layouts, connecting signals/slots — a simple panel easily takes hundreds of lines
- **Tedious data sync** - Manual `setText()`, `setValue()`, forget to sync and bugs appear
- **Low iteration efficiency** - Changing a layout requires recompilation, debugging UI is time-consuming
- **Hard to maintain** - UI logic mixed with business logic, difficult for newcomers

Quik's solution:

- **XML declares UI** - Clear structure, what you see is what you get
- **Reactive binding** - Assignment equals update, no manual sync
- **Hot reload** - XML changes take effect immediately, double development efficiency
- **Separation of concerns** - UI in XML, logic in C++, each does its job

::: tip AI Development Friendly
Quik is very friendly for AI-assisted development:
- **XML is markup language** - LLMs are naturally good at generating and understanding structured markup
- **Minimal C++ usage** - `vm.var<T>()` one line does it all, no complex signal/slot templates
- **Fixed patterns** - XML + C++ combination is clear, easy for AI to learn and reuse
:::

::: info Lower Development Barrier
Quik effectively supports developers of different skill levels:
- **Beginner friendly** - No need to deeply understand Qt signal/slot mechanism, just follow XML templates
- **Reduce low-level errors** - Reactive binding auto-syncs, avoids common "forgot to update UI" bugs
- **Unified code style** - XML structure constrains UI writing, better team code consistency
- **Easier reviews** - UI changes are clear at a glance, no need to dig through C++ code for layout logic
:::

## Core Capabilities

| Capability | Description |
|------------|-------------|
| **Declarative UI** | XML defines interface structure, auto-generates Qt Widgets |
| **Reactive Binding** | `vm.var` like regular variables, assignment updates UI |
| **Conditional Rendering** | `visible="$enable==1"` expression controls visibility |
| **List Rendering** | `q-for` data-driven lists, add/remove auto-syncs |
| **Hot Reload** | Edit XML during development, refreshes without recompilation |

## Comparison

| | Traditional Qt | QML | Quik |
|---|---|---|---|
| UI Definition | C++ code | QML language | XML |
| Data Binding | Manual signals/slots | Automatic | Automatic |
| Runtime | None | QML engine | None |
| Type Safety | ✓ | ✗ | ✓ |

## Use Cases

- Parameter panels and settings dialogs for tool software
- Property editors for CAD/CAE software
- Interactive interfaces requiring rapid iteration

## Next Steps

- [Quick Start](/en/guide/getting-started) - Get started in 3 minutes
- [Core Concepts](/en/guide/core-concepts) - Deep dive into the design

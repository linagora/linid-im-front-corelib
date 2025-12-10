# **linid-im-front-corelib**

## **🧩 Overview**

`linid-im-front-corelib` is a TypeScript library designed as a core front-end module for the LinID Identity Management ecosystem.
It provides shared interfaces, types, default services, and plugin-zone components used across the LinID front-end applications, including:

- The **Vue.js/Quasar module federation host**
- The **remote plugin repositories**

This library ensures consistency across all front-end modules by centralizing common logic, validation tools, and data structures for identity management features such as CRUD operations on persons, users, and related entities.

> This library is part of a larger ecosystem including Java back-end services, workflow APIs, multiple plugins, and front-end modules.

---

## **✨ Features**

- Shared **TypeScript interfaces and types**
- Core **services** used across LinID front-end apps
- **Plugin zone components** for dynamic front-end plugin integration
- Common validation utilities for identity management workflows
- Designed to integrate seamlessly with Vue.js, Quasar, and module federation architecture

---

## **Tech Stack 🛠️**

| Area            | Technology               |
| --------------- | ------------------------ |
| Language        | TypeScript               |
| Framework       | Vue.js (Composition API) |
| UI Toolkit      | Quasar Framework         |
| Module System   | Module Federation        |
| Package Manager | npm / pnpm               |

---

## **📋 Technical Prerequisites**

Ensure the following requirements to use or develop the library:

- **Node.js** ≥ 22.19
- **Package manager:** npm, pnpm (>= 10)
- **Vue.js 3** project
- **Quasar Framework** if using UI components
- A bundler supporting **Module Federation** (Webpack 5, Vite, Rsbuild and Rspack)

---

## **📦 Installation**

Install the library from npm:

### **With npm**

```bash
npm install @linagora/linid-im-front-corelib
```

### **With pnpm**

```bash
pnpm add @linagora/linid-im-front-corelib
```

---

## **📜 License**

This project is licensed under: GNU Affero General Public License version 3

---

## 📚 Documentation

A full technical documentation is available in the `docs/` directory:

- 🔄 **Module Lifecycle System**  
  Learn how business modules initialize themselves with the standardized lifecycle system.  
  → [`docs/module-lifecycle.md`](docs/module-lifecycle.md)

- 🔌 **Plugin Zone Component**  
  Learn how to use the component that dynamically renders remote Vue plugins.  
  → [`docs/components-plugin-zones.md`](docs/components-plugin-zones.md)

- 🧰 **Helper Functions**  
  Detailed description of all functions used in the plugin system.  
  → [`docs/helpers.md`](docs/helpers.md)

- 🧰 **Services**  
  Detailed description of all services provided by the library.  
  → [`docs/services.md`](docs/services.md)

- 🧩 **TypeScript Types & Interfaces**  
  Detailed description of all types and interfaces used in the plugin system.  
  → [`docs/types-and-interfaces.md`](docs/types-and-interfaces.md)

More documents will be added as the library evolves.

---

## **🤝 Contributing**

We welcome contributions to improve and extend this core library.
Please refer to the **[CONTRIBUTING.md](CONTRIBUTING.md)** file for:

- Development workflow
- Code guidelines
- Commit conventions
- Pull request rules

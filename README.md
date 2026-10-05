# TaskFlow — Vanilla JavaScript Task Manager

> A modern, lightning-fast task management web application built with vanilla JavaScript, modular architecture, and Tailwind CSS. Designed with a clean interface and zero external framework dependencies.

## Preview

<p align="center">
  <img src="docs/img/preview-to-do-list.gif" alt="To-Do List Preview" width="300">
</p>

## Getting Started

Follow these steps to run the project locally.

```bash
git clone https://github.com/mario-mendozac/to-do-list.git
```

```bash
cd to-do-list
```

```bash
npm install
```

```bash
npm run dev
```

The application will be available at the local URL provided by Vite in your terminal.


## Features 

- Full Task Lifecycle: Create, edit, complete, and delete tasks seamlessly.
- Smart Filtering: Filter tasks instantly between All, Active, and Completed views using native array methods.
- Persistent Storage: Data is securely saved and synchronized with the browser's localStorage.
- Dynamic Empty States: Clear UI feedback when lists are empty or filters return no results.
- Responsive Dark UI: Minimalist, high-contrast monochrome design styled with Tailwind CSS v4.

## Try it

[Live Demo](https://to-do-list-ten-bay-47.vercel.app/)

## Concepts Practiced

- **DOM & UI**: Creating elements dynamically, updating text, and finding specific elements using `dataset` and `querySelector`.
- **Event Handling**: Managing form submissions, clicks, and inputs cleanly without messing up the global scope.
- **State Management**: Handling application states (like switching between creating and editing) and keeping data separate from the UI.
- **Local Storage**: Saving and loading data securely using `localStorage`, `JSON.parse`, and `JSON.stringify`.
- **Array Methods**: 
  - Using `forEach()` to render tasks.
  - Using `findIndex()` to locate items by ID.
  - Using `splice()` to remove items safely.
  - Using `filter()` to manage task visibility.
- **Modular Code**: Organizing the project into clean ES modules using `import` and `export`.

## Core Tech

- Core: Vanilla JavaScript (ES6+ / ES Modules)
- Styling: Tailwind CSS (v4)
- Build Tool: Vite (for fast Hot Module Replacement builds)
- Deployment: Vercel
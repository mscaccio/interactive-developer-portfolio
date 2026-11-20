# Interactive Developer Portfolio

A responsive, interactive developer portfolio demonstration built with **HTML, CSS, and vanilla JavaScript**. This is an educational project, not a live personal portfolio.

## Live Demo

View the published portfolio on GitHub Pages:

[Interactive Developer Portfolio – Live Demo](https://mscaccio.github.io/interactive-developer-portfolio/)

## Features

- **Responsive layout** with a mobile navigation menu.
- **Project filtering** by Frontend, Backend, and Full-Stack categories.
- **Image previews** using the native HTML `<dialog>` element.
- **Contact form validation** with inline error messages and accessible feedback.
- **Simulated asynchronous form submission** to demonstrate JavaScript `async`/`await`.
- **Back to Top** control that appears after scrolling.
- **Accessibility considerations**, including semantic HTML, keyboard-operated controls, ARIA states, visible focus indicators, and reduced-motion support.
- **Progressive enhancement**: navigation and project content remain accessible when JavaScript is disabled.

## Technologies

- HTML5
- CSS3 (Flexbox, Grid, media queries)
- JavaScript (DOM manipulation, events, Promises, `async`/`await`)

No frontend framework or build step is required.

## Run locally

1. Clone or download this repository.
2. Open `index.html` in a web browser.

Alternatively, use a local development server such as VS Code Live Server.

## Project structure

```text
.
├── index.html
├── styles.css
├── script.js
└── images/
    ├── icons/
    └── ...
```

## GitHub Pages

This static project can be hosted using GitHub Pages:

1. Push the files to a GitHub repository.
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the publishing branch (typically `main`) and the `/ (root)` folder, then save.

GitHub will provide the published site's URL once deployment succeeds.

## Important note about the contact form

The contact form **does not send messages or store data**. When JavaScript is enabled, it validates input and simulates a successful asynchronous submission. A backend or form-handling service would be needed for actual delivery. Without JavaScript, the browser can still validate the fields, but a successful form submission is not supported.

## Purpose

Created as a learning project to practise responsive web design, browser APIs, JavaScript interactivity, form validation, and accessible user interfaces.

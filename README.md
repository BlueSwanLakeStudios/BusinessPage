# Blue Swan Lake Studios 

This repository hosts the codebase for Blue Swan Lake Studios, a creative agency website.

## Get Started with React + Vite

- Initialize the project and install dependencies.

```
npm install
```

- Start the development server.

```
npm run dev
```

- Build for production.

```
npm run build
```

## Project Structure

```
internship-website/
├── public/
│   └── favicon.svg        # Animated swan favicon for browser tab
├── src/
│   ├── assets/            # Static assets
│   ├── components/
│   │   ├── Navbar.jsx     # Navigation bar with animated swan logo
│   │   ├── Hero.jsx       # Hero section
│   │   └── SwanLogo.jsx   # Animated SVG swan logo component
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Get Started with Tailwind CSS

- Install Tailwind CSS as a dev dependency.

```
npm install -D tailwindcss@latest
```

- Initialize Tailwind CSS and create your `tailwind.config.js`.

```
npx tailwindcss init
```

- Modify `tailwind.config.js` to include the paths of your component files in the `content` property.

```
content: ["./index.html", "./src/**/*.{js,jsx}"],
```

- Add the Tailwind directives to your CSS file (e.g. `src/index.css`).

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

In some cases, you might encounter the error "unknown at-rule @tailwind" in VSCode. To resolve this, add a `.vscode/settings.json` file with the following:

```
{
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```


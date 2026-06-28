<<<<<<< HEAD
## Mi espacio — Aplicación personal (React + Vite + Tailwind)

Pequeña aplicación para gestionar tu espacio personal con: To‑do, Notas, Calendario anual, Wishlist y modo claro/oscuro.

**Requisitos**
- Node.js 18+ y `npm` instalados.

**Comandos principales**
```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build
npm run preview
```

**Notas de configuración**
- Tailwind ya está configurado: `tailwind.config.cjs` y `postcss.config.cjs`.
- El CSS de entrada es `src/index.css` (contiene directivas `@tailwind`).

**Estructura relevante**
- Componentes principales: `src/components/ThemeToggle.jsx`, `TodoList.jsx`, `Notes.jsx`, `YearCalendar.jsx`, `Wishlist.jsx`.
- Entrada React: `src/main.jsx` y `src/App.jsx`.

**Persistencia**
- Los datos de To‑do, Notas y Wishlist se guardan en `localStorage` (`todos`, `notes`, `wishlist`).

**Despliegue rápido**
- Puedes desplegar en Netlify o Vercel conectando el repo. Comando de build: `npm run build`.
- Si usas GitHub Pages considera usar la carpeta `dist` generada por `vite build` y un adaptador.

**Despliegue**

- Netlify: crear un nuevo sitio y conectar el repositorio. Configura el comando de build `npm run build` y la carpeta de publicación `dist`. También puedes subir el `dist` manualmente.
- Vercel: conectar el repo y usar `npm run build` como comando de build; Vercel detecta automáticamente Vite/React.

He añadido un `netlify.toml` y un `.gitignore` base en el repo.

Si quieres, puedo generar un `.gitignore` mejorado, añadir scripts adicionales o configurar CI/CD para despliegue automático.

---

# Información del template React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


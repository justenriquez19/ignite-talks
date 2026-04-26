# 🔥 IGNITE TALKS

> Plataforma personal de charlas interactivas — por Justo Enríquez, desde Chetumal, Quintana Roo, México.

Un portafolio de presentaciones web interactivas. Cada charla es una experiencia autocontenida diseñada para proyectarse en eventos **y** ser consultada en móvil por asistentes vía código QR.

## Stack

- **Framework**: [Astro 6](https://astro.build) + TypeScript (strict)
- **UI Islands**: React 19 (`client:load` / `client:visible`)
- **Estilos**: Tailwind CSS 4 (Vite plugin, config en CSS)
- **Animaciones**: CSS animations + [Motion](https://motion.dev) 12
- **Iconos**: [Lucide React](https://lucide.dev)
- **Tipografía**: Clash Display, Satoshi (Fontshare) + JetBrains Mono
- **Deploy**: Vercel (estático)
- **Package Manager**: pnpm

## Inicio rápido

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Previsualizar build de producción
pnpm preview
```

## Estructura del proyecto

```
src/
├── components/
│   ├── ui/              # Componentes compartidos
│   └── talks/           # Componentes de slides por charla
├── content/
│   └── talks/           # Metadata de charlas (Content Collections)
├── layouts/             # Layouts base y de presentación
├── lib/                 # Utilidades, constantes, config de animaciones
├── pages/
│   ├── index.astro      # Página principal
│   ├── justme.astro     # Sobre mí
│   └── talks/
│       └── [slug].astro # Ruta dinámica por charla
└── styles/              # CSS global, design system, animaciones
```

## Diseño

**"Volcanic Minimalism"** — Oscuro, imponente y vivo. Obsidiana con grietas de lava fundida.

## Agregar una nueva charla

1. Crear `src/content/talks/mi-charla.md` con el frontmatter de metadata
2. Crear el directorio `src/components/talks/mi-charla/`
3. Agregar componentes de slides (`Slide01.tsx`, `Slide02.tsx`, etc.)
4. Actualizar `slideCount` en el frontmatter

## Licencia

MIT

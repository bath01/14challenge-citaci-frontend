# CitaCI — Générateur de Citations 🇨🇮

> Des citations qui **inspirent** l'Afrique

Application web de découverte et partage de citations africaines et ivoiriennes.
Premier projet du **Challenge 14-14-14** : 14 projets, 14 technologies, 14 jours.

## Stack technique

- **React 19** — interfaces composants
- **TailwindCSS v4** — styling utilitaire (classes responsive, glassmorphism, animations)
- **Vite 6** — bundler et dev server

## Prérequis

- Node.js **22+** (fichier `.nvmrc` inclus)

```bash
nvm use
```

## Installation & Lancement

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en mode développement
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

### Autres commandes

```bash
# Build production
npm run build

# Prévisualisation du build
npm run preview

# Lint
npm run lint
```

## Intégration TailwindCSS v4

TailwindCSS est intégré via le plugin Vite officiel `@tailwindcss/vite` :

```js
// vite.config.js
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

L'import se fait dans `src/index.css` :

```css
@import "tailwindcss";
```

Les classes Tailwind sont utilisées pour le layout, spacing, responsive (`sm:`, `md:`, `lg:`) et les animations. Les couleurs dynamiques du thème (dark mode) sont gérées via inline styles + `ThemeContext`.

## Configuration API

Par défaut, l'application fonctionne avec des données locales. Pour connecter un backend :

```bash
cp .env.example .env
```

Puis renseigner `VITE_API_URL` dans le fichier `.env` :

```
VITE_API_URL=https://api.example.com/api
```

L'application basculera automatiquement vers l'API.

## Architecture

```
src/
├── data/            # Données statiques (citations, catégories, constantes)
├── services/        # Couche API (fetchApi, quoteService)
├── context/         # ThemeContext (dark mode, couleurs dynamiques)
├── hooks/           # Logique métier (useQuotes, useFavorites, useClipboard, useShare)
├── components/
│   ├── ui/          # Composants réutilisables (Avatar, FlagBar, CategoryPills...)
│   ├── layout/      # Structure (Navbar, Footer, GradientOrbs)
│   └── quote/       # Composants citation (QuoteCard, QuoteActions)
├── pages/           # Pages (Home, Explore, Favorites, About)
├── App.jsx          # Orchestrateur central
└── main.jsx         # Point d'entrée
```

## Fonctionnalités

- Génération aléatoire de citations par catégorie
- Navigation entre 4 pages : Accueil, Explorer, Favoris, À propos
- Système de favoris
- Copier / partager sur Twitter
- Mode sombre
- Design glassmorphism aux couleurs du drapeau ivoirien 🟧⬜🟩

## Équipe

| Nom | Rôle |
|-----|------|
| **Bath Dorgeles** | Chef de projet & Front-end |
| **Oclin Marcel C.** | Développeur Front-end |
| **Rayane Irie** | Spécialiste Back-end |

---

**#BuildInPublic #14Projets14Technos14Jours**

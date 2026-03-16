# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

CitaCI — Générateur de citations africaines et ivoiriennes. Challenge 14-14-14 (Jour 1).
React 19 + TailwindCSS v4 + Vite 6.

## Commands

- `nvm use 22` — required before any npm/vite command (Node 22+)
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run preview` — preview production build

## Architecture

```
src/
  data/          — données statiques (quotes, categories, constants, team) — fallback local
  services/      — couche API (api.js = fetch générique, quoteService.js = endpoints citations)
  context/       — ThemeContext (dark mode, couleurs dynamiques)
  hooks/         — logique métier isolée (useQuotes, useFavorites, useClipboard, useShare)
  components/
    ui/          — composants génériques réutilisables (ActionButton, Avatar, CategoryBadge, CategoryPills, FlagBar, SectionTitle)
    layout/      — structure de page (Navbar, Footer, GradientOrbs)
    quote/       — composants liés aux citations (QuoteCard, QuoteActions)
  pages/         — pages de l'app (HomePage, ExplorePage, FavoritesPage, AboutPage)
  App.jsx        — orchestrateur : routing par état, connexion hooks ↔ pages
  main.jsx       — point d'entrée, wrapping ThemeProvider
```

**Flux de données** : App.jsx possède l'état global via les hooks, et passe les props aux pages. Le ThemeContext fournit les couleurs et le dark mode à tous les composants via `useTheme()`.

**Palette** : couleurs du drapeau ivoirien définies dans `data/constants.js` (CI_ORANGE, CI_WHITE, CI_GREEN).

**Intégration API** : la couche `services/` permet de basculer entre données locales et API backend. Quand `VITE_API_URL` est défini dans `.env`, `quoteService.js` appelle le backend au lieu d'utiliser les données statiques de `data/`. Ajouter les nouveaux endpoints dans `services/`.

## Conventions

- Commentaires et documentation interne en français
- Noms de variables et fonctions descriptifs en anglais
- Chaque fonction répond à une tâche bien précise
- Code lisible et compréhensif
- Path alias `@/` → `src/` (configuré dans vite.config.js)
- TailwindCSS pour le layout/spacing, inline styles pour les couleurs dynamiques du thème

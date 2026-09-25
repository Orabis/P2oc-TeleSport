# TéléSport — Historique des Jeux Olympiques

Application web interactive qui permet de visualiser l'historique des performances des pays aux Jeux Olympiques : médailles, nombre d'athlètes et leur évolution, via des graphiques interactifs.

## Fonctionnalités

- **Tableau de bord** : répartition des médailles totales par pays (graphique camembert interactif)
- **Détail par pays** : participations, totaux et évolution des médailles (graphique linéaire)
- **Navigation** : clic sur une part du graphique pour ouvrir le détail du pays
- **Gestion d'erreurs** : page 404 et redirection si l'identifiant de pays est inconnu
- **Accessibilité** : contrastes conformes WCAG AA, focus visibles, graphiques décrits pour les lecteurs d'écran
- **Stack moderne** : React 19, TypeScript, Vite, Tailwind CSS 4, Chart.js

## Prérequis

- **Node.js** 22 LTS ou supérieur
- **pnpm** (activé via `corepack`)

## Installation

```bash
# 1. Récupérer le projet
git clone https://github.com/Orabis/P2oc-TeleSport.git
cd P2oc-TeleSport

# 2. Activer pnpm puis installer les dépendances
corepack enable pnpm
pnpm install
```

## Utilisation

| Commande          | Description                                          |
|-------------------|------------------------------------------------------|
| `pnpm dev`        | Lance le serveur de développement (http://localhost:5173) |
| `pnpm build`      | Build de production (`tsc -b && vite build`)         |
| `pnpm preview`    | Prévisualise le build de production                  |
| `pnpm lint`       | Analyse du code avec ESLint                          |

## Structure du projet

```
src/
├── App.tsx             # Composant racine
├── Router.tsx          # Routes : /, /country/:id, * → NotFound
├── main.tsx            # Point d'entrée, enregistrement des modules Chart.js
├── pages/
│   ├── Home.tsx        # Tableau de bord (vue globale)
│   ├── Country.tsx     # Détail d'un pays
│   └── NotFound.tsx    # Page d'erreur 404
├── components/
│   ├── HeaderComponent.tsx  # En-tête partagé (titre + indicateurs)
│   ├── Indicator.tsx       # Carte de statistique réutilisable
│   ├── PieChart.tsx        # Graphique camembert
│   └── LineChart.tsx       # Graphique linéaire
├── hooks/
│   └── useData.ts    # Accès aux données + état de chargement
├── models/
│   └── olympics.ts   # Types de domaine (Olympic, Participation)
└── utils/
    ├── stats.ts      # Fonctions de calcul
    └── chartConfig.ts # Préparation des données pour Chart.js
```

Voir [`ARCHITECTURE.md`](./ARCHITECTURE.md) pour le détail des responsabilités de chaque couche.

## Stack technique

- **React 19** — bibliothèque UI
- **TypeScript** — typage statique
- **Vite 7** — outil de build et serveur de développement
- **Tailwind CSS 4** — framework CSS utility-first
- **React Router 6** — routage côté client
- **Chart.js** (via `react-chartjs-2`) — visualisation de données
- **ESLint** — qualité et cohérence du code

## Données

L'application utilise actuellement des **données mockées** (tableau statique dans `src/hooks/useData.ts`). L'architecture est prête pour une intégration API : il suffit de modifier `useData()` (fetch natif ou React Query / SWR) sans toucher aux pages ni aux composants.

## Documentation

- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com)
- [Chart.js](https://www.chartjs.org/docs/latest/)

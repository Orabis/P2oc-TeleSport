# Architecture Front-End — TéléSport / Olympics

## Arborescence des dossiers

```
src/
├── main.tsx                  # Point d'entrée, enregistrement Chart.js
├── App.tsx                   # Composant racine
├── Router.tsx                # Configuration React Router
├── index.css                 # Styles globaux
├── pages/
│   ├── Home.tsx              # Page d'accueil
│   └── Country.tsx           # Page détail d'un pays
├── components/
│   ├── Indicator.tsx         # Composant carte statistique réutilisable
│   ├── PieChart.tsx          # Graphique camembert (Chart.js)
│   └── LineChart.tsx         # Graphique linéaire (Chart.js)
├── models/
│   └── olympics.ts           # Interfaces partagées (Olympic, Participation)
├── hooks/
│   └── useData.ts            # Custom hook de gestion des données
└── utils/
    ├── stats.ts              # Fonctions de calcul métier
    └── chartConfig.ts        # Configuration et préparation des données Chart.js
```

## Composants et leurs rôles

### Pages (composants "smart")

#### `Home.tsx` (Page d'accueil)
- Rôle : affiche la vue globale des Jeux Olympiques
- Données : nombre de pays participants, éditions des JO
- UI : indicateurs (`Indicator`) et graphique camembert (`PieChart`) des médailles totales par pays
- Smart : consomme `useData()`, gère le loading, calcule les totaux

#### `Country.tsx` (Page détail)
- Rôle : affiche les statistiques détaillées d'un pays (via paramètre d'URL)
- Données : médailles totales, nombre d'athlètes, participations
- UI : indicateurs (`Indicator`) et graphique linéaire (`LineChart`) de l'évolution des médailles
- Smart : consomme `useData()`, filtre le pays via `useParams()`, appelle les fonctions de calcul (`stats.ts`)

---

### Composants UI (composants "dumb")
#### `Indicator.tsx`
- **Type** : dumb (présentationnel)
- **Rôle** : carte de statistique générique
- **Props** : `title`, `value`, `className` (optionnel, pour colorer le texte)
- **Usage** : utilisé dans `Home` et `Country` pour afficher les KPI (nombre de participations, médailles, etc.)

#### `PieChart.tsx`
- **Type** : dumb
- **Rôle** : affiche un graphique camembert (Chart.js)
- **Props** : `data: Olympic[]` (tableau des pays)
- **Logique interne** : appelle `buildPieData()` (depuis `chartConfig.ts`) pour formater les données Chart.js
- **Usage** : page `Home`

#### `LineChart.tsx`
- **Type** : dumb
- **Rôle** : affiche un graphique linéaire (Chart.js)
- **Props** : `data: Olympic` (un seul pays)
- **Logique interne** : appelle `buildLineData()` (depuis `chartConfig.ts`) pour formater les données Chart.js
- **Usage** : page `Country`

## Custom Hook : `useData()`

### Rôle

Expose l'état `data` (tableau de pays) et un état `isLoading` (booléen de chargement).

- Séparation des responsabilités : les pages ne connaissent pas l'origine des données (actuellement hardcodées dans `inputData`, demain depuis une API)
- Gestion du loading : état `isLoading` dédié, évite les états dérivés bloquants
- Point d'évolution unique : pour brancher une API, il suffit de modifier `useData()` sans toucher aux pages/composants

### Interface

Les types sont centralisés dans `src/models/olympics.ts` et réutilisés par le hook et les utilitaires.

```typescript
// src/models/olympics.ts
export interface Participation {
    id: number;
    year: number;
    city: string;
    medalsCount: number;
    athleteCount: number;
}

export interface Olympic {
    id: number;
    country: string;
    participations: Participation[];
}
```

```typescript
// src/hooks/useData.ts
import type {Olympic} from "../models/olympics.ts";

export function useData() {
    const [data] = useState<Olympic[]>(inputData);
    const [isLoading] = useState(false);
    return { data, isLoading };
}
```

## Utilitaires

### `stats.ts`

Contient les fonctions de calcul des statistiques, séparées de l'UI :

- `calculateTotalMedals(olympic: Olympic): number` — somme des médailles d'un pays
- `calculateTotalAthletes(olympic: Olympic): number` — somme des athlètes d'un pays

### `chartConfig.ts`

Contient les fonctions de préparation des données pour les graphiques Chart.js :

- `buildPieData(data: Olympic[])` — formate les données pour le camembert (labels, couleurs, datasets)
- `buildLineData(olympic: Olympic)` — formate les données pour le graphique linéaire (années, médailles)

## Préparation API et évolution future

1. **Backend** : créer un endpoint REST exposant les données olympiques (ex : `GET /api/olympics`)
2. **Frontend** : modifier **uniquement** `useData.ts` pour fetcher l'API
3. **Gestion d'erreur** : ajouter un état `error` dans `useData()` et gérer l'UI d'erreur dans les pages
4. **Optimisation** : utiliser React Query ou SWR pour le cache, les retries automatiques, et la synchronisation. Ou Utiliser useEffect natif à React.
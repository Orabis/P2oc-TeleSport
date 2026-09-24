# Notes architectures :

## Etape 1 - Problème initiale du code 

### App.tsx contenant tout le code de l'application + Plusieurs composants dans le même fichier + Routing

L'application tient en un seul fichier, l’intérêt de de React est sa modularité et son découpage en plusieurs composants réutilisables au besoins.

La solution serait de chercher dans le code les éléments pouvant être utilisé comme des composants, et les séparés. Que ce soit la logique métiers, Les Duplications de code, et le Routage.

### Données hardcodées dans le composants

 `olympicsData` sont les données codé en dur dans le composants de l'application qui est contraignant a modifier et prend de la place

Une solution serait de crée un  `.json` a la racine du projet et de l'importer directement

### Composant incohérent avec le fichier

le composant Home est situé dans App.tsx, on doit par conséquent séparer les responsabilités dans plusieurs fichiers

### L'utilisation du Type Any

Il y a presque tout le temps l'utilisation du type  `Any` , l'interet de typescript est qu'une fois les variables typés, il empêches des comportements non voulu et peut aider l'IDE à chercher rapidement ce qu'on a besoin

Solution serait de crée des interfaces pour des objets, et de typer correctement les variables 

### useEffect inutile

 `useEffect` est une fonction lourde qui s'execute après le rendu de la page, dans notre cas ont reçois de la donné en dur dans le code donc pas besoin d'utiliser, mais plus tard dans le cas d'un fetch de donnée externe voir pour utiliser react-query a la place

### Console.log()

Dans l'application trop de console log affichant de la donnée sont disposées, en production il est nécessaire de retirer tout les consoles log

Retirer tout les  `console.log` 

### Logique métiers calculs

Séparer la logique métiers ex: calcul dans un fichier a part d'un composants UI , par exemple :  `utils.ts`  

### Etat de chargement des données bloquant

si data reste vide la page restera bloquer sur un `<div> Chargement...</div>` sans gestion d'erreur. 

Il faudrait utiliser un état booléen dédié ex : `isLoading` qui permet de gérer l'état et les erreurs pour prévoir une page d'erreur de chargement 

### HTML Cartes dupliquées

Possibilité d'extraire pour en faire un composant réutilisable dans les différentes pages.

## Etape 2 - Proposition architecture 

### Structure

```
src/
├── main.tsx
├── App.tsx
├── index.css
├── Router.tsx
├── pages/
│   ├── Home.tsx
│   └── Country.tsx
├── components/
│   ├── Charts.tsx
│   └── Indicator.tsx
├── utils/
│   └── buildGraph.ts
├── hooks/
    └── olympicsData.ts

```

### Explication

* En premier lieu je vais garder le `main.tsx` qui sert a initialiser  `app.tsx` , qui va être déconstruit pour le rendre le plus modulaire possible. 
* Je vais crée un  `Router.tsx`  à la racine pour séparer la gestion du routing. Question de bonne pratique et de lisibilité.
* Le dossier  `pages/` servira au routeur pour pointer vers la bonne page, dans cette page on retrouvera l'import des différents  `components`  et le html général
* Les  `Components`  sont nos différents modules qu'on pourra réutiliser, j'ai décidé de séparé les Cartes qui présente des informations  `Indicator.tsx`  et le  `Charts` qui va avoir la mise en place de chartData pour pouvoir bien utiliser `<Pie>` 
* Dans  `utils/buildGraph.ts` aura tout les calculs nécessaire au préalable à envoyer pour que chartData l'utilise
*  Le fichier  `hooks/olympicsData.ts` servira à distribuer la donnée à mes différents composants en gérant la gestion du chargement / erreurs, et sera utile dans le cas ou je vais devoir brancher une API par la suite, j'aurais juste a changer la source par un  `Fetch` par exemple.



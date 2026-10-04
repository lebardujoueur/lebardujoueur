/* ═══════════════════════════════════════════════════════════
   DONNÉES DU SITE (v2) — tout ce qui s'affiche se modifie ICI.
   Écrivez normalement (accents, apostrophes) : tout est entre ` `.
   Le catalogue de jeux est dans games.js.
   ═══════════════════════════════════════════════════════════ */
window.SITE = {

  brand: {
    name: `Le Bar du Joueur`,
    tagline: `Bar à jeux · TCG`,
    lead: `Jeux de société, cartes à collectionner et bières pression. Venez jouer : l'équipe vous explique les règles.`,
    address: `29 rue Henri Barbusse`,
    city: `59580 Aniche`,
    email: `sylvainmargerin@gmail.com`,
    socials: [
      { label: `Facebook`, url: `https://www.facebook.com/profile.php?id=61575867826294` },
      { label: `Instagram`, url: `https://www.instagram.com/lebardujoueur` }
    ]
  },

  /* Statut d'ouverture — changer ici le jour de l'ouverture. */
  status: {
    label: `Ouverture bientôt`,
    note: `La date sera annoncée sur nos réseaux.`
  },

  /* 4 chiffres clés sous l'en-tête */
  stats: [
    { big: `200+`, label: `jeux de société` },
    { big: `Chaque semaine`, label: `tournois de cartes (TCG)` },
    { big: `8`, label: `joueurs autour de la grande table` },
    { big: `Sans alcool`, label: `boissons aussi` }
  ],

  /* PLANNING — modifiez la semaine ici. Un jour par ligne :
        Jour | Titre | Description (facultative)
     "Fermé" en titre grise la ligne ET retire le jour des "jours d'ouverture" affichés en haut. */
  planning: {
    note: `Semaine du 30 septembre — programme prévisionnel.`,
    week: `
Lundi | Fermé
Mardi | Soirée poker by Redcactus | Entrée gratuite, inscription sur le site Redcactus.
Mercredi | Après-midi familles | Jeux courts et initiations, ambiance calme.
Jeudi | Fermé
Vendredi | Soirée à thème | Un thème différent chaque mois, annoncé sur les réseaux.
Samedi | Grand jeu du soir | Parties longues, tables XXL, animateur sur place.
Dimanche | Brunch & jeux calmes | Ouverture en douceur, jeux courts et conviviaux.
`
  },

  /* LA CARTE — modifiez les prix ici (prix publics TTC, repris de votre grille tarifaire).
     Une ligne "# Titre" ouvre une catégorie ; ensuite un article par ligne :
        Nom | précisions | prix
     (précisions et prix libres : "25 cl / 50 cl" et "3 € / 5,50 €" par exemple). */
  carte: {
    note: `Prix TTC, en euros. Carte prévisionnelle — susceptible d'évoluer à l'ouverture.`,
    text: `
# Bières pression
Bière bise blonde | 25 cl / 50 cl | 3 € / 5,50 €
Bière bise ardente | 25 cl / 50 cl | 4 € / 7 €
Bière la cuvée des trolls | 25 cl / 50 cl | 4,50 € / 8 €

# Softs
Coca-Cola | 33 cl, en verre | 3,50 €
Coca-Cola Zéro | 33 cl, en verre | 3,50 €
Orangina | 25 cl, en verre | 3,50 €
Oasis | 25 cl, en verre | 3,50 €
Fuze Tea | 33 cl, en verre | 3,50 €
Perrier | 33 cl, en verre | 3,50 €
Limonade blanche | 25 cl | 2,80 €
Diabolo | 25 cl | 3 €
Cristaline | 50 cl | 2,50 €

# Vins
Cabernet d'Anjou AOP, Pierre Chanau | 12 cl / 75 cl | 3,50 € / 16 €
Rosé pamplemousse, Le Navoy | 12 cl / 75 cl | 3,80 € / 18 €
Sauvignon IGP d'Ardèche | 12 cl / 1 l | 3,20 € / 15 €
Monbazillac AOP, muscadelle / sauvignon | 12 cl / 1 l | 4 € / 21 €

# Snacking
Croque-monsieur | Pain, jambon, emmental | 6 €
Hot-dog | Pain, saucisse de porc, moutarde, ketchup | 5 €
Planche apéro duo | Emmental, saucissons, terrine de porc, olives, cornichons, tomates cerises, pain toasté | 12 €
Saucisson fuet d'Espagne | 170 g | 6 €
Chips Lays | 45 g | 3,50 €

# Boissons chaudes
Café expresso | 40 ml | 2 €
Café double | 80 ml | 3,80 €
Thé | Menthe, citron ou pêche — 200 ml | 3 €
Chocolat chaud | 200 ml | 3 €

# Desserts
Gaufre | 100 g | 3 €
Cookie | 100 g | 3,80 €
Crêpe nature | Sans garniture | 3 €
Crêpe garnie | Nutella, confiture de fraises ou sucre | 3 €
`
  },

  jeuxNote: `Filtrez par âge ou par catégorie pour trouver le jeu adapté. La liste s'agrandit au fil des arrivages.`,

  /* ACTUS — le plus récent en premier. `images` facultatif. */
  news: [
    {
      date: `Sept. 2026`,
      title: `Partenariat avec Gigamic`,
      desc: `Le Bar du Joueur s'associe à l'éditeur Gigamic pour construire sa ludothèque dès l'ouverture. Un aperçu de la sélection déjà en rayon.`,
      images: [
        `images/game-loot.png`, `images/game-alibis.png`, `images/game-legende-trois-pieces.png`,
        `images/game-gorynich.png`, `images/game-temple-code.png`, `images/game-vampire-village.png`,
        `images/game-dorfromantik-duel.png`, `images/game-treetopia.png`, `images/game-colline-feux-follets.png`,
        `images/game-5-royaumes.png`, `images/game-bango.png`, `images/game-reigns.jpg`
      ]
    }
  ]
};

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

  /* 3 chiffres clés sous l'en-tête */
  stats: [
    { big: `200+`, label: `jeux de société` },
    { big: `Tournois de jeux`, label: `chaque semaine` },
    { big: `Licence III`, label: `bières, vins et boissons sans alcool` }
  ],

  /* LES FORMULES — 3 façons de consommer le bar. Modifiez ici.
     `extra` = ligne d'introduction (ex. « Tout le Champion, plus : »). `bonuses` = une puce par avantage. */
  formulesNote: ``,
  formules: [
    {
      icon: `cup`,
      name: `Le Soifard`,
      tagline: `Vous venez boire un verre, sans jouer`,
      price: `0 €`,
      priceNote: `Installez-vous où vous voulez, comme dans n'importe quel bar.`,
      extra: ``,
      bonuses: []
    },
    {
      icon: `die`,
      name: `Le Champion`,
      tagline: `Vous jouez à l'occasion`,
      price: `À partir de 3 €`,
      priceNote: `Participation réglée à la table, dès qu'un jeu sort de la ludothèque.`,
      extra: ``,
      bonuses: [`3 € jusqu'à 2 h de jeu`, `+ 2 € au-delà de 2 h`]
    },
    {
      icon: `crown`,
      name: `La Légende`,
      tagline: `Vous jouez régulièrement`,
      price: `20 € / mois`,
      priceNote: ``,
      extra: ``,
      bonuses: [`Accès illimité`, `Accompagnement offert : un invité par mois sur une session d'accès aux jeux`, `−10 % sur les boissons`, `−10 % sur les événements et la boutique TCG`],
      featured: true
    }
  ],

  /* PLANNING — modifiez la semaine ici. Un jour par ligne :
        Jour | animation ; animation ; animation
     Chaque animation commence par son heure : "20h Soirée poker" ou "18h–20h Happy Hour".
     "Fermé" grise la ligne ET retire le jour des "jours d'ouverture" affichés en haut. */
  planning: {
    note: `Programme de la semaine — susceptible d'évoluer.`,
    week: `
Lundi | Fermé
Mardi | 20h Soirée poker (Redcactus)
Mercredi | 14h Initiation TCG ; 19h Fléchette party
Jeudi | 18h–20h Happy Hour
Vendredi | 20h Soirée TCG (Lorcana, Magic)
Samedi | 13h Ligue Pokémon ; 14h Belote ; 20h Karaoké
Dimanche | 10h Draft TCG (Riftbound) ; 14h Loup-garou ; 21h Soirée foot (Ligue 1)
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

  /* FICHES D'ÉVÉNEMENTS — au clic sur une animation du planning.
     `match` = un mot qui se trouve dans le nom de l'animation (ex. "poker" pour « Soirée poker (Redcactus) »).
     Champs (tous facultatifs sauf match) :
       desc        description de la soirée
       paf         participation aux frais (ex. « Gratuit », « 3 € »)
       provider    { name, text, url }  le prestataire / organisateur et son lien
       reservation true = affiche le bouton « Réserver »
       places      nombre de places (ex. 32) : affiché sur la fiche et limite le nombre de personnes par demande
       complet     mettre true quand toutes les places sont prises : le bouton « Réserver » est remplacé par « Complet » */
  evenements: [
    {
      match: `poker`,
      desc: `Tournoi de poker gratuit et convivial, organisé chaque semaine avec Red Cactus. On joue au Texas Hold'em, sans aucune mise d'argent à la table : les joueurs cumulent des points selon leur classement. Débutants bienvenus, l'équipe vous explique les règles.`,
      paf: `Gratuite`,
      places: 32,
      complet: false,
      provider: {
        name: `Red Cactus`,
        text: `Réseau national de poker amateur : des tournois gratuits dans des bars partenaires partout en France, avec un classement par points.`,
        url: `https://www.redcactuspoker.fr`
      },
      reservation: true
    }
  ],

  /* RÉSERVATION — sans serveur, la demande part par e-mail vers l'adresse du bar.
     Plus tard, pour recevoir les réservations dans un tableau (Formspree, Tally…), collez ici l'adresse
     du formulaire dans `endpoint` : le site l'utilisera automatiquement. */
  reservation: {
    endpoint: ``,
    maxPersonnes: 8
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

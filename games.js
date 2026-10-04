/* ═══════════════════════════════════════════════════════════
   CATALOGUE DE JEUX — window.SITE_GAMES
   Fichier séparé de content.js exprès : celui-ci va grossir
   (objectif ~200 jeux), autant ne pas le mélanger avec les textes
   du site. Chargé avant tabs.js, qui affiche la liste filtrable
   (par âge, par catégorie, par recherche) dans l'onglet « Jeux ».

   POUR AJOUTER UN JEU : copiez un bloc { ... } ci-dessous, entre
   les deux accolades { }, séparé du précédent par une virgule.
   Seuls `name` et `age` sont vraiment nécessaires pour que le jeu
   apparaisse et se filtre correctement ; tout le reste peut être
   laissé vide ('') ou supprimé si vous ne l'avez pas encore.

   - name     : nom du jeu
   - img      : chemin vers l'image dans images/ (laisser '' si pas de photo)
   - category : famille du jeu, sert au filtre "catégorie" — réutilisez
                si possible une catégorie déjà existante plus bas
                (Stratégie, Enquête & Déduction, Coopératif & Famille,
                Cartes & Ambiance…) pour ne pas multiplier les filtres
   - players  : ex. "2 à 4 joueurs"
   - age      : UN NOMBRE (pas de texte), l'âge minimum conseillé —
                c'est ce qui alimente le filtre par âge
   - duration : ex. "30 min" (laisser '' si inconnu)
   - desc     : 2-3 phrases de description (laisser '' si pas encore écrit)
   - comments : tableau de quelques impressions, ou [] si aucune
   - video    : lien vers une vidéo de règles, ou null si aucune

   Écrivez le texte normalement (accents, apostrophes) : tout est
   entre des ` ` (accent grave), pas de risque de casser le site.
   ═══════════════════════════════════════════════════════════ */

window.SITE_GAMES = [
  {
    name: `LOOOT`,
    img: `images/game-loot.png`,
    category: `Stratégie`,
    players: `2 à 4 joueurs`,
    age: 10,
    duration: `30-35 min`,
    desc: `Dans la peau de chefs de tribus vikings, les joueurs placent leurs guerriers sur les tuiles pour récolter des ressources et s'emparer de bâtiments presque sans défense. Il faut ensuite organiser habilement son butin dans son fjord personnel pour remplir des objectifs et devenir le prochain roi des vikings.`,
    comments: [
      `Salué sur Trictrac pour son côté beau et fluide, simple à prendre en main mais avec une vraie profondeur de réflexion.`,
      `Jugé efficace mais assez classique dans ses mécanismes par plusieurs testeurs, malgré un bel accueil presse.`,
      `Le placement des vikings demande d'anticiper les coups adverses — apprécié des amateurs de gestion tactique légère.`
    ],
    video: `https://www.youtube.com/watch?v=FtMR966pTrA`
  },
  {
    name: `Vampire Village`,
    img: `images/game-vampire-village.png`,
    category: `Stratégie`,
    players: `2 à 5 joueurs`,
    age: 10,
    duration: `25 min`,
    desc: `Draft de cartes et défense de village dans une ambiance fantastique et inquiétante. Le jour, chaque joueur construit son village en recrutant des héros protecteurs ; la nuit, vampires, loups-garous, sorcières et démons sont répartis entre voisins avant d'attaquer les points faibles des défenses adverses.`,
    comments: [
      `Un test détaillé salue l'originalité du mélange tower-defense et draft, assez inhabituel dans le jeu de société familial.`,
      `La thématique vampires/créatures nocturnes est jugée captivante et bien illustrée, avec des graphismes très réussis.`,
      `Règles décrites comme simples à assimiler, avec des parties assez courtes qui donnent envie d'enchaîner.`
    ],
    video: `https://www.youtube.com/watch?v=T9wKHJf_Nj8`
  },
  {
    name: `Dorfromantik Le Duel`,
    img: `images/game-dorfromantik-duel.png`,
    category: `Stratégie`,
    players: `2 joueurs (jusqu’à 6 en équipes)`,
    age: 8,
    duration: `40 min`,
    desc: `Version compétitive du célèbre Dorfromantik (Spiel des Jahres 2023). Deux joueurs ou deux équipes construisent chacun leur propre paysage à l'aide de tuiles hexagonales, en remplissant des objectifs pour marquer un maximum de points.`,
    comments: [
      `Avis partagés sur Trictrac : règle facile à prendre en main, rangement bien pensé, mais lisibilité des couleurs de tuiles parfois critiquée.`,
      `Transformer ce jeu coopératif culte en duel fonctionne bien et apporte une vraie tension tactique, selon plusieurs tests.`,
      `Un jeu agréable en tête-à-tête, qui perd un peu la dimension zen de l'original au profit d'un affrontement plus calculateur.`
    ],
    video: `https://www.youtube.com/watch?v=enFdR2QX6fM`
  },
  {
    name: `5 Royaumes`,
    img: `images/game-5-royaumes.png`,
    category: `Stratégie`,
    players: `2 joueurs`,
    age: 10,
    duration: `15-20 min`,
    desc: `Jeu de cartes en duel où deux joueurs s'affrontent pour reprendre le pouvoir après des années dans l'ombre. Chaque carte a une bannière sur une face et un personnage de royaume sur l'autre : on place des bannières pour récupérer des cartes, puis on influence un royaume ou recrute dans son conseil.`,
    comments: [
      `Prise en main un peu délicate au début selon un avis, mais qui devient rapidement addictive une fois les deux zones bien comprises.`,
      `Les illustrations et le fort niveau d'interaction entre joueurs sont régulièrement cités comme des points forts.`,
      `Format petite boîte apprécié pour la rapidité de mise en place et des parties tendues malgré un temps de jeu court.`
    ],
    video: `https://www.youtube.com/watch?v=smu4JqTojmw`
  },
  {
    name: `Alibis`,
    img: `images/game-alibis.png`,
    category: `Enquête & Déduction`,
    players: `3 à 6 joueurs`,
    age: 14,
    duration: `45 min`,
    desc: `« Le jeu dont vous êtes les suspects » : les joueurs inventent collectivement une scène de crime, un mobile et des suspects, puis s'interrogent mutuellement pour bâtir leur alibi tout en semant le doute sur les autres. Un vote désigne le coupable, avant une phase finale où chacun devient journaliste.`,
    comments: [
      `Installation rapide et rejouabilité quasi infinie saluées par plusieurs blogs jeux, le scénario étant inventé à chaque partie.`,
      `L'ambiance est comparée à l'écriture collective d'une série policière, avec un vrai plaisir à découvrir le coupable en fin de partie.`,
      `Le matériel permet de composer jusqu'à 6 scènes de crime différentes selon plusieurs retours de joueurs.`
    ],
    video: `https://www.youtube.com/watch?v=Qn2CAWeqVBA`
  },
  {
    name: `Temple Code`,
    img: `images/game-temple-code.png`,
    category: `Enquête & Déduction`,
    players: `1 à 4 joueurs`,
    age: 8,
    duration: `30 min`,
    desc: `Des archéologues rivaux lancés dans une course pour percer les secrets d'un temple sacré. Il faut déduire, par élimination et indices visuels, la combinaison secrète de statuettes qui ouvre la salle du trésor de chaque adversaire — un mélange de logique façon Mastermind et de tension entre joueurs.`,
    comments: [
      `Règles qui s'apprennent en quelques minutes et mise en place très rapide, selon plusieurs retours.`,
      `Rejouabilité jugée excellente grâce aux 35 combinaisons possibles, impossibles à retenir d'une partie à l'autre.`,
      `Mécanisme de déduction accessible mais suffisamment malin pour plaire aux amateurs de logique.`
    ],
    video: `https://www.youtube.com/watch?v=C8tblVloePs`
  },
  {
    name: `La Légende des Trois Pièces`,
    img: `images/game-legende-trois-pieces.png`,
    category: `Coopératif & Famille`,
    players: `2 à 5 joueurs`,
    age: 6,
    duration: `20 min`,
    desc: `Un jeu coopératif de narration où les joueurs racontent ensemble, tour à tour, les aventures d'un même héros à l'aide de cartes illustrées et de dés « éléments d'histoire ». Le narrateur désigne en secret la meilleure carte, une moyenne et une mauvaise ; si l'encrier se vide avant le Happy End, la partie est perdue.`,
    comments: [
      `Un vrai plaisir narratif en famille selon un test, avec un bémol : connaître les codes de l'histoire rend parfois les choix trop évidents.`,
      `Un retour de famille décrit le jeu comme un vrai coup de cœur, chez les enfants comme chez les adultes qui jouent avec eux.`,
      `Généralement jugé accessible dès 6 ans, avec des parties courtes et un bel objet (encrier, pièces) qui plaît visuellement.`
    ],
    video: null
  },
  {
    name: `Gorynich`,
    img: `images/game-gorynich.png`,
    category: `Coopératif & Famille`,
    players: `3 à 7 joueurs`,
    age: 8,
    duration: `20 min`,
    desc: `Un conte russe où les joueurs incarnent collectivement le terrible dragon cracheur de feu Gorynich. En coopération, il faut repousser des chevaliers qui avancent vers le château, en choisissant secrètement les actions du dragon sans jamais pouvoir en discuter à voix haute.`,
    comments: [
      `Illustrations saluées pour leur cohérence avec l'univers slave, et règles simples à prendre en main.`,
      `L'ambiance coopérative fonctionne bien malgré l'absence de communication entre joueurs — bons fous rires en groupe.`,
      `À plus grand nombre de joueurs, le jeu devient plus imprévisible et peut frustrer les novices du genre, selon certains avis.`
    ],
    video: `https://www.youtube.com/watch?v=fe4_fbflgbk`
  },
  {
    name: `La Colline aux Feux Follets, le jeu de cartes`,
    img: `images/game-colline-feux-follets.png`,
    category: `Coopératif & Famille`,
    players: `1 à 6 joueurs`,
    age: 5,
    duration: `15 min`,
    desc: `Version cartes du célèbre jeu coopératif (Kinderspiel des Jahres 2022) : les joueurs incarnent des apprentis qui suivent les feux follets pour rejoindre Jasper le gnome et récupérer ses cristaux magiques avant les sorcières. Format compact, idéal pour jouer partout.`,
    comments: [
      `Un avis regrette un jeu qui semble surfer sur le succès de son grand frère, matériel jugé un peu décevant par rapport à l'original.`,
      `D'autres avis saluent au contraire une adaptation fluide et facile à expliquer, avec une vraie tension malgré le format voyage.`,
      `Parties rapides et jeu jouable en solo, un bon point pour une initiation en douceur à la coopération.`
    ],
    video: `https://ludovox.fr/ludochrono-la-colline-aux-feux-follets-le-jeu-de-cartes/`
  },
  {
    name: `Treetopia`,
    img: `images/game-treetopia.png`,
    category: `Cartes & Ambiance`,
    players: `2 à 4 joueurs`,
    age: 8,
    duration: `20 min`,
    desc: `Les joueurs sauvent des arbres menacés en les déterrant de leurs milieux hostiles pour les replanter dans un sanctuaire. Il faut respecter les besoins propres à chaque espèce et regrouper astucieusement les arbres de même type ou en symbiose pour récolter un maximum de points d'espoir.`,
    comments: [
      `De jolies illustrations et des choix de couleurs judicieux salués par un test, pour un univers poétique et optimiste.`,
      `Accueil très positif dans la majorité des tests recensés : un petit jeu familial fluide et malin, non sans une part de hasard.`,
      `Jeu accessible et rapide, agréable à ressortir régulièrement en famille selon plusieurs retours.`
    ],
    video: `https://www.youtube.com/watch?v=qzcwDqyH_MQ`
  },
  {
    name: `Bango`,
    img: `images/game-bango.png`,
    category: `Cartes & Ambiance`,
    players: `2 à 5 joueurs`,
    age: 8,
    duration: `15 min`,
    desc: `Jeu de cartes familial et rapide au mécanisme « stop ou encore ». Chacun révèle des cartes une à une pour construire jusqu'à trois suites devant soi, mais pousser trop loin fait exploser le tour et ruine les gains. Le score dépend de la longueur des suites et des couleurs dominantes.`,
    comments: [
      `Jugé simple à expliquer et efficace pour lancer une soirée, apprécié pour son tempo nerveux et ses parties courtes.`,
      `Aspect familial accessible dès 8 ans souligné par plusieurs avis, avec le petit stress du risque d'explosion.`,
      `Considéré comme un bon « filler » à sortir entre deux jeux plus longs, avec une bonne rejouabilité.`
    ],
    video: `https://www.youtube.com/watch?v=ySrHPwQCAD0`
  },
  {
    name: `Reigns`,
    img: `images/game-reigns.jpg`,
    category: `Cartes & Ambiance`,
    players: `3 à 6 joueurs (idéal à 4)`,
    age: 8,
    duration: `env. 40 min`,
    desc: `Adaptation en jeu de plateau du célèbre jeu vidéo mobile Reigns. Un joueur incarne le Monarque et doit accepter ou refuser les propositions de ses conseillers (les autres joueurs), chaque décision influençant quatre piliers du royaume : Peuple, Armée, Religion et Finances.`,
    comments: [
      `Note moyenne d'environ 7/10 relevée en ligne, avis soulignant un jeu narratif fort demandant beaucoup d'improvisation.`,
      `Originalité du mécanisme de bluff et esthétique soignée saluées par plusieurs tests, rythme parfois jugé inégal.`,
      `Le poids des décisions du Monarque sur la partie entière est parfois vu comme un léger déséquilibre, mais l'ambiance de bluff est jugée très réussie en groupe.`
    ],
    video: `https://www.youtube.com/watch?v=St9vJu-trf0`
  }

  /* ── Continuez ici : un bloc { ... }, une virgule, le suivant ── */
];

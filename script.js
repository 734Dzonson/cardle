/* =============================================
   CARDLE – SCRIPT.JS  v3
   Features: i18n, cookies/localStorage user DB,
   streaks, leaderboard, share, wiki images
============================================= */

// ══════════════════════════════════════════
//  TRANSLATIONS
// ══════════════════════════════════════════
const LANGS = {
  en: {
    leaderboard: '🏅 Board', profile: '👤 Profile', nextCar: 'Next car in',
    guess: 'GUESS', intro: "Guess today's mystery car. Each guess reveals clues.",
    exact: 'Exact', close: 'Close', wrong: 'Wrong', higherLower: 'Higher / Lower',
    colPhoto: 'Photo', colMake: 'Manufacturer', colModel: 'Model', colYear: 'Year',
    colCountry: 'Country', colBody: 'Body', colDrive: 'Drive', colEngine: 'Engine', colDoors: 'Doors',
    welcomeTitle: 'Welcome to CarDle!',
    welcomeSub: 'Enter your nickname to track your stats and appear on the leaderboard.',
    nicknamePlaceholder: 'Your nickname…',
    letsGo: "Let's go! 🚀",
    skipGuest: 'Skip (play as guest)',
    nextCarIn: 'Next CarDle in',
    share: 'Share result',
    close: 'Close',
    streak: '🔥 Streak',
    totalWins: '🏆 Wins',
    avgGuesses: '🎯 Avg Guesses',
    lbNote: 'Scores stored locally in your browser.',
    searchPlaceholder: 'Type car name… e.g. BMW M3',
    streakMsg: n => n > 1 ? `🔥 ${n}-day streak!` : '🎯 First win!',
    winMsg: n => `Guessed in <strong>${n}</strong> attempt${n!==1?'s':''}!`,
    loseMsg: car => `The car was <strong>${car.manufacturer} ${car.model}</strong>`,
    guessDistLabel: 'Guess distribution',
    played: 'Played', wins: 'Wins', avgG: 'Avg', bestStreak: 'Best streak',
    alreadyGuessed: '⚠️ Already guessed!', carNotFound: '❌ Car not found',
    copiedToClipboard: '✅ Copied to clipboard!',
    renameLabel: 'Change nickname', renameBtn: 'Save',
    statsTitle: 'Your Stats',
  },
  pl: {
    leaderboard: '🏅 Tabela', profile: '👤 Profil', nextCar: 'Następny za',
    guess: 'ZGADNIJ', intro: 'Zgadnij dzisiejsze tajemnicze auto. Każda próba daje podpowiedzi.',
    exact: 'Trafiony', close: 'Blisko', wrong: 'Błąd', higherLower: 'Wyżej / Niżej',
    colPhoto: 'Zdjęcie', colMake: 'Producent', colModel: 'Model', colYear: 'Rok',
    colCountry: 'Kraj', colBody: 'Nadwozie', colDrive: 'Napęd', colEngine: 'Silnik', colDoors: 'Drzwi',
    welcomeTitle: 'Witaj w CarDle!',
    welcomeSub: 'Podaj pseudonim, by śledzić wyniki i pojawić się w rankingu.',
    nicknamePlaceholder: 'Twój pseudonim…',
    letsGo: 'Zaczynamy! 🚀',
    skipGuest: 'Pomiń (zagraj jako gość)',
    nextCarIn: 'Następny CarDle za',
    share: 'Udostępnij wynik',
    close: 'Zamknij',
    streak: '🔥 Seria',
    totalWins: '🏆 Wygrane',
    avgGuesses: '🎯 Śr. prób',
    lbNote: 'Wyniki zapisane lokalnie w przeglądarce.',
    searchPlaceholder: 'Wpisz auto… np. BMW M3',
    streakMsg: n => n > 1 ? `🔥 Seria ${n} dni!` : '🎯 Pierwsza wygrana!',
    winMsg: n => `Zgadłeś w <strong>${n}</strong> próbie${n===1?'':'ach'}!`,
    loseMsg: car => `Autem było <strong>${car.manufacturer} ${car.model}</strong>`,
    guessDistLabel: 'Rozkład prób',
    played: 'Rozegrane', wins: 'Wygrane', avgG: 'Śr.', bestStreak: 'Najd. seria',
    alreadyGuessed: '⚠️ Już zgadywałeś!', carNotFound: '❌ Nie znaleziono auta',
    copiedToClipboard: '✅ Skopiowano!',
    renameLabel: 'Zmień pseudonim', renameBtn: 'Zapisz',
    statsTitle: 'Twoje statystyki',
  },
  es: {
    leaderboard: '🏅 Tabla', profile: '👤 Perfil', nextCar: 'Próximo en',
    guess: 'ADIVINAR', intro: 'Adivina el coche misterioso. Cada intento revela pistas.',
    exact: 'Exacto', close: 'Cerca', wrong: 'Error', higherLower: 'Mayor / Menor',
    colPhoto: 'Foto', colMake: 'Fabricante', colModel: 'Modelo', colYear: 'Año',
    colCountry: 'País', colBody: 'Carrocería', colDrive: 'Tracción', colEngine: 'Motor', colDoors: 'Puertas',
    welcomeTitle: '¡Bienvenido a CarDle!',
    welcomeSub: 'Pon un apodo para seguir tus stats y aparecer en el ranking.',
    nicknamePlaceholder: 'Tu apodo…',
    letsGo: '¡Vamos! 🚀',
    skipGuest: 'Saltar (jugar como invitado)',
    nextCarIn: 'Próximo CarDle en',
    share: 'Compartir resultado',
    close: 'Cerrar',
    streak: '🔥 Racha',
    totalWins: '🏆 Victorias',
    avgGuesses: '🎯 Prom. intentos',
    lbNote: 'Puntuaciones guardadas en tu navegador.',
    searchPlaceholder: 'Escribe un coche… ej. BMW M3',
    streakMsg: n => n > 1 ? `🔥 ¡Racha de ${n} días!` : '🎯 ¡Primera victoria!',
    winMsg: n => `¡Adivinado en <strong>${n}</strong> intento${n!==1?'s':''}!`,
    loseMsg: car => `El coche era <strong>${car.manufacturer} ${car.model}</strong>`,
    guessDistLabel: 'Distribución de intentos',
    played: 'Jugado', wins: 'Victorias', avgG: 'Prom.', bestStreak: 'Mejor racha',
    alreadyGuessed: '⚠️ ¡Ya lo adivinaste!', carNotFound: '❌ Coche no encontrado',
    copiedToClipboard: '✅ ¡Copiado!',
    renameLabel: 'Cambiar apodo', renameBtn: 'Guardar',
    statsTitle: 'Tus estadísticas',
  },
  de: {
    leaderboard: '🏅 Rangliste', profile: '👤 Profil', nextCar: 'Nächstes in',
    guess: 'RATEN', intro: 'Errate das heutige Geheimfahrzeug. Jeder Versuch gibt Hinweise.',
    exact: 'Treffer', close: 'Nah dran', wrong: 'Falsch', higherLower: 'Höher / Niedriger',
    colPhoto: 'Foto', colMake: 'Hersteller', colModel: 'Modell', colYear: 'Jahr',
    colCountry: 'Land', colBody: 'Karosserie', colDrive: 'Antrieb', colEngine: 'Motor', colDoors: 'Türen',
    welcomeTitle: 'Willkommen bei CarDle!',
    welcomeSub: 'Gib einen Spitznamen ein, um deine Statistiken zu verfolgen.',
    nicknamePlaceholder: 'Dein Spitzname…',
    letsGo: 'Los geht\'s! 🚀',
    skipGuest: 'Überspringen (als Gast spielen)',
    nextCarIn: 'Nächstes CarDle in',
    share: 'Ergebnis teilen',
    close: 'Schließen',
    streak: '🔥 Serie',
    totalWins: '🏆 Siege',
    avgGuesses: '🎯 Ø Versuche',
    lbNote: 'Punkte lokal im Browser gespeichert.',
    searchPlaceholder: 'Auto eingeben… z.B. BMW M3',
    streakMsg: n => n > 1 ? `🔥 ${n}-Tage-Serie!` : '🎯 Erster Sieg!',
    winMsg: n => `Erraten in <strong>${n}</strong> Versuch${n!==1?'en':''}!`,
    loseMsg: car => `Das Auto war <strong>${car.manufacturer} ${car.model}</strong>`,
    guessDistLabel: 'Versuchsverteilung',
    played: 'Gespielt', wins: 'Siege', avgG: 'Ø', bestStreak: 'Beste Serie',
    alreadyGuessed: '⚠️ Bereits geraten!', carNotFound: '❌ Auto nicht gefunden',
    copiedToClipboard: '✅ Kopiert!',
    renameLabel: 'Spitznamen ändern', renameBtn: 'Speichern',
    statsTitle: 'Deine Statistiken',
  },
  fr: {
    leaderboard: '🏅 Classement', profile: '👤 Profil', nextCar: 'Prochain dans',
    guess: 'DEVINER', intro: "Devinez la voiture mystère du jour. Chaque essai révèle des indices.",
    exact: 'Exact', close: 'Proche', wrong: 'Faux', higherLower: 'Haut / Bas',
    colPhoto: 'Photo', colMake: 'Fabricant', colModel: 'Modèle', colYear: 'Année',
    colCountry: 'Pays', colBody: 'Carrosserie', colDrive: 'Traction', colEngine: 'Moteur', colDoors: 'Portes',
    welcomeTitle: 'Bienvenue sur CarDle !',
    welcomeSub: 'Entrez un pseudo pour suivre vos stats et apparaître dans le classement.',
    nicknamePlaceholder: 'Votre pseudo…',
    letsGo: 'C\'est parti ! 🚀',
    skipGuest: 'Passer (jouer en invité)',
    nextCarIn: 'Prochain CarDle dans',
    share: 'Partager le résultat',
    close: 'Fermer',
    streak: '🔥 Série',
    totalWins: '🏆 Victoires',
    avgGuesses: '🎯 Moy. essais',
    lbNote: 'Scores enregistrés localement dans votre navigateur.',
    searchPlaceholder: 'Tapez un modèle… ex. BMW M3',
    streakMsg: n => n > 1 ? `🔥 Série de ${n} jours !` : '🎯 Première victoire !',
    winMsg: n => `Deviné en <strong>${n}</strong> essai${n!==1?'s':''}!`,
    loseMsg: car => `La voiture était <strong>${car.manufacturer} ${car.model}</strong>`,
    guessDistLabel: 'Distribution des essais',
    played: 'Joué', wins: 'Victoires', avgG: 'Moy.', bestStreak: 'Meilleure série',
    alreadyGuessed: '⚠️ Déjà deviné !', carNotFound: '❌ Voiture introuvable',
    copiedToClipboard: '✅ Copié !',
    renameLabel: 'Changer de pseudo', renameBtn: 'Enregistrer',
    statsTitle: 'Vos statistiques',
  },
};

// ══════════════════════════════════════════
//  CAR DATABASE (370 cars, embedded)
// ══════════════════════════════════════════
const CAR_DATA = [{"manufacturer":"Toyota","model":"Supra Mk1","year":1978,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":110,"doors":2,"wiki":"Toyota_Supra"},{"manufacturer":"Toyota","model":"Supra Mk2","year":1982,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":150,"doors":2,"wiki":"Toyota_Supra"},{"manufacturer":"Toyota","model":"Supra Mk3","year":1986,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":200,"doors":2,"wiki":"Toyota_Supra"},{"manufacturer":"Toyota","model":"Supra Mk4","year":1993,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":320,"doors":2,"wiki":"Toyota_Supra"},{"manufacturer":"Toyota","model":"Supra Mk5","year":2019,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":382,"doors":2,"wiki":"Toyota_GR_Supra"},{"manufacturer":"Toyota","model":"Corolla E10","year":1966,"country":"Japan","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":60,"doors":4,"wiki":"Toyota_Corolla"},{"manufacturer":"Toyota","model":"Corolla E20","year":1970,"country":"Japan","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":73,"doors":4,"wiki":"Toyota_Corolla"},{"manufacturer":"Toyota","model":"Corolla E30","year":1974,"country":"Japan","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":75,"doors":4,"wiki":"Toyota_Corolla"},{"manufacturer":"Toyota","model":"Corolla E70","year":1979,"country":"Japan","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":75,"doors":4,"wiki":"Toyota_Corolla"},{"manufacturer":"Toyota","model":"Corolla AE86","year":1983,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":128,"doors":2,"wiki":"Toyota_AE86"},{"manufacturer":"Toyota","model":"Corolla E90","year":1987,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":95,"doors":4,"wiki":"Toyota_Corolla"},{"manufacturer":"Toyota","model":"Corolla E100","year":1991,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":110,"doors":4,"wiki":"Toyota_Corolla"},{"manufacturer":"Toyota","model":"Corolla E110","year":1995,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":107,"doors":4,"wiki":"Toyota_Corolla"},{"manufacturer":"Toyota","model":"Corolla E120","year":2000,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":140,"doors":4,"wiki":"Toyota_Corolla"},{"manufacturer":"Toyota","model":"Corolla E140","year":2006,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":132,"doors":4,"wiki":"Toyota_Corolla"},{"manufacturer":"Toyota","model":"Corolla E170","year":2013,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":132,"doors":4,"wiki":"Toyota_Corolla"},{"manufacturer":"Toyota","model":"Corolla E210","year":2019,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Hybrid","hp":122,"doors":4,"wiki":"Toyota_Corolla_(E210)"},{"manufacturer":"Toyota","model":"Camry V10","year":1982,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":83,"doors":4,"wiki":"Toyota_Camry"},{"manufacturer":"Toyota","model":"Camry V20","year":1986,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":100,"doors":4,"wiki":"Toyota_Camry"},{"manufacturer":"Toyota","model":"Camry V30","year":1991,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":130,"doors":4,"wiki":"Toyota_Camry"},{"manufacturer":"Toyota","model":"Camry V40","year":1994,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":133,"doors":4,"wiki":"Toyota_Camry"},{"manufacturer":"Toyota","model":"Camry V50","year":2011,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":178,"doors":4,"wiki":"Toyota_Camry"},{"manufacturer":"Toyota","model":"Camry V70","year":2017,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Hybrid","hp":203,"doors":4,"wiki":"Toyota_Camry_(XV70)"},{"manufacturer":"Toyota","model":"Land Cruiser FJ40","year":1960,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":130,"doors":4,"wiki":"Toyota_Land_Cruiser_40"},{"manufacturer":"Toyota","model":"Land Cruiser FJ55","year":1967,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":135,"doors":4,"wiki":"Toyota_Land_Cruiser_55"},{"manufacturer":"Toyota","model":"Land Cruiser FJ60","year":1980,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":135,"doors":4,"wiki":"Toyota_Land_Cruiser_60"},{"manufacturer":"Toyota","model":"Land Cruiser 80","year":1989,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Diesel","hp":160,"doors":4,"wiki":"Toyota_Land_Cruiser_80"},{"manufacturer":"Toyota","model":"Land Cruiser 100","year":1998,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":235,"doors":4,"wiki":"Toyota_Land_Cruiser_100"},{"manufacturer":"Toyota","model":"Land Cruiser 200","year":2007,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Diesel","hp":286,"doors":4,"wiki":"Toyota_Land_Cruiser_200"},{"manufacturer":"Toyota","model":"Land Cruiser 300","year":2021,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Diesel","hp":309,"doors":4,"wiki":"Toyota_Land_Cruiser_300"},{"manufacturer":"Toyota","model":"GR Yaris","year":2020,"country":"Japan","body":"Hatchback","drivetrain":"AWD","engine":"Petrol","hp":261,"doors":4,"wiki":"Toyota_GR_Yaris"},{"manufacturer":"Toyota","model":"GR86 2nd Gen","year":2022,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":228,"doors":2,"wiki":"Toyota_GR86"},{"manufacturer":"Toyota","model":"GR Corolla","year":2023,"country":"Japan","body":"Hatchback","drivetrain":"AWD","engine":"Petrol","hp":300,"doors":4,"wiki":"Toyota_GR_Corolla"},{"manufacturer":"Toyota","model":"RAV4 Mk1","year":1994,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":120,"doors":4,"wiki":"Toyota_RAV4"},{"manufacturer":"Toyota","model":"RAV4 Mk5","year":2018,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Hybrid","hp":219,"doors":4,"wiki":"Toyota_RAV4_(XA50)"},{"manufacturer":"Toyota","model":"Hilux","year":2020,"country":"Japan","body":"Pickup","drivetrain":"AWD","engine":"Diesel","hp":204,"doors":4,"wiki":"Toyota_Hilux"},{"manufacturer":"Toyota","model":"Prius 1st Gen","year":1997,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Hybrid","hp":70,"doors":4,"wiki":"Toyota_Prius_(XW10)"},{"manufacturer":"Toyota","model":"Prius 4th Gen","year":2015,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Hybrid","hp":121,"doors":4,"wiki":"Toyota_Prius_(XW50)"},{"manufacturer":"Toyota","model":"bZ4X","year":2022,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":215,"doors":4,"wiki":"Toyota_bZ4X"},{"manufacturer":"BMW","model":"M3 E30","year":1986,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":200,"doors":2,"wiki":"BMW_M3_(E30)"},{"manufacturer":"BMW","model":"M3 E36","year":1992,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":286,"doors":2,"wiki":"BMW_M3_(E36)"},{"manufacturer":"BMW","model":"M3 E46","year":2000,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":343,"doors":2,"wiki":"BMW_M3_(E46)"},{"manufacturer":"BMW","model":"M3 E92","year":2007,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":414,"doors":2,"wiki":"BMW_M3_(E9x)"},{"manufacturer":"BMW","model":"M3 F80","year":2014,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":431,"doors":4,"wiki":"BMW_M3_(F80)"},{"manufacturer":"BMW","model":"M3 G80","year":2021,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":510,"doors":4,"wiki":"BMW_M3"},{"manufacturer":"BMW","model":"M5 E28","year":1984,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":286,"doors":4,"wiki":"BMW_M5_(E28)"},{"manufacturer":"BMW","model":"M5 E34","year":1988,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":315,"doors":4,"wiki":"BMW_M5_(E34)"},{"manufacturer":"BMW","model":"M5 E39","year":1998,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":394,"doors":4,"wiki":"BMW_M5_(E39)"},{"manufacturer":"BMW","model":"M5 E60","year":2004,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":507,"doors":4,"wiki":"BMW_M5_(E60)"},{"manufacturer":"BMW","model":"M5 F10","year":2011,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":552,"doors":4,"wiki":"BMW_M5_(F10)"},{"manufacturer":"BMW","model":"M5 F90","year":2017,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":600,"doors":4,"wiki":"BMW_M5_(F90)"},{"manufacturer":"BMW","model":"M5 G90","year":2024,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Hybrid","hp":727,"doors":4,"wiki":"BMW_M5"},{"manufacturer":"BMW","model":"M4 G82","year":2021,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":510,"doors":2,"wiki":"BMW_M4"},{"manufacturer":"BMW","model":"M2 G87","year":2023,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":460,"doors":2,"wiki":"BMW_M2"},{"manufacturer":"BMW","model":"M8 G15","year":2019,"country":"Germany","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":600,"doors":2,"wiki":"BMW_M8"},{"manufacturer":"BMW","model":"Z3 M","year":1997,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":321,"doors":2,"wiki":"BMW_Z3_M"},{"manufacturer":"BMW","model":"Z4 G29","year":2019,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":382,"doors":2,"wiki":"BMW_Z4_(G29)"},{"manufacturer":"BMW","model":"i4 M50","year":2022,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Electric","hp":544,"doors":4,"wiki":"BMW_i4"},{"manufacturer":"BMW","model":"iX M60","year":2022,"country":"Germany","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":619,"doors":4,"wiki":"BMW_iX"},{"manufacturer":"BMW","model":"X5 M F85","year":2014,"country":"Germany","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":575,"doors":4,"wiki":"BMW_X5_M"},{"manufacturer":"BMW","model":"3 Series G20","year":2019,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":255,"doors":4,"wiki":"BMW_3_Series_(G20)"},{"manufacturer":"BMW","model":"7 Series G70","year":2022,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":536,"doors":4,"wiki":"BMW_7_Series_(G70)"},{"manufacturer":"BMW","model":"1 Series M","year":2011,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":340,"doors":2,"wiki":"BMW_1_Series_(E82)"},{"manufacturer":"Nissan","model":"Skyline GT-R C10","year":1969,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":160,"doors":2,"wiki":"Nissan_Skyline_GT-R"},{"manufacturer":"Nissan","model":"Skyline GT-R C110","year":1973,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":160,"doors":2,"wiki":"Nissan_Skyline_GT-R"},{"manufacturer":"Nissan","model":"Skyline GT-R R32","year":1989,"country":"Japan","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":280,"doors":2,"wiki":"Nissan_Skyline_GT-R_(R32)"},{"manufacturer":"Nissan","model":"Skyline GT-R R33","year":1995,"country":"Japan","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":280,"doors":2,"wiki":"Nissan_Skyline_GT-R_(R33)"},{"manufacturer":"Nissan","model":"Skyline GT-R R34","year":1999,"country":"Japan","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":280,"doors":2,"wiki":"Nissan_Skyline_GT-R_(R34)"},{"manufacturer":"Nissan","model":"GT-R R35","year":2007,"country":"Japan","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":480,"doors":2,"wiki":"Nissan_GT-R"},{"manufacturer":"Nissan","model":"GT-R NISMO","year":2022,"country":"Japan","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":600,"doors":2,"wiki":"Nissan_GT-R"},{"manufacturer":"Nissan","model":"240Z S30","year":1969,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":151,"doors":2,"wiki":"Nissan_S30"},{"manufacturer":"Nissan","model":"280ZX S130","year":1978,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":135,"doors":2,"wiki":"Nissan_S130"},{"manufacturer":"Nissan","model":"300ZX Z31","year":1983,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":160,"doors":2,"wiki":"Nissan_Z31"},{"manufacturer":"Nissan","model":"300ZX Z32","year":1989,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":222,"doors":2,"wiki":"Nissan_Z32"},{"manufacturer":"Nissan","model":"350Z Z33","year":2002,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":287,"doors":2,"wiki":"Nissan_350Z"},{"manufacturer":"Nissan","model":"370Z Z34","year":2008,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":332,"doors":2,"wiki":"Nissan_370Z"},{"manufacturer":"Nissan","model":"Z RZ34","year":2022,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":400,"doors":2,"wiki":"Nissan_Z_(RZ34)"},{"manufacturer":"Nissan","model":"Silvia S13","year":1988,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":175,"doors":2,"wiki":"Nissan_Silvia"},{"manufacturer":"Nissan","model":"Silvia S15","year":1999,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":250,"doors":2,"wiki":"Nissan_Silvia"},{"manufacturer":"Nissan","model":"Leaf 1st Gen","year":2010,"country":"Japan","body":"Hatchback","drivetrain":"FWD","engine":"Electric","hp":109,"doors":4,"wiki":"Nissan_Leaf"},{"manufacturer":"Nissan","model":"Leaf 2nd Gen","year":2017,"country":"Japan","body":"Hatchback","drivetrain":"FWD","engine":"Electric","hp":150,"doors":4,"wiki":"Nissan_Leaf"},{"manufacturer":"Nissan","model":"Ariya","year":2021,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":389,"doors":4,"wiki":"Nissan_Ariya"},{"manufacturer":"Nissan","model":"Navara D40","year":2004,"country":"Japan","body":"Pickup","drivetrain":"AWD","engine":"Diesel","hp":174,"doors":4,"wiki":"Nissan_Navara"},{"manufacturer":"Nissan","model":"Navara D23","year":2015,"country":"Japan","body":"Pickup","drivetrain":"AWD","engine":"Diesel","hp":190,"doors":4,"wiki":"Nissan_Navara"},{"manufacturer":"Nissan","model":"Juke 1st Gen","year":2010,"country":"Japan","body":"SUV","drivetrain":"FWD","engine":"Petrol","hp":117,"doors":4,"wiki":"Nissan_Juke"},{"manufacturer":"Nissan","model":"Juke 2nd Gen","year":2019,"country":"Japan","body":"SUV","drivetrain":"FWD","engine":"Petrol","hp":114,"doors":4,"wiki":"Nissan_Juke"},{"manufacturer":"Mazda","model":"RX-7 SA","year":1978,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":100,"doors":2,"wiki":"Mazda_RX-7"},{"manufacturer":"Mazda","model":"RX-7 FC","year":1985,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":185,"doors":2,"wiki":"Mazda_RX-7"},{"manufacturer":"Mazda","model":"RX-7 FD","year":1992,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":255,"doors":2,"wiki":"Mazda_RX-7"},{"manufacturer":"Mazda","model":"RX-8","year":2003,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":232,"doors":4,"wiki":"Mazda_RX-8"},{"manufacturer":"Mazda","model":"MX-5 NA","year":1989,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":116,"doors":2,"wiki":"Mazda_MX-5"},{"manufacturer":"Mazda","model":"MX-5 NB","year":1998,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":140,"doors":2,"wiki":"Mazda_MX-5"},{"manufacturer":"Mazda","model":"MX-5 NC","year":2005,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":158,"doors":2,"wiki":"Mazda_MX-5"},{"manufacturer":"Mazda","model":"MX-5 ND","year":2015,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":181,"doors":2,"wiki":"Mazda_MX-5"},{"manufacturer":"Mazda","model":"Mazda3 BP","year":2019,"country":"Japan","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":186,"doors":4,"wiki":"Mazda3_(BP)"},{"manufacturer":"Mazda","model":"CX-5 KF","year":2017,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":256,"doors":4,"wiki":"Mazda_CX-5"},{"manufacturer":"Mazda","model":"787B","year":1991,"country":"Japan","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":700,"doors":2,"wiki":"Mazda_787B"},{"manufacturer":"Honda","model":"Civic Type R EK9","year":1997,"country":"Japan","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":185,"doors":2,"wiki":"Honda_Civic_Type_R"},{"manufacturer":"Honda","model":"Civic Type R EP3","year":2001,"country":"Japan","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":197,"doors":4,"wiki":"Honda_Civic_Type_R"},{"manufacturer":"Honda","model":"Civic Type R FN2","year":2007,"country":"Japan","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":201,"doors":4,"wiki":"Honda_Civic_Type_R"},{"manufacturer":"Honda","model":"Civic Type R FK2","year":2015,"country":"Japan","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":306,"doors":4,"wiki":"Honda_Civic_Type_R"},{"manufacturer":"Honda","model":"Civic Type R FK8","year":2017,"country":"Japan","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":316,"doors":4,"wiki":"Honda_Civic_Type_R"},{"manufacturer":"Honda","model":"Civic Type R FL5","year":2022,"country":"Japan","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":315,"doors":4,"wiki":"Honda_Civic_Type_R"},{"manufacturer":"Honda","model":"NSX NA1","year":1990,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":274,"doors":2,"wiki":"Honda_NSX"},{"manufacturer":"Honda","model":"NSX NC1","year":2016,"country":"Japan","body":"Coupe","drivetrain":"AWD","engine":"Hybrid","hp":573,"doors":2,"wiki":"Honda_NSX_(NC1)"},{"manufacturer":"Honda","model":"CR-V 1st Gen","year":1995,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":126,"doors":4,"wiki":"Honda_CR-V"},{"manufacturer":"Honda","model":"CR-V 6th Gen","year":2022,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Hybrid","hp":204,"doors":4,"wiki":"Honda_CR-V"},{"manufacturer":"Honda","model":"Jazz 1st Gen","year":2001,"country":"Japan","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":83,"doors":4,"wiki":"Honda_Jazz"},{"manufacturer":"Honda","model":"Jazz 4th Gen","year":2020,"country":"Japan","body":"Hatchback","drivetrain":"FWD","engine":"Hybrid","hp":109,"doors":4,"wiki":"Honda_Jazz"},{"manufacturer":"Honda","model":"e","year":2020,"country":"Japan","body":"Hatchback","drivetrain":"RWD","engine":"Electric","hp":154,"doors":4,"wiki":"Honda_e"},{"manufacturer":"Honda","model":"Accord 10th Gen","year":2017,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Hybrid","hp":192,"doors":4,"wiki":"Honda_Accord_(tenth_generation)"},{"manufacturer":"Honda","model":"S2000","year":1999,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":237,"doors":2,"wiki":"Honda_S2000"},{"manufacturer":"Honda","model":"Integra Type R DC2","year":1995,"country":"Japan","body":"Coupe","drivetrain":"FWD","engine":"Petrol","hp":187,"doors":2,"wiki":"Honda_Integra_Type_R"},{"manufacturer":"Audi","model":"R8 V10","year":2006,"country":"Germany","body":"Supercar","drivetrain":"AWD","engine":"Petrol","hp":525,"doors":2,"wiki":"Audi_R8"},{"manufacturer":"Audi","model":"R8 Gen2","year":2015,"country":"Germany","body":"Supercar","drivetrain":"AWD","engine":"Petrol","hp":540,"doors":2,"wiki":"Audi_R8"},{"manufacturer":"Audi","model":"RS2","year":1994,"country":"Germany","body":"Wagon","drivetrain":"AWD","engine":"Petrol","hp":315,"doors":4,"wiki":"Audi_RS_2"},{"manufacturer":"Audi","model":"RS4 B5","year":1999,"country":"Germany","body":"Wagon","drivetrain":"AWD","engine":"Petrol","hp":380,"doors":4,"wiki":"Audi_RS_4"},{"manufacturer":"Audi","model":"RS4 B7","year":2005,"country":"Germany","body":"Wagon","drivetrain":"AWD","engine":"Petrol","hp":420,"doors":4,"wiki":"Audi_RS_4"},{"manufacturer":"Audi","model":"RS4 B9","year":2017,"country":"Germany","body":"Wagon","drivetrain":"AWD","engine":"Petrol","hp":450,"doors":4,"wiki":"Audi_RS_4"},{"manufacturer":"Audi","model":"RS6 C6","year":2008,"country":"Germany","body":"Wagon","drivetrain":"AWD","engine":"Petrol","hp":580,"doors":4,"wiki":"Audi_RS_6"},{"manufacturer":"Audi","model":"RS6 C8","year":2019,"country":"Germany","body":"Wagon","drivetrain":"AWD","engine":"Petrol","hp":591,"doors":4,"wiki":"Audi_RS_6"},{"manufacturer":"Audi","model":"RS3 8V","year":2015,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":367,"doors":4,"wiki":"Audi_RS_3"},{"manufacturer":"Audi","model":"RS3 8Y","year":2021,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":400,"doors":4,"wiki":"Audi_RS_3"},{"manufacturer":"Audi","model":"TT Mk1","year":1998,"country":"Germany","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":180,"doors":2,"wiki":"Audi_TT"},{"manufacturer":"Audi","model":"TT RS Mk3","year":2016,"country":"Germany","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":400,"doors":2,"wiki":"Audi_TT_RS"},{"manufacturer":"Audi","model":"A4 B9","year":2015,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":190,"doors":4,"wiki":"Audi_A4_(B9)"},{"manufacturer":"Audi","model":"Q7 Mk2","year":2015,"country":"Germany","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":333,"doors":4,"wiki":"Audi_Q7"},{"manufacturer":"Audi","model":"RS Q8","year":2019,"country":"Germany","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":591,"doors":4,"wiki":"Audi_RS_Q8"},{"manufacturer":"Audi","model":"e-tron GT","year":2021,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Electric","hp":522,"doors":4,"wiki":"Audi_e-tron_GT"},{"manufacturer":"Audi","model":"RS e-tron GT","year":2021,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Electric","hp":646,"doors":4,"wiki":"Audi_e-tron_GT"},{"manufacturer":"Mercedes","model":"190E 2.5-16","year":1990,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":204,"doors":4,"wiki":"Mercedes-Benz_190"},{"manufacturer":"Mercedes","model":"C36 AMG","year":1993,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":276,"doors":4,"wiki":"Mercedes-AMG_C_36"},{"manufacturer":"Mercedes","model":"C55 AMG","year":2004,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":367,"doors":4,"wiki":"Mercedes-AMG"},{"manufacturer":"Mercedes","model":"C63 AMG W204","year":2007,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":457,"doors":4,"wiki":"Mercedes-AMG_C_63"},{"manufacturer":"Mercedes","model":"C63 AMG W205","year":2014,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":476,"doors":4,"wiki":"Mercedes-AMG_C_63"},{"manufacturer":"Mercedes","model":"C63 AMG W206","year":2022,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Hybrid","hp":671,"doors":4,"wiki":"Mercedes-AMG_C_63"},{"manufacturer":"Mercedes","model":"E63 AMG W212","year":2009,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":525,"doors":4,"wiki":"Mercedes-AMG_E_63"},{"manufacturer":"Mercedes","model":"E63 AMG W213","year":2016,"country":"Germany","body":"Wagon","drivetrain":"AWD","engine":"Petrol","hp":612,"doors":4,"wiki":"Mercedes-AMG_E_63"},{"manufacturer":"Mercedes","model":"AMG GT R","year":2017,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":577,"doors":2,"wiki":"Mercedes-AMG_GT"},{"manufacturer":"Mercedes","model":"AMG ONE","year":2022,"country":"Germany","body":"Supercar","drivetrain":"AWD","engine":"Hybrid","hp":1063,"doors":2,"wiki":"Mercedes-AMG_ONE"},{"manufacturer":"Mercedes","model":"SLS AMG","year":2010,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":563,"doors":2,"wiki":"Mercedes-Benz_SLS_AMG"},{"manufacturer":"Mercedes","model":"G63 AMG W463","year":2012,"country":"Germany","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":544,"doors":4,"wiki":"Mercedes-AMG_G_63"},{"manufacturer":"Mercedes","model":"G63 AMG W464","year":2018,"country":"Germany","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":577,"doors":4,"wiki":"Mercedes-AMG_G_63"},{"manufacturer":"Mercedes","model":"A45 AMG W176","year":2013,"country":"Germany","body":"Hatchback","drivetrain":"AWD","engine":"Petrol","hp":360,"doors":4,"wiki":"Mercedes-AMG_A_45"},{"manufacturer":"Mercedes","model":"A45 S AMG W177","year":2019,"country":"Germany","body":"Hatchback","drivetrain":"AWD","engine":"Petrol","hp":421,"doors":4,"wiki":"Mercedes-AMG_A_45"},{"manufacturer":"Mercedes","model":"S-Class W223","year":2021,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":429,"doors":4,"wiki":"Mercedes-Benz_S-Class_(W223)"},{"manufacturer":"Mercedes","model":"EQS 580","year":2021,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Electric","hp":516,"doors":4,"wiki":"Mercedes-Benz_EQS"},{"manufacturer":"Mercedes","model":"GLE 63 AMG","year":2020,"country":"Germany","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":612,"doors":4,"wiki":"Mercedes-AMG_GLE_63"},{"manufacturer":"Porsche","model":"911 901","year":1963,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":130,"doors":2,"wiki":"Porsche_901"},{"manufacturer":"Porsche","model":"911 930 Turbo","year":1975,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":260,"doors":2,"wiki":"Porsche_930"},{"manufacturer":"Porsche","model":"911 964 RS","year":1991,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":260,"doors":2,"wiki":"Porsche_964"},{"manufacturer":"Porsche","model":"911 993","year":1993,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":272,"doors":2,"wiki":"Porsche_993"},{"manufacturer":"Porsche","model":"911 996 GT3","year":1999,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":381,"doors":2,"wiki":"Porsche_996"},{"manufacturer":"Porsche","model":"911 997 GT3 RS","year":2006,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":415,"doors":2,"wiki":"Porsche_997"},{"manufacturer":"Porsche","model":"911 991 GT3 RS","year":2015,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":500,"doors":2,"wiki":"Porsche_991"},{"manufacturer":"Porsche","model":"911 992 GT3","year":2021,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":510,"doors":2,"wiki":"Porsche_911_GT3"},{"manufacturer":"Porsche","model":"911 Turbo S 992","year":2021,"country":"Germany","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":650,"doors":2,"wiki":"Porsche_911_Turbo"},{"manufacturer":"Porsche","model":"959","year":1986,"country":"Germany","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":444,"doors":2,"wiki":"Porsche_959"},{"manufacturer":"Porsche","model":"Carrera GT","year":2004,"country":"Germany","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":612,"doors":2,"wiki":"Porsche_Carrera_GT"},{"manufacturer":"Porsche","model":"Taycan Turbo S","year":2019,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Electric","hp":761,"doors":4,"wiki":"Porsche_Taycan"},{"manufacturer":"Porsche","model":"Cayenne Turbo GT","year":2021,"country":"Germany","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":631,"doors":4,"wiki":"Porsche_Cayenne"},{"manufacturer":"Porsche","model":"Panamera Turbo S","year":2020,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":630,"doors":4,"wiki":"Porsche_Panamera"},{"manufacturer":"Porsche","model":"718 Cayman GT4","year":2019,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":420,"doors":2,"wiki":"Porsche_718"},{"manufacturer":"Porsche","model":"Macan EV","year":2024,"country":"Germany","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":639,"doors":4,"wiki":"Porsche_Macan"},{"manufacturer":"Ferrari","model":"250 GTO","year":1962,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":300,"doors":2,"wiki":"Ferrari_250_GTO"},{"manufacturer":"Ferrari","model":"F40","year":1987,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":478,"doors":2,"wiki":"Ferrari_F40"},{"manufacturer":"Ferrari","model":"F50","year":1995,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":513,"doors":2,"wiki":"Ferrari_F50"},{"manufacturer":"Ferrari","model":"Enzo","year":2002,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":660,"doors":2,"wiki":"Ferrari_Enzo"},{"manufacturer":"Ferrari","model":"LaFerrari","year":2013,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Hybrid","hp":950,"doors":2,"wiki":"LaFerrari"},{"manufacturer":"Ferrari","model":"Testarossa","year":1984,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":390,"doors":2,"wiki":"Ferrari_Testarossa"},{"manufacturer":"Ferrari","model":"348","year":1989,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":300,"doors":2,"wiki":"Ferrari_348"},{"manufacturer":"Ferrari","model":"360 Modena","year":1999,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":395,"doors":2,"wiki":"Ferrari_360_Modena"},{"manufacturer":"Ferrari","model":"430 Scuderia","year":2007,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":503,"doors":2,"wiki":"Ferrari_430_Scuderia"},{"manufacturer":"Ferrari","model":"458 Italia","year":2009,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":562,"doors":2,"wiki":"Ferrari_458_Italia"},{"manufacturer":"Ferrari","model":"488 GTB","year":2015,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":661,"doors":2,"wiki":"Ferrari_488"},{"manufacturer":"Ferrari","model":"F8 Tributo","year":2019,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":710,"doors":2,"wiki":"Ferrari_F8_Tributo"},{"manufacturer":"Ferrari","model":"SF90 Stradale","year":2019,"country":"Italy","body":"Supercar","drivetrain":"AWD","engine":"Hybrid","hp":986,"doors":2,"wiki":"Ferrari_SF90_Stradale"},{"manufacturer":"Ferrari","model":"296 GTB","year":2021,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Hybrid","hp":830,"doors":2,"wiki":"Ferrari_296_GTB"},{"manufacturer":"Ferrari","model":"812 Superfast","year":2017,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":789,"doors":2,"wiki":"Ferrari_812_Superfast"},{"manufacturer":"Ferrari","model":"Roma","year":2019,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":612,"doors":2,"wiki":"Ferrari_Roma"},{"manufacturer":"Ferrari","model":"Purosangue","year":2022,"country":"Italy","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":725,"doors":4,"wiki":"Ferrari_Purosangue"},{"manufacturer":"Lamborghini","model":"Miura","year":1966,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":350,"doors":2,"wiki":"Lamborghini_Miura"},{"manufacturer":"Lamborghini","model":"Countach LP400","year":1974,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":375,"doors":2,"wiki":"Lamborghini_Countach"},{"manufacturer":"Lamborghini","model":"Countach LP5000","year":1982,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":455,"doors":2,"wiki":"Lamborghini_Countach"},{"manufacturer":"Lamborghini","model":"Diablo","year":1990,"country":"Italy","body":"Supercar","drivetrain":"AWD","engine":"Petrol","hp":485,"doors":2,"wiki":"Lamborghini_Diablo"},{"manufacturer":"Lamborghini","model":"Murcielago","year":2001,"country":"Italy","body":"Supercar","drivetrain":"AWD","engine":"Petrol","hp":580,"doors":2,"wiki":"Lamborghini_Murci\u00e9lago"},{"manufacturer":"Lamborghini","model":"Aventador LP700","year":2011,"country":"Italy","body":"Supercar","drivetrain":"AWD","engine":"Petrol","hp":700,"doors":2,"wiki":"Lamborghini_Aventador"},{"manufacturer":"Lamborghini","model":"Aventador SVJ","year":2018,"country":"Italy","body":"Supercar","drivetrain":"AWD","engine":"Petrol","hp":770,"doors":2,"wiki":"Lamborghini_Aventador"},{"manufacturer":"Lamborghini","model":"Revuelto","year":2023,"country":"Italy","body":"Supercar","drivetrain":"AWD","engine":"Hybrid","hp":1001,"doors":2,"wiki":"Lamborghini_Revuelto"},{"manufacturer":"Lamborghini","model":"Gallardo","year":2003,"country":"Italy","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":500,"doors":2,"wiki":"Lamborghini_Gallardo"},{"manufacturer":"Lamborghini","model":"Huracan LP610","year":2014,"country":"Italy","body":"Supercar","drivetrain":"AWD","engine":"Petrol","hp":610,"doors":2,"wiki":"Lamborghini_Huracan"},{"manufacturer":"Lamborghini","model":"Huracan STO","year":2021,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":631,"doors":2,"wiki":"Lamborghini_Huracan"},{"manufacturer":"Lamborghini","model":"Urus","year":2018,"country":"Italy","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":650,"doors":4,"wiki":"Lamborghini_Urus"},{"manufacturer":"Ford","model":"Mustang 1st Gen","year":1964,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":164,"doors":2,"wiki":"Ford_Mustang_(first_generation)"},{"manufacturer":"Ford","model":"Mustang Mach 1","year":1969,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":335,"doors":2,"wiki":"Ford_Mustang_Mach_1"},{"manufacturer":"Ford","model":"Mustang Boss 302","year":1970,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":290,"doors":2,"wiki":"Ford_Mustang_Boss_302"},{"manufacturer":"Ford","model":"Mustang Fox Body","year":1979,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":157,"doors":2,"wiki":"Ford_Mustang_(third_generation)"},{"manufacturer":"Ford","model":"Mustang Cobra R","year":1995,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":300,"doors":2,"wiki":"Ford_Mustang_SVT_Cobra_R"},{"manufacturer":"Ford","model":"Mustang GT500 S197","year":2007,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":500,"doors":2,"wiki":"Ford_Mustang_Shelby_GT500_(fifth_generation)"},{"manufacturer":"Ford","model":"Mustang GT S550","year":2015,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":435,"doors":2,"wiki":"Ford_Mustang_(sixth_generation)"},{"manufacturer":"Ford","model":"Mustang GT500 S550","year":2019,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":760,"doors":2,"wiki":"Ford_Shelby_GT500_(S550)"},{"manufacturer":"Ford","model":"Mustang S650","year":2024,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":500,"doors":2,"wiki":"Ford_Mustang_(seventh_generation)"},{"manufacturer":"Ford","model":"GT40","year":1964,"country":"USA","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":335,"doors":2,"wiki":"Ford_GT40"},{"manufacturer":"Ford","model":"GT 2005","year":2005,"country":"USA","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":550,"doors":2,"wiki":"Ford_GT_(2005)"},{"manufacturer":"Ford","model":"GT 2016","year":2016,"country":"USA","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":647,"doors":2,"wiki":"Ford_GT_(2016)"},{"manufacturer":"Ford","model":"Focus RS Mk3","year":2016,"country":"USA","body":"Hatchback","drivetrain":"AWD","engine":"Petrol","hp":350,"doors":4,"wiki":"Ford_Focus_RS"},{"manufacturer":"Ford","model":"F-150 Raptor R","year":2022,"country":"USA","body":"Pickup","drivetrain":"AWD","engine":"Petrol","hp":700,"doors":4,"wiki":"Ford_F-150_Raptor"},{"manufacturer":"Ford","model":"Bronco 6th Gen","year":2021,"country":"USA","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":330,"doors":4,"wiki":"Ford_Bronco_(sixth_generation)"},{"manufacturer":"Ford","model":"Mustang Mach-E","year":2020,"country":"USA","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":480,"doors":4,"wiki":"Ford_Mustang_Mach-E"},{"manufacturer":"Ford","model":"Explorer 2020","year":2020,"country":"USA","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":300,"doors":4,"wiki":"Ford_Explorer_(sixth_generation)"},{"manufacturer":"Ford","model":"Sierra Cosworth","year":1986,"country":"USA","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":204,"doors":4,"wiki":"Ford_Sierra_RS_Cosworth"},{"manufacturer":"Volkswagen","model":"Golf GTI Mk1","year":1976,"country":"Germany","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":110,"doors":4,"wiki":"Volkswagen_Golf_Mk1"},{"manufacturer":"Volkswagen","model":"Golf GTI Mk2","year":1983,"country":"Germany","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":112,"doors":4,"wiki":"Volkswagen_Golf_Mk2"},{"manufacturer":"Volkswagen","model":"Golf GTI Mk3","year":1991,"country":"Germany","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":150,"doors":4,"wiki":"Volkswagen_Golf_Mk3"},{"manufacturer":"Volkswagen","model":"Golf GTI Mk4","year":1997,"country":"Germany","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":150,"doors":4,"wiki":"Volkswagen_Golf_Mk4"},{"manufacturer":"Volkswagen","model":"Golf GTI Mk5","year":2003,"country":"Germany","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":200,"doors":4,"wiki":"Volkswagen_Golf_Mk5"},{"manufacturer":"Volkswagen","model":"Golf GTI Mk6","year":2008,"country":"Germany","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":210,"doors":4,"wiki":"Volkswagen_Golf_Mk6"},{"manufacturer":"Volkswagen","model":"Golf GTI Mk7","year":2012,"country":"Germany","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":220,"doors":4,"wiki":"Volkswagen_Golf_Mk7"},{"manufacturer":"Volkswagen","model":"Golf GTI Mk8","year":2020,"country":"Germany","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":245,"doors":4,"wiki":"Volkswagen_Golf_Mk8"},{"manufacturer":"Volkswagen","model":"Golf R Mk7","year":2013,"country":"Germany","body":"Hatchback","drivetrain":"AWD","engine":"Petrol","hp":300,"doors":4,"wiki":"Volkswagen_Golf_R"},{"manufacturer":"Volkswagen","model":"Golf R Mk8","year":2021,"country":"Germany","body":"Hatchback","drivetrain":"AWD","engine":"Petrol","hp":320,"doors":4,"wiki":"Volkswagen_Golf_R"},{"manufacturer":"Volkswagen","model":"Polo GTI","year":2021,"country":"Germany","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":207,"doors":4,"wiki":"Volkswagen_Polo_Mk6"},{"manufacturer":"Volkswagen","model":"ID.4 GTX","year":2021,"country":"Germany","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":299,"doors":4,"wiki":"Volkswagen_ID.4"},{"manufacturer":"Volkswagen","model":"ID.3","year":2019,"country":"Germany","body":"Hatchback","drivetrain":"RWD","engine":"Electric","hp":204,"doors":4,"wiki":"Volkswagen_ID.3"},{"manufacturer":"Volkswagen","model":"Arteon R","year":2021,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":320,"doors":4,"wiki":"Volkswagen_Arteon"},{"manufacturer":"Volkswagen","model":"Phaeton","year":2002,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":335,"doors":4,"wiki":"Volkswagen_Phaeton"},{"manufacturer":"Tesla","model":"Roadster 1st Gen","year":2008,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Electric","hp":248,"doors":2,"wiki":"Tesla_Roadster_(first_generation)"},{"manufacturer":"Tesla","model":"Model S P100D","year":2016,"country":"USA","body":"Sedan","drivetrain":"AWD","engine":"Electric","hp":762,"doors":4,"wiki":"Tesla_Model_S"},{"manufacturer":"Tesla","model":"Model S Plaid","year":2021,"country":"USA","body":"Sedan","drivetrain":"AWD","engine":"Electric","hp":1020,"doors":4,"wiki":"Tesla_Model_S"},{"manufacturer":"Tesla","model":"Model 3 LR","year":2017,"country":"USA","body":"Sedan","drivetrain":"AWD","engine":"Electric","hp":358,"doors":4,"wiki":"Tesla_Model_3"},{"manufacturer":"Tesla","model":"Model X Plaid","year":2021,"country":"USA","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":1020,"doors":4,"wiki":"Tesla_Model_X"},{"manufacturer":"Tesla","model":"Model Y LR","year":2020,"country":"USA","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":384,"doors":4,"wiki":"Tesla_Model_Y"},{"manufacturer":"Tesla","model":"Cybertruck","year":2023,"country":"USA","body":"Pickup","drivetrain":"AWD","engine":"Electric","hp":845,"doors":4,"wiki":"Tesla_Cybertruck"},{"manufacturer":"Tesla","model":"Roadster 2nd Gen","year":2025,"country":"USA","body":"Coupe","drivetrain":"AWD","engine":"Electric","hp":1000,"doors":2,"wiki":"Tesla_Roadster_(second_generation)"},{"manufacturer":"Hyundai","model":"i30 N Mk3","year":2017,"country":"South Korea","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":250,"doors":4,"wiki":"Hyundai_i30_N"},{"manufacturer":"Hyundai","model":"i30 N Mk4","year":2021,"country":"South Korea","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":280,"doors":4,"wiki":"Hyundai_i30_N"},{"manufacturer":"Hyundai","model":"Ioniq 5 N","year":2023,"country":"South Korea","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":641,"doors":4,"wiki":"Hyundai_Ioniq_5_N"},{"manufacturer":"Hyundai","model":"Ioniq 5","year":2021,"country":"South Korea","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":320,"doors":4,"wiki":"Hyundai_Ioniq_5"},{"manufacturer":"Hyundai","model":"Ioniq 6","year":2022,"country":"South Korea","body":"Sedan","drivetrain":"AWD","engine":"Electric","hp":320,"doors":4,"wiki":"Hyundai_Ioniq_6"},{"manufacturer":"Hyundai","model":"Elantra N","year":2021,"country":"South Korea","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":276,"doors":4,"wiki":"Hyundai_Elantra_N"},{"manufacturer":"Hyundai","model":"Tucson NX4","year":2020,"country":"South Korea","body":"SUV","drivetrain":"AWD","engine":"Hybrid","hp":226,"doors":4,"wiki":"Hyundai_Tucson_(NX4)"},{"manufacturer":"Kia","model":"Stinger GT","year":2017,"country":"South Korea","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":365,"doors":4,"wiki":"Kia_Stinger"},{"manufacturer":"Kia","model":"EV6 GT","year":2022,"country":"South Korea","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":577,"doors":4,"wiki":"Kia_EV6"},{"manufacturer":"Kia","model":"EV9","year":2023,"country":"South Korea","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":379,"doors":4,"wiki":"Kia_EV9"},{"manufacturer":"Kia","model":"Sportage NQ5","year":2021,"country":"South Korea","body":"SUV","drivetrain":"AWD","engine":"Hybrid","hp":230,"doors":4,"wiki":"Kia_Sportage_(NQ5)"},{"manufacturer":"Kia","model":"ProCeed","year":2019,"country":"South Korea","body":"Wagon","drivetrain":"FWD","engine":"Petrol","hp":204,"doors":4,"wiki":"Kia_ProCeed"},{"manufacturer":"Genesis","model":"GV80","year":2020,"country":"South Korea","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":375,"doors":4,"wiki":"Genesis_GV80"},{"manufacturer":"Genesis","model":"G80 EV","year":2021,"country":"South Korea","body":"Sedan","drivetrain":"AWD","engine":"Electric","hp":365,"doors":4,"wiki":"Genesis_G80"},{"manufacturer":"Subaru","model":"Impreza WRX STI GC","year":1994,"country":"Japan","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":241,"doors":4,"wiki":"Subaru_Impreza_WRX_STI"},{"manufacturer":"Subaru","model":"Impreza WRX STI GD","year":2000,"country":"Japan","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":300,"doors":4,"wiki":"Subaru_Impreza_WRX_STI"},{"manufacturer":"Subaru","model":"Impreza WRX STI GR","year":2007,"country":"Japan","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":300,"doors":4,"wiki":"Subaru_Impreza_WRX_STI"},{"manufacturer":"Subaru","model":"WRX STI VA","year":2014,"country":"Japan","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":305,"doors":4,"wiki":"Subaru_WRX_STI"},{"manufacturer":"Subaru","model":"BRZ 1st Gen","year":2012,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":200,"doors":2,"wiki":"Subaru_BRZ"},{"manufacturer":"Subaru","model":"BRZ 2nd Gen","year":2022,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":228,"doors":2,"wiki":"Subaru_BRZ"},{"manufacturer":"Subaru","model":"Forester 1st Gen","year":1997,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":125,"doors":4,"wiki":"Subaru_Forester"},{"manufacturer":"Subaru","model":"Forester 5th Gen","year":2018,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":182,"doors":4,"wiki":"Subaru_Forester"},{"manufacturer":"Subaru","model":"Outback 6th Gen","year":2019,"country":"Japan","body":"Wagon","drivetrain":"AWD","engine":"Petrol","hp":182,"doors":4,"wiki":"Subaru_Outback"},{"manufacturer":"Mitsubishi","model":"Lancer Evo I","year":1992,"country":"Japan","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":247,"doors":4,"wiki":"Mitsubishi_Lancer_Evolution"},{"manufacturer":"Mitsubishi","model":"Lancer Evo III","year":1995,"country":"Japan","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":270,"doors":4,"wiki":"Mitsubishi_Lancer_Evolution"},{"manufacturer":"Mitsubishi","model":"Lancer Evo VI","year":1999,"country":"Japan","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":280,"doors":4,"wiki":"Mitsubishi_Lancer_Evolution"},{"manufacturer":"Mitsubishi","model":"Lancer Evo IX","year":2005,"country":"Japan","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":280,"doors":4,"wiki":"Mitsubishi_Lancer_Evolution"},{"manufacturer":"Mitsubishi","model":"Lancer Evo X","year":2007,"country":"Japan","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":295,"doors":4,"wiki":"Mitsubishi_Lancer_Evolution_X"},{"manufacturer":"Mitsubishi","model":"Eclipse Cross","year":2021,"country":"Japan","body":"SUV","drivetrain":"AWD","engine":"Hybrid","hp":188,"doors":4,"wiki":"Mitsubishi_Eclipse_Cross"},{"manufacturer":"McLaren","model":"F1","year":1992,"country":"UK","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":627,"doors":2,"wiki":"McLaren_F1"},{"manufacturer":"McLaren","model":"MP4-12C","year":2011,"country":"UK","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":616,"doors":2,"wiki":"McLaren_MP4-12C"},{"manufacturer":"McLaren","model":"650S","year":2014,"country":"UK","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":641,"doors":2,"wiki":"McLaren_650S"},{"manufacturer":"McLaren","model":"720S","year":2017,"country":"UK","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":710,"doors":2,"wiki":"McLaren_720S"},{"manufacturer":"McLaren","model":"765LT","year":2020,"country":"UK","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":765,"doors":2,"wiki":"McLaren_765LT"},{"manufacturer":"McLaren","model":"Artura","year":2021,"country":"UK","body":"Supercar","drivetrain":"RWD","engine":"Hybrid","hp":671,"doors":2,"wiki":"McLaren_Artura"},{"manufacturer":"Aston Martin","model":"DB5","year":1963,"country":"UK","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":282,"doors":2,"wiki":"Aston_Martin_DB5"},{"manufacturer":"Aston Martin","model":"Vantage 2018","year":2018,"country":"UK","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":503,"doors":2,"wiki":"Aston_Martin_Vantage_(2018)"},{"manufacturer":"Aston Martin","model":"DB11","year":2016,"country":"UK","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":503,"doors":2,"wiki":"Aston_Martin_DB11"},{"manufacturer":"Aston Martin","model":"Valkyrie","year":2021,"country":"UK","body":"Supercar","drivetrain":"RWD","engine":"Hybrid","hp":1160,"doors":2,"wiki":"Aston_Martin_Valkyrie"},{"manufacturer":"Aston Martin","model":"DBX707","year":2022,"country":"UK","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":707,"doors":4,"wiki":"Aston_Martin_DBX"},{"manufacturer":"Jaguar","model":"E-Type","year":1961,"country":"UK","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":265,"doors":2,"wiki":"Jaguar_E-Type"},{"manufacturer":"Jaguar","model":"F-Type R","year":2013,"country":"UK","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":550,"doors":2,"wiki":"Jaguar_F-Type"},{"manufacturer":"Land Rover","model":"Defender 110 Mk1","year":1983,"country":"UK","body":"SUV","drivetrain":"AWD","engine":"Diesel","hp":122,"doors":4,"wiki":"Land_Rover_Defender"},{"manufacturer":"Land Rover","model":"Defender L663","year":2020,"country":"UK","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":395,"doors":4,"wiki":"Land_Rover_Defender_(L663)"},{"manufacturer":"Land Rover","model":"Range Rover L405","year":2012,"country":"UK","body":"SUV","drivetrain":"AWD","engine":"Diesel","hp":339,"doors":4,"wiki":"Range_Rover_(L405)"},{"manufacturer":"Land Rover","model":"Range Rover L460","year":2021,"country":"UK","body":"SUV","drivetrain":"AWD","engine":"Hybrid","hp":510,"doors":4,"wiki":"Range_Rover_(L460)"},{"manufacturer":"Lotus","model":"Elise","year":1996,"country":"UK","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":118,"doors":2,"wiki":"Lotus_Elise"},{"manufacturer":"Lotus","model":"Evora","year":2008,"country":"UK","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":276,"doors":2,"wiki":"Lotus_Evora"},{"manufacturer":"Lotus","model":"Emira","year":2021,"country":"UK","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":400,"doors":2,"wiki":"Lotus_Emira"},{"manufacturer":"Lotus","model":"Evija","year":2023,"country":"UK","body":"Supercar","drivetrain":"AWD","engine":"Electric","hp":2000,"doors":2,"wiki":"Lotus_Evija"},{"manufacturer":"Rolls-Royce","model":"Silver Shadow","year":1965,"country":"UK","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":172,"doors":4,"wiki":"Rolls-Royce_Silver_Shadow"},{"manufacturer":"Rolls-Royce","model":"Ghost","year":2020,"country":"UK","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":563,"doors":4,"wiki":"Rolls-Royce_Ghost_(RR12)"},{"manufacturer":"Rolls-Royce","model":"Cullinan","year":2018,"country":"UK","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":563,"doors":4,"wiki":"Rolls-Royce_Cullinan"},{"manufacturer":"Bentley","model":"Continental GT Mk3","year":2018,"country":"UK","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":626,"doors":2,"wiki":"Bentley_Continental_GT_(third_generation)"},{"manufacturer":"Bentley","model":"Bentayga","year":2015,"country":"UK","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":542,"doors":4,"wiki":"Bentley_Bentayga"},{"manufacturer":"MINI","model":"Cooper S R53","year":2001,"country":"UK","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":163,"doors":2,"wiki":"Mini_hatch_(R50)"},{"manufacturer":"MINI","model":"Cooper S F56","year":2014,"country":"UK","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":192,"doors":2,"wiki":"Mini_hatch_(F56)"},{"manufacturer":"MINI","model":"Countryman JCW","year":2022,"country":"UK","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":306,"doors":4,"wiki":"Mini_Countryman_(F60)"},{"manufacturer":"Bugatti","model":"EB110","year":1991,"country":"France","body":"Supercar","drivetrain":"AWD","engine":"Petrol","hp":553,"doors":2,"wiki":"Bugatti_EB110"},{"manufacturer":"Bugatti","model":"Veyron","year":2005,"country":"France","body":"Supercar","drivetrain":"AWD","engine":"Petrol","hp":1001,"doors":2,"wiki":"Bugatti_Veyron"},{"manufacturer":"Bugatti","model":"Chiron","year":2016,"country":"France","body":"Supercar","drivetrain":"AWD","engine":"Petrol","hp":1500,"doors":2,"wiki":"Bugatti_Chiron"},{"manufacturer":"Bugatti","model":"Tourbillon","year":2024,"country":"France","body":"Supercar","drivetrain":"AWD","engine":"Hybrid","hp":1800,"doors":2,"wiki":"Bugatti_Tourbillon"},{"manufacturer":"Alpine","model":"A110 2017","year":2017,"country":"France","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":252,"doors":2,"wiki":"Alpine_A110_(2017)"},{"manufacturer":"Alpine","model":"A110 R","year":2022,"country":"France","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":300,"doors":2,"wiki":"Alpine_A110_(2017)"},{"manufacturer":"Renault","model":"Megane RS 265","year":2010,"country":"France","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":265,"doors":4,"wiki":"Renault_Megane_RS"},{"manufacturer":"Renault","model":"Megane RS 300","year":2017,"country":"France","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":300,"doors":4,"wiki":"Renault_Megane_RS"},{"manufacturer":"Peugeot","model":"205 GTI","year":1984,"country":"France","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":130,"doors":4,"wiki":"Peugeot_205_GTI"},{"manufacturer":"Peugeot","model":"306 GTI-6","year":1996,"country":"France","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":167,"doors":4,"wiki":"Peugeot_306"},{"manufacturer":"Peugeot","model":"508 PSE","year":2020,"country":"France","body":"Wagon","drivetrain":"AWD","engine":"Hybrid","hp":360,"doors":4,"wiki":"Peugeot_508"},{"manufacturer":"Cupra","model":"Formentor VZ5","year":2021,"country":"Spain","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":390,"doors":4,"wiki":"Cupra_Formentor"},{"manufacturer":"Skoda","model":"Octavia RS vRS","year":2021,"country":"Czech Republic","body":"Wagon","drivetrain":"AWD","engine":"Petrol","hp":245,"doors":4,"wiki":"Skoda_Octavia"},{"manufacturer":"Skoda","model":"Enyaq RS","year":2022,"country":"Czech Republic","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":299,"doors":4,"wiki":"Skoda_Enyaq"},{"manufacturer":"Alfa Romeo","model":"Giulia Sprint GTA","year":1965,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":115,"doors":2,"wiki":"Alfa_Romeo_Giulia_Sprint_GTA"},{"manufacturer":"Alfa Romeo","model":"147 GTA","year":2002,"country":"Italy","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":250,"doors":4,"wiki":"Alfa_Romeo_147_GTA"},{"manufacturer":"Alfa Romeo","model":"Giulia QV","year":2016,"country":"Italy","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":510,"doors":4,"wiki":"Alfa_Romeo_Giulia_(952)"},{"manufacturer":"Alfa Romeo","model":"Stelvio QV","year":2017,"country":"Italy","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":510,"doors":4,"wiki":"Alfa_Romeo_Stelvio"},{"manufacturer":"Maserati","model":"MC12","year":2004,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":621,"doors":2,"wiki":"Maserati_MC12"},{"manufacturer":"Maserati","model":"GranTurismo Mk1","year":2007,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":400,"doors":2,"wiki":"Maserati_GranTurismo"},{"manufacturer":"Maserati","model":"MC20","year":2020,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":621,"doors":2,"wiki":"Maserati_MC20"},{"manufacturer":"Pagani","model":"Zonda F","year":2005,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":602,"doors":2,"wiki":"Pagani_Zonda"},{"manufacturer":"Pagani","model":"Huayra","year":2011,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":730,"doors":2,"wiki":"Pagani_Huayra"},{"manufacturer":"Pagani","model":"Utopia","year":2022,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":864,"doors":2,"wiki":"Pagani_Utopia"},{"manufacturer":"Fiat","model":"500 Abarth","year":2008,"country":"Italy","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":135,"doors":2,"wiki":"Abarth_500"},{"manufacturer":"Fiat","model":"500e","year":2020,"country":"Italy","body":"Hatchback","drivetrain":"FWD","engine":"Electric","hp":118,"doors":2,"wiki":"Fiat_500_(2020)"},{"manufacturer":"Koenigsegg","model":"CC8S","year":2002,"country":"Sweden","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":655,"doors":2,"wiki":"Koenigsegg_CC8S"},{"manufacturer":"Koenigsegg","model":"Agera RS","year":2015,"country":"Sweden","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":1160,"doors":2,"wiki":"Koenigsegg_Agera"},{"manufacturer":"Koenigsegg","model":"Jesko Absolut","year":2020,"country":"Sweden","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":1600,"doors":2,"wiki":"Koenigsegg_Jesko"},{"manufacturer":"Koenigsegg","model":"Gemera","year":2020,"country":"Sweden","body":"Coupe","drivetrain":"AWD","engine":"Hybrid","hp":1700,"doors":4,"wiki":"Koenigsegg_Gemera"},{"manufacturer":"Volvo","model":"240","year":1974,"country":"Sweden","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":97,"doors":4,"wiki":"Volvo_240"},{"manufacturer":"Volvo","model":"850 T5-R","year":1994,"country":"Sweden","body":"Wagon","drivetrain":"FWD","engine":"Petrol","hp":240,"doors":4,"wiki":"Volvo_850"},{"manufacturer":"Volvo","model":"V90 T8","year":2016,"country":"Sweden","body":"Wagon","drivetrain":"AWD","engine":"Hybrid","hp":407,"doors":4,"wiki":"Volvo_V90"},{"manufacturer":"Volvo","model":"XC90 T8","year":2022,"country":"Sweden","body":"SUV","drivetrain":"AWD","engine":"Hybrid","hp":455,"doors":4,"wiki":"Volvo_XC90_(second_generation)"},{"manufacturer":"Volvo","model":"EX90","year":2023,"country":"Sweden","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":517,"doors":4,"wiki":"Volvo_EX90"},{"manufacturer":"Polestar","model":"1","year":2019,"country":"Sweden","body":"Coupe","drivetrain":"AWD","engine":"Hybrid","hp":619,"doors":2,"wiki":"Polestar_1"},{"manufacturer":"Polestar","model":"2","year":2020,"country":"Sweden","body":"Sedan","drivetrain":"AWD","engine":"Electric","hp":408,"doors":4,"wiki":"Polestar_2"},{"manufacturer":"Polestar","model":"3","year":2023,"country":"Sweden","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":517,"doors":4,"wiki":"Polestar_3"},{"manufacturer":"Chevrolet","model":"Camaro 1st Gen","year":1966,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":295,"doors":2,"wiki":"Chevrolet_Camaro_(first_generation)"},{"manufacturer":"Chevrolet","model":"Camaro ZL1 6th Gen","year":2016,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":650,"doors":2,"wiki":"Chevrolet_Camaro_(sixth_generation)"},{"manufacturer":"Chevrolet","model":"Corvette C3","year":1968,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":390,"doors":2,"wiki":"Chevrolet_Corvette_C3"},{"manufacturer":"Chevrolet","model":"Corvette C5 Z06","year":2001,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":405,"doors":2,"wiki":"Chevrolet_Corvette_C5"},{"manufacturer":"Chevrolet","model":"Corvette C7 Z06","year":2014,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":650,"doors":2,"wiki":"Chevrolet_Corvette_C7"},{"manufacturer":"Chevrolet","model":"Corvette C8 Stingray","year":2020,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":495,"doors":2,"wiki":"Chevrolet_Corvette_(C8)"},{"manufacturer":"Chevrolet","model":"Corvette E-Ray","year":2024,"country":"USA","body":"Coupe","drivetrain":"AWD","engine":"Hybrid","hp":655,"doors":2,"wiki":"Chevrolet_Corvette_(C8)"},{"manufacturer":"Dodge","model":"Viper Gen1","year":1992,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":400,"doors":2,"wiki":"Dodge_Viper_(first_generation)"},{"manufacturer":"Dodge","model":"Viper ACR","year":2015,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":645,"doors":2,"wiki":"Dodge_Viper_(fifth_generation)"},{"manufacturer":"Dodge","model":"Challenger SRT Hellcat","year":2015,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":707,"doors":2,"wiki":"Dodge_Challenger_(LC)"},{"manufacturer":"Dodge","model":"Challenger SRT Demon","year":2018,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":840,"doors":2,"wiki":"Dodge_Challenger_(LC)"},{"manufacturer":"Cadillac","model":"CT5-V Blackwing","year":2022,"country":"USA","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":668,"doors":4,"wiki":"Cadillac_CT5"},{"manufacturer":"GMC","model":"Hummer EV","year":2021,"country":"USA","body":"Pickup","drivetrain":"AWD","engine":"Electric","hp":1000,"doors":4,"wiki":"GMC_Hummer_EV"},{"manufacturer":"RAM","model":"1500 TRX","year":2020,"country":"USA","body":"Pickup","drivetrain":"AWD","engine":"Petrol","hp":702,"doors":4,"wiki":"Ram_TRX"},{"manufacturer":"Rivian","model":"R1T","year":2021,"country":"USA","body":"Pickup","drivetrain":"AWD","engine":"Electric","hp":835,"doors":4,"wiki":"Rivian_R1T"},{"manufacturer":"Rivian","model":"R1S","year":2022,"country":"USA","body":"SUV","drivetrain":"AWD","engine":"Electric","hp":835,"doors":4,"wiki":"Rivian_R1S"},{"manufacturer":"Lucid","model":"Air Pure","year":2021,"country":"USA","body":"Sedan","drivetrain":"RWD","engine":"Electric","hp":480,"doors":4,"wiki":"Lucid_Air"},{"manufacturer":"Lucid","model":"Air Sapphire","year":2023,"country":"USA","body":"Sedan","drivetrain":"AWD","engine":"Electric","hp":1234,"doors":4,"wiki":"Lucid_Air"},{"manufacturer":"Jeep","model":"Wrangler CJ5","year":1954,"country":"USA","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":75,"doors":2,"wiki":"Jeep_CJ"},{"manufacturer":"Jeep","model":"Wrangler JL","year":2018,"country":"USA","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":285,"doors":4,"wiki":"Jeep_Wrangler_(JL)"},{"manufacturer":"Ford","model":"Bronco 1st Gen","year":1966,"country":"USA","body":"SUV","drivetrain":"AWD","engine":"Petrol","hp":116,"doors":2,"wiki":"Ford_Bronco_(first_generation)"},{"manufacturer":"Lexus","model":"LFA","year":2010,"country":"Japan","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":553,"doors":2,"wiki":"Lexus_LFA"},{"manufacturer":"Lexus","model":"LC 500","year":2017,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":471,"doors":2,"wiki":"Lexus_LC"},{"manufacturer":"Lexus","model":"IS-F","year":2007,"country":"Japan","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":416,"doors":4,"wiki":"Lexus_IS_F"},{"manufacturer":"Lexus","model":"IS 500","year":2021,"country":"Japan","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":472,"doors":4,"wiki":"Lexus_IS_(third_generation)"},{"manufacturer":"Acura","model":"NSX NA1","year":1990,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":270,"doors":2,"wiki":"Honda_NSX"},{"manufacturer":"Acura","model":"NSX Type S","year":2021,"country":"Japan","body":"Coupe","drivetrain":"AWD","engine":"Hybrid","hp":600,"doors":2,"wiki":"Acura_NSX_(second_generation)"},{"manufacturer":"Acura","model":"Integra Type R","year":1995,"country":"Japan","body":"Coupe","drivetrain":"FWD","engine":"Petrol","hp":187,"doors":2,"wiki":"Honda_Integra_Type_R"},{"manufacturer":"Infiniti","model":"Q60 Red Sport","year":2016,"country":"Japan","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":400,"doors":2,"wiki":"Infiniti_Q60"},{"manufacturer":"Lancia","model":"Delta HF Integrale 8V","year":1987,"country":"Italy","body":"Hatchback","drivetrain":"AWD","engine":"Petrol","hp":185,"doors":4,"wiki":"Lancia_Delta_HF_Integrale"},{"manufacturer":"Lancia","model":"Delta HF Integrale 16V","year":1989,"country":"Italy","body":"Hatchback","drivetrain":"AWD","engine":"Petrol","hp":200,"doors":4,"wiki":"Lancia_Delta_HF_Integrale"},{"manufacturer":"Lancia","model":"Delta Evo","year":1991,"country":"Italy","body":"Hatchback","drivetrain":"AWD","engine":"Petrol","hp":215,"doors":4,"wiki":"Lancia_Delta_HF_Integrale"},{"manufacturer":"Ford","model":"Escort RS Cosworth","year":1992,"country":"UK","body":"Hatchback","drivetrain":"AWD","engine":"Petrol","hp":227,"doors":4,"wiki":"Ford_Escort_RS_Cosworth"},{"manufacturer":"Porsche","model":"914","year":1969,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":80,"doors":2,"wiki":"Porsche_914"},{"manufacturer":"BMW","model":"2002 Turbo","year":1973,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":170,"doors":2,"wiki":"BMW_2002_Turbo"},{"manufacturer":"Mercedes","model":"300SL Gullwing","year":1954,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":215,"doors":2,"wiki":"Mercedes-Benz_300SL"},{"manufacturer":"Ferrari","model":"Dino 246 GT","year":1969,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":195,"doors":2,"wiki":"Ferrari_Dino_246_GT"},{"manufacturer":"Lamborghini","model":"Espada","year":1968,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":325,"doors":4,"wiki":"Lamborghini_Espada"},{"manufacturer":"Mazda","model":"Cosmo 110S","year":1967,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":110,"doors":2,"wiki":"Mazda_Cosmo"},{"manufacturer":"Chevrolet","model":"Corvette C1","year":1953,"country":"USA","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":150,"doors":2,"wiki":"Chevrolet_Corvette_C1"}];

// ══════════════════════════════════════════
//  CONSTANTS & STATE
// ══════════════════════════════════════════
const STORAGE_KEY  = 'cardle_v3';

let cars       = CAR_DATA;
let targetCar  = null;
let guesses    = [];
let gameOver   = false;
let selectedIdx = -1;
let currentLang = 'en';
let lbTab      = 'streak';

const imgCache = {};

// ══════════════════════════════════════════
//  COOKIE / USER DB
// ══════════════════════════════════════════
function setCookie(name, val, days=3650) {
  const d = new Date();
  d.setTime(d.getTime() + days*86400000);
  document.cookie = name + '=' + encodeURIComponent(val) + ';expires=' + d.toUTCString() + ';path=/';
}
function getCookie(name) {
  const c = document.cookie.split(';').map(x=>x.trim());
  for (const item of c) {
    if (item.startsWith(name+'=')) return decodeURIComponent(item.slice(name.length+1));
  }
  return null;
}

function getDB() {
  try {
    const raw = getCookie(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}
function saveDB(db) {
  const s = JSON.stringify(db);
  setCookie(STORAGE_KEY, s);
  try { localStorage.setItem(STORAGE_KEY, s); } catch {}
}

function newUser(name) {
  return {
    name,
    played: 0,
    wins: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalGuesses: 0,
    guessDist: {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0},
    lastPlayedDay: -1,
    days: {}, // day -> {won, guesses, car}
    lang: 'en',
  };
}

function getUser() {
  const db = getDB();
  return db ? db : null;
}

function getDayNumber() {
  const realDay = Math.floor(Date.now() / 86400000);
  const debugOffset = parseInt(localStorage.getItem('cardle_debug_offset') || '0', 10);
  return realDay + debugOffset;
}

function getTodayKey() {
  return getDayNumber();
}

// ══════════════════════════════════════════
//  DAILY SEED — no two consecutive days same car
// ══════════════════════════════════════════
function getDailyIndex() {
  const day = getTodayKey();
  // Simple LCG-style shuffle so consecutive days never collide
  // Use day as seed, produce index, then check it differs from yesterday's index
  function seededIndex(d) {
    // Knuth multiplicative hash
    return ((d * 2654435761) >>> 0) % cars.length;
  }
  let idx = seededIndex(day);
  const prevIdx = seededIndex(day - 1);
  // If same as yesterday, shift by 1 (wrapping)
  if (idx === prevIdx) idx = (idx + 1) % cars.length;
  return idx;
}

// ══════════════════════════════════════════
//  i18n
// ══════════════════════════════════════════
function t(key, ...args) {
  const val = LANGS[currentLang]?.[key] ?? LANGS.en[key] ?? key;
  return typeof val === 'function' ? val(...args) : val;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
  // table headers
  const ths = document.querySelectorAll('#guessTable thead th');
  const keys = ['colPhoto','colMake','colModel','colYear','colCountry','colBody','colDrive','colEngine',null,'colDoors'];
  keys.forEach((k,i) => { if (k && ths[i]) ths[i].textContent = t(k); });
}

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  applyTranslations();
  // persist
  const user = getUser();
  if (user) { user.lang = lang; saveDB(user); }
}


// ══════════════════════════════════════════
//  WIKIPEDIA IMAGE
// ══════════════════════════════════════════
async function fetchWikiImage(wiki) {
  if (!wiki) return null;
  if (imgCache[wiki] !== undefined) return imgCache[wiki];
  imgCache[wiki] = null;
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}`;
    const res = await fetch(url);
    if (!res.ok) throw 0;
    const data = await res.json();
    const img = data?.thumbnail?.source || data?.originalimage?.source || null;
    imgCache[wiki] = img;
    return img;
  } catch { return null; }
}

// ══════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════
function init() {
  targetCar = cars[getDailyIndex()];
  const dayKey = getTodayKey();
  const user = getUser();

  // Apply saved language
  if (user?.lang) setLang(user.lang);

  // Check if played today
  const todaySave = user?.days?.[dayKey];
  if (todaySave) {
    guesses  = todaySave.guesses || [];
    gameOver = todaySave.done || false;
    guesses.forEach(g => appendRow(g));
    updateBadge();
    if (gameOver) {
      disableInput();
      setTimeout(() => showEndPopup(true, guesses.length), 400);
    }
  }

  // Streak badge
  updateStreakBadge();
  updateUserBar();
  startCountdown();
  setupInput();
  setupUI();
}

// ══════════════════════════════════════════
//  SAVE DAILY RESULT
// ══════════════════════════════════════════
function saveDayResult(won, guessCount) {
  const dayKey = getTodayKey();
  let user = getUser();
  const isGuest = !user;
  if (isGuest) user = newUser('Guest');

  // Streak: only counts wins on consecutive days
  const prevDay = user.lastPlayedDay;
  if (prevDay === dayKey - 1) {
    user.currentStreak += 1;
  } else if (prevDay !== dayKey) {
    user.currentStreak = 1;
  }
  if (user.currentStreak > user.bestStreak) user.bestStreak = user.currentStreak;

  user.wins += 1;
  user.played += 1;
  user.totalGuesses += guessCount;
  const dist = String(Math.min(guessCount, 10)); // cap dist at 10 for display
  user.guessDist[dist] = (user.guessDist[dist] || 0) + 1;
  user.lastPlayedDay = dayKey;
  user.days = user.days || {};
  user.days[dayKey] = {
    won: true, guesses, done: true,
    car: { manufacturer: targetCar.manufacturer, model: targetCar.model }
  };

  if (!isGuest) saveDB(user);
  updateStreakBadge();
  updateUserBar();
}

// ══════════════════════════════════════════
//  STREAK BADGE
// ══════════════════════════════════════════
function updateStreakBadge() {
  const user = getUser();
  const streak = user?.currentStreak || 0;
  document.getElementById('streakCount').textContent = streak;
  const badge = document.getElementById('streakBadge');
  if (streak > 0) {
    badge.classList.add('pulse');
    setTimeout(() => badge.classList.remove('pulse'), 700);
  }
}

function updateUserBar() {
  const user = getUser();
  if (!user || user.name === 'Guest') {
    document.getElementById('userBar').style.display = 'none';
    return;
  }
  document.getElementById('userBar').style.display = 'flex';
  document.getElementById('userGreeting').innerHTML = `Hello, <strong>${escHtml(user.name)}</strong>`;
  document.getElementById('miniStreak').textContent = user.currentStreak;
  document.getElementById('miniWins').textContent = user.wins;
  document.getElementById('miniPlayed').textContent = user.played;
}

// ══════════════════════════════════════════
//  INPUT & AUTOCOMPLETE
// ══════════════════════════════════════════
function setupInput() {
  const input = document.getElementById('searchInput');
  const btn   = document.getElementById('guessBtn');
  const list  = document.getElementById('autocompleteList');

  input.addEventListener('input', () => {
    const val = input.value.trim().toLowerCase();
    list.innerHTML = '';
    selectedIdx = -1;
    if (!val || val.length < 1) { list.classList.remove('open'); return; }

    const guessedSet = new Set(guesses.map(g => `${g.manufacturer} ${g.model}`.toLowerCase()));
    const filtered = cars
      .filter(c => `${c.manufacturer} ${c.model}`.toLowerCase().includes(val) && !guessedSet.has(`${c.manufacturer} ${c.model}`.toLowerCase()))
      .slice(0, 12);

    if (!filtered.length) { list.classList.remove('open'); return; }
    filtered.forEach(car => {
      const li = document.createElement('li');
      li.textContent = car.manufacturer + " " + car.model;
      li.addEventListener('mousedown', e => {
        e.preventDefault();
        input.value = `${car.manufacturer} ${car.model}`;
        list.classList.remove('open'); list.innerHTML = ''; selectedIdx = -1;
      });
      list.appendChild(li);
    });
    list.classList.add('open');
  });

  input.addEventListener('keydown', e => {
    const items = list.querySelectorAll('li');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIdx = Math.min(selectedIdx + 1, items.length - 1);
      updateActiveItem(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIdx = Math.max(selectedIdx - 1, -1);
      updateActiveItem(items);
    } else if (e.key === 'Enter') {
      if (selectedIdx >= 0 && items[selectedIdx]) {
        const txt = items[selectedIdx].textContent;
        // strip the (year) part
        input.value = txt.replace(/\s*\(\d{4}\)$/, '');
        list.classList.remove('open'); list.innerHTML = ''; selectedIdx = -1;
      } else {
        submitGuess();
      }
    } else if (e.key === 'Escape') {
      list.classList.remove('open'); list.innerHTML = ''; selectedIdx = -1;
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.search-container')) {
      list.classList.remove('open'); list.innerHTML = ''; selectedIdx = -1;
    }
  });

  btn.addEventListener('click', submitGuess);
}

function updateActiveItem(items) {
  items.forEach((li, i) => li.classList.toggle('active', i === selectedIdx));
}

// ══════════════════════════════════════════
//  SUBMIT GUESS
// ══════════════════════════════════════════
function submitGuess() {
  if (gameOver) return;
  const input = document.getElementById('searchInput');
  const val = input.value.trim();
  if (!val) return;

  const car = findCar(val);
  if (!car) { shakeInput(); showToast(t('carNotFound')); return; }

  if (guesses.some(g => g.manufacturer === car.manufacturer && g.model === car.model)) {
    shakeInput(); showToast(t('alreadyGuessed')); return;
  }

  guesses.push(car);
  appendRow(car);
  input.value = '';
  document.getElementById('autocompleteList').classList.remove('open');
  document.getElementById('autocompleteList').innerHTML = '';
  updateBadge();

  const won = isExactMatch(car);
  if (won) {
    gameOver = true;
    disableInput();
    saveDayResult(true, guesses.length);
    setTimeout(() => showEndPopup(true, guesses.length), 750);
  }
}

function findCar(val) {
  const v = val.toLowerCase().trim();
  return cars.find(c => `${c.manufacturer} ${c.model}`.toLowerCase() === v);
}

function isExactMatch(car) {
  return car.manufacturer === targetCar.manufacturer &&
    car.model === targetCar.model &&
    car.year === targetCar.year;
}

// ══════════════════════════════════════════
//  TABLE ROW
// ══════════════════════════════════════════
function appendRow(car) {
  const tbody = document.getElementById('guessBody');
  const tr = document.createElement('tr');

  // Thumb
  const thumbTd = document.createElement('td');
  thumbTd.className = 'cell-thumb';
  const wrap = document.createElement('div');
  wrap.className = 'thumb-wrap';
  const ph = document.createElement('div');
  ph.className = 'thumb-placeholder';
  ph.textContent = car.manufacturer[0];
  const img = document.createElement('img');
  img.className = 'thumb-img';
  img.alt = `${car.manufacturer} ${car.model}`;
  wrap.appendChild(ph); wrap.appendChild(img);
  thumbTd.appendChild(wrap);
  tr.appendChild(thumbTd);

  if (car.wiki) {
    fetchWikiImage(car.wiki).then(url => {
      if (url) {
        img.src = url;
        img.onload = () => { img.classList.add('loaded'); ph.style.display = 'none'; };
      }
    });
  }

  // Data cells
  const cols = [
    compareText(car.manufacturer, targetCar.manufacturer),
    compareText(car.model, targetCar.model),
    compareNum(car.year, targetCar.year, 3),
    compareText(car.country, targetCar.country),
    compareText(car.body, targetCar.body),
    compareText(car.drivetrain, targetCar.drivetrain),
    compareText(car.engine, targetCar.engine),
    compareNum(car.hp, targetCar.hp, 20),
    compareNum(car.doors, targetCar.doors, 0),
  ];

  cols.forEach((col, ci) => {
    const td = document.createElement('td');
    td.className = `cell-${col.color}`;
    td.style.opacity = '0';
    td.style.transform = 'scaleY(0.7)';
    const span = document.createElement('span');
    span.textContent = col.value;
    td.appendChild(span);
    if (col.arrow) {
      const a = document.createElement('span');
      a.className = 'arrow';
      a.textContent = col.arrow;
      td.appendChild(a);
    }
    tr.appendChild(td);
    setTimeout(() => {
      td.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
      td.style.opacity = '1';
      td.style.transform = 'scaleY(1)';
    }, ci * 75);
  });

  tbody.appendChild(tr);
}

// ══════════════════════════════════════════
//  COMPARE HELPERS
// ══════════════════════════════════════════
function compareText(g, t2) {
  return { value: g, color: g === t2 ? 'green' : 'red', arrow: null };
}
function compareNum(g, t2, tol) {
  const diff = Math.abs(g - t2);
  const color = diff === 0 ? 'green' : (tol > 0 && diff <= tol ? 'yellow' : 'red');
  const arrow = diff !== 0 ? (g < t2 ? '↑' : '↓') : null;
  return { value: g, color, arrow };
}

// ══════════════════════════════════════════
//  END POPUP
// ══════════════════════════════════════════
async function showEndPopup(won, attempts) {
  document.getElementById('popupEmoji').textContent = '🏆';
  const titles = { pl: 'Brawo!', es: '¡Bien hecho!', de: 'Super!', fr: 'Bravo !' };
  document.getElementById('popupTitle').textContent = titles[currentLang] || 'Well done!';
  document.getElementById('popupSub').innerHTML = t('winMsg', attempts);

  const user = getUser();
  const streak = user?.currentStreak || 0;
  document.getElementById('popupStreak').textContent = streak > 0 ? t('streakMsg', streak) : '';

  const carBox = document.getElementById('popupCar');
  let imgHTML = '';
  if (targetCar.wiki) {
    const imgUrl = await fetchWikiImage(targetCar.wiki);
    if (imgUrl) imgHTML = `<img src="${imgUrl}" class="popup-car-img" alt="${escHtml(targetCar.manufacturer)} ${escHtml(targetCar.model)}"/>`;
  }
  carBox.innerHTML = `${imgHTML}<div class="popup-car-info"><strong>${escHtml(targetCar.manufacturer)} ${escHtml(targetCar.model)}</strong> (${targetCar.year})<br/>${escHtml(targetCar.country)} · ${escHtml(targetCar.body)} · ${escHtml(targetCar.drivetrain)}<br/>${escHtml(targetCar.engine)} · ${targetCar.hp} HP · ${targetCar.doors} doors</div>`;

  document.getElementById('overlayResult').classList.add('active');
}

// ══════════════════════════════════════════
//  SHARE
// ══════════════════════════════════════════
function buildShareText() {
  const dayNum = getTodayKey();
  const won = guesses.some(g => isExactMatch(g));
  const count = guesses.length;
  const emojis = guesses.map(g => {
    const cols = [
      g.manufacturer === targetCar.manufacturer,
      g.model === targetCar.model,
      Math.abs(g.year - targetCar.year) <= 3,
      g.country === targetCar.country,
      g.body === targetCar.body,
      g.drivetrain === targetCar.drivetrain,
      g.engine === targetCar.engine,
      Math.abs(g.hp - targetCar.hp) <= 20,
      g.doors === targetCar.doors,
    ];
    return cols.map(c => c ? '🟩' : '🟥').join('');
  }).join('\n');
  return `CarDle #${dayNum % 1000} — ${count} guess${count !== 1 ? 'es' : ''} ${won ? '✅' : '⏳'}\n${emojis}\nhttps://cardle.game`;
}

// ══════════════════════════════════════════
//  LEADERBOARD
// ══════════════════════════════════════════
function renderLeaderboard() {
  const user = getUser();
  // Leaderboard is local-only — just show self + simulated top
  const entries = [];
  if (user && user.name !== 'Guest') {
    entries.push({ name: user.name, streak: user.currentStreak, wins: user.wins,
      avg: user.wins > 0 ? (user.totalGuesses / user.wins).toFixed(2) : '–', me: true });
  }
  // Simulated AI competitors (seeded)
  const simNames = ['SpeedDemon', 'GearHead_99', 'TurboAlex', 'CarNerd', 'V8Viktor', 'RaceKing', 'AutoQueen'];
  const seed = getTodayKey();
  simNames.forEach((nm, i) => {
    const s = ((seed + i * 37) % 28) + 1;
    const w = ((seed + i * 13) % 60) + 10;
    const a = (((seed + i * 7) % 30) / 10 + 2.5).toFixed(2);
    entries.push({ name: nm, streak: s, wins: w, avg: a, me: false });
  });

  const sorted = [...entries].sort((a, b) => {
    if (lbTab === 'streak') return b.streak - a.streak;
    if (lbTab === 'wins')   return b.wins - a.wins;
    return parseFloat(a.avg) - parseFloat(b.avg);
  });

  const list = document.getElementById('lbList');
  list.innerHTML = '';
  sorted.forEach((e, i) => {
    const li = document.createElement('li');
    const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1);
    const val = lbTab === 'streak' ? `${e.streak} 🔥` : lbTab === 'wins' ? `${e.wins} 🏆` : `${e.avg} 🎯`;
    li.innerHTML = `
      <span class="lb-rank ${rankClass}">${medal}</span>
      <span class="lb-name ${e.me ? 'me' : ''}">${escHtml(e.name)}${e.me ? ' ★' : ''}</span>
      <span class="lb-val">${val}</span>`;
    list.appendChild(li);
  });
}

// ══════════════════════════════════════════
//  PROFILE
// ══════════════════════════════════════════
function renderProfile() {
  const user = getUser();
  const el = document.getElementById('profileContent');
  if (!user || user.name === 'Guest') {
    el.innerHTML = `<p style="color:var(--muted);text-align:center;padding:2rem">${currentLang==='pl'?'Zagraj jako zalogowany użytkownik, by zobaczyć statystyki.':'Play as a registered user to see your stats.'}</p>`;
    return;
  }
  const avg = user.wins > 0 ? (user.totalGuesses / user.wins).toFixed(2) : '–';
  const winPct = user.played > 0 ? Math.round(user.wins / user.played * 100) : 0;
  const maxDist = Math.max(1, ...Object.values(user.guessDist));

  const distRows = [1,2,3,4,5,6,7,8,9,10].map(n => {
    const count = user.guessDist[n] || 0;
    const pct = Math.round(count / maxDist * 100);
    return `<div class="dist-row">
      <span class="dist-n">${n}</span>
      <div class="dist-bar-bg"><div class="dist-bar-fill" style="width:${pct}%">${count > 0 ? count : ''}</div></div>
    </div>`;
  }).join('');

  el.innerHTML = `
    <div class="profile-name">${escHtml(user.name)}</div>
    <div class="profile-stats-grid">
      <div class="stat-card"><div class="stat-val">${user.played}</div><div class="stat-lbl">${t('played')}</div></div>
      <div class="stat-card"><div class="stat-val">${winPct}%</div><div class="stat-lbl">${t('wins')}</div></div>
      <div class="stat-card"><div class="stat-val">${user.currentStreak}</div><div class="stat-lbl">${t('streak')}</div></div>
      <div class="stat-card"><div class="stat-val">${user.bestStreak}</div><div class="stat-lbl">${t('bestStreak')}</div></div>
      <div class="stat-card"><div class="stat-val">${avg}</div><div class="stat-lbl">${t('avgG')}</div></div>
      <div class="stat-card"><div class="stat-val">${user.wins}</div><div class="stat-lbl">${t('totalWins')}</div></div>
    </div>
    <div class="dist-bar-wrap">
      <h4>${t('guessDistLabel')}</h4>
      ${distRows}
    </div>
    <div class="profile-rename">
      <p style="font-size:0.78rem;color:var(--muted);margin-bottom:0.4rem">${t('renameLabel')}</p>
      <input type="text" id="renameInput" value="${escHtml(user.name)}" maxlength="20"/>
      <button id="renameBtn">${t('renameBtn')}</button>
    </div>`;

  document.getElementById('renameBtn').addEventListener('click', () => {
    const newName = document.getElementById('renameInput').value.trim();
    if (!newName) return;
    const u = getUser();
    if (u) { u.name = newName; saveDB(u); renderProfile(); updateUserBar(); showToast('✅ ' + newName); }
  });z  
}

// ══════════════════════════════════════════
//  UI SETUP
// ══════════════════════════════════════════
function setupUI() {
  // Language
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // Leaderboard
  document.getElementById('btnLeaderboard').addEventListener('click', () => {
    renderLeaderboard();
    document.getElementById('overlayLeaderboard').classList.add('active');
  });
  document.getElementById('btnCloseLeaderboard').addEventListener('click', () => {
    document.getElementById('overlayLeaderboard').classList.remove('active');
  });

  // LB tabs
  document.querySelectorAll('.lb-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      lbTab = tab.dataset.tab;
      renderLeaderboard();
    });
  });

  // Profile
  document.getElementById('btnProfile').addEventListener('click', () => {
    renderProfile();
    document.getElementById('overlayProfile').classList.add('active');
  });
  document.getElementById('btnCloseProfile').addEventListener('click', () => {
    document.getElementById('overlayProfile').classList.remove('active');
  });

  // Result close
  document.getElementById('btnCloseResult').addEventListener('click', () => {
    document.getElementById('overlayResult').classList.remove('active');
  });

  // Share
  document.getElementById('btnShare').addEventListener('click', () => {
    const txt = buildShareText();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(txt).then(() => showToast(t('copiedToClipboard')));
    } else {
      const ta = document.createElement('textarea');
      ta.value = txt; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
      showToast(t('copiedToClipboard'));
    }
  });

  // Name prompt
  const nameOverlay = document.getElementById('overlayName');
  const existingUser = getUser();
  if (existingUser) {
    nameOverlay.classList.remove('active');
  }
  document.getElementById('btnSaveName').addEventListener('click', () => {
    const nick = document.getElementById('nicknameInput').value.trim();
    if (!nick) return;
    saveDB(newUser(nick));
    nameOverlay.classList.remove('active');
    updateUserBar();
    updateStreakBadge();
  });
  document.getElementById('btnSkipName').addEventListener('click', () => {
    nameOverlay.classList.remove('active');
  });

  // Dev reset
  document.getElementById('devResetBtn').addEventListener('click', () => {

  let debugOffset = parseInt(localStorage.getItem('cardle_debug_offset') || '0', 10);
  debugOffset += 1;
  localStorage.setItem('cardle_debug_offset', debugOffset);

  // czyścimy zapis dzisiejszej gry
  localStorage.removeItem("cardle_" + getDayNumber());

  // restart gry
  location.reload();
});

  // Close overlays on backdrop click
  ['overlayLeaderboard','overlayProfile','overlayResult'].forEach(id => {
    document.getElementById(id).addEventListener('click', e => {
      if (e.target.id === id) document.getElementById(id).classList.remove('active');
    });
  });
}

// ══════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════
function updateBadge() {
  document.getElementById('attemptBadge').textContent = `${guesses.length} 🔍`;
}
function disableInput() {
  document.getElementById('searchInput').disabled = true;
  document.getElementById('guessBtn').disabled = true;
}
function shakeInput() {
  const w = document.querySelector('.search-wrap');
  w.classList.remove('shake'); void w.offsetWidth; w.classList.add('shake');
  setTimeout(() => w.classList.remove('shake'), 550);
}
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; document.body.appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2200);
}
function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ══════════════════════════════════════════
//  DEV RESET
// ══════════════════════════════════════════
function resetDay() {
  const dayKey = getTodayKey();
  const user = getUser();
  if (user && user.days) {
    delete user.days[dayKey];
    user.played = Math.max(0, user.played - 1);
    saveDB(user);
  }
  guesses = []; gameOver = false;
  targetCar = cars[getDailyIndex()];
  document.getElementById('guessBody').innerHTML = '';
  updateBadge();
  document.getElementById('searchInput').disabled = false;
  document.getElementById('guessBtn').disabled = false;
  document.getElementById('searchInput').value = '';
  document.getElementById('overlayResult').classList.remove('active');
  updateUserBar();
  const btn = document.getElementById('devResetBtn');
  btn.textContent = '✓'; setTimeout(() => btn.textContent = '🔄 DEV', 1200);
}

// ══════════════════════════════════════════
//  COUNTDOWN + MIDNIGHT RESET
// ══════════════════════════════════════════
function startCountdown() {
  let lastDay = getTodayKey();
  function update() {
    const now = Date.now();
    const cur = Math.floor(now / 86400000);
    if (cur !== lastDay) {
      lastDay = cur;
      handleMidnight();
    }
    const diff = (cur + 1) * 86400000 - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const str = `${pad(h)}:${pad(m)}:${pad(s)}`;
    document.querySelectorAll('#countdown,#popupCountdown').forEach(el => el.textContent = str);
  }
  update(); setInterval(update, 1000);
}
function handleMidnight() {
  guesses = []; gameOver = false;
  targetCar = cars[getDailyIndex()];
  document.getElementById('guessBody').innerHTML = '';
  updateBadge();
  document.getElementById('searchInput').disabled = false;
  document.getElementById('guessBtn').disabled = false;
  document.getElementById('overlayResult').classList.remove('active');
  showToast('🌙 New car unlocked!');
}
function pad(n) { return String(n).padStart(2,'0'); }

// ══════════════════════════════════════════
//  BOOT
// ══════════════════════════════════════════
window.addEventListener('DOMContentLoaded', init);

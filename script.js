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
    exact: 'Exact', closeGuess: 'Close', wrong: 'Wrong', higherLower: 'Higher / Lower',
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
    garage: '🚗 Garage',
    garageEmpty: 'Win games to unlock cars in your garage.',
    garageSummary: (got, total) => `Discovered ${got} of ${total} cars`,
  },
  pl: {
    leaderboard: '🏅 Tabela', profile: '👤 Profil', nextCar: 'Następny za',
    guess: 'ZGADNIJ', intro: 'Zgadnij dzisiejsze tajemnicze auto. Każda próba daje podpowiedzi.',
    exact: 'Trafiony', closeGuess: 'Blisko', wrong: 'Błąd', higherLower: 'Wyżej / Niżej',
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
    garage: '🚗 Garaż',
    garageEmpty: 'Wygrywaj gry, aby odblokować auta w garażu.',
    garageSummary: (got, total) => `Odkryte auta: ${got} / ${total}`,
  },
  es: {
    leaderboard: '🏅 Tabla', profile: '👤 Perfil', nextCar: 'Próximo en',
    guess: 'ADIVINAR', intro: 'Adivina el coche misterioso. Cada intento revela pistas.',
    exact: 'Exacto', closeGuess: 'Cerca', wrong: 'Error', higherLower: 'Mayor / Menor',
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
    garage: '🚗 Garaje',
    garageEmpty: 'Gana partidas para desbloquear coches en tu garaje.',
    garageSummary: (got, total) => `Coches descubiertos: ${got} de ${total}`,
  },
  de: {
    leaderboard: '🏅 Rangliste', profile: '👤 Profil', nextCar: 'Nächstes in',
    guess: 'RATEN', intro: 'Errate das heutige Geheimfahrzeug. Jeder Versuch gibt Hinweise.',
    exact: 'Treffer', closeGuess: 'Nah dran', wrong: 'Falsch', higherLower: 'Höher / Niedriger',
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
    garage: '🚗 Garage',
    garageEmpty: 'Gewinne Spiele, um Autos in deiner Garage freizuschalten.',
    garageSummary: (got, total) => `Entdeckte Autos: ${got} von ${total}`,
  },
  fr: {
    leaderboard: '🏅 Classement', profile: '👤 Profil', nextCar: 'Prochain dans',
    guess: 'DEVINER', intro: "Devinez la voiture mystère du jour. Chaque essai révèle des indices.",
    exact: 'Exact', closeGuess: 'Proche', wrong: 'Faux', higherLower: 'Haut / Bas',
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
    garage: '🚗 Garage',
    garageEmpty: 'Gagnez des parties pour débloquer des voitures dans votre garage.',
    garageSummary: (got, total) => `Voitures découvertes : ${got} / ${total}`,
  },
};

// Simple spec translations for car summary box
const BODY_I18N = {
  pl: { Coupe: 'Coupe', Sedan: 'Sedan', Hatchback: 'Hatchback', SUV: 'SUV', Wagon: 'Kombi', Pickup: 'Pickup', Supercar: 'Supersamochód' },
  es: { Coupe: 'Coupé', Sedan: 'Sedán', Hatchback: 'Hatchback', SUV: 'SUV', Wagon: 'Familiar', Pickup: 'Pickup', Supercar: 'Superdeportivo' },
  de: { Coupe: 'Coupé', Sedan: 'Limousine', Hatchback: 'Kompakt', SUV: 'SUV', Wagon: 'Kombi', Pickup: 'Pickup', Supercar: 'Supersportwagen' },
  fr: { Coupe: 'Coupé', Sedan: 'Berline', Hatchback: 'Compacte', SUV: 'SUV', Wagon: 'Break', Pickup: 'Pickup', Supercar: 'Supercar' },
};

const ENGINE_I18N = {
  pl: { Petrol: 'Benzyna', Diesel: 'Diesel', Hybrid: 'Hybryda', Electric: 'Elektryk' },
  es: { Petrol: 'Gasolina', Diesel: 'Diésel', Hybrid: 'Híbrido', Electric: 'Eléctrico' },
  de: { Petrol: 'Benzin', Diesel: 'Diesel', Hybrid: 'Hybrid', Electric: 'Elektrisch' },
  fr: { Petrol: 'Essence', Diesel: 'Diesel', Hybrid: 'Hybride', Electric: 'Électrique' },
};

const COUNTRY_I18N = {
  pl: { Japan: 'Japonia', Germany: 'Niemcy', Italy: 'Włochy', France: 'Francja', Spain: 'Hiszpania', 'Czech Republic': 'Czechy', Sweden: 'Szwecja', 'South Korea': 'Korea Płd.', UK: 'Wielka Brytania', USA: 'USA' },
  es: { Japan: 'Japón', Germany: 'Alemania', Italy: 'Italia', France: 'Francia', Spain: 'España', 'Czech Republic': 'Chequia', Sweden: 'Suecia', 'South Korea': 'Corea del Sur', UK: 'Reino Unido', USA: 'EE. UU.' },
  de: { Japan: 'Japan', Germany: 'Deutschland', Italy: 'Italien', France: 'Frankreich', Spain: 'Spanien', 'Czech Republic': 'Tschechien', Sweden: 'Schweden', 'South Korea': 'Südkorea', UK: 'Großbritannien', USA: 'USA' },
  fr: { Japan: 'Japon', Germany: 'Allemagne', Italy: 'Italie', France: 'France', Spain: 'Espagne', 'Czech Republic': 'Tchéquie', Sweden: 'Suède', 'South Korea': 'Corée du Sud', UK: 'R.-Uni', USA: 'États-Unis' },
};

function translateSpec(map, value) {
  const langMap = map[currentLang];
  return (langMap && langMap[value]) || value;
}

// ══════════════════════════════════════════
//  CAR DATABASE (core + everyday cars)
// ══════════════════════════════════════════
const CAR_DATA = [
  // Heroes / enthusiast cars
  {"manufacturer":"Toyota","model":"Supra Mk4","year":1993,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":320,"doors":2,"wiki":"Toyota_Supra"},
  {"manufacturer":"Toyota","model":"GR Yaris","year":2020,"country":"Japan","body":"Hatchback","drivetrain":"AWD","engine":"Petrol","hp":261,"doors":4,"wiki":"Toyota_GR_Yaris"},
  {"manufacturer":"Toyota","model":"GR86 2nd Gen","year":2022,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":228,"doors":2,"wiki":"Toyota_GR86"},
  {"manufacturer":"BMW","model":"M3 E30","year":1986,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":200,"doors":2,"wiki":"BMW_M3_(E30)"},
  {"manufacturer":"BMW","model":"M3 F80","year":2014,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":431,"doors":4,"wiki":"BMW_M3_(F80)"},
  {"manufacturer":"BMW","model":"M3 G80","year":2021,"country":"Germany","body":"Sedan","drivetrain":"AWD","engine":"Petrol","hp":510,"doors":4,"wiki":"BMW_M3"},
  {"manufacturer":"BMW","model":"M5 E39","year":1998,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":394,"doors":4,"wiki":"BMW_M5_(E39)"},
  {"manufacturer":"Nissan","model":"Skyline GT-R R34","year":1999,"country":"Japan","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":280,"doors":2,"wiki":"Nissan_Skyline_GT-R_(R34)"},
  {"manufacturer":"Nissan","model":"GT-R R35","year":2007,"country":"Japan","body":"Coupe","drivetrain":"AWD","engine":"Petrol","hp":480,"doors":2,"wiki":"Nissan_GT-R"},
  {"manufacturer":"Mazda","model":"RX-7 FD","year":1992,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":255,"doors":2,"wiki":"Mazda_RX-7"},
  {"manufacturer":"Mazda","model":"MX-5 ND","year":2015,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":181,"doors":2,"wiki":"Mazda_MX-5"},
  {"manufacturer":"Honda","model":"Civic Type R FK8","year":2017,"country":"Japan","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":316,"doors":4,"wiki":"Honda_Civic_Type_R"},
  {"manufacturer":"Honda","model":"S2000","year":1999,"country":"Japan","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":237,"doors":2,"wiki":"Honda_S2000"},
  {"manufacturer":"Audi","model":"RS4 B7","year":2005,"country":"Germany","body":"Wagon","drivetrain":"AWD","engine":"Petrol","hp":420,"doors":4,"wiki":"Audi_RS_4"},
  {"manufacturer":"Audi","model":"RS6 C8","year":2019,"country":"Germany","body":"Wagon","drivetrain":"AWD","engine":"Petrol","hp":591,"doors":4,"wiki":"Audi_RS_6"},
  {"manufacturer":"Mercedes","model":"C63 AMG W204","year":2007,"country":"Germany","body":"Sedan","drivetrain":"RWD","engine":"Petrol","hp":457,"doors":4,"wiki":"Mercedes-AMG_C_63"},
  {"manufacturer":"Porsche","model":"911 964 RS","year":1991,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":260,"doors":2,"wiki":"Porsche_964"},
  {"manufacturer":"Porsche","model":"911 992 GT3","year":2021,"country":"Germany","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":510,"doors":2,"wiki":"Porsche_911_GT3"},
  {"manufacturer":"Ferrari","model":"F40","year":1987,"country":"Italy","body":"Supercar","drivetrain":"RWD","engine":"Petrol","hp":478,"doors":2,"wiki":"Ferrari_F40"},
  {"manufacturer":"Ferrari","model":"488 GTB","year":2015,"country":"Italy","body":"Coupe","drivetrain":"RWD","engine":"Petrol","hp":661,"doors":2,"wiki":"Ferrari_488"},

  // Everyday European cars (Passat, Golf, Octavia, Focus, etc.)
  {"manufacturer":"Volkswagen","model":"Passat B5","year":1996,"country":"Germany","body":"Sedan","drivetrain":"FWD","engine":"Diesel","hp":110,"doors":4,"wiki":"Volkswagen_Passat_(B5)"},
  {"manufacturer":"Volkswagen","model":"Passat B6","year":2005,"country":"Germany","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":150,"doors":4,"wiki":"Volkswagen_Passat_(B6)"},
  {"manufacturer":"Volkswagen","model":"Passat B8","year":2014,"country":"Germany","body":"Sedan","drivetrain":"FWD","engine":"Diesel","hp":150,"doors":4,"wiki":"Volkswagen_Passat_(B8)"},
  {"manufacturer":"Volkswagen","model":"Passat Variant B8","year":2014,"country":"Germany","body":"Wagon","drivetrain":"FWD","engine":"Diesel","hp":150,"doors":4,"wiki":"Volkswagen_Passat_(B8)"},
  {"manufacturer":"Volkswagen","model":"Golf Mk7","year":2012,"country":"Germany","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":125,"doors":4,"wiki":"Volkswagen_Golf_Mk7"},
  {"manufacturer":"Volkswagen","model":"Golf Mk8","year":2020,"country":"Germany","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":130,"doors":4,"wiki":"Volkswagen_Golf_Mk8"},
  {"manufacturer":"Skoda","model":"Octavia Mk2","year":2004,"country":"Czech Republic","body":"Sedan","drivetrain":"FWD","engine":"Diesel","hp":105,"doors":4,"wiki":"Skoda_Octavia"},
  {"manufacturer":"Ford","model":"Focus Mk2","year":2004,"country":"Germany","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":100,"doors":4,"wiki":"Ford_Focus_(second_generation)"},
  {"manufacturer":"Toyota","model":"Yaris Mk2","year":2005,"country":"Japan","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":90,"doors":4,"wiki":"Toyota_Yaris"},
  {"manufacturer":"Honda","model":"Civic 8th Gen","year":2005,"country":"Japan","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":140,"doors":4,"wiki":"Honda_Civic_(eighth_generation)"},
  {"manufacturer":"Renault","model":"Clio III","year":2005,"country":"France","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":75,"doors":4,"wiki":"Renault_Clio"},
  {"manufacturer":"Peugeot","model":"308 I","year":2007,"country":"France","body":"Hatchback","drivetrain":"FWD","engine":"Diesel","hp":110,"doors":4,"wiki":"Peugeot_308"},
  {"manufacturer":"Hyundai","model":"i30 FD","year":2007,"country":"South Korea","body":"Hatchback","drivetrain":"FWD","engine":"Diesel","hp":115,"doors":4,"wiki":"Hyundai_i30"},
  {"manufacturer":"Kia","model":"Ceed ED","year":2006,"country":"South Korea","body":"Hatchback","drivetrain":"FWD","engine":"Diesel","hp":115,"doors":4,"wiki":"Kia_Ceed"},
  {"manufacturer":"Mazda","model":"6 GG","year":2002,"country":"Japan","body":"Sedan","drivetrain":"FWD","engine":"Petrol","hp":141,"doors":4,"wiki":"Mazda6"},
  {"manufacturer":"Volvo","model":"V70 III","year":2007,"country":"Sweden","body":"Wagon","drivetrain":"FWD","engine":"Diesel","hp":163,"doors":4,"wiki":"Volvo_V70"},
  {"manufacturer":"Nissan","model":"Qashqai J10","year":2006,"country":"Japan","body":"SUV","drivetrain":"FWD","engine":"Diesel","hp":130,"doors":4,"wiki":"Nissan_Qashqai"},
  {"manufacturer":"Dacia","model":"Duster I","year":2009,"country":"Romania","body":"SUV","drivetrain":"AWD","engine":"Diesel","hp":110,"doors":4,"wiki":"Dacia_Duster"},
  {"manufacturer":"Fiat","model":"Panda II","year":2003,"country":"Italy","body":"Hatchback","drivetrain":"FWD","engine":"Petrol","hp":60,"doors":4,"wiki":"Fiat_Panda"}
];

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
  const displayCountry = translateSpec(COUNTRY_I18N, car.country);
  const displayBody    = translateSpec(BODY_I18N, car.body);
  const displayEngine  = translateSpec(ENGINE_I18N, car.engine);

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
    let value = col.value;
    if (ci === 3) value = displayCountry;
    else if (ci === 4) value = displayBody;
    else if (ci === 6) value = displayEngine;
    span.textContent = value;
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
  const countryLabel = translateSpec(COUNTRY_I18N, targetCar.country);
  const bodyLabel = translateSpec(BODY_I18N, targetCar.body);
  const engineLabel = translateSpec(ENGINE_I18N, targetCar.engine);
  const doorsLabel = t('colDoors') || 'Doors';
  carBox.innerHTML = `${imgHTML}<div class="popup-car-info"><strong>${escHtml(targetCar.manufacturer)} ${escHtml(targetCar.model)}</strong> (${targetCar.year})<br/>${escHtml(countryLabel)} · ${escHtml(bodyLabel)} · ${escHtml(targetCar.drivetrain)}<br/>${escHtml(engineLabel)} · ${targetCar.hp} HP · ${targetCar.doors} ${escHtml(doorsLabel)}</div>`;

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
  });
}

// ══════════════════════════════════════════
//  GARAGE (POKEDEX)
// ══════════════════════════════════════════
function renderGarage() {
  const user = getUser();
  const el = document.getElementById('garageContent');
  if (!user || user.name === 'Guest') {
    el.innerHTML = `<p style="color:var(--muted);text-align:center;padding:2rem">${t('garageEmpty')}</p>`;
    return;
  }

  const discovered = new Set();
  Object.values(user.days || {}).forEach(d => {
    if (d && d.car) {
      discovered.add(`${d.car.manufacturer}|${d.car.model}`);
    }
  });

  const allCars = cars.slice().sort((a, b) => {
    if (a.manufacturer === b.manufacturer) {
      return a.model.localeCompare(b.model);
    }
    return a.manufacturer.localeCompare(b.manufacturer);
  });

  const total = allCars.length;
  const got = discovered.size;

  const cards = allCars.map(car => {
    const key = `${car.manufacturer}|${car.model}`;
    const isDiscovered = discovered.has(key);
    if (!isDiscovered) {
      return `<div class="garage-card locked">
        <div class="garage-thumb">?</div>
        <div class="garage-meta">
          <div class="garage-name">???</div>
          <div class="garage-sub">????</div>
        </div>
      </div>`;
    }
    const countryLabel = translateSpec(COUNTRY_I18N, car.country);
    const bodyLabel = translateSpec(BODY_I18N, car.body);
    const meta = `${car.year} • ${countryLabel} • ${bodyLabel}`;
    return `<div class="garage-card">
      <div class="garage-thumb" data-wiki="${car.wiki || ''}" data-key="${escHtml(key)}">?</div>
      <div class="garage-meta">
        <div class="garage-name">${escHtml(car.manufacturer)} ${escHtml(car.model)}</div>
        <div class="garage-sub">${escHtml(meta)}</div>
      </div>
    </div>`;
  }).join('');

  el.innerHTML = `
    <p class="garage-summary">${t('garageSummary', got, total)}</p>
    <div class="garage-grid">
      ${cards}
    </div>
  `;

  // Lazy-load images only for discovered cars
  el.querySelectorAll('.garage-thumb[data-wiki]').forEach(th => {
    const wiki = th.getAttribute('data-wiki');
    if (!wiki) return;
    fetchWikiImage(wiki).then(url => {
      if (!url) return;
      const img = document.createElement('img');
      img.src = url;
      th.textContent = '';
      th.appendChild(img);
    });
  });
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

  // Garage
  document.getElementById('btnGarage').addEventListener('click', () => {
    renderGarage();
    document.getElementById('overlayGarage').classList.add('active');
  });
  document.getElementById('btnCloseGarage').addEventListener('click', () => {
    document.getElementById('overlayGarage').classList.remove('active');
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
  ['overlayLeaderboard','overlayProfile','overlayResult','overlayGarage'].forEach(id => {
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

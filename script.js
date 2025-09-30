// Firebase configuration - Le tue credenziali reali
const firebaseConfig = {
  apiKey: "AIzaSyBuxfDjkUtbjr67CkhCrBxnAliRoAq0Xxk",
  authDomain: "abbonamentigenoa1893.firebaseapp.com",
  projectId: "abbonamentigenoa1893",
  storageBucket: "abbonamentigenoa1893.firebasestorage.app",
  messagingSenderId: "474812113999",
  appId: "1:474812113999:web:66f97288df93899229f63a",
  measurementId: "G-QEDT6XHGB5"
};

// Initialize Firebase (caricato tramite CDN nell'HTML)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Initialize Analytics (opzionale)
if (typeof firebase.analytics !== 'undefined') {
  const analytics = firebase.analytics();
}

// ===============================
// EMAIL NOTIFICATIONS SERVICE
// ===============================

// EmailJS Configuration (aggiorna con le tue credenziali reali)
const EMAIL_CONFIG = {
  SERVICE_ID: 'gmail_service',           // Service ID da EmailJS
  USER_ID: 'fYg52dUw2C1J8jo5X',     // Public Key EmailJS configurata
  // Template IDs (devono corrispondere a quelli creati)
  TEMPLATES: {
    NEW_MESSAGE: 'template_new_message',  // Template messaggio chat
    WELCOME: 'template_welcome',          // Template benvenuto
    BOOKING_CREATED: 'template_booking',  // Template abbonamento
    DEAL_COMPLETED: 'template_deal'       // Template trattativa chiusa
  }
};

// Inizializza EmailJS
(function() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAIL_CONFIG.USER_ID);
    console.log('EmailJS inizializzato');
  }
})();

// Email Service Functions
const EmailService = {
  // Invia email per nuovo messaggio chat
  async sendNewMessageNotification(toUser, fromUser, message, matchName) {
    if (!toUser.email) {
      console.log('Email destinatario non disponibile');
      return;
    }

    try {
      const templateParams = {
        to_name: toUser.nome || toUser.username,
        to_email: toUser.email,
        from_name: fromUser.nome || fromUser.username,
        message: message,
        match_name: matchName,
        site_url: window.location.origin,
        reply_url: `${window.location.origin}#chat`
      };

      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATES.NEW_MESSAGE,
        templateParams
      );

      console.log('Email inviata:', response);
      return response;
    } catch (error) {
      console.error('Errore invio email:', error);
      throw error;
    }
  },

  // Email di benvenuto per nuovi utenti
  async sendWelcomeEmail(user) {
    if (!user.email) return;

    try {
      const templateParams = {
        to_name: user.nome || user.username,
        to_email: user.email,
        username: user.username,
        site_url: window.location.origin,
        contact_email: 'dnagenoa@outlook.it'
      };

      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATES.WELCOME,
        templateParams
      );

      console.log('Email benvenuto inviata:', response);
      return response;
    } catch (error) {
      console.error('Errore email benvenuto:', error);
    }
  },

  // Notifica nuovo abbonamento disponibile
  async sendBookingCreatedNotification(booking) {
    try {
      // Invia al proprietario del sito per log
      const templateParams = {
        to_email: 'dnagenoa@outlook.it',
        user_name: booking.utente,
        match_desc: booking.matchDesc,
        settore: booking.settore,
        prezzo: booking.prezzo,
        timestamp: new Date().toLocaleString('it-IT'),
        site_url: window.location.origin
      };

      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATES.BOOKING_CREATED,
        templateParams
      );

      console.log('Notifica booking inviata:', response);
      return response;
    } catch (error) {
      console.error('Errore notifica booking:', error);
    }
  },

  // Test invio email
  async testEmail() {
    try {
      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATES.NEW_MESSAGE,
        {
          to_name: 'Test User',
          to_email: 'dnagenoa@outlook.it',
          from_name: 'Sistema Ti Presto',
          message: 'Questo è un test delle email notifications',
          match_name: 'Genoa - Test',
          site_url: window.location.origin
        }
      );
      
      showToast('📧 Email di test inviata con successo!', 'success');
      return response;
    } catch (error) {
      showToast('❌ Errore invio email di test', 'error');
      console.error('Test email fallito:', error);
    }
  }
};

// Firebase Helper Functions
const FirebaseService = {
  // Users
  async createUser(userData) {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(userData.email, userData.password);
      const user = userCredential.user;
      
      // Salva dati aggiuntivi in Firestore
      await db.collection('users').doc(user.uid).set({
        username: userData.username,
        nome: userData.nome,
        cognome: userData.cognome,
        email: userData.email,
        telefono: userData.telefono,
        dataNascita: userData.dataNascita,
        registrationDate: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      return user;
    } catch (error) {
      console.error('Errore creazione utente:', error);
      throw error;
    }
  },

  async loginUser(email, password) {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Errore login:', error);
      throw error;
    }
  },

  async getUserData(uid) {
    try {
      const doc = await db.collection('users').doc(uid).get();
      return doc.exists ? doc.data() : null;
    } catch (error) {
      console.error('Errore recupero dati utente:', error);
      throw error;
    }
  },

  // Abbonamenti
  async createAbbonamento(abbonamentoData) {
    try {
      const docRef = await db.collection('abbonamenti').add({
        ...abbonamentoData,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        disponibile: true
      });
      return docRef.id;
    } catch (error) {
      console.error('Errore creazione abbonamento:', error);
      throw error;
    }
  },

  async getAbbonamenti() {
    try {
      const snapshot = await db.collection('abbonamenti')
        .get();
      
      // Filtra disponibili lato client
      const disponibili = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(abbon => abbon.disponibile === true);
      
      return disponibili;
    } catch (error) {
      console.error('Errore recupero abbonamenti:', error);
      throw error;
    }
  },

  // Real-time listener per abbonamenti
  onAbbonamentoUpdates(callback) {
    return db.collection('abbonamenti')
      .onSnapshot(callback);
  }
};

// Variabili globali
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
let users = JSON.parse(localStorage.getItem('users')) || [];
let abbonamenti = JSON.parse(localStorage.getItem('abbonamenti')) || [];

// 🔥 Funzione per sincronizzare Firebase con localStorage
async function syncFirebaseData() {
  try {
    console.log('🔄 Sincronizzazione dati Firebase...');
    
    // Sincronizza abbonamenti
    const abbonSnapshot = await db.collection('abbonamenti').get();
    const firebaseAbbonamenti = [];
    abbonSnapshot.forEach((doc) => {
      firebaseAbbonamenti.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Merge con localStorage (evita duplicati)
    firebaseAbbonamenti.forEach(fbAbb => {
      const exists = abbonamenti.find(localAbb => localAbb.id === fbAbb.id);
      if (!exists) {
        abbonamenti.push(fbAbb);
      }
    });
    
    localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
    console.log(`✅ Sincronizzati ${firebaseAbbonamenti.length} abbonamenti da Firebase`);
    
  } catch (error) {
    console.error('⚠️ Errore sincronizzazione Firebase:', error);
  }
}

// 🔥 Funzione per aggiornare un abbonamento su Firebase
async function updateAbbonamentoFirebase(abbonamento) {
  try {
    if (!db) {
      console.error('❌ Firebase non inizializzato!');
      throw new Error('Firebase non disponibile');
    }
    console.log('🔄 Aggiornamento Firebase per:', abbonamento.id);
    await db.collection('abbonamenti').doc(abbonamento.id).set(abbonamento, { merge: true });
    console.log('✅ Abbonamento aggiornato su Firebase:', abbonamento.id);
  } catch (error) {
    console.error('❌ Errore aggiornamento Firebase:', error);
    throw error;
  }
}

let currentChatAbbonamento = null;
let trattative = [];

const prezziSettore = {
  "Gradinata Nord": 25,
  "Gradinata Zena": 25,
  "Distinti Laterali": 30,
  "Distinti Centrali": 50,
  "Over 65 Distinti": 20,
  "Gradinata Laterale": 20,
  "Ridotto Gradinata": 15,
  "Over 65 Gradinata Zena": 15,
  "Ridotto Distinti": 20,
  "Ridotto Settore 6": 10,
  "Tribuna": 80
};

// Partite casa Genoa da mostrare nella select
const upcomingMatches = [
  {
    id: 1,
    description: "Genoa - Parma",
    date: "2025-10-19", // domenica 19 ottobre
    time: "15:00",
    homeTeamLogo: "img/genoa.png",
    awayTeamLogo: "img/parma.png"
  },
  {
    id: 2,
    description: "Genoa - Cremonese",
    date: "2025-10-29", // mercoledì 29 ottobre
    time: "20:45",
    homeTeamLogo: "img/genoa.png",
    awayTeamLogo: "img/cremonese.png"
  }
];

// Helpers per loghi locali
function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/(^-|-$)/g,'')
    .replace(/--+/g, '-'); // Aggiunto per gestire i trattini doppi
}
function getLogoSrcByTeamName(teamName){
  return `img/${slugify(teamName)}.png`;
}

// --- Sezioni ---
function showSection(id) {
  console.log(`Caricamento sezione: ${id}`);
  
  try {
    // Rimuovi active da tutte le sezioni
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      console.log(`Sezione ${id} attivata`);
    } else {
      console.error(`Elemento con id '${id}' non trovato`);
      return;
    }

    // Gestione stato attivo pulsanti navigazione
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
    
    // Mappa sezioni -> pulsanti navigazione
    const sectionButtonMap = {
      'home': 'Home',
      'booking': 'Vendita Abbonamenti', 
      'profile': 'Profilo',
      'history': 'Storico',
      'mySubscription': 'Le tue Trattative',
      'contacts': 'Contatti'
    };
    
    // Trova e attiva il pulsante corrispondente
    if (sectionButtonMap[id]) {
      const activeButton = Array.from(document.querySelectorAll('nav button'))
        .find(btn => btn.textContent.includes(sectionButtonMap[id]));
      if (activeButton) {
        activeButton.classList.add('active');
      }
    }

    if (id === 'home') {
      loadHomeListings();
      loadStorico();
      displayNextMatch();
    } else if (id === 'booking') {
      populateMatchSelect();
      populateSectorSelect();
      updateBookingCounter();
    } else if (id === 'profile') {
      loadProfile();
    } else if (id === 'history') {
      loadStorico();
    } else if (id === 'mySubscription') {
      loadMySubscription();
    }
  } catch (error) {
    console.error(`Errore nel caricamento della sezione ${id}:`, error);
  }
}

// --- Autenticazione ---
function login(event) {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    alert('Username o password errati');
    return;
  }
  loggedInUser = user;
  localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  toggleModal(false);
  updateUIAfterLogin();
}

function register(event) {
  event.preventDefault();

  const username = document.getElementById('registerUsername').value.trim();
  if(users.some(u => u.username === username)){
    alert('Username già esistente');
    return;
  }

  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  if(password !== confirmPassword){
    alert('Le password non coincidono');
    return;
  }

  // Controllo password: almeno un numero e un carattere speciale
  if(!/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)){
    alert('La password deve contenere almeno un numero e un carattere speciale.');
    return;
  }

  // Controllo età: almeno 18 anni
  const dataNascita = document.getElementById('registerDataNascita').value;
  const oggi = new Date();
  const nascita = new Date(dataNascita);
  const anni = oggi.getFullYear() - nascita.getFullYear();
  const m = oggi.getMonth() - nascita.getMonth();
  const d = oggi.getDate() - nascita.getDate();
  let eta = anni;
  if (m < 0 || (m === 0 && d < 0)) eta--;
  if (eta < 18) {
    alert('Devi avere almeno 18 anni per registrarti.');
    return;
  }

  const newUser = {
    username,
    password,
    nome: document.getElementById('registerNome').value.trim(),
    cognome: document.getElementById('registerCognome').value.trim(),
    dataNascita: dataNascita,
    email: document.getElementById('registerEmail').value.trim(),
    telefono: document.getElementById('registerTelefono').value.trim(),
  };

  // ✅ Salva SUBITO utente su localStorage
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  showToast('✅ Registrazione completata!', 'success');
  
  // 📧 Invia email di benvenuto
  EmailService.sendWelcomeEmail(newUser).then(() => {
    showToast('✅ Registrazione completata! Controlla la tua email.', 'success');
  }).catch(() => {
    console.log('⚠️ Email benvenuto fallita');
  });
  
  // 🔥 Firebase opzionale in background
  setTimeout(() => {
    try {
      db.collection('users').add({
        ...newUser,
        registrationDate: firebase.firestore.FieldValue.serverTimestamp()
      }).then((docRef) => {
        console.log('✅ Utente sincronizzato su Firebase:', docRef.id);
      }).catch(() => {
        console.log('⚠️ Firebase user sync fallito (ignorato)');
      });
    } catch (e) {
      console.log('⚠️ Firebase non disponibile per sync utente');
    }
  }, 100);
  
  toggleModal(false);
}

function toggleModal(show = true) {
  const authModal = document.getElementById('authModal');
  if (!authModal) return;
  authModal.style.display = show ? 'flex' : 'none';
}

function logout() {
  loggedInUser = null;
  localStorage.removeItem('loggedInUser');
  updateUIAfterLogout();
  showSection('home');
  toggleModal(true);
}

function updateUIAfterLogin() {
  updateLoginLogoutButtons();
  const bell = document.getElementById('notificationBell');
  if (bell) {
    bell.style.display = 'flex';
    bell.style.opacity = '1';
    bell.style.cursor = 'pointer';
  }
  
  // Inizializza i messaggi letti per questo utente
  initUserReadMessages();
  updateNotificationCount();
  loadProfile();
  showSection('home');
}

function updateUIAfterLogout() {
  updateLoginLogoutButtons();
  const bell = document.getElementById('notificationBell');
  if (bell) {
    bell.style.display = 'flex';
    bell.style.opacity = '0.5';
    bell.style.cursor = 'not-allowed';
  }
  clearNotificationCount();
  clearProfileForm();
}

function updateLoginLogoutButtons() {
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  if (!loginBtn || !logoutBtn) return;
  if (loggedInUser) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }
}

// --- PROFILO UTENTE MODERNO ---
function loadProfile() {
  if (!loggedInUser) {
    clearProfileForm();
    updateProfileUI();
    return;
  }
  
  // Carica i dati del form
  const map = {
    profileNome: loggedInUser.nome,
    profileCognome: loggedInUser.cognome,
    profileDataNascita: loggedInUser.dataNascita,
    profileEmail: loggedInUser.email,
    profileTelefono: loggedInUser.telefono
  };
  
  Object.entries(map).forEach(([id,val]) => {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  });
  
  // Aggiorna UI del profilo
  updateProfileUI();
  updateEmailVerificationBadge();
  loadUserPreferences();
}

function clearProfileForm() {
  ['profileNome','profileCognome','profileDataNascita','profileEmail','profileTelefono'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function updateProfileUI() {
  if (!loggedInUser) return;
  
  // Aggiorna iniziale avatar
  const initialEl = document.getElementById('userInitial');
  if (initialEl && loggedInUser.nome) {
    initialEl.textContent = loggedInUser.nome.charAt(0).toUpperCase();
  }
  
  // Aggiorna statistiche utente
  updateProfileStats();
}

function updateProfileStats() {
  if (!loggedInUser) {
    document.getElementById('userSubscriptions').textContent = '0';
    document.getElementById('userTransactions').textContent = '0';
    return;
  }
  
  // Conta abbonamenti attivi
  const userSubscriptions = abbonamenti.filter(a => 
    a.utente === loggedInUser.username && a.disponibile === true
  ).length;
  
  // Conta transazioni completate
  const userTransactions = abbonamenti.filter(a => {
    const isSeller = a.utente === loggedInUser.username;
    const isBuyer = a.buyerName === loggedInUser.username;
    const isCompleted = a.confermato || a.sellerConfirmed || !a.disponibile;
    return (isSeller || isBuyer) && isCompleted;
  }).length;
  
  document.getElementById('userSubscriptions').textContent = userSubscriptions;
  document.getElementById('userTransactions').textContent = userTransactions;
}

function updateEmailVerificationBadge() {
  const badge = document.getElementById('emailVerifiedBadge');
  if (!badge) return;
  
  if (!loggedInUser) {
    badge.style.display = 'none';
    return;
  }
  
  badge.style.display = 'inline-block';
  
  if (loggedInUser.emailVerificata) {
    badge.className = 'badge small verified';
    badge.textContent = '✓ Email Verificata';
  } else {
    badge.className = 'badge small unverified';
    badge.textContent = '⚠ Email Non Verificata';
  }
}

function saveProfile(event) {
  event.preventDefault();
  if (!loggedInUser) {
    showToast('Devi effettuare il login', 'error');
    return;
  }
  
  // Salva i dati del profilo
  loggedInUser.nome = document.getElementById('profileNome').value.trim();
  loggedInUser.cognome = document.getElementById('profileCognome').value.trim();
  loggedInUser.dataNascita = document.getElementById('profileDataNascita').value;
  loggedInUser.email = document.getElementById('profileEmail').value.trim();
  loggedInUser.telefono = document.getElementById('profileTelefono').value.trim();

  // Salva nel database locale
  const index = users.findIndex(u => u.username === loggedInUser.username);
  if (index !== -1) {
    users[index] = loggedInUser;
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  // Salva preferenze
  saveUserPreferences();
  
  // Aggiorna UI
  updateProfileUI();
  updateEmailVerificationBadge();
  
  showToast('✅ Profilo aggiornato con successo!', 'success');
}

function resetProfile() {
  if (!loggedInUser) return;
  
  if (confirm('Sei sicuro di voler ripristinare i dati originali del profilo?')) {
    loadProfile();
    showToast('🔄 Profilo ripristinato', 'info');
  }
}

// Gestione preferenze utente
function loadUserPreferences() {
  if (!loggedInUser) return;
  
  const preferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
  const userPrefs = preferences[loggedInUser.username] || {};
  
  document.getElementById('emailNotifications').checked = userPrefs.emailNotifications !== false;
  document.getElementById('pushNotifications').checked = userPrefs.pushNotifications !== false;
}

function saveUserPreferences() {
  if (!loggedInUser) return;
  
  const preferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
  
  preferences[loggedInUser.username] = {
    emailNotifications: document.getElementById('emailNotifications').checked,
    pushNotifications: document.getElementById('pushNotifications').checked
  };
  
  localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

// --- Contatore abbonamenti utente ---
function updateBookingCounter() {
  if (!loggedInUser) return;
  
  const abbonamentiUtente = abbonamenti.filter(a => a.utente === loggedInUser.username && a.disponibile === true);
  const countText = `${abbonamentiUtente.length}/4`;
  
  // Cerco se esiste già il contatore
  let counterElement = document.getElementById('bookingCounter');
  if (!counterElement) {
    // Creo il contatore se non esiste
    counterElement = document.createElement('div');
    counterElement.id = 'bookingCounter';
    counterElement.className = 'booking-counter';
    
    // Lo inserisco nell'header della sezione booking
    const bookingHeader = document.querySelector('.booking-title-section');
    if (bookingHeader) {
      bookingHeader.appendChild(counterElement);
    }
  }
  
  // Aggiorno il contenuto
  const statusClass = abbonamentiUtente.length >= 4 ? 'counter-full' : 'counter-available';
  counterElement.className = `booking-counter ${statusClass}`;
  counterElement.innerHTML = `
    <span class="counter-label">Abbonamenti in vendita:</span>
    <span class="counter-value">${countText}</span>
  `;
  
  // Disabilito il form se ha raggiunto il limite
  const bookingForm = document.getElementById('bookingForm');
  const submitButton = bookingForm?.querySelector('button[type="submit"]');
  
  if (abbonamentiUtente.length >= 4) {
    if (bookingForm) {
      bookingForm.style.opacity = '0.6';
      bookingForm.style.pointerEvents = 'none';
    }
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="btn-icon">🚫</span><span class="btn-text">Limite Raggiunto</span>';
    }
  } else {
    if (bookingForm) {
      bookingForm.style.opacity = '1';
      bookingForm.style.pointerEvents = 'auto';
    }
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = '<span class="btn-icon">💰</span><span class="btn-text">Metti in Vendita</span>';
    }
  }
}

// --- Select partite & settori ---
function populateMatchSelect() {
  const select = document.getElementById('matchSelect');
  if (!select) return;
  select.innerHTML = '';
  
  // Filtra le partite disponibili per la vendita (temporaneamente escludi Genoa-Cremonese)
  const availableMatches = upcomingMatches.filter(match => {
    // Blocca temporaneamente la vendita per Genoa-Cremonese (ID 2)
    if (match.id === 2 && match.description.includes('Cremonese')) {
      return false; // Non mostrare nella select
    }
    return true;
  });
  
  availableMatches.forEach(match => {
    const option = document.createElement('option');
    option.value = match.id;
    option.textContent = `${match.description} - ${formatDate(match.date)} ore ${match.time}`;
    select.appendChild(option);
  });
  
  // Se non ci sono partite disponibili, mostra messaggio
  if (availableMatches.length === 0) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Nessuna partita disponibile per la vendita al momento';
    option.disabled = true;
    select.appendChild(option);
  }
}

function populateSectorSelect() {
  const select = document.getElementById('sectorSelect');
  if (!select) return;
  
  // Aggiungi opzione placeholder
  select.innerHTML = '<option value="" disabled selected class="placeholder-option">🎯 Scegli il settore e visualizza il prezzo...</option>';
  
  Object.entries(prezziSettore).forEach(([settore, prezzo]) => {
    const option = document.createElement('option');
    option.value = settore;
    // Formatta il prezzo con virgola e decimali
    const prezzoFormattato = formatPriceWithComma(prezzo);
    option.textContent = `${settore} - € ${prezzoFormattato}`;
    option.className = 'sector-option';
    select.appendChild(option);
  });
}

// Funzione per formattare i prezzi con virgola italiana
function formatPriceWithComma(price) {
  if (typeof price !== 'number') {
    price = parseFloat(price) || 0;
  }
  return price.toLocaleString('it-IT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatDate(dateString){
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// --- Vendita abbonamento ---
function prenotaAbbonamento(event) {
  event.preventDefault();
  loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // <-- aggiungi questa riga
  if (!loggedInUser) {
    alert('Devi effettuare il login per mettere in vendita.');
    toggleModal(true);
    return;
  }

  // Controllo limite massimo abbonamenti per utente
  const abbonamentiUtente = abbonamenti.filter(a => a.utente === loggedInUser.username && a.disponibile === true);
  if (abbonamentiUtente.length >= 4) {
    alert('Hai raggiunto il limite massimo di 4 abbonamenti in vendita. Completa o annulla una vendita esistente per aggiungerne un altro.');
    return;
  }

  const matchId = document.getElementById('matchSelect').value;
  const settore = document.getElementById('sectorSelect').value;
  const match = upcomingMatches.find(m => m.id == matchId);

  if (!match) {
    alert('Seleziona una partita valida');
    return;
  }

  // Controlla se l'utente ha già messo in vendita un abbonamento per questa specifica partita e settore
  const abbonamentioDuplicato = abbonamenti.find(a => 
    a.utente === loggedInUser.username && 
    a.matchId == matchId && 
    a.settore === settore && 
    a.disponibile === true
  );
  
  if (abbonamentioDuplicato) {
    alert('Hai già messo in vendita un abbonamento per questa partita nello stesso settore.');
    return;
  }

  // Blocco vendite per Genoa - Juventus (solo in "Vendi il tuo abbonamento")
  if (/^\s*genoa\s*-\s*juventus\s*$/i.test((match.description || '').trim())) {
    alert('Le vendite per "Genoa - Juventus" non sono ancora aperte. Puoi visualizzare la partita, ma non è possibile mettere in vendita il tuo abbonamento in questa sezione.');
    return;
  }
  const nuovoAbbonamento = {
    utente: loggedInUser.username,
    matchId: match.id,
    matchDesc: match.description,
    settore: settore,
    disponibile: true,
    messaggiChat: []
  };

  // ✅ Salva SUBITO su localStorage (funziona sempre)
  const abbonamentoConId = {
    ...nuovoAbbonamento,
    id: 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    timestamp: Date.now()
  };
  
  abbonamenti.push(abbonamentoConId);
  localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
  
  showToast('✅ Abbonamento messo in vendita con successo!', 'success');
  updateBookingCounter();
  updateProfileStats();
  showSection('home');
  loadHomeListings();
  
  // 📧 Invio email di notifica
  EmailService.sendBookingCreatedNotification(abbonamentoConId);
  
  // 🔥 Firebase opzionale in background
  setTimeout(() => {
    try {
      db.collection('abbonamenti').add({
        ...nuovoAbbonamento,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        createdAt: new Date()
      }).then((docRef) => {
        console.log('✅ Abbonamento sincronizzato su Firebase:', docRef.id);
      }).catch(() => {
        console.log('⚠️ Firebase sync fallito (ignorato)');
      });
    } catch (e) {
      console.log('⚠️ Firebase non disponibile');
    }
  }, 100);
}

// --- Home: lista ---
function loadHomeListings() {
  const container = document.getElementById('homeListings');
  if (!container) return;
  container.innerHTML = '<div class="loading">🔄 Caricamento abbonamenti...</div>';

    // 🎯 MODALITÀ SOLO localStorage (Firebase opzionale)
  console.log('📦 Caricamento abbonamenti da localStorage...');
  
  // Usa solo localStorage - più stabile e veloce
  const inVendita = abbonamenti.filter(a => a.disponibile === true);
  inVendita.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  renderHomeListings(inVendita);
  
  // Firebase opzionale in background (non blocca l'UI)
  setTimeout(() => {
    try {
      db.collection('abbonamenti').get().then((querySnapshot) => {
        console.log('✅ Firebase caricato in background');
        // Sincronizza silenziosamente senza ricaricare UI
      }).catch(() => {
        console.log('⚠️ Firebase non disponibile - usando solo localStorage');
      });
    } catch (e) {
      console.log('⚠️ Firebase disabilitato');
    }
  }, 1000);
}

function renderHomeListings(inVendita) {
  const container = document.getElementById('homeListings');
  if (!container) return;
  
  if(inVendita.length === 0){
    container.innerHTML = '<p class="no-listings">Nessun abbonamento in vendita al momento.</p>';
    return;
  }
  
  container.innerHTML = '';

  inVendita.forEach(abbon => {
    const prezzo = prezziSettore[abbon.settore] || 'N/A';
    
    // Determina se è in trattativa
    const haMessaggi = abbon.messaggiChat && abbon.messaggiChat.length > 0;
    const inTrattativa = abbon.inTrattativa === true || haMessaggi;
    
    // Estrai nomi squadre per i loghi
    const teamNames = abbon.matchDesc.split(' - ');
    const homeTeam = teamNames[0]?.trim();
    const awayTeam = teamNames[1]?.trim();

    const div = document.createElement('div');
    div.className = 'home-listing-item';
    // ⚡ Crea elementi DOM in modo sicuro (nessun template literal)
    div.className = 'home-listing-item';
    
    // Header
    const header = document.createElement('div');
    header.className = 'listing-header';
    
    const matchTeams = document.createElement('div');
    matchTeams.className = 'match-teams';
    
    // Logo home team
    if (homeTeam) {
      const homeImg = document.createElement('img');
      homeImg.src = getLogoSrcByTeamName(homeTeam);
      homeImg.alt = 'Logo ' + homeTeam;
      homeImg.className = 'team-logo';
      matchTeams.appendChild(homeImg);
    }
    
    // Match info
    const matchInfo = document.createElement('div');
    matchInfo.className = 'match-info';
    
    const matchTitle = document.createElement('h3');
    matchTitle.className = 'match-title';
    matchTitle.textContent = abbon.matchDesc;
    
    const matchDate = document.createElement('p');
    matchDate.className = 'match-date';
    matchDate.textContent = '29 settembre 2025 - 20:45';
    
    matchInfo.appendChild(matchTitle);
    matchInfo.appendChild(matchDate);
    matchTeams.appendChild(matchInfo);
    
    // Logo away team
    if (awayTeam) {
      const awayImg = document.createElement('img');
      awayImg.src = getLogoSrcByTeamName(awayTeam);
      awayImg.alt = 'Logo ' + awayTeam;
      awayImg.className = 'team-logo';
      matchTeams.appendChild(awayImg);
    }
    
    // Badges
    const badges = document.createElement('div');
    badges.className = 'listing-badges';
    
    const statusBadge = document.createElement('span');
    statusBadge.className = 'badge-status ' + (inTrattativa ? 'status-negotiation' : 'status-available');
    statusBadge.textContent = inTrattativa ? 'IN TRATTATIVA' : 'DISPONIBILE';
    badges.appendChild(statusBadge);
    
    header.appendChild(matchTeams);
    header.appendChild(badges);
    
    // Details
    const details = document.createElement('div');
    details.className = 'listing-details';
    
    const sectorPrice = document.createElement('div');
    sectorPrice.className = 'sector-price';
    
    const sectorBadge = document.createElement('span');
    sectorBadge.className = 'sector-badge';
    sectorBadge.textContent = abbon.settore;
    
    const priceBadge = document.createElement('span');
    priceBadge.className = 'price-badge';
    priceBadge.textContent = '€ ' + formatPriceWithComma(prezzo);
    
    sectorPrice.appendChild(sectorBadge);
    sectorPrice.appendChild(priceBadge);
    
    const cardSeller = document.createElement('small');
    cardSeller.className = 'card-seller';
    cardSeller.textContent = 'Pubblicato da: ' + (abbon.ownerName || abbon.utente || 'Utente');
    
    details.appendChild(sectorPrice);
    details.appendChild(cardSeller);
    
    // Actions
    const actions = document.createElement('div');
    actions.className = 'listing-actions';
    
    const button = document.createElement('button');
    button.className = 'btn-primary btn-trattativa';
    
    const buttonIcon = document.createElement('span');
    buttonIcon.textContent = '🤝';
    
    const buttonText = document.createTextNode(' APRI TRATTATIVA');
    
    button.appendChild(buttonIcon);
    button.appendChild(buttonText);
    actions.appendChild(button);
    
    // Assembla tutto
    div.appendChild(header);
    div.appendChild(details);
    div.appendChild(actions);
    container.appendChild(div);
    
    // 🎯 Assegna l'ID in modo sicuro al bottone
    const bottone = div.querySelector('.btn-trattativa');
    if (bottone) {
      bottone.setAttribute('data-id', abbon.id);
      bottone.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        console.log('🎯 Bottone trattativa cliccato, ID:', id);
        handleAcquista(id);
      });
    }
  });
}

// --- Chat ---
function openChatModal(abbonId) {
  console.log('💬 openChatModal chiamata con ID:', abbonId);
  console.log('👤 Utente loggato:', loggedInUser);
  
  if (!loggedInUser) {
    alert('Devi effettuare il login per aprire la chat.');
    toggleModal(true);
    return;
  }

  currentChatAbbonamento = abbonamenti.find(a => a.id === abbonId);
  console.log('🎫 Abbonamento per chat:', currentChatAbbonamento);
  
  if (!currentChatAbbonamento) {
    alert('Abbonamento non trovato');
    console.error('❌ Abbonamento non trovato per ID:', abbonId);
    return;
  }

  // Apri direttamente la chat per ora (debug)
  console.log('🚀 Aprendo modal chat...');
  const modal = document.getElementById('chatModal');
  if (modal) {
    modal.classList.add('active');
    console.log('✅ Modal chat aperto');
    loadChatMessages();
  } else {
    console.error('❌ Modal chat non trovato!');
  }
}

// 🔥 Sincronizza messaggi chat specifici da Firebase
async function syncChatFromFirebase(abbonId) {
  try {
    const doc = await db.collection('abbonamenti').doc(abbonId).get();
    if (doc.exists) {
      const firebaseData = doc.data();
      if (firebaseData.messaggiChat) {
        currentChatAbbonamento.messaggiChat = firebaseData.messaggiChat;
        // Aggiorna anche l'array locale
        const localIndex = abbonamenti.findIndex(a => a.id === abbonId);
        if (localIndex !== -1) {
          abbonamenti[localIndex].messaggiChat = firebaseData.messaggiChat;
          localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
        }
      }
    }
  } catch (error) {
    console.error('❌ Errore sincronizzazione chat:', error);
  }
}

function loadChatMessages() {
  console.log('📨 loadChatMessages chiamata');
  const chatBox = document.getElementById('chatBox');
  if (!chatBox) {
    console.error('❌ chatBox non trovato!');
    return;
  }
  chatBox.innerHTML = '';

  if (!currentChatAbbonamento) {
    console.error('❌ currentChatAbbonamento è null!');
    return;
  }
  
  console.log('💬 Caricando messaggi per:', currentChatAbbonamento.id);

  // Carica messaggi e segna quelli ricevuti come letti
  currentChatAbbonamento.messaggiChat.forEach((msg, index) => {
    // Assicurati che ogni messaggio abbia un timestamp
    if (!msg.timestamp) {
      msg.timestamp = Date.now() - (currentChatAbbonamento.messaggiChat.length - index) * 60000;
    }
    
    const p = document.createElement('p');
    p.textContent = `${msg.sender}: ${msg.text}`;
    p.className = msg.sender === loggedInUser.username ? 'sent' : 'received';
    chatBox.appendChild(p);
    
    // Segna i messaggi ricevuti come letti quando la chat viene aperta
    if (msg.sender !== loggedInUser.username) {
      markMessageAsRead(currentChatAbbonamento.id, index);
    }
  });

  // Pulsanti fissi sotto la barra input
  const chatActions = document.getElementById('chatActions');
  if (chatActions) chatActions.innerHTML = '';

  if (
    loggedInUser &&
    currentChatAbbonamento.utente === loggedInUser.username &&
    currentChatAbbonamento.inTrattativa === true &&
    currentChatAbbonamento.buyerName
  ) {
    if (chatActions) {
      chatActions.innerHTML = `
        <button class="btn-accept" onclick="accettaProposta('${currentChatAbbonamento.id}')">Accetta</button>
        <button class="btn-reject" onclick="rifiutaProposta('${currentChatAbbonamento.id}')">Rifiuta</button>
      `;
    }
  }
  chatBox.scrollTop = chatBox.scrollHeight;
  
  // Aggiorna il contatore dopo aver segnato i messaggi come letti
  setTimeout(updateNotificationCount, 100);
}

// Modale dati vendita aggiornata
function openDatiVenditaModal(abbon) {
  const modal = document.getElementById('datiVenditaModal');
  if (!modal) return;
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeDatiVenditaModal()">×</span>
      <h2>Invia i tuoi dati all'acquirente</h2>
      <p>Per accordarti sul pagamento, invia i tuoi dati di contatto:</p>
      <form id="datiVenditaForm">
        <label>Email:</label>
        <input type="email" id="datiVenditaEmail" value="${loggedInUser.email}" required />
        <label>Telefono:</label>
        <input type="text" id="datiVenditaTelefono" value="${loggedInUser.telefono}" required />
        <button type="submit" class="btn-accept" style="background:#2ecc40;color:#fff;">Invia dati</button>
      </form>
    </div>
  `;
  modal.style.display = 'flex';

  document.getElementById('datiVenditaForm').onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('datiVenditaEmail').value;
    const telefono = document.getElementById('datiVenditaTelefono').value;
    abbon.messaggiChat.push({
      sender: loggedInUser.username,
      text: `Dati per il pagamento: Email: ${email}, Telefono: ${telefono}`
    });
    localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
    closeDatiVenditaModal();
    alert('Dati inviati all\'acquirente tramite chat!');
    loadChatMessages();
  };
}

function closeDatiVenditaModal() {
  const modal = document.getElementById('datiVenditaModal');
  if (modal) modal.style.display = 'none';
}

function closeChatModal() {
  const modal = document.getElementById('chatModal');
  if (modal) modal.classList.remove('active');
  currentChatAbbonamento = null;
  const chatActions = document.getElementById('chatActions');
  if (chatActions) chatActions.innerHTML = '';
}

// --- STORICO PRENOTAZIONI MODERNO ---
let currentFilter = 'all';

function loadStorico() {
  const container = document.getElementById('storicoList');
  if (!container) return;

  if (!loggedInUser) {
    container.innerHTML = `
      <div class="storico-empty">
        <div class="storico-empty-icon">🔐</div>
        <h3>Login Richiesto</h3>
        <p>Effettua il login per vedere lo storico delle tue prenotazioni</p>
      </div>
    `;
    updateStoricoStats(0);
    return;
  }

  const meName = loggedInUser.username;

  // Partecipazioni dove sono venditore o acquirente
  const mine = (abbonamenti || []).filter(a => {
    const isSeller = (a.utente && a.utente === meName);
    const isBuyer  = (a.buyerName && a.buyerName === meName);
    return isSeller || isBuyer;
  });

  // Solo trattative concluse: venduto/confermato da entrambe le parti
  const concluded = mine.filter(a => {
    const stato = (a.stato || '').toLowerCase();
    const bothConfirmed = a.confermato === true || a.sellerConfirmed === true && a.buyerConfirmed === true;
    const sold = stato === 'venduto' || stato === 'confermato';
    const notAvailableSold = a.disponibile === false;
    return bothConfirmed || sold || notAvailableSold;
  });

  // Aggiorna statistiche
  updateStoricoStats(concluded.length);

  if (concluded.length === 0) {
    container.innerHTML = `
      <div class="storico-empty">
        <div class="storico-empty-icon">📋</div>
        <h3>Nessuna Transazione</h3>
        <p>Non hai ancora completato nessuna trattativa.<br/>
        Inizia a vendere o comprare abbonamenti!</p>
      </div>
    `;
    return;
  }

  // Ordina per data più recente
  concluded.sort((x,y)=> (y.lastPurchaseAt||y.timestamp||0) - (x.lastPurchaseAt||x.timestamp||0));

  // Applica filtro
  let filteredResults = concluded;
  if (currentFilter === 'vendite') {
    filteredResults = concluded.filter(a => a.utente === meName);
  } else if (currentFilter === 'acquisti') {
    filteredResults = concluded.filter(a => a.buyerName === meName);
  }

  renderStoricoItems(filteredResults, meName);
}

function renderStoricoItems(transactions, meName) {
  const container = document.getElementById('storicoList');
  
  if (transactions.length === 0) {
    container.innerHTML = `
      <div class="storico-empty">
        <div class="storico-empty-icon">🔍</div>
        <h3>Nessun Risultato</h3>
        <p>Nessuna transazione trovata per il filtro selezionato.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  
  transactions.forEach(abbon => {
    const prezzo = prezziSettore[abbon.settore] || abbon.prezzo || '0';
    const label = abbon.matchDesc || 'Partita';
    const isVendita = (abbon.utente === meName);
    const role = isVendita ? 'vendita' : 'acquisto';
    const roleText = isVendita ? 'Venduto' : 'Acquistato';
    
    // Formatta la data
    const timestamp = abbon.lastPurchaseAt || abbon.timestamp || Date.now();
    const date = new Date(timestamp);
    const dateStr = date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
    const timeStr = date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const div = document.createElement('div');
    div.className = `storico-item ${role}`;
    div.innerHTML = `
      <div class="storico-item-header">
        <div class="match-info">
          <h3 class="match-title">⚽ ${label}</h3>
          <p class="match-details">Settore ${abbon.settore || 'N/D'}</p>
        </div>
        <div class="transaction-badge ${role}">
          ${roleText}
        </div>
      </div>
      <div class="storico-item-body">
        <div class="info-group">
          <span class="info-label">💰 Prezzo</span>
          <span class="info-value price-value">€ ${formatPriceWithComma(prezzo)}</span>
        </div>
        <div class="info-group">
          <span class="info-label">📅 Data</span>
          <span class="info-value date-value">${dateStr}</span>
        </div>
        <div class="info-group">
          <span class="info-label">⏰ Ora</span>
          <span class="info-value date-value">${timeStr}</span>
        </div>
        <div class="info-group">
          <span class="info-label">${isVendita ? '👤 Acquirente' : '👤 Venditore'}</span>
          <span class="info-value">${isVendita ? (abbon.buyerName || 'N/D') : (abbon.utente || 'N/D')}</span>
        </div>
      </div>
    `;
    
    container.appendChild(div);
  });
}

function updateStoricoStats(count) {
  const totalEl = document.getElementById('totalTransactions');
  if (totalEl) {
    totalEl.textContent = count;
  }
}

// Sistema di filtri
function initStoricoFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Rimuovi active da tutti
      filterBtns.forEach(b => b.classList.remove('active'));
      
      // Aggiungi active al clickato
      btn.classList.add('active');
      
      // Aggiorna filtro corrente
      currentFilter = btn.dataset.filter;
      
      // Ricarica lista
      loadStorico();
    });
  });
}

// Inizializza filtri quando la pagina è pronta
document.addEventListener('DOMContentLoaded', () => {
  initStoricoFilters();
});

function loadStoricoList() {
  const container = document.getElementById('storicoList');
  if (!container) return;
  container.innerHTML = '';

  if (!loggedInUser) {
    container.innerHTML = '<p>Devi effettuare il login per vedere lo storico.</p>';
    return;
  }

  // Filtra abbonamenti venduti o acquistati andati a buon fine
  const storico = abbonamenti.filter(a =>
    a.stato === 'venduto' &&
    (a.utente === loggedInUser.username || a.buyerName === loggedInUser.username)
  );

  if (storico.length === 0) {
    container.innerHTML = '<p>Nessun abbonamento venduto o acquistato.</p>';
    return;
  }

  storico.forEach(abbon => {
    // Data e ora della vendita/acquisto (usa la proprietà abbon.dataVendita se presente, altrimenti mostra "Data non disponibile")
    const dataVendita = abbon.dataVendita ? abbon.dataVendita : 'Data non disponibile';
    const tipo = abbon.utente === loggedInUser.username ? 'Vendita' : 'Acquisto';
    const controparte = tipo === 'Vendita' ? abbon.buyerName : abbon.utente;
    container.innerHTML += `
      <div class="storico-item">
        <strong>${abbon.matchDesc}</strong><br/>
        <span>${tipo} - ${controparte ? 'Utente: ' + controparte : ''}</span><br/>
        <span>Data e ora: ${dataVendita}</span>
      </div>
    `;
  });
}

// --- Il tuo abbonamento ---
function loadMySubscription() {
  const container = document.getElementById('mySubscriptionContent');
  if (!container) return;

  if (!loggedInUser) {
    container.innerHTML = '<p>Devi effettuare il login per vedere le tue trattative.</p>';
    return;
  }

  // Trattative dove sei venditore
  const mieVendite = abbonamenti.filter(a => a.utente === loggedInUser.username && a.disponibile === true);

  // Trattative dove sei acquirente
  const mieAcquisti = abbonamenti.filter(a => a.buyerName === loggedInUser.username && a.inTrattativa === true && a.disponibile === true);

  container.innerHTML = '';

  // Sezioni venditore
  mieVendite.forEach(abbon => {
    const prezzo = prezziSettore[abbon.settore] || 'N/A';
    
    // Determina lo stato e il badge
    const haMessaggi = abbon.messaggiChat && abbon.messaggiChat.length > 0;
    const inTrattativa = abbon.inTrattativa === true || haMessaggi;
    const badgeClass = inTrattativa ? 'badge-trattativa' : 'badge-vendita';
    const badgeText = inTrattativa ? 'IN TRATTATIVA' : 'IN VENDITA';
    
    container.innerHTML += `
      <div class="abbo-card">
        <div class="card-header">
          <h3>${abbon.matchDesc}</h3>
          <span class="badge ${badgeClass}">${badgeText}</span>
        </div>
        <p>Settore: ${abbon.settore} - Prezzo: € ${formatPriceWithComma(prezzo)}</p>
        <p class="role-indicator"><strong>Ruolo:</strong> Venditore</p>
        <div class="row-actions">
          <button class="btn-open-chat" onclick="openChatModal('${abbon.id}')">Chat</button>
          <button class="btn-cancel-sale" onclick="annullaTrattativa('${abbon.id}')">Annulla/Cancella</button>
        </div>
      </div>
    `;
  });

  // Sezioni acquirente
  mieAcquisti.forEach(abbon => {
    const prezzo = prezziSettore[abbon.settore] || 'N/A';
    
    container.innerHTML += `
      <div class="abbo-card">
        <div class="card-header">
          <h3>${abbon.matchDesc}</h3>
          <span class="badge badge-trattativa">IN TRATTATIVA</span>
        </div>
        <p>Settore: ${abbon.settore} - Prezzo: € ${formatPriceWithComma(prezzo)}</p>
        <p class="role-indicator"><strong>Ruolo:</strong> Acquirente</p>
        <div class="row-actions">
          <button class="btn-open-chat" onclick="openChatModal('${abbon.id}')">Chat</button>
          <button class="btn-cancel-sale" onclick="annullaAcquisto('${abbon.id}')">Annulla acquisto</button>
        </div>
      </div>
    `;
  });

  if (container.innerHTML === '') {
    container.innerHTML = '<p>Nessuna trattativa aperta al momento.</p>';
  }
}

// --- SISTEMA NOTIFICHE AVANZATO ---
let notificationDropdownOpen = false;
let userReadMessages = JSON.parse(localStorage.getItem('userReadMessages')) || {};

// Inizializza i messaggi letti per l'utente corrente
function initUserReadMessages() {
  if (!loggedInUser) return;
  if (!userReadMessages[loggedInUser.username]) {
    userReadMessages[loggedInUser.username] = {};
  }
}

// Segna un messaggio come letto
function markMessageAsRead(abbonamentoId, messageIndex) {
  if (!loggedInUser) return;
  initUserReadMessages();
  
  if (!userReadMessages[loggedInUser.username][abbonamentoId]) {
    userReadMessages[loggedInUser.username][abbonamentoId] = [];
  }
  
  if (!userReadMessages[loggedInUser.username][abbonamentoId].includes(messageIndex)) {
    userReadMessages[loggedInUser.username][abbonamentoId].push(messageIndex);
    localStorage.setItem('userReadMessages', JSON.stringify(userReadMessages));
    updateNotificationCount();
  }
}

// Controlla se un messaggio è già letto
function isMessageRead(abbonamentoId, messageIndex) {
  if (!loggedInUser) return false;
  initUserReadMessages();
  
  const userMessages = userReadMessages[loggedInUser.username][abbonamentoId];
  return userMessages && userMessages.includes(messageIndex);
}

// Conta i messaggi non letti
function getUnreadCount() {
  if (!loggedInUser) return 0;
  
  let count = 0;
  abbonamenti.forEach(abbon => {
    if (!abbon.messaggiChat) return;
    
    abbon.messaggiChat.forEach((msg, index) => {
      // Conta solo messaggi ricevuti (non inviati dall'utente corrente) e non letti
      if (msg.sender !== loggedInUser.username && !isMessageRead(abbon.id, index)) {
        count++;
      }
    });
  });
  
  return count;
}

// Aggiorna il contatore delle notifiche
function updateNotificationCount() {
  if (!loggedInUser) return;

  const notificationBadge = document.getElementById('notificationCount');
  const count = getUnreadCount();

  if (count > 0) {
    notificationBadge.textContent = count > 99 ? '99+' : count;
    notificationBadge.classList.add('show');
  } else {
    notificationBadge.classList.remove('show');
  }
  
  // Aggiorna anche la lista delle notifiche se è aperta
  if (notificationDropdownOpen) {
    populateNotificationList();
  }
}

// Pulisce il contatore
function clearNotificationCount() {
  const notificationBadge = document.getElementById('notificationCount');
  if (notificationBadge) {
    notificationBadge.classList.remove('show');
    notificationBadge.textContent = '';
  }
}

// Apri/chiudi dropdown notifiche
function openNotifications() {
  if (!loggedInUser) {
    alert('Devi effettuare il login per aprire le notifiche.');
    toggleModal(true);
    return;
  }

  const dropdown = document.getElementById('notificationDropdown');
  notificationDropdownOpen = !notificationDropdownOpen;
  
  if (notificationDropdownOpen) {
    dropdown.style.display = 'block';
    populateNotificationList();
    // Chiudi se si clicca fuori
    setTimeout(() => {
      document.addEventListener('click', closeNotificationsOnClickOutside);
    }, 100);
  } else {
    dropdown.style.display = 'none';
    document.removeEventListener('click', closeNotificationsOnClickOutside);
  }
}

// Chiudi dropdown se si clicca fuori
function closeNotificationsOnClickOutside(event) {
  const bell = document.getElementById('notificationBell');
  const dropdown = document.getElementById('notificationDropdown');
  
  if (!bell.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.style.display = 'none';
    notificationDropdownOpen = false;
    document.removeEventListener('click', closeNotificationsOnClickOutside);
  }
}

// Popola la lista delle notifiche
function populateNotificationList() {
  const notificationList = document.getElementById('notificationList');
  
  // Raccogli tutti i messaggi con metadati
  let allNotifications = [];
  
  abbonamenti.forEach(abbon => {
    if (!abbon.messaggiChat || abbon.messaggiChat.length === 0) return;
    
    abbon.messaggiChat.forEach((msg, index) => {
      // Solo messaggi ricevuti (non inviati dall'utente corrente)
      if (msg.sender !== loggedInUser.username) {
        const isRead = isMessageRead(abbon.id, index);
        allNotifications.push({
          abbonamento: abbon,
          message: msg,
          messageIndex: index,
          isRead: isRead,
          timestamp: msg.timestamp || Date.now()
        });
      }
    });
  });
  
  // Ordina per timestamp (più recenti prima)
  allNotifications.sort((a, b) => b.timestamp - a.timestamp);
  
  if (allNotifications.length === 0) {
    notificationList.innerHTML = '<div class="no-notifications">Nessun nuovo messaggio</div>';
    return;
  }
  
  // Crea HTML per le notifiche
  let html = '';
  allNotifications.forEach(notif => {
    const timeString = formatNotificationTime(notif.timestamp);
    const isUnread = !notif.isRead;
    
    html += `
      <div class="notification-item ${isUnread ? 'unread' : ''}" 
           onclick="openChatFromNotification('${notif.abbonamento.id}', ${notif.messageIndex})">
        <div class="notification-item-header">
          <h4 class="notification-match">${notif.abbonamento.matchDesc}</h4>
          <span class="notification-time">${timeString}</span>
        </div>
        <p class="notification-message">
          <span class="notification-sender">${notif.message.sender}:</span>
          ${truncateMessage(notif.message.text, 60)}
        </p>
      </div>
    `;
  });
  
  notificationList.innerHTML = html;
}

// Apri chat da notifica e segna come letta
function openChatFromNotification(abbonamentoId, messageIndex) {
  const abbon = abbonamenti.find(a => a.id === abbonamentoId);
  if (!abbon) return;
  
  // Segna il messaggio come letto
  markMessageAsRead(abbonamentoId, messageIndex);
  
  // Apri la chat
  currentChatAbbonamento = abbon;
  document.getElementById('chatModal').classList.add('active');
  loadChatMessages();
  
  // Chiudi il dropdown
  document.getElementById('notificationDropdown').style.display = 'none';
  notificationDropdownOpen = false;
  document.removeEventListener('click', closeNotificationsOnClickOutside);
}

// Segna tutti i messaggi come letti
function markAllAsRead() {
  if (!loggedInUser) return;
  
  abbonamenti.forEach(abbon => {
    if (!abbon.messaggiChat) return;
    
    abbon.messaggiChat.forEach((msg, index) => {
      if (msg.sender !== loggedInUser.username) {
        markMessageAsRead(abbon.id, index);
      }
    });
  });
  
  updateNotificationCount();
  populateNotificationList();
}

// Formatta il tempo per le notifiche
function formatNotificationTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return 'Adesso';
  if (minutes < 60) return `${minutes}m fa`;
  if (hours < 24) return `${hours}h fa`;
  if (days < 7) return `${days}g fa`;
  
  const date = new Date(timestamp);
  return date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' });
}

// Tronca messaggio per anteprima
function truncateMessage(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// "Il mio abbonamento" cliccabile
const ticketSection = document.getElementById('ticket');
if(ticketSection){
  ticketSection.onclick = () => showSection('mySubscription');
}

// -------- PROSSIMA PARTITA IN CASA CON COUNTDOWN --------
function displayNextMatch() {
  const nextMatchSection = document.getElementById('nextMatchSection');
  if (!nextMatchSection) return;
  const match = getNextHomeMatch();
  if (!match) {
    nextMatchSection.style.display = 'none';
    return;
  }

  nextMatchSection.style.display = 'block';

  // Precarica i loghi locali dalla cartella /img basandosi sui nomi delle squadre nella descrizione
  const [homeName, awayName] = (match.description || '').split('-').map(s => s.trim());
  const localUrls = [getLogoSrcByTeamName(homeName || 'genoa'), getLogoSrcByTeamName(awayName || '')];

  ['homeTeamLogo','awayTeamLogo'].forEach((id, idx) => {
    const el = document.getElementById(id);
    if (el) {
      const url = localUrls[idx];
      const img = new Image();
      img.onload = () => { el.style.backgroundImage = `url(${url})`; };
      img.onerror = () => { el.style.backgroundImage = ''; };
      img.src = url;
    }
  });
  // Descrizione partita
  const descEl = document.getElementById('matchDescription');
  if (descEl) descEl.textContent = match.description;

  // Data e ora leggibile
  const dtText = `${formatDate(match.date)} ore ${match.time}`;
  const dtEl = document.getElementById('matchDateTime');
  if (dtEl) dtEl.textContent = dtText;

  // Avvia countdown
  startCountdown(match.date, match.time);
}

function getNextHomeMatch() {
  const now = new Date();
  const sorted = upcomingMatches.slice().sort((a,b) => new Date(a.date) - new Date(b.date));
  for(const match of sorted){
    const matchDateTime = new Date(match.date + "T" + match.time + ":00");
    if(matchDateTime > now) return match;
  }
  return null;
}

let countdownInterval = null;

function startCountdown(dateStr, timeStr){
  if(countdownInterval){
    clearInterval(countdownInterval);
  }
  const countdownEl = document.getElementById('countdown');
  function update(){
    const now = new Date();
    const target = new Date(dateStr + "T" + timeStr + ":00");
    const diff = target - now;

    if(diff <= 0){
      if (countdownEl) countdownEl.textContent = "Partita in corso o già giocata";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (countdownEl) countdownEl.textContent = `${days}g ${hours}h ${minutes}m ${seconds}s`;
  }
  update();
  countdownInterval = setInterval(update, 1000);
}

// --- Init affidabile ---
function initApp(){
  updateLoginLogoutButtons();
  
  // Mostra sempre la campanella
  const bell = document.getElementById('notificationBell');
  if (bell) {
    bell.style.display = 'flex';
    
    if(loggedInUser){
      updateNotificationCount();
      bell.style.opacity = '1';
      bell.style.cursor = 'pointer';
    } else {
      // Campanella visibile ma disabilitata quando non loggati
      bell.style.opacity = '0.5';
      bell.style.cursor = 'not-allowed';
      clearNotificationCount();
    }
  }
  
  if(!loggedInUser) {
    toggleModal(true); // mostra login all'apertura se non loggato
  }
  
  populateMatchSelect();
  populateSectorSelect();
  displayNextMatch();
}

// Avvio appena il DOM è pronto
document.addEventListener('DOMContentLoaded', initApp);

// --- Data/Ora live in header ---
function updateLiveDateTime(){
  const el = document.getElementById('liveDateTime');
  if(!el) return;
  const now = new Date();
  const dateStr = new Intl.DateTimeFormat('it-IT', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  }).format(now);
  const timeStr = new Intl.DateTimeFormat('it-IT', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(now);
  el.textContent = `${dateStr} - ${timeStr}`;
}
document.addEventListener('DOMContentLoaded', ()=>{
  updateLiveDateTime();
  setInterval(updateLiveDateTime, 1000);
});

// Handler acquisto locale
window.handleAcquista = function(id){
  console.log('🎯 handleAcquista chiamata con ID:', id);
  console.log('👤 Utente loggato:', loggedInUser);
  console.log('📦 Abbonamenti disponibili:', abbonamenti.length);
  
  if (!loggedInUser) {
    alert('Devi effettuare il login per aprire la trattativa.');
    toggleModal(true);
    return;
  }
  
  const abbon = abbonamenti.find(a => a.id === id);
  console.log('🎫 Abbonamento trovato:', abbon);
  if (!abbon) {
    console.error('❌ Abbonamento non trovato per ID:', id);
    return;
  }
  
  // Se non sei già in trattativa
  if (!abbon.buyerName) {
    abbon.buyerName = loggedInUser.username;
    abbon.inTrattativa = true;
    
    // � Salva SOLO su localStorage (stabile)
    localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
    
    // Firebase opzionale in background
    setTimeout(() => {
      try {
        updateAbbonamentoFirebase(abbon).catch(() => {});
      } catch (e) {}
    }, 100);
  }
  openChatModal(id);
  aggiornaTrattative();
};

// Trattative
function apriTrattativa(partita) {
  // Aggiungi la trattativa solo se non già presente
  if (!trattative.includes(partita)) {
    trattative.push(partita);
    aggiornaTrattative();
  }
  // Mostra badge aggiornato
  document.getElementById('mySubBadge').style.display = 'inline-block';
  document.getElementById('mySubBadge').textContent = trattative.length;
}

function aggiornaTrattative() {
  const container = document.getElementById('mySubscriptionContent');
  container.innerHTML = '';
  trattative.forEach((t) => {
    const div = document.createElement('div');
    div.className = 'trattativa-item';
    div.textContent = t;
    container.appendChild(div);
  });
}

function annullaTrattativa(id) {
  console.log('🗑️ annullaTrattativa chiamata con ID:', id);
  console.log('🔥 Firebase db disponibile:', !!db);
  
  // � Cancella SUBITO da localStorage (funziona sempre)
  abbonamenti = abbonamenti.filter(a => a.id !== id);
  localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
  
  loadHomeListings();
  loadMySubscription();
  updateBookingCounter();
  alert('Trattativa annullata e abbonamento cancellato.');
  
  // Firebase opzionale in background
  setTimeout(() => {
    try {
      db.collection('abbonamenti').doc(id).delete().catch(() => {});
    } catch (e) {}
  }, 100);
}

function annullaAcquisto(id) {
  const abbon = abbonamenti.find(a => a.id === id);
  if (!abbon) return;
  
  // Rimuovi solo la trattativa dell'acquirente
  if (abbon.buyerName === loggedInUser.username) {
    abbon.buyerName = null;
    abbon.inTrattativa = false;
    
    // 🔥 Aggiorna Firebase
    updateAbbonamentoFirebase(abbon).then(() => {
      console.log('✅ Trattativa annullata su Firebase');
    }).catch(err => {
      console.error('❌ Errore aggiornamento Firebase:', err);
    });
    
    localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
    loadMySubscription();
    updateBookingCounter();
    alert('Hai annullato la trattativa.');
  }
}

function accettaProposta(id) {
  const abbon = abbonamenti.find(a => a.id === id);
  if (!abbon) return;
  
  abbon.stato = 'venduto';
  abbon.disponibile = false;
  abbon.inTrattativa = false;
  abbon.sellerConfirmed = true;
  
  // 🔥 Aggiorna Firebase
  updateAbbonamentoFirebase(abbon).then(() => {
    console.log('✅ Proposta accettata su Firebase');
  }).catch(err => {
    console.error('❌ Errore aggiornamento Firebase:', err);
  });
  
  localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
  alert('Hai accettato la proposta! Trattativa conclusa.');
  updateProfileStats();
  closeChatModal();
  loadHomeListings();
  loadMySubscription();
  showSection('mySubscription');
  openDatiVenditaModal(abbon);
}

function rifiutaProposta(id) {
  const abbon = abbonamenti.find(a => a.id === id);
  if (!abbon) return;
  
  abbon.buyerName = null;
  abbon.inTrattativa = false;
  
  // 🔥 Aggiorna Firebase
  updateAbbonamentoFirebase(abbon).then(() => {
    console.log('✅ Proposta rifiutata su Firebase');
  }).catch(err => {
    console.error('❌ Errore aggiornamento Firebase:', err);
  });
  
  localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
  alert('Hai rifiutato la proposta. La trattativa è stata annullata.');
  closeChatModal();
  loadHomeListings();
  loadMySubscription();
}

// Nuove funzioni per inviare dati di vendita
function openDatiVenditaModal(abbon) {
  const modal = document.getElementById('datiVenditaModal');
  if (!modal) return;
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeDatiVenditaModal()">×</span>
      <h2>Invia i tuoi dati all'acquirente</h2>
      <p>Per accordarti sul pagamento, invia i tuoi dati di contatto:</p>
      <form id="datiVenditaForm">
        <label>Email:</label>
        <input type="email" id="datiVenditaEmail" value="${loggedInUser.email}" required />
        <label>Telefono:</label>
        <input type="text" id="datiVenditaTelefono" value="${loggedInUser.telefono}" required />
        <button type="submit" class="btn-accept" style="background:#2ecc40;color:#fff;">Invia dati</button>
      </form>
    </div>
  `;
  modal.style.display = 'flex';

  document.getElementById('datiVenditaForm').onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('datiVenditaEmail').value;
    const telefono = document.getElementById('datiVenditaTelefono').value;
    abbon.messaggiChat.push({
      sender: loggedInUser.username,
      text: `Dati per il pagamento: Email: ${email}, Telefono: ${telefono}`
    });
    localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
    closeDatiVenditaModal();
    alert('Dati inviati all\'acquirente tramite chat!');
    loadChatMessages();
  };
}

function closeDatiVenditaModal() {
  const modal = document.getElementById('datiVenditaModal');
  if (modal) modal.style.display = 'none';
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  if (!input || !currentChatAbbonamento || !loggedInUser) return;
  const text = input.value.trim();
  if (!text) return;
  
  // Aggiungi messaggio con timestamp
  currentChatAbbonamento.messaggiChat.push({
    sender: loggedInUser.username,
    text: text,
    timestamp: Date.now()
  });
  
  // � Salva SUBITO su localStorage
  localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
  
  // Firebase opzionale
  setTimeout(() => {
    try {
      updateAbbonamentoFirebase(currentChatAbbonamento).catch(() => {});
    } catch (e) {}
  }, 100);
  input.value = '';
  loadChatMessages();
  updateNotificationCount();
  
  // 📧 Invia email notification al destinatario
  try {
    const recipientUsername = currentChatAbbonamento.utente === loggedInUser.username 
      ? currentChatAbbonamento.buyerName 
      : currentChatAbbonamento.utente;
    
    const recipient = users.find(u => u.username === recipientUsername);
    
    if (recipient && recipient.email) {
      EmailService.sendNewMessageNotification(
        recipient,
        loggedInUser,
        text,
        currentChatAbbonamento.matchDesc
      ).then(() => {
        console.log('📧 Email notification inviata');
      }).catch(err => {
        console.log('⚠️ Email notification fallita:', err);
      });
    }
  } catch (error) {
    console.log('Errore email notification:', error);
  }
}

// Inizializzazione del sito quando il DOM è caricato
document.addEventListener('DOMContentLoaded', () => {
  console.log('Inizializzazione sito Ti Presto...');
  
  // 🔥 Sincronizza dati Firebase
  syncFirebaseData();
  
  // Inizializza UI
  updateLoginLogoutButtons();
  
  // Se c'è un utente loggato, aggiorna l'interfaccia
  if (loggedInUser) {
    updateUIAfterLogin();
  } else {
    updateUIAfterLogout();
  }
  
  // Mostra la sezione home di default
  showSection('home');
  
  // Avvia aggiornamento data/ora
  updateLiveDateTime();
  setInterval(updateLiveDateTime, 1000);
  
  console.log('Sito inizializzato correttamente!');
});

// Funzione per aggiornare data e ora in tempo reale
function updateLiveDateTime() {
  const now = new Date();
  const dateTimeElement = document.getElementById('liveDateTime');
  if (dateTimeElement) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    dateTimeElement.textContent = now.toLocaleDateString('it-IT', options);
  }
}

// Event listener per tasto Enter nella chat e inizializzazione preferenze
document.addEventListener('DOMContentLoaded', function() {
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    });
  }
  
  // Inizializza i toggle delle preferenze
  const toggles = document.querySelectorAll('.toggle-switch input');
  toggles.forEach(toggle => {
    toggle.addEventListener('change', function() {
      if (loggedInUser) {
        saveUserPreferences();
        const prefName = this.id.replace('Notifications', '');
        const status = this.checked ? 'attivate' : 'disattivate';
        showToast(`🔔 Notifiche ${prefName} ${status}`, 'info');
      }
    });
  });
  
  // ESC key closes modals
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      // Find any open modal and close it
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => {
        if (modal.style.display === 'flex') {
          modal.style.display = 'none';
          modal.onclick = null;
        }
      });
      
      // Also hide cookie banner if open
      const banner = document.getElementById('cookieBanner');
      if (banner && banner.style.display !== 'none') {
        hideCookieBanner();
      }
    }
  });
  
  // Check cookie consent after page load
  setTimeout(checkCookieConsent, 500);
});

// ===============================
// GDPR & PRIVACY FUNCTIONS
// ===============================

// Cookie Management
const CookieManager = {
    // Cookie categories configuration
    categories: {
        essential: {
            name: 'Cookie Essenziali',
            required: true,
            description: 'Necessari per il funzionamento base del sito',
            cookies: ['user-session', 'auth-token', 'csrf-protection']
        },
        functional: {
            name: 'Cookie Funzionali',
            required: false,
            description: 'Migliorano l\'esperienza utente con funzioni aggiuntive',
            cookies: ['theme-preference', 'language-setting', 'layout-config']
        },
        analytics: {
            name: 'Cookie Analytics',
            required: false,
            description: 'Ci aiutano a capire come viene utilizzato il sito',
            cookies: ['ga-tracking', 'page-views', 'user-behavior']
        },
        marketing: {
            name: 'Cookie Marketing',
            required: false,
            description: 'Utilizzati per personalizzare annunci e contenuti',
            cookies: ['ad-preferences', 'social-media', 'retargeting']
        }
    },

    // Get current consent status
    getConsent: function() {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) return null;
        try {
            return JSON.parse(consent);
        } catch {
            return null;
        }
    },

    // Save consent preferences
    saveConsent: function(preferences) {
        const consent = {
            timestamp: new Date().toISOString(),
            version: '1.0',
            preferences: preferences
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consent));
        this.applyCookieSettings(preferences);
    },

    // Apply cookie settings based on consent
    applyCookieSettings: function(preferences) {
        // Essential cookies are always enabled
        preferences.essential = true;

        // Clean up non-consented cookies
        for (const [category, allowed] of Object.entries(preferences)) {
            if (!allowed && this.categories[category]) {
                this.categories[category].cookies.forEach(cookie => {
                    this.deleteCookie(cookie);
                });
            }
        }

        // Log consent for audit trail
        console.log('Cookie preferences applied:', preferences);
    },

    // Delete a specific cookie
    deleteCookie: function(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    },

    // Check if consent is needed
    needsConsent: function() {
        const consent = this.getConsent();
        return !consent || this.isConsentExpired(consent);
    },

    // Check if consent has expired (1 year)
    isConsentExpired: function(consent) {
        if (!consent || !consent.timestamp) return true;
        const consentDate = new Date(consent.timestamp);
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        return consentDate < oneYearAgo;
    }
};

// Show cookie banner if needed
function checkCookieConsent() {
    if (CookieManager.needsConsent()) {
        showCookieBanner();
    }
}

// Show cookie banner
function showCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.style.display = 'block';
    }
}

// Hide cookie banner
function hideCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.style.display = 'none';
    }
}

// Accept all cookies
function acceptAllCookies() {
    const allCategories = {};
    Object.keys(CookieManager.categories).forEach(category => {
        allCategories[category] = true;
    });
    
    CookieManager.saveConsent(allCategories);
    hideCookieBanner();
    
    showToast('Tutte le impostazioni dei cookie sono state accettate', 'success');
}

// Reject non-essential cookies
function rejectCookies() {
    const essentialOnly = {};
    Object.keys(CookieManager.categories).forEach(category => {
        essentialOnly[category] = CookieManager.categories[category].required;
    });
    
    CookieManager.saveConsent(essentialOnly);
    hideCookieBanner();
    
    showToast('Accettati solo i cookie essenziali', 'info');
}

// Generic modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        
        // Add click outside to close functionality
        modal.onclick = function(e) {
            if (e.target === modal) {
                closeModal(modalId);
            }
        };
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        modal.onclick = null; // Remove event listener
    }
}

// Show cookie settings modal
function showCookieSettings() {
    hideCookieBanner();
    
    // Populate current settings
    const consent = CookieManager.getConsent();
    const preferences = consent ? consent.preferences : {};
    
    Object.keys(CookieManager.categories).forEach(category => {
        const toggle = document.getElementById(`cookie-${category}`);
        if (toggle) {
            toggle.checked = preferences[category] !== false;
            // Disable essential cookies toggle
            if (CookieManager.categories[category].required) {
                toggle.disabled = true;
                toggle.checked = true;
            }
        }
    });
    
    openModal('cookieSettingsModal');
}

// Save cookie preferences from modal
function saveCookiePreferences() {
    const preferences = {};
    
    Object.keys(CookieManager.categories).forEach(category => {
        const toggle = document.getElementById(`cookie-${category}`);
        if (toggle) {
            preferences[category] = toggle.checked;
        }
    });
    
    CookieManager.saveConsent(preferences);
    closeModal('cookieSettingsModal');
    
    showToast('Preferenze cookie salvate con successo', 'success');
}

// Privacy Policy Functions
function showPrivacyPolicy() {
    openModal('privacyPolicyModal');
}

// Data Export Function
function exportUserData() {
    if (!currentUser) {
        showToast('Devi essere autenticato per esportare i tuoi dati', 'error');
        return;
    }

    try {
        // Gather all user data
        const userData = {
            profile: {
                username: currentUser.username,
                nome: currentUser.nome,
                cognome: currentUser.cognome,
                email: currentUser.email,
                telefono: currentUser.telefono,
                dataNascita: currentUser.dataNascita,
                registrationDate: currentUser.registrationDate || 'N/D'
            },
            subscriptions: abbonamenti.filter(abb => abb.utente === currentUser.username),
            cookieConsent: CookieManager.getConsent(),
            exportDate: new Date().toISOString(),
            dataVersion: '1.0'
        };

        // Create downloadable file
        const dataBlob = new Blob([JSON.stringify(userData, null, 2)], 
            { type: 'application/json' });
        const downloadUrl = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `ti-presto-data-${currentUser.username}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(downloadUrl);
        
        showToast('I tuoi dati sono stati esportati con successo', 'success');
        
    } catch (error) {
        console.error('Error exporting user data:', error);
        showToast('Errore durante l\'esportazione dei dati', 'error');
    }
}

// Account Deletion Function  
function deleteAccount() {
    if (!currentUser) {
        showToast('Devi essere autenticato per eliminare l\'account', 'error');
        return;
    }

    const confirmDelete = confirm(`
        ATTENZIONE: Eliminazione Account
        
        Stai per eliminare permanentemente il tuo account "${currentUser.username}".
        
        Questa azione:
        • Eliminerà tutti i tuoi dati personali
        • Rimuoverà tutti i tuoi annunci di abbonamenti  
        • Non potrà essere annullata
        
        Sei sicuro di voler procedere?
    `);

    if (!confirmDelete) return;

    const finalConfirm = confirm(`
        CONFERMA FINALE
        
        Digita "ELIMINA" nel prossimo prompt per confermare l'eliminazione dell'account.
        
        Procedere?
    `);

    if (!finalConfirm) return;

    const deleteConfirmation = prompt('Digita "ELIMINA" per confermare l\'eliminazione definitiva dell\'account:');
    
    if (deleteConfirmation !== 'ELIMINA') {
        showToast('Eliminazione annullata - testo di conferma errato', 'info');
        return;
    }

    try {
        // Remove user subscriptions
        abbonamenti = abbonamenti.filter(abb => abb.utente !== currentUser.username);
        localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
        
        // Remove user account
        users = users.filter(user => user.username !== currentUser.username);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Clear user session
        localStorage.removeItem('currentUser');
        currentUser = null;
        
        // Clear cookie consent for this user
        localStorage.removeItem('cookieConsent');
        
        // Update UI
        updateLoginStatus();
        showSection('home');
        
        showToast('Account eliminato con successo. Tutti i tuoi dati sono stati rimossi.', 'success');
        
    } catch (error) {
        console.error('Error deleting account:', error);
        showToast('Errore durante l\'eliminazione dell\'account', 'error');
    }
}

// Privacy utility functions
function getPrivacyCompliantDate(date) {
    return date ? new Date(date).toLocaleDateString('it-IT') : 'N/D';
}

// Debug function to test cookie banner (remove in production)
function testCookieBanner() {
    localStorage.removeItem('cookieConsent');
    showCookieBanner();
}

// Make debug function available in console
window.testCookieBanner = testCookieBanner;

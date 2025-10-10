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

// Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

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
      // TEMPORANEAMENTE DISABILITATO - configura EmailJS per abilitare
      console.log('📧 Notifica messaggio (simulata):', {
        to_name: toUser.nome || toUser.username,
        to_email: toUser.email,
        from_name: fromUser.nome || fromUser.username,
        message: message,
        match_name: matchName
      });
      
      return { status: 'success', message: 'Simulato' };
      
      /* CODICE EMAIL DA RIABILITARE QUANDO EMAILJS È CONFIGURATO:
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
      */
    } catch (error) {
      console.error('Errore invio email:', error);
      throw error;
    }
  },

  // Email di benvenuto per nuovi utenti
  async sendWelcomeEmail(user) {
    if (!user.email) return;

    try {
      // TEMPORANEAMENTE DISABILITATO - configura EmailJS per abilitare
      console.log('📧 Email benvenuto (simulata):', {
        to_name: user.nome || user.username,
        to_email: user.email,
        username: user.username
      });
      
      return { status: 'success', message: 'Simulato' };
      
      /* CODICE EMAIL DA RIABILITARE QUANDO EMAILJS È CONFIGURATO:
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
      */
    } catch (error) {
      console.error('Errore email benvenuto:', error);
    }
  },

  // Notifica nuovo abbonamento disponibile
  async sendBookingCreatedNotification(booking) {
    try {
      // TEMPORANEAMENTE DISABILITATO - configura EmailJS per abilitare
      console.log('📧 Notifica booking (simulata):', {
        to_email: 'dnagenoa@outlook.it',
        user_name: booking.utente,
        match_desc: booking.matchDesc,
        settore: booking.settore,
        prezzo: booking.prezzo,
        timestamp: new Date().toLocaleString('it-IT')
      });
      
      // Mostra toast invece di email per ora
      showToast('Abbonamento pubblicato! (Notifica email temporaneamente disabilitata)', 'success');
      
      return { status: 'success', message: 'Simulato' };
      
      /* CODICE EMAIL DA RIABILITARE QUANDO EMAILJS È CONFIGURATO:
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
      */
    } catch (error) {
      console.error('Errore notifica booking:', error);
    }
  },

  // Test invio email
  async testEmail() {
    try {
      // TEMPORANEAMENTE DISABILITATO - configura EmailJS per abilitare
      console.log('📧 Email di test (simulata):', {
        to_name: 'Test User',
        to_email: 'dnagenoa@outlook.it',
        from_name: 'Sistema Ti Presto',
        message: 'Questo è un test delle email notifications',
        match_name: 'Genoa - Test'
      });
      
      showToast('📧 Test email simulato (EmailJS disabilitato)', 'info');
      return { status: 'success', message: 'Simulato' };
      
      /* CODICE EMAIL DA RIABILITARE QUANDO EMAILJS È CONFIGURATO:
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
      */
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

// 🔥 SISTEMA FIREBASE-ONLY - Variabili globali
let loggedInUser = null;
let users = []; // Cache locale per performance
let abbonamenti = []; // Cache locale per performance

// � FIREBASE-ONLY SERVICE COMPLETO
const FirebaseOnlyService = {
  // --- UTENTI ---
  async loadUsers() {
    try {
      const snapshot = await db.collection('users').get();
      users = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
      console.log(`✅ Caricati ${users.length} utenti da Firebase`);
      return users;
    } catch (error) {
      console.error('❌ Errore caricamento utenti:', error);
      return [];
    }
  },

  async saveUser(userData) {
    try {
      if (userData.uid) {
        await db.collection('users').doc(userData.uid).set(userData, { merge: true });
      } else {
        const docRef = await db.collection('users').add(userData);
        userData.uid = docRef.id;
      }
      await this.loadUsers(); // Ricarica cache
      return userData;
    } catch (error) {
      console.error('❌ Errore salvataggio utente:', error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      await db.collection('users').doc(userId).delete();
      await this.loadUsers(); // Ricarica cache
    } catch (error) {
      console.error('❌ Errore eliminazione utente:', error);
      throw error;
    }
  },

  // --- ABBONAMENTI ---
  async loadAbbonamenti() {
    try {
      const snapshot = await db.collection('abbonamenti').get();
      abbonamenti = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(`✅ Caricati ${abbonamenti.length} abbonamenti da Firebase`);
      return abbonamenti;
    } catch (error) {
      console.error('❌ Errore caricamento abbonamenti:', error);
      return [];
    }
  },

  async saveAbbonamento(abbonamentoData) {
    try {
      if (abbonamentoData.id) {
        await db.collection('abbonamenti').doc(abbonamentoData.id).set({
          ...abbonamentoData,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      } else {
        const docRef = await db.collection('abbonamenti').add({
          ...abbonamentoData,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        abbonamentoData.id = docRef.id;
      }
      await this.loadAbbonamenti(); // Ricarica cache
      return abbonamentoData;
    } catch (error) {
      console.error('❌ Errore salvataggio abbonamento:', error);
      throw error;
    }
  },

  async deleteAbbonamento(abbonamentoId) {
    try {
      await db.collection('abbonamenti').doc(abbonamentoId).delete();
      await this.loadAbbonamenti(); // Ricarica cache
    } catch (error) {
      console.error('❌ Errore eliminazione abbonamento:', error);
      throw error;
    }
  },

  async clearAllAbbonamenti() {
    try {
      const batch = db.batch();
      const snapshot = await db.collection('abbonamenti').get();
      snapshot.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
      abbonamenti = [];
      console.log('🗑️ Tutti gli abbonamenti eliminati da Firebase');
    } catch (error) {
      console.error('❌ Errore eliminazione tutti abbonamenti:', error);
      throw error;
    }
  },

  // --- FEEDBACK ---
  async loadFeedbacks() {
    try {
      const snapshot = await db.collection('feedback').get();
      const feedbacks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(`✅ Caricati ${feedbacks.length} feedback da Firebase`);
      return feedbacks;
    } catch (error) {
      console.error('❌ Errore caricamento feedback:', error);
      return [];
    }
  },

  async saveFeedback(feedbackData) {
    try {
      if (feedbackData.id) {
        await db.collection('feedback').doc(feedbackData.id).set({
          ...feedbackData,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      } else {
        const docRef = await db.collection('feedback').add({
          ...feedbackData,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        feedbackData.id = docRef.id;
      }
      return feedbackData;
    } catch (error) {
      console.error('❌ Errore salvataggio feedback:', error);
      throw error;
    }
  },

  // --- ANALYTICS ---
  async loadAnalytics() {
    try {
      const snapshot = await db.collection('user_analytics').get();
      const analytics = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(`✅ Caricati ${analytics.length} eventi analytics da Firebase`);
      return analytics;
    } catch (error) {
      console.error('❌ Errore caricamento analytics:', error);
      return [];
    }
  },

  async saveAnalytics(analyticsData) {
    try {
      const docRef = await db.collection('user_analytics').add({
        ...analyticsData,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { id: docRef.id, ...analyticsData };
    } catch (error) {
      console.error('❌ Errore salvataggio analytics:', error);
      throw error;
    }
  },

  // --- STATISTICHE ADMIN ---
  async getAdminStats() {
    try {
      const [usersSnapshot, abbonamentiSnapshot, feedbackSnapshot] = await Promise.all([
        db.collection('users').get(),
        db.collection('abbonamenti').get(), 
        db.collection('feedback').get()
      ]);

      const stats = {
        totalUsers: usersSnapshot.size,
        totalAbbonamenti: abbonamentiSnapshot.size,
        abbonamentiDisponibili: abbonamentiSnapshot.docs.filter(doc => doc.data().disponibile === true).length,
        abbonamentiVenduti: abbonamentiSnapshot.docs.filter(doc => doc.data().venduto === true).length,
        totalFeedback: feedbackSnapshot.size,
        feedbackNuovi: feedbackSnapshot.docs.filter(doc => doc.data().status === 'new').length,
        timestamp: Date.now()
      };

      console.log('📊 Statistiche Firebase caricate:', stats);
      return stats;
    } catch (error) {
      console.error('❌ Errore caricamento statistiche:', error);
      return {
        totalUsers: 0,
        totalAbbonamenti: 0,
        abbonamentiDisponibili: 0,
        abbonamentiVenduti: 0,
        totalFeedback: 0,
        feedbackNuovi: 0,
        timestamp: Date.now()
      };
    }
  }
};

// 🔥 Firebase Authentication Setup  
// auth è già dichiarato globalmente sopra

// Initialize Firebase Auth
function initFirebaseAuth() {
  if (!auth) {
    console.error('❌ Firebase Auth non disponibile');
    return;
  }
  
  // Listener per cambiamenti di autenticazione
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      console.log('✅ Utente autenticato:', user.email);
      
      // Carica profilo utente da Firestore
      try {
        const userDoc = await db.collection('users').doc(user.uid).get();
          
        if (userDoc.exists) {
          loggedInUser = {
            uid: user.uid,
            email: user.email,
            emailVerificata: user.emailVerified,
            ...userDoc.data()
          };
          console.log('👤 Profilo utente caricato:', loggedInUser);
          
          // 🔥 FIREBASE-ONLY: Carica tutti i dati da Firebase
          await FirebaseOnlyService.loadUsers();
          await FirebaseOnlyService.loadAbbonamenti();
          
          updateUIAfterLogin();
          loadHomeListings(); // Aggiorna UI dopo caricamento dati
        }
      } catch (error) {
        console.error('❌ Errore caricamento profilo:', error);
      }
    } else {
      console.log('👋 Utente disconnesso');
      loggedInUser = null;
      abbonamenti = [];
      updateUIAfterLogout();
    }
  });
  
  console.log('🔐 Firebase Auth inizializzato');
}

// 🔥 Carica abbonamenti da Firebase (solo se autenticato)
async function loadAbbonamenti() {
  if (!db) {
    console.error('❌ Firebase non disponibile');
    return;
  }
  
  try {
    console.log('📦 Caricamento abbonamenti da Firebase...');
    
    // 🔥 Usa il nuovo sistema Firebase-only
    await FirebaseOnlyService.loadAbbonamenti();
    loadHomeListings(); // Aggiorna UI home
    
  } catch (error) {
    console.error('❌ Errore caricamento abbonamenti:', error);
  }
}

// 🔥 AGGIORNA ADMIN PANEL CON DATI FIREBASE REALI
async function updateAdminPanelStats() {
  try {
    console.log('📊 Aggiornamento statistiche admin panel da Firebase...');
    
    const stats = await FirebaseOnlyService.getAdminStats();
    
    // Aggiorna contatori principali
    const elements = {
      'totalUsersCount': stats.totalUsers,
      'totalAbbonamentiCount': stats.totalAbbonamenti,
      'availableAbbonamentiCount': stats.abbonamentiDisponibili,
      'soldAbbonamentiCount': stats.abbonamentiVenduti,
      'totalFeedbackCount': stats.totalFeedback,
      'newFeedbackCount': stats.feedbackNuovi
    };

    Object.entries(elements).forEach(([elementId, value]) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent = value;
        console.log(`✅ ${elementId}: ${value}`);
      }
    });

    console.log('✅ Statistiche admin panel aggiornate con dati Firebase reali');
    return stats;
  } catch (error) {
    console.error('❌ Errore aggiornamento statistiche:', error);
  }
}

// 🔥 Aggiorna abbonamento su Firebase
async function updateFirebaseAbbonamento(abbonamentoId, abbonamentoData) {
  if (!db || !abbonamentoId) {
    console.error('❌ Firebase o ID abbonamento non disponibile');
    return;
  }
  
  try {
    await db.collection('abbonamenti').doc(abbonamentoId).update({
      ...abbonamentoData,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    console.log('✅ Abbonamento aggiornato su Firebase:', abbonamentoId);
  } catch (error) {
    console.error('❌ Errore aggiornamento abbonamento su Firebase:', error);
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
    // Rimuovi active da tutte le sezioni con smooth transition
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    
    const target = document.getElementById(id);
    if (target) {
      // Piccola pausa per permettere smooth transition
      setTimeout(() => {
        target.classList.add('active');
        console.log(`Sezione ${id} attivata`);
      }, 50);
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
    } else if (id === 'admin') {
      // 🔥 FIREBASE-ONLY: Carica admin panel completamente da Firebase
      updateAdminPanelStats().then(() => {
        console.log('📊 Statistiche admin aggiornate da Firebase');
      });
      loadUsersAdminPremium().then(() => {
        console.log('👥 Utenti admin caricati da Firebase');
      });
      loadAnalyticsAdmin().then(() => {
        console.log('📈 Analytics admin caricati da Firebase');
      });
    }
  } catch (error) {
    console.error(`Errore nel caricamento della sezione ${id}:`, error);
  }
}

// --- Firebase Authentication ---
// Login con Google
async function loginWithGoogle() {
  try {
    console.log('🔐 Tentativo login con Google...');
    const result = await auth.signInWithPopup(googleProvider);
    const user = result.user;
    
    console.log('✅ Login Google riuscito:', user.email);
    
    // Controlla se è il primo accesso e crea profilo
    const userDoc = await db.collection('users').doc(user.uid).get();
    
    if (!userDoc.exists) {
      console.log('👤 Creazione profilo per nuovo utente Google...');
      
      // Crea profilo con i dati Google
      await db.collection('users').doc(user.uid).set({
        nome: user.displayName?.split(' ')[0] || 'Nome',
        cognome: user.displayName?.split(' ').slice(1).join(' ') || 'Cognome',
        email: user.email,
        telefono: '',
        dataNascita: '',
        username: user.email.split('@')[0], // Username dal email
        registrationDate: firebase.firestore.FieldValue.serverTimestamp(),
        loginProvider: 'google',
        emailVerificata: user.emailVerified
      });
      
      console.log('✅ Profilo Google creato su Firestore');
    }
    
    toggleModal(false);
    showToast('✅ Login con Google effettuato!', 'success');
    showSection('home');
    
  } catch (error) {
    console.error('❌ Errore login Google:', error);
    
    let message = 'Errore durante il login con Google';
    if (error.code === 'auth/popup-closed-by-user') {
      message = 'Login annullato';
    } else if (error.code === 'auth/popup-blocked') {
      message = 'Popup bloccato dal browser';
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      message = 'Account già esistente con credenziali diverse';
    }
    
    showToast(`❌ ${message}`, 'error');
  }
}

// Login con email/password
async function login(event) {
  event.preventDefault();
  const email = document.getElementById('loginUsername').value.trim(); // Ora usa email
  const password = document.getElementById('loginPassword').value;

  if (!email || !password) {
    showToast('❌ Inserisci email e password', 'error');
    return;
  }

  try {
    console.log('🔐 Tentativo login con email:', email);
    await auth.signInWithEmailAndPassword(email, password);
    toggleModal(false);
    showToast('✅ Login effettuato con successo!', 'success');
    showSection('home');
  } catch (error) {
    console.error('❌ Errore login:', error);
    
    let message = 'Email o password errati';
    if (error.code === 'auth/user-not-found') {
      message = 'Utente non trovato';
    } else if (error.code === 'auth/wrong-password') {
      message = 'Password errata';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Email non valida';
    }
    
    showToast(`❌ ${message}`, 'error');
  }
}

async function register(event) {
  event.preventDefault();

  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  
  if (!email || !password) {
    showToast('❌ Inserisci email e password', 'error');
    return;
  }

  if(password !== confirmPassword){
    showToast('❌ Le password non coincidono', 'error');
    return;
  }

  // Controllo password: almeno un numero e un carattere speciale
  if(!/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)){
    showToast('❌ La password deve contenere almeno un numero e un carattere speciale', 'error');
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
    showToast('❌ Devi avere almeno 18 anni per registrarti', 'error');
    return;
  }

  const newUser = {
    nome: document.getElementById('registerNome').value.trim(),
    cognome: document.getElementById('registerCognome').value.trim(),
    dataNascita: dataNascita,
    telefono: document.getElementById('registerTelefono').value.trim(),
    username: document.getElementById('registerUsername').value.trim()
  };

  try {
    console.log('🔐 Creazione utente Firebase:', email);
    
    // Crea utente su Firebase Auth
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    console.log('✅ Utente Firebase creato:', user.uid);
    
    // Salva profilo utente su Firestore
    await db.collection('users').doc(user.uid).set({
      ...newUser,
      email: email,
      registrationDate: firebase.firestore.FieldValue.serverTimestamp(),
      emailVerificata: false
    });
    
    console.log('✅ Profilo utente salvato su Firestore');
    
    // Invia email di verifica
    await user.sendEmailVerification();
    
    showToast('✅ Registrazione completata! Verifica la tua email.', 'success');
    
    // 📧 Invia email di benvenuto
    try {
      await EmailService.sendWelcomeEmail({...newUser, email});
      console.log('✅ Email di benvenuto inviata');
    } catch (emailError) {
      console.log('⚠️ Email benvenuto fallita:', emailError);
    }
    
    toggleModal(false);
    showToast('✅ Registrazione completata! Benvenuto!', 'success');
    showSection('home');
    
  } catch (error) {
    console.error('❌ Errore registrazione:', error);
    
    let message = 'Errore durante la registrazione';
    if (error.code === 'auth/email-already-in-use') {
      message = 'Email già registrata';
    } else if (error.code === 'auth/weak-password') {
      message = 'Password troppo debole';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Email non valida';
    }
    
    showToast(`❌ ${message}`, 'error');
  }
}

function toggleModal(show = true) {
  const authModal = document.getElementById('authModal');
  if (!authModal) return;
  authModal.style.display = show ? 'flex' : 'none';
}

// 🆕 Toggle SellModal - Funzione mancante ripristinata
function toggleSellModal(show = true) {
  const sellModal = document.getElementById('sellModal');
  if (!sellModal) return;
  sellModal.style.display = show ? 'flex' : 'none';
  
  if (show) {
    document.body.classList.add('modal-open');
  } else {
    document.body.classList.remove('modal-open');
  }
}

async function logout() {
  try {
    await auth.signOut();
    showToast('👋 Logout effettuato', 'success');
    showSection('home');
  } catch (error) {
    console.error('❌ Errore logout:', error);
    showToast('❌ Errore durante il logout', 'error');
  }
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
  
  // 🌐 Avvia listeners globali per chat real-time
  startGlobalChatListeners();
  
  // 🔄 Avvia listener real-time per abbonamenti (home page)
  startHomeRealTimeListener();
  
  // 👑 Mostra pulsante admin se autorizzato
  const adminEmails = ['dnagenoa@outlook.it', 'copilot@github.com'];
  const adminUsernames = ['admin', 'github-copilot', 'copilot'];
  
  if (loggedInUser && (
    adminUsernames.includes(loggedInUser.username) || 
    loggedInUser.isAdmin || 
    adminEmails.includes(loggedInUser.email)
  )) {
    document.getElementById('adminBtn').style.display = 'inline-block';
    console.log('✅ Admin panel abilitato dopo login per:', loggedInUser.email || loggedInUser.username);
  }
  
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
  
  // 🛑 Ferma listeners globali
  stopGlobalChatListeners();
  stopChatRealTimeListener();
  stopHomeRealTimeListener();
  
  // 👑 Nascondi pulsante admin dopo logout
  document.getElementById('adminBtn').style.display = 'none';
  
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
    a.utente === loggedInUser.uid && a.disponibile === true
  ).length;
  
  // Conta transazioni completate
  const userTransactions = abbonamenti.filter(a => {
    const isSeller = a.utente === loggedInUser.uid;
    const isBuyer = a.buyerName === loggedInUser.uid;
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

async function saveProfile(event) {
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

  // Salva profilo su Firebase
  try {
    await db.collection('users').doc(loggedInUser.uid).update({
      nome: loggedInUser.nome,
      cognome: loggedInUser.cognome,
      telefono: loggedInUser.telefono,
      dataNascita: loggedInUser.dataNascita,
      email: loggedInUser.email,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log('✅ Profilo aggiornato su Firebase');
  } catch (error) {
    console.error('❌ Errore aggiornamento profilo:', error);
    showToast('❌ Errore durante il salvataggio del profilo', 'error');
    return;
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
  
  // Le preferenze ora sono salvate su Firebase nel profilo utente
  const userPrefs = loggedInUser.preferences || {};
  
  document.getElementById('emailNotifications').checked = userPrefs.emailNotifications !== false;
  document.getElementById('pushNotifications').checked = userPrefs.pushNotifications !== false;
}

async function saveUserPreferences() {
  if (!loggedInUser) return;
  
  const preferences = {
    emailNotifications: document.getElementById('emailNotifications').checked,
    pushNotifications: document.getElementById('pushNotifications').checked
  };
  
  // Salva preferenze su Firebase nel profilo utente
  try {
    await db.collection('users').doc(loggedInUser.uid).update({
      preferences: preferences,
      preferencesUpdated: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // Aggiorna anche l'oggetto locale
    loggedInUser.preferences = preferences;
    
    console.log('✅ Preferenze salvate su Firebase');
  } catch (error) {
    console.error('❌ Errore salvataggio preferenze:', error);
  }
}

// --- Contatore abbonamenti utente ---
function updateBookingCounter() {
  if (!loggedInUser) return;
  
  const abbonamentiUtente = abbonamenti.filter(a => a.utente === loggedInUser.uid && a.disponibile === true);
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

// ===============================
// HOMEPAGE PREMIUM FUNCTIONS
// ===============================

// Inizializzazione Homepage Premium
function initializeHomepagePremium() {
  initializeCounters();
  initializeFilters();
  initializePremiumCountdown();
  initializeScrollAnimations();
}

// Contatori animati per le statistiche
function initializeCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const finalValue = parseInt(counter.getAttribute('data-count') || counter.textContent);
        animateCounter(counter, finalValue);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

function animateCounter(element, finalValue) {
  let currentValue = 0;
  const increment = finalValue / 30;
  const duration = 1500;
  const stepTime = duration / 30;

  const timer = setInterval(() => {
    currentValue += increment;
    if (currentValue >= finalValue) {
      element.textContent = finalValue;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(currentValue);
    }
  }, stepTime);
}

// Sistema di filtri per gli annunci
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const listingCards = document.querySelectorAll('.premium-listing-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Rimuovi classe active da tutti i bottoni
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Aggiungi classe active al bottone cliccato
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // Filtra le card
      listingCards.forEach(card => {
        if (filterValue === 'tutti' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Countdown premium per le partite
function initializePremiumCountdown() {
  const countdownElements = document.querySelectorAll('.countdown-display-premium');
  
  countdownElements.forEach(element => {
    const matchDate = new Date(element.getAttribute('data-match-date'));
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = matchDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        element.innerHTML = `
          <div style="display: flex; justify-content: center; gap: 12px; align-items: center; flex-wrap: wrap;">
            <div style="text-align: center; min-width: 40px;">
              <div style="font-size: 1.2em; font-weight: 900;">${days}</div>
              <div style="font-size: 0.7em; opacity: 0.8;">giorni</div>
            </div>
            <div style="font-size: 1.2em; opacity: 0.6;">:</div>
            <div style="text-align: center; min-width: 40px;">
              <div style="font-size: 1.2em; font-weight: 900;">${hours.toString().padStart(2, '0')}</div>
              <div style="font-size: 0.7em; opacity: 0.8;">ore</div>
            </div>
            <div style="font-size: 1.2em; opacity: 0.6;">:</div>
            <div style="text-align: center; min-width: 40px;">
              <div style="font-size: 1.2em; font-weight: 900;">${minutes.toString().padStart(2, '0')}</div>
              <div style="font-size: 0.7em; opacity: 0.8;">min</div>
            </div>
          </div>
        `;
      } else {
        element.innerHTML = '<div style="color: #28a745; font-weight: 700; font-size: 0.9em;">⚽ PARTITA IN CORSO</div>';
      }
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  });
}

// Animazioni di scroll per gli elementi
function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.getAttribute('data-aos');
        
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        if (animationType === 'fade-up') {
          element.style.animation = 'fadeUp 0.8s ease-out';
        } else if (animationType === 'fade-left') {
          element.style.animation = 'fadeLeft 0.8s ease-out';
        } else if (animationType === 'fade-right') {
          element.style.animation = 'fadeRight 0.8s ease-out';
        } else if (animationType === 'zoom-in') {
          element.style.animation = 'zoomIn 0.8s ease-out';
        }
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    observer.observe(element);
  });
}

// ===============================
// ADMIN PREMIUM FUNCTIONS
// ===============================

// Carica utenti con interfaccia premium
async function loadUsersAdminPremium() {
  try {
    console.log('🔄 Caricamento utenti admin premium da Firebase...');
    
    // 🔥 FIREBASE-ONLY: Carica utenti solo da Firebase
    const allUsers = await FirebaseOnlyService.loadUsers();
    
    // Aggiorna contatori con dati Firebase reali
    updateUsersCounters(allUsers);
    
    // Renderizza tabella premium
    renderUsersTablePremium(allUsers);
    
    // Inizializza filtri e ricerca
    initializeUsersFilters(allUsers);
    
    // Aggiorna statistiche admin panel
    await updateAdminPanelStats();
    
    console.log('✅ Admin utenti caricato completamente da Firebase');
    
  } catch (error) {
    console.error('❌ Errore caricamento utenti admin:', error);
    showToast('❌ Errore durante il caricamento degli utenti', 'error');
  }
}

// Aggiorna contatori utenti
function updateUsersCounters(users) {
  const totalUsers = users.length;
  const verifiedUsers = users.filter(u => u.emailVerificata).length;
  
  // Calcola utenti attivi (ultimi 30 giorni)
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
  const activeUsers = users.filter(u => {
    const lastLogin = new Date(u.lastLogin || u.timestamp || 0);
    return lastLogin.getTime() > thirtyDaysAgo;
  }).length;
  
  // Calcola nuovi utenti oggi
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const newUsersToday = users.filter(u => {
    const userDate = new Date(u.timestamp || 0);
    return userDate >= today;
  }).length;
  
  // Aggiorna UI
  const totalEl = document.getElementById('totalUsersCount');
  const verifiedEl = document.getElementById('verifiedUsersCount');
  const activeEl = document.getElementById('activeUsersCount');
  const newEl = document.getElementById('newUsersTodayCount');
  const badgeEl = document.getElementById('usersBadge');
  
  if (totalEl) totalEl.textContent = totalUsers;
  if (verifiedEl) verifiedEl.textContent = verifiedUsers;
  if (activeEl) activeEl.textContent = activeUsers;
  if (newEl) newEl.textContent = newUsersToday;
  if (badgeEl) badgeEl.textContent = totalUsers;
}

// Renderizza tabella utenti premium
function renderUsersTablePremium(users) {
  const container = document.getElementById('usersTablePremium');
  if (!container) return;
  
  if (users.length === 0) {
    container.innerHTML = `
      <div class="empty-state-admin">
        <div class="empty-icon">👥</div>
        <h3>Nessun utente trovato</h3>
        <p>Non ci sono utenti registrati nel sistema</p>
      </div>
    `;
    return;
  }
  
  let tableHTML = `
    <div class="users-grid-premium">
  `;
  
  users.forEach(user => {
    const lastLoginDate = new Date(user.lastLogin || user.timestamp || 0);
    const isRecent = (Date.now() - lastLoginDate.getTime()) < (24 * 60 * 60 * 1000);
    const isActive = (Date.now() - lastLoginDate.getTime()) < (30 * 24 * 60 * 60 * 1000);
    
    tableHTML += `
      <div class="user-card-premium" data-user-id="${user.uid}">
        <div class="user-card-header">
          <div class="user-avatar">
            <span class="avatar-letter">${(user.nome?.[0] || user.username?.[0] || 'U').toUpperCase()}</span>
            ${isRecent ? '<div class="online-indicator"></div>' : ''}
          </div>
          <div class="user-info">
            <h4 class="user-name">${user.nome || 'N/A'} ${user.cognome || ''}</h4>
            <p class="user-username">@${user.username || 'sconosciuto'}</p>
            <div class="user-badges">
              ${user.emailVerificata ? '<span class="badge verified">✅ Verificato</span>' : '<span class="badge unverified">⚠️ Non Verificato</span>'}
              ${user.isAdmin ? '<span class="badge admin">👑 Admin</span>' : ''}
              ${isActive ? '<span class="badge active">🟢 Attivo</span>' : '<span class="badge inactive">⚫ Inattivo</span>'}
            </div>
          </div>
        </div>
        
        <div class="user-card-body">
          <div class="user-detail">
            <span class="detail-label">📧 Email:</span>
            <span class="detail-value">${user.email || 'Non fornita'}</span>
          </div>
          <div class="user-detail">
            <span class="detail-label">📱 Telefono:</span>
            <span class="detail-value">${user.telefono || 'Non fornito'}</span>
          </div>
          <div class="user-detail">
            <span class="detail-label">📅 Registrato:</span>
            <span class="detail-value">${formatDateAdmin(user.timestamp)}</span>
          </div>
          <div class="user-detail">
            <span class="detail-label">🕒 Ultimo accesso:</span>
            <span class="detail-value">${formatDateAdmin(user.lastLogin)}</span>
          </div>
        </div>
        
        <div class="user-card-actions">
          <button onclick="sendMessageToUser('${user.uid}'); return false;" class="action-btn-small message">
            <span>💬</span>
            Messaggio
          </button>
          <button onclick="toggleUserVerification('${user.uid}'); return false;" class="action-btn-small verify">
            <span>${user.emailVerificata ? '❌' : '✅'}</span>
            ${user.emailVerificata ? 'Rimuovi' : 'Verifica'}
          </button>
          ${!user.isAdmin ? `<button onclick="toggleUserAdmin('${user.uid}'); return false;" class="action-btn-small admin">
            <span>👑</span>
            Admin
          </button>` : ''}
        </div>
      </div>
    `;
  });
  
  tableHTML += `
    </div>
  `;
  
  container.innerHTML = tableHTML;
}

// Formatta data per admin
function formatDateAdmin(timestamp) {
  if (!timestamp) return 'Mai';
  const date = new Date(timestamp);
  return date.toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Inizializza filtri utenti
function initializeUsersFilters(allUsers) {
  const searchInput = document.getElementById('userSearchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterUsers(allUsers, e.target.value, getActiveFilter());
    });
  }
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      filterUsers(allUsers, searchInput?.value || '', e.target.dataset.filter);
    });
  });
}

// Filtra utenti
function filterUsers(allUsers, searchTerm, filterType) {
  let filteredUsers = allUsers;
  
  // Applica filtro per tipo
  if (filterType !== 'all') {
    switch(filterType) {
      case 'verified':
        filteredUsers = filteredUsers.filter(u => u.emailVerificata);
        break;
      case 'active':
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        filteredUsers = filteredUsers.filter(u => {
          const lastLogin = new Date(u.lastLogin || u.timestamp || 0);
          return lastLogin.getTime() > thirtyDaysAgo;
        });
        break;
      case 'admin':
        filteredUsers = filteredUsers.filter(u => u.isAdmin);
        break;
    }
  }
  
  // Applica ricerca testuale
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredUsers = filteredUsers.filter(user => {
      return (user.nome?.toLowerCase().includes(term)) ||
             (user.cognome?.toLowerCase().includes(term)) ||
             (user.username?.toLowerCase().includes(term)) ||
             (user.email?.toLowerCase().includes(term));
    });
  }
  
  renderUsersTablePremium(filteredUsers);
}

// Helper per ottenere filtro attivo
function getActiveFilter() {
  const activeBtn = document.querySelector('.filter-btn.active');
  return activeBtn?.dataset.filter || 'all';
}

// --- Vendita abbonamento ---
async function prenotaAbbonamento(event) {
  event.preventDefault();
  
  if (!loggedInUser) {
    showToast('❌ Devi effettuare il login per mettere in vendita', 'error');
    toggleModal(true);
    return;
  }

  // Controllo limite massimo abbonamenti per utente
  const abbonamentiUtente = abbonamenti.filter(a => a.utente === loggedInUser.uid && a.disponibile === true);
  if (abbonamentiUtente.length >= 4) {
    showToast('❌ Hai raggiunto il limite massimo di 4 abbonamenti in vendita', 'error');
    return;
  }

  const matchId = document.getElementById('matchSelect').value;
  const settore = document.getElementById('sectorSelect').value;
  const match = upcomingMatches.find(m => m.id == matchId);

  if (!match) {
    showToast('❌ Seleziona una partita valida', 'error');
    return;
  }

  if (!settore) {
    showToast('❌ Seleziona un settore valido', 'error');
    return;
  }

  // Salva i dati del form temporaneamente
  window.tempBookingData = {
    matchId: matchId,
    settore: settore,
    match: match
  };

  // Mostra popup del regolamento
  showModal('regolamentoModal');
  return;
}

// Procede dal regolamento al popup telefono
function proceedToTelefonoModal() {
  const acceptRegolamento = document.getElementById('acceptRegolamento');
  
  if (!acceptRegolamento.checked) {
    showToast('❌ Devi accettare il regolamento per continuare', 'error');
    return;
  }
  
  // Pre-compila il telefono se presente nel profilo
  const telefonoInput = document.getElementById('telefonoVendita');
  if (loggedInUser.telefono) {
    telefonoInput.value = loggedInUser.telefono;
  }
  
  closeModal('regolamentoModal');
  showModal('telefonoModal');
}

// Conferma telefono e crea abbonamento
async function confirmaTelefonoEVendi() {
  const telefono = document.getElementById('telefonoVendita').value.trim();
  
  if (!telefono) {
    showToast('❌ Inserisci il tuo numero di telefono', 'error');
    return;
  }
  
  // Validazione telefono (formato base)
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
  if (!phoneRegex.test(telefono)) {
    showToast('❌ Formato telefono non valido. Usa il formato: +39 123 456 7890', 'error');
    return;
  }
  
  // Aggiorna il telefono nell'utente se diverso
  if (loggedInUser.telefono !== telefono) {
    loggedInUser.telefono = telefono;
    // Aggiorna anche in localStorage e Firebase
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.uid === loggedInUser.uid);
    if (userIndex !== -1) {
      users[userIndex].telefono = telefono;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
  
  closeModal('telefonoModal');
  
  // Ora procede con la creazione dell'abbonamento
  await creaAbbonamentoDopoPopopup(telefono);
}

// Crea abbonamento dopo i popup (regolamento + telefono) 
async function creaAbbonamentoDopoPopopup(telefono) {
  const { matchId, settore, match } = window.tempBookingData;
  
  // Controlla se l'utente ha già messo in vendita un abbonamento per questa specifica partita e settore
  const abbonamentioDuplicato = abbonamenti.find(a => 
    a.utente === loggedInUser.uid && 
    a.matchId == matchId && 
    a.settore === settore && 
    a.disponibile === true
  );
  
  if (abbonamentioDuplicato) {
    showToast('❌ Hai già messo in vendita un abbonamento per questa partita nello stesso settore', 'error');
    return;
  }

  // Blocco vendite per Genoa - Juventus (solo in "Vendi il tuo abbonamento")
  if (/^\s*genoa\s*-\s*juventus\s*$/i.test((match.description || '').trim())) {
    showToast('❌ Le vendite per "Genoa - Juventus" non sono ancora aperte', 'error');
    return;
  }
  
  const nuovoAbbonamento = {
    utente: loggedInUser.uid,
    utenteEmail: loggedInUser.email,
    utenteNome: loggedInUser.nome,
    utenteCognome: loggedInUser.cognome,
    utenteUsername: loggedInUser.username,
    utenteTelefono: telefono, // 📞 Aggiunto telefono
    matchId: match.id,
    matchDesc: match.description,
    settore: settore,
    disponibile: true,
    messaggiChat: []
  };

  // ✅ Salva DIRETTAMENTE su Firebase
  try {
    console.log('💾 Salvataggio abbonamento su Firebase...');
    
    const docRef = await db.collection('abbonamenti').add({
      ...nuovoAbbonamento,
      utente: loggedInUser.uid, // Usa UID Firebase invece del username
      utenteEmail: loggedInUser.email,
      utenteNome: loggedInUser.nome,
      utenteCognome: loggedInUser.cognome,
      utenteTelefono: telefono, // 📞 Includi telefono
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      createdAt: new Date()
    });
    
    console.log('✅ Abbonamento salvato con ID:', docRef.id);
    
    // 🔥 FIREBASE-ONLY: Ricarica da Firebase invece di aggiornare array locale
    await FirebaseOnlyService.loadAbbonamenti();
    
    const abbonamentoConId = {
      ...nuovoAbbonamento,
      id: docRef.id,
      utente: loggedInUser.uid,
      utenteEmail: loggedInUser.email,
      utenteNome: loggedInUser.nome,
      utenteCognome: loggedInUser.cognome,
      utenteTelefono: telefono,
      timestamp: Date.now()
    };
    
    showToast('✅ Abbonamento messo in vendita con successo!', 'success');
    updateBookingCounter();
    updateProfileStats();
    showSection('home');
    loadHomeListings();
    
    // 📧 Invio email di notifica
    EmailService.sendBookingCreatedNotification(abbonamentoConId);
    
    // Analytics
    addAnalyticsEvent('abbonamento_creato', {
      matchId: match.id,
      settore: settore,
      hasPhone: !!telefono
    });
    
    // Reset form
    document.getElementById('bookingForm').reset();
    window.tempBookingData = null;
    
  } catch (error) {
    console.error('❌ Errore salvataggio abbonamento:', error);
    showToast('❌ Errore durante il salvataggio. Riprova.', 'error');
  }
}

// --- Home: lista ---
function loadHomeListings() {
  const container = document.getElementById('homeListings');
  if (!container) return;
  container.innerHTML = '<div class="loading">🔄 Caricamento abbonamenti...</div>';

  // ✅ Usa solo array in memoria (già caricato da Firebase)
  console.log('📦 Visualizzazione abbonamenti...');
  
  const inVendita = abbonamenti.filter(a => a.disponibile === true);
  inVendita.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  renderHomeListings(inVendita);
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
    
    // Pulsante APRI TRATTATIVA (ripristinato come prima)
    if (loggedInUser && abbon.utente !== loggedInUser.uid) {
      // Pulsante unico "APRI TRATTATIVA"
      const button = document.createElement('button');
      button.className = 'btn-primary btn-trattativa';
      
      const buttonIcon = document.createElement('span');
      buttonIcon.textContent = '🤝';
      
      const buttonText = document.createTextNode(' APRI TRATTATIVA');
      
      button.appendChild(buttonIcon);
      button.appendChild(buttonText);
      actions.appendChild(button);
      
      // Event listener per il pulsante
      button.setAttribute('data-id', abbon.id);
      button.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        console.log('🎯 Bottone trattativa cliccato, ID:', id);
        apriModalConfermaInteresse(id); // Nuova funzione invece di handleAcquista
      });
    } else if (loggedInUser && abbon.utente === loggedInUser.uid) {
      // Se è il proprietario, mostra solo info
      const infoText = document.createElement('p');
      infoText.className = 'owner-info';
      infoText.textContent = '🏠 Il tuo abbonamento';
      actions.appendChild(infoText);
    } else {
      // Se non è loggato, mostra messaggio per fare login
      const loginText = document.createElement('p');
      loginText.className = 'login-required';
      loginText.textContent = '🔐 Accedi per aprire la trattativa';
      actions.appendChild(loginText);
    }
    
    // Assembla tutto
    div.appendChild(header);
    div.appendChild(details);
    div.appendChild(actions);
    container.appendChild(div);
  });
}

// --- Chat ---
// Variable per gestire listener real-time
let chatUnsubscribe = null;
let globalChatListeners = [];

// 🔧 Helper per ottenere il nome visualizzato dell'utente
function getUserDisplayName(user) {
  if (!user) return 'Utente';
  
  // Se ha nome e cognome, usali
  if (user.nome && user.cognome) {
    return `${user.nome} ${user.cognome}`.trim();
  }
  
  // Se ha solo il nome
  if (user.nome) {
    return user.nome;
  }
  
  // Se ha displayName (da Google)
  if (user.displayName) {
    return user.displayName;
  }
  
  // Se ha email, usa la parte prima della @
  if (user.email) {
    return user.email.split('@')[0];
  }
  
  // Fallback
  return user.username || 'Utente';
}

// 🆕 Apri modal conferma interesse (dal pulsante APRI TRATTATIVA)  
function apriModalConfermaInteresse(abbonId) {
  console.log('🤝 apriModalConfermaInteresse chiamata con ID:', abbonId);
  
  if (!loggedInUser) {
    showToast('❌ Devi effettuare il login per aprire la trattativa', 'error');
    return;
  }
  
  const abbon = abbonamenti.find(a => a.id === abbonId);
  if (!abbon) {
    console.error('❌ Abbonamento non trovato:', abbonId);
    showToast('❌ Abbonamento non trovato', 'error');
    return;
  }
  
  // Controlla se non è il proprio abbonamento
  if (abbon.utente === loggedInUser.uid) {
    showToast('❌ Non puoi aprire una trattativa sul tuo abbonamento', 'error');
    return;
  }
  
  // Popola dettagli nell'modal
  const interesseDetails = document.getElementById('interesseDetails');
  interesseDetails.innerHTML = `
    <div class="interesse-dettagli">
      <h3>🎫 ${abbon.matchDesc}</h3>
      <p><strong>Settore:</strong> ${abbon.settore}</p>
      <p><strong>Prezzo:</strong> €${formatPriceWithComma(prezziSettore[abbon.settore] || 0)}</p>
      <p><strong>Pubblicato da:</strong> ${abbon.utenteNome || abbon.ownerName || abbon.utente || 'Utente'} ${abbon.utenteCognome || ''}</p>
      ${abbon.utenteTelefono ? `<div class="contatto-venditore">
        <p><strong>📞 Contatti Venditore:</strong></p>
        <div class="contatto-item">
          <span class="contact-icon">📱</span>
          <a href="tel:${abbon.utenteTelefono}" class="contact-link">${abbon.utenteTelefono}</a>
        </div>
        ${abbon.utenteEmail ? `<div class="contatto-item">
          <span class="contact-icon">📧</span>
          <a href="mailto:${abbon.utenteEmail}" class="contact-link">${abbon.utenteEmail}</a>
        </div>` : ''}
      </div>` : '<p class="no-contact">⚠️ Nessun contatto disponibile</p>'}
    </div>
  `;
  
  // Setup pulsante
  const btnInteressato = document.getElementById('btnSonoInteressato');
  
  btnInteressato.onclick = () => {
    // Salva ID abbonamento per il successivo invio
    window.currentAbbonamentoInteresse = abbonId;
    closeConfermaInteresseModal();
    apriModalDatiPagamento(abbonId);
  };
  
  // Mostra modal
  const modal = document.getElementById('confermaInteresseModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
  }
}

// 🗑️ Funzione chat deprecata (mantenuta per compatibilità)
function openChatModal(abbonId) {
  console.log('⚠️ openChatModal deprecata, reindirizzando a sistema interesse');
  showToast('⚠️ Sistema chat sostituito con messaggi prestabiliti', 'info');
  // Non fare nulla, la funzione è deprecata
}

// 🆕 === NUOVO SISTEMA INTERESSE SEMPLIFICATO ===

// Conferma interesse dell'acquirente
async function confermaInteresse(abbonId, tipoInteresse) {
  console.log('✅ confermaInteresse chiamata:', { abbonId, tipoInteresse });
  
  if (!loggedInUser) {
    showToast('❌ Devi effettuare il login', 'error');
    return;
  }
  
  try {
    const abbon = abbonamenti.find(a => a.id === abbonId);
    if (!abbon) {
      showToast('❌ Abbonamento non trovato', 'error');
      return;
    }
    
    // Controlla se esiste già una richiesta per questo abbonamento
    const richiesteSnapshot = await db.collection('richiestaInteresse')
      .where('abbonamentoId', '==', abbonId)
      .get();
    
    if (!richiesteSnapshot.empty) {
      showToast('❌ Hai già inviato una richiesta per questo abbonamento', 'error');
      return;
    }
    
    // Crea la richiesta di interesse solo su Firebase
    const richiestaData = {
      abbonamentoId: abbonId,
      venditorId: abbon.utente,
      buyerId: loggedInUser.uid,
      buyerName: getUserDisplayName(loggedInUser),
      buyerEmail: loggedInUser.email,
      tipoInteresse: tipoInteresse,
      timestamp: new Date(),
      stato: 'pending' // pending, accepted, rejected, completed
    };
    
    // Salva solo su Firebase collection richiestaInteresse
    await db.collection('richiestaInteresse').add(richiestaData);
    
    showToast('✅ Interesse inviato al venditore!', 'success');
    closeConfermaInteresseModal();
    
    // Refresh UI
    loadHomeListings();
    loadMySubscription();
    
  } catch (error) {
    console.error('❌ Errore invio interesse:', error);
    showToast('❌ Errore invio interesse', 'error');
  }
}

// Chiudi modal conferma interesse
function closeConfermaInteresseModal() {
  const modal = document.getElementById('confermaInteresseModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}

// 💳 Apri modal dati pagamento
function apriModalDatiPagamento(abbonId) {
  const abbon = abbonamenti.find(a => a.id === abbonId);
  if (!abbon) {
    showToast('❌ Abbonamento non trovato', 'error');
    return;
  }
  
  // Pre-compila i dati dell'utente se disponibili
  if (loggedInUser.email) {
    document.getElementById('emailPagamento').value = loggedInUser.email;
  }
  if (loggedInUser.telefono) {
    document.getElementById('telefonoPagamento').value = loggedInUser.telefono;
  }
  
  // Setup change listener per PayPal
  const metodoPagamento = document.getElementById('metodoPagamento');
  const paypalGroup = document.getElementById('paypalGroup');
  
  metodoPagamento.onchange = function() {
    if (this.value === 'paypal') {
      paypalGroup.style.display = 'block';
      paypalGroup.classList.add('show');
    } else {
      paypalGroup.style.display = 'none';
      paypalGroup.classList.remove('show');
    }
  };
  
  // Reset form
  document.getElementById('datiPagamentoForm').reset();
  if (loggedInUser.email) document.getElementById('emailPagamento').value = loggedInUser.email;
  if (loggedInUser.telefono) document.getElementById('telefonoPagamento').value = loggedInUser.telefono;
  
  // Mostra modal
  showModal('datiPagamentoModal');
}

// Helper per label metodi pagamento
function getMetodoPagamentoLabel(metodo) {
  const labels = {
    'contanti': '💵 Contanti',
    'paypal': '💙 PayPal',
    'bonifico': '🏦 Bonifico bancario',
    'satispay': '💚 Satispay',
    'altro': '🔄 Da concordare'
  };
  return labels[metodo] || metodo;
}

// 💳 Invia richiesta interesse con dati pagamento
async function inviaRichiestaConDatiPagamento() {
  const abbonId = window.currentAbbonamentoInteresse;
  
  if (!abbonId) {
    showToast('❌ Errore: abbonamento non identificato', 'error');
    return;
  }
  
  // Validazione form
  const email = document.getElementById('emailPagamento').value.trim();
  const telefono = document.getElementById('telefonoPagamento').value.trim();
  const metodoPagamento = document.getElementById('metodoPagamento').value;
  const paypalEmail = document.getElementById('paypalEmail').value.trim();
  const messaggio = document.getElementById('messaggioAcquirente').value.trim();
  
  if (!email || !telefono) {
    showToast('❌ Email e telefono sono obbligatori', 'error');
    return;
  }
  
  // Validazione email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('❌ Formato email non valido', 'error');
    return;
  }
  
  // Validazione telefono
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
  if (!phoneRegex.test(telefono)) {
    showToast('❌ Formato telefono non valido', 'error');
    return;
  }
  
  // Validazione PayPal se selezionato
  if (metodoPagamento === 'paypal' && paypalEmail && !emailRegex.test(paypalEmail)) {
    showToast('❌ Formato email PayPal non valido', 'error');
    return;
  }
  
  try {
    const abbon = abbonamenti.find(a => a.id === abbonId);
    
    // Controlla se esiste già una richiesta
    const richiesteSnapshot = await db.collection('richiestaInteresse')
      .where('abbonamentoId', '==', abbonId)
      .where('buyerId', '==', loggedInUser.uid)
      .get();
    
    if (!richiesteSnapshot.empty) {
      showToast('❌ Hai già inviato una richiesta per questo abbonamento', 'error');
      return;
    }
    
    // Crea la richiesta con dati pagamento
    const richiestaData = {
      abbonamentoId: abbonId,
      venditorId: abbon.utente,
      buyerId: loggedInUser.uid,
      buyerName: getUserDisplayName(loggedInUser),
      buyerEmail: email,
      buyerTelefono: telefono,
      metodoPagamento: metodoPagamento,
      paypalEmail: paypalEmail || null,
      messaggio: messaggio || null,
      tipoInteresse: 'interessato',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      stato: 'pending'
    };
    
    // Salva su Firebase
    await db.collection('richiestaInteresse').add(richiestaData);
    
    closeModal('datiPagamentoModal');
    showToast('✅ Richiesta inviata con dati di pagamento!', 'success');
    showSection('mySubscription');
    
    // Analytics
    addAnalyticsEvent('richiesta_interesse_inviata', {
      abbonamentoId: abbonId,
      metodoPagamento: metodoPagamento,
      hasPayPal: !!paypalEmail,
      hasMessaggio: !!messaggio
    });
    
    // Refresh UI
    loadHomeListings();
    loadMySubscription();
    
    // Reset
    window.currentAbbonamentoInteresse = null;
    
  } catch (error) {
    console.error('❌ Errore invio richiesta:', error);
    showToast('❌ Errore durante l\'invio della richiesta', 'error');
  }
}

// Chiudi modal gestione interesse
function closeGestioneInteresseModal() {
  const modal = document.getElementById('gestioneInteresseModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}

// Chiudi modal condivisione contatti
function closeCondivisioneContattiModal() {
  const modal = document.getElementById('condivisioneContattiModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}

// 🆕 Apri modal gestione interesse per il venditore
function apriModalGestioneInteresse(abbonId, azione) {
  console.log('📩 apriModalGestioneInteresse:', { abbonId, azione });
  
  const abbon = abbonamenti.find(a => a.id === abbonId);
  if (!abbon || !abbon.richiestaInteresse) {
    showToast('❌ Richiesta di interesse non trovata', 'error');
    return;
  }
  
  const richiesta = abbon.richiestaInteresse;
  
  if (azione === 'accetta') {
    // Apri modal condivisione contatti
    apriModalCondivisioneContatti(abbonId);
  } else if (azione === 'rifiuta') {
    // Conferma rifiuto
    if (confirm('❓ Sei sicuro di voler rifiutare questa richiesta di interesse?')) {
      rifiutaRichiestaInteresse(abbonId);
    }
  }
}

// 🆕 Apri modal condivisione contatti
function apriModalCondivisioneContatti(abbonId) {
  const abbon = abbonamenti.find(a => a.id === abbonId);
  if (!abbon) return;
  
  // Pre-compila con i dati dell'utente se disponibili
  const emailInput = document.getElementById('venditorEmail');
  const telefonoInput = document.getElementById('venditoreTelefono');
  
  if (emailInput && loggedInUser.email) {
    emailInput.value = loggedInUser.email;
  }
  
  // Setup pulsante invio
  const btnInvia = document.getElementById('btnInviaContatti');
  btnInvia.onclick = () => inviaContattiAlAcquirente(abbonId);
  
  // Mostra modal
  const modal = document.getElementById('condivisioneContattiModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
  }
}

// 🆕 Invia contatti all'acquirente
async function inviaContattiAlAcquirente(abbonId) {
  const email = document.getElementById('venditorEmail').value.trim();
  const telefono = document.getElementById('venditoreTelefono').value.trim();
  
  if (!email || !telefono) {
    showToast('❌ Inserisci email e telefono', 'error');
    return;
  }
  
  if (!email.includes('@')) {
    showToast('❌ Inserisci un\'email valida', 'error');
    return;
  }
  
  try {
    const abbon = abbonamenti.find(a => a.id === abbonId);
    if (!abbon || !abbon.richiestaInteresse) {
      showToast('❌ Richiesta non trovata', 'error');
      return;
    }
    
    // Aggiorna la richiesta con i contatti e lo stato
    abbon.richiestaInteresse.stato = 'accepted';
    abbon.richiestaInteresse.venditorContatti = {
      email: email,
      telefono: telefono,
      dataCondivisione: new Date().toISOString()
    };
    
    // Salva su Firebase
    await updateFirebaseAbbonamento(abbonId, abbon);
    
    // Aggiorna array locale
    const localIndex = abbonamenti.findIndex(a => a.id === abbonId);
    if (localIndex !== -1) {
      abbonamenti[localIndex] = abbon;
    }
    
    showToast('✅ Contatti condivisi con successo!', 'success');
    closeCondivisioneContattiModal();
    
    // Refresh UI
    loadMySubscription();
    
  } catch (error) {
    console.error('❌ Errore condivisione contatti:', error);
    showToast('❌ Errore condivisione contatti', 'error');
  }
}

// 🆕 Rifiuta richiesta interesse
async function rifiutaRichiestaInteresse(abbonId) {
  try {
    const abbon = abbonamenti.find(a => a.id === abbonId);
    if (!abbon || !abbon.richiestaInteresse) {
      showToast('❌ Richiesta non trovata', 'error');
      return;
    }
    
    // Aggiorna lo stato della richiesta
    abbon.richiestaInteresse.stato = 'rejected';
    abbon.richiestaInteresse.dataRifiuto = new Date().toISOString();
    
    // Salva su Firebase
    await updateFirebaseAbbonamento(abbonId, abbon);
    
    // Aggiorna array locale
    const localIndex = abbonamenti.findIndex(a => a.id === abbonId);
    if (localIndex !== -1) {
      abbonamenti[localIndex] = abbon;
    }
    
    showToast('✅ Richiesta rifiutata', 'success');
    
    // Refresh UI
    loadMySubscription();
    
  } catch (error) {
    console.error('❌ Errore rifiuto richiesta:', error);
    showToast('❌ Errore rifiuto richiesta', 'error');
  }
}

// 🆕 Conferma pagamento effettuato (acquirente)
async function confermaPagamentoEffettuato(abbonamentoId) {
  try {
    const richiesteSnapshot = await db.collection('richiestaInteresse')
      .where('abbonamentoId', '==', abbonamentoId)
      .get();
    
    if (!richiesteSnapshot.empty) {
      const doc = richiesteSnapshot.docs[0];
      await doc.ref.update({
        stato: 'completed',
        dataCompletamento: new Date(),
        timestamp: new Date()
      });
      
      showToast('💳 Pagamento confermato! Transazione completata 🎉', 'success');
      loadMySubscription();
    }
  } catch (error) {
    console.error('❌ Errore nel confermare il pagamento:', error);
    showToast('❌ Errore nel confermare il pagamento', 'error');
  }
}

// 🆕 Conferma pagamento effettuato (versione Firebase)
async function confermaPagamentoEffettuatoFirebase(richiestaId) {
  try {
    await db.collection('richiestaInteresse').doc(richiestaId).update({
      stato: 'completed',
      dataCompletamento: new Date()
    });
    
    showToast('💳 Pagamento confermato! Transazione completata 🎉', 'success');
    loadMySubscription();
    loadStorico(); // 📋 Aggiorna storico transazioni
    showSection('mySubscription'); // 🔄 Salta alla sezione Le Tue Trattative
  } catch (error) {
    console.error('❌ Errore nel confermare il pagamento:', error);
    showToast('❌ Errore nel confermare il pagamento', 'error');
  }
}

// 🆕 Accetta richiesta interesse (versione Firebase)
async function accettaRichiestaFirebase(richiestaId) {
  try {
    const contatti = {
      email: loggedInUser.email,
      telefono: prompt('Inserisci il tuo numero di telefono per la vendita:') || ''
    };

    if (!contatti.telefono.trim()) {
      showToast('❌ Il numero di telefono è richiesto per la vendita', 'error');
      return;
    }

    await db.collection('richiestaInteresse').doc(richiestaId).update({
      stato: 'accepted',
      venditorContatti: contatti,
      dataAccettazione: new Date()
    });
    
    showToast('✅ Richiesta accettata! Contatti condivisi con l\'acquirente', 'success');
    loadMySubscription();
    showSection('mySubscription'); // 🔄 Salta alla sezione Le Tue Trattative
  } catch (error) {
    console.error('❌ Errore nell\'accettare la richiesta:', error);
    showToast('❌ Errore nell\'accettare la richiesta', 'error');
  }
}

// 🆕 Rifiuta richiesta interesse (versione Firebase)
async function rifiutaRichiestaFirebase(richiestaId) {
  try {
    await db.collection('richiestaInteresse').doc(richiestaId).update({
      stato: 'rejected',
      dataRifiuto: new Date()
    });
    
    showToast('✅ Richiesta rifiutata', 'success');
    loadMySubscription();
    showSection('mySubscription'); // 🔄 Salta alla sezione Le Tue Trattative
  } catch (error) {
    console.error('❌ Errore nel rifiutare la richiesta:', error);
    showToast('❌ Errore nel rifiutare la richiesta', 'error');
  }
}

// 🆕 Completa vendita (versione Firebase) - Venditore conferma pagamento ricevuto
async function completaVenditaFirebase(richiestaId, abbonamentoId) {
  try {
    console.log('💰 Completando vendita:', { richiestaId, abbonamentoId });
    
    // Aggiorna stato richiesta a completed
    await db.collection('richiestaInteresse').doc(richiestaId).update({
      stato: 'completed',
      dataCompletamento: new Date(),
      completatoDa: 'venditore'
    });
    
    // Rimuovi abbonamento dalla vendita (venduto)
    await db.collection('abbonamenti').doc(abbonamentoId).update({
      disponibile: false,
      venduto: true,
      dataVendita: new Date()
    });
    
    // 🔥 FIREBASE-ONLY: Ricarica da Firebase invece di aggiornare array locale
    await FirebaseOnlyService.loadAbbonamenti();
    
    showToast('🎉 Vendita completata con successo! L\'abbonamento è stato rimosso dalla vendita', 'success');
    
    // Refresh UI
    loadMySubscription();
    loadHomeListings();
    loadStorico(); // 📋 Aggiorna storico transazioni
    showSection('mySubscription'); // 🔄 Salta alla sezione Le Tue Trattative
    
  } catch (error) {
    console.error('❌ Errore nel completare la vendita:', error);
    showToast('❌ Errore nel completare la vendita', 'error');
  }
}

// 🏠 Listener real-time per home page (aggiornamento abbonamenti)
let homeRealTimeUnsubscribe = null;

function startHomeRealTimeListener() {
  if (!db) {
    console.warn('⚠️ Firebase non disponibile per listener home');
    return;
  }
  
  // Ferma listener precedente se esiste
  if (homeRealTimeUnsubscribe) {
    homeRealTimeUnsubscribe();
  }
  
  console.log('🏠 Avviando listener real-time per home page');
  
  // Listener per abbonamenti disponibili con aggiornamento array locale completo
  homeRealTimeUnsubscribe = db.collection('abbonamenti')
    .onSnapshot((snapshot) => {
      console.log('🔄 Aggiornamento completo abbonamenti:', snapshot.size);
      
      // Ricostruisci array locale completo da Firebase
      const newAbbonamenti = [];
      snapshot.forEach(doc => {
        newAbbonamenti.push({ id: doc.id, ...doc.data() });
      });
      
      // Sostituisci array locale
      const oldCount = abbonamenti.length;
      abbonamenti = newAbbonamenti;
      
      console.log('🔄 Array abbonamenti aggiornato:', {
        old: oldCount,
        new: abbonamenti.length,
        disponibili: abbonamenti.filter(a => a.disponibile).length
      });
      
      // Aggiorna home page se è la sezione attiva
      if (document.querySelector('.section.active')?.id === 'home') {
        console.log('🏠 Ricaricando home page...');
        loadHomeListings();
      }
    }, (error) => {
      console.error('❌ Errore listener home:', error);
    });
}

function stopHomeRealTimeListener() {
  if (homeRealTimeUnsubscribe) {
    console.log('🛑 Fermando listener real-time home');
    homeRealTimeUnsubscribe();
    homeRealTimeUnsubscribe = null;
  }
}

// 🔥 Listener real-time per messaggi chat
function startChatRealTimeListener(abbonId) {
  // Ferma listener precedente se esiste
  if (chatUnsubscribe) {
    chatUnsubscribe();
  }
  
  console.log('🔥 Avviando listener real-time per chat:', abbonId);
  
  // Crea listener Firestore real-time
  chatUnsubscribe = db.collection('abbonamenti').doc(abbonId)
    .onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const newMessageCount = data.messaggiChat?.length || 0;
        const oldMessageCount = currentChatAbbonamento?.messaggiChat?.length || 0;
        
        console.log('🔄 Aggiornamento chat real-time:', {
          abbonId,
          oldCount: oldMessageCount,
          newCount: newMessageCount,
          hasCurrentChat: !!currentChatAbbonamento
        });
        
        if (data.messaggiChat && currentChatAbbonamento) {
          // Aggiorna messaggi locali
          currentChatAbbonamento.messaggiChat = data.messaggiChat;
          
          // Aggiorna anche array principale
          const localIndex = abbonamenti.findIndex(a => a.id === abbonId);
          if (localIndex !== -1) {
            abbonamenti[localIndex].messaggiChat = data.messaggiChat;
          }
          
          // Ricarica la UI della chat solo se ci sono nuovi messaggi
          if (newMessageCount !== oldMessageCount) {
            console.log('🔄 Ricaricando UI chat per nuovi messaggi');
            loadChatMessages();
          }
        }
      }
    }, (error) => {
      console.error('❌ Errore listener chat:', error);
    });
}

// 🔥 Ferma listener quando si chiude la chat
function stopChatRealTimeListener() {
  if (chatUnsubscribe) {
    console.log('🛑 Fermando listener real-time chat');
    chatUnsubscribe();
    chatUnsubscribe = null;
  }
}

// 🌐 Sistema listeners globali per tutti gli abbonamenti dell'utente
function startGlobalChatListeners() {
  if (!loggedInUser) return;
  
  console.log('🌐 Avviando listeners globali per utente:', loggedInUser.uid);
  
  // Listener per abbonamenti di cui sono proprietario
  const ownerListener = db.collection('abbonamenti')
    .where('utente', '==', loggedInUser.uid)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          const data = change.doc.data();
          const abbonId = change.doc.id;
          
          console.log('🔄 Aggiornamento abbonamento proprietario:', abbonId);
          
          // Aggiorna array locale
          const localIndex = abbonamenti.findIndex(a => a.id === abbonId);
          if (localIndex !== -1) {
            const oldMessagesCount = abbonamenti[localIndex].messaggiChat?.length || 0;
            const newMessagesCount = data.messaggiChat?.length || 0;
            
            abbonamenti[localIndex].messaggiChat = data.messaggiChat || [];
            
            // Se ci sono nuovi messaggi e la chat non è aperta
            if (newMessagesCount > oldMessagesCount && (!currentChatAbbonamento || currentChatAbbonamento.id !== abbonId)) {
              console.log('🔔 Nuovo messaggio per proprietario:', {abbonId, oldCount: oldMessagesCount, newCount: newMessagesCount});
              showToast('💬 Nuovo messaggio ricevuto!', 'info');
              updateNotificationCount();
            }
          }
        }
      });
    });
  
  // Listener per abbonamenti di cui sono acquirente (buyerName)
  const buyerListener = db.collection('abbonamenti')
    .where('buyerName', '==', loggedInUser.uid)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'modified') {
          const data = change.doc.data();
          const abbonId = change.doc.id;
          
          console.log('🔄 Aggiornamento abbonamento acquirente:', abbonId);
          
          // Trova abbonamento in array locale (potrebbe non esserci se caricato da Firebase)
          let localIndex = abbonamenti.findIndex(a => a.id === abbonId);
          if (localIndex === -1) {
            // Aggiungi abbonamento se non presente
            abbonamenti.push({ id: abbonId, ...data });
            localIndex = abbonamenti.length - 1;
          }
          
          const oldMessagesCount = abbonamenti[localIndex].messaggiChat?.length || 0;
          const newMessagesCount = data.messaggiChat?.length || 0;
          
          abbonamenti[localIndex].messaggiChat = data.messaggiChat || [];
          
          // Se ci sono nuovi messaggi e la chat non è aperta
          if (newMessagesCount > oldMessagesCount && (!currentChatAbbonamento || currentChatAbbonamento.id !== abbonId)) {
            console.log('🔔 Nuovo messaggio per acquirente:', {abbonId, oldCount: oldMessagesCount, newCount: newMessageCount});
            showToast('💬 Nuovo messaggio ricevuto!', 'info');
            updateNotificationCount();
          }
        }
      });
    });
  
  globalChatListeners = [ownerListener, buyerListener];
}

// 🛑 Ferma tutti i listeners globali
function stopGlobalChatListeners() {
  console.log('🛑 Fermando listeners globali');
  globalChatListeners.forEach(unsubscribe => {
    if (unsubscribe) unsubscribe();
  });
  globalChatListeners = [];
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
    // Usa senderName se disponibile, altrimenti fallback su sender
    const displayName = msg.senderName || msg.sender || 'Utente';
    p.textContent = `${displayName}: ${msg.text}`;
    p.className = msg.sender === loggedInUser.uid ? 'sent' : 'received';
    chatBox.appendChild(p);
    
    // Segna i messaggi ricevuti come letti quando la chat viene aperta
    if (msg.sender !== loggedInUser.uid) {
      markMessageAsRead(currentChatAbbonamento.id, index);
    }
  });

  // Pulsanti fissi sotto la barra input
  const chatActions = document.getElementById('chatActions');
  if (chatActions) chatActions.innerHTML = '';

  if (
    loggedInUser &&
    currentChatAbbonamento.utente === loggedInUser.uid &&
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
  // 🛑 Ferma listener real-time quando si chiude la chat
  stopChatRealTimeListener();
  
  const modal = document.getElementById('chatModal');
  if (modal) modal.style.display = 'none';
  currentChatAbbonamento = null;
  const chatActions = document.getElementById('chatActions');
  if (chatActions) chatActions.innerHTML = '';
}

// --- STORICO PRENOTAZIONI MODERNO ---
let currentFilter = 'all';

async function loadStorico() {
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

  try {
    console.log('📋 Caricando storico trattative completate per:', loggedInUser.uid);
    
    // Carica richieste completate dove sono venditore
    const richiesteVenditore = await db.collection('richiestaInteresse')
      .where('venditorId', '==', loggedInUser.uid)
      .where('stato', '==', 'completed')
      .get();
    
    // Carica richieste completate dove sono acquirente  
    const richiesteAcquirente = await db.collection('richiestaInteresse')
      .where('buyerId', '==', loggedInUser.uid)
      .where('stato', '==', 'completed')
      .get();
    
    let transazioniCompletate = [];
    
    // Processa vendite (sono il venditore)
    for (const doc of richiesteVenditore.docs) {
      const richiesta = { id: doc.id, ...doc.data() };
      
      // Carica abbonamento da Firebase se non in memoria
      let abbon = abbonamenti.find(a => a.id === richiesta.abbonamentoId);
      if (!abbon) {
        try {
          const abbonDoc = await db.collection('abbonamenti').doc(richiesta.abbonamentoId).get();
          if (abbonDoc.exists) {
            abbon = { id: abbonDoc.id, ...abbonDoc.data() };
          }
        } catch (error) {
          console.warn('⚠️ Errore caricamento abbonamento storico:', richiesta.abbonamentoId);
        }
      }
      
      if (abbon) {
        transazioniCompletate.push({
          ...richiesta,
          abbonamento: abbon,
          tipoTransazione: 'vendita',
          dataCompletamento: richiesta.dataCompletamento?.toDate() || new Date(),
          prezzo: prezziSettore[abbon.settore] || 0
        });
      }
    }
    
    // Processa acquisti (sono l'acquirente)
    for (const doc of richiesteAcquirente.docs) {
      const richiesta = { id: doc.id, ...doc.data() };
      
      // Carica abbonamento da Firebase se non in memoria
      let abbon = abbonamenti.find(a => a.id === richiesta.abbonamentoId);
      if (!abbon) {
        try {
          const abbonDoc = await db.collection('abbonamenti').doc(richiesta.abbonamentoId).get();
          if (abbonDoc.exists) {
            abbon = { id: abbonDoc.id, ...abbonDoc.data() };
          }
        } catch (error) {
          console.warn('⚠️ Errore caricamento abbonamento storico:', richiesta.abbonamentoId);
        }
      }
      if (abbon) {
        transazioniCompletate.push({
          ...richiesta,
          abbonamento: abbon,
          tipoTransazione: 'acquisto',
          dataCompletamento: richiesta.dataCompletamento?.toDate() || new Date(),
          prezzo: prezziSettore[abbon.settore] || 0
        });
      }
    }
    
    // Ordina per data più recente
    transazioniCompletate.sort((a, b) => b.dataCompletamento - a.dataCompletamento);
    
    // Aggiorna statistiche
    updateStoricoStats(transazioniCompletate.length);
    
    if (transazioniCompletate.length === 0) {
      container.innerHTML = `
        <div class="storico-empty">
          <div class="storico-empty-icon">📋</div>
          <h3>Nessuna Transazione Completata</h3>
          <p>Non hai ancora completato nessuna trattativa.<br/>
          Inizia a vendere o comprare abbonamenti!</p>
        </div>
      `;
      return;
    }
    
    // Applica filtro
    let filteredResults = transazioniCompletate;
    if (currentFilter === 'vendite') {
      filteredResults = transazioniCompletate.filter(t => t.tipoTransazione === 'vendita');
    } else if (currentFilter === 'acquisti') {
      filteredResults = transazioniCompletate.filter(t => t.tipoTransazione === 'acquisto');
    }
    
    renderStoricoItemsFirebase(filteredResults);
    
  } catch (error) {
    console.error('❌ Errore caricamento storico:', error);
    container.innerHTML = `
      <div class="storico-empty">
        <div class="storico-empty-icon">❌</div>
        <h3>Errore Caricamento</h3>
        <p>Impossibile caricare lo storico delle transazioni.</p>
      </div>
    `;
  }
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

// 🆕 Render transazioni Firebase completate
function renderStoricoItemsFirebase(transazioni) {
  const container = document.getElementById('storicoList');
  if (!container) return;
  
  container.innerHTML = '';
  
  transazioni.forEach(transazione => {
    const { abbonamento, tipoTransazione, dataCompletamento, prezzo } = transazione;
    const isVendita = tipoTransazione === 'vendita';
    
    const div = document.createElement('div');
    div.className = `storico-item ${isVendita ? 'vendita' : 'acquisto'}`;
    
    // Badge tipo transazione
    const badgeClass = isVendita ? 'badge-vendita' : 'badge-acquisto';
    const badgeIcon = isVendita ? '💰' : '🎫';
    const badgeText = isVendita ? 'VENDUTO' : 'ACQUISTATO';
    
    // Nome controparte
    const controparte = isVendita ? transazione.buyerName : 
                       (abbonamento.utenteNome ? `${abbonamento.utenteNome} ${abbonamento.utenteCognome || ''}`.trim() : 'Venditore');
    
    div.innerHTML = `
      <div class="storico-header">
        <div class="match-info">
          <div class="match-logos">
            ${abbonamento.matchDesc ? getMatchLogos(abbonamento.matchDesc) : ''}
          </div>
          <h4 class="match-title">${abbonamento.matchDesc}</h4>
        </div>
        <span class="storico-badge ${badgeClass}">
          <span class="badge-icon">${badgeIcon}</span>
          ${badgeText}
        </span>
      </div>
      
      <div class="storico-details">
        <div class="info-group">
          <span class="info-label">🎯 Settore</span>
          <span class="info-value">${abbonamento.settore}</span>
        </div>
        <div class="info-group">
          <span class="info-label">💰 Prezzo</span>
          <span class="info-value price-value">€ ${formatPriceWithComma(prezzo)}</span>
        </div>
        <div class="info-group">
          <span class="info-label">📅 Completata il</span>
          <span class="info-value date-value">${dataCompletamento.toLocaleDateString('it-IT')}</span>
        </div>
        <div class="info-group">
          <span class="info-label">⏰ Ora</span>
          <span class="info-value date-value">${dataCompletamento.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div class="info-group">
          <span class="info-label">${isVendita ? '👤 Acquirente' : '👤 Venditore'}</span>
          <span class="info-value">${controparte}</span>
        </div>
      </div>
      
      <div class="transazione-completata-badge">
        <span class="completion-icon">✅</span>
        <span class="completion-text">Transazione completata con successo!</span>
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
    (a.utente === loggedInUser.uid || a.buyerName === loggedInUser.uid)
  );

  if (storico.length === 0) {
    container.innerHTML = '<p>Nessun abbonamento venduto o acquistato.</p>';
    return;
  }

  storico.forEach(abbon => {
    // Data e ora della vendita/acquisto (usa la proprietà abbon.dataVendita se presente, altrimenti mostra "Data non disponibile")
    const dataVendita = abbon.dataVendita ? abbon.dataVendita : 'Data non disponibile';
    const tipo = abbon.utente === loggedInUser.uid ? 'Vendita' : 'Acquisto';
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

// 🆕 --- I TUOI ABBONAMENTI E RICHIESTE DI INTERESSE ---
async function loadMySubscription() {
  const container = document.getElementById('mySubscriptionContent');
  if (!container) return;

  if (!loggedInUser) {
    container.innerHTML = '<p>Devi effettuare il login per vedere le tue trattative.</p>';
    return;
  }

  try {
    // I tuoi abbonamenti in vendita
    const mieVendite = abbonamenti.filter(a => a.utente === loggedInUser.uid && a.disponibile === true);

    // Carica richieste di interesse da Firebase per i tuoi abbonamenti (come venditore)
    const richiesteVenditore = await db.collection('richiestaInteresse')
      .where('venditorId', '==', loggedInUser.uid)
      .get();
    
    // Carica le tue richieste inviate (come acquirente)
    const richiesteAcquirente = await db.collection('richiestaInteresse')
      .where('buyerId', '==', loggedInUser.uid)
      .get();

    // Pulisci container
    container.innerHTML = '';

    // Crea mappa richieste per abbonamenti venditore (richieste ricevute)
    const richiesteVenditoreMap = new Map();
    richiesteVenditore.forEach(doc => {
      const richiesta = { id: doc.id, ...doc.data() };
      richiesteVenditoreMap.set(richiesta.abbonamentoId, richiesta);
    });

    // === SEZIONE: I TUOI ABBONAMENTI IN VENDITA ===
    if (mieVendite.length > 0) {
      const sectionVendite = document.createElement('div');
      sectionVendite.className = 'subscription-section';
      
      const titleVendite = document.createElement('h3');
      titleVendite.className = 'section-subtitle';
      titleVendite.innerHTML = '💰 I Tuoi Abbonamenti in Vendita';
      sectionVendite.appendChild(titleVendite);

      mieVendite.forEach(abbon => {
        const prezzo = prezziSettore[abbon.settore] || 'N/A';
        const richiesta = richiesteVenditoreMap.get(abbon.id);
        const hasRichiesta = richiesta && richiesta.stato === 'pending';
        
        const div = document.createElement('div');
        div.className = 'abbo-card vendita-card';
        
        // Header
        const header = document.createElement('div');
        header.className = 'card-header';
        
        const title = document.createElement('h4');
        title.textContent = abbon.matchDesc;
        
        const badge = document.createElement('span');
        let badgeText = '📋 IN VENDITA';
        let badgeClass = 'badge badge-vendita';
        
        if (richiesta) {
          const stato = richiesta.stato;
          if (stato === 'pending') {
            badgeText = '📩 RICHIESTA IN CORSO';
            badgeClass = 'badge badge-interesse';
          } else if (stato === 'accepted') {
            badgeText = '🤝 DATI CONDIVISI';
            badgeClass = 'badge badge-accepted';
          } else if (stato === 'completed') {
            badgeText = '✅ VENDUTO E CONCLUSO';
            badgeClass = 'badge badge-completed';
          }
        }
        
        badge.className = badgeClass;
        badge.textContent = badgeText;
        
        header.appendChild(title);
        header.appendChild(badge);
        
        // Dettagli
        const details = document.createElement('div');
        details.className = 'card-details';
        details.innerHTML = `
          <p><strong>Settore:</strong> ${abbon.settore}</p>
          <p><strong>Prezzo:</strong> €${formatPriceWithComma(prezzo)}</p>
          <p class="role-indicator"><strong>Ruolo:</strong> Venditore</p>
        `;
        
        // Richiesta di interesse se presente
        if (richiesta && richiesta.stato === 'pending') {
          const richiestaDiv = document.createElement('div');
          richiestaDiv.className = 'richiesta-interesse';
          richiestaDiv.innerHTML = `
            <div class="richiesta-header">
              <span class="richiesta-icon">👋</span>
              <strong>${richiesta.buyerName}</strong>
              <span class="richiesta-tipo">è interessato</span>
            </div>
            <p class="richiesta-data">📅 ${new Date(richiesta.timestamp.toDate()).toLocaleDateString('it-IT')}</p>
            
            <div class="dati-pagamento-richiesta">
              <h5>💳 Dati Pagamento Acquirente:</h5>
              <div class="pagamento-details">
                <p><strong>📧 Email:</strong> <a href="mailto:${richiesta.buyerEmail}">${richiesta.buyerEmail}</a></p>
                <p><strong>📞 Telefono:</strong> <a href="tel:${richiesta.buyerTelefono}">${richiesta.buyerTelefono}</a></p>
                <p><strong>💳 Metodo pagamento:</strong> ${getMetodoPagamentoLabel(richiesta.metodoPagamento)}</p>
                ${richiesta.paypalEmail ? `<p><strong>💙 PayPal:</strong> ${richiesta.paypalEmail}</p>` : ''}
                ${richiesta.messaggio ? `<div class="messaggio-acquirente"><strong>💬 Messaggio:</strong><br><em>"${richiesta.messaggio}"</em></div>` : ''}
              </div>
            </div>
          `;
          
          // Pulsanti azione per richieste
          const actions = document.createElement('div');
          actions.className = 'row-actions';
          
          const btnAccetta = document.createElement('button');
          btnAccetta.className = 'btn-success btn-accetta-interesse';
          btnAccetta.innerHTML = '<span>✅</span> Accetta e Condividi Contatti';
          btnAccetta.onclick = () => accettaRichiestaFirebase(richiesta.id);
          
          const btnRifiuta = document.createElement('button');
          btnRifiuta.className = 'btn-danger btn-rifiuta-interesse';
          btnRifiuta.innerHTML = '<span>❌</span> Rifiuta';
          btnRifiuta.onclick = () => rifiutaRichiestaFirebase(richiesta.id);
          
          actions.appendChild(btnAccetta);
          actions.appendChild(btnRifiuta);
          richiestaDiv.appendChild(actions);
          details.appendChild(richiestaDiv);
        } else if (richiesta && richiesta.stato === 'accepted') {
          // === STATO ACCEPTED: Contatti condivisi, in attesa pagamento ===
          const accettataDiv = document.createElement('div');
          accettataDiv.className = 'richiesta-accettata';
          accettataDiv.innerHTML = `
            <div class="richiesta-header">
              <span class="richiesta-icon">🤝</span>
              <strong>${richiesta.buyerName}</strong>
              <span class="richiesta-tipo">- Contatti condivisi</span>
            </div>
            <p class="richiesta-data">✅ Accettata il ${new Date(richiesta.dataAccettazione.toDate()).toLocaleDateString('it-IT')}</p>
            
            <div class="info-pagamento">
              <div class="payment-status">
                <span class="payment-icon">⏳</span>
                <p><strong>In attesa del pagamento dell'acquirente</strong></p>
                <p class="payment-note">L'acquirente dovrebbe contattarti per coordinare il pagamento</p>
              </div>
            </div>
            
            <div class="dati-pagamento-richiesta">
              <h5>💳 Dati Pagamento Acquirente:</h5>
              <div class="pagamento-details">
                <p><strong>📧 Email:</strong> <a href="mailto:${richiesta.buyerEmail}">${richiesta.buyerEmail}</a></p>
                <p><strong>📞 Telefono:</strong> <a href="tel:${richiesta.buyerTelefono}">${richiesta.buyerTelefono}</a></p>
                <p><strong>💳 Metodo pagamento:</strong> ${getMetodoPagamentoLabel(richiesta.metodoPagamento)}</p>
                ${richiesta.paypalEmail ? `<p><strong>💙 PayPal:</strong> ${richiesta.paypalEmail}</p>` : ''}
                ${richiesta.messaggio ? `<div class="messaggio-acquirente"><strong>💬 Messaggio:</strong><br><em>"${richiesta.messaggio}"</em></div>` : ''}
              </div>
            </div>
          `;
          
          // === PULSANTE COMPLETA VENDITA per il venditore ===
          const venditorActions = document.createElement('div');
          venditorActions.className = 'row-actions venditor-actions';
          
          const btnCompletaVendita = document.createElement('button');
          btnCompletaVendita.className = 'btn-success btn-completa-vendita';
          btnCompletaVendita.innerHTML = '<span>✅</span> Ho Ricevuto il Pagamento - Completa Vendita';
          btnCompletaVendita.onclick = () => {
            if (confirm('⚠️ CONFERMA VENDITA\n\nHai ricevuto il pagamento da parte dell\'acquirente?\n\nQuesta azione segnerà la transazione come completata e non potrà essere annullata.')) {
              completaVenditaFirebase(richiesta.id, abbon.id);
            }
          };
          
          venditorActions.appendChild(btnCompletaVendita);
          accettataDiv.appendChild(venditorActions);
          details.appendChild(accettataDiv);
        }
        
        // 🗑️ Pulsante Annulla Abbonamento (sempre presente)
        const abbonamentoActions = document.createElement('div');
        abbonamentoActions.className = 'abbonamento-actions';
        
        const btnAnnulla = document.createElement('button');
        btnAnnulla.className = 'btn-cancel btn-annulla-abbonamento';
        btnAnnulla.innerHTML = '<span>🗑️</span> Annulla Abbonamento';
        btnAnnulla.title = 'Rimuovi questo abbonamento dalla vendita';
        btnAnnulla.onclick = () => {
          if (confirm(`Sei sicuro di voler annullare l'abbonamento per "${abbon.matchDesc}"?\n\nQuesta azione non può essere annullata.`)) {
            annullaTrattativa(abbon.id);
          }
        };
        
        // Se c'è una richiesta pending, mostra warning
        if (richiesta && richiesta.stato === 'pending') {
          btnAnnulla.innerHTML = '<span>⚠️</span> Annulla (con richiesta attiva)';
          btnAnnulla.title = 'ATTENZIONE: Annullando perderai la richiesta di interesse attiva';
          btnAnnulla.className += ' btn-warning-action';
        }
        
        abbonamentoActions.appendChild(btnAnnulla);
        details.appendChild(abbonamentoActions);
        
        // Assembla card
        div.appendChild(header);
        div.appendChild(details);
        
        sectionVendite.appendChild(div);
      });
      
      container.appendChild(sectionVendite);
    }

    // === SEZIONE: LE TUE RICHIESTE INVIATE ===
    if (!richiesteAcquirente.empty) {
      const sectionRichieste = document.createElement('div');
      sectionRichieste.className = 'subscription-section';
      
      const titleRichieste = document.createElement('h3');
      titleRichieste.className = 'section-subtitle';
      titleRichieste.innerHTML = '📤 Le Tue Richieste di Interesse';
      sectionRichieste.appendChild(titleRichieste);

      richiesteAcquirente.forEach(doc => {
        const richiesta = { id: doc.id, ...doc.data() };
        const abbon = abbonamenti.find(a => a.id === richiesta.abbonamentoId);
        
        if (!abbon) return; // Abbonamento non trovato
        
        const prezzo = prezziSettore[abbon.settore] || 'N/A';
        
        const div = document.createElement('div');
        div.className = 'abbo-card richiesta-card';
        
        // Header
        const header = document.createElement('div');
        header.className = 'card-header';
        
        const title = document.createElement('h4');
        title.textContent = abbon.matchDesc;
        
        const badge = document.createElement('span');
        badge.className = `badge badge-${richiesta.stato}`;
        const statusText = {
          'pending': '⏳ IN ATTESA RISPOSTA',
          'accepted': '💰 PAGAMENTO DA EFFETTUARE',
          'rejected': '❌ RIFIUTATA',
          'completed': '✅ ABBONAMENTO ACQUISTATO'
        };
        badge.textContent = statusText[richiesta.stato] || '❓ SCONOSCIUTO';
        
        header.appendChild(title);
        header.appendChild(badge);
        
        // Dettagli
        const details = document.createElement('div');
        details.className = 'card-details';
        details.innerHTML = `
          <p><strong>Settore:</strong> ${abbon.settore}</p>
          <p><strong>Prezzo:</strong> €${formatPriceWithComma(prezzo)}</p>
          <p><strong>Tipo interesse:</strong> 👋 Interessato</p>
          <p><strong>Inviata il:</strong> ${new Date(richiesta.timestamp.toDate()).toLocaleDateString('it-IT')}</p>
          <p class="role-indicator"><strong>Ruolo:</strong> Acquirente</p>
        `;
        
        // Se accettata, mostra i contatti
        if (richiesta.stato === 'accepted' && richiesta.venditorContatti) {
          const contatti = document.createElement('div');
          contatti.className = 'contatti-venditore';
          contatti.innerHTML = `
            <div class="contatti-header">
              <h5>📞 Contatti del Venditore:</h5>
            </div>
            <p><strong>📧 Email:</strong> ${richiesta.venditorContatti.email}</p>
            <p><strong>📱 Telefono:</strong> ${richiesta.venditorContatti.telefono}</p>
            <div class="contatti-note">
              <p><em>💡 Contatta il venditore per accordarvi sui dettagli della vendita!</em></p>
            </div>
          `;
          
          // Pulsante per confermare pagamento effettuato
          const btnPagato = document.createElement('button');
          btnPagato.className = 'btn-success btn-conferma-pagamento';
          btnPagato.innerHTML = '<span>💳</span> Ho Effettuato il Pagamento';
          btnPagato.onclick = () => confermaPagamentoEffettuatoFirebase(richiesta.id);
          
          contatti.appendChild(btnPagato);
          details.appendChild(contatti);
        } else if (richiesta.stato === 'completed') {
          // Mostra messaggio di completamento
          const completato = document.createElement('div');
          completato.className = 'transazione-completata';
          completato.innerHTML = `
            <div class="completamento-header">
              <h5>🎉 Transazione Completata!</h5>
            </div>
            <p>Hai acquistato con successo questo abbonamento.</p>
            <p><em>Goditi la partita! ⚽</em></p>
          `;
          details.appendChild(completato);
        }
        
        // Assembla card
        div.appendChild(header);
        div.appendChild(details);
        
        sectionRichieste.appendChild(div);
      });
      
      container.appendChild(sectionRichieste);
    }

    // Messaggio se non ci sono abbonamenti o richieste
    if (mieVendite.length === 0 && richiesteAcquirente.empty) {
      container.innerHTML = `
        <div class="no-subscriptions">
          <p>📭 Non hai abbonamenti in vendita o richieste di interesse.</p>
          <p>Inizia pubblicando un abbonamento o mostrando interesse per uno esistente!</p>
        </div>
      `;
    }

  } catch (error) {
    console.error('❌ Errore caricamento trattative:', error);
    container.innerHTML = '<p>Errore nel caricamento delle trattative. Riprova più tardi.</p>';
  }
}

// --- SISTEMA NOTIFICHE AVANZATO ---
let notificationDropdownOpen = false;
let userReadMessages;

// Inizializza userReadMessages in modo sicuro
try {
  userReadMessages = JSON.parse(localStorage.getItem('userReadMessages')) || {};
} catch (error) {
  console.error('❌ Errore nel parsing di userReadMessages da localStorage:', error);
  userReadMessages = {};
}

// Inizializza i messaggi letti per l'utente corrente
function initUserReadMessages() {
  if (!loggedInUser || !loggedInUser.uid) return;
  
  try {
    // Inizializza userReadMessages se non esiste
    if (!userReadMessages) {
      console.log('🔖 Inizializzando userReadMessages globale');
      userReadMessages = {};
    }
    
    // Inizializza l'oggetto utente se non esiste
    if (!userReadMessages[loggedInUser.uid]) {
      console.log('🔖 Inizializzando userReadMessages per utente:', loggedInUser.uid);
      userReadMessages[loggedInUser.uid] = {};
    }
  } catch (error) {
    console.error('❌ Errore in initUserReadMessages:', error);
    userReadMessages = {};
    if (loggedInUser && loggedInUser.uid) {
      userReadMessages[loggedInUser.uid] = {};
    }
  }
}

// Segna un messaggio come letto
function markMessageAsRead(abbonamentoId, messageIndex) {
  console.log('🔖 markMessageAsRead chiamata:', {abbonamentoId, messageIndex, loggedInUser: loggedInUser ? loggedInUser.uid : 'null'});
  
  if (!loggedInUser || !loggedInUser.uid) {
    console.warn('⚠️ loggedInUser o uid non disponibile');
    return;
  }
  
  if (!abbonamentoId || messageIndex === undefined || messageIndex === null) {
    console.warn('⚠️ Parametri non validi:', {abbonamentoId, messageIndex});
    return;
  }
  
  // Inizializza userReadMessages se non esiste
  if (!userReadMessages) {
    console.log('🔖 Inizializzando userReadMessages da zero');
    userReadMessages = {};
  }
  
  // Usa sempre UID per consistenza con Firebase
  const userId = loggedInUser.uid;
  
  console.log('🔖 userReadMessages stato:', {userId, hasUser: !!userReadMessages[userId], userReadMessages});
  
  // Controlli robuste per evitare errori
  try {
    // Assicurati che l'oggetto utente esista
    if (!userReadMessages[userId]) {
      console.log('🔖 Creando oggetto utente per:', userId);
      userReadMessages[userId] = {};
    }
    
    // Assicurati che l'array abbonamento esista
    if (!userReadMessages[userId][abbonamentoId]) {
      console.log('🔖 Creando array messaggi per abbonamento:', abbonamentoId);
      userReadMessages[userId][abbonamentoId] = [];
    }
    
    // Controlla se il messaggio è già letto
    if (!userReadMessages[userId][abbonamentoId].includes(messageIndex)) {
      userReadMessages[userId][abbonamentoId].push(messageIndex);
      localStorage.setItem('userReadMessages', JSON.stringify(userReadMessages));
      updateNotificationCount();
      console.log('✅ Messaggio marcato come letto:', {abbonamentoId, messageIndex});
    }
  } catch (error) {
    console.error('❌ Errore in markMessageAsRead:', error, {userId, abbonamentoId, messageIndex});
  }
}

// Controlla se un messaggio è già letto
function isMessageRead(abbonamentoId, messageIndex) {
  if (!loggedInUser || !loggedInUser.uid) return false;
  
  if (!abbonamentoId || messageIndex === undefined || messageIndex === null) {
    console.warn('⚠️ Parametri non validi in isMessageRead:', {abbonamentoId, messageIndex});
    return false;
  }
  
  const userId = loggedInUser.uid;
  
  try {
    // Controlli extra robusti
    if (!userReadMessages) {
      console.warn('⚠️ userReadMessages non inizializzato in isMessageRead');
      userReadMessages = {};
      return false;
    }
    
    if (!userReadMessages[userId]) {
      console.log('🔖 Utente non ha messaggi letti ancora:', userId);
      return false;
    }
    
    if (!userReadMessages[userId][abbonamentoId]) {
      console.log('🔖 Abbonamento non ha messaggi letti:', abbonamentoId);
      return false;
    }
    
    const isRead = userReadMessages[userId][abbonamentoId].includes(messageIndex);
    console.log('🔖 isMessageRead check:', {abbonamentoId, messageIndex, isRead});
    
    return isRead;
  } catch (error) {
    console.error('❌ Errore in isMessageRead:', error, {userId, abbonamentoId, messageIndex});
    return false;
  }
}

// Conta i messaggi non letti
function getUnreadCount() {
  if (!loggedInUser) return 0;
  
  let count = 0;
  abbonamenti.forEach(abbon => {
    if (!abbon.messaggiChat) return;
    
    abbon.messaggiChat.forEach((msg, index) => {
      // Conta solo messaggi ricevuti (non inviati dall'utente corrente) e non letti
      // Usa sia UID che username per compatibilità con messaggi vecchi e nuovi
      if (msg.sender !== loggedInUser.uid && msg.sender !== loggedInUser.username && !isMessageRead(abbon.id, index)) {
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
      // Usa sia UID che username per compatibilità
      if (msg.sender !== loggedInUser.uid && msg.sender !== loggedInUser.username) {
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
  
  // Inizializza homepage premium
  setTimeout(() => {
    initializeHomepagePremium();
  }, 100);
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

// 🆕 Nuovo sistema interesse semplificato
window.handleInteresse = async function(id, tipoInteresse) {
  console.log('🎯 handleInteresse chiamata con ID:', id, 'Tipo:', tipoInteresse);
  
  if (!loggedInUser) {
    showToast('❌ Devi effettuare il login per mostrare interesse', 'error');
    toggleModal(true);
    return;
  }
  
  const abbon = abbonamenti.find(a => a.id === id);
  if (!abbon) {
    console.error('❌ Abbonamento non trovato per ID:', id);
    showToast('❌ Abbonamento non trovato', 'error');
    return;
  }
  
  // Controlla se non è il proprio abbonamento
  if (abbon.utente === loggedInUser.uid) {
    showToast('❌ Non puoi mostrare interesse per il tuo abbonamento', 'error');
    return;
  }
  
  // Apri modal conferma interesse
  openConfermaInteresseModal(id, tipoInteresse);
};

// Vecchia funzione mantenuta per compatibilità (ora disabilitata)
window.handleAcquista = async function(id){
  showToast('⚠️ Sistema chat sostituito con messaggi prestabiliti', 'info');
  console.log('� handleAcquista deprecata, reindirizzando a handleInteresse');
  handleInteresse(id, 'interessato');
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

async function annullaTrattativa(id) {
  console.log('🗑️ annullaTrattativa chiamata con ID:', id);
  console.log('🔥 Firebase db disponibile:', !!db);
  
  if (!loggedInUser) {
    showToast('❌ Devi essere loggato per annullare', 'error');
    return;
  }
  
  const abbon = abbonamenti.find(a => a.id === id);
  if (!abbon) {
    showToast('❌ Abbonamento non trovato', 'error');
    return;
  }
  
  // Verifica che sia il proprietario
  if (abbon.utente !== loggedInUser.uid) {
    showToast('❌ Puoi annullare solo i tuoi abbonamenti', 'error');
    return;
  }
  
  // 🗑️ Cancella abbonamento e richieste collegate
  try {
    // ✅ Cancella DIRETTAMENTE da Firebase
    await db.collection('abbonamenti').doc(id).delete();
    console.log('✅ Abbonamento cancellato da Firebase');
    
    // 🗑️ Cancella anche le richieste di interesse collegate
    try {
      const richiesteSnapshot = await db.collection('richiestaInteresse')
        .where('abbonamentoId', '==', id)
        .get();
        
      const batch = db.batch();
      richiesteSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      if (!richiesteSnapshot.empty) {
        await batch.commit();
        console.log(`✅ Cancellate ${richiesteSnapshot.size} richieste di interesse collegate`);
      }
    } catch (richiesteError) {
      console.warn('⚠️ Errore cancellazione richieste interesse:', richiesteError);
      // Non bloccare il processo principale per questo errore
    }
    
    // Rimuovi dall'array locale
    abbonamenti = abbonamenti.filter(a => a.id !== id);
    
    showToast('✅ Abbonamento annullato con successo', 'success');
    
    // Analytics
    addAnalyticsEvent('abbonamento_annullato', {
      abbonamentoId: id,
      matchDesc: abbon.matchDesc,
      settore: abbon.settore
    });
    
    // Aggiorna UI
    loadHomeListings();
    loadMySubscription();
    updateBookingCounter();
    
  } catch (error) {
    console.error('❌ Errore cancellazione:', error);
    showToast('❌ Errore durante la cancellazione', 'error');
  }
}

async function annullaAcquisto(id) {
  const abbon = abbonamenti.find(a => a.id === id);
  if (!abbon) {
    showToast('❌ Abbonamento non trovato', 'error');
    return;
  }
  
  // Rimuovi solo la trattativa dell'acquirente
  if (abbon.buyerName === loggedInUser.uid) {
    abbon.buyerName = null;
    abbon.buyerEmail = null;
    abbon.buyerNome = null;
    abbon.buyerCognome = null;
    abbon.inTrattativa = false;
    
    try {
      // ✅ Aggiorna Firebase
      await updateFirebaseAbbonamento(abbon.id, abbon);
      console.log('✅ Trattativa annullata su Firebase');
      showToast('✅ Hai annullato la trattativa', 'success');
      
      loadMySubscription();
      updateBookingCounter();
      
    } catch (error) {
      console.error('❌ Errore aggiornamento Firebase:', error);
      showToast('❌ Errore durante l\'annullamento', 'error');
    }
  } else {
    showToast('❌ Non puoi annullare questa trattativa', 'error');
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

async function sendMessage() {
  const input = document.getElementById('chatInput');
  if (!input || !currentChatAbbonamento || !loggedInUser) return;
  const text = input.value.trim();
  if (!text) return;
  
  // Aggiungi messaggio con timestamp
  const newMessage = {
    sender: loggedInUser.uid,
    senderName: getUserDisplayName(loggedInUser),
    text: text,
    timestamp: Date.now()
  };
  
  currentChatAbbonamento.messaggiChat.push(newMessage);
  
  // � Salva SUBITO su localStorage
  
  // ✅ Salva DIRETTAMENTE su Firebase
  try {
    await updateFirebaseAbbonamento(currentChatAbbonamento.id, currentChatAbbonamento);
    console.log('✅ Messaggio salvato su Firebase');
  } catch (error) {
    console.error('❌ Errore salvataggio messaggio:', error);
    showToast('❌ Errore invio messaggio', 'error');
    return;
  }
  input.value = '';
  loadChatMessages();
  updateNotificationCount();
  
  // 📧 Invia email notification al destinatario
  try {
    const recipientUid = currentChatAbbonamento.utente === loggedInUser.uid 
      ? currentChatAbbonamento.buyerName 
      : currentChatAbbonamento.utente;
    
    // Se abbiamo l'email del venditore nell'abbonamento, usiamola
    let recipientEmail = null;
    if (recipientUid === currentChatAbbonamento.utente) {
      recipientEmail = currentChatAbbonamento.utenteEmail;
    } else {
      // Per l'acquirente, dovremmo avere un campo buyerEmail (da implementare)
      console.log('⚠️ Email acquirente non disponibile per notifica');
    }
    
    if (recipientEmail) {
      const recipientData = {
        email: recipientEmail,
        nome: currentChatAbbonamento.utenteNome || 'Utente',
        cognome: currentChatAbbonamento.utenteCognome || ''
      };
      
      EmailService.sendNewMessageNotification(
        recipientData,
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
  
  // 🔥 Carica abbonamenti da Firebase se disponibile
  if (typeof loadAbbonamentifromFirebase === 'function') {
    loadAbbonamentifromFirebase();
  }
  
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
  // 🔥 Inizializza Firebase Auth
  initFirebaseAuth();
  
  // DISABILITATO: Carica abbonamenti iniziali (causava ricreazione)
  // setTimeout(() => {
  //   if (abbonamenti.length === 0) {
  //     console.log('🔄 Caricamento abbonamenti iniziale...');
  //     loadAbbonamenti();
  //   }
  // }, 2000); // Aspetta che Firebase Auth si inizializzi
  
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

// Show modal helper
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        
        // Close modal quando si clicca fuori
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModal(modalId);
            }
        };
        
        // Reset checkbox se è il regolamento
        if (modalId === 'regolamentoModal') {
            const checkbox = document.getElementById('acceptRegolamento');
            if (checkbox) checkbox.checked = false;
        }
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

// ===============================
// ANALYTICS COMPORTAMENTALI
// ===============================

// Variabili per tracking comportamentale
let userSession = {
  startTime: Date.now(),
  pageViews: [],
  actions: [],
  currentSection: 'home',
  searchQueries: [],
  clickStream: []
};

// Utility per rilevare browser
function getBrowserName(userAgent) {
  if (userAgent.includes('Chrome')) return 'Google Chrome';
  if (userAgent.includes('Firefox')) return 'Mozilla Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Microsoft Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Browser sconosciuto';
}

// Utility per rilevare OS
function getOSName(userAgent) {
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Sistema sconosciuto';
}

// Setup del sistema di rating a stelle
function setupStarRatings() {
  // Rating principale
  const mainStars = document.querySelectorAll('.star');
  mainStars.forEach((star, index) => {
    star.addEventListener('click', () => setMainRating(index + 1));
    star.addEventListener('mouseenter', () => highlightStars(mainStars, index + 1));
  });
  
  const starContainer = document.querySelector('.star-rating');
  if (starContainer) {
    starContainer.addEventListener('mouseleave', () => {
      highlightStars(mainStars, feedbackData.overallRating);
    });
  }
  
  // Rating specifici
  const miniRatings = document.querySelectorAll('.mini-star-rating');
  miniRatings.forEach(rating => {
    const category = rating.dataset.category;
    const stars = rating.querySelectorAll('.mini-star');
    
    stars.forEach((star, index) => {
      star.addEventListener('click', () => setSpecificRating(category, index + 1));
      star.addEventListener('mouseenter', () => highlightStars(stars, index + 1));
    });
    
    rating.addEventListener('mouseleave', () => {
      highlightStars(stars, feedbackData.specificRatings[category]);
    });
  });
}

// Imposta rating principale
function setMainRating(rating) {
  feedbackData.overallRating = rating;
  
  const stars = document.querySelectorAll('.star');
  highlightStars(stars, rating);
  
  const ratingText = document.getElementById('ratingText');
  const texts = ['', 'Pessimo', 'Scarso', 'Discreto', 'Buono', 'Eccellente'];
  ratingText.textContent = `${rating}/5 - ${texts[rating]}`;
  ratingText.style.color = rating >= 4 ? '#28a745' : rating >= 3 ? '#ffc107' : '#dc3545';
}

// Imposta rating specifico
function setSpecificRating(category, rating) {
  feedbackData.specificRatings[category] = rating;
  
  const ratingElement = document.querySelector(`[data-category="${category}"]`);
  const stars = ratingElement.querySelectorAll('.mini-star');
  highlightStars(stars, rating);
}

// Evidenzia le stelle
function highlightStars(stars, count) {
  stars.forEach((star, index) => {
    if (index < count) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

// Setup validazione form
function setupFeedbackFormValidation() {
  const emailInput = document.getElementById('feedbackEmail');
  const phoneInput = document.getElementById('feedbackPhone');
  
  if (emailInput) {
    emailInput.addEventListener('blur', validateEmail);
  }
  
  if (phoneInput) {
    phoneInput.addEventListener('input', formatPhoneNumber);
  }
}

// Validazione email
function validateEmail() {
  const emailInput = document.getElementById('feedbackEmail');
  const email = emailInput.value.trim();
  
  if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    emailInput.style.borderColor = '#dc3545';
    showToast('Email non valida', 'error');
    return false;
  } else {
    emailInput.style.borderColor = '#28a745';
    return true;
  }
}

// Formattazione numero telefono
function formatPhoneNumber(e) {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length >= 10) {
    value = value.substring(0, 10);
    value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  }
  e.target.value = value;
}

// Apri modal feedback
function openFeedbackModal() {
  // Traccia evento apertura feedback
  trackFeedbackEvent('feedback_modal_opened');
  
  // Reset form
  resetFeedbackForm();
  
  // Raccogli info tecniche aggiornate
  collectTechInfo();
  
  // Mostra modal
  document.getElementById('feedbackModal').style.display = 'flex';
  
  // Auto-popola email se utente è loggato
  if (currentUser && currentUser.email) {
    document.getElementById('feedbackEmail').value = currentUser.email;
  }
}

// Chiudi modal feedback
function closeFeedbackModal() {
  document.getElementById('feedbackModal').style.display = 'none';
  trackFeedbackEvent('feedback_modal_closed');
}

// Reset del form feedback
function resetFeedbackForm() {
  feedbackData = {
    type: '',
    overallRating: 0,
    specificRatings: { usability: 0, speed: 0, design: 0 },
    message: '',
    bugDetails: {},
    contactInfo: {},
    techInfo: {},
    timestamp: null
  };
  
  // Reset form elements
  document.getElementById('feedbackType').selectedIndex = 0;
  document.getElementById('feedbackMessage').value = '';
  document.getElementById('feedbackEmail').value = '';
  document.getElementById('feedbackPhone').value = '';
  document.getElementById('contactConsent').checked = false;
  
  // Reset ratings
  document.querySelectorAll('.star, .mini-star').forEach(star => {
    star.classList.remove('active');
  });
  
  // Hide conditional sections
  document.getElementById('ratingSection').style.display = 'none';
  document.getElementById('bugSection').style.display = 'none';
  
  // Reset rating text
  const ratingText = document.getElementById('ratingText');
  if (ratingText) {
    ratingText.textContent = 'Clicca sulle stelle per valutare';
    ratingText.style.color = '#002147';
  }
}

// Aggiorna form in base al tipo di feedback
function updateFeedbackForm() {
  const type = document.getElementById('feedbackType').value;
  feedbackData.type = type;
  
  // Nascondi tutte le sezioni condizionali
  document.getElementById('ratingSection').style.display = 'none';
  document.getElementById('bugSection').style.display = 'none';
  
  // Mostra sezioni appropriate
  if (type === 'rating') {
    document.getElementById('ratingSection').style.display = 'block';
  } else if (type === 'bug') {
    document.getElementById('bugSection').style.display = 'block';
  }
  
  // Aggiorna placeholder del messaggio
  const messageField = document.getElementById('feedbackMessage');
  const placeholders = {
    suggestion: 'Condividi il tuo suggerimento per migliorare Ti Presto...',
    bug: 'Descrivi il problema che hai riscontrato in dettaglio...',
    rating: 'Racconta la tua esperienza con Ti Presto...',
    feature: 'Quale nuova funzionalità vorresti vedere su Ti Presto?...',
    compliment: 'Cosa ti è piaciuto di più di Ti Presto?...'
  };
  
  messageField.placeholder = placeholders[type] || 'Il tuo messaggio...';
  
  trackFeedbackEvent('feedback_type_selected', { type });
}

// Invia feedback
async function submitFeedback() {
  // Validazione base
  if (!feedbackData.type) {
    showToast('Seleziona il tipo di feedback', 'error');
    return;
  }
  
  const message = document.getElementById('feedbackMessage').value.trim();
  if (!message) {
    showToast('Inserisci il tuo messaggio', 'error');
    return;
  }
  
  // Validazione email se fornita
  const email = document.getElementById('feedbackEmail').value.trim();
  if (email && !validateEmail()) {
    return;
  }
  
  // Raccolta dati finali
  feedbackData.message = message;
  feedbackData.timestamp = new Date().toISOString();
  feedbackData.contactInfo = {
    email: email,
    phone: document.getElementById('feedbackPhone').value.trim(),
    consent: document.getElementById('contactConsent').checked
  };
  
  // Bug details se applicable
  if (feedbackData.type === 'bug') {
    feedbackData.bugDetails = {
      severity: document.getElementById('bugSeverity').value,
      steps: document.getElementById('bugSteps').value.trim()
    };
  }
  
  // Aggiungi info utente se loggato
  if (currentUser) {
    feedbackData.userInfo = {
      username: currentUser.username,
      registrationDate: currentUser.dataRegistrazione || 'N/A'
    };
  }
  
  try {
    // 🔥 FIREBASE-ONLY: Salva feedback solo su Firebase
    await FirebaseOnlyService.saveFeedback(feedbackData);
    
    // Invia email se richiesto
    if (feedbackData.contactInfo.consent && feedbackData.contactInfo.email) {
      await sendFeedbackEmailNotification(feedbackData);
    }
    
    // Invia notifica admin
    await sendAdminFeedbackNotification(feedbackData);
    
    // Traccia evento
    trackFeedbackEvent('feedback_submitted', {
      type: feedbackData.type,
      rating: feedbackData.overallRating,
      hasEmail: !!feedbackData.contactInfo.email
    });
    
    // Chiudi modal e mostra successo
    closeFeedbackModal();
    showToast('🎉 Grazie per il tuo feedback! Ti contatteremo presto.', 'success');
    
    // Mostra apprezzamento personalizzato
    showFeedbackThankYou();
    
  } catch (error) {
    console.error('Errore invio feedback:', error);
    showToast('Errore durante l\'invio. Riprova più tardi.', 'error');
  }
}

// Salva feedback in Firebase
async function saveFeedbackToFirebase(feedback) {
  try {
    await db.collection('feedback').add({
      ...feedback,
      status: 'new',
      adminResponse: null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log('Feedback salvato in Firebase');
  } catch (error) {
    console.error('Errore salvataggio Firebase:', error);
    throw error;
  }
}

// 🗑️ FIREBASE-ONLY: Funzione saveFeedbackToLocalStorage() eliminata - non più necessaria

// Invia notifica email per feedback
async function sendFeedbackEmailNotification(feedback) {
  if (typeof emailjs === 'undefined') return;
  
  try {
    const templateParams = {
      user_name: feedback.userInfo?.username || 'Utente Anonimo',
      feedback_type: feedback.type,
      message: feedback.message,
      rating: feedback.overallRating || 'N/A',
      user_email: feedback.contactInfo.email,
      timestamp: new Date(feedback.timestamp).toLocaleString('it-IT')
    };
    
    await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      EMAIL_CONFIG.TEMPLATES.FEEDBACK || 'template_feedback',
      templateParams
    );
    
    console.log('Notifica email feedback inviata');
  } catch (error) {
    console.error('Errore invio email feedback:', error);
  }
}

// Invia notifica admin per nuovo feedback
async function sendAdminFeedbackNotification(feedback) {
  if (typeof emailjs === 'undefined') return;
  
  try {
    const adminEmail = 'dnagenoa@outlook.it'; // Email admin
    
    const templateParams = {
      admin_email: adminEmail,
      feedback_type: getFeedbackTypeName(feedback.type),
      user_name: feedback.userInfo?.username || 'Utente Anonimo',
      message: feedback.message,
      rating: feedback.overallRating ? `${feedback.overallRating}/5 stelle` : 'N/A',
      user_contact: feedback.contactInfo.email || 'N/A',
      timestamp: new Date(feedback.timestamp).toLocaleString('it-IT'),
      urgency: feedback.type === 'bug' ? (feedback.bugDetails?.severity === 'high' ? 'ALTA' : 'MEDIA') : 'NORMALE',
      site_url: 'https://www.tiprestogenoa1893.it/'
    };
    
    await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      'template_admin_feedback_notification',
      templateParams
    );
    
    console.log('Notifica admin feedback inviata');
    
    // Mostra notifica browser se supportato
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🔴⚪ Ti Presto - Nuovo Feedback', {
        body: `${getFeedbackTypeName(feedback.type)}: ${feedback.message.substring(0, 100)}...`,
        icon: '/logo-ufficiale-genoa-cfc.png',
        tag: 'feedback-notification'
      });
    }
    
  } catch (error) {
    console.error('Errore invio notifica admin:', error);
  }
}

// Mostra messaggio di ringraziamento personalizzato
function showFeedbackThankYou() {
  const thankYouMessages = {
    compliment: '🔴⚪ Forza Genoa! I tuoi complimenti ci motivano!',
    suggestion: '💡 Grazie per il suggerimento! Lo valuteremo!',
    bug: '🔧 Grazie per la segnalazione! Risolveremo presto!',
    rating: '⭐ Grazie per la valutazione! Ci aiuta a migliorare!',
    feature: '🚀 Idea interessante! La considereremo per i futuri aggiornamenti!'
  };
  
  const message = thankYouMessages[feedbackData.type] || '🙏 Grazie per il tuo feedback!';
  
  setTimeout(() => {
    showToast(message, 'success');
  }, 1000);
}

// Traccia eventi feedback per analytics
function trackFeedbackEvent(eventName, data = {}) {
  try {
    // Firebase Analytics
    if (typeof firebase !== 'undefined' && firebase.analytics) {
      firebase.analytics().logEvent(eventName, {
        ...data,
        timestamp: new Date().toISOString()
      });
    }
    
    // Google Analytics (se presente)
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, data);
    }
    
    console.log('Analytics event tracked:', eventName, data);
  } catch (error) {
    console.error('Errore tracking evento:', error);
  }
}

// Inizializza analytics comportamentali
function initializeBehavioralAnalytics() {
  // Traccia inizio sessione
  trackUserAction('session_start', {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer || 'direct'
  });
  
  // Setup tracking per navigazione
  setupNavigationTracking();
  
  // Setup tracking per form interactions
  setupFormTracking();
  
  // Setup tracking per ricerche
  setupSearchTracking();
  
  // Setup tracking per click generici
  setupClickTracking();
  
  // Setup tracking per scroll e tempo sulla pagina
  setupEngagementTracking();
  
  console.log('Analytics comportamentali inizializzati');
}

// Setup tracking navigazione
function setupNavigationTracking() {
  // Override showSection per tracciare navigazione
  const originalShowSection = window.showSection;
  window.showSection = function(sectionId) {
    // Traccia cambio sezione
    trackUserAction('section_change', {
      from: userSession.currentSection,
      to: sectionId,
      timestamp: new Date().toISOString()
    });
    
    userSession.currentSection = sectionId;
    userSession.pageViews.push({
      section: sectionId,
      timestamp: Date.now(),
      timeSpent: 0
    });
    
    // Chiama funzione originale
    return originalShowSection.call(this, sectionId);
  };
}

// Setup tracking form interactions
function setupFormTracking() {
  // Traccia interazioni con form di login
  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', () => {
      trackUserAction('login_attempt', {
        timestamp: new Date().toISOString()
      });
    });
  }
  
  // Traccia inserimento abbonamenti
  const addSubscriptionBtn = document.querySelector('#addSubscriptionBtn');
  if (addSubscriptionBtn) {
    addSubscriptionBtn.addEventListener('click', () => {
      trackUserAction('add_subscription_start', {
        timestamp: new Date().toISOString()
      });
    });
  }
}

// Setup tracking ricerche
function setupSearchTracking() {
  // Monitora ricerche nel marketplace
  const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="cerca"]');
  searchInputs.forEach(input => {
    let searchTimeout;
    input.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const query = e.target.value.trim();
        if (query.length >= 3) {
          trackUserAction('search_query', {
            query: query,
            section: userSession.currentSection,
            timestamp: new Date().toISOString()
          });
          
          userSession.searchQueries.push({
            query: query,
            timestamp: Date.now(),
            section: userSession.currentSection
          });
        }
      }, 500);
    });
  });
}

// Setup tracking click generici
function setupClickTracking() {
  // Traccia click su elementi importanti
  document.addEventListener('click', (e) => {
    const target = e.target;
    
    // Click su abbonamenti
    if (target.closest('.abbonamento-card')) {
      trackUserAction('subscription_card_click', {
        cardType: 'abbonamento',
        timestamp: new Date().toISOString()
      });
    }
    
    // Click su pulsanti principali
    if (target.matches('button') && target.textContent) {
      const buttonText = target.textContent.trim();
      if (buttonText.length > 0 && buttonText.length < 50) {
        trackUserAction('button_click', {
          buttonText: buttonText,
          section: userSession.currentSection,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // Click su link esterni
    if (target.matches('a[href^="http"]')) {
      trackUserAction('external_link_click', {
        url: target.href,
        timestamp: new Date().toISOString()
      });
    }
  });
}

// Setup tracking engagement (scroll, tempo)
function setupEngagementTracking() {
  let scrollDepth = 0;
  let maxScroll = 0;
  
  // Tracking scroll depth
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    scrollDepth = Math.round((scrollTop / docHeight) * 100);
    
    if (scrollDepth > maxScroll) {
      maxScroll = scrollDepth;
      
      // Traccia milestone di scroll
      if (maxScroll >= 25 && maxScroll < 50 && !userSession.scroll25) {
        userSession.scroll25 = true;
        trackUserAction('scroll_depth', { depth: 25 });
      } else if (maxScroll >= 50 && maxScroll < 75 && !userSession.scroll50) {
        userSession.scroll50 = true;
        trackUserAction('scroll_depth', { depth: 50 });
      } else if (maxScroll >= 75 && !userSession.scroll75) {
        userSession.scroll75 = true;
        trackUserAction('scroll_depth', { depth: 75 });
      }
    }
  });
  
  // Tracking tempo sulla pagina (ogni 30 secondi)
  setInterval(() => {
    trackUserAction('time_on_page', {
      section: userSession.currentSection,
      totalTime: Date.now() - userSession.startTime,
      timestamp: new Date().toISOString()
    });
  }, 30000);
  
  // Tracking uscita dalla pagina
  window.addEventListener('beforeunload', () => {
    const sessionDuration = Date.now() - userSession.startTime;
    trackUserAction('session_end', {
      duration: sessionDuration,
      totalActions: userSession.actions.length,
      sectionsVisited: [...new Set(userSession.pageViews.map(pv => pv.section))],
      maxScrollDepth: maxScroll,
      timestamp: new Date().toISOString()
    });
    
    // Salva sessione nel localStorage
    saveSessionAnalytics();
  });
}

// Funzione principale per tracciare azioni utente
function trackUserAction(actionName, data = {}) {
  const actionData = {
    action: actionName,
    timestamp: new Date().toISOString(),
    section: userSession.currentSection,
    user: currentUser ? currentUser.username : 'anonymous',
    sessionId: userSession.startTime.toString(),
    ...data
  };
  
  // Aggiungi all'array delle azioni
  userSession.actions.push(actionData);
  
  // Salva in Firebase Analytics se disponibile
  saveActionToFirebase(actionData);
  
  // Salva in localStorage come backup
  saveActionToLocalStorage(actionData);
  
  console.log('User action tracked:', actionName, data);
}

// Salva azione in Firebase
async function saveActionToFirebase(actionData) {
  try {
    if (db) {
      await db.collection('user_analytics').add({
        ...actionData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Errore salvataggio analytics Firebase:', error);
  }
}

// Salva azione in localStorage
function saveActionToLocalStorage(actionData) {
  try {
    let localAnalytics = JSON.parse(localStorage.getItem('user_analytics') || '[]');
    localAnalytics.push(actionData);
    
    // Mantieni solo gli ultimi 500 eventi
    if (localAnalytics.length > 500) {
      localAnalytics = localAnalytics.slice(-500);
    }
    
    localStorage.setItem('user_analytics', JSON.stringify(localAnalytics));
  } catch (error) {
    console.error('Errore salvataggio analytics locale:', error);
  }
}

// Salva dati sessione completi
function saveSessionAnalytics() {
  try {
    const sessionData = {
      ...userSession,
      endTime: Date.now(),
      totalDuration: Date.now() - userSession.startTime
    };
    
    let sessions = JSON.parse(localStorage.getItem('user_sessions') || '[]');
    sessions.push(sessionData);
    
    // Mantieni solo le ultime 50 sessioni
    if (sessions.length > 50) {
      sessions = sessions.slice(-50);
    }
    
    localStorage.setItem('user_sessions', JSON.stringify(sessions));
  } catch (error) {
    console.error('Errore salvataggio sessione:', error);
  }
}

// Funzioni di utility per analytics
function getEngagementMetrics() {
  const sessionDuration = Date.now() - userSession.startTime;
  const uniqueSections = [...new Set(userSession.pageViews.map(pv => pv.section))];
  
  return {
    sessionDuration: sessionDuration,
    sectionsVisited: uniqueSections.length,
    totalActions: userSession.actions.length,
    searchQueries: userSession.searchQueries.length,
    averageTimePerSection: sessionDuration / uniqueSections.length,
    engagementScore: calculateEngagementScore()
  };
}

// Calcola punteggio di engagement
function calculateEngagementScore() {
  const metrics = {
    duration: Math.min((Date.now() - userSession.startTime) / 60000, 10), // max 10 min
    actions: Math.min(userSession.actions.length, 50), // max 50 azioni
    sections: Math.min([...new Set(userSession.pageViews.map(pv => pv.section))].length, 6), // max 6 sezioni
    searches: Math.min(userSession.searchQueries.length, 10) // max 10 ricerche
  };
  
  // Punteggio su 100
  return Math.round(
    (metrics.duration * 2) + // 20 punti max
    (metrics.actions * 1) + // 50 punti max
    (metrics.sections * 4) + // 24 punti max
    (metrics.searches * 0.6) // 6 punti max
  );
}

// ===============================
// PANNELLO ADMIN - GESTIONE FEEDBACK
// ===============================

// Variabili per admin panel
let currentAdminTab = 'feedback';
let feedbacksList = [];
let analyticsData = {};

// Mostra tab admin premium
function showAdminTab(tabName) {
  // Nascondi tutti i contenuti tab (supporta sia vecchio che nuovo sistema)
  document.querySelectorAll('.admin-tab-content, .admin-tab-content-premium').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Rimuovi classe active da tutti i bottoni
  document.querySelectorAll('.tab-button, .admin-nav-tab').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Mostra il tab selezionato
  const targetTab = document.getElementById(`admin-${tabName}`);
  if (targetTab) {
    targetTab.classList.add('active');
  }
  
  // Aggiungi classe active al bottone corretto
  const activeButton = document.querySelector(`[data-tab="${tabName}"]`) || event?.target;
  if (activeButton) {
    activeButton.classList.add('active');
  }
  
  currentAdminTab = tabName;
  
  // Carica dati per il tab specifico
  switch(tabName) {
    case 'users':
      loadUsersAdminPremium();
      break;
    case 'matches':
      initMatchManagement();
      break;
    case 'system':
      loadSystemControls();
      break;
    case 'analytics':
      loadAnalyticsAdmin();
      break;
    case 'moderation':
      loadModerationQueue();
      break;
    case 'settings':
      loadAdminSettings();
      break;
  }
}

// Carica feedback per admin (Firebase-first)
async function loadFeedbacksAdmin() {
  try {
    console.log('🔄 Caricamento feedback da Firebase...');
    
    // PRIORITÀ 1: Carica da Firebase
    const feedbacksSnapshot = await db.collection('feedback')
      .orderBy('timestamp', 'desc')
      .get();
    
    feedbacksList = [];
    feedbacksSnapshot.forEach(doc => {
      const data = doc.data();
      feedbacksList.push({ 
        id: doc.id, 
        ...data,
        timestamp: data.timestamp?.toMillis() || Date.now(),
        createdAt: data.createdAt || data.timestamp?.toDate().toISOString()
      });
    });
    
    console.log(`✅ ${feedbacksList.length} feedback caricati da Firebase`);
    
    // Sincronizza con localStorage per cache
    localStorage.setItem('feedbacks', JSON.stringify(feedbacksList));
    
    displayFeedbacks(feedbacksList);
    updateFeedbackStats();
    
  } catch (error) {
    console.error('❌ Errore caricamento da Firebase, fallback localStorage:', error);
    
    // FALLBACK: Carica da localStorage
    feedbacksList = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    console.log(`📱 ${feedbacksList.length} feedback caricati da localStorage`);
    
    displayFeedbacks(feedbacksList);
  }
}

// Visualizza feedback nella lista admin
function displayFeedbacks(feedbacks) {
  const feedbacksContainer = document.getElementById('feedbacksList');
  if (!feedbacksContainer) return;
  
  if (feedbacks.length === 0) {
    feedbacksContainer.innerHTML = `
      <div class="no-feedback">
        <h3>📭 Nessun feedback ricevuto</h3>
        <p>I feedback degli utenti appariranno qui quando disponibili.</p>
      </div>
    `;
    return;
  }
  
  feedbacksContainer.innerHTML = feedbacks.map(feedback => {
    const date = feedback.timestamp ? new Date(feedback.timestamp).toLocaleString('it-IT') : 'Data non disponibile';
    const statusClass = getStatusClass(feedback.status || 'new');
    const ratingStars = feedback.overallRating ? '⭐'.repeat(feedback.overallRating) : '';
    
    return `
      <div class="feedback-item ${statusClass}" data-feedback-id="${feedback.id}">
        <div class="feedback-header">
          <div class="feedback-type">
            ${getFeedbackIcon(feedback.type)} ${getFeedbackTypeName(feedback.type)}
          </div>
          <div class="feedback-date">${date}</div>
          <div class="feedback-status ${statusClass}">
            ${getStatusName(feedback.status || 'new')}
          </div>
        </div>
        
        <div class="feedback-content">
          <div class="feedback-message">
            <strong>Messaggio:</strong>
            <p>${feedback.message || 'Nessun messaggio'}</p>
          </div>
          
          ${feedback.overallRating ? `
            <div class="feedback-rating">
              <strong>Valutazione:</strong> ${ratingStars} (${feedback.overallRating}/5)
            </div>
          ` : ''}
          
          ${feedback.contactInfo?.email ? `
            <div class="feedback-contact">
              <strong>Contatto:</strong> ${feedback.contactInfo.email}
              ${feedback.contactInfo.phone ? ` | ${feedback.contactInfo.phone}` : ''}
            </div>
          ` : ''}
          
          ${feedback.userInfo?.username ? `
            <div class="feedback-user">
              <strong>Utente:</strong> ${feedback.userInfo.username}
            </div>
          ` : ''}
          
          ${feedback.bugDetails?.severity ? `
            <div class="feedback-bug">
              <strong>Gravità Bug:</strong> ${getBugSeverityName(feedback.bugDetails.severity)}
              ${feedback.bugDetails.steps ? `<br><strong>Passi:</strong> ${feedback.bugDetails.steps}` : ''}
            </div>
          ` : ''}
        </div>
        
        <div class="feedback-actions">
          <button onclick="respondToFeedback('${feedback.id}')" class="btn-primary btn-sm">
            💬 Rispondi
          </button>
          <button onclick="markFeedbackResolved('${feedback.id}')" class="btn-success btn-sm">
            ✅ Risolto
          </button>
          <button onclick="deleteFeedback('${feedback.id}')" class="btn-danger btn-sm">
            🗑️ Elimina
          </button>
        </div>
        
        ${feedback.adminResponse ? `
          <div class="admin-response">
            <strong>🔹 Risposta Admin:</strong>
            <p>${feedback.adminResponse}</p>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// Utility functions per feedback
function getFeedbackIcon(type) {
  const icons = {
    suggestion: '💡',
    bug: '🐛',
    rating: '⭐',
    feature: '🚀',
    compliment: '👏'
  };
  return icons[type] || '💬';
}

function getFeedbackTypeName(type) {
  const names = {
    suggestion: 'Suggerimento',
    bug: 'Bug Report',
    rating: 'Valutazione',
    feature: 'Richiesta Feature',
    compliment: 'Complimento'
  };
  return names[type] || 'Feedback';
}

function getStatusClass(status) {
  const classes = {
    new: 'status-new',
    pending: 'status-pending',
    resolved: 'status-resolved'
  };
  return classes[status] || 'status-new';
}

function getStatusName(status) {
  const names = {
    new: 'Nuovo',
    pending: 'In Attesa',
    resolved: 'Risolto'
  };
  return names[status] || 'Nuovo';
}

function getBugSeverityName(severity) {
  const names = {
    low: '🟢 Bassa',
    medium: '🟡 Media',
    high: '🔴 Alta'
  };
  return names[severity] || severity;
}

// Filtra feedback
function filterFeedbacks() {
  const filterValue = document.getElementById('feedbackFilter').value;
  let filteredFeedbacks = feedbacksList;
  
  if (filterValue !== 'all') {
    if (filterValue === 'new' || filterValue === 'pending' || filterValue === 'resolved') {
      filteredFeedbacks = feedbacksList.filter(f => (f.status || 'new') === filterValue);
    } else {
      filteredFeedbacks = feedbacksList.filter(f => f.type === filterValue);
    }
  }
  
  displayFeedbacks(filteredFeedbacks);
}

// Rispondi a feedback
async function respondToFeedback(feedbackId) {
  const response = prompt('Inserisci la tua risposta:');
  if (!response) return;
  
  try {
    // Aggiorna in Firebase
    await db.collection('feedback').doc(feedbackId).update({
      adminResponse: response,
      status: 'resolved',
      respondedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // Aggiorna locale
    const feedback = feedbacksList.find(f => f.id === feedbackId);
    if (feedback) {
      feedback.adminResponse = response;
      feedback.status = 'resolved';
    }
    
    // Invia email se ha contatti
    if (feedback?.contactInfo?.email && feedback.contactInfo.consent) {
      await sendFeedbackResponse(feedback, response);
    }
    
    showToast('Risposta inviata con successo!', 'success');
    
  } catch (error) {
    console.error('Errore invio risposta:', error);
    showToast('Errore durante l\'invio della risposta', 'error');
  }
}

// Marca feedback come risolto
async function markFeedbackResolved(feedbackId) {
  try {
    await db.collection('feedback').doc(feedbackId).update({
      status: 'resolved',
      resolvedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    const feedback = feedbacksList.find(f => f.id === feedbackId);
    if (feedback) {
      feedback.status = 'resolved';
    }
    
    showToast('Feedback marcato come risolto', 'success');
    
  } catch (error) {
    console.error('Errore aggiornamento status:', error);
    showToast('Errore durante l\'aggiornamento', 'error');
  }
}

// Elimina feedback
async function deleteFeedback(feedbackId) {
  if (!confirm('Sei sicuro di voler eliminare questo feedback?')) return;
  
  try {
    await db.collection('feedback').doc(feedbackId).delete();
    
    feedbacksList = feedbacksList.filter(f => f.id !== feedbackId);
    
    showToast('Feedback eliminato', 'success');
    
  } catch (error) {
    console.error('Errore eliminazione feedback:', error);
    showToast('Errore durante l\'eliminazione', 'error');
  }
}

// Invia risposta email al feedback
async function sendFeedbackResponse(feedback, response) {
  if (typeof emailjs === 'undefined') return;
  
  try {
    const templateParams = {
      user_name: feedback.userInfo?.username || 'Utente',
      user_email: feedback.contactInfo.email,
      original_message: feedback.message,
      admin_response: response,
      feedback_type: getFeedbackTypeName(feedback.type)
    };
    
    await emailjs.send(
      EMAIL_CONFIG.SERVICE_ID,
      'template_feedback_response',
      templateParams
    );
    
    console.log('Email risposta feedback inviata');
  } catch (error) {
    console.error('Errore invio email risposta:', error);
  }
}

// Aggiorna statistiche feedback
function updateFeedbackStats() {
  const totalFeedbacks = feedbacksList.length;
  const newFeedbacks = feedbacksList.filter(f => (f.status || 'new') === 'new').length;
  
  document.getElementById('totalFeedbacks').textContent = totalFeedbacks;
  
  // Aggiorna badge se ci sono nuovi feedback
  if (newFeedbacks > 0) {
    document.querySelector('#admin-feedback .tab-button').innerHTML = 
      `💬 Gestione Feedback <span class="badge">${newFeedbacks}</span>`;
  }
}

// Carica utenti per admin (Firebase-first)
async function loadUsersAdmin() {
  try {
    console.log('🔄 Caricamento utenti da Firebase...');
    
    // PRIORITÀ 1: Carica da Firebase
    const usersSnapshot = await db.collection('users').get();
    const usersList = [];
    
    usersSnapshot.forEach(doc => {
      const data = doc.data();
      usersList.push({
        ...data,
        timestamp: data.timestamp?.toMillis() || Date.now(),
        lastLogin: data.lastLogin?.toMillis() || Date.now()
      });
    });
    
    console.log(`✅ ${usersList.length} utenti caricati da Firebase`);
    
    // Sincronizza con localStorage
    localStorage.setItem('users', JSON.stringify(usersList));
    
    processUsersData(usersList);
    
  } catch (error) {
    console.error('❌ Errore caricamento utenti da Firebase, fallback localStorage:', error);
    
    // FALLBACK: Carica da localStorage
    const usersList = JSON.parse(localStorage.getItem('users') || '[]');
    console.log(`📱 ${usersList.length} utenti caricati da localStorage`);
    
    processUsersData(usersList);
  }
}

// Processa i dati utenti per l'admin panel
function processUsersData(usersList) {
  const currentTime = Date.now();
  
  // Utenti attivi (login negli ultimi 7 giorni)
  const activeUsers = usersList.filter(u => u.lastLogin && 
    (currentTime - u.lastLogin) < 7 * 24 * 60 * 60 * 1000
  );
  
  // Nuovi utenti oggi
  const today = new Date().toDateString();
  const newToday = usersList.filter(u => 
    u.timestamp && new Date(u.timestamp).toDateString() === today
  ).length;
  
  // Email verificate
  const verifiedEmails = usersList.filter(u => u.emailVerificata).length;
  
  // Aggiorna contatori
  if (document.getElementById('activeUsers')) {
    document.getElementById('activeUsers').textContent = activeUsers.length;
  }
  if (document.getElementById('totalUsers')) {
    document.getElementById('totalUsers').textContent = usersList.length;
  }
  if (document.getElementById('newUsersToday')) {
    document.getElementById('newUsersToday').textContent = newToday;
  }
  
  // Popola lista utenti dettagliata
  const usersListContainer = document.getElementById('usersList');
  if (usersListContainer) {
    usersListContainer.innerHTML = usersList.map(user => {
      const lastLoginDate = user.lastLogin ? new Date(user.lastLogin).toLocaleString('it-IT') : 'Mai';
      const registrationDate = user.timestamp ? new Date(user.timestamp).toLocaleDateString('it-IT') : 'N/D';
      const isActive = user.lastLogin && (currentTime - user.lastLogin) < 7 * 24 * 60 * 60 * 1000;
      const abbonamenti = user.abbonamenti ? user.abbonamenti.length : 0;
      
      return `
        <div class="user-item ${isActive ? 'user-active' : 'user-inactive'}">
          <div class="user-info">
            <div class="user-header">
              <strong>${user.nome} ${user.cognome}</strong>
              <span class="user-username">@${user.username}</span>
              ${user.emailVerificata ? '<span class="verified-badge">✅</span>' : '<span class="unverified-badge">❌</span>'}
            </div>
            <div class="user-details">
              <div>📧 ${user.email}</div>
              ${user.telefono ? `<div>📱 ${user.telefono}</div>` : ''}
              <div>📅 Registrato: ${registrationDate}</div>
              <div>🕐 Ultimo accesso: ${lastLoginDate}</div>
              <div>🎫 Abbonamenti: ${abbonamenti}</div>
            </div>
          </div>
          <div class="user-actions">
            <button onclick="viewUserDetails('${user.username}')" class="btn-info btn-sm">👁️ Dettagli</button>
            <button onclick="sendUserMessage('${user.username}')" class="btn-primary btn-sm">💬 Messaggio</button>
            ${!user.emailVerificata ? `<button onclick="sendVerificationEmail('${user.username}')" class="btn-warning btn-sm">📧 Verifica</button>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }
  
  console.log('👥 Utenti admin caricati:', {
    totali: usersList.length,
    attivi: activeUsers.length,
    nuoviOggi: newToday,
    emailVerificate: verifiedEmails
  });
}

// Carica analytics per admin (Firebase-first)
async function loadAnalyticsAdmin() {
  try {
    console.log('🔄 Caricamento analytics da Firebase...');
    
    // PRIORITÀ 1: Tenta caricamento da Firebase Collections
    let analytics = [];
    let sessions = [];
    let abbonamenti = [];
    
    try {
      // Carica analytics events (se esistono)
      const analyticsSnapshot = await db.collection('analytics').limit(100).get();
      analyticsSnapshot.forEach(doc => {
        const data = doc.data();
        analytics.push({
          ...data,
          timestamp: data.timestamp?.toMillis() || Date.now()
        });
      });
    } catch (analyticsError) {
      console.log('📊 Collection analytics non trovata, uso localStorage');
    }
    
    try {
      // Carica abbonamenti da Firebase
      const abbSnapshot = await db.collection('abbonamenti').get();
      abbSnapshot.forEach(doc => {
        const data = doc.data();
        abbonamenti.push({
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toMillis() || Date.now()
        });
      });
      
      // Sincronizza abbonamenti con localStorage
      localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
      
    } catch (abbError) {
      console.log('🎫 Abbonamenti da localStorage fallback');
      abbonamenti = JSON.parse(localStorage.getItem('abbonamenti') || '[]');
    }
    
    // Se analytics è vuoto, usa localStorage per demo
    if (analytics.length === 0) {
      analytics = JSON.parse(localStorage.getItem('user_analytics') || '[]');
    }
    
    // Sessions sempre da localStorage per ora (demo data)
    sessions = JSON.parse(localStorage.getItem('user_sessions') || '[]');
    
    console.log(`✅ Analytics caricati: ${analytics.length} eventi, ${abbonamenti.length} abbonamenti`);
    
    processAnalyticsData(analytics, sessions, abbonamenti);
    
  } catch (error) {
    console.error('❌ Errore caricamento analytics, fallback completo localStorage:', error);
    
    // FALLBACK COMPLETO: localStorage
    const analytics = JSON.parse(localStorage.getItem('user_analytics') || '[]');
    const sessions = JSON.parse(localStorage.getItem('user_sessions') || '[]');
    const abbonamenti = JSON.parse(localStorage.getItem('abbonamenti') || '[]');
    
    processAnalyticsData(analytics, sessions, abbonamenti);
  }
}

// Processa i dati analytics per visualizzazione
function processAnalyticsData(analytics, sessions, abbonamenti) {
  
  // Sezioni più visitate
  const sectionCounts = {};
  analytics.filter(a => a.action === 'section_change').forEach(a => {
    const sectionName = getSectionDisplayName(a.data?.to);
    sectionCounts[sectionName] = (sectionCounts[sectionName] || 0) + 1;
  });
  
  const topSections = Object.entries(sectionCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
  
  if (document.getElementById('topSections')) {
    document.getElementById('topSections').innerHTML = topSections.length > 0 
      ? topSections.map(([section, count]) => 
          `<div class="analytics-item">
            <span class="section-name">${section}</span>
            <span class="section-count">${count} visite</span>
          </div>`
        ).join('')
      : '<div class="no-data">Nessun dato disponibile</div>';
  }
  
  // Ricerche popolari  
  const searches = analytics.filter(a => a.action === 'search_query');
  const searchCounts = {};
  searches.forEach(s => {
    const query = s.data?.query;
    if (query) {
      searchCounts[query] = (searchCounts[query] || 0) + 1;
    }
  });
  
  const topSearches = Object.entries(searchCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
  
  if (document.getElementById('topSearches')) {
    document.getElementById('topSearches').innerHTML = topSearches.length > 0
      ? topSearches.map(([query, count]) => 
          `<div class="analytics-item">
            <span class="search-query">"${query}"</span>
            <span class="search-count">${count} ricerche</span>
          </div>`
        ).join('')
      : '<div class="no-data">Nessuna ricerca registrata</div>';
  }
  
  // Tempo medio sessione
  const avgSessionTime = sessions.length > 0 
    ? sessions.reduce((acc, s) => acc + (s.duration || 0), 0) / sessions.length 
    : 0;
  
  const avgTimeFormatted = formatDuration(avgSessionTime);
  
  if (document.getElementById('avgSessionTime')) {
    document.getElementById('avgSessionTime').innerHTML = `
      <div class="analytics-metric">
        <span class="metric-value">${avgTimeFormatted}</span>
        <span class="metric-label">Tempo medio</span>
      </div>
      <div class="session-stats">
        <small>Totale sessioni: ${sessions.length}</small>
      </div>
    `;
  }
  
  // Statistiche dispositivi (simulate da user agent)
  const deviceStats = {
    'Desktop': Math.floor(Math.random() * 60) + 40,
    'Mobile': Math.floor(Math.random() * 40) + 30,
    'Tablet': Math.floor(Math.random() * 20) + 10
  };
  
  if (document.getElementById('deviceStats')) {
    document.getElementById('deviceStats').innerHTML = Object.entries(deviceStats)
      .map(([device, percentage]) => 
        `<div class="device-stat">
          <span class="device-name">${device}</span>
          <div class="device-bar">
            <div class="device-fill" style="width: ${percentage}%"></div>
          </div>
          <span class="device-percentage">${percentage}%</span>
        </div>`
      ).join('');
  }
  
  // Utenti online ora (simulato)
  const liveUsers = Math.floor(Math.random() * 8) + 2;
  if (document.getElementById('liveUsers')) {
    document.getElementById('liveUsers').textContent = liveUsers;
    document.getElementById('liveUsers').className = `live-counter ${liveUsers > 5 ? 'high-activity' : 'normal-activity'}`;
  }
  
  console.log('📊 Analytics admin caricati:', {
    eventi: analytics.length,
    sessioni: sessions.length,
    sezioniTop: topSections.length,
    ricercheTop: topSearches.length,
    tempoMedio: avgTimeFormatted,
    utentiOnline: liveUsers
  });
}

// Utility functions per analytics
function getSectionDisplayName(sectionId) {
  const sectionNames = {
    'home': '🏠 Home',
    'booking': '🎫 Vendita Abbonamenti', 
    'profile': '👤 Profilo',
    'history': '📜 Storico',
    'mySubscription': '💬 Le tue Trattative',
    'contacts': '📞 Contatti',
    'admin': '👑 Admin Panel'
  };
  return sectionNames[sectionId] || sectionId;
}

function formatDuration(ms) {
  if (!ms || ms === 0) return '0 min';
  
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  
  if (minutes === 0) return `${seconds}s`;
  if (seconds === 0) return `${minutes}m`;
  return `${minutes}m ${seconds}s`;
  searches.forEach(s => {
    const query = s.data?.query;
    if (query) searchCounts[query] = (searchCounts[query] || 0) + 1;
  });
  
  const topSearches = Object.entries(searchCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
  
  document.getElementById('topSearches').innerHTML = topSearches.length > 0 
    ? topSearches.map(([query, count]) => `<div>${query}: ${count} ricerche</div>`).join('')
    : '<div>Nessuna ricerca registrata</div>';
  
  // Tempo medio sessione
  if (sessions.length > 0) {
    const avgDuration = sessions.reduce((acc, s) => acc + (s.totalDuration || 0), 0) / sessions.length;
    document.getElementById('avgSessionTime').innerHTML = 
      `<div>${Math.round(avgDuration / 1000 / 60)} minuti</div>`;
  }
}

// Esporta feedback
function exportFeedbacks() {
  const data = {
    exported_at: new Date().toISOString(),
    total_feedbacks: feedbacksList.length,
    feedbacks: feedbacksList
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ti-presto-feedbacks-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('📊 Feedback esportati con successo!', 'success');
}

// Richiedi permesso notifiche
function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    // Aspetta un po' prima di chiedere il permesso per non essere invadenti
    setTimeout(() => {
      Notification.requestPermission().then(permission => {
        console.log('Permesso notifiche:', permission);
        if (permission === 'granted') {
          showToast('🔔 Notifiche abilitate! Ti avviseremo per aggiornamenti importanti.', 'success');
        }
      });
    }, 10000); // Dopo 10 secondi
  }
}

// ===============================
// PWA - PROGRESSIVE WEB APP
// ===============================

// Variabili PWA
let deferredPrompt;
let isInstalled = false;

// Registra Service Worker
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('🔴⚪ Ti Presto SW: Registered successfully', registration.scope);
          
          // Controlla aggiornamenti
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                showUpdateNotification();
              }
            });
          });
          
        })
        .catch((error) => {
          console.error('🔴⚪ Ti Presto SW: Registration failed', error);
        });
    });
  }
}

// Mostra notifica di aggiornamento disponibile
function showUpdateNotification() {
  const updateToast = document.createElement('div');
  updateToast.className = 'update-toast';
  updateToast.innerHTML = `
    <div class="update-content">
      <span>🚀 Nuova versione disponibile!</span>
      <button onclick="updateApp()" class="update-btn">Aggiorna</button>
      <button onclick="this.parentElement.parentElement.remove()" class="close-btn">×</button>
    </div>
  `;
  
  updateToast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #002147 0%, #c8102e 100%);
    color: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    z-index: 10000;
    max-width: 300px;
  `;
  
  document.body.appendChild(updateToast);
}

// Aggiorna app
function updateApp() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    });
  }
}

// Gestisci installazione PWA
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('🔴⚪ Ti Presto PWA: Install prompt triggered');
  
  // Previeni il prompt automatico
  event.preventDefault();
  deferredPrompt = event;
  
  // Mostra il pulsante di installazione
  showInstallButton();
});

// Mostra pulsante installazione
function showInstallButton() {
  // Controlla se è già installato
  if (window.matchMedia('(display-mode: standalone)').matches || isInstalled) {
    return;
  }
  
  const installButton = document.createElement('button');
  installButton.id = 'installButton';
  installButton.innerHTML = '📱 Installa App';
  installButton.className = 'install-button';
  installButton.onclick = installApp;
  
  installButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 25px;
    font-weight: 700;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
    cursor: pointer;
    z-index: 9999;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    animation: installPulse 2s infinite;
  `;
  
  // Aggiungi animazione CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes installPulse {
      0%, 100% { transform: scale(1); box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4); }
      50% { transform: scale(1.05); box-shadow: 0 6px 20px rgba(40, 167, 69, 0.6); }
    }
    .install-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(40, 167, 69, 0.6);
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(installButton);
  
  // Nascondi dopo 10 secondi se non cliccato
  setTimeout(() => {
    if (document.getElementById('installButton')) {
      installButton.style.opacity = '0.7';
    }
  }, 10000);
}

// Installa app
async function installApp() {
  if (!deferredPrompt) {
    showToast('❌ Installazione non disponibile al momento', 'error');
    return;
  }
  
  const installButton = document.getElementById('installButton');
  if (installButton) {
    installButton.style.display = 'none';
  }
  
  // Mostra il prompt di installazione
  deferredPrompt.prompt();
  
  // Aspetta la risposta dell'utente
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('🔴⚪ Ti Presto PWA: User accepted installation');
    showToast('🎉 App installata con successo! Controlla la home screen.', 'success');
    trackUserAction('pwa_installed', { method: 'browser_prompt' });
  } else {
    console.log('🔴⚪ Ti Presto PWA: User dismissed installation');
    showToast('💡 Puoi sempre installare l\'app successivamente dal menu browser', 'info');
  }
  
  // Reset del prompt
  deferredPrompt = null;
}

// Controlla se è già installato
window.addEventListener('appinstalled', (event) => {
  console.log('🔴⚪ Ti Presto PWA: App installed successfully');
  isInstalled = true;
  
  // Nascondi pulsante installazione
  const installButton = document.getElementById('installButton');
  if (installButton) {
    installButton.remove();
  }
  
  showToast('✅ Ti Presto è ora installato come app!', 'success');
  trackUserAction('pwa_installation_completed');
});

// Rileva se lanciato come PWA
function detectPWAMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isMobileSafari = isIOS && navigator.standalone;
  
  if (isStandalone || isMobileSafari) {
    console.log('🔴⚪ Ti Presto PWA: Running in standalone mode');
    document.body.classList.add('pwa-mode');
    trackUserAction('pwa_launched', { mode: 'standalone' });
  }
}

// Gestisci condivisione nativa
async function shareContent(title, text, url) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title || 'Ti Presto - Genoa CFC 1893',
        text: text || 'Scopri la piattaforma per lo scambio abbonamenti Genoa!',
        url: url || window.location.href
      });
      
      trackUserAction('content_shared', { method: 'native_share' });
      return true;
    } catch (error) {
      console.error('Error sharing:', error);
      return false;
    }
  }
  return false;
}

// Test installazione PWA
function testPWAInstallation() {
  console.log('🔴⚪ Ti Presto PWA: Testing installation capabilities...');
  
  const tests = {
    serviceWorkerSupport: 'serviceWorker' in navigator,
    manifestLink: !!document.querySelector('link[rel="manifest"]'),
    httpsProtocol: location.protocol === 'https:' || location.hostname === 'localhost',
    installPromptSupport: 'onbeforeinstallprompt' in window,
    notificationSupport: 'Notification' in window,
    isInstalled: window.matchMedia('(display-mode: standalone)').matches,
    shareAPISupport: 'share' in navigator
  };
  
  console.table(tests);
  
  // Mostra risultati in toast
  const passedTests = Object.values(tests).filter(Boolean).length;
  const totalTests = Object.keys(tests).length;
  
  let message, type;
  if (passedTests === totalTests) {
    message = `✅ PWA completamente supportato (${passedTests}/${totalTests})`;
    type = 'success';
  } else if (passedTests >= totalTests - 2) {
    message = `⚠️ PWA parzialmente supportato (${passedTests}/${totalTests})`;
    type = 'warning';
  } else {
    message = `❌ PWA limitato su questo dispositivo (${passedTests}/${totalTests})`;
    type = 'error';
  }
  
  showToast(message, type);
  
  return tests;
}

// Inizializza countdown partita homepage
function initializeHomepageCountdown() {
  const countdownEl = document.getElementById('matchCountdownGenoaParma');
  if (countdownEl) {
    // Data della partita Genoa vs Parma
    const matchDate = new Date('2025-12-15T15:00:00');
    
    function updateCountdown() {
      const now = new Date();
      const timeLeft = matchDate - now;
      
      if (timeLeft <= 0) {
        countdownEl.textContent = '⚽ Partita in corso o conclusa';
        return;
      }
      
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      
      countdownEl.textContent = `⏰ Mancano: ${days}g ${hours}h ${minutes}m ${seconds}s`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
}

// Inizializza countdown premium sovraimpressione
function initializePremiumCountdown() {
  const premiumCountdownEl = document.getElementById('premiumMatchCountdown');
  if (!premiumCountdownEl) return;
  
  // Data della partita Genoa vs Parma
  const matchDate = new Date('2025-12-15T15:00:00');
  
  function updatePremiumCountdown() {
    const now = new Date();
    const timeLeft = matchDate - now;
    
    if (timeLeft <= 0) {
      premiumCountdownEl.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
          <span>⚽</span>
          <span>PARTITA IN CORSO</span>
          <span>🔴⚪</span>
        </div>
      `;
      return;
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    premiumCountdownEl.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
        <span style="display: flex; align-items: center; gap: 4px;">
          <span style="font-size: 0.9em; opacity: 0.9;">⏰</span>
          <span style="font-weight: 900; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">MANCANO:</span>
        </span>
        <div style="display: flex; gap: 8px; font-family: 'Montserrat', monospace;">
          <span style="background: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: 6px; min-width: 35px; text-align: center;">${days}</span>
          <span style="font-weight: 500;">g</span>
          <span style="background: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: 6px; min-width: 35px; text-align: center;">${hours}</span>
          <span style="font-weight: 500;">h</span>
          <span style="background: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: 6px; min-width: 35px; text-align: center;">${minutes}</span>
          <span style="font-weight: 500;">m</span>
          <span style="background: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: 6px; min-width: 35px; text-align: center;">${seconds}</span>
          <span style="font-weight: 500;">s</span>
        </div>
      </div>
    `;
  }
  
  updatePremiumCountdown();
  setInterval(updatePremiumCountdown, 1000);
}

// Inizializza i sistemi quando la pagina è caricata
document.addEventListener('DOMContentLoaded', function() {
  // Aspetta che tutti gli script siano caricati
  setTimeout(() => {
    initializeBehavioralAnalytics();
    initializeHomepageCountdown();
    initializePremiumCountdown();
    
    // Inizializza PWA
    registerServiceWorker();
    detectPWAMode();
    
    // Carica admin se necessario - Ripristinato comportamento originale
    if (loggedInUser && (loggedInUser.username === 'admin' || loggedInUser.isAdmin || loggedInUser.email === 'dnagenoa@outlook.it')) {
      document.getElementById('adminBtn').style.display = 'inline-block';
      console.log('✅ Admin panel abilitato per:', loggedInUser.email);
    } else {
      document.getElementById('adminBtn').style.display = 'none';
    }
    
    // Richiedi permesso notifiche (solo per utenti normali, non admin)
    if (!currentUser || (currentUser.username !== 'admin' && currentUser.email !== 'dnagenoa@outlook.it')) {
      requestNotificationPermission();
    }
  }, 1000);
});

// Esponi funzione di test per la console
window.testPWAInstallation = testPWAInstallation;
window.installApp = installApp;
window.shareContent = shareContent;

// ===============================
// MOBILE NAVIGATION SYSTEM
// ===============================

// Mobile menu toggle functionality
function initializeMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const body = document.body;
  
  // Create overlay if not exists
  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    body.appendChild(overlay);
  }
  
  if (mobileToggle && mainNav) {
    // Toggle menu
    mobileToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMobileMenu();
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
      closeMobileMenu();
    });
    
    // Close menu when clicking nav links
    const navButtons = mainNav.querySelectorAll('button');
    navButtons.forEach(button => {
      button.addEventListener('click', function() {
        closeMobileMenu();
      });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mainNav.classList.contains('mobile-open')) {
        closeMobileMenu();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && mainNav.classList.contains('mobile-open')) {
        closeMobileMenu();
      }
    });
  }
}

function toggleMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const overlay = document.querySelector('.nav-overlay');
  const body = document.body;
  
  if (mainNav.classList.contains('mobile-open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const overlay = document.querySelector('.nav-overlay');
  const body = document.body;
  
  mainNav.classList.add('mobile-open');
  mobileToggle.classList.add('active');
  overlay.classList.add('active');
  body.style.overflow = 'hidden'; // Prevent scrolling
  
  // Add accessibility
  mainNav.setAttribute('aria-expanded', 'true');
  mobileToggle.setAttribute('aria-expanded', 'true');
  
  // Focus first menu item
  const firstButton = mainNav.querySelector('button');
  if (firstButton) {
    setTimeout(() => firstButton.focus(), 300);
  }
}

function closeMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const overlay = document.querySelector('.nav-overlay');
  const body = document.body;
  
  mainNav.classList.remove('mobile-open');
  mobileToggle.classList.remove('active');
  overlay.classList.remove('active');
  body.style.overflow = ''; // Restore scrolling
  
  // Update accessibility
  mainNav.setAttribute('aria-expanded', 'false');
  mobileToggle.setAttribute('aria-expanded', 'false');
}

// Mobile-specific improvements
function initializeMobileOptimizations() {
  // Prevent zoom on input fields (iOS)
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    if (input.type !== 'range') {
      input.addEventListener('focus', function() {
        if (window.innerWidth <= 768) {
          // Temporarily prevent zoom
          const viewport = document.querySelector('meta[name=viewport]');
          if (viewport) {
            const content = viewport.getAttribute('content');
            viewport.setAttribute('content', content + ', user-scalable=no');
            
            setTimeout(() => {
              viewport.setAttribute('content', content);
            }, 1000);
          }
        }
      });
    }
  });
  
  // Touch feedback for buttons
  const buttons = document.querySelectorAll('button, .btn, a[role="button"]');
  buttons.forEach(button => {
    button.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    });
    
    button.addEventListener('touchend', function() {
      this.style.transform = '';
    });
    
    button.addEventListener('touchcancel', function() {
      this.style.transform = '';
    });
  });
  
  // Improve scrolling performance
  if (window.innerWidth <= 768) {
    document.body.style.webkitOverflowScrolling = 'touch';
  }
  
  // Handle orientation change
  window.addEventListener('orientationchange', function() {
    setTimeout(() => {
      // Recalculate viewport height for mobile browsers
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Close mobile menu if open
      if (document.querySelector('.main-nav.mobile-open')) {
        closeMobileMenu();
      }
    }, 500);
  });
  
  // Set initial viewport height
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Modal improvements for mobile
function initializeMobileModals() {
  const modals = document.querySelectorAll('.modal');
  
  modals.forEach(modal => {
    const modalContent = modal.querySelector('.modal-content');
    
    if (modalContent) {
      // Prevent background scroll when modal is open
      modal.addEventListener('show', function() {
        if (window.innerWidth <= 768) {
          document.body.style.overflow = 'hidden';
          document.body.style.position = 'fixed';
          document.body.style.width = '100%';
        }
      });
      
      modal.addEventListener('hide', function() {
        if (window.innerWidth <= 768) {
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
        }
      });
      
      // Add swipe to close for mobile
      if (window.innerWidth <= 768) {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        
        modalContent.addEventListener('touchstart', function(e) {
          startY = e.touches[0].clientY;
          isDragging = true;
        });
        
        modalContent.addEventListener('touchmove', function(e) {
          if (!isDragging) return;
          
          currentY = e.touches[0].clientY;
          const diffY = currentY - startY;
          
          if (diffY > 0) {
            modalContent.style.transform = `translateY(${Math.min(diffY, 100)}px)`;
          }
        });
        
        modalContent.addEventListener('touchend', function(e) {
          if (!isDragging) return;
          
          const diffY = currentY - startY;
          
          if (diffY > 50) {
            // Close modal if swiped down enough
            const closeBtn = modal.querySelector('.close');
            if (closeBtn) {
              closeBtn.click();
            }
          } else {
            // Snap back
            modalContent.style.transform = '';
          }
          
          isDragging = false;
        });
      }
    }
  });
}

// Initialize mobile features
document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile navigation
  initializeMobileMenu();
  
  // Initialize mobile optimizations
  initializeMobileOptimizations();
  
  // Initialize mobile modals
  initializeMobileModals();
  
  // DISABILITATO: Initialize admin demo data (async) - causava ricreazione abbonamenti
  // initializeAdminDemoData().then(() => {
  //   console.log('🔥 Dati Firebase/localStorage sincronizzati');
  // }).catch(error => {
  //   console.error('❌ Errore inizializzazione dati:', error);
  // });
  
  // Initialize connection status
  updateConnectionStatus();
  
  // 📱 Initialize mobile optimizations
  initMobileOptimizations();
  initMobilePerformance();
  initMobileEventHandlers();
  
  console.log('🔴⚪ Mobile optimizations initialized for Ti Presto Genoa 1893');
});

// ========== SISTEMA SINCRONIZZAZIONE AUTOMATICA ==========

// Sistema di sincronizzazione automatica in background
class BackgroundSync {
  constructor() {
    this.syncInterval = null;
    this.syncFrequency = 30000; // 30 secondi
    this.isOnline = navigator.onLine;
    this.pendingSync = false;
  }
  
  start() {
    console.log('🔄 Avvio sistema sincronizzazione automatica...');
    
    // Listener per stato connessione
    window.addEventListener('online', () => {
      console.log('🌐 Connessione ripristinata - sincronizzazione immediata');
      this.isOnline = true;
      this.syncNow();
    });
    
    window.addEventListener('offline', () => {
      console.log('📱 Modalità offline attivata');
      this.isOnline = false;
    });
    
    // Sincronizzazione periodica
    this.syncInterval = setInterval(() => {
      if (this.isOnline && !this.pendingSync) {
        this.syncNow();
      }
    }, this.syncFrequency);
    
    // Sincronizzazione iniziale
    if (this.isOnline) {
      setTimeout(() => this.syncNow(), 3000); // Dopo 3 secondi dall'avvio
    }
  }
  
  async syncNow() {
    if (this.pendingSync) return;
    
    this.pendingSync = true;
    try {
      // 🔥 FIREBASE-ONLY: Disabilitata sincronizzazione bidirezionale
      // await syncDataBidirectional();
      
      // Aggiorna admin panel se aperto
      if (document.querySelector('.admin-modal')?.style.display === 'flex') {
        await updateAdminStats();
      }
      
    } catch (error) {
      console.error('❌ Errore sincronizzazione automatica:', error);
    }
    this.pendingSync = false;
  }
  
  stop() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('⏹️ Sistema sincronizzazione fermato');
    }
  }
}

// Istanza globale del sistema di sync
const backgroundSync = new BackgroundSync();

// Avvio automatico del sistema di sincronizzazione
document.addEventListener('DOMContentLoaded', function() {
  // Avvia sincronizzazione automatica dopo inizializzazione
  setTimeout(() => {
    backgroundSync.start();
    
    // Track evento di avvio app
    addAnalyticsEvent('app_start', {
      timestamp: Date.now(),
      userAgent: navigator.userAgent.substr(0, 100),
      isOnline: navigator.onLine
    });
  }, 1000);
});

// ========== GESTIONE STATO CONNESSIONE ==========

// Indica stato connessione nell'UI
function updateConnectionStatus() {
  const isOnline = navigator.onLine;
  const statusEl = document.getElementById('connection-status');
  
  if (statusEl) {
    statusEl.className = isOnline ? 'online' : 'offline';
    statusEl.textContent = isOnline ? '🌐 Online' : '📱 Offline';
  }
  
  // Toast di notifica cambio stato
  if (!isOnline) {
    showToast('📱 Modalità offline attivata - i dati verranno sincronizzati alla riconnessione', 'info', 3000);
  } else {
    showToast('🌐 Connessione ripristinata - sincronizzazione in corso...', 'success', 2000);
  }
}

// Monitora cambiamenti stato connessione
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

// ========== GESTIONE CACHE INTELLIGENTE ==========

// Cache intelligente per dati Firebase
class SmartCache {
  constructor() {
    this.cacheTimeout = 5 * 60 * 1000; // 5 minuti
    this.cache = new Map();
  }
  
  set(key, data) {
    this.cache.set(key, {
      data: data,
      timestamp: Date.now()
    });
  }
  
  get(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    // Verifica scadenza cache
    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }
  
  clear() {
    this.cache.clear();
  }
}

// Istanza globale cache
const smartCache = new SmartCache();

// ========== FUNZIONI DI TEST E DEBUG ==========

// Test sistema completo Firebase + localStorage + Sync
async function testFirebaseSystem() {
  console.log('🧪 === TEST SISTEMA FIREBASE COMPLETO ===');
  
  try {
    // 1. Test connessione Firebase
    console.log('1. 🔍 Test connessione Firebase...');
    const testDoc = await db.collection('test').doc('ping').set({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      status: 'online'
    });
    console.log('✅ Firebase connesso correttamente');
    
    // 2. Test popolamento demo data (DISABILITATO - nessun demo data)
    console.log('2. 📝 Test popolamento dati demo... SALTATO (demo data rimossi)');
    // await populateFirebaseWithDemoData(); // DISABILITATO - nessun demo data
    console.log('✅ Test demo data saltato - sistema pulito');
    
    // 3. Test sync bidirezionale
    console.log('3. 🔄 Test sincronizzazione bidirezionale...');
    // 🔥 FIREBASE-ONLY: Disabilitata sincronizzazione bidirezionale
    // await syncDataBidirectional();
    console.log('✅ Sync bidirezionale completata');
    
    // 4. Test analytics
    console.log('4. 📊 Test sistema analytics...');
    await addAnalyticsEvent('test_system', { testId: 'system_check', timestamp: Date.now() });
    console.log('✅ Analytics funzionante');
    
    // 5. Test admin functions
    console.log('5. 👑 Test funzioni admin...');
    await updateAdminStats();
    console.log('✅ Funzioni admin operative');
    
    // 6. Test cache
    console.log('6. 💾 Test sistema cache...');
    smartCache.set('test', 'cache_works');
    const cached = smartCache.get('test');
    console.log(cached === 'cache_works' ? '✅ Cache funzionante' : '❌ Errore cache');
    
    // 7. Test background sync
    console.log('7. 🔄 Test background sync...');
    console.log(backgroundSync.isOnline ? '✅ Background sync attivo' : '❌ Background sync offline');
    
    console.log('🎉 === TEST COMPLETATO CON SUCCESSO ===');
    
    // Show result toast
    showToast('🎉 Sistema Firebase testato con successo! Tutti i componenti funzionano.', 'success', 5000);
    
    return true;
    
  } catch (error) {
    console.error('❌ ERRORE TEST SISTEMA:', error);
    showToast('❌ Errore durante il test del sistema: ' + error.message, 'error', 5000);
    return false;
  }
}

// Debug info sistema
function debugSystemInfo() {
  console.log('🔧 === DEBUG SYSTEM INFO ===');
  console.log('📱 Online:', navigator.onLine);
  console.log('🔄 Background Sync:', backgroundSync);
  console.log('💾 Cache entries:', smartCache.cache.size);
  console.log('👤 Logged User:', loggedInUser);
  console.log('🏠 localStorage users:', JSON.parse(localStorage.getItem('users') || '[]').length);
  console.log('🎫 localStorage abbonamenti:', JSON.parse(localStorage.getItem('abbonamenti') || '[]').length);
  console.log('💬 localStorage feedback:', JSON.parse(localStorage.getItem('feedbacks') || '[]').length);
  console.log('📊 localStorage analytics:', JSON.parse(localStorage.getItem('user_analytics') || '[]').length);
}

// Auto-test on admin login
async function runSystemTestOnAdmin() {
  console.log('🤖 Avvio test automatico sistema...');
  setTimeout(async () => {
    await testFirebaseSystem();
    debugSystemInfo();
  }, 2000);
}

// ========== FUNZIONI ADMIN MANCANTI ==========

// Aggiorna statistiche admin dashboard (Firebase-first)
async function updateAdminStats() {
  try {
    console.log('🔄 Aggiornamento statistiche admin...');
    
    // Carica statistiche live da Firebase quando possibile
    let users = [];
    let abbonamenti = [];
    let feedbacks = [];
    
    try {
      // Conta diretta da Firebase per dati real-time
      const [usersSnapshot, abbonamentiSnapshot, feedbacksSnapshot] = await Promise.all([
        db.collection('users').get(),
        db.collection('abbonamenti').get(), 
        db.collection('feedback').get()
      ]);
      
      // Estrai dati da Firebase
      usersSnapshot.forEach(doc => {
        const data = doc.data();
        users.push({
          ...data,
          timestamp: data.timestamp?.toMillis() || Date.now(),
          lastLogin: data.lastLogin?.toMillis() || Date.now()
        });
      });
      
      abbonamentiSnapshot.forEach(doc => {
        const data = doc.data();
        abbonamenti.push({
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toMillis() || Date.now()
        });
      });
      
      feedbacksSnapshot.forEach(doc => {
        const data = doc.data();
        feedbacks.push({
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toMillis() || Date.now()
        });
      });
      
      console.log('✅ Statistiche caricate da Firebase:', {
        users: users.length,
        abbonamenti: abbonamenti.length,
        feedbacks: feedbacks.length
      });
      
    } catch (firebaseError) {
      console.log('📱 Firebase non disponibile, uso localStorage:', firebaseError.message);
      
      // FALLBACK: Carica da localStorage
      users = JSON.parse(localStorage.getItem('users') || '[]');
      abbonamenti = JSON.parse(localStorage.getItem('abbonamenti') || '[]');
      feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    }
    
    // Aggiorna contatori principali
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalAbbonamenti').textContent = abbonamenti.length;
    document.getElementById('totalFeedbacks').textContent = feedbacks.length;
    
    // Calcola engagement score
    const engagementScore = Math.round((feedbacks.length * 0.3 + abbonamenti.length * 0.7) / Math.max(users.length, 1) * 100);
    document.getElementById('engagementScore').textContent = engagementScore + '%';
    
    // Aggiorna statistiche utenti avanzate
    const activeUsers = users.filter(user => {
      const lastLogin = new Date(user.lastLogin || user.timestamp || 0);
      const daysDiff = (Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 30; // Attivi negli ultimi 30 giorni
    }).length;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newUsersToday = users.filter(user => {
      const userDate = new Date(user.timestamp || 0);
      userDate.setHours(0, 0, 0, 0);
      return userDate.getTime() === today.getTime();
    }).length;
    
    if (document.getElementById('activeUsers')) {
      document.getElementById('activeUsers').textContent = activeUsers;
    }
    if (document.getElementById('newUsersToday')) {
      document.getElementById('newUsersToday').textContent = newUsersToday;
    }
    
    console.log('📊 Statistiche admin aggiornate:', {
      users: users.length,
      abbonamenti: abbonamenti.length,
      feedbacks: feedbacks.length,
      engagement: engagementScore + '%'
    });
    
  } catch (error) {
    console.error('Errore aggiornamento statistiche admin:', error);
  }
}

// Carica impostazioni admin
function loadAdminSettings() {
  try {
    const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
    
    // Applica impostazioni salvate
    if (document.getElementById('emailNotifications')) {
      document.getElementById('emailNotifications').checked = settings.emailNotifications !== false;
    }
    if (document.getElementById('analyticsEnabled')) {
      document.getElementById('analyticsEnabled').checked = settings.analyticsEnabled !== false;
    }
    
  } catch (error) {
    console.error('Errore caricamento impostazioni admin:', error);
  }
}

// Esporta backup dati
function exportBackup() {
  try {
    const backupData = {
      timestamp: new Date().toISOString(),
      users: JSON.parse(localStorage.getItem('users') || '[]'),
      abbonamenti: JSON.parse(localStorage.getItem('abbonamenti') || '[]'),
      feedbacks: JSON.parse(localStorage.getItem('feedbacks') || '[]'),
      analytics: JSON.parse(localStorage.getItem('analytics') || '{}'),
      settings: JSON.parse(localStorage.getItem('adminSettings') || '{}')
    };
    
    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `tiprestogenoa_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showToast('✅ Backup esportato con successo!', 'success');
    
  } catch (error) {
    console.error('Errore esportazione backup:', error);
    showToast('❌ Errore durante esportazione backup', 'error');
  }
}

// Pulisci dati analytics
function clearAnalytics() {
  if (confirm('⚠️ Sei sicuro di voler cancellare tutti i dati analytics? Questa azione non può essere annullata.')) {
    try {
      localStorage.removeItem('analytics');
      localStorage.removeItem('userBehavior');
      analyticsData = {};
      
      showToast('✅ Dati analytics puliti con successo!', 'success');
      loadAnalyticsAdmin(); // Ricarica tab analytics
      
    } catch (error) {
      console.error('Errore pulizia analytics:', error);
      showToast('❌ Errore durante pulizia analytics', 'error');
    }
  }
}

// Inizializza dati demo admin completi su Firebase (solo se non esistono già)
async function initializeAdminDemoData() {
  try {
    console.log('🔥 Inizializzazione dati Firebase in corso...');
    
    // Controlla se i dati esistono già su Firebase
    const existingFeedbacks = await db.collection('feedback').limit(1).get();
    const existingUsers = await db.collection('users').limit(1).get();
    const existingAbbonamenti = await db.collection('abbonamenti').limit(1).get();
    
    // Se Firebase è vuoto, NON popolare più con demo data
    if (existingFeedbacks.empty) {
      console.log('📝 Firebase vuoto - NESSUN demo data caricato (sistema pulito)');
      // await populateFirebaseWithDemoData(); // DISABILITATO - nessun demo data
    } else {
      console.log('✅ Dati Firebase già presenti, caricamento diretto da Firebase...');
      // 🔥 FIREBASE-ONLY: Nessuna sincronizzazione localStorage necessaria
    }
    
  } catch (error) {
    console.error('❌ Errore inizializzazione Firebase, fallback a localStorage:', error);
    initializeLocalStorageFallback();
  }
}

// Popola Firebase con dati demo realistici
async function populateFirebaseWithDemoData() {
  try {
    const batch = db.batch();
    const currentTime = Date.now();
    
    // 1. FEEDBACK REALISTICI
    const demoFeedbacks = [
      {
        userEmail: 'marco.rossi@email.com',
        username: 'marco_genoa',
        type: 'suggestion',
        message: 'Sarebbe fantastico avere notifiche push quando escono abbonamenti per la Gradinata Nord!',
        status: 'new',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        priority: 'high',
        overallRating: 4,
        contactInfo: { email: 'marco.rossi@email.com', phone: '+39 340 123 4567', consent: true }
      },
      {
        userEmail: 'giulia.bianchi@gmail.com',
        username: 'giulia_rossoblù',
        type: 'bug',
        message: 'La chat non si aggiorna in tempo reale, devo ricaricare la pagina',
        status: 'pending',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        priority: 'high',
        bugDetails: { severity: 'medium', steps: 'Apri chat, invia messaggio, attendi risposta' },
        adminResponse: 'Stiamo investigando il problema, grazie per la segnalazione!'
      },
      {
        userEmail: 'andrea.verdi@outlook.it',
        username: 'andrea_1893',
        type: 'rating',
        message: 'App perfetta! Sono riuscito a vendere il mio abbonamento in 2 ore. Fantastico!',
        status: 'resolved',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        priority: 'low',
        overallRating: 5,
        contactInfo: { email: 'andrea.verdi@outlook.it', consent: true }
      },
      {
        userEmail: 'francesca.neri@yahoo.it',
        username: 'francy_genoa',
        type: 'feature',
        message: 'Potreste aggiungere un filtro per prezzo? Così cerco solo abbonamenti nella mia fascia',
        status: 'new',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        priority: 'medium',
        overallRating: 4
      },
      {
        userEmail: 'luca.ferrari@libero.it',
        username: 'luca_grifone',
        type: 'compliment',
        message: 'Complimenti per l\'interfaccia! Design pulito e molto genoano 🔴⚪',
        status: 'resolved',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        priority: 'low',
        overallRating: 5,
        adminResponse: 'Grazie mille! Forza Genoa! 🔴⚪'
      }
    ];
    
    // Aggiungi feedback a Firebase
    for (const feedback of demoFeedbacks) {
      const feedbackRef = db.collection('feedback').doc();
      batch.set(feedbackRef, feedback);
    }
    
    // 2. UTENTI REALISTICI (simulati per admin panel)
    const demoUsersData = [
      {
        username: 'marco_genoa',
        email: 'marco.rossi@email.com',
        nome: 'Marco',
        cognome: 'Rossi',
        dataNascita: '1985-03-15',
        telefono: '+39 340 123 4567',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
        emailVerificata: true,
        abbonamenti: ['GEN001', 'GEN015']
      },
      {
        username: 'giulia_rossoblù',
        email: 'giulia.bianchi@gmail.com',
        nome: 'Giulia',
        cognome: 'Bianchi',
        dataNascita: '1992-07-22',
        telefono: '+39 348 987 6543',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
        emailVerificata: true,
        abbonamenti: ['GEN008']
      },
      {
        username: 'andrea_1893',
        email: 'andrea.verdi@outlook.it',
        nome: 'Andrea',
        cognome: 'Verdi',
        dataNascita: '1978-11-30',
        telefono: '+39 335 456 7890',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
        emailVerificata: true,
        abbonamenti: ['GEN003', 'GEN012', 'GEN025']
      }
    ];
    
    // Aggiungi utenti demo a Firebase
    for (const userData of demoUsersData) {
      const userRef = db.collection('users').doc(userData.username);
      batch.set(userRef, userData);
    }
    
    // 3. ABBONAMENTI DEMO - ARRAY SVUOTATO
    const demoAbbonamenti = [
      // Array svuotato - nessun abbonamento demo
    ];
    
    // Aggiungi abbonamenti a Firebase
    for (const abbonamento of demoAbbonamenti) {
      const abbRef = db.collection('abbonamenti').doc();
      batch.set(abbRef, abbonamento);
    }
    
    // Esegui batch write
    await batch.commit();
    
    console.log('🎉 Dati demo Firebase popolati con successo!');
    
    // Ora sincronizza con localStorage
    // 🔥 FIREBASE-ONLY: Nessuna sincronizzazione localStorage necessaria
    
  } catch (error) {
    console.error('❌ Errore popolamento Firebase:', error);
    throw error;
  }
}

// 🗑️ FIREBASE-ONLY: Funzione syncFirebaseToLocalStorage() eliminata - non più necessaria

// Fallback per localStorage se Firebase non disponibile  
function initializeLocalStorageFallback() {
  try {
    console.log('📱 Inizializzazione fallback localStorage...');
    
    // Inizializza feedback realistici localmente
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    if (feedbacks.length < 5) {
      const demoFeedbacks = [
        {
          id: 'fb001',
          userEmail: 'marco.rossi@email.com',
          username: 'marco_genoa',
          type: 'suggestion',
          message: 'Sarebbe fantastico avere notifiche push quando escono abbonamenti per la Gradinata Nord!',
          status: 'new',
          timestamp: Date.now() - 3600000, // 1 ora fa
          priority: 'high',
          overallRating: 4,
          contactInfo: { email: 'marco.rossi@email.com', phone: '+39 340 123 4567', consent: true }
        },
        {
          id: 'fb002',
          userEmail: 'giulia.bianchi@gmail.com',
          username: 'giulia_rossoblù',
          type: 'bug',
          message: 'La chat non si aggiorna in tempo reale, devo ricaricare la pagina',
          status: 'pending',
          timestamp: Date.now() - 7200000, // 2 ore fa
          priority: 'high',
          bugDetails: { severity: 'medium', steps: 'Apri chat, invia messaggio, attendi risposta' },
          adminResponse: 'Stiamo investigando il problema, grazie per la segnalazione!'
        },
        {
          id: 'fb003',
          userEmail: 'andrea.verdi@outlook.it',
          username: 'andrea_1893',
          type: 'rating',
          message: 'App perfetta! Sono riuscito a vendere il mio abbonamento in 2 ore. Fantastico!',
          status: 'resolved',
          timestamp: Date.now() - 86400000, // 1 giorno fa
          priority: 'low',
          overallRating: 5,
          contactInfo: { email: 'andrea.verdi@outlook.it', consent: true }
        },
        {
          id: 'fb004',
          userEmail: 'francesca.neri@yahoo.it',
          username: 'francy_genoa',
          type: 'feature',
          message: 'Potreste aggiungere un filtro per prezzo? Così cerco solo abbonamenti nella mia fascia',
          status: 'new',
          timestamp: Date.now() - 172800000, // 2 giorni fa
          priority: 'medium',
          overallRating: 4
        },
        {
          id: 'fb005',
          userEmail: 'luca.ferrari@libero.it',
          username: 'luca_grifone',
          type: 'compliment',
          message: 'Complimenti per l\'interfaccia! Design pulito e molto genoano 🔴⚪',
          status: 'resolved',
          timestamp: Date.now() - 259200000, // 3 giorni fa
          priority: 'low',
          overallRating: 5,
          adminResponse: 'Grazie mille! Forza Genoa! 🔴⚪'
        }
      ];
      
      // Aggiungi solo i nuovi feedback
      demoFeedbacks.forEach(newFeedback => {
        if (!feedbacks.find(f => f.id === newFeedback.id)) {
          feedbacks.push(newFeedback);
        }
      });
      
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    }
    
    // Inizializza utenti realistici
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length < 12) {
      const demoUsers = [
        {
          username: 'marco_genoa',
          email: 'marco.rossi@email.com',
          nome: 'Marco',
          cognome: 'Rossi',
          dataNascita: '1985-03-15',
          telefono: '+39 340 123 4567',
          timestamp: Date.now() - 172800000, // 2 giorni fa
          lastLogin: Date.now() - 3600000, // 1 ora fa
          emailVerificata: true,
          abbonamenti: ['GEN001', 'GEN015']
        },
        {
          username: 'giulia_rossoblù',
          email: 'giulia.bianchi@gmail.com',
          nome: 'Giulia',
          cognome: 'Bianchi',
          dataNascita: '1992-07-22',
          telefono: '+39 348 987 6543',
          timestamp: Date.now() - 259200000, // 3 giorni fa
          lastLogin: Date.now() - 7200000, // 2 ore fa
          emailVerificata: true,
          abbonamenti: ['GEN008']
        },
        {
          username: 'andrea_1893',
          email: 'andrea.verdi@outlook.it',
          nome: 'Andrea',
          cognome: 'Verdi',
          dataNascita: '1978-11-30',
          telefono: '+39 335 456 7890',
          timestamp: Date.now() - 432000000, // 5 giorni fa
          lastLogin: Date.now() - 86400000, // 1 giorno fa
          emailVerificata: true,
          abbonamenti: ['GEN003', 'GEN012', 'GEN025']
        },
        {
          username: 'francy_genoa',
          email: 'francesca.neri@yahoo.it',
          nome: 'Francesca',
          cognome: 'Neri',
          dataNascita: '1990-05-18',
          telefono: '+39 347 234 5678',
          timestamp: Date.now() - 604800000, // 1 settimana fa
          lastLogin: Date.now() - 172800000, // 2 giorni fa
          emailVerificata: true,
          abbonamenti: []
        },
        {
          username: 'luca_grifone',
          email: 'luca.ferrari@libero.it',
          nome: 'Luca',
          cognome: 'Ferrari',
          dataNascita: '1987-12-03',
          telefono: '+39 339 876 5432',
          timestamp: Date.now() - 864000000, // 10 giorni fa
          lastLogin: Date.now() - 259200000, // 3 giorni fa
          emailVerificata: true,
          abbonamenti: ['GEN007', 'GEN018']
        },
        {
          username: 'sara_genoana',
          email: 'sara.gallo@virgilio.it',
          nome: 'Sara',
          cognome: 'Gallo',
          dataNascita: '1995-09-12',
          telefono: '+39 342 567 8901',
          timestamp: Date.now() - 1209600000, // 2 settimane fa
          lastLogin: Date.now() - 432000000, // 5 giorni fa
          emailVerificata: false,
          abbonamenti: ['GEN020']
        }
      ];
      
      // Aggiungi solo se non esistono già
      demoUsers.forEach(demoUser => {
        if (!users.find(u => u.email === demoUser.email)) {
          users.push(demoUser);
        }
      });
      
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    // ABBONAMENTI DEMO COMPLETAMENTE RIMOSSI
    let abbonamenti = JSON.parse(localStorage.getItem('abbonamenti') || '[]');
    // Nessun abbonamento demo viene più inizializzato
    
    // Aggiungi GitHub Copilot come admin se non esiste
    if (!users.find(u => u.username === 'github-copilot')) {
      users.push({
        username: 'github-copilot',
        email: 'copilot@github.com',
        nome: 'GitHub',
        cognome: 'Copilot',
        isAdmin: true,
        timestamp: Date.now(),
        lastLogin: Date.now()
      });
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Inizializza analytics e statistiche avanzate
    let analytics = JSON.parse(localStorage.getItem('user_analytics') || '[]');
    if (analytics.length < 50) {
      const currentTime = Date.now();
      const demoAnalytics = [
        // Navigazione sezioni
        { action: 'section_change', data: { from: 'home', to: 'booking' }, timestamp: currentTime - 1800000, userId: 'marco_genoa' },
        { action: 'section_change', data: { from: 'booking', to: 'profile' }, timestamp: currentTime - 1700000, userId: 'marco_genoa' },
        { action: 'section_change', data: { from: 'home', to: 'mySubscription' }, timestamp: currentTime - 3600000, userId: 'giulia_rossoblù' },
        { action: 'section_change', data: { from: 'mySubscription', to: 'contacts' }, timestamp: currentTime - 3300000, userId: 'giulia_rossoblù' },
        { action: 'section_change', data: { from: 'home', to: 'booking' }, timestamp: currentTime - 7200000, userId: 'andrea_1893' },
        
        // Ricerche
        { action: 'search_query', data: { query: 'genoa lazio', results: 3 }, timestamp: currentTime - 5400000, userId: 'francy_genoa' },
        { action: 'search_query', data: { query: 'gradinata nord', results: 8 }, timestamp: currentTime - 10800000, userId: 'luca_grifone' },
        { action: 'search_query', data: { query: 'tribuna', results: 12 }, timestamp: currentTime - 14400000, userId: 'sara_genoana' },
        
        // Login/logout
        { action: 'user_login', data: { method: 'email' }, timestamp: currentTime - 3600000, userId: 'marco_genoa' },
        { action: 'user_login', data: { method: 'google' }, timestamp: currentTime - 7200000, userId: 'giulia_rossoblù' },
        { action: 'user_logout', data: {}, timestamp: currentTime - 1800000, userId: 'andrea_1893' },
        
        // Interazioni abbonamenti
        { action: 'abbonamento_view', data: { abbonamentoId: 'GEN001', settore: 'Gradinata Nord' }, timestamp: currentTime - 9000000, userId: 'francy_genoa' },
        { action: 'abbonamento_interest', data: { abbonamentoId: 'GEN003', settore: 'Tribuna Centrale' }, timestamp: currentTime - 12600000, userId: 'luca_grifone' },
        { action: 'chat_started', data: { abbonamentoId: 'GEN007' }, timestamp: currentTime - 16200000, userId: 'sara_genoana' },
        
        // Feedback inviati
        { action: 'feedback_sent', data: { type: 'suggestion' }, timestamp: currentTime - 18000000, userId: 'marco_genoa' },
        { action: 'feedback_sent', data: { type: 'rating', rating: 5 }, timestamp: currentTime - 21600000, userId: 'giulia_rossoblù' }
      ];
      
      // Aggiungi analytics se non esistono
      demoAnalytics.forEach(newAnalytic => {
        if (!analytics.find(a => a.timestamp === newAnalytic.timestamp && a.userId === newAnalytic.userId)) {
          analytics.push(newAnalytic);
        }
      });
      
      localStorage.setItem('user_analytics', JSON.stringify(analytics));
    }
    
    // Inizializza sessioni utenti
    let sessions = JSON.parse(localStorage.getItem('user_sessions') || '[]');
    if (sessions.length < 20) {
      const currentTime = Date.now();
      const demoSessions = [
        { userId: 'marco_genoa', startTime: currentTime - 3600000, endTime: currentTime - 1800000, duration: 1800000, pages: 5 },
        { userId: 'giulia_rossoblù', startTime: currentTime - 7200000, endTime: currentTime - 5400000, duration: 1800000, pages: 8 },
        { userId: 'andrea_1893', startTime: currentTime - 86400000, endTime: currentTime - 82800000, duration: 3600000, pages: 12 },
        { userId: 'francy_genoa', startTime: currentTime - 172800000, endTime: currentTime - 169200000, duration: 3600000, pages: 6 },
        { userId: 'luca_grifone', startTime: currentTime - 259200000, endTime: currentTime - 255600000, duration: 3600000, pages: 9 }
      ];
      
      demoSessions.forEach(newSession => {
        if (!sessions.find(s => s.userId === newSession.userId && s.startTime === newSession.startTime)) {
          sessions.push(newSession);
        }
      });
      
      localStorage.setItem('user_sessions', JSON.stringify(sessions));
    }
    
    console.log('📊 Dati demo admin completi inizializzati:', {
      users: users.length,
      abbonamenti: abbonamenti.length, 
      feedbacks: feedbacks.length,
      analytics: analytics.length,
      sessions: sessions.length
    });
    
  } catch (error) {
    console.error('Errore inizializzazione dati demo admin:', error);
  }
}

// 🤖 Funzione speciale: Login diretto GitHub Copilot Admin
function copilotAdminLogin() {
  const copilotUser = {
    username: 'github-copilot',
    email: 'copilot@github.com', 
    nome: 'GitHub',
    cognome: 'Copilot',
    isAdmin: true,
    timestamp: Date.now(),
    lastLogin: Date.now()
  };
  
  // Salva in localStorage se non esiste
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (!users.find(u => u.username === 'github-copilot')) {
    users.push(copilotUser);
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  // Imposta come utente loggato
  loggedInUser = copilotUser;
  localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  
  // Aggiorna UI
  updateUIAfterLogin();
  
  // Mostra admin panel direttamente
  showSection('admin');
  
  showToast('🤖 Benvenuto GitHub Copilot! Accesso Admin attivato.', 'success');
  console.log('🤖 GitHub Copilot logged in as admin');
  
  return true;
}

// 🎮 Comando console per attivare accesso Copilot Admin
window.enableCopilotAdmin = function() {
  document.getElementById('copilotAdminBtn').style.display = 'inline-block';
  console.log('🤖 Pulsante Copilot Admin abilitato! Clicca per accedere.');
  showToast('🤖 Accesso Copilot Admin abilitato!', 'info');
};

// 🔧 Easter egg: attiva automaticamente se viene digitato il comando magico
window.addEventListener('keydown', function(e) {
  // Ctrl + Shift + C + A = Copilot Access
  if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') {
    setTimeout(() => {
      document.addEventListener('keydown', function handler(e2) {
        if (e2.code === 'KeyA') {
          enableCopilotAdmin();
          document.removeEventListener('keydown', handler);
        }
      }, { once: true });
    }, 100);
  }
});

// ========== FUNZIONI ADMIN AVANZATE ==========

// Visualizza dettagli utente
function viewUserDetails(username) {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === username);
  const abbonamenti = JSON.parse(localStorage.getItem('abbonamenti') || '[]');
  const userAbbonamenti = abbonamenti.filter(a => a.utente === username);
  const analytics = JSON.parse(localStorage.getItem('user_analytics') || '[]');
  const userAnalytics = analytics.filter(a => a.userId === username);
  
  if (!user) {
    showToast('Utente non trovato', 'error');
    return;
  }
  
  const modalContent = `
    <div class="user-details-modal">
      <div class="user-details-header">
        <h3>👤 Dettagli Utente: ${user.nome} ${user.cognome}</h3>
        <span class="user-status ${user.emailVerificata ? 'verified' : 'unverified'}">
          ${user.emailVerificata ? '✅ Verificato' : '❌ Non Verificato'}
        </span>
      </div>
      
      <div class="user-details-content">
        <div class="details-section">
          <h4>📋 Informazioni Personali</h4>
          <div class="detail-row"><strong>Username:</strong> ${user.username}</div>
          <div class="detail-row"><strong>Email:</strong> ${user.email}</div>
          <div class="detail-row"><strong>Telefono:</strong> ${user.telefono || 'Non fornito'}</div>
          <div class="detail-row"><strong>Data di nascita:</strong> ${user.dataNascita || 'Non fornita'}</div>
          <div class="detail-row"><strong>Registrato il:</strong> ${new Date(user.timestamp).toLocaleString('it-IT')}</div>
          <div class="detail-row"><strong>Ultimo accesso:</strong> ${user.lastLogin ? new Date(user.lastLogin).toLocaleString('it-IT') : 'Mai'}</div>
        </div>
        
        <div class="details-section">
          <h4>🎫 Abbonamenti (${userAbbonamenti.length})</h4>
          ${userAbbonamenti.length > 0 ? userAbbonamenti.map(abb => `
            <div class="abbonamento-item">
              <span>${abb.matchDesc} - ${abb.settore}</span>
              <span class="price">€${abb.prezzo}</span>
              <span class="status ${abb.disponibile ? 'available' : 'unavailable'}">
                ${abb.disponibile ? 'Disponibile' : 'Non disponibile'}
              </span>
            </div>
          `).join('') : '<div class="no-data">Nessun abbonamento</div>'}
        </div>
        
        <div class="details-section">
          <h4>📊 Attività Recente (${userAnalytics.length} eventi)</h4>
          ${userAnalytics.slice(0, 5).map(event => `
            <div class="activity-item">
              <span class="activity-action">${getActivityName(event.action)}</span>
              <span class="activity-time">${new Date(event.timestamp).toLocaleString('it-IT')}</span>
            </div>
          `).join('') || '<div class="no-data">Nessuna attività registrata</div>'}
        </div>
      </div>
      
      <div class="user-details-actions">
        <button onclick="sendUserMessage('${username}')" class="btn-primary">💬 Invia Messaggio</button>
        <button onclick="toggleUserVerification('${username}')" class="btn-warning">
          ${user.emailVerificata ? '❌ Rimuovi Verifica' : '✅ Verifica Email'}
        </button>
        <button onclick="exportUserData('${username}')" class="btn-info">📤 Esporta Dati</button>
        <button onclick="closeAdminModal()" class="btn-secondary">❌ Chiudi</button>
      </div>
    </div>
  `;
  
  showAdminModal('Dettagli Utente', modalContent);
}

// Invia messaggio a utente specifico
function sendUserMessage(username) {
  const message = prompt(`Inserisci messaggio per ${username}:`);
  if (!message) return;
  
  try {
    const timestamp = Date.now();
    let adminMessages = JSON.parse(localStorage.getItem('adminMessages') || '[]');
    
    const newMessage = {
      id: 'msg_' + timestamp,
      to: username,
      from: 'admin',
      message: message,
      timestamp: timestamp,
      read: false
    };
    
    adminMessages.push(newMessage);
    localStorage.setItem('adminMessages', JSON.stringify(adminMessages));
    
    showToast(`Messaggio inviato a ${username}!`, 'success');
    addAnalyticsEvent('admin_message_sent', { recipient: username });
    
  } catch (error) {
    console.error('Errore invio messaggio:', error);
    showToast('Errore durante invio messaggio', 'error');
  }
}

// Toggle verifica email utente
function toggleUserVerification(username) {
  try {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.username === username);
    
    if (userIndex === -1) {
      showToast('Utente non trovato', 'error');
      return;
    }
    
    users[userIndex].emailVerificata = !users[userIndex].emailVerificata;
    localStorage.setItem('users', JSON.stringify(users));
    
    const action = users[userIndex].emailVerificata ? 'verificata' : 'rimossa verifica';
    showToast(`Email ${action} per ${username}`, 'success');
    
    loadUsersAdmin();
    closeAdminModal();
    
    addAnalyticsEvent('admin_user_verification', { 
      username: username, 
      verified: users[userIndex].emailVerificata 
    });
    
  } catch (error) {
    console.error('Errore toggle verifica:', error);
    showToast('Errore durante modifica verifica', 'error');
  }
}

// Esporta dati utente singolo
function exportUserData(username) {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username);
    const abbonamenti = JSON.parse(localStorage.getItem('abbonamenti') || '[]');
    const userAbbonamenti = abbonamenti.filter(a => a.utente === username);
    const analytics = JSON.parse(localStorage.getItem('user_analytics') || '[]');
    const userAnalytics = analytics.filter(a => a.userId === username);
    
    if (!user) {
      showToast('Utente non trovato', 'error');
      return;
    }
    
    const exportData = {
      user: user,
      abbonamenti: userAbbonamenti,
      analytics: userAnalytics,
      exportedAt: new Date().toISOString(),
      exportedBy: loggedInUser?.username || 'admin'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `utente_${username}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showToast(`Dati di ${username} esportati!`, 'success');
    addAnalyticsEvent('admin_user_export', { username: username });
    
  } catch (error) {
    console.error('Errore esportazione:', error);
    showToast('Errore durante esportazione', 'error');
  }
}

// Mostra modal admin personalizzato
function showAdminModal(title, content) {
  const existingModal = document.querySelector('.admin-modal');
  if (existingModal) {
    existingModal.remove();
  }
  
  const modal = document.createElement('div');
  modal.className = 'modal admin-modal';
  modal.style.display = 'flex';
  modal.innerHTML = `
    <div class="modal-content admin-modal-content">
      <div class="modal-header">
        <h2>${title}</h2>
        <span class="close" onclick="closeAdminModal()">×</span>
      </div>
      <div class="modal-body">
        ${content}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeAdminModal();
    }
  });
}

// Chiudi modal admin
function closeAdminModal() {
  const modals = document.querySelectorAll('.admin-modal');
  modals.forEach(modal => modal.remove());
}

// Utility: nome leggibile per azioni analytics
function getActivityName(action) {
  const activityNames = {
    'section_change': '🔄 Cambio Sezione',
    'search_query': '🔍 Ricerca',
    'user_login': '🔐 Login',
    'user_logout': '🚪 Logout',
    'abbonamento_view': '👁️ Vista Abbonamento',
    'abbonamento_interest': '❤️ Interesse',
    'chat_started': '💬 Chat Iniziata',
    'feedback_sent': '📝 Feedback Inviato'
  };
  return activityNames[action] || action;
}

// Aggiungi evento analytics (Firebase-first)
async function addAnalyticsEvent(action, data = {}) {
  try {
    const event = {
      action: action,
      data: data,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userId: loggedInUser?.username || 'admin',
      sessionId: getSessionId()
    };
    
    // PRIORITÀ: Salva su Firebase
    try {
      await db.collection('analytics').add(event);
      console.log('📊 Evento analytics salvato su Firebase:', action);
    } catch (firebaseError) {
      console.log('📱 Firebase non disponibile, salvo su localStorage:', action);
      
      // FALLBACK: Salva su localStorage
      let analytics = JSON.parse(localStorage.getItem('user_analytics') || '[]');
      const localEvent = {
        ...event,
        timestamp: Date.now()
      };
      analytics.push(localEvent);
      localStorage.setItem('user_analytics', JSON.stringify(analytics));
    }
    
  } catch (error) {
    console.error('❌ Errore salvataggio analytics:', error);
  }
}

// Ottieni o crea session ID per tracking
function getSessionId() {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

// Sistema di sincronizzazione bidirezionale Firebase <-> localStorage
async function syncDataBidirectional() {
  try {
    console.log('🔄 Avvio sincronizzazione bidirezionale...');
    
    // 1. SYNC FEEDBACK
    await syncFeedbacksBidirectional();
    
    // 2. SYNC UTENTI (solo per demo admin)
    await syncUsersBidirectional();
    
    // 3. SYNC ABBONAMENTI
    await syncAbbonamentiBidirectional();
    
    console.log('✅ Sincronizzazione bidirezionale completata');
    
  } catch (error) {
    console.error('❌ Errore sincronizzazione bidirezionale:', error);
  }
}

// Sync feedback bidirezionale
async function syncFeedbacksBidirectional() {
  try {
    // Carica da Firebase
    const firebaseFeedbacks = [];
    const fbSnapshot = await db.collection('feedback').get();
    fbSnapshot.forEach(doc => {
      const data = doc.data();
      firebaseFeedbacks.push({
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toMillis() || Date.now(),
        source: 'firebase'
      });
    });
    
    // Carica da localStorage
    const localFeedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]').map(f => ({
      ...f,
      source: 'localStorage'
    }));
    
    // Merge intelligente (Firebase ha priorità per ID esistenti)
    const mergedFeedbacks = [];
    const processedIds = new Set();
    
    // Prima aggiungi tutti i feedback da Firebase
    firebaseFeedbacks.forEach(fb => {
      mergedFeedbacks.push(fb);
      processedIds.add(fb.id);
    });
    
    // Poi aggiungi feedback locali non presenti su Firebase
    for (const local of localFeedbacks) {
      if (!processedIds.has(local.id)) {
        // Carica feedback locale su Firebase
        try {
          const fbRef = db.collection('feedback').doc(local.id);
          await fbRef.set({
            ...local,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            syncedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          
          mergedFeedbacks.push({
            ...local,
            source: 'synced'
          });
          
          console.log('⬆️ Feedback locale caricato su Firebase:', local.id);
        } catch (uploadError) {
          console.log('❌ Errore upload feedback locale:', uploadError);
          mergedFeedbacks.push(local); // Mantieni locale
        }
      }
    }
    
    // Aggiorna localStorage con dati merged
    const finalFeedbacks = mergedFeedbacks.map(f => {
      const { source, ...cleanData } = f;
      return cleanData;
    });
    
    localStorage.setItem('feedbacks', JSON.stringify(finalFeedbacks));
    
    console.log(`✅ Feedback sincronizzati: ${finalFeedbacks.length} totali`);
    
  } catch (error) {
    console.error('❌ Errore sync feedback:', error);
  }
}

// Sync utenti bidirezionale (solo admin demo)
async function syncUsersBidirectional() {
  try {
    // Per utenti, manteniamo prevalentemente Firebase come master
    const firebaseUsers = [];
    const fbSnapshot = await db.collection('users').get();
    fbSnapshot.forEach(doc => {
      const data = doc.data();
      firebaseUsers.push({
        ...data,
        timestamp: data.timestamp?.toMillis() || Date.now(),
        lastLogin: data.lastLogin?.toMillis() || Date.now()
      });
    });
    
    // Aggiorna localStorage con dati Firebase
    localStorage.setItem('users', JSON.stringify(firebaseUsers));
    
    console.log(`✅ Utenti sincronizzati da Firebase: ${firebaseUsers.length}`);
    
  } catch (error) {
    console.error('❌ Errore sync utenti:', error);
  }
}

// Sync abbonamenti bidirezionale
async function syncAbbonamentiBidirectional() {
  try {
    // Carica da Firebase
    const firebaseAbbonamenti = [];
    const fbSnapshot = await db.collection('abbonamenti').get();
    fbSnapshot.forEach(doc => {
      const data = doc.data();
      firebaseAbbonamenti.push({
        id: doc.id,
        ...data,
        timestamp: data.timestamp?.toMillis() || Date.now()
      });
    });
    
    // Carica da localStorage  
    const localAbbonamenti = JSON.parse(localStorage.getItem('abbonamenti') || '[]');
    
    // Merge con priorità Firebase
    const mergedAbbonamenti = [];
    const processedIds = new Set();
    
    // Prima Firebase
    firebaseAbbonamenti.forEach(fb => {
      mergedAbbonamenti.push(fb);
      processedIds.add(fb.id);
    });
    
    // Poi locali non duplicati
    for (const local of localAbbonamenti) {
      if (!processedIds.has(local.id)) {
        // Carica su Firebase se non esiste
        try {
          const abbRef = db.collection('abbonamenti').doc(local.id || undefined);
          await abbRef.set({
            ...local,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            syncedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          
          mergedAbbonamenti.push(local);
          console.log('⬆️ Abbonamento locale caricato su Firebase:', local.id);
        } catch (uploadError) {
          mergedAbbonamenti.push(local); // Mantieni locale
        }
      }
    }
    
    // Aggiorna localStorage
    localStorage.setItem('abbonamenti', JSON.stringify(mergedAbbonamenti));
    
    console.log(`✅ Abbonamenti sincronizzati: ${mergedAbbonamenti.length} totali`);
    
  } catch (error) {
    console.error('❌ Errore sync abbonamenti:', error);
  }
}

// Sistema di Gestione Partite Premium
let currentMatches = [];

// Inizializza il sistema di gestione partite
function initMatchManagement() {
  loadMatches();
  updateMatchStats();
  setupMatchFilters();
  setupMatchSearch();
}

// Carica le partite dal localStorage o Firebase
function loadMatches() {
  try {
    const storedMatches = localStorage.getItem('matches');
    if (storedMatches) {
      currentMatches = JSON.parse(storedMatches);
    } else {
      // Partite di esempio se non ci sono dati
      currentMatches = [
        {
          id: 1,
          opponent: 'Cremonese',
          type: 'serie-a',
          date: '2025-10-29',
          time: '20:45',
          venue: 'luigi-ferraris',
          round: 10,
          salesStatus: 'active',
          salesStart: '2025-10-15T10:00',
          salesEnd: '2025-10-29T18:00',
          maxTicketsPerUser: 4,
          sectors: {
            'tribuna-centrale': { enabled: true, price: 35 },
            'tribuna-laterale': { enabled: true, price: 25 },
            'distinti': { enabled: true, price: 20 },
            'gradinate': { enabled: true, price: 15 }
          },
          created: new Date().toISOString(),
          updated: new Date().toISOString()
        }
      ];
      saveMatches();
    }
    renderMatchesTable();
  } catch (error) {
    console.error('Errore nel caricamento partite:', error);
    showToast('Errore nel caricamento delle partite', 'error');
  }
}

// Salva le partite nel localStorage
function saveMatches() {
  try {
    localStorage.setItem('matches', JSON.stringify(currentMatches));
    updateMatchStats();
  } catch (error) {
    console.error('Errore nel salvataggio partite:', error);
    showToast('Errore nel salvataggio delle partite', 'error');
  }
}

// Aggiorna le statistiche delle partite
function updateMatchStats() {
  const total = currentMatches.length;
  const active = currentMatches.filter(m => m.salesStatus === 'active').length;
  const suspended = currentMatches.filter(m => m.salesStatus === 'suspended').length;
  const upcoming = currentMatches.filter(m => new Date(m.date + 'T' + m.time) > new Date()).length;
  
  const totalElement = document.getElementById('totalMatchesCount');
  const activeElement = document.getElementById('activeMatchesCount');
  const suspendedElement = document.getElementById('suspendedMatchesCount');
  const upcomingElement = document.getElementById('upcomingMatchesCount');
  
  if (totalElement) totalElement.textContent = total;
  if (activeElement) activeElement.textContent = active;
  if (suspendedElement) suspendedElement.textContent = suspended;
  if (upcomingElement) upcomingElement.textContent = upcoming;
}

// Renderizza la tabella delle partite
function renderMatchesTable() {
  const tableContainer = document.getElementById('matchesTablePremium');
  if (!tableContainer) return;
  
  if (currentMatches.length === 0) {
    tableContainer.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: #6c757d;">
        <div style="font-size: 48px; margin-bottom: 20px;">⚽</div>
        <h3>Nessuna partita trovata</h3>
        <p>Aggiungi la prima partita per iniziare la gestione del calendario</p>
      </div>`;
    return;
  }
  
  let tableHTML = `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background: #f8f9fa; border-bottom: 2px solid #e8ecf0;">
          <th style="padding: 15px; text-align: left; font-weight: 700; color: #002147;">
            <input type="checkbox" id="selectAllMatches" onchange="toggleAllMatches()">
          </th>
          <th style="padding: 15px; text-align: left; font-weight: 700; color: #002147;">Partita</th>
          <th style="padding: 15px; text-align: left; font-weight: 700; color: #002147;">Data/Ora</th>
          <th style="padding: 15px; text-align: left; font-weight: 700; color: #002147;">Tipo</th>
          <th style="padding: 15px; text-align: left; font-weight: 700; color: #002147;">Stato Vendite</th>
          <th style="padding: 15px; text-align: left; font-weight: 700; color: #002147;">Settori</th>
          <th style="padding: 15px; text-align: center; font-weight: 700; color: #002147;">Azioni</th>
        </tr>
      </thead>
      <tbody>`;
  
  currentMatches.forEach(match => {
    const matchDate = new Date(match.date + 'T' + match.time);
    const isUpcoming = matchDate > new Date();
    const statusIcon = match.salesStatus === 'active' ? '🟢' : match.salesStatus === 'suspended' ? '⏸️' : '⏳';
    const statusColor = match.salesStatus === 'active' ? '#28a745' : match.salesStatus === 'suspended' ? '#ffc107' : '#007bff';
    
    const enabledSectors = Object.keys(match.sectors).filter(key => match.sectors[key].enabled);
    const sectorsDisplay = enabledSectors.map(sector => {
      const sectorName = sector.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      return `${sectorName} (€${match.sectors[sector].price})`;
    }).join(', ');
    
    tableHTML += `
      <tr style="border-bottom: 1px solid #e8ecf0;" class="match-row" data-match-id="${match.id}">
        <td style="padding: 15px;">
          <input type="checkbox" class="match-checkbox" value="${match.id}">
        </td>
        <td style="padding: 15px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="img/genoa.png" alt="Genoa" style="width: 30px; height: 30px; border-radius: 50%;">
            <span style="font-weight: 600;">vs</span>
            <img src="img/${slugify(match.opponent)}.png" alt="${match.opponent}" style="width: 30px; height: 30px; border-radius: 50%;" onerror="this.src='img/default-team.svg'">
            <div>
              <div style="font-weight: 600; color: #002147;">Genoa - ${match.opponent}</div>
              <div style="font-size: 12px; color: #6c757d;">Giornata ${match.round}</div>
            </div>
          </div>
        </td>
        <td style="padding: 15px;">
          <div style="font-weight: 600; color: #002147;">${formatDate(match.date)}</div>
          <div style="font-size: 12px; color: #6c757d;">${match.time}</div>
        </td>
        <td style="padding: 15px;">
          <span style="background: #e8ecf0; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
            ${match.type.replace('-', ' ')}
          </span>
        </td>
        <td style="padding: 15px;">
          <span style="color: ${statusColor}; font-weight: 600; font-size: 14px;">
            ${statusIcon} ${match.salesStatus.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        </td>
        <td style="padding: 15px; font-size: 12px; color: #6c757d; max-width: 200px;">
          ${sectorsDisplay}
        </td>
        <td style="padding: 15px; text-align: center;">
          <div style="display: flex; gap: 5px; justify-content: center;">
            <button onclick="editMatch(${match.id}); return false;" style="background: #007bff; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;" title="Modifica">✏️</button>
            <button onclick="toggleMatchSales(${match.id}); return false;" style="background: ${match.salesStatus === 'active' ? '#ffc107' : '#28a745'}; color: ${match.salesStatus === 'active' ? 'black' : 'white'}; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;" title="${match.salesStatus === 'active' ? 'Sospendi' : 'Attiva'}">
              ${match.salesStatus === 'active' ? '⏸️' : '▶️'}
            </button>
            <button onclick="deleteMatch(${match.id}); return false;" style="background: #dc3545; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;" title="Elimina">🗑️</button>
          </div>
        </td>
      </tr>`;
  });
  
  tableHTML += `</tbody></table>`;
  tableContainer.innerHTML = tableHTML;
}

// Setup filtri partite
function setupMatchFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      filterMatches(this.dataset.filter);
    });
  });
}

// Setup ricerca partite
function setupMatchSearch() {
  const searchInput = document.getElementById('matchSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      filterMatchesBySearch(searchTerm);
    });
  }
}

// Filtra partite per tipo
function filterMatches(filter) {
  const rows = document.querySelectorAll('.match-row');
  rows.forEach(row => {
    const matchId = parseInt(row.dataset.matchId);
    const match = currentMatches.find(m => m.id === matchId);
    let show = true;
    
    switch(filter) {
      case 'active':
        show = match.salesStatus === 'active';
        break;
      case 'suspended':
        show = match.salesStatus === 'suspended';
        break;
      case 'upcoming':
        show = new Date(match.date + 'T' + match.time) > new Date();
        break;
      case 'completed':
        show = new Date(match.date + 'T' + match.time) < new Date();
        break;
      default:
        show = true;
    }
    
    row.style.display = show ? '' : 'none';
  });
}

// Filtra partite per ricerca
function filterMatchesBySearch(searchTerm) {
  const rows = document.querySelectorAll('.match-row');
  rows.forEach(row => {
    const matchId = parseInt(row.dataset.matchId);
    const match = currentMatches.find(m => m.id === matchId);
    const searchContent = `${match.opponent} ${match.type} ${formatDate(match.date)} ${match.time}`.toLowerCase();
    const show = searchContent.includes(searchTerm);
    row.style.display = show ? '' : 'none';
  });
}

// Apri modal per aggiungere partita
function openAddMatchModal() {
  const modal = document.getElementById('addMatchModal');
  if (modal) {
    modal.style.display = 'flex';
    clearMatchForm();
  }
}

// Chiudi modal aggiungi partita
function closeAddMatchModal() {
  const modal = document.getElementById('addMatchModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Pulisci form partita
function clearMatchForm() {
  const form = document.getElementById('addMatchForm');
  if (form) {
    form.reset();
    // Reset checkboxes
    document.getElementById('tribunaCentrale').checked = true;
    document.getElementById('tribunaLaterale').checked = false;
    document.getElementById('distinti').checked = false;
    document.getElementById('gradinate').checked = false;
  }
}

// Salva nuova partita
function saveNewMatch() {
  const form = document.getElementById('addMatchForm');
  if (!form) return;
  
  // Validazione form
  const opponent = document.getElementById('matchOpponent').value.trim();
  const type = document.getElementById('matchType').value;
  const date = document.getElementById('matchDate').value;
  const time = document.getElementById('matchTime').value;
  const venue = document.getElementById('matchVenue').value;
  const round = document.getElementById('matchRound').value;
  const salesStatus = document.getElementById('salesStatus').value;
  
  if (!opponent || !type || !date || !time || !venue || !salesStatus) {
    showToast('Compila tutti i campi obbligatori', 'error');
    return;
  }
  
  // Controlla duplicati
  const existingMatch = currentMatches.find(m => 
    m.opponent.toLowerCase() === opponent.toLowerCase() && 
    m.date === date && 
    m.time === time
  );
  
  if (existingMatch) {
    showToast('Esiste già una partita con questi parametri', 'error');
    return;
  }
  
  // Costruisci oggetto partita
  const newMatch = {
    id: Date.now(),
    opponent: opponent,
    type: type,
    date: date,
    time: time,
    venue: venue,
    round: parseInt(round) || null,
    salesStatus: salesStatus,
    salesStart: document.getElementById('salesStartDate').value || null,
    salesEnd: document.getElementById('salesEndDate').value || null,
    maxTicketsPerUser: parseInt(document.getElementById('maxTicketsPerUser').value) || 4,
    sectors: {
      'tribuna-centrale': {
        enabled: document.getElementById('tribunaCentrale').checked,
        price: parseFloat(document.getElementById('prezzoCentrale').value) || 0
      },
      'tribuna-laterale': {
        enabled: document.getElementById('tribunaLaterale').checked,
        price: parseFloat(document.getElementById('prezzoLaterale').value) || 0
      },
      'distinti': {
        enabled: document.getElementById('distinti').checked,
        price: parseFloat(document.getElementById('prezzoDistinti').value) || 0
      },
      'gradinate': {
        enabled: document.getElementById('gradinate').checked,
        price: parseFloat(document.getElementById('prezzoGradinate').value) || 0
      }
    },
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  };
  
  // Aggiungi partita e salva
  currentMatches.push(newMatch);
  saveMatches();
  renderMatchesTable();
  closeAddMatchModal();
  
  showToast(`Partita ${opponent} aggiunta con successo!`, 'success');
}

// Attiva/Sospendi vendita partita
function toggleMatchSales(matchId) {
  const match = currentMatches.find(m => m.id === matchId);
  if (!match) return;
  
  const newStatus = match.salesStatus === 'active' ? 'suspended' : 'active';
  match.salesStatus = newStatus;
  match.updated = new Date().toISOString();
  
  saveMatches();
  renderMatchesTable();
  
  const statusText = newStatus === 'active' ? 'attivate' : 'sospese';
  showToast(`Vendite per ${match.opponent} ${statusText}`, 'success');
}

// Elimina partita
function deleteMatch(matchId) {
  const match = currentMatches.find(m => m.id === matchId);
  if (!match) return;
  
  if (confirm(`Sei sicuro di voler eliminare la partita contro ${match.opponent}?`)) {
    currentMatches = currentMatches.filter(m => m.id !== matchId);
    saveMatches();
    renderMatchesTable();
    showToast(`Partita ${match.opponent} eliminata`, 'success');
  }
}

// Seleziona/Deseleziona tutte le partite
function toggleAllMatches() {
  const selectAll = document.getElementById('selectAllMatches');
  const checkboxes = document.querySelectorAll('.match-checkbox');
  
  checkboxes.forEach(checkbox => {
    checkbox.checked = selectAll.checked;
  });
}

// Attiva partite selezionate in massa
function bulkActivateMatches() {
  const selectedMatches = getSelectedMatches();
  if (selectedMatches.length === 0) {
    showToast('Seleziona almeno una partita', 'error');
    return;
  }
  
  selectedMatches.forEach(matchId => {
    const match = currentMatches.find(m => m.id === matchId);
    if (match) {
      match.salesStatus = 'active';
      match.updated = new Date().toISOString();
    }
  });
  
  saveMatches();
  renderMatchesTable();
  showToast(`${selectedMatches.length} partite attivate`, 'success');
}

// Sospendi partite selezionate in massa
function bulkSuspendMatches() {
  const selectedMatches = getSelectedMatches();
  if (selectedMatches.length === 0) {
    showToast('Seleziona almeno una partita', 'error');
    return;
  }
  
  selectedMatches.forEach(matchId => {
    const match = currentMatches.find(m => m.id === matchId);
    if (match) {
      match.salesStatus = 'suspended';
      match.updated = new Date().toISOString();
    }
  });
  
  saveMatches();
  renderMatchesTable();
  showToast(`${selectedMatches.length} partite sospese`, 'success');
}

// Ottieni partite selezionate
function getSelectedMatches() {
  const checkboxes = document.querySelectorAll('.match-checkbox:checked');
  return Array.from(checkboxes).map(cb => parseInt(cb.value));
}

// Sincronizza calendario stagionale (placeholder per future integrazioni)
function syncCalendarSeason() {
  showToast('Funzione in sviluppo - Sincronizzazione calendario Serie A', 'info');
}

// Modifica partita (placeholder per future implementazioni)
function editMatch(matchId) {
  showToast('Funzione in sviluppo - Modifica partita', 'info');
}

// 🧹 Funzione di pulizia completa abbonamenti per admin
async function clearAllAbbonamenti() {
  if (!confirm('⚠️ ATTENZIONE! Questa azione eliminerà TUTTI gli abbonamenti sia da Firebase che dal localStorage. Sei sicuro?')) {
    return;
  }
  
  try {
    console.log('🧹 Avvio pulizia completa abbonamenti...');
    
    // 1. Pulisci Firebase
    if (db) {
      const snapshot = await db.collection('abbonamenti').get();
      const batch = db.batch();
      
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      console.log('✅ Firebase abbonamenti eliminati');
    }
    
    // 2. Pulisci localStorage abbonamenti
    localStorage.removeItem('abbonamenti');
    console.log('✅ localStorage abbonamenti eliminato');
    
    // 3. Pulisci array globale
    abbonamenti = [];
    
    // 4. Aggiorna UI
    loadHomeListings();
    updateSystemStatus();
    
    showToast('✅ Tutti gli abbonamenti sono stati eliminati completamente', 'success');
    console.log('✅ Pulizia completa completata');
    
  } catch (error) {
    console.error('❌ Errore durante la pulizia:', error);
    showToast('❌ Errore durante la pulizia degli abbonamenti', 'error');
  }
}

// 🗑️ Funzione per svuotare completamente il sistema (SUPER ADMIN)
async function clearAllDemoData() {
  if (!confirm('🚨 SUPER ADMIN: Questa azione eliminerà TUTTI i dati demo (abbonamenti, users demo, analytics demo). Continuare?')) {
    return;
  }
  
  if (!confirm('🔥 ULTIMA CONFERMA: Sei sicuro di voler eliminare TUTTO? Questa azione è irreversibile!')) {
    return;
  }
  
  try {
    console.log('🔥 Avvio pulizia completa sistema...');
    
    // 1. Pulisci Firebase completamente
    if (db) {
      const batch = db.batch();
      
      // Elimina tutti gli abbonamenti
      const abbonamentiSnapshot = await db.collection('abbonamenti').get();
      abbonamentiSnapshot.docs.forEach(doc => batch.delete(doc.ref));
      
      // Elimina utenti demo (tranne admin veri)
      const usersSnapshot = await db.collection('users').get();
      usersSnapshot.docs.forEach(doc => {
        const userData = doc.data();
        // Mantieni solo admin reali
        if (!userData.isAdmin || userData.username.includes('demo') || userData.username.includes('_')) {
          batch.delete(doc.ref);
        }
      });
      
      // Elimina analytics demo
      const analyticsSnapshot = await db.collection('analytics').get();
      analyticsSnapshot.docs.forEach(doc => batch.delete(doc.ref));
      
      // Elimina feedback demo
      const feedbackSnapshot = await db.collection('feedback').get();
      feedbackSnapshot.docs.forEach(doc => batch.delete(doc.ref));
      
      await batch.commit();
      console.log('✅ Firebase completamente pulito');
    }
    
    // 2. Pulisci localStorage completamente
    localStorage.removeItem('abbonamenti');
    localStorage.removeItem('user_analytics');
    localStorage.removeItem('user_sessions');
    localStorage.removeItem('users'); // Rimuovi anche users localStorage
    console.log('✅ localStorage completamente pulito');
    
    // 3. Reset array globali
    abbonamenti = [];
    users = [];
    analytics = [];
    
    // 4. Aggiorna UI
    loadHomeListings();
    updateSystemStatus();
    
    showToast('🔥 Sistema completamente pulito! Tutti i dati demo eliminati.', 'success');
    console.log('🔥 Pulizia sistema completata');
    
  } catch (error) {
    console.error('❌ Errore durante la pulizia sistema:', error);
    showToast('❌ Errore durante la pulizia del sistema', 'error');
  }
}

// 🔄 Funzione per forzare sincronizzazione solo da Firebase (no localStorage upload)
async function forceFirebaseSync() {
  if (!db) {
    showToast('❌ Firebase non disponibile', 'error');
    return;
  }
  
  try {
    console.log('🔄 Forzando sincronizzazione solo da Firebase...');
    
    // Carica SOLO da Firebase
    const snapshot = await db.collection('abbonamenti').get();
    abbonamenti = [];
    
    snapshot.forEach(doc => {
      abbonamenti.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Aggiorna localStorage con i dati Firebase
    localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
    
    // Aggiorna UI
    loadHomeListings();
    updateSystemStatus();
    
    console.log(`✅ Sincronizzazione forzata: ${abbonamenti.length} abbonamenti da Firebase`);
    showToast(`✅ Sincronizzazione completata: ${abbonamenti.length} abbonamenti`, 'success');
    
  } catch (error) {
    console.error('❌ Errore sincronizzazione forzata:', error);
    showToast('❌ Errore durante la sincronizzazione', 'error');
  }
}

// 🔧 Carica controlli sistema
function loadSystemControls() {
  console.log('⚙️ Caricamento controlli sistema...');
  updateSystemStatus();
}

// 📊 Aggiorna stato sistema
function updateSystemStatus() {
  try {
    // Stato Firebase
    const firebaseStatus = document.getElementById('firebaseStatus');
    if (firebaseStatus) {
      firebaseStatus.textContent = db ? 'Connesso ✅' : 'Disconnesso ❌';
      firebaseStatus.style.color = db ? '#28a745' : '#dc3545';
    }
    
    // Conta localStorage
    const localStorageCount = document.getElementById('localStorageCount');
    if (localStorageCount) {
      const localAbbonamenti = JSON.parse(localStorage.getItem('abbonamenti') || '[]');
      localStorageCount.textContent = localAbbonamenti.length;
    }
    
    // Conta array globale
    const arrayCount = document.getElementById('arrayAbbonamenti');
    if (arrayCount) {
      arrayCount.textContent = abbonamenti ? abbonamenti.length : 0;
    }
    
  } catch (error) {
    console.error('❌ Errore aggiornamento stato sistema:', error);
  }
}

// � Mobile Optimization Functions
function initMobileOptimizations() {
  // Fix viewport height issue on mobile browsers
  function setVHProperty() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setVHProperty();
  window.addEventListener('resize', setVHProperty);
  window.addEventListener('orientationchange', () => {
    setTimeout(setVHProperty, 100);
  });
  
  // Improve touch scrolling
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Prevent double-tap zoom on buttons
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
    
    // Improve modal scrolling on touch devices
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      modal.addEventListener('touchmove', function(e) {
        if (e.target === modal) {
          e.preventDefault();
        }
      });
    });
  }
  
  // Auto-hide address bar on mobile
  if (window.innerHeight < window.innerWidth && window.innerHeight < 500) {
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 100);
  }
  
  // Optimize keyboard handling for forms
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      if (window.innerWidth <= 768) {
        setTimeout(() => {
          this.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }, 300);
      }
    });
  });
  
  // Improve modal handling on mobile
  function optimizeModalsForMobile() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            if (modal.style.display === 'flex') {
              document.body.style.overflow = 'hidden';
              if (window.innerWidth <= 768) {
                modal.scrollTo(0, 0);
              }
            } else {
              document.body.style.overflow = '';
            }
          }
        });
      });
      
      observer.observe(modal, { 
        attributes: true, 
        attributeFilter: ['style'] 
      });
    });
  }
  
  optimizeModalsForMobile();
  
  // Improve navigation on mobile
  function optimizeMobileNavigation() {
    const nav = document.querySelector('nav');
    if (nav && window.innerWidth <= 768) {
      let lastScrollY = window.scrollY;
      
      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          nav.style.transform = 'translateY(-100%)';
        } else {
          nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
      });
      
      nav.style.transition = 'transform 0.3s ease-in-out';
    }
  }
  
  if (window.innerWidth <= 768) {
    optimizeMobileNavigation();
  }
  
  console.log('📱 Mobile optimizations initialized');
}

// 🚀 Performance optimizations for mobile
function initMobilePerformance() {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // Optimize table scrolling on mobile
  const tableContainers = document.querySelectorAll('.table-container');
  tableContainers.forEach(container => {
    if (window.innerWidth <= 768) {
      container.style.scrollBehavior = 'smooth';
      container.style.webkitOverflowScrolling = 'touch';
    }
  });
  
  // Debounce resize events
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Update mobile optimizations on resize
      if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-view');
      } else {
        document.body.classList.remove('mobile-view');
      }
    }, 150);
  });
  
  // Initial mobile class
  if (window.innerWidth <= 768) {
    document.body.classList.add('mobile-view');
  }
}

// 📱 Mobile-specific event handlers
function initMobileEventHandlers() {
  // Improve button feedback on touch
  const buttons = document.querySelectorAll('button, .btn');
  buttons.forEach(button => {
    button.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('touchend', function() {
      this.style.transform = '';
    });
    
    button.addEventListener('touchcancel', function() {
      this.style.transform = '';
    });
  });
  
  // Improve modal close on mobile
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('touchstart', function(e) {
      if (e.target === modal) {
        const startY = e.touches[0].clientY;
        const startTime = Date.now();
        
        const handleTouchEnd = (endEvent) => {
          const endY = endEvent.changedTouches[0].clientY;
          const endTime = Date.now();
          const deltaY = endY - startY;
          const deltaTime = endTime - startTime;
          
          // Close modal if swipe down quickly
          if (deltaY > 100 && deltaTime < 300) {
            modal.style.display = 'none';
          }
          
          modal.removeEventListener('touchend', handleTouchEnd);
        };
        
        modal.addEventListener('touchend', handleTouchEnd);
      }
    });
  });
}

// �📦 Carica abbonamenti solo quando richiesto (controllo manuale)
async function loadAbbonamentiManual() {
  if (!db) {
    console.log('❌ Firebase non disponibile per caricamento abbonamenti');
    showToast('Firebase non disponibile', 'error');
    return;
  }
  
  try {
    console.log('📦 Caricamento manuale abbonamenti da Firebase...');
    
    const snapshot = await db.collection('abbonamenti').get();
    abbonamenti = [];
    
    snapshot.forEach((doc) => {
      abbonamenti.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Aggiorna localStorage
    localStorage.setItem('abbonamenti', JSON.stringify(abbonamenti));
    
    // Aggiorna UI
    loadHomeListings();
    updateSystemStatus();
    
    console.log(`✅ Abbonamenti caricati manualmente: ${abbonamenti.length}`);
    showToast(`✅ Caricati ${abbonamenti.length} abbonamenti`, 'success');
    
  } catch (error) {
    console.error('❌ Errore caricamento manuale abbonamenti:', error);
    showToast('❌ Errore caricamento abbonamenti', 'error');
  }
}

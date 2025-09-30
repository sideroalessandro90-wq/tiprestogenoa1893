# 🔥 Firebase Setup per "Ti Presto"

## Step 1: Configurazione Firebase Console

### 1. Crea Progetto Firebase
1. Vai su [Firebase Console](https://console.firebase.google.com)
2. Clicca "Aggiungi progetto"
3. Nome progetto: **ti-presto-genoa**
4. Abilita Google Analytics (opzionale)

### 2. Configura Firestore Database
1. Vai su **Firestore Database**
2. Clicca "Crea database"
3. Modalità: **Inizia in modalità test** (per ora)
4. Ubicazione: **europe-west3** (Frankfurt)

### 3. Abilita Authentication
1. Vai su **Authentication**
2. Clicca "Inizia"
3. Metodi di accesso → **Email/Password** → Abilita

### 4. Ottieni Credenziali
1. Vai su **Impostazioni progetto** (⚙️)
2. Scorri giù a "Le tue app"
3. Clicca sull'icona Web `</>`
4. Nome app: **ti-presto-web**
5. Copia la configurazione firebaseConfig

## Step 2: Aggiorna Codice

### Sostituisci in script.js:
```javascript
const firebaseConfig = {
  apiKey: "LA_TUA_API_KEY",
  authDomain: "ti-presto-genoa.firebaseapp.com",
  projectId: "ti-presto-genoa",
  storageBucket: "ti-presto-genoa.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### Decommentare le linee:
```javascript
// Rimuovi i commenti da queste linee:
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
```

## Step 3: Security Rules

### Firestore Rules (da impostare in Console):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users possono leggere/scrivere solo i propri dati
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Abbonamenti leggibili da tutti, scrivibili solo dal proprietario
    match /abbonamenti/{abbonamentoId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == resource.data.userId;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Chat accessibili solo ai partecipanti
    match /chat/{chatId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.partecipanti;
    }
  }
}
```

## Step 4: Migrazione Dati

### Funzioni Helper per Migrare da localStorage:
```javascript
// Migra utenti esistenti
async function migrateUsers() {
  const localUsers = JSON.parse(localStorage.getItem('users')) || [];
  for (const user of localUsers) {
    try {
      await FirebaseService.createUser(user);
      console.log(`Utente ${user.username} migrato`);
    } catch (error) {
      console.log(`Errore migrazione ${user.username}:`, error);
    }
  }
}

// Migra abbonamenti esistenti
async function migrateAbbonamenti() {
  const localAbbonamenti = JSON.parse(localStorage.getItem('abbonamenti')) || [];
  for (const abbonamento of localAbbonamenti) {
    try {
      await FirebaseService.createAbbonamento(abbonamento);
      console.log(`Abbonamento ${abbonamento.id} migrato`);
    } catch (error) {
      console.log(`Errore migrazione abbonamento:`, error);
    }
  }
}
```

## Step 5: Deploy

### Con Firebase Hosting:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Con Netlify (attuale):
1. Fai push su GitHub
2. Netlify rebuilds automaticamente
3. Il tuo dominio custom continua a funzionare

## 🎯 Vantaggi della Migrazione

✅ **Dati persistenti** (non si perdono)
✅ **Multi-device** sync automatico  
✅ **Real-time chat** automatica
✅ **Backup automatico** dei dati
✅ **Scalabilità** automatica
✅ **Security rules** avanzate

## 🔧 Testing

1. Apri console browser (F12)
2. Testa: `firebase.auth().currentUser`
3. Testa: `db.collection('users').get()`
4. Verifica: Authentication tab in Firebase Console

## 📱 Future Features
Con Firebase puoi facilmente aggiungere:
- Push notifications
- Immagini upload (Storage)
- Cloud Functions per logica server
- Analytics utenti
- Remote Config
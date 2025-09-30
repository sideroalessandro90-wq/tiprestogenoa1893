# 🚀 Deploy Firebase + Netlify per "Ti Presto"

## Setup Completo Firebase + Netlify

### 🔥 **Step 1: Configurazione Firebase**

1. **Crea progetto Firebase** (se non fatto):
   - Vai su [Firebase Console](https://console.firebase.google.com)
   - Crea progetto: `ti-presto-genoa` 
   - Abilita Firestore Database (modalità test)
   - Abilita Authentication (Email/Password)

2. **Ottieni credenziali Web**:
   - Dashboard progetto → Aggiungi app Web
   - Copia il `firebaseConfig` 
   - Incollalo in `script.js` sostituendo i placeholder

3. **Decommenta codice Firebase**:
   ```javascript
   // Rimuovi commenti da queste linee in script.js:
   firebase.initializeApp(firebaseConfig);
   const db = firebase.firestore();
   const auth = firebase.auth();
   ```

### 🌐 **Step 2: Deploy su Netlify**

#### **Opzione A: Da Git Repository (Consigliata)**
1. **Push codice su GitHub**:
   ```bash
   git add .
   git commit -m "Setup Firebase + Netlify"  
   git push origin main
   ```

2. **Collega a Netlify**:
   - Dashboard Netlify → "New site from Git"
   - Autorizza GitHub e seleziona repository
   - Build settings: lascia vuoto (è già tutto pronto)
   - Deploy automatico!

#### **Opzione B: Deploy Manuale**
1. **Zip del progetto** (escludi node_modules se presente)
2. **Drag & drop** su Netlify Dashboard
3. Deploy immediato

### 🔐 **Step 3: Configurazione Dominio**

1. **Netlify Dashboard** → Site settings → Domain management
2. **Add custom domain** → Inserisci il tuo dominio
3. **DNS Configuration**:
   - Punta CNAME/A record al dominio Netlify
   - SSL automatico (Let's Encrypt)

### ⚙️ **Step 4: Environment Variables (Se necessario)**

Se vuoi nascondere le credenziali Firebase:
1. **Netlify Dashboard** → Site settings → Environment variables
2. Aggiungi:
   ```
   FIREBASE_API_KEY = "la-tua-api-key"
   FIREBASE_PROJECT_ID = "il-tuo-project-id"  
   FIREBASE_AUTH_DOMAIN = "progetto.firebaseapp.com"
   ```

3. **Aggiorna script.js**:
   ```javascript
   const firebaseConfig = {
     apiKey: window.ENV?.FIREBASE_API_KEY || "fallback-key",
     // ... resto config
   };
   ```

### 🔒 **Step 5: Security Rules Firestore**

Firebase Console → Firestore → Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users - solo i propri dati
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Abbonamenti - lettura pubblica, scrittura proprietario
    match /abbonamenti/{abbonamentoId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Chat - solo partecipanti
    match /chat/{chatId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.partecipanti;
    }
  }
}
```

### 📊 **Step 6: Monitoraggio**

**Netlify Analytics**:
- Dashboard → Analytics → Attiva per statistiche visite

**Firebase Analytics**:
- Console Firebase → Analytics → Metriche utenti real-time

### 🔄 **Workflow Deploy Automatico**

```
Codice locale → GitHub push → Netlify rebuild automatico → Live!
```

**Ogni push su GitHub**:
✅ Netlify rebuilds automaticamente  
✅ Deploy su dominio custom  
✅ SSL rinnovato automaticamente  
✅ CDN aggiornato globalmente  

### 🎯 **Testing Finale**

1. **Apri sito** sul tuo dominio
2. **Test registro** nuovo utente
3. **Test login** utente esistente  
4. **Test creazione** abbonamento
5. **Test chat** real-time
6. **Verifica** Firebase Console → Authentication/Firestore

### 💡 **Pro Tips**

✅ **Branch Protection**: Deploy solo da branch `main`  
✅ **Preview Builds**: Netlify crea preview per pull request  
✅ **Rollback**: Un click per tornare a versione precedente  
✅ **Custom Headers**: Già configurati in `netlify.toml`  
✅ **Performance**: CDN globale + Firebase hosting ottimizzato  

### 🚨 **Checklist Pre-Deploy**

- [ ] Firebase project creato e configurato
- [ ] Credenziali Firebase inserite in script.js  
- [ ] Codice Firebase decommentato
- [ ] Repository GitHub aggiornato
- [ ] Netlify collegato a GitHub
- [ ] Dominio custom configurato
- [ ] Security rules Firestore impostate
- [ ] Test locale completato

## 🎉 **Risultato Finale**

🌐 **Il tuo dominio custom** → Netlify CDN → Firebase Backend  
⚡ **Performance**: Ultra veloce globalmente  
🔒 **Sicurezza**: SSL + Firebase Security Rules  
📊 **Analytics**: Netlify + Firebase Analytics  
🔄 **Deploy**: Automatico da Git push  
💰 **Costo**: Gratis fino a traffico significativo  

**Hai domande su qualche step?** 🤔
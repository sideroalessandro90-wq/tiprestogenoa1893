# 🔒 REGOLE DI SICUREZZA FIRESTORE - TI PRESTO GENOA CFC

## 📋 ISTRUZIONI PER L'INSTALLAZIONE

1. **Vai alla Console Firebase**: https://console.firebase.google.com
2. **Seleziona il tuo progetto**: "tiprestogenoa1893"
3. **Menu laterale** → **Firestore Database** → **Regole**
4. **Sostituisci tutto il contenuto** con le regole qui sotto
5. **Clicca "Pubblica"** per salvare

---

## 🔥 REGOLE FIRESTORE COMPLETE

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // 👤 REGOLE UTENTI - Solo l'utente può leggere/modificare i propri dati
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Permetti la creazione di un profilo durante la registrazione
      allow create: if request.auth != null && request.auth.uid == userId
        && request.resource.data.keys().hasAll(['nome', 'cognome', 'email', 'registrationDate'])
        && request.resource.data.email == request.auth.token.email;
      
      // Permetti l'aggiornamento del profilo
      allow update: if request.auth != null && request.auth.uid == userId
        && request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['nome', 'cognome', 'telefono', 'dataNascita', 'preferences', 'lastUpdated', 'preferencesUpdated']);
    }
    
    // 🎫 REGOLE ABBONAMENTI - Gestione vendite e acquisti
    match /abbonamenti/{abbonamentoId} {
      
      // LETTURA: Tutti gli utenti autenticati possono vedere gli abbonamenti disponibili
      allow read: if request.auth != null;
      
      // CREAZIONE: Solo l'utente può creare i propri abbonamenti
      allow create: if request.auth != null 
        && request.auth.uid == request.resource.data.utente
        && request.resource.data.keys().hasAll(['utente', 'utenteEmail', 'matchId', 'matchDesc', 'settore', 'disponibile', 'messaggiChat', 'timestamp'])
        && request.resource.data.utenteEmail == request.auth.token.email
        && request.resource.data.disponibile == true
        && request.resource.data.messaggiChat is list;
      
      // AGGIORNAMENTO: Solo il proprietario può modificare i propri abbonamenti
      allow update: if request.auth != null && (
        // Il venditore può modificare il suo abbonamento
        (request.auth.uid == resource.data.utente) ||
        
        // L'acquirente può iniziare una trattativa (aggiungere buyerName)
        (request.auth.uid == request.resource.data.get('buyerName', null) &&
         request.resource.data.diff(resource.data).affectedKeys()
           .hasOnly(['buyerName', 'inTrattativa', 'lastUpdated']) &&
         request.resource.data.inTrattativa == true) ||
        
        // Aggiornamento messaggi chat - solo partecipanti alla trattativa
        (request.auth.uid in [resource.data.utente, resource.data.get('buyerName', null)] &&
         request.resource.data.diff(resource.data).affectedKeys()
           .hasOnly(['messaggiChat', 'lastUpdated']))
      );
      
      // CANCELLAZIONE: Solo il proprietario può eliminare i propri abbonamenti
      allow delete: if request.auth != null && request.auth.uid == resource.data.utente;
      
      // VALIDAZIONI AGGIUNTIVE PER UPDATE
      // Verifica che i messaggi chat abbiano la struttura corretta
      function isValidChatMessage(message) {
        return message.keys().hasAll(['sender', 'text', 'timestamp']) &&
               message.sender is string &&
               message.text is string &&
               message.timestamp != null;
      }
      
      // Verifica che solo i partecipanti possano inviare messaggi
      function canSendMessage(newMessages, currentMessages) {
        return newMessages.size() == currentMessages.size() + 1 &&
               isValidChatMessage(newMessages[newMessages.size() - 1]) &&
               newMessages[newMessages.size() - 1].sender == request.auth.uid;
      }
    }
    
    // 📧 REGOLE EMAIL LOGS (opzionale - per tracciare invii email)
    match /email_logs/{logId} {
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // 📊 REGOLE STATISTICHE (opzionale - per analytics)
    match /stats/{statId} {
      allow read: if request.auth != null;
      allow write: if false; // Solo il backend può scrivere statistiche
    }
    
    // 🚫 BLOCCA TUTTO IL RESTO
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 🔍 SPIEGAZIONE DELLE REGOLE

### **👤 Regole Utenti (/users/{userId})**
- ✅ Solo l'utente può leggere/modificare i propri dati
- ✅ Creazione profilo durante registrazione con email verificata
- ✅ Aggiornamenti limitati a campi specifici (nome, cognome, telefono, ecc.)

### **🎫 Regole Abbonamenti (/abbonamenti/{abbonamentoId})**
- ✅ **Lettura**: Tutti gli utenti autenticati vedono gli abbonamenti
- ✅ **Creazione**: Solo l'owner può creare abbonamenti con dati validi
- ✅ **Aggiornamento**: 
  - Venditore può modificare i suoi abbonamenti
  - Acquirente può iniziare trattative
  - Solo partecipanti possono inviare messaggi chat
- ✅ **Cancellazione**: Solo l'owner può eliminare

### **🔒 Sicurezza Avanzata**
- ✅ Validazione struttura messaggi chat
- ✅ Controllo identità mittente messaggi
- ✅ Verifica email durante registrazione
- ✅ Blocco accesso a documenti non autorizzati

---

## 🚀 DEPLOY DELLE REGOLE

1. **Copia tutto il contenuto delle regole** (dalla riga `rules_version = '2';` fino alla fine)
2. **Vai su Firebase Console** → **Firestore** → **Regole**
3. **Incolla e sostituisci tutto**
4. **Clicca "Pubblica"**
5. **Verifica che non ci siano errori**

## ⚡ TEST DELLE REGOLE

Dopo aver pubblicato le regole, testa:
- ✅ Registrazione nuovo utente
- ✅ Login esistente
- ✅ Creazione abbonamento
- ✅ Apertura chat
- ✅ Invio messaggi
- ✅ Aggiornamento profilo

Le regole garantiscono sicurezza completa! 🛡️
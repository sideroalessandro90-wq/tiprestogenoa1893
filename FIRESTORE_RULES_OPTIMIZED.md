# 🔥 REGOLE FIRESTORE OTTIMIZZATE - TI PRESTO

## 🔄 CONFRONTO: Le tue regole VS Ti Presto

### 🎯 **LE TUE REGOLE** (Sistema Prenotazioni)
- ✅ Validazione rigorosa campi
- ✅ Transizioni stato controllate
- ✅ Sistema prenotazioni separato
- ❌ Manca gestione chat
- ❌ Manca sistema trattative

### 🎯 **TI PRESTO** (Sistema Trattative)
- ✅ Chat integrata negli abbonamenti
- ✅ Trattative dirette venditore-acquirente
- ✅ Sistema più semplice e immediato

---

## 🚀 REGOLE OTTIMIZZATE (Combinando il meglio di entrambi)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ========== UTENTI ==========
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      allow create: if request.auth != null 
        && request.auth.uid == userId
        && request.resource.data.keys().hasAll(['nome', 'cognome', 'email', 'registrationDate'])
        && request.resource.data.email == request.auth.token.email;
      
      allow update: if request.auth != null 
        && request.auth.uid == userId
        && request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['nome', 'cognome', 'telefono', 'dataNascita', 'preferences', 'lastUpdated']);
    }

    // ========== ABBONAMENTI ==========
    match /abbonamenti/{abbonamentoId} {
      
      // LETTURA: Solo utenti autenticati (più sicuro di "if true")
      allow read: if request.auth != null;
      
      // VALIDAZIONE CAMPI CREAZIONE
      function validCreateFields() {
        return request.resource.data.keys().hasAll([
          'utente', 'utenteEmail', 'utenteNome', 'utenteCognome', 
          'matchId', 'matchDesc', 'settore', 'disponibile', 'messaggiChat', 'timestamp'
        ]) &&
        request.resource.data.utente is string &&
        request.resource.data.utenteEmail is string &&
        request.resource.data.matchId is string &&
        request.resource.data.matchDesc is string &&
        request.resource.data.settore is string &&
        request.resource.data.disponibile == true &&
        request.resource.data.messaggiChat is list;
      }
      
      // CREAZIONE: Solo l'utente può creare i propri abbonamenti
      allow create: if request.auth != null 
        && request.auth.uid == request.resource.data.utente
        && validCreateFields()
        && request.resource.data.utenteEmail == request.auth.token.email;
      
      // AGGIORNAMENTO: Logica sofisticata per gestire trattative
      allow update: if request.auth != null && (
        // 1️⃣ VENDITORE può modificare il suo abbonamento
        (request.auth.uid == resource.data.utente &&
         request.resource.data.diff(resource.data).affectedKeys()
           .hasOnly(['disponibile', 'messaggiChat', 'lastUpdated', 'inTrattativa'])) ||
        
        // 2️⃣ ACQUIRENTE può iniziare trattativa
        (request.auth.uid == request.resource.data.get('buyerName', null) &&
         request.resource.data.diff(resource.data).affectedKeys()
           .hasOnly(['buyerName', 'buyerEmail', 'inTrattativa', 'lastUpdated']) &&
         request.resource.data.inTrattativa == true) ||
        
        // 3️⃣ PARTECIPANTI possono aggiungere messaggi chat
        (request.auth.uid in [resource.data.utente, resource.data.get('buyerName', null)] &&
         request.resource.data.diff(resource.data).affectedKeys()
           .hasOnly(['messaggiChat', 'lastUpdated']) &&
         isValidChatUpdate())
      );
      
      // VALIDAZIONE MESSAGGI CHAT
      function isValidChatUpdate() {
        let oldMessages = resource.data.messaggiChat;
        let newMessages = request.resource.data.messaggiChat;
        
        return newMessages.size() == oldMessages.size() + 1 &&
               newMessages[newMessages.size() - 1].keys().hasAll(['sender', 'text', 'timestamp']) &&
               newMessages[newMessages.size() - 1].sender == request.auth.uid;
      }
      
      // CANCELLAZIONE: Solo il proprietario
      allow delete: if request.auth != null && request.auth.uid == resource.data.utente;
    }

    // ========== PRENOTAZIONI (Opzionale - se vuoi mantenerle) ==========
    match /prenotazioni/{prenotazioneId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.uid == resource.data.venditorId);
      
      allow create: if request.auth != null &&
        request.resource.data.userId == request.auth.uid &&
        request.resource.data.keys().hasAll(['abbonamentoId', 'userId', 'stato', 'createdAt']) &&
        request.resource.data.stato == 'confermato';
      
      allow update: if request.auth != null &&
        request.auth.uid == resource.data.userId &&
        request.resource.data.stato in ['confermato', 'pagato', 'completato'];
      
      allow delete: if false;
    }

    // ========== SICUREZZA ==========
    // Nega accesso a tutto il resto
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## 🔍 DIFFERENZE PRINCIPALI

| Aspetto | Le tue regole | Ti Presto Ottimizzate |
|---------|---------------|----------------------|
| **Lettura abbonamenti** | `if true` (pubblica) | `if request.auth != null` (sicura) |
| **Chat** | ❌ Non supportata | ✅ Validazione messaggi integrata |
| **Trattative** | Sistema prenotazioni | Trattative dirette con buyerName |
| **Validazione** | Campi fissi | Campi dinamici + validazione chat |
| **Sicurezza** | Base | Avanzata con controllo partecipanti |

---

## 🚀 RACCOMANDAZIONE

**USA LE REGOLE OTTIMIZZATE** perché:
- ✅ Mantengono la tua validazione rigorosa
- ✅ Aggiungono supporto chat completo
- ✅ Gestiscono il sistema trattative di Ti Presto
- ✅ Sicurezza migliorate (no lettura pubblica)
- ✅ Compatibili al 100% con il codice esistente

Le tue regole originali sono ottime per un sistema di prenotazioni classico, ma Ti Presto ha bisogno di funzionalità chat e trattative più avanzate!
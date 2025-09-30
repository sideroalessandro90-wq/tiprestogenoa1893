# 🔧 Firebase Debug Steps

## 1. Controlla Firebase Rules

Vai su Firebase Console → Firestore Database → Rules

### Regole per SVILUPPO (temporanee):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // ⚠️ SOLO PER TEST!
    }
  }
}
```

## 2. Controlla Console Firebase

- Vai su: https://console.firebase.google.com/project/abbonamentigenoa1893
- Verifica che ci siano dati in Firestore Database
- Controlla i log errori in Functions/Analytics

## 3. Test Query Diretta

In console JavaScript:
```javascript
// Test connessione Firebase
db.collection('abbonamenti').get().then(snap => {
  console.log('📊 Documenti trovati:', snap.size);
  snap.forEach(doc => console.log(doc.id, doc.data()));
});
```

## 4. Rimuovi Query Complesse

Ho già rimosso tutti i `.where()` per evitare richieste di indici.
Ora Firebase carica TUTTO e filtra lato client.
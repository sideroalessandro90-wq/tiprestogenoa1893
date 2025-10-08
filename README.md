# 🚀 Ti Presto - Genoa CFC Subscription Exchange

> Piattaforma di scambio abbonamenti del Genoa CFC con sistema di trattative integrate

## 🎯 **Caratteristiche**

- ✅ **Firebase Authentication** - Login/registrazione sicura
- ✅ **Firestore Database** - Persistenza dati cloud
- ✅ **Chat Integrata** - Messaggi in tempo reale tra utenti
- ✅ **EmailJS** - Notifiche email automatiche  
- ✅ **Sistema Trattative** - Vendita/acquisto P2P
- ✅ **Mobile Responsive** - Ottimizzato per tutti i dispositivi

## 🔧 **Stack Tecnologico**

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Backend**: Firebase (Auth + Firestore)
- **Email**: EmailJS
- **Hosting**: Netlify
- **Font**: Google Fonts (Montserrat)

## 📦 **Struttura Progetto**

```
/
├── index.html          # Pagina principale SPA
├── script.js           # Logica applicazione 
├── style.css           # Stili personalizzati
├── toast.js            # Sistema notifiche
├── pw-simple.js        # Toggle password
├── netlify.toml        # Configurazione Netlify
├── 404.html            # Pagina errore
└── img/                # Loghi squadre Serie A
    ├── genoa.png
    ├── lazio.png
    └── [altre-squadre].png
```

## 🌐 **Deploy su Netlify**

### **Metodo 1: GitHub Integration (Consigliato)**

1. **Fork o clone** questo repository
2. **Collegalo a Netlify**:
   - Vai su [netlify.com](https://netlify.com)
   - "New site from Git"
   - Seleziona GitHub
   - Scegli questo repository
3. **Settings Deploy**:
   - Build command: (vuoto)
   - Publish directory: `/` (root)
4. **Deploy automatico** ad ogni push!

### **Metodo 2: Drag & Drop**

1. **Scarica tutti i file** di questo repository
2. **Trascina la cartella** su netlify.com/drop
3. **Deploy immediato** (ma senza aggiornamenti automatici)

## ⚙️ **Configurazione Firebase**

Prima del deploy, aggiorna `script.js` con le tue credenziali Firebase:

```javascript
const firebaseConfig = {
  apiKey: "TUA_API_KEY",
  authDomain: "TUO_PROJECT.firebaseapp.com",
  projectId: "TUO_PROJECT_ID",
  // ... altre configurazioni
};
```

## 📧 **Configurazione EmailJS**

Aggiorna le credenziali EmailJS in `script.js`:

```javascript
const emailConfig = {
  publicKey: 'TUA_PUBLIC_KEY',
  serviceId: 'TUO_SERVICE_ID',
  templateId: 'TUO_TEMPLATE_ID'
};
```

## 🔒 **Regole Firestore**

Copia le regole di sicurezza dal file `FIRESTORE_SECURITY_RULES.md` nella console Firebase.

## 🎨 **Personalizzazione**

- **Colori**: Modifica le variabili CSS in `style.css`
- **Loghi**: Sostituisci i file PNG in `/img/`
- **Partite**: Aggiorna l'array `upcomingMatches` in `script.js`

## 📱 **Browser Support**

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

## 📄 **Licenza**

Progetto open source per la community del Genoa CFC.

---

**Forza Genoa! ⚪🔴**
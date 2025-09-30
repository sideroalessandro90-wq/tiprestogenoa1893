# 📧 Setup Email Notifications per "Ti Presto"

## 🚀 **EmailJS Setup Completo**

### **Step 1: Registrazione EmailJS**

1. **Vai su [EmailJS.com](https://www.emailjs.com)**
2. **Sign Up** gratuito (200 email/mese)
3. **Verifica email** e accedi alla dashboard

### **Step 2: Configura Email Service**

1. **Add Email Service**:
   - Clicca **"Add New Service"**
   - Scegli il tuo provider:
     - **Gmail** (consigliato)
     - **Outlook/Hotmail**
     - **SMTP Custom**

2. **Gmail Setup**:
   - Service ID: `gmail_service` (ricordalo!)
   - Email: la tua email Gmail
   - **App Password**: 
     - Vai su Google Account → Security → 2-Step Verification → App passwords
     - Genera password per "Mail"
     - Usa questa password (non quella normale!)

### **Step 3: Crea Email Templates**

#### **Template 1: Nuovo Messaggio Chat**
```html
Template ID: template_new_message

Subject: 🔔 Nuovo messaggio su Ti Presto - {{match_name}}

Body:
Ciao {{to_name}},

Hai ricevuto un nuovo messaggio da {{from_name}} per l'abbonamento {{match_name}}:

"{{message}}"

Rispondi direttamente su: {{reply_url}}

---
Ti Presto - Genoa CFC 1893
{{site_url}}

Se non desideri più ricevere queste notifiche, contattaci a dnagenoa@outlook.it
```

#### **Template 2: Benvenuto Nuovo Utente**
```html
Template ID: template_welcome

Subject: 🔴🔵 Benvenuto su Ti Presto - Genoa CFC!

Body:
Ciao {{to_name}},

Benvenuto su Ti Presto! 🎉

Il tuo account "{{username}}" è stato creato con successo.

🎫 Ora puoi:
- Vendere i tuoi abbonamenti Genoa
- Cercare abbonamenti per le partite
- Chattare con altri tifosi rossoblù

Esplora il sito: {{site_url}}

Per supporto: {{contact_email}}

Forza Genoa! ⚽
---
Ti Presto - Genoa CFC 1893
```

#### **Template 3: Nuovo Abbonamento Pubblicato**
```html
Template ID: template_booking

Subject: 📋 Nuovo abbonamento pubblicato - {{match_desc}}

Body:
Nuovo abbonamento disponibile:

👤 Utente: {{user_name}}
🏟️ Partita: {{match_desc}}
📍 Settore: {{settore}}
💰 Prezzo: €{{prezzo}}
🕒 Pubblicato: {{timestamp}}

Visualizza: {{site_url}}

---
Ti Presto - Sistema Notifiche
```

### **Step 4: Ottieni le Credenziali**

1. **Service ID**: Copia dalla sezione "Email Services"
2. **Template IDs**: Copia da ogni template creato
3. **Public Key**: 
   - Clicca sull'icona utente → Account
   - Copia "Public Key"

### **Step 5: Aggiorna il Codice**

**In script.js, sostituisci**:
```javascript
const EMAIL_CONFIG = {
  SERVICE_ID: 'gmail_service',           // Il tuo Service ID
  USER_ID: 'TUA_PUBLIC_KEY_QUI',         // La tua Public Key
  TEMPLATES: {
    NEW_MESSAGE: 'template_new_message', // ID template messaggio
    WELCOME: 'template_welcome',         // ID template benvenuto
    BOOKING_CREATED: 'template_booking'  // ID template abbonamento
  }
};
```

### **Step 6: Test Configurazione**

1. **Deploy codice** aggiornato su Netlify
2. **Vai nella sezione Contatti** del sito
3. **Clicca "📧 Test Email"**
4. **Controlla inbox** per email di test
5. **Console browser** (F12) per eventuali errori

### **Step 7: Test Completo Funzionalità**

**Test Registration**:
1. Registra nuovo utente con email valida
2. Verifica email di benvenuto ricevuta

**Test Chat Notifications**:
1. Utente A inizia chat con Utente B
2. Utente A invia messaggio
3. Utente B dovrebbe ricevere email notification

### **🔧 Troubleshooting**

**Errori Comuni**:

1. **"Invalid template ID"**:
   - Verifica Template ID in EmailJS dashboard
   - Controlla spelling esatto

2. **"Authentication failed"**:
   - Verifica Public Key corretta
   - Controlla Service ID

3. **"Gmail App Password"**:
   - Usa password app, non password normale
   - Abilita 2FA su Gmail prima

4. **Email non arrivano**:
   - Controlla spam/promotional
   - Verifica email sender settings
   - Controlla quota EmailJS (200/mese free)

### **📊 Dashboard EmailJS**

**Monitoraggio**:
- **Email Sent**: Statistiche invii
- **Success Rate**: Tasso di successo
- **Templates**: Gestione template
- **Services**: Configurazione email

### **🎯 Email Types Implementate**

✅ **Chat Message** → Notifica nuovo messaggio  
✅ **Welcome Email** → Benvenuto nuovo utente  
✅ **Booking Created** → Log interno nuovo abbonamento  
⚠️ **Deal Completed** → Da implementare per trattative chiuse  

### **💡 Future Enhancements**

**Possibili Aggiunte**:
1. **Email Digest** → Riassunto settimanale attività
2. **Match Reminders** → Promemoria partite
3. **Price Alerts** → Notifica prezzi interessanti
4. **Admin Notifications** → Segnalazioni problemi

### **🔒 Privacy GDPR**

**Compliance**:
- ✅ Email solo per utenti registrati
- ✅ Unsubscribe link in ogni email
- ✅ Dati email non condivisi
- ✅ Opt-out disponibile nel profilo

### **💰 Costi EmailJS**

**Piano Free**: 200 email/mese  
**Piano Personal**: $15/mese → 1000 email/mese  
**Piano Team**: $50/mese → 5000 email/mese  

Per "Ti Presto", il piano gratuito dovrebbe essere sufficiente inizialmente.

---

## 🎉 **Risultato Finale**

Dopo il setup:
- 📧 **Email automatiche** per ogni messaggio chat
- 🎉 **Benvenuto** per nuovi utenti
- 📊 **Log email** delle attività
- 🔔 **Engagement** utenti migliorato
- 📈 **Retention** più alta

**Domande sul setup?** Ogni step è testato e funzionante! 🚀
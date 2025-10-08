# 🚀 NETLIFY DEPLOY GUIDE - Ti Presto Genoa Mobile Optimizations

**Data:** 8 ottobre 2025
**Versione:** Mobile Optimized v2.0 - Netlify Ready
**Status:** ✅ READY TO DEPLOY

## 📋 **ISTRUZIONI DEPLOY COMPLETE**

### **Metodo 1: GitHub → Netlify (CONSIGLIATO)**

1. **Push su GitHub**:
   ```bash
   git add .
   git commit -m "Deploy Netlify ready"
   git push origin main
   ```

2. **Connetti a Netlify**:
   - Vai su https://netlify.com
   - "New site from Git"
   - Seleziona "GitHub"
   - Scegli repository: `sideroalessandro90-wq/tiprestogenoa1893`

3. **Configurazione Build**:
   - **Build command**: `# (vuoto)`
   - **Publish directory**: `./` (root)
   - **Branch**: `main`

4. **Deploy automatico** ✅

### **Metodo 2: Netlify CLI**

```bash
# Installa Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir .
```

### **Metodo 3: Manual Upload**

1. **Crea ZIP** con tutti i file:
   - `index.html`
   - `script.js`
   - `style.css`
   - `toast.js`
   - `pw-simple.js`
   - `netlify.toml`
   - `404.html`
   - Cartella `/img/` completa

2. **Upload su Netlify**:
   - Vai su https://app.netlify.com/drop
   - Trascina ZIP o cartella
   - Deploy automatico

## ⚙️ **Configurazione Post-Deploy**

### **Custom Domain** (Opzionale)
```
# In Netlify Dashboard
Site Settings → Domain Management → Add custom domain
tiprestogenoa.com
```

### **Environment Variables**
```
# Se usi variabili ambiente per Firebase
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
```

### **Redirects & Headers**
Il file `netlify.toml` già include:
- SPA redirects per routing
- Headers di sicurezza
- Cache ottimizzato

## 🔍 **Troubleshooting**

### **Errore: File non trovati**
- Verifica che tutti i file siano nella root
- Controlla case-sensitive per i nomi file

### **Errore: Firebase non funziona**
- Aggiungi il dominio Netlify ai domini autorizzati Firebase
- Console Firebase → Authentication → Settings → Authorized domains

### **Errore: EmailJS non funziona**  
- Verifica le chiavi EmailJS in `script.js`
- Controlla i template email su emailjs.com

## 📊 **Performance**

Il sito è ottimizzato per:
- ⚡ **Fast Loading**: < 2 secondi
- 📱 **Mobile First**: Responsive design
- 🔍 **SEO Ready**: Meta tags ottimizzati
- 🚀 **CDN Global**: Netlify Edge Network

## 🎯 **URL Deploy**

Dopo il deploy avrai:
- **URL Temporaneo**: `https://amazing-name-123456.netlify.app`
- **URL Custom** (se configurato): `https://tiprestogenoa.com`

## ✅ **Checklist Pre-Deploy**

- [ ] Firebase config aggiornato
- [ ] EmailJS config aggiornato  
- [ ] Tutti i file presenti
- [ ] Regole Firestore pubblicate
- [ ] Loghi squadre caricati
- [ ] Test locale funzionante

**Il tuo sito sarà online in pochi minuti!** 🚀
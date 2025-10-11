# 🚀 DEPLOY AUTOMATICO VERCEL - Ti Presto

## ✅ REPOSITORY PRONTO
- **GitHub**: `sideroalessandro90-wq/tiprestogenoa1893`
- **Branch**: `main` 
- **Dominio Target**: `www.tiprestogenoa1893.it`

## 📋 STEPS DEPLOY AUTOMATICO

### 1. **Import Repository**
- Vai su: https://vercel.com/new
- Clicca: "Import Git Repository"
- Seleziona: `tiprestogenoa1893`
- Clicca: "Import"

### 2. **Configurazione Progetto**
```
Project Name: tiprestogenoa1893
Framework Preset: Other
Root Directory: ./
Build Command: [leave empty]
Output Directory: [leave empty] 
Install Command: [leave empty]
```

### 3. **Deploy Settings**
- **Environment Variables**: None needed initially
- **Build & Development Settings**: Default
- Clicca: **"Deploy"**

### 4. **Custom Domain Setup**
Dopo il deploy:
1. Vai su Project Settings → Domains
2. Aggiungi: `www.tiprestogenoa1893.it`
3. Aggiungi: `tiprestogenoa1893.it`
4. Configura DNS records come indicato da Vercel

## 🎯 DNS CONFIGURATION

Per `tiprestogenoa1893.it`:
```
Type: A
Name: @
Value: 76.76.19.19
```

Per `www.tiprestogenoa1893.it`:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## ⚡ AUTO-DEPLOY ATTIVO

Una volta collegato:
- ✅ Ogni push su `main` → deploy automatico
- ✅ Anteprima per ogni commit
- ✅ Rollback automatico se errori
- ✅ HTTPS automatico
- ✅ CDN globale attivo

## 🌐 URL FINALI

- **Produzione**: `https://www.tiprestogenoa1893.it`
- **Backup**: `https://tiprestogenoa1893.vercel.app`
- **Dashboard**: `https://vercel.com/dashboard`

## 📱 POST-DEPLOY CHECKLIST

- [ ] Sito carica su mobile
- [ ] PWA installabile
- [ ] Firebase funzionante
- [ ] Chat operativa
- [ ] Admin panel OK
- [ ] Performance Lighthouse > 90

**Deploy automatico configurato! 🚀**
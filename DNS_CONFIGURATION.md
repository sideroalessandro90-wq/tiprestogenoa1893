# 🔧 CONFIGURAZIONE DNS - tiprestogenoa1893.it

## 🎯 DOMINI DA CONFIGURARE
- **Principale**: tiprestogenoa1893.it
- **WWW**: www.tiprestogenoa1893.it

## 📋 RECORD DNS NECESSARI

### **Record per tiprestogenoa1893.it**
```
Type: A
Name: @ (o root/blank)
Value: 76.76.19.19
TTL: 3600
Priority: N/A
```

### **Record per www.tiprestogenoa1893.it**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
Priority: N/A
```

## ⚙️ CONFIGURAZIONE NEL PROVIDER DNS

### **Se usi Cloudflare:**
1. Accedi al dashboard Cloudflare
2. Seleziona il dominio tiprestogenoa1893.it
3. Vai su DNS → Records
4. Aggiungi i record come sopra
5. Assicurati che il proxy sia DISATTIVATO (nuvola grigia)

### **Se usi altri provider (GoDaddy, Namecheap, etc.):**
1. Accedi al pannello di controllo
2. Trova la sezione "DNS Management" o "DNS Records"
3. Aggiungi i record come specificato sopra
4. Salva le modifiche

## 🕒 TIMELINE ATTIVAZIONE

- **0-5 min**: Configurazione record DNS
- **5-30 min**: Propagazione DNS globale
- **30-60 min**: Verifica Vercel e attivazione HTTPS
- **60+ min**: Domini completamente operativi

## ✅ VERIFICA CONFIGURAZIONE

### **Comandi di test (PowerShell/CMD):**
```bash
# Test dominio principale
nslookup tiprestogenoa1893.it

# Test sottodominio www
nslookup www.tiprestogenoa1893.it

# Test online
# Vai su: https://www.whatsmydns.net/
```

### **Checker online:**
- https://www.whatsmydns.net/#A/tiprestogenoa1893.it
- https://www.whatsmydns.net/#CNAME/www.tiprestogenoa1893.it

## 🎯 RISULTATO ATTESO

Dopo la propagazione:
- ✅ `tiprestogenoa1893.it` → 76.76.19.19
- ✅ `www.tiprestogenoa1893.it` → cname.vercel-dns.com
- ✅ Entrambi i domini caricheranno il sito Ti Presto
- ✅ HTTPS automatico attivo
- ✅ Redirect automatico configurabile

## 🚨 TROUBLESHOOTING

### **Se i domini non funzionano:**
1. Verifica che i record DNS siano corretti
2. Attendi fino a 24h per propagazione completa
3. Controlla lo status nella dashboard Vercel
4. Disabilita proxy Cloudflare se attivo
5. Contatta il supporto del provider DNS

### **Se HTTPS non si attiva:**
1. Attendi 30-60 minuti dopo verifica DNS
2. Vercel genererà automaticamente il certificato SSL
3. Il processo può richiedere fino a 24h

## 🎉 CONFIGURAZIONE COMPLETATA

Una volta attivi entrambi i domini:
- 🌐 **tiprestogenoa1893.it** e **www.tiprestogenoa1893.it** funzionanti
- 🔒 **HTTPS automatico** per entrambi
- ⚡ **CDN globale** attivo
- 📱 **Mobile perfect** su entrambi gli URL
- 🔄 **Deploy automatico** configurato

**I domini principali saranno operativi! 🚀✨**
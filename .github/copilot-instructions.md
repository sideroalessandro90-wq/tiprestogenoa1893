# Istruzioni GitHub Copilot - Ti Presto (Scambio Abbonamenti Genoa CFC)

## Panoramica del Progetto
Questa è una **single-page application in JavaScript vanilla** per una piattaforma di scambio abbonamenti del Genoa CFC chiamata "Ti Presto". È un'applicazione completamente client-side che utilizza localStorage per la persistenza dei dati e il client Supabase per future integrazioni backend.

## Architettura e Pattern Chiave

### Struttura Single-Page Application
- **Navigazione basata su sezioni**: Tutte le sezioni di contenuto sono in `index.html` con classe `.section`, mostrate/nascoste tramite `showSection(id)`
- **Interazioni basate su modal**: Autenticazione, chat e inserimento dati utilizzano modal overlay (classe `.modal`)
- **Gestione dello stato**: Tutto lo stato dell'applicazione è memorizzato in `localStorage` con variabili globali in `script.js`

### Componenti Principali
- **Sistema di autenticazione**: Login/registrazione con gestione utenti basata su localStorage
- **Marketplace abbonamenti**: Gli utenti possono inserire/sfogliare abbonamenti per partite di Serie A
- **Simulazione chat in tempo reale**: Sistema di negoziazione basato su modal tra acquirenti/venditori
- **Countdown partite**: Display countdown live per le prossime partite casalinghe del Genoa

### Pattern delle Strutture Dati
```javascript
// Utenti memorizzati come: { username, password, nome, cognome, dataNascita, email, telefono, emailVerificata }
// Abbonamenti come: { id, utente, matchId, matchDesc, settore, disponibile, timestamp, messaggiChat }
// Prezzi in: oggetto prezziSettore con nomi settori come chiavi
```

## Sistema Loghi Squadre
**Pattern critico**: I loghi delle squadre utilizzano la funzione `slugify()` per convertire i nomi squadre in nomi file normalizzati e minuscoli:
- "Genoa - Lazio" → utilizza `img/genoa.png` e `img/lazio.png`
- Tutti i loghi nella directory `img/` seguono questo pattern slug
- Utilizzare la funzione helper `getLogoSrcByTeamName(teamName)`

## Convenzioni di Stile

### Colori Brand (Tema Genoa CFC)
- Navy: `#002147` (header, elementi primari)  
- Rosso: `#c8102e` (navigazione, elementi accent)
- Sfondo: `#f2f2f2` (area contenuto principale)

### Classi Componenti
- `.section` per aree contenuto principale con stato `.active`
- `.modal` per finestre di dialogo overlay con toggle display flex
- Sistema `.toast` con stile basato su tipo (success, error, info)
- Classi `.brand-*` per elementi logo e titolo

## Architettura JavaScript

### Pattern Modulo
- `toast.js`: IIFE auto-contenuto per notifiche
- `pw-simple.js`: IIFE auto-contenuto per toggle visibilità password  
- `script.js`: Logica applicazione principale con funzioni globali

### Funzioni Chiave da Estendere
- `showSection(id)`: Aggiungere nuove sezioni estendendo la catena if/else
- `updateUIAfterLogin()`: Modificare per aggiungere nuove funzionalità autenticate
- `populateMatchSelect()`: Estendere array `upcomingMatches` per nuovi incontri

## Flusso di Sviluppo

### Sviluppo Locale
- Nessun processo di build richiesto - aprire `index.html` direttamente nel browser
- Tutte le dipendenze caricate tramite CDN (Supabase, Google Fonts)
- Hot reload tramite refresh browser

### Aggiungere Nuove Funzionalità
1. **Nuove sezioni**: Aggiungere HTML in `index.html`, estendere `showSection()` in `script.js`
2. **Nuovi modal**: Seguire pattern modal esistente con ID univoci
3. **Nuovi loghi squadre**: Aggiungere file PNG in `img/` usando nomi squadre slugificati

## Dipendenze Esterne
- **Supabase**: Client configurato ma credenziali necessitano aggiornamento (`TUO_URL`, `TUO_ANON_KEY`)
- **Google Fonts**: Famiglia font Montserrat
- **Asset locali**: I loghi squadre devono essere aggiunti manualmente alla directory `img/`

## Organizzazione File
```
/
├── index.html          # Shell SPA principale
├── script.js           # Logica applicazione principale  
├── style.css           # Stile completo (nessun framework CSS)
├── toast.js            # Sistema notifiche
├── pw-simple.js        # Toggle visibilità password
├── 404.html            # Pagina errore statica
└── img/                # Loghi squadre (nomi slugificati)
    ├── genoa.png
    ├── lazio.png
    └── [altre-squadre].png
```

## Convenzioni Importanti
- **Lingua italiana**: Tutti i testi UI, commenti e contenuti rivolti all'utente in italiano
- **Formattazione date**: Utilizzare helper `formatDate()` per locale italiano consistente
- **Validazione**: Validazione età richiede 16+ anni per registrazione
- **Persistenza stato**: Aggiornare sempre localStorage dopo modifiche agli array globali (`users`, `abbonamenti`)
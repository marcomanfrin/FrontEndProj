# 🏔️ BivaccoApp

**BivaccoApp** è una web app realizzata con **React** e **JSON Server** che permette agli utenti di esplorare e salvare bivacchi alpini, in particolare nelle Dolomiti (es. Tre Cime di Lavaredo). Include funzionalità di registrazione/login, salvataggio dei bivacchi visitati, commenti, meteo in tempo reale e molto altro.

l'applicazione è live al link [https://bivaccoapp.it](https://bivaccoapp.it), potrebbe volerci fino a un minuto per la fetch dopo periodi di inattività

## 🚀 Funzionalità principali

- ✅ Registrazione e login utente
- 🗺️ Esplorazione dei bivacchi disponibili
- 💾 Salvataggio dei bivacchi visitati
- 📝 Aggiunta e visualizzazione dei commenti
- ☁️ Visualizzazione del meteo tramite **OpenWeatherMap API**
- 🔒 Gestione autenticazione utente
- 📁 Backend simulato con **JSON Server**
- 🎨 UI responsive con **Bootstrap**

## 🧑‍💻 Tecnologie utilizzate

- **Frontend**: React (JSX, Hooks, Router)
- **Stile**: Bootstrap 5, CSS custom
- **Backend**: JSON Server (`db.json`)
- **API**: OpenWeatherMap (meteo in tempo reale)
- **Deployment**: Netlify (frontend) e Render (backend)

## 🛠️ Installazione e utilizzo

### 1. Clona il repository
```bash
git clone https://github.com/tuo-utente/bivaccoapp.git
cd bivaccoapp
```

### 2. Installa le dipendenze
```bash
npm install
```

### 3. Avvia il backend JSON Server
Assicurati che `json-server` sia installato:
```bash
cd server
npm install 
```

Avvia il backend sulla porta 3001:
```bash
npm run dev
```

### 4. Avvia il frontend React
In un altro terminale:
```bash
npm run dev
```

La web app sarà accessibile su [http://localhost:5173](http://localhost:5173)

## ⚙️ Struttura del progetto

```
bivaccoapp/
├── public/
├── src/
│   ├── components/      // Componenti riutilizzabili
│   ├── pages/           // Pagine principali (Home, Login, Dettagli, ecc.)
│   ├── services/        // Funzioni per chiamate API
│   ├── assets/          // Immagini e risorse statiche
│   └── App.js           // Router e layout
├── db.json              // Backend simulato con JSON Server
├── package.json
└── README.md
```

## 🔐 Autenticazione

L'autenticazione è gestita lato frontend con sessione simulata. I dati degli utenti sono memorizzati nel `db.json`. In un ambiente reale, si integrerebbe con un sistema di autenticazione sicuro (OAuth, JWT, ecc.).

## 🌦️ Meteo

L'app recupera i dati meteo tramite le API di **OpenWeatherMap** usando le coordinate del bivacco selezionato.

## 🧪 Idee per evoluzioni future

- Integrazione con Mapbox o Leaflet per mappa interattiva
- Upload di foto per ogni bivacco
- Sistema di valutazione (stelline o recensioni)
- Backend reale con database (es. Firebase, MongoDB)
- Progressive Web App (PWA) per utilizzo offline

## 📄 Licenza

Questo progetto è distribuito con licenza MIT. Sentiti libero di riutilizzarlo e modificarlo.

---

> Realizzato con ❤️ da [Tuo Nome](https://marcomanfrin.me)

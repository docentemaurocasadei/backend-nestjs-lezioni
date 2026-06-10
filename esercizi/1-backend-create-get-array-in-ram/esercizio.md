ESERCIZIO
🎯 Obiettivo

Realizzare una piccola applicazione composta da:

Backend in NestJS
Frontend HTML + JavaScript
Utilizzo di Promise (fetch)
🔧 Parte 1 – Backend (NestJS)

Creare un backend con le seguenti caratteristiche:

📌 Endpoint richiesti
GET /cards
Restituisce un array di oggetti JSON
Ogni oggetto deve avere:
id
title
description
price
POST /cards
Riceve un oggetto JSON con:
title
description
price
Aggiunge una nuova card alla lista
Restituisce la card creata
📌 Vincoli
I dati possono essere salvati in un array (no database)
Gli ID devono essere incrementali
Abilitare CORS
🌐 Parte 2 – Frontend (HTML + JS)

Creare una pagina HTML con:

📌 1. Visualizzazione card
Recuperare le card da /cards
Visualizzarle in formato card
Usare fetch (Promise)
📌 2. Form inserimento
Creare un form con:
titolo
descrizione
prezzo
📌 3. Invio dati
Al submit:
inviare una richiesta POST a /cards
usare fetch (Promise)
📌 4. Aggiornamento automatico
Dopo il POST:
ricaricare la lista card (nuova chiamata GET)
🎯 Obiettivi didattici
Comprendere le Promise
Capire la differenza tra GET e POST
Collegare frontend e backend
Gestire dati dinamici
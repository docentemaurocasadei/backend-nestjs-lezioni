integrare JWT solo per POST

ESERCIZIO – API Cards con JWT e ruoli
🎯 Obiettivo

Realizzare una piccola applicazione full stack con:

Backend in NestJS
Frontend in HTML + JavaScript
Uso di Promise (fetch)
Autenticazione tramite JWT
Gestione dei ruoli

2.Autenticazione

Creare endpoint:

POST /auth/login
Riceve username e password
Restituisce un JWT

Utenti disponibili
Gestire utenti in memoria:
username	password	ruolo
admin	mc1	editor
user	us1	contributor

Regole di accesso
GET /cards → pubblico
POST /cards → solo utenti con ruolo editor
📌 5. Vincoli tecnici
Usare JWT
Usare un Guard per proteggere le route
Salvare dati in un array (no database)
Abilitare CORS
🌐 Parte 2 – Frontend
📌 1. Login
Creare una funzione che chiama /auth/login
Salvare il token JWT

Aggiornamento lista
Dopo il POST:
ricaricare le card


🎯 Obiettivi didattici
Comprendere Promise
Capire differenza tra autenticazione e autorizzazione
Usare JWT
Collegare frontend e backend
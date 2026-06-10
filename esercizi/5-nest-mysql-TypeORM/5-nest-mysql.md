ESERCIZIO – CRUD Categories con NestJS + TypeORM
🎯 OBIETTIVO
Realizzare un backend NestJS che gestisca la tabella categories del database hamburgeria.

🗄️ DATABASE
Tabella categories:
id (int, PK, auto increment)
name (varchar, NOT NULL)
slug (varchar)
description (text, nullable)
is_active (int)

🔧 PARTE 1 – Setup
Creare progetto NestJS
Installare TypeORM e MySQL
Configurare connessione al DB

🔧 PARTE 2 – Struttura modulo
Creare modulo categories con:
entity
service
controller

🔧 PARTE 3 – Entity
Creare entity Category con mapping corretto:
is_active → isActive
gestione colonne DB

🔧 PARTE 4 – DTO
Creare:
CreateCategoryDto
UpdateCategoryDto

Con validazione:
name obbligatorio
slug obbligatorio
isActive numero

🔧 PARTE 5 – CRUD
Implementare:
GET
/categories → lista
/categories/:id → singolo
POST
/categories → crea
PUT
/categories/:id → aggiorna
DELETE
/categories/:id → elimina

🔧 PARTE 6 – Validazione
usare ValidationPipe
attivare:
whitelist
transform

🎯 OUTPUT ATTESO
API funzionanti
dati salvati su MySQL
validazione attiva
errori gestiti

Fase2:
creare le api per gestire la tabella products e la relazione manyToMany di products
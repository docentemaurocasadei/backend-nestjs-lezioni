Logging in NestJS con Winston
🎯 Obiettivo
Imparare a gestire il logging in NestJS utilizzando:
Logger di default
Logging nei service
Logging errori
Logger professionale con Winston
Salvataggio log su file

🔧 Parte 1 – Logger base
Creare endpoint:
GET /test-log
Che scriva:
log
warn
error

🔧 Parte 2 – Logger nel service
Creare un service che:
simula creazione card
logga inizio e fine operazione

🔧 Parte 3 – Logging errori
Creare:
GET /error
Che genera errore e lo logga

🔧 Parte 4 – Logging professionale con Winston
Configurare Winston per:
log su console
log su file (logs/app.log)
livelli (info, error)
🎯 Obiettivi didattici
Capire livelli di log
Usare logger reale da produzione
Centralizzare logging
Differenza tra console e file
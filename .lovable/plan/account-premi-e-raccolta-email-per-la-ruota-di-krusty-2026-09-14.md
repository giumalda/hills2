# Account, premi e raccolta email per la Ruota di Krusty

## Obiettivo
Trasformare la ruota attuale da esperienza locale dimostrativa a promozione reale: accesso utente, una giocata controllata, premio salvato e consenso email tracciato.

## Interventi
- Aggiungere accesso e registrazione con email/password e Google, mantenendo lo stile del sito.
- Creare in Lovable Cloud i dati per profilo promozionale e vincite, protetti per singolo account.
- Sostituire l'estrazione casuale nel browser con un'assegnazione sicura lato server, con un solo premio per account nella campagna attiva.
- Salvare premio, codice univoco, stato di utilizzo e scadenza; mostrare il premio già ottenuto quando l'utente torna.
- Raccogliere l'email dell'account e un consenso promozionale esplicito e separato, revocabile dall'utente.
- Aggiungere una piccola area “Il mio premio” con codice e stato, accessibile dalla ruota.
- Generare tramite AI Gateway gli alt text italiani per ogni immagine del sito e sostituire gli alt attuali con le descrizioni prodotte.
- Verificare accesso, estrazione, persistenza, privacy, errori e resa su telefono e desktop.

## Dettagli tecnici
- Regole dati: ogni utente può leggere e aggiornare soltanto i propri dati; l'estrazione usa una funzione autenticata e non accetta premio o identità dal browser.
- Premi iniziali: salsa extra, 10% di sconto, bibita, patatine piccole; probabilità e disponibilità saranno definite nel codice sicuro lato server.
- Il consenso promozionale non sarà preselezionato e verranno registrati data e stato.
- Gli alt text AI saranno generati durante lo sviluppo e salvati nel codice: nessuna chiamata AI a ogni visita.

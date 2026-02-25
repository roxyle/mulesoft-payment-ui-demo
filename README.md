## Mulesoft Payment UI Demo

**ITA:** Interfaccia web realizzata per simulare un Payment Orchestration System basato su MuleSoft.
Questo progetto fornisce una UI responsiva che permette di visualizzare e testare il flusso di pagamento implementato nel progetto backend.

Backend MuleSoft:  https://github.com/roxyle/mulesoft-payment-orchestration

La UI non effettua chiamate reali verso un gateway di pagamento ma simula l’intero processo mostrando step, log, query SQL, response JSON, e lo stato delle tabelle interne (orders, payments, idempotency).

**ENG:** A web interface designed to simulate a Payment Orchestration System built with MuleSoft.
This project provides a clean, responsive UI that visualizes and tests the payment flow implemented in the backend project:

MuleSoft Backend: https://github.com/roxyle/mulesoft-payment-orchestration

The UI does not call a real payment gateway. It simulates the entire process, showing steps, logs, SQL queries, JSON responses, and the internal table states (orders, payments, idempotency)

# Funzionalità principali - Main Features
**ITA:**
- Simulazione completa del flusso di pagamento: creazione ordine, inserimento pagamento, aggiornamento stato ordine, gestione idempotency key
- UI responsiva (desktop/tablet/mobile) realizzata con CSS grid + media queries.
- Log dettagliati step-by-step, con ogni fase del processo mostrata in tempo reale.
- Visualizzazione database simulato con tabelle aggiornate dinamicamente (orders, payments, idempotency_log).
  
**ENG:**
- Full payment flow simulation: order creation, payment insertion, order status update, idempotency key handling
- Responsive UI (desktop/tablet/mobile) built with CSS grid + media queries.
- Step-by-step logs with every stage of the process displayed in real time.
- Simulated in-memory database with live updates of orders, payments, and idempotency logs.

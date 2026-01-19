
# Scelta Meteo (abilita/disabilita + persistenza)

La funzionalità **Scelta Meteo** permette all’utente di decidere se usare oppure omettere il meteo nella generazione della playlist.  
La scelta è **persistente** tramite `localStorage` e determina sia la **visibilità** della sezione meteo sia la **rinumerazione** delle sezioni successive.

## Interfaccia Utente

- Toggle meteo (radio) all’avvio:
  - Container: `#weatherToggle`
  - Opzioni: `input[name="useWeather"][value="yes"|"no"]`
  - Default: `yes` (se nessun valore salvato)

- Sezione meteo (mostrata/nascosta dinamicamente):
  - Wrapper: `#meteoSection`
  - Titolo: `#meteoTitle`
  - Input città: `#cityInput`
  - Bottone fetch: `#btnMeteo`
  - Output stato: `#weatherOutput`

- Titoli sezioni rinumerati:
  - Generi: `#genresTitle`
  - Mood: `#moodTitle`
  - Player: `#playerTitle`

## Stato e Persistenza

- Variabili principali:
  - `let currentVibe = 'sunny'`
  - `let meteo = false`
  - `let useWeather = true`

- Persistenza su `localStorage`:
  - Chiave: `mm_useWeather`
  - Valori: `'yes' | 'no'`

- In `DOMContentLoaded`:
  - Lettura `const saved = localStorage.getItem('mm_useWeather')`
  - `useWeather = (saved !== 'no')`
  - Sincronizzazione radio
  - Chiamata a `applyWeatherToggle()` per allineare UI e numerazione

## Flusso Funzionale

1. **Avvio pagina**
   - Legge la preferenza da `localStorage`
   - Sincronizza i radio
   - Applica lo stato UI (mostra/nasconde meteo, rinumera titoli)

2. **Cambiamento scelta (Sì/No)**
   - Aggiorna `useWeather`
   - Salva in `localStorage` (`'yes'`/`'no'`)
   - Chiama `applyWeatherToggle()` per:
     - Mostrare/nascondere `#meteoSection`
     - Rinumerare i titoli
     - Se `No`: forza `currentVibe = 'sunny'` e `meteo = false`

3. **Richiesta meteo**
   - `getRealWeather()` esce subito se `useWeather === false`
   - Altrimenti effettua la fetch, determina la `vibe` (`sunny`/`rain`/`cold`) e chiama `updateState(...)`

4. **Generazione playlist**
   - `setMood(mood)` compone la chiave con `mood`, `currentVibe` e (eventuali) generi
   - Etichetta meteo nel risultato:
     - Se `useWeather === true`: mostra `currentVibe.toUpperCase()`
     - Se `useWeather === false`: mostra `OMESSO`

## Funzioni Principali

### `applyWeatherToggle()`
- Se `useWeather === true`:
  - `#meteoSection` visibile
  - Titoli: `1. Meteo`, `2. Generi Musicali`, `3. Scegli Mood`, `4. Player`
- Se `useWeather === false`:
  - `#meteoSection` nascosto
  - Titoli rinumerati: `1. Generi Musicali`, `2. Scegli Mood`, `3. Player`
  - `currentVibe = 'sunny'`, `meteo = false`

### `getRealWeather()`
- Blocca esecuzione se `useWeather === false`
- Valida la città (`#cityInput`)
- Effettua fetch su OpenWeather
- Determina `vibe`:
  - `temp < 5` → `cold`
  - `conditionId < 700` → `rain`
  - altrimenti → `sunny`
- Chiama `updateState(vibe, temp, description, city)`

### `updateState(vibe, temp, desc, city)`
- Aggiorna `currentVibe`
- Aggiorna `#weatherOutput` con città, temperatura, descrizione e `vibe`
- Imposta `meteo = true`

### `setMood(mood)`
- Integra eventuali generi selezionati
- Costruisce la chiave playlist
- Applica fallback progressivi (multi-genere → primo genere → `mood_vibe` → `fallback`)
- Aggiorna `#spotifyPlayer.src`
- Aggiorna testo risultato:
  - `Meteo: OMESSO` se `useWeather === false`
  - Altrimenti `Meteo: currentVibe.toUpperCase()`

## Eventi

- `DOMContentLoaded`:
  - Lettura/sincronizzazione `mm_useWeather`
  - `applyWeatherToggle()`
  - Binding:
    - Radio `input[name="useWeather"]` → salva su `localStorage` e `applyWeatherToggle()`
    - `#btnMeteo` → `getRealWeather()`
    - Generi (checkbox) → `updateGenreDisplay()`
    - Bottoni Mood → `setMood(mood)`
    - `#cityInput` Enter → `getRealWeather()`

## Rinumerazione Dinamica

- Con meteo attivo:
  - `1. Meteo`, `2. Generi Musicali`, `3. Scegli Mood`, `4. Player`
- Con meteo omesso:
  - `1. Generi Musicali`, `2. Scegli Mood`, `3. Player`

## Comportamenti Attesi

- Prima visita: default `useWeather = true` (sezione meteo visibile, numerazione 1..4)
- Scelgo “No”: sezione meteo nascosta, numerazione aggiornata, `currentVibe = 'sunny'`, `Meteo: OMESSO`
- Ricarico pagina: la scelta “Sì/No” rimane coerente grazie a `localStorage`
- Torno a “Sì”: sezione meteo ripristinata, numerazione originale

## Checklist Test

- [ ] Default senza preferenza salvata → meteo visibile, numerazione 1..4
- [ ] Seleziono “No” → meteo nascosto, numerazione 1..3, `Meteo: OMESSO` nel risultato
- [ ] Ricarico con “No” salvato → stato persistente correttamente
- [ ] Torno a “Sì” e ricarico → meteo visibile, numerazione 1..4
- [ ] `getRealWeather()` non esegue fetch quando `useWeather === false`
- [ ] `currentVibe` torna `sunny` quando il meteo è omesso
- [ ] Nessun cambiamento di stile (layout e CSS invariati)

## Note

- La chiave `mm_useWeather` usa valori stringa `'yes'`/`'no'`.
- In modalità “No”, il sistema continua a funzionare usando `currentVibe = 'sunny'` come default per la logica delle playlist.

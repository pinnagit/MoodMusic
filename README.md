# 🎵 MoodMusic – Documentazione di Progetto

## 1. Descrizione Generale

**MoodMusic** è un’applicazione web che consiglia playlist musicali personalizzate combinando **umore dell’utente**, **condizioni meteo in tempo reale** e **generi musicali preferiti**.
Il sistema raccoglie i dati inseriti dall’utente e, sulla base di tali informazioni, ricerca la playlist più adatta tramite l’API di **Last.fm**.

L’obiettivo del progetto è offrire un’esperienza musicale dinamica e contestuale, in cui musica, emozioni e ambiente si fondono in un’unica interfaccia interattiva.

---

## 2. Funzionalità Principali

* Selezione dell’umore (Mood)
* Integrazione opzionale del meteo in tempo reale
* Scelta dei generi musicali
* Generazione automatica della playlist
* Sistema di fallback per garantire sempre un risultato
* Interfaccia grafica dinamica basata su mood e meteo

---

## 3. Scelta del Mood

L’utente può selezionare il proprio stato d’animo tra diverse opzioni, ad esempio:

* Relax
* Carico
* Triste
* Felice

Il mood rappresenta uno dei parametri fondamentali per la generazione della playlist e influisce anche sull’aspetto grafico dell’applicazione.

---

## 4. Scelta dei Generi Musicali

### 4.1 Descrizione

La funzionalità **Scelta Generi Musicali** consente all’utente di selezionare uno o più generi per personalizzare la playlist.

La selezione è **opzionale**: se non viene scelto alcun genere, il sistema utilizza playlist generiche basate esclusivamente su Mood + Meteo.

### 4.2 Interfaccia Utente

* Container: `#genreContainer`
* Tipologia input: checkbox
* Generi disponibili:

  * Pop
  * Rock
  * Lofi
  * Rap
  * Jazz
  * Electronic
  * Indie
  * R&B

Le selezioni vengono mostrate in tempo reale nell’elemento `#selectedGenres`.

### 4.3 Raccolta dei generi selezionati

La funzione `getSelectedGenres()`:

* recupera tutti i checkbox `input[name="genre"]:checked`
* estrae i valori associati
* ordina i valori alfabeticamente
* restituisce un array dei generi selezionati

**Esempio:**

```
["indie", "rock"]
```

### 4.4 Aggiornamento del riepilogo

La funzione `updateGenreDisplay()` aggiorna il contenuto di `#selectedGenres`:

* Nessun genere selezionato → *"Nessun genere selezionato (playlist generiche)"*
* Uno o più generi selezionati → *"Generi selezionati: ..."*

L’aggiornamento avviene automaticamente tramite l’evento `change` su ogni checkbox.

---

## 5. Scelta Meteo (abilita/disabilita)

### 5.1 Descrizione

La funzionalità **Scelta Meteo** consente all’utente di decidere se includere o omettere il meteo nella generazione della playlist.

La scelta è **persistente** grazie all’utilizzo del `localStorage`.

### 5.2 Interfaccia Utente

* Toggle meteo (radio button):

  * Container: `#weatherToggle`
  * Input: `input[name="useWeather"][value="yes"|"no"]`
  * Default: `yes`

* Sezione meteo:

  * Wrapper: `#meteoSection`
  * Titolo: `#meteoTitle`
  * Input città: `#cityInput`
  * Bottone fetch: `#btnMeteo`
  * Output: `#weatherOutput`

---

## 6. Stato e Persistenza

### 6.1 Variabili principali

```js
let currentVibe = 'sunny'
let meteo = false
let useWeather = true
```

### 6.2 Persistenza su localStorage

* Chiave: `mm_useWeather`
* Valori: `'yes'` | `'no'`

Alla fase di `DOMContentLoaded`, il valore salvato viene letto e applicato all’interfaccia.

---

## 7. Logica Meteo

### 7.1 Recupero meteo

La funzione `getRealWeather()`:

* termina immediatamente se `useWeather === false`
* valida l’input della città
* effettua una chiamata API a OpenWeather

### 7.2 Determinazione della vibe

* Temperatura < 5°C → `cold`
* Condition ID < 700 → `rain`
* Altrimenti → `sunny`

La funzione `updateState()` aggiorna:

* `currentVibe`
* output meteo
* stato `meteo = true`

---

## 8. Generazione della Playlist

### 8.1 Formazione della chiave

* Nessun genere selezionato:

```
mood_vibe
```

* Uno o più generi selezionati:

```
mood_vibe_genere1_genere2
```

**Esempio:**

```
happy_sunny_indie_rock
```

### 8.2 Sistema di fallback

Se la chiave non è presente nel database playlist:

1. Tentativo con solo il primo genere selezionato
2. Tentativo con `mood_vibe`
3. Playlist di fallback finale

---

## 9. Integrazione API Last.fm

MoodMusic utilizza l’API di **Last.fm** per ricercare playlist coerenti con:

* Mood selezionato
* Vibe meteo (se attiva)
* Generi musicali

Questo garantisce suggerimenti musicali pertinenti e sempre aggiornati.

---

## 10. Interfaccia Grafica Dinamica

* Il **colore principale della pagina** cambia in base al mood
* Lo **sfondo cambia in base al meteo**, con effetti visivi come:

  * Sole
  * Pioggia
  * Fulmini

L’esperienza visiva rafforza il legame tra musica, emozioni e ambiente.

---

## 11. Comportamenti Attesi

* Prima visita: meteo attivo, numerazione completa
* Meteo disattivato: sezione nascosta, vibe forzata su `sunny`
* Refresh pagina: stato mantenuto
* Nessun genere selezionato: playlist generiche

---

## 12. Conclusione

MoodMusic è un sistema di **consiglio musicale intelligente** che combina dati emotivi, ambientali e preferenze personali per creare un’esperienza musicale immersiva, personalizzata e sempre coerente con il momento dell’utente.

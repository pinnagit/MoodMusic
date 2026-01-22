<<<<<<< funzione_scelta_genere

# Scelta Generi Musicali

La funzionalità **Scelta Generi Musicali** permette all’utente di selezionare uno o più generi musicali per personalizzare la playlist generata.  
La selezione è opzionale: se non viene scelto alcun genere, il sistema utilizza playlist generiche basate unicamente sulla combinazione Mood + Meteo.

## Interfaccia Utente

La sezione è composta da una lista di checkbox all’interno del container `#genreContainer`.  
Ogni checkbox rappresenta un genere musicale (Pop, Rock, Lofi, Rap, Jazz, Electronic, Indie, R&B).

Le selezioni effettuate vengono mostrate in tempo reale nell’elemento:
## Raccolta dei generi selezionati

La funzione `getSelectedGenres()`:

- recupera tutti i checkbox `input[name="genre"]:checked`
- estrae i valori associati
- ordina i valori alfabeticamente
- restituisce un array contenente i generi selezionati

Esempio: ["indie", "rock"]
## Aggiornamento del riepilogo

La funzione `updateGenreDisplay()` aggiorna il contenuto di `#selectedGenres`:

- Nessun genere selezionato → “Nessun genere selezionato (playlist generiche)”
- Uno o più generi selezionati → “Generi selezionati: ...”

L’aggiornamento avviene automaticamente tramite l’evento `change` su ogni checkbox.

## Integrazione con la generazione playlist

Al momento della selezione del mood, i generi vengono integrati nella chiave utilizzata per cercare la playlist più appropriata.

### Formazione della chiave:

- Nessun genere selezionato: mood_vibe
- Uno o più generi selezionati: mood_vibe_genere1_genere2
  (i generi sono ordinati alfabeticamente)

Esempio: happy_sunny_indie_rock
## Sistema di fallback

Se la chiave generata non è presente nel database `playlists`, vengono applicati i seguenti fallback:

1. Tentativo con la combinazione contenente solo il primo genere selezionato.
2. In caso di assenza, utilizzo della playlist generica `mood_vibe`.
3. In ultima istanza, utilizzo della playlist `fallback`.

## Eventi

Ogni checkbox appartenente ai generi musicali è collegato alla funzione `updateGenreDisplay()` tramite evento `change`, in modo da mantenere l’interfaccia sempre aggiornata in tempo reale.
=======
# MoodMusic
MoodMusic è un’applicazione web che genera playlist Spotify basate sul **tuo umore** oppure sul **meteo reale della tua città**.

![logoMoodMusic](https://github.com/user-attachments/assets/e5b331d8-d2a6-471b-824a-649616c4583c)
## Funzionalità principali
### Playlist basate sul Mood
L’utente può scegliere tra 4 stati d’animo:

- 😄 **Felice**
- 😌 **Relax**
- 😔 **Triste**
- ⚡ **Carico**

Ogni mood è collegato a playlist Spotify curate e già pronte.
### Playlist basate sul Meteo
Inserendo una città, l’app:

1. Recupera il meteo reale tramite **OpenWeather API**
2. Analizza temperatura e condizioni atmosferiche
3. Imposta automaticamente una “vibe” tra:
   - ☀️ `sunny`
   - 🌧️ `rain`
   - ❄️ `cold`

La playlist finale è una combinazione di **Mood + Meteo**, ad esempio:
## Player Spotify integrato
La playlist scelta viene caricata direttamente in un **iframe Spotify**, pronta per essere ascoltata senza uscire dall’app.
## Logica del sistema
### Analisi Meteo
La vibe viene determinata così:
- Temperatura **< 5°C** → `cold`
- Codice meteo **< 700** → `rain` (pioggia/neve)
- Altrimenti → `sunny`

### Scelta Playlist
Una volta selezionato il mood:

```js
const key = `${mood}_${currentVibe}`;
const playlistId = playlists[key];
>>>>>>> main


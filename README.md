
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



let currentVibe = 'sunny';
let meteo = false;
let useWeather = true;

const musicTags = {
    // --- BASE (SENZA GENERE SPECIFICO) ---
    'happy_sunny': 'summer hits',
    'happy_rain': 'acoustic pop',
    'happy_cold': 'christmas',
    'chill_sunny': 'chillout',
    'chill_rain': 'lo-fi',
    'chill_cold': 'acoustic',
    'sad_sunny': 'melancholy',
    'sad_rain': 'sad',
    'sad_cold': 'indie',
    'energetic_sunny': 'dance',
    'energetic_rain': 'rock',
    'energetic_cold': 'metal',

    // --- POP ---
    'happy_sunny_pop': 'summer pop',
    'happy_rain_pop': 'acoustic pop',
    'happy_cold_pop': 'indie pop',
    'chill_sunny_pop': 'chill pop',
    'chill_rain_pop': 'soft pop',
    'chill_cold_pop': 'dream pop',
    'sad_sunny_pop': 'sad pop',
    'sad_rain_pop': 'ballads',
    'sad_cold_pop': 'piano pop',
    'energetic_sunny_pop': 'dance pop',
    'energetic_rain_pop': 'power pop',
    'energetic_cold_pop': 'electropop',

    // --- ROCK ---
    'happy_sunny_rock': 'classic rock',
    'happy_rain_rock': 'soft rock',
    'happy_cold_rock': 'folk rock',
    'chill_sunny_rock': 'yacht rock',
    'chill_rain_rock': 'post-rock',
    'chill_cold_rock': 'slow rock',
    'sad_sunny_rock': 'alternative rock',
    'sad_rain_rock': 'emo',
    'sad_cold_rock': 'grunge',
    'energetic_sunny_rock': 'hard rock',
    'energetic_rain_rock': 'punk rock',
    'energetic_cold_rock': 'industrial rock',

    // --- LOFI ---
    'happy_sunny_lofi': 'upbeat lofi',
    'happy_rain_lofi': 'lofi hip hop',
    'happy_cold_lofi': 'winter lofi',
    'chill_sunny_lofi': 'chillhop',
    'chill_rain_lofi': 'lofi beats',
    'chill_cold_lofi': 'sleep lofi',
    'sad_sunny_lofi': 'nostalgic lofi',
    'sad_rain_lofi': 'sad lofi',
    'sad_cold_lofi': 'lonely lofi',
    'energetic_sunny_lofi': 'jazzhop',
    'energetic_rain_lofi': 'lofi rap',
    'energetic_cold_lofi': 'dark lofi',

    // --- RAP/HIP-HOP ---
    'happy_sunny_rap': 'party rap',
    'happy_rain_rap': 'conscious hip hop',
    'happy_cold_rap': 'old school hip hop',
    'chill_sunny_rap': 'jazz rap',
    'chill_rain_rap': 'cloud rap',
    'chill_cold_rap': 'lo-fi rap',
    'sad_sunny_rap': 'emotional rap',
    'sad_rain_rap': 'sad rap',
    'sad_cold_rap': 'dark trap',
    'energetic_sunny_rap': 'trap',
    'energetic_rain_rap': 'hardcore hip hop',
    'energetic_cold_rap': 'drill',

    // --- JAZZ ---
    'happy_sunny_jazz': 'acid jazz',
    'happy_rain_jazz': 'smooth jazz',
    'happy_cold_jazz': 'christmas jazz',
    'chill_sunny_jazz': 'bossa nova',
    'chill_rain_jazz': 'cool jazz',
    'chill_cold_jazz': 'dark jazz',
    'sad_sunny_jazz': 'blues',
    'sad_rain_jazz': 'noir jazz',
    'sad_cold_jazz': 'sad jazz',
    'energetic_sunny_jazz': 'swing',
    'energetic_rain_jazz': 'bebop',
    'energetic_cold_jazz': 'fusion',

    // --- ELECTRONIC ---
    'happy_sunny_electronic': 'house',
    'happy_rain_electronic': 'downtempo',
    'happy_cold_electronic': 'synthpop',
    'chill_sunny_electronic': 'ambient',
    'chill_rain_electronic': 'trip-hop',
    'chill_cold_electronic': 'idm',
    'sad_sunny_electronic': 'future garage',
    'sad_rain_electronic': 'witch house',
    'sad_cold_electronic': 'dark ambient',
    'energetic_sunny_electronic': 'edm',
    'energetic_rain_electronic': 'techno',
    'energetic_cold_electronic': 'drum and bass',

    // --- INDIE ---
    'happy_sunny_indie': 'indie pop',
    'happy_rain_indie': 'indie folk',
    'happy_cold_indie': 'folktronica',
    'chill_sunny_indie': 'bedroom pop',
    'chill_rain_indie': 'shoegaze',
    'chill_cold_indie': 'slowcore',
    'sad_sunny_indie': 'midwest emo',
    'sad_rain_indie': 'sad indie',
    'sad_cold_indie': 'indie rock',
    'energetic_sunny_indie': 'indie dance',
    'energetic_rain_indie': 'garage rock',
    'energetic_cold_indie': 'post-punk',

    // --- R&B ---
    'happy_sunny_rnb': 'neo-soul',
    'happy_rain_rnb': 'contemporary r&b',
    'happy_cold_rnb': 'soul',
    'chill_sunny_rnb': 'quiet storm',
    'chill_rain_rnb': 'alternative r&b',
    'chill_cold_rnb': 'slow jams',
    'sad_sunny_rnb': 'blues',
    'sad_rain_rnb': 'sad r&b',
    'sad_cold_rnb': 'dark r&b',
    'energetic_sunny_rnb': 'new jack swing',
    'energetic_rain_rnb': 'funk',
    'energetic_cold_rnb': 'motown',

    // --- METAL ---
    'happy_sunny_metal': 'glam metal',
    'happy_rain_metal': 'symphonic metal',
    'happy_cold_metal': 'power metal',
    'chill_sunny_metal': 'stoner rock',
    'chill_rain_metal': 'doom metal',
    'chill_cold_metal': 'post-metal',
    'sad_sunny_metal': 'gothic metal',
    'sad_rain_metal': 'dsbm',
    'sad_cold_metal': 'black metal',
    'energetic_sunny_metal': 'heavy metal',
    'energetic_rain_metal': 'nu metal',
    'energetic_cold_metal': 'thrash metal',

    // --- CLASSICA ---
    'happy_sunny_classical': 'baroque',
    'happy_rain_classical': 'romantic era',
    'happy_cold_classical': 'waltz',
    'chill_sunny_classical': 'impressionism',
    'chill_rain_classical': 'minimalism',
    'chill_cold_classical': 'piano solo',
    'sad_sunny_classical': 'opera',
    'sad_rain_classical': 'adagio',
    'sad_cold_classical': 'requiem',
    'energetic_sunny_classical': 'symphony',
    'energetic_rain_classical': 'concerto',
    'energetic_cold_classical': 'modern classical',

    // --- METEO DISATTIVATO ---
    'happy': 'hits',
    'chill': 'chillout',
    'sad': 'sad songs',
    'energetic': 'workout',

    // POP
    'happy_pop': 'pop hits',
    'chill_pop': 'chill pop',
    'sad_pop': 'sad pop',
    'energetic_pop': 'dance pop',

    // ROCK
    'happy_rock': 'classic rock',
    'chill_rock': 'soft rock',
    'sad_rock': 'ballads',
    'energetic_rock': 'hard rock',

    // LOFI
    'happy_lofi': 'happy lofi',
    'chill_lofi': 'lofi beats',
    'sad_lofi': 'sad lofi',
    'energetic_lofi': 'lofi house',

    // RAP
    'happy_rap': 'hip hop party',
    'chill_rap': 'chill rap',
    'sad_rap': 'sad rap',
    'energetic_rap': 'hype rap',

    // JAZZ
    'happy_jazz': 'swing',
    'chill_jazz': 'smooth jazz',
    'sad_jazz': 'blues',
    'energetic_jazz': 'big band',

    // ELECTRONIC
    'happy_electronic': 'edm',
    'chill_electronic': 'downtempo',
    'sad_electronic': 'future garage',
    'energetic_electronic': 'house',

    // INDIE
    'happy_indie': 'indie pop',
    'chill_indie': 'indie folk',
    'sad_indie': 'indie rock',
    'energetic_indie': 'indie dance',

    // RNB
    'happy_rnb': 'r&b hits',
    'chill_rnb': 'alternative r&b',
    'sad_rnb': 'soul',
    'energetic_rnb': 'funk',

    // METAL
    'happy_metal': 'glam metal',
    'chill_metal': 'stoner rock',
    'sad_metal': 'doom metal',
    'energetic_metal': 'heavy metal',

    // CLASSICAL
    'happy_classical': 'baroque',
    'chill_classical': 'piano',
    'sad_classical': 'adagio',
    'energetic_classical': 'symphony'

};

// FUNZIONE: Ottieni generi e ordina alfabeticamente
function getSelectedGenres() {
    const checkboxes = document.querySelectorAll('input[name="genre"]:checked');
    return Array.from(checkboxes).map(cb => cb.value).sort();
}

//FUNZIONE: Aggiorna display generi
function updateGenreDisplay() {
    const genres = getSelectedGenres();
    const display = document.getElementById('selectedGenres');
    
    if (genres.length == 0) {
        display.innerText = 'Nessun genere selezionato (playlist generiche)';
    } else {
        display.innerText = 'Generi selezionati: ' + genres.join(', ');
    }
}

//FUNZIONE: Applica scelta meteo
function applyWeatherToggle() {
    const meteoSection = document.getElementById('meteoSection');
    const meteoTitle = document.getElementById('meteoTitle');
    const genresTitle = document.getElementById('genresTitle');
    const moodTitle = document.getElementById('moodTitle');
    const playerTitle = document.getElementById('playerTitle');
    
    if (useWeather) {
        meteoSection.style.display = 'block';
        meteoTitle.innerText = '1. Meteo';
        genresTitle.innerText = '2. Generi Musicali (Opzionale)';
        moodTitle.innerText = '3. Scegli Mood';
        playerTitle.innerText = '4. Risultati';
    } else {
        meteoSection.style.display = 'none';
        genresTitle.innerText = '1. Generi Musicali (Opzionale)';
        moodTitle.innerText = '2. Scegli Mood';
        playerTitle.innerText = '3. Risultati';
        currentVibe = 'sunny';
        meteo = false;
    }
}

// FUNZIONE METEO
async function getRealWeather() {
    if (!useWeather) return;
    
    const city = document.getElementById('cityInput').value.trim();
    const output = document.getElementById('weatherOutput');

    if (!city) {
        alert("Inserisci una città!");
        return;
    }

    output.innerText = "Caricamento...";

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d7cf6e05bb02b3e99058f0c599353815&units=metric&lang=it`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Città non trovata");

        const data = await response.json();
        const temp = data.main.temp;
        const conditionId = data.weather[0].id;
        const description = data.weather[0].description;
        
        let vibe = 'sunny';
        if (temp < 5) {
            vibe = 'cold';
        } else if (conditionId < 700) {
            vibe = 'rain';
        }
        
        updateState(vibe, temp, description, city);

    } catch (error) {
        output.innerText = "Errore: " + error.message;
    }
}

// FUNZIONE: Aggiorna stato meteo
function updateState(vibe, temp, desc, city) {
    currentVibe = vibe;
    document.getElementById('weatherOutput').innerText = 
        `${city}: ${temp.toFixed(1)}°C, ${desc} (Vibe: ${currentVibe.toUpperCase()})`;
    meteo = true;
}

//FUNZIONE: Selezione mood e ricerca meteo
async function setMood(mood) {
    const outputText = document.getElementById('resultText');
    const list = document.getElementById('trackList');
    const selectedGenres = getSelectedGenres();
    
    list.innerHTML = '<li>Caricamento...</li>';

    try {
        let allTracks = [];
        let description = "";
        let tagsUsed = [];

        // SELEZIONE MULTIPLA GENERI (1 a N)
        if (selectedGenres.length > 0) {
            
            // Creiamo una lista di richieste (una per ogni genere)
            const requests = selectedGenres.map(genre => {
                const key = useWeather ? `${mood}_${currentVibe}_${genre}` : `${mood}_${genre}`;
                
                // Fallback intelligente: se la chiave non esiste, usa "mood genre"
                const tag = musicTags[key] || `${mood} ${genre}`;
                tagsUsed.push(tag);
                
                const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${encodeURIComponent(tag)}&api_key=d1210cd099e3597cc3d4e74ffc303388&format=json&limit=50`;
                return fetch(url).then(res => res.json());
            });

            // Aspettiamo che TUTTE le richieste finiscano
            const results = await Promise.all(requests);
            
            // Uniamo tutte le tracce trovate
            results.forEach(data => {
                if (data.tracks && data.tracks.track) {
                    const tracks = Array.isArray(data.tracks.track) ? data.tracks.track : [data.tracks.track];
                    allTracks = [...allTracks, ...tracks];
                }
            });
            
            const meteoInfo = useWeather ? `(Meteo: ${currentVibe})` : '(No Meteo)';
            description = tagsUsed.join(' + ');
            outputText.innerText = `Mix Multigenere: "${description.toUpperCase()}" ${meteoInfo}...`;

        } else {
            // NESSUN GENERE SELEZIONATO (Base Mood)
            const key = useWeather ? `${mood}_${currentVibe}` : `${mood}`;
            const tag = musicTags[key] || mood;
            
            const meteoInfo = useWeather ? `(Meteo: ${currentVibe})` : '(No Meteo)';
            outputText.innerText = `Tag: "${tag.toUpperCase()}" ${meteoInfo}...`;
            
            const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${encodeURIComponent(tag)}&api_key=d1210cd099e3597cc3d4e74ffc303388&format=json&limit=100`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.tracks && data.tracks.track) {
                 allTracks = Array.isArray(data.tracks.track) ? data.tracks.track : [data.tracks.track];
            }
            description = tag;
        }

        // Processa e mostra le tracce
        processTracks(allTracks, list, outputText, description);

    } catch (error) {
        console.error(error);
        list.innerHTML = `<li>Errore nel caricamento: ${error.message}</li>`;
    }
}

function processTracks(allTracks, listElement, textElement, tagName) {
    if (!allTracks || allTracks.length === 0) {
        listElement.innerHTML = '<li>Nessuna traccia trovata.</li>';
        return;
    }

    // --- RANDOMIZZAZIONE ---
    for (let i = allTracks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allTracks[i], allTracks[j]] = [allTracks[j], allTracks[i]];
    }

    // Prendiamo solo le prime 10
    const selectedTracks = allTracks.slice(0, 10);

    listElement.innerHTML = ''; // Pulisci
    
    selectedTracks.forEach(track => {
        const li = document.createElement('li');
        const query = encodeURIComponent(`${track.artist.name} ${track.name}`);
        const youtubeUrl = `https://www.youtube.com/results?search_query=${query}`;
        
        li.innerHTML = `
            <strong>${track.name}</strong> - ${track.artist.name} 
            <small>(<a href="${youtubeUrl}" target="_blank" style="color: #d32f2f; text-decoration: none;">▶ Ascolta su YT</a>)</small>
        `;
        listElement.appendChild(li);
    });
    
    textElement.innerText = `Ecco 10 tracce casuali per "${tagName.toUpperCase()}":`;
}


document.addEventListener('DOMContentLoaded', function() {
    
    const saved = localStorage.getItem('mm_useWeather');
    if (saved !== null) {
        useWeather = (saved === 'yes');
    }
    
    // Sincronizza radio
    const radioYes = document.querySelector('input[name="useWeather"][value="yes"]');
    const radioNo = document.querySelector('input[name="useWeather"][value="no"]');
    if (useWeather) {
        if(radioYes) radioYes.checked = true;
    } else {
        if(radioNo) radioNo.checked = true;
    }
    
    // Applica stato iniziale
    applyWeatherToggle();
    
    // Event listeners radio useWeather
    document.querySelectorAll('input[name="useWeather"]').forEach(radio => {
        radio.addEventListener('change', function() {
            useWeather = (this.value === 'yes');
            localStorage.setItem('mm_useWeather', useWeather ? 'yes' : 'no');
            applyWeatherToggle();
        });
    });
    
    // Bottone Meteo
    const btnMeteo = document.getElementById('btnMeteo');
    if(btnMeteo) btnMeteo.addEventListener('click', getRealWeather);
    
    // Checkbox generi (MAX 2 SELEZIONI)
    document.querySelectorAll('input[name="genre"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateGenreDisplay();
        });
    });
    
    // Bottoni Mood
    document.querySelectorAll('.mood-btn').forEach(button => {
        button.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            setMood(mood);
        });
    });
    
    // Enter su input città
    const cityIn = document.getElementById('cityInput');
    if(cityIn) {
        cityIn.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                getRealWeather();
            }
        });
    }
});
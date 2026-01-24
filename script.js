// ============================================================
// MOODMUSIC - Script principale
// ============================================================

// ============================================================
// STATO DELL'APPLICAZIONE
// MODIFICATO: Aggiunto trackCount per gestire il numero di tracce
// ============================================================
const state = {
    weatherUsed: true,
    currentWeather: null, 
    lastFetchedWeather: null,
    currentMood: null,
    selectedGenres: [],
    city: '',
    currentVibe: 'sunny',
    trackCount: 10  // NUOVO: Numero di tracce della playlist (default 10)
};

// ============================================================
// ELEMENTI DOM
// MODIFICATO: Aggiunti riferimenti per il controllo numero tracce
// ============================================================
const els = {
    radioWeather: document.querySelectorAll('input[name="useWeather"]'),
    meteoSection: document.getElementById('meteoSection'),
    cityInput: document.getElementById('cityInput'),
    btnMeteo: document.getElementById('btnMeteo'),
    weatherOutput: document.getElementById('weatherOutput'),
    genreInputs: document.querySelectorAll('input[name="genre"]'),
    selectedGenresTxt: document.getElementById('selectedGenres'),
    moodBtns: document.querySelectorAll('.mood-btn'),
    resultText: document.getElementById('resultText'),
    trackList: document.getElementById('trackList'),
    body: document.body,
    mainContainer: document.getElementById('mainContainer'),
    bgVideo: document.getElementById('bgVideo'),
    moodOverlay: document.getElementById('moodOverlay'),
    // NUOVO: Elementi per il controllo numero tracce
    trackCountSlider: document.getElementById('trackCountSlider'),
    trackCountValue: document.getElementById('trackCountValue')
};

// ============================================================
// MUSIC TAGS - Mappatura mood/meteo/genere -> tag Last.fm
// ============================================================
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

// ============================================================
// VIDEO ASSETS - Video di sfondo per condizioni meteo
// ============================================================
const videoAssets = {
    'Rain': 'https://assets.mixkit.co/videos/preview/mixkit-rain-falling-on-the-window-sill-1626-large.mp4',
    'Clouds': 'https://assets.mixkit.co/videos/preview/mixkit-clouds-moving-in-the-sky-2502-large.mp4',
    'Clear': 'https://assets.mixkit.co/videos/preview/mixkit-sun-rays-through-the-trees-1188-large.mp4',
    'Storm': 'https://assets.mixkit.co/videos/preview/mixkit-lightning-in-the-dark-sky-2358-large.mp4'
};

// ============================================================
// NUOVA FEATURE: Event listener per slider numero tracce
// Aggiorna lo stato e il display quando l'utente modifica il valore
// ============================================================
els.trackCountSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    state.trackCount = value;
    els.trackCountValue.textContent = value;
    
    // Salva in localStorage per persistenza
    localStorage.setItem('mm_trackCount', value);
});

// ============================================================
// EVENT LISTENERS - Radio Meteo
// ============================================================
els.radioWeather.forEach(r => {
    r.addEventListener('change', (e) => {
        state.weatherUsed = e.target.value === 'yes';
        localStorage.setItem('mm_useWeather', state.weatherUsed ? 'yes' : 'no');
        
        if(state.weatherUsed) {
            els.meteoSection.style.opacity = '1';
            els.meteoSection.style.pointerEvents = 'auto';
            if (state.lastFetchedWeather) {
                state.currentWeather = state.lastFetchedWeather;
                updateTheme();
            }
        } else {
            els.meteoSection.style.opacity = '0.5';
            els.meteoSection.style.pointerEvents = 'none';
            state.currentWeather = null;
            state.currentVibe = 'sunny';
            updateTheme(); 
        }
    });
});

// ============================================================
// EVENT LISTENERS - Bottone Meteo (API reale OpenWeatherMap)
// ============================================================
els.btnMeteo.addEventListener('click', async () => {
    const city = els.cityInput.value.trim();
    if (!city) return alert("Inserisci una città!");

    state.city = city;
    els.weatherOutput.innerHTML = "🔄 Controllo le nuvole...";
    els.weatherOutput.classList.remove('hidden');

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d7cf6e05bb02b3e99058f0c599353815&units=metric&lang=it`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Città non trovata");

        const data = await response.json();
        const temp = data.main.temp;
        const conditionId = data.weather[0].id;
        const description = data.weather[0].description;
        
        let vibe = 'sunny';
        let weather = 'Clear';
        
        if (temp < 5) {
            vibe = 'cold';
            weather = 'Clouds';
        } else if (conditionId < 700) {
            vibe = 'rain';
            if (conditionId < 300) {
                weather = 'Storm';
            } else {
                weather = 'Rain';
            }
        }
        
        state.currentVibe = vibe;
        state.currentWeather = weather;
        state.lastFetchedWeather = weather;
        
        let icon = '';
        if(weather === 'Clear') icon = '☀️';
        if(weather === 'Clouds') icon = '☁️';
        if(weather === 'Rain') icon = '🌧️';
        if(weather === 'Storm') icon = '⚡';

        els.weatherOutput.innerHTML = `${icon} A <b>${city}</b> ci sono ${temp.toFixed(1)}°C (${description})`;
        updateTheme();

    } catch (error) {
        els.weatherOutput.innerHTML = "❌ Errore: " + error.message;
    }
});

// Enter su input città
els.cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        els.btnMeteo.click();
    }
});

// ============================================================
// EVENT LISTENERS - Generi
// ============================================================
els.genreInputs.forEach(input => {
    input.addEventListener('change', () => {
        const checked = Array.from(els.genreInputs).filter(i => i.checked).map(i => i.value);
        state.selectedGenres = checked;
        els.selectedGenresTxt.textContent = checked.length > 0 
            ? `Selezionati: ${checked.join(', ')}` 
            : "Nessun genere selezionato (playlist generiche)";
    });
});

// ============================================================
// EVENT LISTENERS - Mood Buttons
// ============================================================
els.moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        state.currentMood = btn.getAttribute('data-mood');
        updateTheme();
        generatePlaylist();
    });
});

// ============================================================
// FUNZIONE: Aggiorna tema visivo
// ============================================================
function updateTheme() {
    const mood = state.currentMood;
    const weather = state.currentWeather;
    let overlayColor = "linear-gradient(to bottom right, #e0e7ff, #f3e8ff)";
    let isDarkMode = false;
    let videoUrl = "";

    if (state.weatherUsed && weather && videoAssets[weather]) {
        videoUrl = videoAssets[weather];
        if (!els.bgVideo.src.includes(videoUrl)) {
            els.bgVideo.src = videoUrl;
            els.bgVideo.style.opacity = '0';
            setTimeout(() => els.bgVideo.style.opacity = '1', 100);
        } else {
            els.bgVideo.style.opacity = '1';
        }
    } else {
        els.bgVideo.style.opacity = '0';
        setTimeout(() => els.bgVideo.src = "", 1000); 
    }

    if (mood === 'happy') {
        overlayColor = "linear-gradient(to bottom right, rgba(253, 224, 71, 0.7), rgba(244, 114, 182, 0.7))";
        if(weather === 'Clear') overlayColor = "linear-gradient(to bottom right, rgba(253, 224, 71, 0.3), rgba(34, 211, 238, 0.3))";
    } 
    else if (mood === 'sad') {
        overlayColor = "linear-gradient(to bottom right, rgba(148, 163, 184, 0.8), rgba(71, 85, 105, 0.8))";
        if (weather === 'Rain' || weather === 'Storm') {
            overlayColor = "linear-gradient(to bottom right, rgba(15, 23, 42, 0.85), rgba(0, 0, 0, 0.85))";
            isDarkMode = true;
        }
    } 
    else if (mood === 'chill') {
        overlayColor = "linear-gradient(to bottom right, rgba(167, 243, 208, 0.7), rgba(52, 211, 153, 0.7))";
        if(weather === 'Rain') {
             overlayColor = "linear-gradient(to bottom right, rgba(20, 83, 45, 0.7), rgba(8, 51, 68, 0.7))";
             isDarkMode = true;
        }
    } 
    else if (mood === 'energetic') {
        overlayColor = "linear-gradient(to bottom right, rgba(251, 113, 133, 0.7), rgba(249, 115, 22, 0.7))";
    }

    els.moodOverlay.style.background = overlayColor;
    
    if(isDarkMode) {
        els.body.classList.add('dark-mode');
    } else {
        els.body.classList.remove('dark-mode');
    }
}

// ============================================================
// FUNZIONE: Genera playlist con chiamate API Last.fm
// MODIFICATO: Usa state.trackCount per il numero di tracce
// ============================================================
async function generatePlaylist() {
    const mood = state.currentMood;
    const genres = state.selectedGenres;
    const weather = state.currentWeather;
    const vibe = state.currentVibe;

    els.trackList.innerHTML = '<li style="text-align: center; padding: 20px;">🔄 Caricamento...</li>';

    try {
        let allTracks = [];
        let tagsUsed = [];

        // SELEZIONE CON GENERI
        if (genres.length > 0) {
            const requests = genres.map(genre => {
                const key = state.weatherUsed ? `${mood}_${vibe}_${genre}` : `${mood}_${genre}`;
                const tag = musicTags[key] || `${mood} ${genre}`;
                tagsUsed.push(tag);
                
                // MODIFICATO: Richiede più tracce per avere margine di randomizzazione
                const limit = Math.max(50, state.trackCount * 3);
                const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${encodeURIComponent(tag)}&api_key=d1210cd099e3597cc3d4e74ffc303388&format=json&limit=${limit}`;
                return fetch(url).then(res => res.json());
            });

            const results = await Promise.all(requests);
            
            results.forEach(data => {
                if (data.tracks && data.tracks.track) {
                    const tracks = Array.isArray(data.tracks.track) ? data.tracks.track : [data.tracks.track];
                    allTracks = [...allTracks, ...tracks];
                }
            });
        } else {
            // NESSUN GENERE SELEZIONATO
            const key = state.weatherUsed ? `${mood}_${vibe}` : `${mood}`;
            const tag = musicTags[key] || mood;
            tagsUsed.push(tag);
            
            // MODIFICATO: Richiede più tracce per avere margine di randomizzazione
            const limit = Math.max(100, state.trackCount * 3);
            const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${encodeURIComponent(tag)}&api_key=d1210cd099e3597cc3d4e74ffc303388&format=json&limit=${limit}`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.tracks && data.tracks.track) {
                allTracks = Array.isArray(data.tracks.track) ? data.tracks.track : [data.tracks.track];
            }
        }

        // Processa e mostra le tracce
        processTracks(allTracks, tagsUsed.join(' + '));

    } catch (error) {
        console.error(error);
        els.trackList.innerHTML = `<li style="text-align: center; color: #ef4444; padding: 20px;">❌ Errore: ${error.message}</li>`;
    }
}

// ============================================================
// FUNZIONE: Processa e visualizza le tracce
// MODIFICATO: Usa state.trackCount invece del valore fisso 10
// MODIFICATO: resultText mostra il numero effettivo di tracce generate
// ============================================================
function processTracks(allTracks, tagName) {
    if (!allTracks || allTracks.length === 0) {
        els.trackList.innerHTML = '<li style="text-align: center; opacity: 0.5; padding: 20px;">Nessuna traccia trovata.</li>';
        els.resultText.innerHTML = `Nessun risultato per "${tagName}"`;
        return;
    }

    // --- RANDOMIZZAZIONE (Fisher-Yates shuffle) ---
    for (let i = allTracks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allTracks[i], allTracks[j]] = [allTracks[j], allTracks[i]];
    }

    // MODIFICATO: Usa state.trackCount per determinare quante tracce mostrare
    const selectedTracks = allTracks.slice(0, state.trackCount);
    const actualCount = selectedTracks.length;

    els.trackList.innerHTML = '';
    
    selectedTracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.className = "track-item";
        
        const query = encodeURIComponent(`${track.artist.name} ${track.name}`);
        const youtubeUrl = `https://www.youtube.com/results?search_query=${query}`;
        
        li.innerHTML = `
            <div class="track-info">
                <h4>${track.name}</h4>
                <span>${track.artist.name}</span>
            </div>
            <a href="${youtubeUrl}" target="_blank" class="track-play-btn" title="Cerca su YouTube">
                ▶
            </a>
        `;
        els.trackList.appendChild(li);
    });
    
    // MODIFICATO: Aggiornato resultText per mostrare il numero di tracce generate
    let contextText = `🎵 Ecco <b>${actualCount} tracce</b> per "${tagName.toUpperCase()}"`;
    if (state.weatherUsed && state.currentWeather) {
        contextText += ` | Meteo: <b>${state.currentVibe.toUpperCase()}</b>`;
    }
    els.resultText.innerHTML = contextText;
}

// ============================================================
// INIZIALIZZAZIONE - Carica valori salvati
// MODIFICATO: Aggiunto caricamento del valore trackCount da localStorage
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Carica preferenza meteo
    const savedWeather = localStorage.getItem('mm_useWeather');
    if (savedWeather !== null) {
        state.weatherUsed = (savedWeather === 'yes');
        const radioYes = document.querySelector('input[name="useWeather"][value="yes"]');
        const radioNo = document.querySelector('input[name="useWeather"][value="no"]');
        if (state.weatherUsed) {
            if(radioYes) radioYes.checked = true;
        } else {
            if(radioNo) radioNo.checked = true;
            els.meteoSection.style.opacity = '0.5';
            els.meteoSection.style.pointerEvents = 'none';
        }
    }

    // NUOVO: Carica preferenza numero tracce
    const savedTrackCount = localStorage.getItem('mm_trackCount');
    if (savedTrackCount !== null) {
        const count = parseInt(savedTrackCount);
        if (count >= 5 && count <= 30) {
            state.trackCount = count;
            els.trackCountSlider.value = count;
            els.trackCountValue.textContent = count;
        }
    }
});

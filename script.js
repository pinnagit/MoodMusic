// VARIABILI STATO
let currentVibe = 'sunny';
let meteo = false;
let useWeather = true;

// DATABASE PLAYLIST (Mood + Meteo + Generi)
const playlists = {
    // PLAYLIST BASE (Mood + Meteo)
    'happy_sunny': '37i9dQZF1DXdPec7aLTmlC',
    'happy_rain': '37i9dQZF1DX3rxVfdh1f5u',
    'happy_cold': '37i9dQZF1DX9uKNf5jGX6m',
    'chill_sunny': '37i9dQZF1DX4WYpdgoIcn6',
    'chill_rain': '37i9dQZF1DX889U0CL85jj',
    'chill_cold': '37i9dQZF1DX4H7FFUM2osB',
    'sad_sunny': '37i9dQZF1DX3YSRoSdA634',
    'sad_rain': '37i9dQZF1DX7qK8ma5wgG1',
    'sad_cold': '37i9dQZF1DWSqBruwoIXkA',
    'energetic_sunny': '37i9dQZF1DX76Wlfdnj7AP',
    'energetic_rain': '37i9dQZF1DX0HRj9P7NxeE',
    'energetic_cold': '37i9dQZF1DX76Wlfdnj7AP',

    // POP
    'happy_sunny_pop': '37i9dQZF1DXarRysLJmuju',
    'happy_rain_pop': '37i9dQZF1DX1ngEVM0lKrb',
    'happy_cold_pop': '37i9dQZF1DX4dyzvuaRJ0n',
    'chill_sunny_pop': '37i9dQZF1DX6R7QUWePReA',
    'chill_rain_pop': '37i9dQZF1DWTwnEm1IYyoj',
    'chill_cold_pop': '37i9dQZF1DX4AyFl3yqHeK',
    'sad_sunny_pop': '37i9dQZF1DX7qK8ma5wgG1',
    'sad_rain_pop': '37i9dQZF1DX7gIoKXt0gmx',
    'sad_cold_pop': '37i9dQZF1DWZUTt0fNaCPB',
    'energetic_sunny_pop': '37i9dQZF1DX0b1hHYQtJjp',
    'energetic_rain_pop': '37i9dQZF1DX6aTaZa0K6VA',
    'energetic_cold_pop': '37i9dQZF1DWY4xHQp97fN6',

    // ROCK
    'happy_sunny_rock': '37i9dQZF1DWXRqgorJj26U',
    'happy_rain_rock': '37i9dQZF1DX9wa6XirBPv8',
    'happy_cold_rock': '37i9dQZF1DWWxPM4nWdhyI',
    'chill_sunny_rock': '37i9dQZF1DX08mhnhv6g9b',
    'chill_rain_rock': '37i9dQZF1DWZryfp6NSvtz',
    'chill_cold_rock': '37i9dQZF1DX4E3UdUs7fUx',
    'sad_sunny_rock': '37i9dQZF1DX4SrOBCjlfVi',
    'sad_rain_rock': '37i9dQZF1DWVpCVxPAhVYW',
    'sad_cold_rock': '37i9dQZF1DX59NCqCqJtoH',
    'energetic_sunny_rock': '37i9dQZF1DWWOaP4H0w5b0',
    'energetic_rain_rock': '37i9dQZF1DX11otjEEadDh',
    'energetic_cold_rock': '37i9dQZF1DX3LyU0mhfqgP',

    // LOFI
    'happy_sunny_lofi': '37i9dQZF1DWWQRwui0ExPn',
    'happy_rain_lofi': '37i9dQZF1DX8Uebhn9wzrS',
    'happy_cold_lofi': '37i9dQZF1DXc8kgYqQLMfH',
    'chill_sunny_lofi': '37i9dQZF1DX4H7FFUM2osB',
    'chill_rain_lofi': '37i9dQZF1DX36Xw4IJIVKA',
    'chill_cold_lofi': '37i9dQZF1DXa1rZf8gLhyz',
    'sad_sunny_lofi': '37i9dQZF1DX3YSRoSdA634',
    'sad_rain_lofi': '37i9dQZF1DX7Jl5KP2eZaS',
    'sad_cold_lofi': '37i9dQZF1DX5trt9i14X7j',
    'energetic_sunny_lofi': '37i9dQZF1DX6VdMW310YC7',
    'energetic_rain_lofi': '37i9dQZF1DX8NTLI2TtZa6',
    'energetic_cold_lofi': '37i9dQZF1DWUraJYejk11q',

    // RAP
    'happy_sunny_rap': '37i9dQZF1DX0XUsuxWHRQd',
    'happy_rain_rap': '37i9dQZF1DX6GwdWRQMQpq',
    'happy_cold_rap': '37i9dQZF1DWY4xHQp97fN6',
    'chill_sunny_rap': '37i9dQZF1DX9oh43oAzkyx',
    'chill_rain_rap': '37i9dQZF1DX0A5xMzWpSSA',
    'chill_cold_rap': '37i9dQZF1DWTwzVdyRpXNF',
    'sad_sunny_rap': '37i9dQZF1DX7gIoKXt0gmx',
    'sad_rain_rap': '37i9dQZF1DX2pSTOxoPbx9',
    'sad_cold_rap': '37i9dQZF1DWW293M8GSBpq',
    'energetic_sunny_rap': '37i9dQZF1DX4SrOBCjlfVi',
    'energetic_rain_rap': '37i9dQZF1DX0SmFt3WbGbE',
    'energetic_cold_rap': '37i9dQZF1DX6J5NfMJS675',

    // JAZZ
    'happy_sunny_jazz': '37i9dQZF1DX0SM0LYsmbMT',
    'happy_rain_jazz': '37i9dQZF1DX4wta20PHgwo',
    'happy_cold_jazz': '37i9dQZF1DWVqfgj8NZEp1',
    'chill_sunny_jazz': '37i9dQZF1DX4wta20PHgwo',
    'chill_rain_jazz': '37i9dQZF1DWS1NK42Lma8T',
    'chill_cold_jazz': '37i9dQZF1DX2vYju3i0lNX',
    'sad_sunny_jazz': '37i9dQZF1DX1s9knjP51Oa',
    'sad_rain_jazz': '37i9dQZF1DXbLMw3QZ7sa4',
    'sad_cold_jazz': '37i9dQZF1DX8ymr6UES7vc',
    'energetic_sunny_jazz': '37i9dQZF1DWUb4EaAomqTi',
    'energetic_rain_jazz': '37i9dQZF1DX7YCknf2jT6s',
    'energetic_cold_jazz': '37i9dQZF1DX5z4dgJ9MxJz',

    // ELECTRONIC
    'happy_sunny_electronic': '37i9dQZF1DX4dyzvuaRJ0n',
    'happy_rain_electronic': '37i9dQZF1DX8tZsk68tuDw',
    'happy_cold_electronic': '37i9dQZF1DX1kCIzMYtzum',
    'chill_sunny_electronic': '37i9dQZF1DX2TRYkJECvfC',
    'chill_rain_electronic': '37i9dQZF1DX3Kdv0IChEm6',
    'chill_cold_electronic': '37i9dQZF1DWYoYGBbGKurt',
    'sad_sunny_electronic': '37i9dQZF1DX2pSTOxoPbx9',
    'sad_rain_electronic': '37i9dQZF1DX5IDTimEWoTd',
    'sad_cold_electronic': '37i9dQZF1DWX3SoTqhs2rq',
    'energetic_sunny_electronic': '37i9dQZF1DX5Q27plkaOQ3',
    'energetic_rain_electronic': '37i9dQZF1DX0HRj9P7NxeE',
    'energetic_cold_electronic': '37i9dQZF1DX4eRPd9frC1m',

    // INDIE
    'happy_sunny_indie': '37i9dQZF1DX2Nc3B70tvez',
    'happy_rain_indie': '37i9dQZF1DWWEcRhUuZYYZ',
    'happy_cold_indie': '37i9dQZF1DX26DKvjp0s9M',
    'chill_sunny_indie': '37i9dQZF1DX4E3UdUs7fUx',
    'chill_rain_indie': '37i9dQZF1DWVFJtzvDHN4L',
    'chill_cold_indie': '37i9dQZF1DX6OgmB2fwLGd',
    'sad_sunny_indie': '37i9dQZF1DWSqBruwoIXkA',
    'sad_rain_indie': '37i9dQZF1DX2sUQwD7tbmL',
    'sad_cold_indie': '37i9dQZF1DX59NCqCqJtoH',
    'energetic_sunny_indie': '37i9dQZF1DWWEcRhUuZYYZ',
    'energetic_rain_indie': '37i9dQZF1DXXRqgorJj26U',
    'energetic_cold_indie': '37i9dQZF1DX3LyU0mhfqgP',

    // R&B
    'happy_sunny_rnb': '37i9dQZF1DX4SBhb3fqCJd',
    'happy_rain_rnb': '37i9dQZF1DWYmmr74INQlb',
    'happy_cold_rnb': '37i9dQZF1DX6VDO8a6cQME',
    'chill_sunny_rnb': '37i9dQZF1DWXnexX7CktaI',
    'chill_rain_rnb': '37i9dQZF1DWTwzVdyRpXNF',
    'chill_cold_rnb': '37i9dQZF1DX1rVvRgjBkUE',
    'sad_sunny_rnb': '37i9dQZF1DX4SBhb3fqCJd',
    'sad_rain_rnb': '37i9dQZF1DX3YSRoSdA634',
    'sad_cold_rnb': '37i9dQZF1DWW293M8GSBpq',
    'energetic_sunny_rnb': '37i9dQZF1DWYmmr74INQlb',
    'energetic_rain_rnb': '37i9dQZF1DX4y8h9WqDPAE',
    'energetic_cold_rnb': '37i9dQZF1DX5OepaGriAIm',

    // COMBINAZIONI MULTIPLE (esempi)
    'chill_rain_lofi_jazz': '37i9dQZF1DXa1rZf8gLhyz',
    'happy_sunny_pop_rock': '37i9dQZF1DXcBWIGoYBM5M',
    'sad_rain_indie_rock': '37i9dQZF1DWVpCVxPAhVYW',
    'energetic_sunny_electronic_pop': '37i9dQZF1DX4dyzvuaRJ0n',

    // FALLBACK
    'fallback': '37i9dQZF1DX4WYpdgoIcn6'
};

// FUNZIONE: Ottieni generi selezionati
function getSelectedGenres() {
    const checkboxes = document.querySelectorAll('input[name="genre"]:checked');
    return Array.from(checkboxes).map(cb => cb.value).sort();
}

// FUNZIONE: Aggiorna display generi
function updateGenreDisplay() {
    const genres = getSelectedGenres();
    const display = document.getElementById('selectedGenres');
    
    if (genres.length === 0) {
        display.innerText = 'Nessun genere selezionato (playlist generiche)';
    } else {
        display.innerText = 'Generi selezionati: ' + genres.join(', ');
    }
}

// FUNZIONE: Applica toggle meteo
function applyWeatherToggle() {
    const meteoSection = document.getElementById('meteoSection');
    const meteoTitle = document.getElementById('meteoTitle');
    const genresTitle = document.getElementById('genresTitle');
    const moodTitle = document.getElementById('moodTitle');
    const playerTitle = document.getElementById('playerTitle');
    
    if (useWeather) {
        meteoSection.style.display = '';
        meteoTitle.innerText = '1. Meteo';
        genresTitle.innerText = '2. Generi Musicali';
        moodTitle.innerText = '3. Scegli Mood';
        playerTitle.innerText = '4. Player';
    } else {
        meteoSection.style.display = 'none';
        genresTitle.innerText = '1. Generi Musicali';
        moodTitle.innerText = '2. Scegli Mood';
        playerTitle.innerText = '3. Player';
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

// FUNZIONE MOOD + GENERI
function setMood(mood) {
    const genres = getSelectedGenres();
    
    // Costruisci chiave dinamica
    let key;
    if (genres.length === 0) {
        key = `${mood}_${currentVibe}`;
    } else {
        key = `${mood}_${currentVibe}_${genres.join('_')}`;
    }
    
    console.log('Chiave:', key);
    
    // Cerca playlist
    let playlistId = playlists[key];
    
    // Fallback: prova solo primo genere
    if (!playlistId && genres.length > 0) {
        const fallbackKey = `${mood}_${currentVibe}_${genres[0]}`;
        playlistId = playlists[fallbackKey];
    }
    
    // Fallback: solo mood + meteo
    if (!playlistId) {
        playlistId = playlists[`${mood}_${currentVibe}`];
    }
    
    // Fallback finale
    if (!playlistId) {
        playlistId = playlists['fallback'];
    }

    // Aggiorna player
    document.getElementById('spotifyPlayer').src = 
        `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;
    
    // Mostra risultato
    const meteoLabel = useWeather ? (currentVibe.toUpperCase() || 'DEFAULT') : 'OMESSO';
    let result = `Mood: ${mood.toUpperCase()} | Meteo: ${meteoLabel}`;
    if (genres.length > 0) {
        result += ` | Generi: ${genres.join(', ')}`;
    }
    document.getElementById('resultText').innerText = result;
}

// ============================================
// INIZIALIZZAZIONE - Event Listeners
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Leggi localStorage
    const saved = localStorage.getItem('mm_useWeather');
    useWeather = (saved !== 'no');
    
    // Sincronizza radio
    const radioYes = document.querySelector('input[name="useWeather"][value="yes"]');
    const radioNo = document.querySelector('input[name="useWeather"][value="no"]');
    if (useWeather) {
        radioYes.checked = true;
    } else {
        radioNo.checked = true;
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
    document.getElementById('btnMeteo').addEventListener('click', getRealWeather);
    
    // Checkbox generi
    document.querySelectorAll('input[name="genre"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateGenreDisplay);
    });
    
    // Bottoni Mood
    document.querySelectorAll('.mood-btn').forEach(button => {
        button.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            setMood(mood);
        });
    });
    
    // Enter su input città
    document.getElementById('cityInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            getRealWeather();
        }
    });
});
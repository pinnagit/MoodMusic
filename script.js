// VARIABILI STATO
let currentVibe = '';
let meteo=false // Default se l'utente non cerca il meteo

// DATABASE PLAYLIST (Mood + Meteo)
const playlists = {
    // FELICE
    'happy_sunny': '37i9dQZF1DXdPec7aLTmlC', // Happy Pop
    'happy_rain': '37i9dQZF1DX3rxVfdh1f5u',  // Comunque Happy
    'happy_cold': '37i9dQZF1DX9uKNf5jGX6m',  // Cozy Blend
    
    // RELAX
    'chill_sunny': '37i9dQZF1DX4WYpdgoIcn6', // Chill Hits
    'chill_rain': '37i9dQZF1DX889U0CL85jj',  // Chill Vibes
    'chill_cold': '37i9dQZF1DX4H7FFUM2osB',  // Chill Lofi Study

    // TRISTE
    'sad_sunny': '37i9dQZF1DX3YSRoSdA634',   // Life Sucks
    'sad_rain': '37i9dQZF1DX7qK8ma5wgG1',    // Sad Songs
    'sad_cold': '37i9dQZF1DWSqBruwoIXkA',    // Sad Indie

    // CARICO
    'energetic_sunny': '37i9dQZF1DX76Wlfdnj7AP', // Beast Mode
    'energetic_rain': '37i9dQZF1DX0HRj9P7NxeE',  // Workout
    'energetic_cold': '37i9dQZF1DX76Wlfdnj7AP'   // Beast Mode 
};

// 1. FUNZIONE METEO (INTELLIGENTE: REALE O DEMO)
async function getRealWeather() {
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
        
        if (!response.ok) throw new Error("Città non trovata o Key errata");

        const data = await response.json();
        
        // Analisi Dati Reali
        const temp = data.main.temp;
        const conditionId = data.weather[0].id; // Codice numerico del meteo
        const description = data.weather[0].description;
        
        // Logica Vibe: Priorità alla Temperatura < 0
        let vibe = 'sunny';
        
        if (temp < 5) {
            vibe = 'cold';
        } else if (conditionId < 700) {
            vibe = 'rain'; // 200-600 sono pioggia/neve (se sopra zero)
        }
        
        updateState(vibe, temp, description);

    } catch (error) {
        output.innerText = "Errore API: " + error.message;
        console.error(error);
    }
}

// Funzione helper per aggiornare la variabile globale
function updateState(vibe, temp, desc) {
    currentVibe = vibe;
    const output = document.getElementById('weatherOutput');
    output.innerText = `Meteo: ${temp}°C, ${desc}. (Vibe impostato: ${currentVibe.toUpperCase()})`;
    meteo=true
}


// 2. FUNZIONE SCELTA MOOD E PLAYER
function setMood(mood) {
    

    // Crea la chiave combinata (es. 'sad_rain')
    const key = `${mood}_${currentVibe}`;
    
    // Recupera ID Playlist
    let playlistId = playlists[key];
    
    // Fallback se non esiste
    if (!playlistId) playlistId = playlists['chill_sunny'];
    //DA AGGIUNGERE METODO DI GENERAZIONE RANDOM DI PLAYLIST
    // Costruisci URL Embed
    const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;

    // Aggiorna HTML
    document.getElementById('spotifyPlayer').src = embedUrl;
    document.getElementById('resultText').innerText = `Riproducendo per Mood: ${mood.toUpperCase()} + Meteo: ${currentVibe.toUpperCase()}`;
}


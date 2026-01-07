// VARIABILI STATO
let currentVibe = 'sunny'; // Default se l'utente non cerca il meteo

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
    const apiKey = document.getElementById('apiKeyInput').value.trim();
    const city = document.getElementById('cityInput').value.trim();
    const output = document.getElementById('weatherOutput');

    if (!city) {
        alert("Inserisci una città!");
        return;
    }

    output.innerText = "Caricamento...";

    // A. MODALITÀ DEMO (Se non c'è Key)
    if (!apiKey) {
        console.log("No Key: Uso Simulazione");
        // Simula ritardo di rete
        setTimeout(() => {
            // Simuliamo tre casi: Sole, Pioggia, Freddo Gelo
            const rand = Math.random();
            let temp, condition, desc;

            if (rand < 0.3) {
                // Caso FREDDO (30% probabilità)
                temp = Math.floor(Math.random() * 5) - 10; // Da -10 a -5
                condition = 'cold';
                desc = 'Gelo Polare (Simulato)';
            } else {
                // Altrimenti Sole o Pioggia
                const isRain = Math.random() > 0.5; 
                temp = Math.floor(Math.random() * 30);
                condition = isRain ? 'rain' : 'sunny';
                desc = isRain ? 'Pioggia (Simulata)' : 'Soleggiato (Simulato)';
            }
            
            updateState(condition, temp, desc);
        }, 500);
        return;
    }

    // B. MODALITÀ REALE (Se c'è Key)
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Città non trovata o Key errata");

        const data = await response.json();
        
        // Analisi Dati Reali
        const temp = data.main.temp;
        const conditionId = data.weather[0].id; // Codice numerico del meteo
        const description = data.weather[0].description;
        
        // Logica Vibe: Priorità alla Temperatura < 0
        let vibe = 'sunny';
        
        if (temp < 0) {
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
}


// 2. FUNZIONE SCELTA MOOD E PLAYER
function setMood(mood) {
    // Crea la chiave combinata (es. 'sad_rain')
    const key = `${mood}_${currentVibe}`;
    
    // Recupera ID Playlist
    let playlistId = playlists[key];
    
    // Fallback se non esiste
    if (!playlistId) playlistId = playlists['chill_sunny'];

    // Costruisci URL Embed
    const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;

    // Aggiorna HTML
    document.getElementById('spotifyPlayer').src = embedUrl;
    document.getElementById('resultText').innerText = `Riproducendo per Mood: ${mood.toUpperCase()} + Meteo: ${currentVibe.toUpperCase()}`;
}
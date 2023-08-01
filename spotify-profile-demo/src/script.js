export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email user-top-read user-read-recently-played");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

export async function fetchTopTracks(token) {
    const result = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
            method: "GET", headers: { Authorization: `Bearer ${token}` }
});

    const data = await result.json();
    return data.items;
}

export async function fetchAudioFeatures(token, trackIDs) {
    const idsQueryParam = trackIDs.join(',');
    const result = await fetch(`https://api.spotify.com/v1/audio-features?ids=${idsQueryParam}`, {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
    });
  
    return await result.json();
  }

export async function calculateMeans(audioFeatures) {
    const numTracks = audioFeatures.length;
      
    let tempoSum = 0;
    let loudnessSum = 0;
    let danceabilitySum = 0;
    let modeSum = 0;
    let valenceSum = 0;
    let energySum = 0;
    let instrumentalnessSum = 0;
    let acousticnessSum = 0;
    let popularitySum = 0;
    let keyFrequencies = {};
      
    audioFeatures.forEach(track => {
    tempoSum += track.tempo;
    loudnessSum += track.loudness;
    danceabilitySum += track.danceability;
    modeSum += track.mode;
    valenceSum += track.valence;
    energySum += track.energy;
    instrumentalnessSum += track.instrumentalness;
    acousticnessSum += track.acousticness;
    popularitySum += track.popularity;

          
    const key = track.key;
    keyFrequencies[key] = (keyFrequencies[key] || 0) + 1;
    });
      
    const mostFrequentKey = Object.keys(keyFrequencies).reduce((a, b) => keyFrequencies[a] > keyFrequencies[b] ? a : b);
      
    const means = {
        mostFrequentKey: mostFrequentKey,
        tempo: Number((tempoSum / numTracks).toFixed(2)),
        loudness: Number((loudnessSum / numTracks).toFixed(2)),
        danceability: Number((danceabilitySum / numTracks).toFixed(2)),
        mode: modeSum >= numTracks / 2 ? 1 : 0,
        valence: Number((valenceSum / numTracks).toFixed(2)),
        energy: Number((energySum / numTracks).toFixed(2)),
        instrumentalness: Number((instrumentalnessSum / numTracks).toFixed(2)),
        acousticness: Number((acousticnessSum / numTracks).toFixed(2)),
        popularity: Number((popularitySum / numTracks).toFixed(2)),
    };
      // Return the means JSON object
    return means;
  }
  

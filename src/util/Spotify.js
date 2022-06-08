const clientId = '6ac1a21a381441fdb435f20bd3269e4b';
const redirectUri = 'http://spotify-create-playlist.surge.sh'
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            console.log("Access token already available. Below:")
            console.log(accessToken);
            return accessToken;
        }
        // check for access token match

        console.log(`Access token not yet available, but checking location href: ${window.location.href}`);
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        console.log(`accessTokenMatch = ${accessTokenMatch}`);
        console.log(`expiresInMatch = ${expiresInMatch}`);
        // alert(accessTokenMatch);
        // alert(expiresInMatch);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            console.log(`accessToken = accessTokenMatch[1]; == ${accessToken}`)
            const expiresIn = Number(expiresInMatch[1]);
            console.log(`expiresIn == ${expiresIn}`)
            // This clears the parameters, allowing us to grab a new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn*1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            console.log("Redirecting to authentication");
            alert("Getting permission from Spotify account first. Perform the search again right after!");
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
            // alert("received access token back via URL woohoo!");
        }

    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
        { 
            headers: {
                        Authorization: `Bearer ${accessToken}`

                    }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId;
        return fetch(`https://api.spotify.com/v1/me`, {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json())
            .then(jsonResponse => {
                const playlistId = jsonResponse.id;
                // alert(trackUris);
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                });
            });
        });
    }

}

export default Spotify;
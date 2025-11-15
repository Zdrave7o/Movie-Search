const apiKey = `6eb09120`;

async function searchMovies(movieName) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieName)}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data.Response === "True" && Array.isArray(data.Search)) {
            console.log(data.Search);
        } else {
            throw new Error(data.Error || 'No search results');
        }
    } catch (err) {
        console.error('searchMovies error:', err);
        throw err;
    }
}

const apiKey = ``;
const searchBar = document.querySelector(".movie-search-input");

async function searchMovies(movieName) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(movieName)}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data.Response === "True" && Array.isArray(data.Search)) {
            return data.Search;
        } else {
            throw new Error(data.Error || 'No search results');
        }
    } catch (err) {
        console.error('searchMovies error:', err);
        throw err;
    }
}

searchBar.addEventListener("input", displayMovies)

async function displayMovies() {
    const query = searchBar.value;
    try {
        const searchResultsArr = await searchMovies(query);
        console.log(searchResultsArr);
    } catch (err) {
        console.log('No results or error:', err.message);
    }
}

const apiKey = ``;
const searchBar = document.querySelector(".movie-search-input");
const searchResults = document.querySelector(".search-results");

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
    searchResults.classList.remove("d-none");
    searchResults.classList.add("d-block");
    searchResults.innerHTML = "";
    try {
        const searchResultsArr = await searchMovies(query);
        searchResults.innerHTML = "";
        searchResultsArr.forEach(result => {
            searchResults.innerHTML += `
                            <div class="search-result container-fluid p-1 d-flex align-items-start justify-content-space-around">
                                <div class="col-12 search-result-poster-container d-flex align-items-start g-2">
                                    <img class="poster ms-2 mt-1 col-2" src="${result.Poster}" alt="No Poster Found!">
                                    <div>
                                        <p class='p-1'>${result.Title}</p>
                                        <p class='p-1'>${result.Year}</p>
                                    </div>
                                </div>
                            </div>
            `;
        });
        console.log(searchResultsArr);
    } catch (err) {
        console.log('No results or error:', err.message);
        searchResults.innerHTML = "<p class='fw-light text-center'>No Results</p>"
    }
}

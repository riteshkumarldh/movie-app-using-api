const search = document.querySelector("[data-search]"),
suggestions = document.querySelector("[data-suggestions]"),
movieDetails = document.querySelector("[data-movie-Details]");

// my api key tmdb
const key = "e6b180db9f3058987feb7b8fcd89e819";

// fething searched movie and calling function to display suggestions according to search
const searchMovie = async (movieName) => {
    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${movieName}&page=1&include_adult=false`;
    try {
        const response = await fetch(searchURL);
        const data = await response.json();

        if(response.ok){
            // console.log(data.results);
            displaySuggestion(data.results);
        } else {
            alert("something wrong");
        }
    } 
    catch(error) {
        console.log(error);
    }
}

// searching movie on every input type
search.addEventListener("input", (e) => {
    const inputValue = e.target.value.toLowerCase();

    if(inputValue.length > 0){
        searchMovie(inputValue);
        suggestions.classList.add("show");
    } else {
        suggestions.classList.remove("show");
    }
});

// displaying sugeestion
const displaySuggestion = (data) => {
    suggestions.innerHTML = data.map((movie) => {
        return `
        <div class="suggestion" onClick="getMovieDetails(${movie.id})">
            <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="thumbnail">
            <div class="extras">
                <h4>${movie.title}</h4>
                <p>${movie.release_date}</p>
            </div>
        </div>
        `
    }).join("");
}

// getting movie details according to calling function to display details on document
const getMovieDetails = async (movieId= 26687) => {
    suggestions.classList.remove("show");
    search.value = "";

    const movieURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`;

    try {
        const response = await fetch(movieURL);
        const data = await response.json();

        if(response.ok){
            // console.log(data);
            displayMovieDetails(data);
        } else {
            alert("something wrong while fetching movie details");
        }
    } 
    catch(error) {
        console.log(error);
    }
}

// displaying the movie results on screen
const displayMovieDetails = (movie) => {
    // destructring the required things from fetched object
    const {poster_path, overview, release_date, title} = movie;

    movieDetails.innerHTML = `
        <div class="img">
            <img src="https://image.tmdb.org/t/p/w185/${poster_path}" alt="poster">
        </div>

        <div class="movie-details">

            <h2 class="title">${title}</h2>

            <p class="release">${release_date}</p>

            <p class="description">${overview}</p>

        </div>
    `
}

// displaying a movie on page load
window.addEventListener("load", ()=> {
    getMovieDetails();
});


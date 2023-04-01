const search = document.querySelector("[data-search]"),
suggestions = document.querySelector("[data-suggestions]");



const movieId = 26687;
const key = "e6b180db9f3058987feb7b8fcd89e819";
// const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`;

const movieName = "batman";

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

search.addEventListener("input", (e) => {
    const inputValue = e.target.value.toLowerCase();

    if(inputValue.length > 0){
        searchMovie(inputValue);
        suggestions.classList.add("show");
    } else {
        suggestions.classList.remove("show");
    }
});

// https://image.tmdb.org/t/p/w185/${poster_path}
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

const getMovieDetails = async (movieId= 26687) => {
    suggestions.classList.remove("show");
    search.value = "";

    const movieURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`;

    try {
        const response = await fetch(movieURL);
        const data = await response.json();

        if(response.ok){
            console.log(data);
        } else {
            alert("something wrong while fetching movie details");
        }
    } 
    catch(error) {
        console.log(error);
    }

}


const apiKey = 'd2ec227d94b2f1aabdbc91b53a9fce0e';
const language = 'es';
const pageNumber = 1;

async function fetchPopularMovies() {
    try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}&page=${pageNumber}`;
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;

        const moviesContainer = document.getElementById('contenedorPeliculas');
        moviesContainer.innerHTML = '';

        movies.forEach(movie => {
            const movieElement = createMovieElement(movie);
            moviesContainer.appendChild(movieElement);
        });
    } catch (error) {
        console.log('Error:', error);
    }
}

fetchPopularMovies();

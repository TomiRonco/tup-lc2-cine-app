// Obtener las películas almacenadas en el almacenamiento local
const favorities = localStorage.getItem('favorities') ? JSON.parse(localStorage.getItem('favorities')) : [];

// Obtener el contenedor donde se mostrarán las películas
const moviesContainer = document.getElementById('contenedorPeliculasFavoritas');

// Verificar si existen películas favoritas
if (favorities.length === 0) {
    // No hay películas favoritas, mostrar el mensaje
    const noMoviesMessage = document.createElement('p');
    noMoviesMessage.innerText = 'No tienes películas seleccionadas en favoritos';
    noMoviesMessage.classList.add('no-peliculas-mensaje');
    moviesContainer.appendChild(noMoviesMessage);
} else {
    // Hay películas favoritas, mostrar las películas
    favorities.forEach(movieCode => {
        // Realizar una solicitud a la API para obtener los detalles de la película por su código
        const apiKey = 'd2ec227d94b2f1aabdbc91b53a9fce0e';
        const language = 'es';
        const url = `https://api.themoviedb.org/3/movie/${movieCode}?api_key=${apiKey}&language=${language}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Procesar la respuesta exitosa
                const movie = data;
                const movieElement = createMovieElement(movie);
                moviesContainer.appendChild(movieElement);
            })
            .catch(error => {
                // Mostrar mensaje de error en caso de error
                const errorMessage = document.getElementById('error-mensaje');
                errorMessage.style.display = 'block';
                console.log('Error:', error);
            });
    });
}
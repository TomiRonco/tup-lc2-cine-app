function createMovieElement(movie) {
    const movieElement = document.createElement('div');
    movieElement.className = 'pelicula';

    const posterElement = document.createElement('img');
    posterElement.className = 'poster';
    posterElement.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'placeholder.png';
    movieElement.appendChild(posterElement);

    const titleElement = document.createElement('h3');
    titleElement.className = 'titulo';
    titleElement.innerText = movie.title;
    movieElement.appendChild(titleElement);

    const detailsElement = document.createElement('div');
    detailsElement.className = 'descripcion';
    detailsElement.innerHTML = `<p><b>Código:</b> ${movie.id}</p>
                                <p><b>Título original:</b> ${movie.original_title}</p>
                                <p><b>Idioma original:</b> ${movie.original_language}</p>
                                <p><b>Año:</b> ${movie.release_date}</p>`;
    movieElement.appendChild(detailsElement);

    if (window.location.pathname === '/index.html') {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-fav';
        const buttonElement = document.createElement('button');
        buttonElement.className = 'button radius medium';
        buttonElement.innerText = 'Agregar a Favoritos';
        buttonElement.addEventListener('click', () => {
            addMovieToFavorites(movie);
        });
        buttonContainer.appendChild(buttonElement);
        movieElement.appendChild(buttonContainer);
    }

    if (window.location.pathname === '/favorities.html') {
        const overviewElement = document.createElement('p');
        overviewElement.innerHTML = `<b>Resumen:</b> ${movie.overview}`;
        detailsElement.appendChild(overviewElement);

        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-fav';
        const buttonElement = document.createElement('button');
        buttonElement.className = 'button radius medium';
        buttonElement.innerText = 'Quitar de Favoritos';
        buttonElement.addEventListener('click', () => {
            removeMovieFromFavorites(movie.id);
            movieElement.remove();
        });
        buttonContainer.appendChild(buttonElement);
        movieElement.appendChild(buttonContainer);
    }

    return movieElement;
}

// Agregar una película a favoritos
function addMovieToFavorites(movie) {
    const favorities = getFavoritesFromLocalStorage();
    const alertContainer = document.getElementById('alert-container');

    // Verificar si la película ya está en favoritos
    if (favorities.includes(movie.id)) {
        const warningMessage = document.getElementById('warning-message');
        warningMessage.style.display = 'block';
        hideMessage(warningMessage);
        return;
    }

    favorities.push(movie.id); // Agregar el código de la película en lugar del objeto completo
    saveFavoritesToLocalStorage(favorities);

    // Mostrar mensaje de éxito
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';
    hideMessage(successMessage);

    // Ocultar otros mensajes
    const errorMessage = document.getElementById('error-message');
    const warningMessage = document.getElementById('warning-message');
    errorMessage.style.display = 'none';
    warningMessage.style.display = 'none';
}

// Remover una película de favoritos
function removeMovieFromFavorites(movieId) {
    const favorities = getFavoritesFromLocalStorage();
    const updatedFavorites = favorities.filter(id => id !== movieId); // Filtrar por el código de la película
    saveFavoritesToLocalStorage(updatedFavorites);
}

// Obtener las películas favoritas almacenadas en el almacenamiento local
function getFavoritesFromLocalStorage() {
    const favorities = localStorage.getItem('favorities');
    return favorities ? JSON.parse(favorities) : [];
}

// Guardar las películas favoritas en el almacenamiento local
function saveFavoritesToLocalStorage(favorites) {
    localStorage.setItem('favorities', JSON.stringify(favorites));
}

// Función para ocultar un mensaje después de 5 segundos
function hideMessage(messageElement) {
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 2000);
}

// Obtener los elementos de mensaje existentes
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
const warningMessage = document.getElementById('warning-message');

// Verificar si los elementos de mensaje existen
if (successMessage && errorMessage && warningMessage) {
    // Ocultar los mensajes al cargar la página
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    warningMessage.style.display = 'none';
}

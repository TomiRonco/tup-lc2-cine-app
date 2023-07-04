async function obtenerDatosAPI() {
    try {
        const apiKey = 'd2ec227d94b2f1aabdbc91b53a9fce0e';
        const language = 'es-ES';
        const page = 1;

        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}&page=${page}`;

        const response = await fetch(url);
        const data = await response.json();

        return data.results;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}


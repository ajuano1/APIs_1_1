const apiKey = 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDFjNmY0MDQ2ZTdkMGJkMzQyYWNmNTc4ZDkyMTE1YSIsInN1YiI6IjY0ZWE4YzM2YzVjMWVmMDBjNjUyNDU4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ymDz_QsSwPzk__IT3LfkUqWrAurVxgUb2NxMxXoPxtI';
const apiUrl = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
const language = 'es';


//// Función para obtener la lista de géneros
async function getGenres() {
    try {
        const response = await fetch(`${apiUrl}/genre/movie/list?language=${language}&api_key=${apiKey}`);
        const data = await response.json();
        const genreSelect = document.getElementById('genreSelect');
        
        data.genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            genreSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener los géneros:', error);
    }
}

// Función para obtener y mostrar las películas populares
async function getPopularMovies(genreId = '') {
    try {
        const response = await fetch(`${apiUrl}/movie/popular?language=${language}&api_key=${apiKey}&with_genres=${genreId}`);
        const data = await response.json();
        const movieList = document.getElementById('movieList');
        movieList.innerHTML = '';

        data.results.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');

            const posterPath = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
            const backdropPath = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

            movieDiv.innerHTML = `
                <img src="${posterPath}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                <p>${movie.overview}</p>
            `;

            movieList.appendChild(movieDiv);
        });
    } catch (error) {
        console.error('Error al obtener las películas populares:', error);
    }
}

// Evento cuando se selecciona un género
const genreSelect = document.getElementById('genreSelect');
genreSelect.addEventListener('change', () => {
    const selectedGenreId = genreSelect.value;
    getPopularMovies(selectedGenreId);
});

// Cargar géneros y películas populares al cargar la página
getGenres();
getPopularMovies();

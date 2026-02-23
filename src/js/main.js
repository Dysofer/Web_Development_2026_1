const result = document.getElementById("result");
const movieList = document.getElementById("movieList");

window.onload = function() {
    if (typeof(Storage) !== "undefined") {
        result.innerHTML = "Tu navegador soporta Web Storage";

        // Cargar nombre LocalStorage
        let localName = localStorage.getItem('nameLocal');
        if (localName) {
            document.getElementById("localSpan").innerText =
                "Nombre guardado es: " + localName;
        }

        // Cargar nombre SessionStorage
        let sessionName = sessionStorage.getItem('nameSession');
        if (sessionName) {
            document.getElementById("sessionSpan").innerText =
                "Nombre guardado es: " + sessionName;
        }

        // Cargar películas
        loadMovies();

    } else {
        result.innerHTML = "Tu navegador NO soporta Web Storage";
    }
};

// Guardar en LocalStorage
function saveToLocalStorage() {
    let name = document.getElementById("nameLocal").value;
    localStorage.setItem('nameLocal', name);

    document.getElementById("localSpan").innerText =
        "Nombre guardado es: " + name;
}

// Guardar en SessionStorage
function saveToSessionStorage() {
    let name = document.getElementById("nameSession").value;
    sessionStorage.setItem('nameSession', name);

    document.getElementById("sessionSpan").innerText =
        "Nombre guardado es: " + name;
}

// Agregar película
function addMovie() {
    let movieInput = document.getElementById("movieInput");
    let movie = movieInput.value;

    if (movie === "") return;

    let movies = JSON.parse(localStorage.getItem("movies")) || [];

    movies.push(movie);

    localStorage.setItem("movies", JSON.stringify(movies));

    movieInput.value = "";

    loadMovies();
}

// Mostrar películas
function loadMovies() {
    movieList.innerHTML = "";

    let movies = JSON.parse(localStorage.getItem("movies")) || [];

    movies.forEach(function(movie) {
        let li = document.createElement("li");
        li.textContent = movie;
        movieList.appendChild(li);
    });
}
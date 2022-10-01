const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'


const formEl = document.getElementById("form");
const searchEl = document.getElementById("search")
const mainEl = document.getElementById("main");




gettheMovies(API_URL);
async function gettheMovies(url) {

    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.results);
    showMovies(data.results);
}
function showMovies(movies) {
    mainEl.innerHTML = '';
    movies.forEach((movie) => {
        const { title, poster_path, vote_average,overview } = movie;
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
           
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getclassByvote(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
               ${overview}
            </div>
        
            `

          
                
                   
                
           
           movieEl.onclick = function(){
            location.href =  "https://www.themoviedb.org";
           }
        mainEl.appendChild(movieEl);
    });
}

function getclassByvote(vote) {
    if (vote >= 8) {
        return "green"
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red';
    }
}
formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTeams = searchEl.value;
    if (searchTeams && searchTeams !== '') {
        gettheMovies(SEARCH_API + searchTeams);
        searchEl.value = '';
    }
    else {
        window.location.reload();
    }
})
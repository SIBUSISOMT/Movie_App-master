

const toggle = document.querySelector('.toggle');
const bottomHeader = document.querySelector('.bottomHeader');

toggle.addEventListener('click', () => {
  bottomHeader.classList.toggle('show');
});

const apiKey = '36b5afa34a2bc5566287762ae4e16915';

let currentPage = 1;

async function fetchMovies(page = 1) {
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results) {
      displayMovies(data.results);
    }
  } catch (err) {
    console.error(err);
  }
}

function displayMovies(movies) {
  const container = document.querySelector('.container');
 container.innerHTML = '';
  movies.forEach(movie => {
    const movieBox = document.createElement('div');
    movieBox.className = 'box';

    const movieImg = document.createElement('img');
    movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieImg.alt = movie.title;

    const movieDetails = document.createElement('div');
    movieDetails.className = 'movieDetails';

    const leftDetails = document.createElement('div');
    leftDetails.className = 'leftDetails';

    const movieTitle = document.createElement('h5');
    movieTitle.textContent = movie.title;

    const releaseDate = document.createElement('p');
    releaseDate.textContent = movie.release_date;

    leftDetails.appendChild(movieTitle);
    leftDetails.appendChild(releaseDate);

    const rightDetails = document.createElement('div');
    rightDetails.className = 'rightDetails';

    const movieRating = document.createElement('p');
    movieRating.textContent = movie.vote_average;

    rightDetails.appendChild(movieRating);

    movieDetails.appendChild(leftDetails);
    movieDetails.appendChild(rightDetails);

    movieBox.appendChild(movieImg);
    movieBox.appendChild(movieDetails);

    container.appendChild(movieBox);
  });
}

fetchMovies(currentPage);

const searchBar = document.getElementById('search');

searchBar.addEventListener('keyup', async (e) => {
  const searchString = e.target.value;

  if (searchString.length >= 3) {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(searchString)}&page=1&include_adult=false`;
    try {
      const response = await fetch(searchUrl);
      const data = await response.json();
      if (data.results) {
        displayMovies(data.results);
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    fetchMovies(currentPage);
  }
});

const addButton = document.getElementById('button');

addButton.addEventListener('click', () => {
  currentPage++;
  fetchMovies(currentPage);
});

const select = document.getElementById('select');

function changeTheme(){
  let element = document.body;
  element.classList.toggle('lightMode');
}
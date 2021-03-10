const form = document.querySelector('.search-form');
const showImg = document.querySelector('.show__img');
const popup = document.querySelector('.popup');
const showName = document.querySelector('.show__details--name');
const showYear = document.querySelector('.show__details--year');
const showScore = document.querySelector('.show__details--score');
const showDescrip = document.querySelector('.show__description');
const showLink = document.querySelector('.show__details--link');

const closeBtn = document.querySelector('.close-btn');
const nextBtn = document.querySelector('.btn-next');

let displayIndex = 0;



form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  openModal();
  const searchTerm = form.elements.query.value;
  const configuration = {params: {q: searchTerm}};
  const response = await axios.get(`http://api.tvmaze.com/search/shows`, configuration)
  displayShowData(response.data);
  form.elements.query.value = '';
  nextBtn.addEventListener('click', function(){
    displayIndex += 1;
    displayShowData(response.data);
  });
})

let displayShowData = (results) => {
  showImg.src = results[displayIndex].show.image.original;
  showName.textContent = `Show Title: ${results[displayIndex].show.name}`;
  showYear.textContent = `Premier Year: ${results[displayIndex].show.premiered.substring(0,4)}`;
  showScore.textContent = `Average Rating: ${results[displayIndex].show.rating.average}`;
  showDescrip.innerHTML = `${results[displayIndex].show.summary}`;
  showLink.attributes.href.value = results[displayIndex].show.url;
} 

let openModal = () => {
  popup.classList.remove('hidden');
}

closeBtn.addEventListener( 'click', (e) => {
  popup.classList.add('hidden')
  }
);

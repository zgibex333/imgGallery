const auth = "563492ad6f91700001000001d0130bb175a149a9a5b6fa5e49a03d7d"; 
const gallery = document.querySelector('.gallery'); 
const searchIpnut = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue; 
let page = 1;
let fenchLink; 
let currentSearch;
const more = document.querySelector('.more'); 

//EventListeners

searchIpnut.addEventListener('input', updateInput); 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue)
})
more.addEventListener('click', loadMore); 


function updateInput (e) {
    searchValue = e.target.value;
}

async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method: 'GET', 
        headers: {
            Accept: 'application/json', 
            Authorization: auth
        }
    })
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data) {
    console.log(data);
        data.photos.forEach(photo => {
        const galleryImg = document.createElement('div'); 
        galleryImg.classList.add('gallery-img'); 
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p><a href="${photo.photographer_url}">${photo.photographer}</a></p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>
        ` 
        gallery.appendChild(galleryImg); 
})
}


async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink)
    generatePictures(data);
}


async function searchPhotos(search) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${search}&per_page=15&page=1`;
    const data = await fetchApi(fetchLink)  
    generatePictures(data);
}

async function loadMore(){
    console.log('fdf');
    page++; 
    if(currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

function clear(){ 
    searchIpnut.value = '';
    gallery.innerHTML = '';
}
curatedPhotos();

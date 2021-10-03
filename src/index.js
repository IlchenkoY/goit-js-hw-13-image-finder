import './sass/main.scss';
import apiService from './scripts/apiService';
import LoadMoreBtn from './scripts/load-more-btn';
import imagesListTpl from './templates/pictures-card.hbs';

const serchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true
});

serchForm.addEventListener('submit', serchHandler);
loadMoreBtn.refs.button.addEventListener('click', loadMoreHandler);

async function serchHandler(e) {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.query.value.trim();
    
    if (apiService.query) {
            try {
            clearGallery();
            apiService.resetPage();
            await fetchImages();
            loadMoreBtn.show();
        } catch (error) {
            console.log(error);
        }
    }
}

async function loadMoreHandler() {
    try {

        fetchImages(); 
    } catch (error) {
        console.log(error);
    }
    
}

function appendImagesMarkup(images) {
    gallery.insertAdjacentHTML('beforeend', imagesListTpl(images));
}

function clearGallery() {
    gallery.innerHTML = '';
}

async function fetchImages() {
    const images = await apiService.fetchRequest()
    loadMoreBtn.disable()
    appendImagesMarkup(images);
    loadMoreBtn.enable()
        
    setTimeout(() => {
        gallery.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});
    }, 500)
}

class ApiServise {
  static #BASE_URL = 'https://pixabay.com/api/';
  static #KEY = '23677415-8b63517f25821789cc6d2523e';

  constructor () {
    this.key = ApiServise.#KEY;
    this.base_url = ApiServise.#BASE_URL;
    this.searchQuery = '';
    this.page = 1;
    }

  async fetchRequest () {
    
    try {
      const response = await fetch(`${this.base_url}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.key}`)
      const data = await response.json();
        this.page += 1;
        return data.hits;
    } catch (error) {
      console.log(error);
    }
      
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export default new ApiServise();

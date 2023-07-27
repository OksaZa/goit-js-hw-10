const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_lBsztSVvUvwdFnMT96hk95a7UO9ug81Xnkl92qpYqmdL3hDpBmj3Wpe8bIj2x9aM';

export function fetchBreeds() {
    return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json(); 
        });       
};


export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });  
};
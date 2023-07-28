import axios from "axios";
axios.defaults.headers.common["x-api-key"] = 'live_lBsztSVvUvwdFnMT96hk95a7UO9ug81Xnkl92qpYqmdL3hDpBmj3Wpe8bIj2x9aM';
const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get(`${BASE_URL}/breeds`)
        .then(response => response.data);       
};


export function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(response => { return response.data; });
};


import axios from 'axios';

const API_URL = 'https://api.thecatapi.com/v1';

export const getBreeds = async () => {
    const response = await axios.get(`${API_URL}/breeds`);
    return response.data;
};

export const getBreedById = async (breedId: string) => {
    const response = await axios.get(`${API_URL}/breeds/${breedId}`);
    return response.data;
};

export const searchBreeds = async (query: string) => {
    const response = await axios.get(`${API_URL}/breeds/search?q=${query}`);
    return response.data;
};

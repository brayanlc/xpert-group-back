import axios from 'axios';

const API_URL = 'https://api.thecatapi.com/v1';
const API_KEY = process.env.CAT_API_KEY;

export const getImagesByBreedId = async (breedId: string) => {
  const response = await axios.get(
    `${API_URL}/images/search?limit=10&breed_ids=${breedId}&api_key=${API_KEY}`,
  );
  return response.data;
};

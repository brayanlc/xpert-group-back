import axios from 'axios';

const API_URL = 'https://api.thecatapi.com/v1';

export const getImagesByBreedId = async (breedId: string) => {
  // TODO: Replace REPLACE_ME with your API key
  const response = await axios.get(
    `${API_URL}/images/search?limit=10&breed_ids=${breedId}&api_key=REPLACE_ME`,
  );
  return response.data;
};

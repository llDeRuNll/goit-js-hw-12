import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '49397541-1939e7fe1ba522fc58da934d1';

export const fetchPhotos = async (query, page, perPage = 9) => {
  if (!query) return { hits: [], totalHits: 0 };

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    color: 'black',
    per_page: perPage,
    page: page,
  };

  try {
    const { data } = await axios.get('', { params });
    return {
      hits: data.hits.map(
        ({
          id,
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        })
      ),
      totalHits: data.totalHits,
    };
  } catch (error) {
    console.error('Error fetching photos:', error);
    return { hits: [], totalHits: 0 };
  }
};

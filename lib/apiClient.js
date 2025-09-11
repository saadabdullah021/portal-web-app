import axios from './axios';

export async function getListingBySlug(slug, language = 'en') {
  try {
    const response = await axios.get(`/get-listing?slug=${slug}`, {
      headers: {
        'Accept-Language': language
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching listing by slug:', error);
    throw error;
  }
}

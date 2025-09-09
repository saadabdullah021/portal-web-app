import axios from './axios';

export const getComponentData = async (componentId, offset = 0, perPage = 3, language = 'en') => {
  try {
    const response = await axios.get('/get-component-data', {
      params: {
        component_id: componentId,
        offset,
        perPage,
      },
      headers: {
        'Accept-Language': language
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching component data:', error);
    throw error;
  }
};

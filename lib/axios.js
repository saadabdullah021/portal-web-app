import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://guku.ai/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en', //  language
  },
  // timeout: 10000, 
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    const language =
      localStorage.getItem('i18nextLng') ||
      localStorage.getItem('language') ||
      'en';
    config.headers['Accept-Language'] = language;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

try {
  const storedLang =
    localStorage.getItem('i18nextLng') || localStorage.getItem('language');
  if (storedLang) {
    instance.defaults.headers['Accept-Language'] = storedLang;
  }
  window.addEventListener('storage', (e) => {
    if (e.key === 'i18nextLng' || e.key === 'language') {
      const newLang = e.newValue || 'en';
      instance.defaults.headers['Accept-Language'] = newLang;
    }
  });
} catch {}

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default instance;
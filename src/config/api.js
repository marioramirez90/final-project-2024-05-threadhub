const defaultApiUrl = 'https://threadhub-backend-lt0u.onrender.com';

export const API_URL = (import.meta.env.VITE_API_URL || defaultApiUrl).replace(/\/$/, '');
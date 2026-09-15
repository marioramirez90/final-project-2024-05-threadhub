const defaultApiUrl = 'https://threadhub-backend-lt0u.onrender.com';
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const apiUrl = configuredApiUrl || defaultApiUrl;

export const API_URL = `${/^https?:\/\//i.test(apiUrl) ? '' : 'https://'}${apiUrl}`.replace(
	/\/$/,
	'',
);
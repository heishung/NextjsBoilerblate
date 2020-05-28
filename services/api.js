import axios from 'axios';
import { apiBaseUrl } from 'configs/baseUrls';

// TODO: furef2. Research some best practice and refactor
// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export const callApi = async (query, options = {}) => {
  const fullUrl = query.indexOf(apiBaseUrl) === -1 ? apiBaseUrl + query : query;

  try {
    // TODO: axios missing defaults headers on client event when set from server
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios(fullUrl, {
      ...options,
      headers: {
        ...options.headers,
        ...defaultOptions.headers,
      },
    });
    return { response: response.data };
  } catch (error) {
    return { error: error.response.data.message || 'Something bad happened' };
  }
};

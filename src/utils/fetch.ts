const API_BASE_URL = 'https://foodflex-c0b021a422d7.herokuapp.com/';

// Utility function to add the authentication token to the headers
const createHeadersWithAuthorization = () => {
  const token = localStorage.getItem('token'); // Retrieve the authentication token from the local storage
  const headers = new Headers(); // Create new headers object
  headers.append('Content-Type', 'application/json');
  if (token) {
    headers.append('Authorization', `Bearer ${token}`); // If a token exists, add it to the Authorization header with the Bearer scheme
  }
  return headers;
};

// Utility function to perform fetch requests with updated headers
const fetchWithHeaders = (url: RequestInfo | URL, options = {}) => {
  const headers = createHeadersWithAuthorization(); // Get the headers with authorization token
  return fetch(`${API_BASE_URL}/${url}`, { ...options, headers }); // Fetch request with the provided URL and headers
};

// Utility function to perform GET requests with updated headers
const fetchGet = (url: string) => fetchWithHeaders(url);

// Utility function to perform POST requests with updated headers
const fetchPost = (url: string, data: string | object | number) => {
  return fetchWithHeaders(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Utility function to perform PATCH requests with updated headers
const fetchPatch = (url: string, data: string | object | number) => {
  return fetchWithHeaders(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};
// Utility function to perform DELETE requests with updated headers
const fetchDelete = (url: string) => {
  return fetchWithHeaders(url, {
    method: 'DELETE',
  });
};

// Export the utility functions for external use
export { fetchGet, fetchPost, fetchDelete, fetchPatch };

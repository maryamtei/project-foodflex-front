const API_BASE_URL = 'http://localhost:3000';

// Fonction utilitaire pour ajouter le token d'authentification aux headers
const createHeadersWithAuthorization = () => {
  const token = localStorage.getItem('token');
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  return headers;
};

// Fonction utilitaire pour effectuer les requêtes fetch avec les headers mis à jour
const fetchWithHeaders = (url: RequestInfo | URL, options = {}) => {
  const headers = createHeadersWithAuthorization();
  return fetch(`${API_BASE_URL}/${url}`, { ...options, headers });
};

// Fonction utilitaire pour effectuer les requêtes GET avec les headers mis à jour
const fetchGet = (url: any) => fetchWithHeaders(url);

// Function utilitaire pour effectuer les requêtes POST avec les headers mis à jour
const fetchPost = (url: any, data: any) => {
  return fetchWithHeaders(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// Exporter les fonctions utilitaires
export { fetchGet, fetchPost };

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const HASH = process.env.NEXT_PUBLIC_HASH;
const TS = process.env.NEXT_PUBLIC_TS;
/**
 * Función genérica para consumir la API de Marvel.
 * @param {string} endpoint - El endpoint a consumir (ej: 'characters', 'comics').
 * @param {number} limit - Número de resultados por página.
 * @param {number} offset - Número de resultados a omitir para la paginación.
 * @param {number} [id] - ID opcional para obtener un recurso específico.
 * @param {object} [filters] - Filtros adicionales (ej: { nameStartsWith: 'Spider' }).
 * @returns {Promise<any>} - Los datos de la API en formato JSON.
 */
export const fetchMarvelData = async (
  endpoint,
  limit = 20,
  offset = 0,
  id = null,
  filters = {}
) => {
  try {
    let url = `${API_BASE_URL}/${endpoint}?ts=${TS}&apikey=${API_KEY}&hash=${HASH}&limit=${limit}&offset=${offset}`;

    if (id) {
      url = `${API_BASE_URL}/${endpoint}/${id}?ts=${TS}&apikey=${API_KEY}&hash=${HASH}`;
    }

    const filterParams = new URLSearchParams(filters).toString();
    if (filterParams) {
      url += `&${filterParams}`;
    }

    console.log(`Fetching data from: ${url}`); // Verifica la URL
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} ${response.statusText} - ${errorData.message}`
      );
    }

    const data = await response.json();
    console.log('Data fetched:', data); // Muestra los datos obtenidos
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Función genérica para consumir la API de Marvel desde tu backend.
 * @param {string} endpoint - El endpoint a consumir (ej: 'characters', 'comics').
 * @param {number} limit - Número de resultados por página.
 * @param {number} offset - Número de resultados a omitir para la paginación.
 * @param {number|null} [id] - ID opcional para obtener un recurso específico.
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
    const params = new URLSearchParams({
      endpoint,
      limit: limit.toString(),
      offset: offset.toString(),
    });

    if (id !== null) {
      params.append('id', id.toString());
    }

    for (const key in filters) {
      params.append(key, filters[key]);
    }

    // ✅ Detectar si estamos en servidor
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' : '';
    const url = `${baseUrl}/api/marvel?${params.toString()}`;

    console.log(`Calling backend: ${url}`);

    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} ${response.statusText} - ${errorData.message}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Marvel data:`, error);
    throw error;
  }
};


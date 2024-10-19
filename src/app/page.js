'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState, Suspense } from 'react';
import { fetchMarvelData } from './services/marvelService';
import FilterBar from './components/FilterBar';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CharactersList() {
  const searchParams = useSearchParams(); // Para manejar parámetros de búsqueda
  const router = useRouter(); // Para manejar navegación programática
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');
  const [hasResults, setHasResults] = useState(false); // Verifica si hay resultados de búsqueda

  const page = parseInt(searchParams.get('page') || '1'); // Obtener página actual de los parámetros de URL
  const limit = 20;
  const offset = (page - 1) * limit;

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);
        const filters = query ? { nameStartsWith: query } : {}; // Filtrar solo si hay búsqueda
        const data = await fetchMarvelData('characters', limit, offset, null, filters);
        setCharacters(data.data.results);
        setTotalPages(Math.ceil(data.data.total / limit));
        setHasResults(query.length > 0); // Si hay búsqueda activa, activa hasResults
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, [page, query]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery); // Actualiza el query de búsqueda
    router.push(`/?page=1`); // Reinicia a la primera página
  };

  const resetSearch = () => {
    setQuery(''); // Reinicia la búsqueda
    router.push(`/?page=1`); // Navega a la primera página
  };

  if (loading) return <div className="text-center text-white">Cargando personajes...</div>;

  return (
    <div className="p-10 bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-center">Personajes</h1>

      {/* Barra de búsqueda */}
      <FilterBar
        onSearch={handleSearch}
        query={query}
        resetSearch={resetSearch}
        hasResults={hasResults}
      />

      {characters.length === 0 ? (
        <div className="text-center text-white mt-10">No se encontraron personajes.</div>
      ) : (
        <Suspense fallback={<div className="text-white">Cargando personajes...</div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {characters.map((character) => (
              <div key={character.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">{character.name}</h2>
                {character.thumbnail && (
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    className="w-full h-64 object-cover rounded-md mb-4"
                  />
                )}
                <button
                  onClick={() => router.push(`/characters/${character.id}`)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Ver más
                </button>
              </div>
            ))}
          </div>
        </Suspense>
      )}

      {/* Paginación */}
      <div className="flex justify-center space-x-4 mt-8">
        {page > 1 && (
          <button
            onClick={() => router.push(`/?page=${page - 1}`)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Anterior
          </button>
        )}
        <span className="text-lg font-medium">
          Página {page} de {totalPages}
        </span>
        {page < totalPages && (
          <button
            onClick={() => router.push(`/?page=${page + 1}`)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}

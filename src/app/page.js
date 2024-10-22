'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState, Suspense } from 'react';
import { fetchMarvelData } from './services/marvelService';
import FilterBar from './components/FilterBar';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CharactersContent() {
  const searchParams = useSearchParams();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  const limit = 20;
  const offset = (page - 1) * limit;

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);
        const filters = query ? { nameStartsWith: query } : {};
        const data = await fetchMarvelData('characters', limit, offset, null, filters);
        setCharacters(data.data.results);
        setTotalPages(Math.ceil(data.data.total / limit));
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCharacters();
  }, [page, query]);

  if (loading) return <div className="text-center text-white">Cargando personajes...</div>;

  return (
    <div className="p-10 bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-center">Personajes</h1>

      <FilterBar query={query} onSearch={(q) => setQuery(q)} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {characters.map((char) => (
          <div key={char.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{char.name}</h2>
            <img 
              src={`${char.thumbnail.path}.${char.thumbnail.extension}`} 
              alt={char.name} 
              className="w-full h-64 object-cover rounded-md"
            />
            <Link href={`/character/${char.id}`}>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 mt-4">
                Ver más
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center space-x-4 mt-8">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
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
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}

export default function CharactersPage() {
  return (
    <Suspense fallback={<div className="text-center text-white">Cargando personajes...</div>}>
      <CharactersContent />
    </Suspense>
  );
}

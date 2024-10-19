'use client';
import { useEffect, useState } from 'react';
import { fetchMarvelData } from '../services/marvelService';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CreatorsList() {
  const searchParams = useSearchParams();
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = 20; // Mostramos 20 creadores por página
  const offset = (page - 1) * limit;

  useEffect(() => {
    async function fetchCreators() {
      try {
        const data = await fetchMarvelData('creators', limit, offset);
        setCreators(data.data.results);
        setTotalPages(Math.ceil(data.data.total / limit));
      } catch (error) {
        console.error('Error fetching creators:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCreators();
  }, [page]);

  if (loading) {
    return <div className="text-center text-white">Cargando creadores...</div>;
  }

  return (
    <div className="p-10 bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-center">Creadores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {creators.map((creator) => (
          <div key={creator.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{creator.fullName}</h2>
            {creator.thumbnail ? (
              <img
                src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`}
                alt={creator.fullName}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            ) : (
              <img
                src="/placeholder-image.png" // Imagen de marcador de posición
                alt="Imagen no disponible"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            <Link href={`/creators/${creator.id}`}>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
                Ver más
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-8">
        {page > 1 && (
          <Link href={`?page=${page - 1}`}>
            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Anterior</button>
          </Link>
        )}
        <span className="text-lg font-medium">Página {page} de {totalPages}</span>
        {page < totalPages && (
          <Link href={`?page=${page + 1}`}>
            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">Siguiente</button>
          </Link>
        )}
      </div>
    </div>
  );
}
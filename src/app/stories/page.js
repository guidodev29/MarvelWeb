'use client';
export const dynamic = 'force-dynamic';
import { Suspense, useEffect, useState } from 'react';
import { fetchMarvelData } from '../services/marvelService';
import { useRouter, useSearchParams } from 'next/navigation';

export default function StoriesList() {
  const searchParams = useSearchParams(); // Obtener los parámetros de búsqueda
  const router = useRouter(); // Navegación programática

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const page = parseInt(searchParams.get('page') || '1'); // Página actual desde la URL
  const limit = 20;
  const offset = (page - 1) * limit;

  useEffect(() => {
    async function fetchStories() {
      try {
        setLoading(true); // Mostrar estado de carga
        const data = await fetchMarvelData('stories', limit, offset);
        setStories(data.data.results);
        setTotalPages(Math.ceil(data.data.total / limit));
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false); // Ocultar estado de carga
      }
    }
    fetchStories();
  }, [page]);

  if (loading) {
    return <div className="text-center text-white">Cargando historias...</div>;
  }

  return (
    <Suspense fallback={<div className="text-center text-white">Cargando...</div>}>
    <div className="p-10 bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-center">Historias</h1>

      {/* Suspense para manejar la carga del contenido */}
      <Suspense fallback={<div className="text-center text-white">Cargando historias...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{story.title || 'Sin título'}</h2>
              <button
                onClick={() => router.push(`/stories/${story.id}`)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Ver más
              </button>
            </div>
          ))}
        </div>
      </Suspense>

      {/* Paginación */}
      <div className="flex justify-center space-x-4 mt-8">
        {page > 1 && (
          <button
            onClick={() => router.push(`?page=${page - 1}`)}
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
            onClick={() => router.push(`?page=${page + 1}`)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
    </Suspense>
  );
}

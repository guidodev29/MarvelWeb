'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState, Suspense } from 'react';
import { fetchMarvelData } from '../services/marvelService';
import { useRouter, useSearchParams } from 'next/navigation';

function StoriesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  useEffect(() => {
    async function fetchStories() {
      try {
        const data = await fetchMarvelData('stories', limit, offset);
        setStories(data.data.results);
        setTotalPages(Math.ceil(data.data.total / limit));
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, [page]);

  if (loading) return <div className="text-center text-white">Cargando historias...</div>;

  return (
    <div className="p-10 bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-center">Historias</h1>
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
    </div>
  );
}

export default function StoriesPage() {
  return (
    <Suspense fallback={<div className="text-center text-white">Cargando historias...</div>}>
      <StoriesContent />
    </Suspense>
  );
}

import { fetchMarvelData } from '../../services/marvelService';
import Link from 'next/link';

export default async function StoryDetail({ params }) {
  const { id } = params;
  const data = await fetchMarvelData('stories', 1, 0, id);
  const story = data?.data?.results?.[0];

  if (!story) {
    return <div className="text-center text-red-500 mt-10">Historia no encontrada.</div>;
  }

  return (
    <div className="p-10 bg-gradient-to-br from-gray-800 to-black min-h-screen text-white">
      <Link href="/stories">
        <button className="mb-8 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
          ← Volver a la lista
        </button>
      </Link>
      <h1 className="text-5xl font-extrabold mb-4">{story.title || 'Sin título'}</h1>
      <p className="text-lg mb-4">Tipo: {story.type || 'Desconocido'}</p>
      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Comics:</h2>
      <ul className="list-disc list-inside">
        {story.comics.items.map((comic) => (
          <li key={comic.resourceURI}>{comic.name}</li>
        ))}
      </ul>
    </div>
  );
}

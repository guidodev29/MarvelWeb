import { fetchMarvelData } from '../../services/marvelService';
import Link from 'next/link';

export default async function CreatorDetail({ params }) {
  const { id } = params;
  const data = await fetchMarvelData('creators', 1, 0, id);
  const creator = data?.data?.results?.[0];

  if (!creator) {
    return <div className="text-center text-red-500 mt-10">Creador no encontrado.</div>;
  }

  return (
    <div className="p-10 bg-gradient-to-br from-gray-800 to-black min-h-screen text-white">
      <Link href="/creators">
        <button className="mb-8 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
          ← Volver a la lista
        </button>
      </Link>
      
      <h1 className="text-5xl font-extrabold mb-4">{creator.fullName}</h1>

      {creator.thumbnail ? (
        <img
          src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`}
          alt={creator.fullName}
          className="w-full h-96 object-cover rounded-md mb-4"
        />
      ) : (
        <img
          src="/placeholder-image.png" // Imagen por defecto en caso de no tener thumbnail
          alt="Imagen no disponible"
          className="w-full h-96 object-cover rounded-md mb-4"
        />
      )}

      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Series:</h2>
      <ul className="list-disc list-inside mb-6">
        {creator.series.items.map((serie) => (
          <li key={serie.resourceURI}>{serie.name}</li>
        ))}
      </ul>

      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Historias:</h2>
      <ul className="list-disc list-inside mb-6">
        {creator.stories.items.map((story) => (
          <li key={story.resourceURI}>{story.name}</li>
        ))}
      </ul>

      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Comics:</h2>
      <ul className="list-disc list-inside mb-6">
        {creator.comics.items.map((comic) => (
          <li key={comic.resourceURI}>{comic.name}</li>
        ))}
      </ul>

      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Eventos:</h2>
      <ul className="list-disc list-inside">
        {creator.events.items.map((event) => (
          <li key={event.resourceURI}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
}

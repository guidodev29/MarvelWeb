import { fetchMarvelData } from '../../services/marvelService';
import Link from 'next/link';

export default async function SeriesDetail({ params }) {
  const { id } = params;
  const data = await fetchMarvelData('series', 1, 0, id);
  const series = data?.data?.results?.[0];

  if (!series) {
    return <div className="text-center text-red-500 mt-10">Serie no encontrada.</div>;
  }

  return (
    <div className="p-10 bg-gradient-to-br from-gray-800 to-black min-h-screen text-white">
      <Link href="/series">
        <button className="mb-8 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
          ← Volver a la lista
        </button>
      </Link>
      
      <h1 className="text-5xl font-extrabold mb-4">{series.title}</h1>

      {series.thumbnail ? (
        <img
          src={`${series.thumbnail.path}.${series.thumbnail.extension}`}
          alt={series.title}
          className="w-full h-96 object-cover rounded-md mb-4"
        />
      ) : (
        <img
          src="/placeholder-image.png" // Imagen de marcador de posición
          alt="Imagen no disponible"
          className="w-full h-96 object-cover rounded-md mb-4"
        />
      )}

      <p className="text-lg mb-4">
        {series.description || 'No hay descripción disponible.'}
      </p>

      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Comics:</h2>
      <ul className="list-disc list-inside mb-6">
        {series.comics.items.map((comic) => (
          <li key={comic.resourceURI}>{comic.name}</li>
        ))}
      </ul>

      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Historias:</h2>
      <ul className="list-disc list-inside mb-6">
        {series.stories.items.map((story) => (
          <li key={story.resourceURI}>{story.name} (Tipo: {story.type})</li>
        ))}
      </ul>

      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Eventos:</h2>
      <ul className="list-disc list-inside mb-6">
        {series.events.items.map((event) => (
          <li key={event.resourceURI}>{event.name}</li>
        ))}
      </ul>

      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Enlaces:</h2>
      <ul className="list-disc list-inside">
        {series.urls.map((url, index) => (
          <li key={index}>
            <a href={url.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              {url.type}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
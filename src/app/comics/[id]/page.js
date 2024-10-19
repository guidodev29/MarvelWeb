import { fetchMarvelData } from '../../services/marvelService';
import Link from 'next/link';

export default async function ComicDetail({ params }) {
  const { id } = params;
  const data = await fetchMarvelData('comics', 1, 0, id);
  const comic = data?.data?.results?.[0];

  if (!comic) {
    return <div className="text-center text-red-500 mt-10">Cómic no encontrado.</div>;
  }

  return (
    <div className="p-10 bg-gradient-to-br from-gray-800 to-black min-h-screen text-white">
      <Link href="/comics">
        <button className="mb-8 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
          ← Volver a la lista
        </button>
      </Link>

      <h1 className="text-5xl font-extrabold mb-4">{comic.title}</h1>

      {comic.thumbnail ? (
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          className="w-full h-96 object-cover rounded-md mb-4"
        />
      ) : (
        <img
          src="/placeholder-image.png" // Imagen por defecto en caso de no tener thumbnail
          alt="Imagen no disponible"
          className="w-full h-96 object-cover rounded-md mb-4"
        />
      )}

      <p className="text-lg mb-4">
        {comic.description || 'No hay descripción disponible.'}
      </p>

      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Personajes:</h2>
      <ul className="list-disc list-inside mb-6">
        {comic.characters.items.map((character) => (
          <li key={character.resourceURI}>{character.name}</li>
        ))}
      </ul>

      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Series:</h2>
      <p className="mb-6">{comic.series.name}</p>

      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Historias:</h2>
      <ul className="list-disc list-inside mb-6">
        {comic.stories.items.map((story) => (
          <li key={story.resourceURI}>
            {story.name} (Tipo: {story.type})
          </li>
        ))}
      </ul>

      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Enlaces:</h2>
      <ul className="list-disc list-inside">
        {comic.urls.map((url, index) => (
          <li key={index}>
            <a
              href={url.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {url.type}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

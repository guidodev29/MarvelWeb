import { fetchMarvelData } from '../../services/marvelService';
import Link from 'next/link';

export default async function CharacterDetail({ params }) {
  const { id } = params; // Extraer 'id' de los parámetros

  const data = await fetchMarvelData('characters', 1, 0, id);
  const character = data?.data?.results?.[0] || null;

  if (!character) {
    return (
      <div className="text-center text-red-500 mt-10">
        Personaje no encontrado.
      </div>
    );
  }

  return (
    <div className="p-10 bg-gradient-to-br from-gray-800 to-black min-h-screen text-white">
      <Link href="/">
        <button className="mb-8 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg">
          ← Volver a la lista
        </button>
      </Link>

      <h1 className="text-5xl font-extrabold mb-4">{character.name}</h1>

      {character.thumbnail ? (
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="w-full h-96 object-cover rounded-md mb-4"
        />
      ) : (
        <img
          src="/character-image.png"
          alt="Imagen no disponible"
          className="w-full h-96 object-cover rounded-md mb-4"
        />
      )}

      <p className="text-lg mb-4">
        {character.description || 'No hay descripción disponible.'}
      </p>

      <h2 className="text-3xl font-semibold text-yellow-400 mb-2">Comics:</h2>
      <ul className="list-disc list-inside mb-6">
        {character.comics.items.map((comic) => (
          <li key={comic.resourceURI}>{comic.name}</li>
        ))}
      </ul>
    </div>
  );
}

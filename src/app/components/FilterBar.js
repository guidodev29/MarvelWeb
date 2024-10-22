import { useState, useEffect } from 'react';

const FilterBar = ({ onSearch, query, resetSearch, hasResults }) => {
  const [searchInput, setSearchInput] = useState('');

  // Sincroniza el input de búsqueda con el query
  useEffect(() => {
    setSearchInput(query || '');
  }, [query]);

  const handleSearch = () => {
    if (searchInput.trim() !== '') {
      onSearch(searchInput); // Ejecuta la búsqueda si hay texto
    }
  };

  const handleReset = () => {
    setSearchInput(''); // Limpia el campo de texto
    resetSearch(); // Resetea la búsqueda y vuelve al inicio
  };

  return (
    <div className="flex justify-center items-center space-x-4 mb-8">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Buscar..."
        className="p-2 rounded w-64 text-black"
      />
      {hasResults ? (
        <button
          onClick={handleReset}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Ir al inicio
        </button>
      ) : (
        <button
          onClick={handleSearch}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      )}
    </div>
  );
};

export default FilterBar;

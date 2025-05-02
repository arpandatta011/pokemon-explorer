import React from 'react';
import { usePokemon } from '../contexts/PokemonContext';
import PokemonCard from '../components/PokemonCard';

function Favorites() {
  const { pokemon, favorites } = usePokemon();
  const favoritePokemon = pokemon.filter(p => favorites.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Favorite Pokémon</h2>
      {favoritePokemon.length === 0 ? (
        <div className="text-center text-gray-600 py-8">
          You haven't added any Pokémon to your favorites yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoritePokemon.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
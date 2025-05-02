import React, { useState } from 'react';
import { usePokemon } from '../contexts/PokemonContext';

function CompareView() {
  const { pokemon } = usePokemon();
  const [pokemon1Id, setPokemon1Id] = useState('');
  const [pokemon2Id, setPokemon2Id] = useState('');

  const pokemon1 = pokemon.find(p => p.id === Number(pokemon1Id));
  const pokemon2 = pokemon.find(p => p.id === Number(pokemon2Id));

  const renderStatComparison = (stat1, stat2, statName) => {
    const max = Math.max(stat1, stat2);
    return (
      <div className="mb-4">
        <div className="font-semibold mb-2 capitalize">{statName}</div>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded">
              <div
                className="h-4 bg-blue-500 rounded"
                style={{ width: `${(stat1 / 255) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm mt-1">{stat1}</div>
          </div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded">
              <div
                className="h-4 bg-red-500 rounded"
                style={{ width: `${(stat2 / 255) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm mt-1">{stat2}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Compare Pokémon</h2>
      <div className="flex gap-4 mb-8">
        <select
          value={pokemon1Id}
          onChange={(e) => setPokemon1Id(e.target.value)}
          className="flex-1 p-2 border rounded"
        >
          <option value="">Select first Pokémon</option>
          {pokemon.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <select
          value={pokemon2Id}
          onChange={(e) => setPokemon2Id(e.target.value)}
          className="flex-1 p-2 border rounded"
        >
          <option value="">Select second Pokémon</option>
          {pokemon.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {pokemon1 && pokemon2 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <img
                src={pokemon1.sprites.other['official-artwork'].front_default}
                alt={pokemon1.name}
                className="w-48 h-48 mx-auto"
              />
              <h3 className="text-xl font-bold mt-4 capitalize">{pokemon1.name}</h3>
            </div>
            <div className="text-center">
              <img
                src={pokemon2.sprites.other['official-artwork'].front_default}
                alt={pokemon2.name}
                className="w-48 h-48 mx-auto"
              />
              <h3 className="text-xl font-bold mt-4 capitalize">{pokemon2.name}</h3>
            </div>
          </div>

          <div className="space-y-6">
            {pokemon1.stats.map((stat, index) => (
              renderStatComparison(
                stat.base_stat,
                pokemon2.stats[index].base_stat,
                stat.stat.name
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CompareView;
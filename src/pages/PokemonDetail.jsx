import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usePokemon } from "../contexts/PokemonContext";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import RandomPokemon from "../components/RandomPokemon"; // ✅ Correct import

function PokemonDetail() {
  const { id } = useParams();
  const { favorites, toggleFavorite } = usePokemon();
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = await response.json();

        const speciesResponse = await fetch(pokemonData.species.url);
        const speciesData = await speciesResponse.json();

        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        setPokemon(pokemonData);
        setEvolution(evolutionData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemon details:", error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!pokemon) {
    return <div>Pokemon not found</div>;
  }

  const isFavorite = favorites.includes(pokemon.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center flex-col sm:flex-row gap-2 ">
        <Link
          to="/"
          className="flex items-center text-amber-600 hover:text-amber-700"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to List
        </Link>
        <RandomPokemon />
      </div>

      <div className="relative bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={() => toggleFavorite(pokemon.id)}
          className="absolute top-4 right-4 p-2 rounded-full transition"
        >
          {isFavorite ? (
            <HeartSolidIcon className="h-6 w-6 text-red-500 hover:text-red-600" />
          ) : (
            <HeartOutlineIcon className="h-6 w-6 text-gray-400 hover:text-gray-500" />
          )}
        </button>

        <div className="flex flex-col md:flex-row items-center mb-6">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-64 h-64 object-contain mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold capitalize mb-2">
              {pokemon.name} #{pokemon.id.toString().padStart(3, "0")}
            </h1>
            <div className="flex gap-2 mb-4">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className="px-3 py-1 rounded-full text-white text-sm capitalize"
                  style={{
                    backgroundColor: `var(--${type.type.name}-color, #888)`,
                  }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Stats</h2>
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="capitalize">{stat.stat.name}</span>
                  <span>{stat.base_stat}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-amber-500 rounded"
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Abilities</h2>
            <ul className="space-y-2">
              {pokemon.abilities.map((ability) => (
                <li
                  key={ability.ability.name}
                  className="capitalize bg-gray-100 p-2 rounded"
                >
                  {ability.ability.name}
                  {ability.is_hidden && (
                    <span className="text-sm text-gray-500 ml-2"></span>
                  )}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-4">Moves</h2>
            <div className="max-h-48 overflow-y-auto">
              <ul className="grid grid-cols-2 gap-2">
                {pokemon.moves.slice(0, 20).map((move) => (
                  <li
                    key={move.move.name}
                    className="capitalize bg-gray-100 p-2 rounded text-sm"
                  >
                    {move.move.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;

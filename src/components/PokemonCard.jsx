import React from "react";
import { Link } from "react-router-dom";

const typeColors = {
  normal: "bg-gray-400",
  fighting: "bg-red-700",
  flying: "bg-blue-400",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  rock: "bg-yellow-700",
  bug: "bg-green-400",
  ghost: "bg-purple-700",
  steel: "bg-gray-500",
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  psychic: "bg-pink-500",
  ice: "bg-blue-200",
  dragon: "bg-purple-600",
  dark: "bg-gray-700",
  fairy: "bg-pink-400",
};

function PokemonCard({ pokemon }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/pokemon/${pokemon.id}`}>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
            <span className="text-gray-500">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>
          </div>
          <div className="flex justify-center mb-4">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-32 h-32 object-contain"
            />
          </div>
          <div className="flex gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className={`${
                  typeColors[type.type.name]
                } text-white px-3 py-1 rounded-full text-sm capitalize`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PokemonCard;

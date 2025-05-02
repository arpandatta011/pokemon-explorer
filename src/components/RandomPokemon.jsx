import React from "react";
import { usePokemon } from "../contexts/PokemonContext";
import { useNavigate } from "react-router-dom";

function RandomPokemon() {
  const { getRandomPokemon } = usePokemon();
  const navigate = useNavigate();

  const handleRandomClick = () => {
    const randomPokemon = getRandomPokemon();
    if (randomPokemon) {
      navigate(`/pokemon/${randomPokemon.id}`);
    }
  };
  return (
    <button
      onClick={handleRandomClick}
      className="text-sm bg-amber-500 text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors cursor-pointer w-full sm:w-auto sm:ml-auto sm:text-base sm:px-6 sm:py-1"
    >
      Random Pokémon
    </button>
  );
}

export default RandomPokemon;

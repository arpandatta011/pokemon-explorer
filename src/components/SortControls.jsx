import React from "react";
import { usePokemon } from "../contexts/PokemonContext";

function SortControls() {
  const { sortBy, setSortBy } = usePokemon();

  return (
    <div className="w-full md:w-48">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
      >
        <option value="id">ID (Default)</option>
        <option value="name">Name (A-Z)</option>
        <option value="nameDesc">Name (Z-A)</option>
      </select>
    </div>
  );
}

export default SortControls;

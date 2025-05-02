import React, { useState, useMemo } from "react";
import { usePokemon } from "../contexts/PokemonContext";
import PokemonList from "../components/PokemonList";
import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";
import SortControls from "../components/SortControls";
import RandomPokemon from "../components/RandomPokemon";
import Pagination from "../components/Pagination";

function HomePage() {
  const { pokemon, loading, error, page, itemsPerPage, sortBy } = usePokemon();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const filteredAndSortedPokemon = useMemo(() => {
    let filtered = pokemon.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTypes =
        selectedTypes.length === 0 ||
        selectedTypes.every((type) =>
          p.types.some((t) => t.type.name === type)
        );
      return matchesSearch && matchesTypes;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        default:
          return a.id - b.id;
      }
    });
  }, [pokemon, searchTerm, selectedTypes, sortBy]);

  const paginatedPokemon = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredAndSortedPokemon.slice(start, end);
  }, [filteredAndSortedPokemon, page, itemsPerPage]);

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <TypeFilter
          selectedTypes={selectedTypes}
          onTypesChange={setSelectedTypes}
        />
        <SortControls />
        <RandomPokemon />
      </div>
      <PokemonList pokemon={paginatedPokemon} loading={loading} />
      <Pagination totalItems={filteredAndSortedPokemon.length} />
    </div>
  );
}

export default HomePage;

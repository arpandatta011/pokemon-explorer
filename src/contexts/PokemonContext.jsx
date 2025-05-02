import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const PokemonContext = createContext();

export function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState("id");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const fetchPokemon = useCallback(async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=150"
      );
      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );

      setPokemon(pokemonDetails);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch Pokémon data");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((pokemonId) => {
    setFavorites((prev) =>
      prev.includes(pokemonId)
        ? prev.filter((id) => id !== pokemonId)
        : [...prev, pokemonId]
    );
  }, []);

  const getRandomPokemon = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * pokemon.length);
    return pokemon[randomIndex];
  }, [pokemon]);

  const value = {
    pokemon,
    favorites,
    loading,
    error,
    page,
    itemsPerPage,
    sortBy,
    selectedTypes,
    setPage,
    setItemsPerPage,
    setSortBy,
    setSelectedTypes,
    toggleFavorite,
    getRandomPokemon,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
}

export function usePokemon() {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
}

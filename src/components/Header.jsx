import React from "react";

function Header() {
  return (
    <header className="bg-amber-500 bg-gradient-to-br from-amber-500 to-yellow-400 shadow-lg">
      <div className="container mx-auto px-5 py-5 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Pokémon <span className="text-yellow-100">Explorer</span>
        </h1>
      </div>
    </header>
  );
}

export default Header;

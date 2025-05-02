import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const allTypes = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

function DropdownCheckboxFilter({ selectedTypes, onTypesChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypesChange([...selectedTypes, type]);
    }
  };

  return (
    <div className="relative w-full sm:w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white shadow rounded-md px-3 py-2 flex justify-between items-center text-sm text-gray-700 hover:bg-gray-50"
      >
        {selectedTypes.length === 0
          ? "Filter by Type"
          : selectedTypes.join(", ")}
        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg max-h-64 overflow-y-auto p-2 border border-gray-200">
          {allTypes.map((type) => (
            <label
              key={type}
              className="flex items-center space-x-2 px-2 py-1 cursor-pointer hover:bg-gray-100 rounded text-sm capitalize"
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
                className="accent-amber-500"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownCheckboxFilter;

import React from "react";
import { useIngredientStore } from "../store/useIngredientStore";

const CenterBowl: React.FC = () => {
  const baseType = useIngredientStore((state) => state.baseType);
  const setBaseType = useIngredientStore((state) => state.setBaseType);
  const slots = useIngredientStore((state) => state.slots);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const clearSelection = useIngredientStore((state) => state.clearSelection);

  const activeIngredients = Object.values(slots).filter(
    (i): i is NonNullable<typeof i> => i !== null
  );

  // haetaan pohjan kuva storesta
  const baseIngredient = slots["base"];

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-100 mt-4 lg:mt-0">
      
      {/* Base selection */}
      <div className="flex gap-3 mb-6 items-center">
        <button
          onClick={() => setBaseType(1)}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            baseType === 1
              ? "bg-zinc-800 text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Salaatti
        </button>

        <button
          onClick={() => setBaseType(2)}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            baseType === 2
              ? "bg-zinc-800 text-white"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          Rahka
        </button>

        <span>🥗</span>
        <span>🥣</span>
      </div>

      {/* Icon buttons above bowl */}
      <div className="flex gap-4 mb-3">
        <button
          onClick={() => alert('Feature coming soon!')}
          className="text-xl p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title="Undo"
        >
          ↩️
        </button>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to empty the bowl?')) {
              clearSelection();
            }
          }}
          className="text-xl p-2 rounded-lg hover:bg-red-50 transition-colors"
          title="Clear bowl"
        >
          🗑️
        </button>
        <button
          onClick={() => alert('Feature coming soon!')}
          className="text-xl p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title="Save"
        >
          💾
        </button>
      </div>

      {/* Bowl - position relative et absoluuttiset kuvat pysyy sisällä */}
      <div className="relative w-80 h-80 rounded-full border-4 border-gray-200 bg-gray-50 shadow-inner overflow-hidden">

        {/* Pohjan kuva z-10 - näkyy taustalla */}
        {baseIngredient?.image_url && (
          <img
            src={baseIngredient.image_url}
            alt={baseIngredient.name}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}

        {/* Divider kuva z-20 - näkyy pohjan päällä */}
        {selectedBowl?.wedge_image_url && (
          <img
            src={selectedBowl.wedge_image_url}
            alt="divider"
            className="absolute inset-0 w-full h-full object-cover z-20"
          />
        )}

        {/* Ainesosat z-30 - näkyy päällimmäisenä */}
        <div className="absolute inset-0 z-30 flex flex-wrap items-center justify-center gap-2 p-4">
          {activeIngredients.length === 0 ? (
            <span className="text-gray-400">Kulho on tyhjä</span>
          ) : (
            activeIngredients.map((ingredient) => (
              <span
                key={ingredient.id}
                className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm"
              >
                {ingredient.name}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 flex flex-col items-center">
        <span>100 g / 1,99 €</span>
        <span className="text-gray-500">
          {selectedBowl ? selectedBowl.volume : 0} ml
        </span>
      </div>
    </div>
  );
};

export default CenterBowl;
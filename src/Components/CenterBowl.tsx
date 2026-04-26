import React from "react";
import { useDroppable } from '@dnd-kit/core'; 
import { useIngredientStore } from "../store/useIngredientStore";

const CenterBowl: React.FC = () => {
  const baseType = useIngredientStore((state) => state.baseType);
  const setBaseType = useIngredientStore((state) => state.setBaseType);
  const slots = useIngredientStore((state) => state.slots);
  const selectedBowl = useIngredientStore((state) => state.selectedBowl);
  const clearSelection = useIngredientStore((state) => state.clearSelection);
  const clearSlot = useIngredientStore((state) => state.clearSlot);
  const undo = useIngredientStore((state) => state.undo);

  // bowl on droppable alue
  const { setNodeRef, isOver } = useDroppable({ id: 'bowl-drop' });

  const baseIngredient = slots["base"];

  const ingredientSlots = Object.entries(slots).filter(
    ([key]) => key !== "base"
  );

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
          onClick={() => undo()}
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

      {/* Bowl - useDroppable ref ja isOver highlight */}
      <div
        ref={setNodeRef}
        className={`relative w-80 h-80 rounded-full border-4 shadow-inner overflow-hidden transition-colors ${
          isOver
            ? "border-[#A2D135] bg-green-50"
            : "border-gray-200 bg-gray-50"
        }`}
      >

        {/* Pohjan kuva z-10 */}
        {baseIngredient?.image_url && (
          <img
            src={baseIngredient.image_url}
            alt={baseIngredient.name}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}

        {/* Divider z-20 */}
        {selectedBowl && (
          <img
            src={
              selectedBowl.slot_count === 4
                ? "https://www.cc.puv.fi/~asa/fresh/images/jakaja_4_lohkoa.png"
                : "https://www.cc.puv.fi/~asa/fresh/images/jakaja_6_lohkoa.png"
            }
            alt="divider"
            className="absolute inset-0 w-full h-full object-cover z-20"
          />
        )}

        {/* Ainesosat wedge-kuvina z-30 */}
        {ingredientSlots.map(([slotKey, ingredient]) =>
          ingredient?.wedge_image_url ? (
            <div key={slotKey} className="absolute inset-0 z-30">
              <img
                src={ingredient.wedge_image_url}
                alt={ingredient.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => clearSlot(slotKey)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-red-700"
              >
                ×
              </button>
            </div>
          ) : null
        )}

        {/* Tyhjä teksti */}
        {ingredientSlots.every(([, i]) => i === null) && !baseIngredient && (
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <span className="text-gray-400">Pudota ainesosa tähän</span>
          </div>
        )}
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
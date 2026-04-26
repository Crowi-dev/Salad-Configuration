import React from 'react';
import { type Ingredient } from '../types';
import { useIngredientStore } from '../store/useIngredientStore';

interface Props {
  ingredients: Ingredient[];
}

const BaseSelection: React.FC<Props> = ({ ingredients }) => {
  const slots = useIngredientStore((state) => state.slots);
  const addIngredient = useIngredientStore((state) => state.addIngredient);

  const selectedBase = slots["base"];

  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">

      <div className="flex flex-col items-center mb-6 w-full">
        <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
          2
        </div>
        <h2 className="text-xl font-bold uppercase text-center">
          Valitse salaattipohja
        </h2>
      </div>

      <div className="w-full flex flex-col gap-3">
        {ingredients.map((ingredient) => {
          const isSelected = selectedBase?.id === ingredient.id;

          return (
            <button
              key={ingredient.id}
              onClick={() => addIngredient(ingredient)}
              className={`border-b pb-2 flex items-center gap-3 w-full text-left transition-colors ${
                isSelected
                  ? "border-[#A2D135] text-[#A2D135]"
                  : "border-gray-600 text-white hover:border-gray-400"
              }`}
            >
              {/* nimi vasemmalla */}
              <span className="flex-1 text-sm font-semibold">{ingredient.name}</span>

              {/* pyöreä kuva oikealla */}
              {ingredient.image_url ? (
                <img
                  src={ingredient.image_url}
                  alt={ingredient.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-600 shrink-0" />
              )}

              {/* aktiivinen indikaattori */}
              <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center shrink-0 ${
                isSelected ? "border-[#A2D135]" : "border-gray-400"
              }`}>
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#A2D135]" />}
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default BaseSelection;
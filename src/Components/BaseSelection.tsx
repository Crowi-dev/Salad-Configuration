import React from 'react';
import { type Ingredient } from '../types';
import { useIngredientStore } from '../store/useIngredientStore';

interface Props {
  ingredients: Ingredient[];
}

const BaseSelection: React.FC<Props> = ({ ingredients }) => {
  const slots = useIngredientStore((state) => state.slots);
  const addIngredient = useIngredientStore((state) => state.addIngredient);

  // haetaan valittu pohja storesta
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

      <div className="w-full flex flex-col gap-6">
        {ingredients.map((ingredient) => {
          const isSelected = selectedBase?.id === ingredient.id;

          return (
            <button
              key={ingredient.id}
              onClick={() => addIngredient(ingredient)}
              className={`border-b pb-2 flex justify-end gap-4 items-center w-full text-left transition-colors ${
                isSelected
                  ? "border-[#A2D135] text-[#A2D135]"
                  : "border-gray-600 text-white"
              }`}
            >
              <span className="mr-auto">{ingredient.name}</span>
              <span className="text-sm text-gray-400">
                {ingredient.price ? `${ingredient.price}€` : '0,00€'}
              </span>
              {/* aktiivinen indikaattori */}
              <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
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
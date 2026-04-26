import React from 'react';
import { type Ingredient } from '../types';
import { useIngredientStore } from '../store/useIngredientStore';
import { usePriceStore } from '../store/usePriceStore';
import { useAuthStore } from '../store/useAuthStore';

interface Props {
  ingredient: Ingredient;
}

const IngredientCard: React.FC<Props> = ({ ingredient }) => {
  const addIngredient = useIngredientStore((state) => state.addIngredient);
  const prices = usePriceStore((state) => state.prices);
  const token = useAuthStore((state) => state.token);


  const priceItem = prices.find((p) => p.item_id === ingredient.id);

  return (
    <button
      onClick={() => addIngredient(ingredient)}
      className="w-36 aspect-square bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between text-left cursor-pointer"
    >
      
      {/* nimen näyttö kortin keskellä */}
      <div className="flex-1 flex items-center justify-center text-center">
        <span className="text-sm font-semibold text-gray-800">
          {ingredient.name}
        </span>
      </div>

      {/* hinta */}
      <div className="text-center text-xs font-medium mt-1">
        {token ? (
          priceItem ? (
            <span className="text-green-700">+ {priceItem.price.toFixed(2)} €</span>
          ) : (
            <span className="text-gray-400">No price available</span>
          )
        ) : (
          <span className="text-gray-400 italic">Login to see price</span>
        )}
      </div>

      {/* loopataan dieettitägit ja näytetään ne */}
      <div className="flex justify-center gap-1 flex-wrap">
        {ingredient.diets.map((diet) => (
          <span
            key={diet}
            className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium"
          >
            {diet}
          </span>
        ))}
      </div>

    </button>
  );
};

export default IngredientCard;
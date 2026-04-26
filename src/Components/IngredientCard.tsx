import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
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

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `ingredient-${ingredient.id}`,
    data: { ingredient },
  });

  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => addIngredient(ingredient)}
      className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition flex flex-row items-center gap-3 p-2 text-left cursor-grab active:cursor-grabbing w-full ${
        isDragging ? "opacity-50 z-50 shadow-xl" : ""
      }`}
    >
      {ingredient.image_url ? (
        <img
          src={ingredient.image_url}
          alt={ingredient.name}
          className="w-14 h-14 rounded-lg object-cover shrink-0"
        />
      ) : (
        <div className="w-14 h-14 rounded-lg bg-gray-100 shrink-0" />
      )}

      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-sm font-semibold text-gray-800 truncate">
          {ingredient.name}
        </span>

        <span className="text-xs mt-0.5">
          {token ? (
            priceItem ? (
              <span className="text-green-700">+ {priceItem.price.toFixed(2)} €</span>
            ) : (
              <span className="text-gray-400">-</span>
            )
          ) : (
            <span className="text-gray-400 italic">Login to see price</span>
          )}
        </span>

        <div className="flex gap-1 flex-wrap mt-1">
          {ingredient.diets.map((diet) => (
            <span
              key={diet}
              className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium"
            >
              {diet}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

export default IngredientCard;
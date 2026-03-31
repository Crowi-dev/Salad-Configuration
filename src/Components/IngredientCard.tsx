import { type Ingredient } from '../types';

interface Props {
  ingredient: Ingredient;
}

const IngredientCard: React.FC<Props> = ({ ingredient }) => {
  return (
    <div className="w-36 aspect-square bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between">
      
      {/* Name */}
      <div className="flex-1 flex items-center justify-center text-center">
        <span className="text-sm font-semibold text-gray-800">
          {ingredient.name}
        </span>
      </div>

      {/* Diet tags */}
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

    </div>
  );
};

export default IngredientCard;
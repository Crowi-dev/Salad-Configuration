import { useState, useEffect } from 'react';

import Header from '../Components/Header';
import BowlSelection from '../Components/BowlSelection';
import CenterBowl from '../Components/CenterBowl';
import BaseSelection from '../Components/BaseSelection';
import IngredientSection from '../Components/IngredientSection';
import SummaryBar from '../Components/SummaryBar';
import Footer from '../Components/Footer';

import { type Bowl, type Category, type Ingredient } from '../types';
import { getBowls, getCategories, getIngredients } from "../services/api";

// 🔹 1. Tuodaan Zustand store
import { useIngredientStore } from '../store/useIngredientStore';

const Configurator: React.FC = () => {
  // 🔹 State for backend data
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 🔹 2. Luetaan valittu pohjatyyppi (baseType) storesta
  const baseType = useIngredientStore((state: { baseType: any; }) => state.baseType);

  useEffect(() => {
    const fetchBowls = async () => {
      try {
        setIsLoading(true);

        const bowlsData = await getBowls();
        setBowls(bowlsData);

        const categoriesData = await getCategories();
        setCategories(categoriesData);

        const ingredientsData = await getIngredients();
        setIngredients(ingredientsData);
        
      } catch (error) {
        console.error("Error Fetching Data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBowls();
  }, []);
  
  // 🔹 3. Suodatetaan kulhot ja kategoriat baseType_id:n perusteella
  // Tämä varmistaa, että esim. salaattia tehdessä ei näytetä rahkan kulhoja.
  const filteredBowls = bowls.filter((bowl) => bowl.base_type_id === baseType);
  const filteredCategories = categories.filter((category) => category.base_type_id === baseType);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="grow p-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
              {/* 🔹 4. Annetaan komponenteille vain SUODATETUT listat */}
              <BowlSelection bowls={filteredBowls} />
              <CenterBowl />
              <BaseSelection ingredients={ingredients} />
            </div>

            <div className="mt-8">
              {/* 🔹 4. Annetaan IngredientSectionille vain suodatetut kategoriat */}
              <IngredientSection categories={filteredCategories} ingredients={ingredients} />
            </div>
          </>
        )}
      </main>

      <SummaryBar
        selectedIngredients={[]}
        totalWeight="0"
        totalPrice="0"
      />

      <Footer />
    </div>
  );
};

export default Configurator;
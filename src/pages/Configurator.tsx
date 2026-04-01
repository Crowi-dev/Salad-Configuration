import { useState, useEffect } from 'react';

import Header from '../Components/Header';
import BowlSelection from '../Components/BowlSelection';
import CenterBowl from '../Components/CenterBowl';
import BaseSelection from '../Components/BaseSelection';
import IngredientSection from '../Components/IngredientSection';
import SummaryBar from '../Components/SummaryBar';
import Footer from '../Components/Footer';


import {type Bowl, type Category, type Ingredient } from '../types';
import { getBowls, getCategories, getIngredients } from "../services/api";

const Configurator: React.FC = () => {
  // 🔹 State for backend data
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        console.error("Error Fetching Bowls:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBowls();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
              <BowlSelection bowls={bowls} />
              <CenterBowl />
              <BaseSelection ingredients={ingredients} />
            </div>

            <div className="mt-8">
              <IngredientSection categories={categories} ingredients={ingredients} />
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
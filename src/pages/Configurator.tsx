import { useState } from 'react';

import Header from '../Components/Header';
import BowlSelection from '../Components/BowlSelection';
import CenterBowl from '../Components/CenterBowl';
import BaseSelection from '../Components/BaseSelection';
import IngredientSection from '../Components/IngredientSection';
import SummaryBar from '../Components/SummaryBar';
import Footer from '../Components/Footer';

import {type Bowl, type Category, type Ingredient } from '../types';

const Configurator: React.FC = () => {
  // 🔹 State for backend data
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-6">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
          <BowlSelection />
          <CenterBowl />
          <BaseSelection />
        </div>

        <div className="mt-8">
          <IngredientSection />
        </div>
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

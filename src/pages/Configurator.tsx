import { useState, useEffect } from 'react';

import Header from '../Components/Header';
import BowlSelection from '../Components/BowlSelection';
import CenterBowl from '../Components/CenterBowl';
import BaseSelection from '../Components/BaseSelection';
import IngredientSection from '../Components/IngredientSection';
import SummaryBar from '../Components/SummaryBar';
import Footer from '../Components/Footer';

import { type Bowl, type Category, type Ingredient } from '../types';
import { getBowls, getCategories, getIngredients, getBaseIngredients } from "../services/api";
import { useIngredientStore } from '../store/useIngredientStore';

const Configurator: React.FC = () => {
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [baseIngredients, setBaseIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const baseType = useIngredientStore((state) => state.baseType);

  // Fetch bowls and categories when baseType changes
  useEffect(() => {
    const fetchTypeData = async () => {
      try {
        const [bowlsData, categoriesData] = await Promise.all([
          getBowls(baseType),
          getCategories(baseType),
        ]);
        setBowls(bowlsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching type data:", error);
      }
    };

    fetchTypeData();
  }, [baseType]);

  // Fetch ingredients and base ingredients once on mount
  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        setIsLoading(true);
        const [ingredientsData, baseIngredientsData] = await Promise.all([
          getIngredients(),
          getBaseIngredients(),
        ]);

        // Deduplicate by id
        const uniqueIngredients = ingredientsData.filter(
          (item: Ingredient, index: number, self: Ingredient[]) =>
            index === self.findIndex((i) => i.id === item.id)
        );

        const uniqueBaseIngredients = baseIngredientsData.filter(
          (item: Ingredient, index: number, self: Ingredient[]) =>
            index === self.findIndex((i) => i.id === item.id)
        );

        setIngredients(uniqueIngredients);
        setBaseIngredients(uniqueBaseIngredients);
      } catch (error) {
        console.error("Error fetching static data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaticData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="grow p-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
              <BowlSelection bowls={bowls} />
              <CenterBowl />
              <BaseSelection ingredients={baseIngredients} />
            </div>

            <div className="mt-8">
              <IngredientSection categories={categories} ingredients={ingredients} />
            </div>
          </>
        )}
      </main>

      <SummaryBar />

      <Footer />
    </div>
  );
};

export default Configurator;
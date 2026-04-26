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
          // spinneri ladatessa dataa
          <div className="flex items-center justify-center h-96">
            <div className="w-12 h-12 border-4 border-[#A2D135] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
              <BowlSelection bowls={bowls} />
              <CenterBowl />
              {/* piilotetaan BaseSelection ku Rahka valittuna */}
              {baseType === 1 ? (
                <BaseSelection ingredients={baseIngredients} />
              ) : (
                <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center justify-center shadow-lg">
                  <p className="text-gray-400 text-center">No base options for quark</p>
                </div>
              )}
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
import BowlSelection from './Components/BowlSelection';
import CenterBowl from './Components/CenterBowl';
import BaseSelection from './Components/BaseSelection';
import IngredientSection from './Components/IngredientSection';
import SummaryBar from './Components/SummaryBar';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 pb-32">
      
      <main>
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

    </div>
  );
};

export default App;
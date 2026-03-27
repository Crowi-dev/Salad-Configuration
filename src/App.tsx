import Header from "./Components/Header";
import BowlSelection from "./Components/BowlSelection";
import BaseSelection from "./Components/BaseSelection";
import CenterBowl from "./Components/CenterBowl"; 

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      
      {/* Header at top */}
      <Header />
      <div className="p-8 flex flex-col lg:flex-row gap-8 justify-center items-start">
        <BowlSelection />
        <BaseSelection /> 
        <CenterBowl />
      </div>
    </div>
  );
}

export default App;
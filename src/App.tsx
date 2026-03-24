import Header from "./components/Header";
import BowlSelection from "./components/BowlSelection";
import BaseSelection from "./components/BaseSelection";

function App() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <div className="p-8 flex flex-col lg:flex-row gap-8 justify-center items-start">
        <BowlSelection />
        <BaseSelection /> 
      </div>
    </div>
  );
}

export default App;
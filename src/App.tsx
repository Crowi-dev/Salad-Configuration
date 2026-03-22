import Header from "./components/Header";
import BowlSelection from "./components/BowlSelection";

function App() {
  return (
    <div className="min-h-screen bg-zinc-900">
      <Header />
      <div className="p-8">
        <BowlSelection />
      </div>
    </div>
  );
}

export default App;
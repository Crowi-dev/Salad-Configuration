import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Your page content will go here */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
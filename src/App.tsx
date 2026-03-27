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


import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      
      {/* Header at top */}
      <Header />

      {/* Main content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col gap-8 mt-4">
        {/* Your page content goes here */}
      </main>

      {/* Footer at bottom */}
      <Footer />

    </div>
  );
}

export default App;
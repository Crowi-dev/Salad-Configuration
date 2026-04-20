import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4 relative">
      
      {/* Logo */}
      <p className="w-24 h-24 rounded-full border-4 border-[#A2D135] flex items-center justify-center flex-col -mt-2 bg-zinc-800 shadow-lg">
        <span className="text-[10px] leading-tight text-center">
          Fresh Food Factory
        </span>
      </p>

      {/* Title */}
      <h1 className="text-3xl font-black tracking-widest mt-6">
        BOWL-LASKURI
      </h1>

      {/* Right side */}
      <div className="relative flex flex-col items-end">
        
        {/* Hamburger */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="mb-2 flex flex-col gap-1"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>

        {/* Dropdown (Tailwind controlled) */}
        <div
          className={`
            absolute top-12 right-0
            bg-[#A2D135] text-black
            rounded-b-3xl rounded-t-xl
            px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md

            transform transition-all duration-200 origin-top

            ${isMenuOpen 
              ? "opacity-100 scale-100 pointer-events-auto" 
              : "opacity-0 scale-95 pointer-events-none"}
          `}
        >
          <p className="hover:underline cursor-pointer">Kirjaudu sisään</p>
          <p className="hover:underline cursor-pointer">Tallennetut reseptit</p>
          <p className="hover:underline cursor-pointer">Ohjeet ja Tuki</p>
        </div>

      </div>
    </div>
  );
};

export default Header;
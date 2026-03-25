import React from 'react';

const BowlSelection: React.FC = () => {
  return (
    // Outermost wrapper
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">
      
      {/* Otsikko ja numero 1 */}
      <div className="flex flex-col items-center mb-6">
        <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
          1
        </div>
        <h2 className="text-xl font-bold">Valitse rasia</h2>
      </div>

      
      <div className="w-full flex flex-col gap-4">
        <div className="h-12 border-2 border-gray-600 rounded-xl flex items-center px-4 w-full">
          <span>Pieni rasia</span>
        </div>
        <div className="h-12 border-2 border-gray-600 rounded-xl flex items-center px-4 w-full">
          <span>Keskikokoinen rasia</span>
        </div>
        <div className="h-12 border-2 border-gray-600 rounded-xl flex items-center px-4 w-full">
          <span>Iso rasia</span>
        </div>
      </div>
      
    </div>
  );
};

export default BowlSelection;
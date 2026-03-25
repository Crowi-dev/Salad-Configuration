import React from 'react';

const BaseSelection: React.FC = () => {
  return (
    <div className="bg-zinc-800 rounded-[3rem] p-6 text-white w-full lg:w-1/4 flex flex-col items-center shadow-lg">

      <div className="flex flex-col items-center mb-6 w-full">
        <div className="bg-white text-black font-bold rounded-full w-8 h-8 flex items-center justify-center mb-4 shrink-0">
          2
        </div>
        <h2 className="text-xl font-bold uppercase text-center">
          Valitse salaattipohja
        </h2>
      </div>

     
      <div className="w-full flex flex-col gap-6">
        
        <div className="border-b border-gray-600 pb-2 flex justify-end gap-4 items-center">
          <span className="mr-auto">Salaattisekoitus</span>
          <span className="text-sm text-gray-400">0,00€</span>
          <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
        </div>

        <div className="border-b border-gray-600 pb-2 flex justify-end gap-4 items-center">
          <span className="mr-auto">Pinaatti</span>
          <span className="text-sm text-gray-400">0,00€</span>
          <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
        </div>

        <div className="border-b border-gray-600 pb-2 flex justify-end gap-4 items-center">
          <span className="mr-auto">Rucola</span>
          <span className="text-sm text-gray-400">0,00€</span>
          <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
        </div>

      </div>
      
    </div>
  );
};

export default BaseSelection;
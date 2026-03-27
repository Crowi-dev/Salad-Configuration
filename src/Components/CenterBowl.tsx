import React from 'react';

const CenterBowl: React.FC = () => {
  return (
<div className="flex-1 flex flex-col items-center justify-center min-h-100 mt-4 lg:mt-0">
          
      <div className="flex gap-3 mb-6 items-center">
        <button>Salaatti</button>
        <button>Rahka</button>
        <span>🥗</span>
        <span>🥣</span>
      </div>

     <div className="w-80 h-80 rounded-full border-12 border-gray-200 bg-gray-50 flex items-center justify-center shadow-inner relative">
        <span className="text-gray-400">Kulho on tyhjä</span>
      </div>

     
      <div className="mt-6 flex flex-col items-center">
        <span>100 g / 1,99 €</span>
        <span className="text-gray-500">500 ml</span>
      </div>

    </div> 
  );
};

export default CenterBowl;
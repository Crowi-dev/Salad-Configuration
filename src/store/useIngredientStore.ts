import { create } from 'zustand';
import { type Ingredient, type Bowl } from '../types'; // Varmista, että polku tyyppeihin on oikein!

// 1. Määritellään storen rajapinta (Interface)
interface IngredientStore {
  slots: Record<string, Ingredient | null>;
  baseType: number;
  selectedBowl: Bowl | null;
  
  // Setter-funktiot
  setBaseType: (id: number) => void;
  setBowl: (bowl: Bowl) => void;
  clearSelection: () => void;
  
  // Tyhjät paikkavaraukset myöhempää käyttöä varten
  addIngredient: (item: Ingredient) => void;
  removeIngredient: (id: string) => void; 
}

// tehään globaali store
export const useIngredientStore = create<IngredientStore>((set) => ({
  //  Alkutilat (Initial state) 
  slots: {},
  baseType: 1, // Default 1
  selectedBowl: null,

  //  Toiminnot (Actions) 
  setBaseType: (id) => set({ baseType: id }),
  
  setBowl: (bowl) => set({ selectedBowl: bowl }),
  
  clearSelection: () => set({ 
    slots: {}, 
    baseType: 1, 
    selectedBowl: null 
  }),

  // Tyhjät paikkavaraukset
  addIngredient: (item) => {
    // TODO: Toteutetaan myöhemmässä taskissa
  },
  
  removeIngredient: (id) => {
  }
}));
import { create } from 'zustand';
import { type Ingredient, type Bowl } from '../types';

// 1. Store interface
interface IngredientStore {
  slots: Record<string, Ingredient | null>;
  baseType: number;
  selectedBowl: Bowl | null;
  
  // Actions
  setBaseType: (id: number) => void;
  setBowl: (bowl: Bowl) => void;
  clearSelection: () => void;
  
  addIngredient: (item: Ingredient) => void;
  removeIngredient: (id: number) => void; // ✅ FIXED: number
}

// 2. Store
export const useIngredientStore = create<IngredientStore>((set) => ({
  // Initial state
  slots: {},
  baseType: 1,
  selectedBowl: null,

  // Actions
  setBaseType: (id) => set({ baseType: id }),
  
  setBowl: (bowl) => set({ selectedBowl: bowl }),
  
  clearSelection: () => set({ 
    slots: {}, 
    baseType: 1, 
    selectedBowl: null 
  }),

  addIngredient: (item) =>
    set((state) => {
      // Base ingredient (categoryId === 6)
      if (item.categoryId === 6) {
        return {
          slots: {
            ...state.slots,
            base: item,
          },
        };
      }

      const slotCount = state.selectedBowl?.slot_count;

      // No bowl selected → do nothing
      if (!slotCount) return state;

      // Find first empty slot
      let targetSlotKey: string | null = null;

      for (let i = 1; i <= slotCount; i++) {
        const key = `slot-${i}`;

        if (!state.slots[key]) {
          targetSlotKey = key;
          break;
        }
      }

      // No available slots → do nothing
      if (!targetSlotKey) return state;

      return {
        slots: {
          ...state.slots,
          [targetSlotKey]: item,
        },
      };
    }),

  removeIngredient: (id) =>
    set((state) => {
      const updatedSlots = { ...state.slots };

      for (const key in updatedSlots) {
        if (updatedSlots[key]?.id === id) {
          updatedSlots[key] = null;
        }
      }

      return { slots: updatedSlots };
    }),
}));
import { create } from "zustand";

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];

}

interface FilterActions {
  setCategories: (categories: string[]) => void;
  setPriceRange: (priceRange: [number, number]) => void;
  setSizes: (sizes: string[]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
  categories: [],
  priceRange: [0, 1000],
  sizes: [],

  setCategories: (categories: string[]) => set({ categories }),
  setPriceRange: (priceRange: [number, number]) => set({ priceRange }),
  setSizes: (sizes: string[]) => set({ sizes }),
  resetFilters: () => set({ categories: [], priceRange: [0, 1000], sizes: [] }),
}));


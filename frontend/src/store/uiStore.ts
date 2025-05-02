import { create } from "zustand";

interface UIStore {
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isAuthModalOpen: boolean) => void;
  previewsFunction: Function;
  setPreviewsFunction: (previewsFunction: Function) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isAuthModalOpen: false,
  setIsAuthModalOpen: (isAuthModalOpen) => set({ isAuthModalOpen }),
  previewsFunction: () => {},
  setPreviewsFunction: (previewsFunction) => set({ previewsFunction }),
}));


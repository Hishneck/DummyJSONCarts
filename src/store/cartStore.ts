import { create } from 'zustand';

interface CartStore {
    limit: number;
    skip: number;
    setPagination: (limit: number, skip: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
    limit: 10,
    skip: 0,
    setPagination: (limit, skip) => set({ limit, skip }),
}));
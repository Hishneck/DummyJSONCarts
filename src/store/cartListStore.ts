import { create } from 'zustand';

interface CartListStore {
    limit: number;
    skip: number;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
}

export const useCartListStore = create<CartListStore>((set) => ({
    limit: 10,
    skip: 0,
    setPage: (page) => set((state) => ({ skip: page * state.limit })),
    setLimit: (limit) => set({ limit, skip: 0 }),
}));
import { create } from 'zustand';

interface CartEdit {
    cartId: number;
    productId: number;
    quantity: number;
}

interface CartEditsState {
    edits: Record<string, CartEdit>; 
    deletedProducts: Record<string, boolean>; 

    setQuantity: (cartId: number, productId: number, quantity: number) => void;
    deleteProduct: (cartId: number, productId: number) => void;
    restoreProduct: (cartId: number, productId: number) => void;
    resetCart: (cartId: number) => void;
    resetAll: () => void;
}

export const useCartEditsStore = create<CartEditsState>((set) => ({
    edits: {},
    deletedProducts: {},

    setQuantity: (cartId, productId, quantity) => {
        const key = `${cartId}-${productId}`;
        set((state) => ({
            edits: { ...state.edits, [key]: { cartId, productId, quantity } },
        }));
    },

    deleteProduct: (cartId, productId) => {
        const key = `${cartId}-${productId}`;
        set((state) => ({
            deletedProducts: { ...state.deletedProducts, [key]: true },
        }));
    },

    restoreProduct: (cartId, productId) => {
        const key = `${cartId}-${productId}`;
        set((state) => {
            const { [key]: _, ...rest } = state.deletedProducts;
            return { deletedProducts: rest };
        });
    },

    resetCart: (cartId) => {
        set((state) => {
            const prefix = `${cartId}-`;
            const edits = Object.fromEntries(
                Object.entries(state.edits).filter(([k]) => !k.startsWith(prefix))
            );
            const deletedProducts = Object.fromEntries(
                Object.entries(state.deletedProducts).filter(([k]) => !k.startsWith(prefix))
            );
            return { edits, deletedProducts };
        });
    },

    resetAll: () => set({ edits: {}, deletedProducts: {} }),
}));
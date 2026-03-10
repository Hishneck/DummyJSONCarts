import { useCart } from './useCart';
import { useCartEditsStore } from '../store/cartEditsStore';
import { useShallow } from 'zustand/shallow';
import { useMemo } from 'react';
import type { Cart } from '../types/cart';

export const useCartWithEdits = (cartId: number) => {

    const { data: originalCart, isLoading, isError, refetch } = useCart(cartId);

    const { edits, deletedProducts } = useCartEditsStore(
        useShallow((state) => ({
            edits: state.edits,
            deletedProducts: state.deletedProducts,
        }))
    );

    const { setQuantity, deleteProduct, restoreProduct, resetCart } = useCartEditsStore();

    const cart: Cart | undefined = useMemo(() => {

        if (!originalCart) return undefined;

        const cart = { ...originalCart };
        const prefix = `${cartId}-`;

        cart.products = cart.products.filter(
            (p) => !deletedProducts[`${prefix}${p.id}`]
        );

        cart.products = cart.products.map((p) => {
            const edit = edits[`${prefix}${p.id}`];
            if (edit) {
                return {
                    ...p,
                    quantity: edit.quantity,
                    total: p.price * edit.quantity,
                };
            }
            return p;
        });

        cart.totalProducts = cart.products.length;
        cart.totalQuantity = cart.products.reduce((sum, p) => sum + p.quantity, 0);
        cart.total = cart.products.reduce((sum, p) => sum + p.total, 0);

        return cart;
    }, [originalCart, edits, deletedProducts, cartId]);

    const handleSetQuantity = (productId: number, quantity: number) => {
        setQuantity(cartId, productId, quantity);
    };

    const handleDeleteProduct = (productId: number) => {
        deleteProduct(cartId, productId);
    };

    const handleRestoreProduct = (productId: number) => {
        restoreProduct(cartId, productId);
    };

    const handleResetCart = () => {
        resetCart(cartId);
    };

    const hasEdits = useMemo(() => {
        const prefix = `${cartId}-`;
        return (
            Object.keys(edits).some((k) => k.startsWith(prefix)) ||
            Object.keys(deletedProducts).some((k) => k.startsWith(prefix))
        );
    }, [edits, deletedProducts, cartId]);

    return {
        cart,
        isLoading,      
        isError,        
        refetch,
        handleSetQuantity,
        handleDeleteProduct,
        handleRestoreProduct,
        handleResetCart,
        hasEdits,
    };
};
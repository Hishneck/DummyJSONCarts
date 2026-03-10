import { useCarts } from './useCarts';
import { useCartEditsStore } from '../store/cartEditsStore';
import { useShallow } from 'zustand/shallow';
import { useMemo } from 'react';
import type { CartsResponse } from '../types/cart';

export const useCartsWithEdits = (limit: number, skip: number) => {
    const query = useCarts(limit, skip);

    const { edits, deletedProducts } = useCartEditsStore(
        useShallow((state) => ({
            edits: state.edits,
            deletedProducts: state.deletedProducts,
        }))
    );

    const processedData: CartsResponse | undefined = useMemo(() => {
        if (!query.data) return undefined;

        const data: CartsResponse = {
            ...query.data,
            carts: query.data.carts.map((cart) => {
                const prefix = `${cart.id}-`;

                let products = cart.products.filter(
                    (p) => !deletedProducts[`${prefix}${p.id}`]
                );

                products = products.map((p) => {
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

                return {
                    ...cart,
                    products,
                    totalProducts: products.length,
                    totalQuantity: products.reduce((sum, p) => sum + p.quantity, 0),
                    total: products.reduce((sum, p) => sum + p.total, 0),
                    discountedTotal: products.reduce((sum, p) => sum + p.total, 0),
                };
            }),
        };

        return data;
    }, [query.data, edits, deletedProducts]);

    return {
        ...query,
        data: processedData,
    };
};
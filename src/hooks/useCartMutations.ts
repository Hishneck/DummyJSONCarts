import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCart, deleteProductFromCart } from '../api/cartApi';
import type { Cart, CartProduct, UpdateCartInput } from '../types/cart';

export const useCartMutations = (cartId: number) => {
    const queryClient = useQueryClient();

    const updateMutation = useMutation<Cart, Error, UpdateCartInput>({
        mutationFn: (data) => updateCart(cartId, data),
        onMutate: async (newData) => {
            await queryClient.cancelQueries({ queryKey: ['cart', cartId] });
            const previous = queryClient.getQueryData<Cart>(['cart', cartId]);

            queryClient.setQueryData<Cart>(['cart', cartId], (old) => {
                if (!old) return old;
                const updatedProducts = old.products.map((p) => {
                    const match = newData.products.find((np) => np.id === p.id);
                    return match ? { ...p, quantity: match.quantity, total: p.price * match.quantity } : p;
                });
                const total = updatedProducts.reduce((sum, p) => sum + p.total, 0);
                return { ...old, products: updatedProducts, total };
            });

            return { previous };
        },
        onError: (_err, _vars, context) => {
            if (context?.previous) {
                queryClient.setQueryData(['cart', cartId], context.previous);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
            queryClient.invalidateQueries({ queryKey: ['carts'] });
        },
    });

    const deleteMutation = useMutation<Cart, Error, { productId: number; products: CartProduct[] }>({
        mutationFn: ({ productId, products }) =>
            deleteProductFromCart(cartId, productId, products),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
            queryClient.invalidateQueries({ queryKey: ['carts'] });
        },
    });

    return { updateMutation, deleteMutation };
};
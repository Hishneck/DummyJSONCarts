import { useMutation, useQueryClient } from '@tanstack/react-query';
import  { updateCart } from '../api/cartApi';
import type { Cart, UpdateCartInput } from '../types/cart';

export const useUpdateCart = (cartId: number) => {
    const queryClient = useQueryClient();

    return useMutation<Cart, Error, UpdateCartInput>({
        mutationFn: (data) => updateCart(cartId, data),
        onSuccess: (updatedCart) => {
            queryClient.invalidateQueries({ queryKey: ['carts'] });
            queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
            queryClient.setQueryData(['cart', cartId], updatedCart);
        },
    });
};
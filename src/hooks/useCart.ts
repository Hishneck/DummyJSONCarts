import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { fetchCartById } from '../api/cartApi';
import type { Cart } from '../types/cart';

export const useCart = (
    id: number,
    options?: Omit<UseQueryOptions<Cart>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<Cart>({
        queryKey: ['cart', id],
        queryFn: () => fetchCartById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        ...options,
    });
};
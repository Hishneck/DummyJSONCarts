import { useQuery,type  UseQueryOptions } from '@tanstack/react-query';
import { fetchCarts } from '../api/cartApi';
import type { CartsResponse } from '../types/cart';

export const useCarts = (
    limit: number = 10,
    skip: number = 0,
    options?: Omit<UseQueryOptions<CartsResponse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<CartsResponse>({
        queryKey: ['carts', { limit, skip }],
        queryFn: () => fetchCarts(limit, skip),
        staleTime: 5 * 60 * 1000, // 5 минут
        ...options,
    });
};
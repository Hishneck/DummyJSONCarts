import type { Cart, CartsResponse, UpdateCartInput, CartProduct } from '../types/cart';

const BASE_URL = 'https://dummyjson.com/carts';

export const fetchCarts = async (
    limit: number = 10,
    skip: number = 0
): Promise<CartsResponse> => {
    const params = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString(),
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) throw new Error('Failed to fetch carts');
    return response.json();
};

export const fetchCartById = async (id: number): Promise<Cart> => {
    const response = await fetch(`https://dummyjson.com/carts/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch cart #${id}`);
    return response.json();
};

export const updateCart = async (
    id: number,
    data: UpdateCartInput
): Promise<Cart> => {
    const response = await fetch(`https://dummyjson.com/carts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Failed to update cart #${id}`);
    return response.json();
};

export const deleteProductFromCart = async (
    cartId: number,
    productId: number,
    currentProducts: CartProduct[]
): Promise<Cart> => {
    const products = currentProducts
        .filter((p) => p.id !== productId)
        .map(({ id, quantity }) => ({ id, quantity }));

    return updateCart(cartId, { merge: false, products });
};
export interface Cart {
    id: number;
    products: Array<{
        id: number;
        title: string;
        price: number;
        quantity: number;
        total: number;
        discountPercentage: number;
        discountedPrice: number;
        thumbnail: string;
    }>;
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface CartsResponse {
    carts: Cart[];
    total: number;
    skip: number;
    limit: number;
}

export interface CartProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
    thumbnail: string;
}

export interface UpdateCartProduct {
    id: number;
    quantity: number;
}

export interface UpdateCartInput {
    merge: boolean;
    products: UpdateCartProduct[];
}
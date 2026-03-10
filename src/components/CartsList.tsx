import styled from '@emotion/styled';
import { useCarts } from '../hooks/useCarts';

const Container = styled.div`
  padding: 20px;
`;

const CartItem = styled.div`
  padding: 16px;
  margin: 12px 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
`;

export const CartsList = () => {
  const { data, isLoading, error } = useCarts(10, 0);

  if (isLoading) return <Container>Загрузка...</Container>;
  if (error) return <Container>Ошибка: {(error as Error).message}</Container>;

  return (
    <Container>
      {data?.carts.map((cart) => (
        <CartItem key={cart.id}>
          <strong>Cart #{cart.id}</strong>
          <p>
            Products: {cart.totalProducts} | Total: ${cart.total}
          </p>
          <p>User ID: {cart.userId}</p>
        </CartItem>
      ))}
    </Container>
  );
};

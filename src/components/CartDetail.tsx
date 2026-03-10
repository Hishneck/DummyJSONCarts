import styled from '@emotion/styled';
import { useCart } from './../hooks/useCart';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const ProductItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

interface Props {
  cartId: number;
}

export const CartDetail = ({ cartId }: Props) => {
  const { data, isLoading, error } = useCart(cartId);

  if (isLoading) return <Container>Загрузка...</Container>;
  if (error) return <Container>Ошибка: {(error as Error).message}</Container>;
  if (!data) return null;

  return (
    <Container>
      <h2>Cart #{data.id}</h2>
      <p>User ID: {data.userId}</p>
      <p>
        Total: ${data.total} | Items: {data.totalProducts}
      </p>

      <h3>Products:</h3>
      {data.products.map((product) => (
        <ProductItem key={product.id}>
          <Thumbnail src={product.thumbnail} alt={product.title} />
          <div>
            <strong>{product.title}</strong>
            <p>
              Qty: {product.quantity} | ${product.price}
            </p>
            <p>Subtotal: ${product.total}</p>
          </div>
        </ProductItem>
      ))}
    </Container>
  );
};

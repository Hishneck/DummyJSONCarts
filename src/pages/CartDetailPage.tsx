import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useCartWithEdits } from '../hooks/useCartWithEdits';
import { CartProductItem } from '../components/CartProductItem';

const Container = styled.div`
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Summary = styled.div`
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
`;

const EditNotice = styled.div`
  padding: 12px;
  background: #fff3cd;
  border-radius: 4px;
  margin-bottom: 16px;
  color: #856404;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Btn = styled.button`
  padding: 8px 16px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #5a6268;
  }
`;

const StateMsg = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

export const CartDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cartId = Number(id);

  const {
    cart,
    isLoading,
    isError, 
    handleSetQuantity,
    handleDeleteProduct,
    handleRestoreProduct,
    handleResetCart,
    hasEdits,
  } = useCartWithEdits(cartId);

  if (isLoading) {
    return <StateMsg>Загрузка...</StateMsg>;
  }

  if (isError) {
    return <StateMsg>Ошибка загрузки корзины</StateMsg>;
  }

  if (!cart) {
    return <StateMsg>Корзина не найдена</StateMsg>;
  }

  return (
    <Container>
      <Header>
        <Btn onClick={() => navigate(-1)}>← Назад</Btn>
        <h2>Cart #{cart.id}</h2>
        <div>User ID: {cart.userId}</div>
      </Header>

      {hasEdits && (
        <EditNotice>
          <span>Изменения локальные (сбросятся при перезагрузке)</span>
          <Btn onClick={handleResetCart}>Сбросить</Btn>
        </EditNotice>
      )}

      {cart.products.length === 0 ? (
        <StateMsg>Корзина пуста</StateMsg>
      ) : (
        cart.products.map((product) => (
          <CartProductItem
            key={product.id}
            cartId={cartId}
            product={product}
            onQtyChange={handleSetQuantity}
            onDelete={handleDeleteProduct}
            onRestore={handleRestoreProduct}
          />
        ))
      )}

      <Summary>
        <div>Товаров: {cart.totalProducts}</div>
        <div>Всего: ${cart.total.toFixed(2)}</div>
      </Summary>
    </Container>
  );
};

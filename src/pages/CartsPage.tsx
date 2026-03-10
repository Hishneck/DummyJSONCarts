import { useNavigate } from 'react-router-dom';
import { useCartsWithEdits } from '../hooks/useCartsWithEdits';
import { useCartListStore } from '../store/cartListStore';
import { useCartEditsStore } from '../store/cartEditsStore';
import * as S from '../components/CartsPage.styled';

export const CartsPage = () => {
  const navigate = useNavigate();
  const { limit, skip, setPage } = useCartListStore();
  const { resetCart } = useCartEditsStore();

  const { data, isLoading, isError, isFetching } = useCartsWithEdits(
    limit,
    skip,
  );

  const totalPages = data ? Math.ceil(data.total / limit) : 0;
  const currentPage = Math.floor(skip / limit) + 1;

  if (isLoading) return <S.StateMessage>Загрузка...</S.StateMessage>;
  if (isError)
    return <S.StateMessage>Ошибка загрузки корзин</S.StateMessage>;

  return (
    <S.Container>
      <h1>Список корзин</h1>

      {data?.carts.map((cart) => {

        const prefix = `${cart.id}-`;
        const hasEdits =
          Object.keys(useCartEditsStore.getState().edits).some((k) =>
            k.startsWith(prefix),
          ) ||
          Object.keys(useCartEditsStore.getState().deletedProducts).some((k) =>
            k.startsWith(prefix),
          );

        return (
          <S.CartCard key={cart.id}>
            <S.CartInfo>
              <strong>
                Cart #{cart.id}
                {hasEdits && (
                  <span style={{ color: '#ffc107', marginLeft: 8 }}>✏️</span>
                )}
              </strong>
              <span>User ID: {cart.userId}</span>
              <span>Items: {cart.totalProducts}</span>
              <span>Total: ${cart.total.toFixed(2)}</span>
            </S.CartInfo>
            <S.Button onClick={() => navigate(`/carts/${cart.id}`)}>
              Детали
            </S.Button>
          </S.CartCard>
        );
      })}

      <S.Pagination>
        <S.Button
          onClick={() => setPage(currentPage - 2)}
          disabled={currentPage === 1}
        >
          ← Назад
        </S.Button>

        <span>
          Стр. {currentPage} из {totalPages}
        </span>

        <S.Button
          onClick={() => setPage(currentPage)}
          disabled={currentPage === totalPages}
        >
          Вперёд →
        </S.Button>
      </S.Pagination>

      {isFetching && <S.StateMessage>Обновление...</S.StateMessage>}
    </S.Container>
  );
};

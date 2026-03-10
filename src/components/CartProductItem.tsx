import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import type { CartProduct } from '../types/cart';

const Row = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  align-items: center;
`;

const Thumb = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const Info = styled.div`
  flex: 1;
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const QtyInput = styled.input`
  width: 60px;
  padding: 6px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Btn = styled.button<{ danger?: boolean }>`
  padding: 6px 12px;
  background: ${({ danger }) => (danger ? '#dc3545' : '#007bff')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${({ danger }) => (danger ? '#c82333' : '#0056b3')};
  }
`;

const DeletedRow = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  background: #fff3cd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  cartId: number;
  product: CartProduct;
  isDeleted?: boolean;
  onQtyChange: (productId: number, qty: number) => void;
  onDelete: (productId: number) => void;
  onRestore: (productId: number) => void;
}

export const CartProductItem = ({
  cartId,
  product,
  isDeleted,
  onQtyChange,
  onDelete,
  onRestore,
}: Props) => {
  const [qty, setQty] = useState(product.quantity);

  useEffect(() => {
    setQty(product.quantity);
  }, [product.quantity]);

  if (isDeleted) {
    return (
      <DeletedRow>
        <span>{product.title} (удалён)</span>
        <Btn onClick={() => onRestore(product.id)}>Восстановить</Btn>
      </DeletedRow>
    );
  }

  return (
    <Row>
      <Thumb src={product.thumbnail} alt={product.title} />
      <Info>
        <strong>{product.title}</strong>
        <p>
          ${product.price} × {product.quantity} ={' '}
          <strong>${product.total}</strong>
        </p>
      </Info>
      <Controls>
        <QtyInput
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
        <Btn onClick={() => onQtyChange(product.id, qty)}>OK</Btn>
        <Btn danger onClick={() => onDelete(product.id)}>
          ✕
        </Btn>
      </Controls>
    </Row>
  );
};

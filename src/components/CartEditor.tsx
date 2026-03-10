import styled from '@emotion/styled';
import { useState } from 'react';
import { useUpdateCart } from '../hooks/useUpdateCart';

const Form = styled.form`
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 8px;
  width: 80px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface Props {
  cartId: number;
  productId: number;
  initialQuantity: number;
}

export const CartEditor = ({ cartId, productId, initialQuantity }: Props) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { mutate, isPending } = useUpdateCart(cartId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      merge: true,
      products: [{ id: productId, quantity }],
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <Button type="submit" disabled={isPending || quantity < 1}>
        {isPending ? 'Обновление...' : 'Обновить'}
      </Button>
    </Form>
  );
};

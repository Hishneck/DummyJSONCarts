import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const CartCard = styled.div`
  padding: 16px 20px;
  margin: 12px 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover { background: #0056b3; }
  &:disabled { background: #ccc; cursor: not-allowed; }
`;

export const Pagination = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 24px;
`;

export const StateMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;
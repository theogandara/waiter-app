import styled from 'styled-components/native';

export const Product = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  width: 120px;
  height: 96px;
  border-radius: 8px;
  background-color: #f0f0f0;
  margin-right: 8px;
`;

export const ProductDetails = styled.View`
  margin-left: 8px;
  flex: 1;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: rgba(204, 204, 204, 0.3);
  margin: 24px 0;
`;

export const AddToCartButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: 0;
`;

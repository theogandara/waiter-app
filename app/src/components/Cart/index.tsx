import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button/button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { Text } from '../Text';
import * as S from './styles';
import { api } from '../../utils/api';

type CartProps = {
  items: CartItem[];
  onAddToCart: (product: Product) => void;
  onDecreaseQuantity: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
};

export function Cart({
  items,
  onAddToCart,
  onDecreaseQuantity,
  onConfirmOrder,
  selectedTable,
}: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const total = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);
    const payload = {
      table: selectedTable,
      products: items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
    };
    await api.post('/orders', payload);
    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    setIsModalVisible(false);
    onConfirmOrder();
  }

  return (
    <>
      <OrderConfirmedModal onOk={handleOk} isVisible={isModalVisible} />

      {items.length > 0 && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.product._id}
          style={{ marginBottom: 24, maxHeight: 140 }}
          renderItem={({ item }) => (
            <S.Item>
              <S.ProductContainer>
                <S.Image
                  source={{
                    uri: `http://192.168.1.213:3001/uploads/${item.product.imagePath}`,
                  }}
                />

                <S.QuantityContainer>
                  <Text color="#666" size={16}>
                    {item.quantity}x
                  </Text>
                </S.QuantityContainer>

                <S.ProductDetails>
                  <Text size={14} weight="600">
                    {item.product.name}
                  </Text>

                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(item.product.price)}
                  </Text>
                </S.ProductDetails>
              </S.ProductContainer>

              <S.Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onDecreaseQuantity(item.product)}
                >
                  <MinusCircle />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onAddToCart(item.product)}
                  style={{ marginRight: 12 }}
                >
                  <PlusCircle />
                </TouchableOpacity>
              </S.Actions>
            </S.Item>
          )}
        />
      )}

      <S.Summary>
        <S.TotalContainer>
          {items.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </S.TotalContainer>

        <Button
          loading={isLoading}
          disabled={items.length === 0}
          onPress={handleConfirmOrder}
        >
          Confirmar Pedido
        </Button>
      </S.Summary>
    </>
  );
}

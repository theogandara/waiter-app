import { FlatList, Modal } from 'react-native';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button/button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import * as S from './styles';

type ProductModalProps = {
  isVisible: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
};

export function ProductModal({
  isVisible,
  onClose,
  product,
  onAddToCart,
}: ProductModalProps) {
  if (!product) {
    return null;
  }

  function handleAddToCart(product: Product) {
    onAddToCart(product);
    onClose();
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <S.Image
        source={{
          uri: `http://192.168.1.213:3001/uploads/${product.imagePath}`,
        }}
      >
        <S.CloseButton onPress={onClose}>
          <Close color="#fff" />
        </S.CloseButton>
      </S.Image>

      <S.ModalBody>
        <S.Header>
          <Text size={24} weight="600">
            {product.name}
          </Text>
          <Text color="#666">{product.description}</Text>
        </S.Header>

        {product.ingredients.length > 0 && (
          <S.IngredientsContainer>
            <Text color="#666" weight="600">
              Ingredients
            </Text>

            <FlatList
              style={{ marginTop: 16 }}
              data={product.ingredients}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <S.Ingredient>
                  <Text>{item.icon}</Text>
                  <Text size={14} color="#666" style={{ marginLeft: 20 }}>
                    {item.name}
                  </Text>
                </S.Ingredient>
              )}
            />
          </S.IngredientsContainer>
        )}
      </S.ModalBody>
      <S.Footer>
        <S.FooterContainer>
          <S.PriceContainer>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </S.PriceContainer>

          <Button onPress={() => handleAddToCart(product)}>
            Adicionar ao pedido
          </Button>
        </S.FooterContainer>
      </S.Footer>
    </Modal>
  );
}

import { Text } from '../Text';
import { FlatList } from 'react-native';
import * as S from './styles';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { useState } from 'react';
import { Product } from '../../types/Product';

type MenuProps = {
  onAddToCart: (product: Product) => void;
  products: Product[];
};

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenProductModal(product: Product) {
    setIsProductModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        onClose={() => setIsProductModalVisible(false)}
        onAddToCart={onAddToCart}
        isVisible={isProductModalVisible}
        product={selectedProduct}
      />

      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ marginHorizontal: 24 }}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={S.Separator}
        renderItem={({ item }) => {
          return (
            <S.Product onPress={() => handleOpenProductModal(item)}>
              <S.Image
                source={{
                  uri: `http://192.168.1.213:3001/uploads/${item.imagePath}`,
                }}
              />

              <S.ProductDetails>
                <Text weight="600">{item.name}</Text>
                <Text
                  size={14}
                  color="#666"
                  style={{
                    marginVertical: 8,
                  }}
                >
                  {item.description}
                </Text>
                <Text size={14} weight="600">
                  {formatCurrency(item.price)}
                </Text>
              </S.ProductDetails>

              <S.AddToCartButton onPress={() => onAddToCart(item)}>
                <PlusCircle />
              </S.AddToCartButton>
            </S.Product>
          );
        }}
      />
    </>
  );
}

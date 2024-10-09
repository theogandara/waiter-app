import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from '../components/Button/button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories/Categories';
import { Header } from '../components/Header/header';
import { Menu } from '../components/Menu/Menu';
import { SafeArea } from '../components/SafeArea';
import { TableModal } from '../components/TableModal';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

import * as S from './styles';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/Category';
import { AxiosResponse } from 'axios';
import { api } from '../utils/api';

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([api.get('/categories'), api.get('/products')]).then(
      ([categoryResponse, productsResponse]: AxiosResponse[]) => {
        setCategories(categoryResponse.data);
        setProducts(productsResponse.data);
        setIsLoading(false);
      }
    );
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`;

    setIsLoadingProducts(true);

    const res = await api.get(route);

    setProducts(res.data);
    setIsLoadingProducts(false);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
    setIsTableModalVisible(false);
  }

  function handleCancelOrder() {
    setSelectedTable('');
  }

  function handleAddToCart(item: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prev) => {
      const itemIndex = prev.findIndex(
        (cartItem) => cartItem.product._id === item._id
      );

      if (itemIndex < 0) {
        return [...prev, { product: item, quantity: 1 }];
      }

      const newCartItems = [...prev];
      const itemToBeChanged = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...itemToBeChanged,
        quantity: itemToBeChanged.quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecreaseQuantity(item: Product) {
    setCartItems((prev) => {
      const itemIndex = prev.findIndex(
        (cartItem) => cartItem.product._id === item._id
      );

      const itemToBeChanged = prev[itemIndex];
      const newCartItems = [...prev];

      if (itemToBeChanged.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...itemToBeChanged,
        quantity: itemToBeChanged.quantity - 1,
      };

      return newCartItems;
    });
  }

  function handleOnconfirmOrder() {
    setCartItems([]);
    setSelectedTable('');
  }

  return (
    <>
      <SafeArea>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
        />

        {isLoading ? (
          <S.CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </S.CenteredContainer>
        ) : (
          <>
            <S.CategoriesContainer>
              <Categories
                onSelectedCategory={handleSelectCategory}
                categories={categories}
              />
            </S.CategoriesContainer>

            {isLoadingProducts ? (
              <S.CenteredContainer>
                <ActivityIndicator color="#d73035" size="large" />
              </S.CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <S.MenuContainer>
                    <Menu
                      products={products}
                      onAddToCart={(product) => handleAddToCart(product)}
                    />
                  </S.MenuContainer>
                ) : (
                  <S.CenteredContainer>
                    <Empty />
                    <Text color="#666" style={{ marginTop: 24 }}>
                      Nenhum produto encontrado !
                    </Text>
                  </S.CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </SafeArea>

      <S.Footer>
        <S.FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)}>
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              onAddToCart={(product) => handleAddToCart(product)}
              onDecreaseQuantity={(product) => handleDecreaseQuantity(product)}
              onConfirmOrder={handleOnconfirmOrder}
              selectedTable={selectedTable}
              items={cartItems}
            />
          )}
        </S.FooterContainer>
      </S.Footer>

      <TableModal
        onClosed={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
        isVisible={isTableModalVisible}
      />
    </>
  );
}

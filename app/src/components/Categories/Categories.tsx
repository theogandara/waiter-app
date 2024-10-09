import { FlatList } from 'react-native';
import { Text } from '../Text';

import * as S from './styles';
import { useState } from 'react';
import { Category } from '../../types/Category';

type CategoriesProps = {
  categories: Category[];
  onSelectedCategory: (categoryId: string) => void;
};

export function Categories({
  categories,
  onSelectedCategory,
}: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleCategoryPress(id: string) {
    const category = selectedCategory === id ? '' : id;

    onSelectedCategory(category);
    setSelectedCategory(category);
  }

  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        const isActive = selectedCategory === item._id;

        return (
          <S.Category onPress={() => handleCategoryPress(item._id)}>
            <S.Icon>
              <Text opacity={isActive ? 1 : 0.5}>{item.icon}</Text>
            </S.Icon>

            <Text opacity={isActive ? 1 : 0.5} size={14} weight="600">
              {item.name}
            </Text>
          </S.Category>
        );
      }}
    />
  );
}

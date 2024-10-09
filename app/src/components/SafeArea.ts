import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const SafeArea = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}` : '0'};
  background-color: #fafafa;
  flex: 1;
`;

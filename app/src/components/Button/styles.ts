import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${({ disabled }: { disabled: boolean }) =>
    disabled ? '#999' : '#d73035'};
  border-radius: 48px;
  padding: 14px 24px;
`;

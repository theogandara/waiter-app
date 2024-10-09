import { StatusBar } from 'expo-status-bar';
import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import * as S from './styles';

type OrderConfirmedModalProps = {
  isVisible: boolean;
  onOk: () => void;
};

export function OrderConfirmedModal({
  isVisible,
  onOk,
}: OrderConfirmedModalProps) {
  return (
    <Modal animationType="fade" visible={isVisible}>
      <StatusBar style="light" />
      <S.Container>
        <CheckCircle />

        <Text
          size={20}
          weight="600"
          color="#fff"
          style={{ marginTop: 12, marginBottom: 4 }}
        >
          Pedido confirmado!
        </Text>

        <Text opacity={0.9} color="#fff">
          O pedido já entrou na fila de produção
        </Text>

        <S.OkButton onPress={onOk}>
          <Text color="#d73035" weight="600">
            OK
          </Text>
        </S.OkButton>
      </S.Container>
    </Modal>
  );
}

import { useState } from 'react';
import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Button } from '../Button/button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import * as S from './styles';

type TableModalProps = {
  isVisible: boolean;
  onClosed: () => void;
  onSave: (table: string) => void;
};

export function TableModal({ isVisible, onClosed, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleSave() {
    onSave(table);
    setTable('');
    onClosed();
  }

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <S.Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <S.ModalBody>
          <S.Header>
            <Text weight="600">Informe a mesa</Text>

            <TouchableOpacity onPress={onClosed}>
              <Close color="#666" />
            </TouchableOpacity>
          </S.Header>

          <S.Form>
            <S.Input
              keyboardType="number-pad"
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              onChangeText={setTable}
            />

            <Button disabled={!table} onPress={handleSave}>
              Salvar
            </Button>
          </S.Form>
        </S.ModalBody>
      </S.Overlay>
    </Modal>
  );
}

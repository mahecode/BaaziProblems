import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import CustomSwipeModal from './CustomSwipeModal';

const TrySwipeModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Open Modal" onPress={() => setModalOpen(true)} />
      {isModalOpen && (
        <CustomSwipeModal
          closeOnBackDropTouch={true}
          isOpen={isModalOpen}
          direction="left"
          onClose={() => setModalOpen(false)}>
          <View
            style={{
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>This is the modal content</Text>
          </View>
        </CustomSwipeModal>
      )}
    </View>
  );
};

export default TrySwipeModal;

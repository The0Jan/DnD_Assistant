import { Text, View, useState } from 'react-native';
import { Modal } from 'react-native-modal';

export default function Popup()
{
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    return (
    <Modal isVisible={isModalVisible}>
      <View style={{ flex: 1 }}>
        <Text>Hello!</Text>

        <Button title="Hide modal" onPress={toggleModal} />
      </View>
    </Modal>
    );
}
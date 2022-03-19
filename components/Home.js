import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';



export default function Home({navigation}) {

    return (
        <View style={styles.container}>
          <Text>dupa</Text>
          <StatusBar style="auto" />
          <Button 
            title="GO!"
            onPress = { () => navigation.navigate('Character')}
            />

        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
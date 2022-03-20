import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function Sheet(prop) {


    return (
        <View style ={styles.item}>
                <Text style = {styles.level}> {prop.level} </Text>

                <Text style = {styles.name}>{prop.name}</Text>
          <StatusBar style="auto" />
        </View>
      );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    button: {
        flexDirection:'row',
        alignItems: 'center',
        flexWrap:'wrap'
    },
    name:{
        
        
    },
    level:{
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.6,
        borderRadius: 5,
        marginRight: 15
    }
  });
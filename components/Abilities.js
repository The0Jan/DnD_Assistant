import { StyleSheet, Text, View, Button } from 'react-native';

export default function Abilities({route, navigation}) {

  const {character} = route.params;


  
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text>Abilities</Text>
        <Text>{character.class}</Text>
        <Text>{character.name}</Text>

      </View>

      <View style = {styles.button_create}>
      <Button 
        title="Abilities"
        onPress = { () => inspect_abilities(character)}
        />
      </View>
    </View>
  );
}

function inspect_abilities(character){
  navigation.navigate('Character', {character});
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      backgroundColor: '#FFF',
      padding: 10,
      borderRadius: 10,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    button_create: {
      bottom: 15,
      paddingHorizontal:15,
      paddingVertical: 15,
      flex: 1,
      justifyContent: 'flex-end'
      
    }
  });
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default function Character({route, navigation}) {

  const {character} = route.params;

  function inspect_abilities(character){
    navigation.navigate('Abilities', {character});
  }



  function Stats(stat_name, stat_amount, color)
  {
    const statistics = StyleSheet.create({
      StatRow: {
        flexDirection: 'row',
        textAlign:'center',
        justifyContent:'space-between',
        backgroundColor: color,
        marginBottom:10,
        marginHorizontal:10,
        borderRadius: 10,
        borderColor: color,
        borderWidth: 5,
      },

    })
    return (
      <View style={statistics.StatRow}>
        <View style={styles.StatBox}>
          <Text style={texts.name}>{stat_name}</Text>
        </View>
        <View style={styles.StatRest}>
          <Text style={texts.amount}>{stat_amount}</Text>
        </View>
      </View>
    )
  }



  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.character_name}>
          <Text style={texts.character_name}>{character.name}</Text>
        </View>
        <View style={styles.character_level}>
          <Text style={texts.character_name}>LV.17</Text>
        </View>
      </View>


      <View style={{height:'70%'}}>
        {Stats("STR", 17, "orangered")}
        {Stats("DEX", 17, "olivedrab")}
        {Stats("CON", 17, "orange")}
        {Stats("INT", 17, "mediumturquoise")}
        {Stats("WIS", 17, "lightslategrey")}
        {Stats("CHA", 17, "orchid")}
      </View>


      <View style = {styles.button_create}>

        <Button 
        title="Abilities"
        onPress = { () => inspect_abilities(character)}
        />
        <Button 
        title="Spells"
        onPress = { () => inspect_abilities(character)}
        />
        <Button 
        title="Configure"
        onPress = { () => inspect_abilities(character)}
        />
      </View>
    </View>
  );
}


const texts = StyleSheet.create({
    character_name:{
      flexShrink:1,
      flexWrap:'wrap',
      textAlign:"center",
      fontSize:30,
    },
    name:{
      textAlign:"center",
      fontSize:30,
      color:"#FFFF"
    },
    amount:{
      textAlign:"center",
      fontSize:30,
    }
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAEBD7',
    },

    item: {
      flexShrink:1,
      backgroundColor: '#F0F8FF',
      padding: 15,
      flexDirection: 'row',
      marginBottom: 20,
      borderBottomWidth:5,
      borderTopWidth :5,
      borderColor:'goldenrod',
      alignItems:'center',
    },

    character_name:
    {
      alignContent:'center',
      borderRightColor:'goldenrod',
      borderRightWidth:5,
      width:'77%',
      flexShrink:1,
    },

    character_level:{
      width:'23%',
    },
    button_create: {
      flexDirection:'row',
      paddingHorizontal:15,
      paddingVertical: 15,
      flex:1,
      justifyContent:'space-evenly',

      height:'10%'
    },

    StatBox:{
      width:"40%",
    },
    StatRest:{
      borderRadius:10,
      backgroundColor:'#FFFF',
      width:"40%",
    }

  });
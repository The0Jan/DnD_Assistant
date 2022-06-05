import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Character({route, navigation}) {
  const {character} = route.params;
  const [my_character, setCharacter] = useState({});

  useEffect(() => {
    AsyncStorage.getItem(JSON.stringify(character))
    .then((value) => {
      var parsed = JSON.parse(value);
      setCharacter(parsed)})
  });


  function Stat(stat_name, stat_amount, color)
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

  function ShowcaseStats(character_stats)
  {
    if(typeof(character_stats)!="undefined")
    {
      return(
        <View style={{height:'70%'}}>
          {Stat("STR", character_stats.STR, "orangered")}
          {Stat("DEX", character_stats.DEX, "olivedrab")}
          {Stat("CON", character_stats.CON, "orange")}
          {Stat("INT", character_stats.INT, "mediumturquoise")}
          {Stat("WIS", character_stats.WIS, "lightslategrey")}
          {Stat("CHA", character_stats.CHA, "orchid")}
        </View>
      )
    }
  }

  function DeleteCharacter(char)
  {
    removeItemValue(char)
    navigation.navigate("Home")
  }

  function removeItemValue(key) {
    try {
        AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.character_name}>
          <Text style={texts.character_name}>{my_character.name}</Text>
        </View>
        <View style={styles.character_level}>
          <Text style={texts.character_name}>LV.{my_character.level}</Text>
        </View>
      </View>
      
      {ShowcaseStats(my_character.stats)}



      <View style = {styles.button_create}>
        <TouchableOpacity onPress={()=>navigation.navigate('Abilities', {my_character})}>
          <View style={styles.button}>
            <Text style={{color:'white', fontSize:20}}>ABILITIES</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Abilities', {character})}>
          <View style={styles.button}>
            <Text style={{color:'white', fontSize:20}}>SPELLS</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Edit Character', {my_character, character})}>
          <View style={styles.button}>
            <Text style={{color:'white', fontSize:20}}>EDIT</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={
          ()=>Alert.alert(
            "Warning",
            "Are you sure you want to delete this character sheet? This action can not be reverted.",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "Accept", onPress: () => DeleteCharacter(JSON.stringify(character)) }
            ]
            )}>
          <View style={styles.button}>
            <Text style={{color:'white', fontSize:20}}>DELETE</Text>
          </View>
        </TouchableOpacity>

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

    button:{
      backgroundColor:'grey',
      borderColor:'grey',
      borderRadius:5,
      borderWidth:6,
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
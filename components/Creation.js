import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button, Pressable } from 'react-native';
import { useState } from 'react';


export default function Creation({navigation}) {
    const [str, setStr] = useState(10);
    const [dex, setDex] = useState(10);
    const [con, setCon] = useState(10);
    const [wis, setWis] = useState(10);
    const [int, setInt] = useState(10);
    const [cha, setCha] = useState(10);

    const [lv, setLv] = useState(1);
    const [character_name, setName] = useState('');


    // ###################################################
    // STAT SECTION 
    // ###################################################
    function add(stat, changeStat){
      let new_stat = stat + 1;
      changeStat(new_stat);
    }

    function sub(stat, changeStat){
      let new_stat = stat - 1;
      changeStat(new_stat);
    }

    function Stats(stat_name, stat_count, color, change_stat)
    {

      let plus = false;
      if (stat_count >= 20){
        plus = true;
      }

      let minus = false;
      if (stat_count <= 1){
        minus = true;
      }
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
            <Text style={texts.amount}>{stat_count}</Text>
          </View>

          <View>
          <Pressable 
            style= {styles.press} 
            onPress={ () => add(stat_count, change_stat)}
            disabled = {plus}>
              <Text style={texts.press}>+</Text>
          </Pressable>
          </View>

          <View>
          <Pressable 
            style= {styles.press} 
            onPress={ () => sub(stat_count, change_stat)}
            disabled = {minus}>
              <Text style={texts.press}>-</Text>
          </Pressable>
          </View>

        </View>
      )
    }



    function NextCreationStep()
    {
      let name= character_name
      let level= lv
      let stats= 
      {
        STR:str,
        DEX:dex,
        CON:con,
        INT:int,
        WIS:wis,
        CHA:cha
      }
      navigation.navigate('Class Selection', {name, level, stats});
    }
    
    return (
        <View style={styles.container}>
          <View style={{height:"90%"}}>
          <View style={{flexDirection: 'row',
          textAlign:'center',
          backgroundColor: 'darkgoldenrod',
          marginBottom:5,
          marginTop:10,
          marginHorizontal:10,
          borderRadius: 10,
          borderColor: 'darkgoldenrod',
          borderWidth: 5,
          alignContent:'center'}}>


            <View style={{alignItems:'center',alignSelf:'center', flexWrap:'wrap'}}>
              <TextInput style={{      
                                borderRadius:10,
                                backgroundColor:'#FFFF',
                                fontSize:32,
                                flexShrink:10,
                                marginRight:10,
                                marginLeft:10}} 
                        placeholder= "Your character name ..."  
                        value={character_name}  
                        onChangeText={setName}/>
            </View>

          </View>


          <KeyboardAvoidingView>
          {Stats("LV.", lv, "darkgoldenrod", setLv)}
          {Stats("STR", str, "orangered", setStr)}
          {Stats("DEX", dex, "olivedrab", setDex)}
          {Stats("CON", con, "orange", setCon)}
          {Stats("INT", int, "mediumturquoise", setInt)}
          {Stats("WIS", wis, "lightslategrey", setWis)}
          {Stats("CHA", cha, "orchid", setCha)}


          </KeyboardAvoidingView>
          </View>
          <KeyboardAvoidingView>
          <View style={{borderRadius:5, margin:10 }}>
            <Button 
              onPress={() => NextCreationStep()} 
              title = "Save stats" 
              disabled={character_name == '' ? true: false}/>
          </View>
          </KeyboardAvoidingView>


        </View>   
      );
}

const texts = StyleSheet.create({
  character_name:{
    flexShrink:1,
    flexWrap:'wrap',
    textAlign:"center",
    fontSize:30,
    width:"80%"
  },
  name:{
    textAlign:"center",
    fontSize:32,
    color:"#FFFF"
  },
  amount:{
    textAlign:"center",
    fontSize:36,
  },
  press:{
    fontSize:36,
    color:'black'
  }
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAEBD7',
    },
    character_name:{
      backgroundColor:'green',


    },
    name_input:{
      flexDirection:'row',
      borderColor:'black',
      borderWidth:3,
      margin:10,
      backgroundColor:'white'
    },
    stat:{
      backgroundColor: '#ece4e2',
      padding: 10,
      borderRadius: 10,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    name:{
      marginRight: 15,
    },
    press:{
      width: 36,
      backgroundColor: '#F0FFFF',
      borderRadius: 5,
      marginRight: 5,
      marginLeft:5,
      alignItems:'center'
    },

    row: {
      flexDirection: 'row'
    },

    StatBox:{
      width:"20%",
    },
    StatRest:{
      borderRadius:10,
      backgroundColor:'#FFFF',
      width:"30%",
    }
  });
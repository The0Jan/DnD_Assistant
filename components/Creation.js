import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button, Pressable, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
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
      var new_stat = stat + 1;
      changeStat(new_stat);
    }

    function sub(stat, changeStat){
      var new_stat = stat - 1;
      changeStat(new_stat);
    }

    const Stat = (prop) => {

      let plus = false;
      if (prop.stat_count >= 20){
        plus = true;
      }

      let minus = false;
      if (prop.stat_count <= 0){
        minus = true;
      }

      return (
      <View style = {styles.stat}>
        <Text style = {styles.name}> {prop.stat_name}</Text>
        <Text style = {styles.count}> {prop.stat_count}</Text>

        <Pressable 
          style= {styles.up} 
          onPress={ () => add(prop.stat_count, prop.change_stat)}
          disabled = {plus}>
             <Text>
               {"+"}
             </Text>
        </Pressable>

        <Pressable 
          style= {styles.down} 
          onPress={ () => sub(prop.stat_count, prop.change_stat)}
          disabled = {minus}>
             <Text>
               {"-"}
             </Text>
        </Pressable>

      </View>
      )
    }

    function NextCreationStep()
    {
      var name= character_name
      var level= lv
      var stats= 
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
          <View>
            <Text>Character Name:</Text>
            <TextInput style={styles.character_name} value={character_name}  onChangeText={setName}/>
          <KeyboardAvoidingView>
            <Stat stat_name = {'LV.'} stat_count={lv} change_stat= {setLv} />

            <View style = {styles.row}>
              <Stat stat_name = {'STR'} stat_count={str} change_stat= {setStr} />
              <Stat stat_name = {'CON'} stat_count={con} change_stat= {setCon} />
            </View>
            <View style = {styles.row}>
              <Stat stat_name = {'DEX'} stat_count={dex} change_stat= {setDex} />
              <Stat stat_name = {'WIS'} stat_count={wis} change_stat= {setWis} />
            </View>
            <View style = {styles.row}>
              <Stat stat_name = {'INT'} stat_count={int} change_stat= {setInt} />
              <Stat stat_name = {'CHA'} stat_count={cha} change_stat= {setCha} />
            </View>
          <Button 
            onPress={() => NextCreationStep()} 
            title = "Save stats" 
            disabled={character_name == '' ? true: false}/>
          </KeyboardAvoidingView>
          </View>
        </View>   
      );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    character_name:{},

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
    count:{
      width: 24,
      height: 24,
      backgroundColor: '#55BCF6',
      opacity: 0.6,
      borderRadius: 5,
      marginRight: 15
  },
    up:{
      width: 24,
      height: 24,
      backgroundColor: '#55BCF6',
      opacity: 0.6,
      borderRadius: 5,
      marginRight: 15,
      marginLeft:15,
      color: '#ef1e1e'
    },
    down:{
      width: 24,
      height: 24,
      backgroundColor: '#55BCF6',
      opacity: 0.6,
      borderRadius: 5,
      marginRight: 15,
      marginLeft:15,
      color: '#ef1e1e'
    },


    row: {
      flexDirection: 'row'
    }
  });
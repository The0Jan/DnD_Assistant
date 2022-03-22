import { StyleSheet, Text, View, Form, KeyboardAvoidingView, TextInput, Button, Pressable, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
 ///


 // Trzeba zmienić wygląd przycisków 
 // i to jakoś wszystko uporządkować

export default function Creation() {
    const [str, setStr] = useState(10);
    const [dex, setDex] = useState(10);
    const [con, setCon] = useState(10);
    const [wis, setWis] = useState(10);
    const [int, setInt] = useState(10);
    const [cha, setCha] = useState(10);

    const [lv, setLv] = useState(0);

    const [selectedClass, setClass] = useState('');

    const [step, setStep] = useState(true);
    var name = '';


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

    // ###################################################
    // CLASSES SECTION 
    // ###################################################
  const CLASSES = [
  {
    class:"artificer",
    json: "class-artificer.json",
  },
  {
    class:"barbarian",
    json: "class-barbarian.json",
  },
  {
    class:"bard",
    json: "class-bard.json",
  },
  {
    class:"cleric",
    json: "class-cleric.json",
  },
  {
    class:"druid",
    json: "class-druid.json",
  },
  {
    class:"fighter",
    json: "class-fighter.json",
  },
  {
    class:"monk",
    json: "class-monk.json",
  },
  {
    class:"paladin",
    json: "class-paladin.json",
  },
  {
    class:"ranger",
    json: "class-ranger.json",
  },
  {
    class:"rogue",
    json: "class-rogue.json",
  },
  {
    class:"sorcerer",
    json: "class-sorcerer.json",
  },
  {
    class:"warlock",
    json: "class-warlock.json",
  },
  {
    class:"wizard",
    json: "class-wizard.json",
  }
  ];


  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.class}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.class === selectedClass ? "#6e3b6e" : "#f9c2ff";
    const color = item.class === selectedClass ? 'white' : 'black';
  
    return (
      <Item
        item={item}
        onPress={() => setClass(item.class)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
    };


   
    // ###################################################
    // ALL SECTION 
    // ###################################################

    const Creation_step = () =>{
      if (step){
      return(
      <KeyboardAvoidingView>
        <Stat stat_name = {'LV.'} stat_count={lv} change_stat= {setLv} />

        <Text>Character Name:</Text>
        <TextInput style={styles.character_name} placeholder={'Character name'} />
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
      </KeyboardAvoidingView>
      )}
      else {
      return(
      <SafeAreaView style={styles.container}>
        <FlatList
          data={CLASSES}
          renderItem={renderItem}
          keyExtractor={(item) => item.class}
          extraData={selectedClass}
        />
      </SafeAreaView>
      )}
    };


    


    return (
        <View style={styles.container}>
          <Creation_step/>
          <Button onPress={() => setStep(false)} title = "proceed"/>
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
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    row: {
      flexDirection: 'row'
    }
  });
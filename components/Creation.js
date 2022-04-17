import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Button, Pressable, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
 ///


 // Trzeba zmienić wygląd przycisków 
 // i to jakoś wszystko uporządkować

export default function Creation({navigation}) {
    const [str, setStr] = useState(10);
    const [dex, setDex] = useState(10);
    const [con, setCon] = useState(10);
    const [wis, setWis] = useState(10);
    const [int, setInt] = useState(10);
    const [cha, setCha] = useState(10);

    const [lv, setLv] = useState(1);
    const [character_name, setName] = useState('');
    const [selectedClass, setClass] = useState('');
    const [selectedSubclass, setSubclass] = useState('');

    const [json, setJson] = useState([]);
    const [ready, setReady] = useState(false);

    const [step, setStep] = useState(0);
    


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
  { name:"barbarian"},
  { name:"bard"},
  { name:"cleric"},
  { name:"druid"},
  { name:"fighter"},
  { name:"monk"},
  { name:"paladin"},
  { name:"ranger"},
  { name:"rogue"},
  { name:"sorcerer"},
  { name:"warlock"},
  { name:"wizard"}
  ];


  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderClass = ({ item }) => {
    const backgroundColor = item.name === selectedClass ? "#6e3b6e" : "#f9c2ff";
    const color = item.name === selectedClass ? 'white' : 'black';
  
    return (
      <Item
        item={item}
        onPress={() => setClass(item.name)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
    };

    // ###################################################
    // SUBCLASS SECTION 
    // ###################################################
    
    const renderSubclass = ({ item }) => {
      const backgroundColor = item.name === selectedSubclass ? "#6e3b6e" : "#f9c2ff";
      const color = item.name === selectedSubclass ? 'white' : 'black';
    
      return (
        <Item
          item={item}
          onPress={() => setSubclass(item.name)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
      };



    // ###################################################
    // ALL SECTION 
    // ###################################################

    function getJson(){
      fetch(`https://5e.tools/data/class/class-${selectedClass}.json`, {method: 'GET'})
      .then( (response) => response.json())
      .then( (responseJson) => {setJson(responseJson)})
      .then( () => setReady(true))
    }

    const storeData = async(value) =>{
      try {
        const keyed = { name :value.name,class: value.class[0].name}
        const key = JSON.stringify(keyed)
        const JValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, JValue)
      } catch(e){
        console.log(e)
      }
    }

    function generateSheet(){
      var sheet = {
        name: character_name,
        level: lv,
        stats: 
        {
          STR:str,
          DEX:dex,
          CON:con,
          INT:int,
          WIS:wis,
          CHA:cha
        },
        class: json.class,
        subclass: selectedSubclass,
        classFeatures: json.classFeatures,
        subclassFeatures: []
      };

      var sub_found;
      for (var suby in json.subclass){

        if (json.subclass[suby].name == selectedSubclass){
          sub_found = json.subclass[suby].shortName;
        }
      }
      
      for (var feat in json.subclassFeature){
        if(json.subclassFeature[feat].subclassShortName == sub_found){
          sheet.subclassFeatures.push(json.subclassFeature[feat]);
        }
      }

      storeData(sheet);
    }

    function Creation_step(){
      if (step == 0){
      return(
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
        onPress={() => setStep(1)} 
        title = "Save stats" 
        disabled={character_name == '' ? true: false}/>
      </KeyboardAvoidingView>
      </View>
      )}
      else if(step == 1) {


      return(
      <SafeAreaView style={styles.container}>
        <FlatList
          data={CLASSES}
          renderItem={renderClass}
          keyExtractor={(item) => item.name}
          extraData={selectedClass}
        />
      <Button 
        onPress={() => {setStep(2); getJson()}} 
        title = "Save Class"
        disabled = {selectedClass == '' ? true: false}/>

      <Button
        onPress={() => setStep(0)}
        title = "Go back" />
      </SafeAreaView>
      )}
      else if(step ==2 ){
      
        if(ready != true){
          return (
          <Text>
          {"wait bitch"}
          </Text>
          )}
        else{
         return(

        <SafeAreaView style={styles.container}>
          <FlatList
            data={json.subclass}
            renderItem={renderSubclass}
            keyExtractor={(item) => item.name}
            extraData={selectedSubclass}
          />
        <Button 
          onPress={() => {generateSheet(); navigation.navigate('Home') }} 
          title = "Create Character Sheet"
          disabled = {selectedSubclass == '' ? true: false}/>
          
        <Button
          onPress={() => setStep(1)}
          title = "Go back" />
        </SafeAreaView>
        )}}
    };


    

  // To co właściwie renderuje
    return (
        <View style={styles.container}>
          <Creation_step/>
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
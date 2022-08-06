import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
 ///


 // Trzeba zmienić wygląd przycisków 
 // i to jakoś wszystko uporządkować

export default function ClassSelection({route, navigation}) {

    const {name, level, stats} = route.params;

    const [selectedClass, setClass] = useState('');
    const [selectedSubclass, setSubclass] = useState('');

    const [json, setJson] = useState([]);
    const [ready, setReady] = useState(false);

    const [step, setStep] = useState(0);
    

    // ###################################################
    // CLASSES SECTION 
    // ###################################################
    const CLASSES = [
    { name:"artificer"},
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


  const Item = ({ item, onPress, backgroundColor, textColor, key }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]} key={key}>
      <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderClass = ({ item }) => {
    const backgroundColor = item.name === selectedClass ? "#778899" : "#D3D3D3";
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
      const backgroundColor = item.name === selectedSubclass ? "#778899" : "#D3D3D3";
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
      let sheet = {
        name: name,
        level: level,
        stats: stats,
        class: json.class,
        subclass: selectedSubclass,
        classFeatures: json.classFeature,
        subclassFeatures: []
      };

      let sub_found;
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
    if(step == 0) {
      return(
      <SafeAreaView style={styles.container}>
        <FlatList
          data={CLASSES}
          renderItem={renderClass}
          keyExtractor={(item, index) => (item.name, index)}
          extraData={selectedClass}
        />

        <View style={{marginBottom:5, borderRadius:20, marginLeft:5, marginRight:5}}>
        <Button 
          onPress={() => {setStep(1); getJson()}} 
          title = "Save Class"
          disabled = {selectedClass == '' ? true: false}/>
      </View>
      </SafeAreaView>
      )}

      else if(step ==1 ){
      
        if(ready != true){
          return (
          <Text>
          {"Loading..."}
          </Text>
          )}
        else{
         return(

        <SafeAreaView style={styles.container}>
          <FlatList
            data={json.subclass}
            renderItem={renderSubclass}
            keyExtractor={(item, index) => index.toString()}
            extraData={selectedSubclass}
          />
        
        <View style={{marginBottom:5, borderRadius:20, marginLeft:5, marginRight:5}}>
          <Button 
            onPress={() => {generateSheet(); navigation.navigate('Home') }} 
            title = "Create Character Sheet"
            disabled = {selectedSubclass == '' ? true: false}/>
          </View>
          <View style={{borderRadius:20, marginLeft:5,marginRight:5}}>
          <Button
            onPress={() => setStep(0)}
            title = "Go back" />
        </View>

        </SafeAreaView>
        )}}
    }

    return (
        <View style={styles.container}>
            <Creation_step></Creation_step>
        </View>   
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    name:{
      marginRight: 15,
    },

    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius:10
    },
    title: {
      fontSize: 32,
    },

  });
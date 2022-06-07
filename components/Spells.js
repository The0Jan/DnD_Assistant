import { StyleSheet, Text, View, Button, ScrollView,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Modal  from 'react-native-modal';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';

export default function Spells({route, navigation}) {
  const [isModalVisible, setModalVisible] = useState(false)
  const [lookedUp, setLookedUp] = useState([]);
  const [meMage, setMage] = useState('');
  const [meSpells, setSpells] = useState([]);
  const [spellLevel, setLevel] = useState(0);

  const {character} = route.params;


  useEffect(() => {
    
    if(meMage == '')
    {
        var DoIMage = { name :character.name , class:character.class, spells:'yes'}
        setMage(JSON.stringify(DoIMage))
    }
    else{
        AsyncStorage.getItem(meMage)
        .then((value) => {
            if(value != null){
                var parsed = JSON.parse(value);
                setSpells(parsed)}
            })
    }
  });


  function DeleteSpell(index)
  {
    meSpells.splice(index, 1);
    
    storeData(meSpells);
  }

  const storeData = async(value) =>{
      try {
        const JValue = JSON.stringify(value)
        await AsyncStorage.setItem(meMage, JValue)
      } catch(e){
        console.log(e)
      }
    }

  function Showcase_spells(my_spells)
  {
    return(
      <ScrollView>
      {my_spells.map((element,index) => {
          if(element.level == spellLevel)
            return(Spell(element,index, 'grey'));
      })}
      </ScrollView>
    )
  }

  function SetUpModal(ability_text)
  {
    setModalVisible(true);
    setLookedUp(ability_text);
  }

  function Spell(ability,index, color)
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
      <TouchableOpacity onPress={()=>SetUpModal(ability.entries) }>
        <View style={statistics.StatRow}>
          <View style={styles.AbilityBox}>
            <Text style={{fontSize:22, color:'white'}}>{ability.level}</Text>
          </View>
          <View style={styles.AbilityRest}>
            <Text style={{fontSize:22}}>{ability.name}</Text>
          </View>
          <TouchableOpacity onPress={() => DeleteSpell(index)}>
            <View style={{marginLeft:4, marginRight:8, alignContent:'center', borderWidth:2, borderRadius:10, backgroundColor:'firebrick', borderColor:'firebrick'}}>
              <Text style={{fontSize:24, color:'white'}}>
                DELETE
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  function ShowModal()
  {
    return(
      <View>
        <Modal isVisible={isModalVisible}>
        <View style={{alignContent:'center'}}>
          <ScrollView>
            <View style={{ 
                        backgroundColor:'white', 
                        margin:20, 
                        borderWidth:10, 
                        borderColor:'white',
                        borderRadius:10 }}>
              {lookedUp.map(text => {
                if(typeof(text) == 'string')
                  return(HandleText(text))
                else if(text.type == 'list')
                  return(HandleManyTexts(text.items))
              })}
            </View>
          </ScrollView>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <View style={{
                          backgroundColor:'lightblue',
                          borderRadius:20,
                          marginLeft:40,
                          marginRight:40
                          }}>
              <Text style={{textAlign:'center', fontSize:24}}>
                CLOSE
              </Text>
            </View>
          </TouchableOpacity>
          </View>
        </Modal>
    </View>
    )
  }

  function HandleText(text)
  {
    return(
      <View>
        <Text style={{fontSize:22}}>
          {text}
        </Text>
      </View>
    )
  }

  function HandleManyTexts(manytexts)
  {
    return(
      <View>
      {manytexts.map(element => {
        return(HandleText(element))
      })
      }
      </View>
    )
  }

  const spells = ["Cantrip", "Level 1", "Level 2", "Level 3","Level 4","Level 5","Level 6","Level 7","Level 8","Level 9"];
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{alignItems:'center', marginBottom:10}}>
          <SelectDropdown
          dropdownStyle={{backgroundColor:'white'}}
	        data={spells}
          defaultButtonText="Select spell level"
	        onSelect={(selectedItem, index) => {
            setLevel(index);
	        }}
	        buttonTextAfterSelection={(selectedItem, index) => {
	        	return selectedItem
	        }}
	        rowTextForSelection={(item, index) => {
	        	return item
	        }}/>
        </View>
      {Showcase_spells(meSpells)}
      </SafeAreaView>
      {ShowModal()}
      <View style = {styles.button_create}>
      <Button 
          title="Get New Spells"
          onPress = { () =>   navigation.navigate('Edit Spells List', {meMage})}
          />
        </View>
    </View>
  );
}

const text_styles = StyleSheet.create({
  texts:{}
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightgrey',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      backgroundColor: '#FFF',
      padding: 5,
      alignContent: 'center',
      marginBottom: 20,
      borderColor:'grey',
      borderWidth:7,
      borderRadius:10
    },
    button_create: {
      bottom: 15,
      paddingHorizontal:15,
      paddingVertical: 15,
      justifyContent: 'flex-end'
    },
    drop_list:{
      flexDirection:'column',
      borderWidth:10,
    },
    drop_list_item:
    {
      backgroundColor:'white',
      marginBottom:5,
      marginTop:5,
      marginLeft:10,
      marginRight:10,
      flexDirection:'row',
      alignItems:'center',
      alignContent:'space-between',
      borderWidth:30,
      borderColor:'magenta'
    },

    AbilityBox:{
      width:"10%",
      alignItems:'center'
    },
    AbilityRest:{
      borderRadius:5,
      backgroundColor:'#FFFF',
      width:"60%",
      alignItems:'center'
    }

  });
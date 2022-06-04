import { StyleSheet, Text, View, Button, ScrollView,TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import  Modal  from 'react-native-modal';
import { useEffect, useState } from 'react';

export default function Abilities({route, navigation}) {
  const [isModalVisible, setModalVisible] = useState(false)
  const [lookedUp, setLookedUp] = useState([]);

  const {my_character} = route.params;

  function Showcase_skills(class_skills)
  {
    return(
      <ScrollView>
      {class_skills.map(element => {
        if(element.level <= my_character.level)
        {
          return(Stat(element, 'grey'));
        }
      })}
      </ScrollView>
    )
  }

  function SetUpModal(ability_text)
  {
    setModalVisible(true);
    setLookedUp(ability_text);
  }

  function Stat(ability, color)
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

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.item}>
          <Text style={{fontSize:28, alignSelf:'center'}}>{my_character.class[0].name}</Text>
        </View>

        {Showcase_skills(my_character.classFeatures)}
      </SafeAreaView>

      {ShowModal()}

      <View style = {styles.button_create}>
        <Button 
          title="Subclass abilities"
          onPress = { () =>   navigation.navigate('Subclass', {my_character})}
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
      width:"80%",
      alignItems:'center'
    }

  });
import { StyleSheet, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Sheet from './Sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
    const [all_characters, setCharacters] = useState([]);
    let isMounted = true;


    useEffect(() => {
        AsyncStorage.getAllKeys()
        .then((value) => {
          if(isMounted)
          {
          let parsed_keys = []
          value.forEach((item,index) => {
            let parsed_item = JSON.parse(item);
            if(!parsed_item.hasOwnProperty("spells"))
            {
              parsed_keys.push(parsed_item);
            }
          })
          setCharacters(parsed_keys)
          }
        });
        return () => {
          isMounted = false;
        };
    });

    function inspect_sheet(character){
        navigation.navigate('Character', {character});
    }

    return (
        <View style={styles.container}>

          <ScrollView style={styles.sheet_wrapper}>
            { 
              all_characters.map((character, index) => 
              {
                return (
                  <TouchableOpacity key={index} onPress={()=>inspect_sheet(character)}>

                    <Sheet name={character.name} class ={character.class} />
                  </TouchableOpacity>
              )})
            }
          </ScrollView>

          <View style = {styles.button_create}>
            <Button 
              title="Create Character"
              onPress = { () => navigation.navigate('Creation')}
              />
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#A9A9A9',

    },
    sheet_wrapper: {
      maxHeight: "85%" ,
      paddingTop: 30,
      paddingBottom: 20,
      paddingHorizontal: 15,
    },

    single_sheet: {
      marginTop: 30,
      marginBottom: 30
    },

    button_create: {
      bottom: 15,
      paddingHorizontal:15,
      paddingVertical: 15,
      flex: 1,
      justifyContent: 'flex-end'
      
    }
  });
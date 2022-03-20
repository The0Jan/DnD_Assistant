import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import Sheet from './Sheet';

export default function Home({navigation}) {



    var all_characters = [
      {name :"grogu", level:19},
      {name: "boy", level:1},
      {name: "natasha", level:3},
      {name: "doy ", level:13},
      {name: "natassha", level:12},
      {name: "soy", level:14},


    ]

    return (
        <View style={styles.container}>

          <ScrollView style={styles.sheet_wrapper}>
            { 
              all_characters.map((character) => 
              {
                return <Sheet name={character.name} level ={character.level} />
              })
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
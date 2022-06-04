import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Abilities({route, navigation}) {

  const {my_character} = route.params;

  function print(thing)
  {
    console.log(thing)
  }
  
  function Showcase_skills(class_skills)
  {

    return(
      <ScrollView>
      {class_skills.map(element => {
        if(element.level <= my_character.level)
        {
          print(element.name);
          print(element.level);
          return(Showcase(element));
        }
      })}
      </ScrollView>
    )
  }

  function Showcase(ability)
  {
    return(
      <View style = {styles.drop_list_item}>
        <View>
          <Text>Lv.{ability.level}</Text>
        </View>
        <View>
          <Text>{ability.name}</Text>
        </View>        
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.item}>
          <Text>{my_character.class.source}</Text>
          <Text>{my_character.subclass}</Text>
        </View>

        {Showcase_skills(my_character.classFeatures)}
      </SafeAreaView>
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
      backgroundColor: '#333',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      backgroundColor: '#FFF',
      padding: 10,
      borderRadius: 10,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: 'space-between',
      marginBottom: 20
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
      backgroundColor:'lightgrey',
      marginBottom:5,
      marginTop:5,
      marginLeft:10,
      marginRight:10,
      flexDirection:'row',
      alignItems:'center',
      alignContent:'space-between'
    },
  });
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Home from './components/Home';
import Character from './components/Character';
import Creation from './components/Creation';
import Abilities from './components/Abilities';
import Subclass from './components/Subclass';
import ClassSelection from './components/ClassSelection';
import EditCharacter from './components/EditCharacter';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Character" component={Character} />
        <Stack.Screen name="Creation" component={Creation} />
        <Stack.Screen name="Abilities" component={Abilities} />
        <Stack.Screen name="Subclass" component={Subclass} />
        <Stack.Screen name="Class Selection" component={ClassSelection} />
        <Stack.Screen name="Edit Character" component={EditCharacter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";

import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import IdeaScreen from "./screens/IdeaScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen";

import { StyleSheet, Pressable, Text } from "react-native";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="People"
          component={PeopleScreen}
          options={{
            headerRight: () => {
              return (
                <Pressable
                  onPress={() => {
                    alert("Add Person");
                  }}
                >
                  <Text>Add Person</Text>
                </Pressable>
              );
            },
          }}
        />
        <Stack.Screen name="AddPerson" component={AddPersonScreen} />
        <Stack.Screen name="Idea" component={IdeaScreen} />
        <Stack.Screen name="AddIdea" component={AddIdeaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

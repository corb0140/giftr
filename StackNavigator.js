import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import IdeaScreen from "./screens/IdeaScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen";

import { StyleSheet, Pressable, Text } from "react-native";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="People"
            component={PeopleScreen}
            options={({ navigation }) => ({
              headerRight: () => {
                return (
                  <Pressable onPress={() => navigation.navigate("AddPerson")}>
                    <Text>Add Person</Text>
                  </Pressable>
                );
              },
            })}
          />
          <Stack.Screen name="AddPerson" component={AddPersonScreen} />
          <Stack.Screen
            name="Idea"
            component={IdeaScreen}
            options={({ navigation }) => ({
              headerRight: () => {
                return (
                  <Pressable onPress={() => navigation.navigate("AddIdea")}>
                    <Text>Add Idea</Text>
                  </Pressable>
                );
              },
            })}
          />
          <Stack.Screen name="AddIdea" component={AddIdeaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Navigation;

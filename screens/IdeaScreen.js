import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const IdeaScreen = ({ route }) => {
  const { itemId, name } = route.params;
  const { ideas } = useSelector((state) => state.ideas);

  useEffect(() => {
    console.log(ideas);
  }, [ideas]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.textView}>
          <Text style={styles.heading}>Ideas for {name}</Text>
        </View>

        <View style={styles.ideaListView}>
          {ideas.length === 0 ? (
            <View style={styles.ideaListMessageView}>
              <Text style={styles.ideaListMessage}>No Ideas Added Yet</Text>
            </View>
          ) : (
            <FlatList data={ideas} />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default IdeaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textView: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  ideaListView: {
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  ideaListMessageView: {
    borderWidth: 1,
    borderColor: "#a0a0a0",
    padding: 10,
  },
  ideaListMessage: {
    fontSize: 22,
    color: "#101010",
  },
});

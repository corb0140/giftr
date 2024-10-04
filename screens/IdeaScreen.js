import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { assignName, assignId } from "../redux/slices/ideaSlice";

const IdeaScreen = ({ route }) => {
  const { itemId, name } = route.params;
  const { ideas } = useSelector((state) => state.ideas);
  const dispatch = useDispatch();

  dispatch(assignName(name), assignId(itemId));

  useEffect(() => {
    console.log(ideas);
  }, [ideas]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Pressable style={styles.fab}>
        <Text>Add Idea</Text>
      </Pressable> */}

      <View style={styles.textView}>
        <Text style={styles.heading}>Ideas for {name}</Text>
      </View>

      <View style={styles.ideaListView}>
        {ideas.length === 0 ? (
          <View style={styles.ideaListMessageView}>
            <Text style={styles.ideaListMessage}>No Ideas Added Yet</Text>
          </View>
        ) : (
          <FlatList
            data={ideas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.ideaListMessageView}>
                <Text style={styles.ideaListMessage}>{item.idea}</Text>
              </View>
            )}
          />
        )}
      </View>
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
  fab: {
    position: "absolute",
    zIndex: 1,
    right: 10,
    top: 0,
  },
});

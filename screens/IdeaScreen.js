import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { assignName, assignId } from "../redux/slices/personSlice";

const IdeaScreen = ({ route }) => {
  const { id, name } = route.params;
  const { people } = useSelector((state) => state.people);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(assignName(name));
    dispatch(assignId(id));
  }, [dispatch, id, name]);

  const personIdeas = people.find((person) => person.id === id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.heading}>Ideas for {name}</Text>
      </View>

      <View style={styles.ideaListView}>
        {personIdeas && personIdeas.ideas.length === 0 ? (
          <View style={styles.ideaListMessageView}>
            <Text style={styles.ideaListMessage}>No Ideas Added Yet</Text>
          </View>
        ) : (
          <FlatList
            data={personIdeas?.ideas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.ideaListMessageView}>
                <Text style={styles.ideaListMessage}>{item.id}</Text>
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

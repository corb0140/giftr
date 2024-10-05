import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  assignName,
  assignId,
  deletePersonIdea,
} from "../redux/slices/personSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IdeaScreen = ({ route }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { id, name } = route.params;
  const { people } = useSelector((state) => state.people);
  const dispatch = useDispatch();

  const personIdeas = people.find((person) => person.id === id);

  useEffect(() => {
    dispatch(assignName(name));
    dispatch(assignId(id));
  }, [dispatch, id, name]);

  const deletePersonIdeaHandler = (ideaId) => {
    dispatch(deletePersonIdea({ personId: id, ideaId: ideaId }));
  };

  useEffect(() => {
    const getDimensions = async () => {
      const storedWidth = await AsyncStorage.getItem("width");
      const storedHeight = await AsyncStorage.getItem("height");

      setDimensions({
        width: JSON.parse(storedWidth),
        height: JSON.parse(storedHeight),
      });
    };
    getDimensions();
  }, []);

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
            style={{ marginBottom: 80 }}
            data={personIdeas?.ideas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.ideaListMessageView}>
                <Text style={styles.ideaListMessage}>{item.idea}</Text>
                <Image
                  source={{ uri: item.img }}
                  style={{ width: dimensions.width, height: dimensions.height }}
                />
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => {
                    deletePersonIdeaHandler(item.id);
                  }}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </Pressable>
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
  deleteButton: {
    marginVertical: 10,
    backgroundColor: "#d10000",
    padding: 10,
    width: 100,
    alignItems: "center",
  },
  deleteButtonText: {
    textTransform: "uppercase",
    fontSize: 16,
  },
});

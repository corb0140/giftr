import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
} from "react-native";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { useEffect, useState } from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ModalComponent from "../components/Modal";

import { useSelector, useDispatch } from "react-redux";
import { deletePerson } from "../redux/slices/personSlice";

const PeopleScreen = ({ navigation }) => {
  const { people } = useSelector((state) => state.people);
  const [sortedPeople, setSortedPeople] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setSortedPeople([...people]);
  }, [people]);

  const renderRightActions = (id) => (
    <Pressable
      style={styles.deleteButton}
      onPress={() => {
        dispatch(deletePerson(id));
      }}
    >
      <FontAwesome6 name="trash" size={30} color="white" />
    </Pressable>
  );

  const renderItem = ({ item }) => {
    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <View style={styles.itemContainer}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDate}>{item.dob}</Text>
          </View>

          <MaterialIcons
            name="lightbulb"
            size={35}
            color="black"
            onPress={() =>
              navigation.navigate("Idea", {
                id: item.id,
                name: item.name,
              })
            }
          />
        </View>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView>
        <View style={styles.textView}>
          <Text style={styles.heading}>People List</Text>
        </View>

        <View style={styles.peopleListView}>
          {people.length === 0 ? (
            <View style={styles.peopleListMessageView}>
              <Text style={styles.peopleListMessage}>
                No people have been added yet
              </Text>
            </View>
          ) : (
            <FlatList
              data={sortedPeople.sort((a, b) => a.dob.localeCompare(b.dob))}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          )}
        </View>

        {people.length === 0 && (
          <ModalComponent
            text="Please add a person"
            visible={!modalVisible}
            close={() => {
              setModalVisible(!modalVisible);
            }}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PeopleScreen;

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
  peopleListView: {
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  peopleListMessageView: {
    borderBottomWidth: 2,
    borderBottomColor: "#f0f0f0",
  },
  peopleListMessage: {
    fontSize: 22,
    color: "#a0a0a0",
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 2,
    borderBlockColor: "#d0d0d0",
    padding: 10,
  },
  itemInfo: {
    flexDirection: "column",
    gap: 8,
  },
  itemName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  itemDate: {
    fontSize: 18,
    color: "#1a1a1a",
    opacity: 0.5,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d10000",
    width: 80,
  },
});

import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const PeopleScreen = ({ navigation }) => {
  const { people } = useSelector((state) => state.people);

  useEffect(() => {
    console.log(people);
    // if (people.length == 0) {
    //   alert("Please add a person");
    // }
  }, [people]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.heading}>People List</Text>
      </View>

      <View style={styles.peopleListView}>
        {people.length === 0 ? (
          <View style={styles.test}>
            <Text style={styles.peopleListMessage}>
              No people have been added yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDate}>{item.date}</Text>
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
            )}
          />
        )}
      </View>
    </SafeAreaView>
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
  test: {
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
});

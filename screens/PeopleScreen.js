import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";

import { useEffect } from "react";
import { useSelector } from "react-redux";

const PeopleScreen = () => {
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
          <Text style={styles.peopleListMessage}>
            No people have been added yet
          </Text>
        ) : (
          <>
            <Text>People List</Text>

            <FlatList
              data={people}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDate}>{item.date}</Text>
                </View>
              )}
            />
          </>
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
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  peopleListView: {
    paddingLeft: 10,
    paddingTop: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#f0f0f0",
  },
  peopleListMessage: {
    fontSize: 22,
    color: "#a0a0a0",
    padding: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemDate: {
    fontSize: 16,
    color: "#a0a0a0",
  },
});

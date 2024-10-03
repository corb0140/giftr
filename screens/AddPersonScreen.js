import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import uuid from "react-native-uuid";

import { useDispatch } from "react-redux";
import { addPerson } from "../redux/slices/personSlice";
import { useState } from "react";

const AddPersonScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState("");
  const [name, setName] = useState("");

  const person = {
    id: uuid.v4(),
    name: name,
    date: selectedDate,
  };

  const addPersonHandler = (person) => {
    dispatch(addPerson(person));
  };

  const resetFormHandler = () => {
    setName("");
    setSelectedDate("");
  };

  return (
    <SafeAreaView>
      <View style={styles.textView}>
        <Text style={styles.heading}>Add a Person</Text>
      </View>

      <View style={styles.formView}>
        <View>
          <Text style={{ paddingBottom: 5 }}>Person's Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#1a1a1a"
            onChangeText={(text) => setName(text)}
          />
        </View>

        <DatePicker
          onSelectedChange={(selectedDate) => {
            setSelectedDate(selectedDate);
          }}
          mode="calendar"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: "deepskyblue" }]}
          onPress={() => {
            addPersonHandler(person), navigation.navigate("People");
          }}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={() => {
            resetFormHandler(), navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddPersonScreen;

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
  formView: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 40,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBlockColor: "#1a1a1a",
    marginBottom: 20,
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 20,
  },
  button: {
    alignItems: "center",
    padding: 12,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 15,
    textTransform: "uppercase",
  },
});

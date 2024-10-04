import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import uuid from "react-native-uuid";
import { Platform } from "react-native";

import { useDispatch } from "react-redux";
import { addPerson } from "../redux/slices/personSlice";
import { useState } from "react";
import ModalComponent from "../components/Modal";

const AddPersonScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState("");
  const [name, setName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const person = {
    id: uuid.v4(),
    name: name,
    dob: selectedDate,
  };

  const addPersonHandler = (person) => {
    if (person.name === "" || person.dob === "") {
      setModalVisible(true);
    } else {
      dispatch(addPerson(person));
      navigation.navigate("People");
    }
  };

  const resetFormHandler = () => {
    setName("");
    setSelectedDate("");
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
            style={[styles.button, { backgroundColor: "#0075f2" }]}
            onPress={() => {
              addPersonHandler(person);
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: "#d10000" }]}
            onPress={resetFormHandler}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      {modalVisible && (
        <ModalComponent
          text="Please fill in all fields"
          visible={modalVisible}
          close={() => {
            setModalVisible(!modalVisible);
          }}
        />
      )}
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

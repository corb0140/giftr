import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
  Image,
} from "react-native";

import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";

import { useState } from "react";
import { useSelector } from "react-redux";
import { addPersonIdea } from "../redux/slices/personSlice";
import ModalComponent from "../components/Modal";

const AddIdeaScreen = ({ navigation }) => {
  const { name, id } = useSelector((state) => state.people);
  const dispatch = useDispatch();

  const [idea, setIdea] = useState("");
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [aspectRatio, setAspectRatio] = useState([2 / 3]);

  const addIdeaHandler = () => {
    if (idea === "") {
      setModalVisible(true);
    } else {
      dispatch(
        addPersonIdea({
          personId: id,
          idea: { id: uuid.v4(), idea: idea, img: image, width: 0, height: 0 },
        })
      );
      navigation.navigate("Idea", {
        id: id,
        name: name,
      });
    }
  };

  const resetFormHandler = () => {
    set("");
    setImage(null);
    navigation.goBack();
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.textView}>
          <Text style={styles.heading}>Add Idea for {name}</Text>
        </View>

        <View style={styles.formView}>
          <View>
            <Text style={{ paddingBottom: 5 }}>Gift idea</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setIdea(text)}
            />
          </View>

          <View>
            <Pressable onPress={takePhoto} style={styles.cameraButton}>
              <Text style={styles.text}>Camera</Text>
            </Pressable>
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, { backgroundColor: "#0075f2" }]}
            onPress={addIdeaHandler}
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
          text="Please add an idea and an image"
          visible={modalVisible}
          close={() => {
            setModalVisible(!modalVisible);
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default AddIdeaScreen;

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
  image: {
    width: "60%",
  },
});

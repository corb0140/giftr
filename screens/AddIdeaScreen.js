import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";

import { useState } from "react";
import { useSelector } from "react-redux";
import { addIdea } from "../redux/slices/ideaSlice";
import ModalComponent from "../components/Modal";

const AddIdeaScreen = ({ navigation }) => {
  const { name, id } = useSelector((state) => state.ideas);
  const dispatch = useDispatch();
  const [idea, setIdea] = useState("");
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [ratio, setRatio] = useState(0);

  const gift = {
    idea: idea,
    image: image,
  };

  const addIdeaHandler = (gift) => {
    if (gift.idea === "" || gift.image === null) {
      setModalVisible(true);
    } else {
      dispatch(addIdea(gift));
      navigation.navigate("Idea", {
        itemId: id,
        name: name,
      });
    }
  };

  const resetFormHandler = () => {
    setGift("");
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
      aspect: [2, 3],
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

          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, { backgroundColor: "#0075f2" }]}
            onPress={() => {
              addIdeaHandler(gift);
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

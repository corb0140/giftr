import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const IdeaScreen = ({ route }) => {
  const { itemId, name } = route.params;
  const { ideas } = useSelector((state) => state.ideas);

  useEffect(() => {
    console.log(ideas);
  }, [ideas]);

  return (
    <SafeAreaView>
      <View>
        <Text>{name}'s List</Text>
      </View>

      <FlatList data={ideas} />
      <Text>IdeaScreen</Text>
    </SafeAreaView>
  );
};

export default IdeaScreen;

const styles = StyleSheet.create({});

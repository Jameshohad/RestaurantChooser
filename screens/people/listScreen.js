import React, { useState, useEffect } from "react";
import { View, FlatList, Alert, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/customButton";
import Toast from "react-native-toast-message";

const ListScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const data = await AsyncStorage.getItem("people");
      if (data) setPeople(JSON.parse(data));
    };
    fetchPeople();
  }, []);

  const deletePeople = async (id) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          const updated = people.filter((p) => p.key !== id);
          await AsyncStorage.setItem("people", JSON.stringify(updated));
          setPeople(updated);
          Toast.show({
            type: "error",
            position: "bottom",
            visibilityTime: 2000,
            text1: "Human deleted",
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <CustomButton
        text="Add Human"
        onPress={() => navigation.navigate("PeopleAdd")}
      />
      <FlatList
        data={people}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.humanItem}>
            <Text style={styles.text}>
              {item.firstName} {item.lastName}
            </Text>
            <CustomButton
              text="Delete"
              onPress={() => deletePeople(item.key)}
              buttonStyle={styles.deleteButton}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  humanItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  text: { fontSize: 18 },
  deleteButton: { backgroundColor: "red" },
});

export default ListScreen;

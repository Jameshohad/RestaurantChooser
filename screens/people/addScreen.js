import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../../components/customTextInput";
import CustomButton from "../../components/customButton";
import Toast from "react-native-toast-message";
import { validateName } from "./validators";

const AddScreen = ({ navigation }) => {
  const [human, setHuman] = useState({
    firstName: "",
    lastName: "",
    relationship: "",
    key: `r_${new Date().getTime()}`,
    errors: {},
  });

  const setField = (field, value) => {
    setHuman((prev) => ({
      ...prev,
      [field]: value,
      errors: { ...prev.errors, [field]: null },
    }));
  };

  const validateAllFields = () => {
    const { firstName, lastName, relationship } = human;
    const errors = {
      firstName: validateName("First name", firstName),
      lastName: validateName("Last name", lastName),
      relationship: !relationship ? "Relationship is required" : null,
    };

    setHuman((prev) => ({ ...prev, errors }));
    return !Object.values(errors).some((error) => error !== null);
  };

  const saveHuman = async () => {
    if (!validateAllFields()) {
      // Show the first error to the user
      const firstErrorField = Object.keys(human.errors).find(
        (key) => human.errors[key]
      );
      if (firstErrorField) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Validation Error",
          text2: human.errors[firstErrorField],
          visibilityTime: 3000,
        });
      }
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem("people");
      const people = existingData ? JSON.parse(existingData) : [];
      people.push(human);
      await AsyncStorage.setItem("people", JSON.stringify(people));

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Person saved successfully",
        visibilityTime: 2000,
      });

      navigation.navigate("PeopleList");
    } catch (error) {
      console.error("Failed to save person:", error);
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error saving person",
        text2: "Please try again",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.addScreenInnerContainer}>
        <View style={styles.addScreenFormContainer}>
          <CustomTextInput
            label="First name"
            maxLength={20}
            value={human.firstName}
            onChangeText={(text) => setField("firstName", text)}
            error={human.errors.firstName}
          />

          <CustomTextInput
            label="Last name"
            maxLength={20}
            value={human.lastName}
            onChangeText={(text) => setField("lastName", text)}
            error={human.errors.lastName}
          />

          <Text style={styles.fieldLabel}>Relationship</Text>
          <View style={styles.pickerContainer}>
            <Picker
              prompt="Relationship"
              selectedValue={human.relationship}
              onValueChange={(value) => setField("relationship", value)}
              style={[
                styles.picker,
                human.errors.relationship ? { borderColor: "red" } : {},
              ]}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="Me" value="Me" />
              <Picker.Item label="Family" value="Family" />
              <Picker.Item label="Friend" value="Friend" />
              <Picker.Item label="Coworker" value="Coworker" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          {human.errors.relationship && (
            <Text style={{ color: "red", marginLeft: 10, marginBottom: 10 }}>
              {human.errors.relationship}
            </Text>
          )}
        </View>

        <View style={styles.addScreenButtonsContainer}>
          <CustomButton
            text="Cancel"
            onPress={() => navigation.goBack()}
            buttonStyle={styles.cancelButton}
          />
          <CustomButton
            text="Save"
            onPress={saveHuman}
            buttonStyle={styles.saveButton}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addScreenInnerContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
  },
  addScreenFormContainer: { width: "96%" },
  fieldLabel: {
    marginLeft: 10,
  },
  pickerContainer: {
    ...Platform.select({
      ios: {},
      android: {
        width: "96%",
        borderRadius: 8,
        borderColor: "#c0c0c0",
        borderWidth: 2,
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 4,
      },
    }),
  },
  picker: {
    ...Platform.select({
      ios: {
        width: "96%",
        borderRadius: 8,
        borderColor: "#c0c0c0",
        borderWidth: 2,
        marginLeft: 10,
        marginBottom: 20,
        marginTop: 4,
      },
      android: {},
    }),
  },
  addScreenButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  cancelButton: { backgroundColor: "gray", width: "44%" },
  saveButton: { backgroundColor: "green", width: "44%" },
});

export default AddScreen;

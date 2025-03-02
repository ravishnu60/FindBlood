import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Welcome to the Blood Donation App</Text>
      <TouchableOpacity style={styles.requestButton}>
        <Text style={styles.buttonText}>Request Blood</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.donateButton}>
        <Text style={styles.buttonText}>Donate Blood</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>User Name: John Doe</Text>
      <Text>Email: johndoe@example.com</Text>
      <Text>Blood Group: O+</Text>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const notifications = [
  { id: "1", message: "New blood request in your area." },
  { id: "2", message: "Your donation was successfully received." },
];

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text>{item.message}</Text>
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  requestButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  donateButton: {
    backgroundColor: "#27ae60",
    padding: 10,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  notificationItem: {
    backgroundColor: "#ecf0f1",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
  },
});

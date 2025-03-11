export const bg_color = "#fff";
export const dropdownArrow = "#ba1b1b";
export const iconBg= "#de2323";

import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const base_url = "https://3667-117-251-47-241.ngrok-free.app/";

export const Loading = ({ visible }) => {
    return (
        visible && <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#3498db" />
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loaderContainer: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center", backgroundColor: "#cecece2f", zIndex: 1 },
    loadingText: { marginTop: 10, fontSize: 16, color: "#555" },
})

export const bloodGroups = [
    { "label": "A+", "value": "A+" },
    { "label": "A-", "value": "A-" },
    { "label": "B+", "value": "B+" },
    { "label": "B-", "value": "B-" },
    { "label": "O+", "value": "O+" },
    { "label": "O-", "value": "O-" },
    { "label": "AB+", "value": "AB+" },
    { "label": "AB-", "value": "AB-" }
]


export const cities = [
    { "label": "Chennai", "value": "Chennai" },
    { "label": "Coimbatore", "value": "Coimbatore" },
    { "label": "Cuddalore", "value": "Cuddalore" },
    { "label": "Dharmapuri", "value": "Dharmapuri" },
    { "label": "Dindigul", "value": "Dindigul" },
    { "label": "Erode", "value": "Erode" },
    { "label": "Kancheepuram", "value": "Kancheepuram" },
    { "label": "Kanyakumari", "value": "Kanyakumari" },
    { "label": "Karur", "value": "Karur" },
    { "label": "Krishnagiri", "value": "Krishnagiri" },
    { "label": "Madurai", "value": "Madurai" },
    { "label": "Nagapattinam", "value": "Nagapattinam" },
    { "label": "Namakkal", "value": "Namakkal" },
    { "label": "Nilgiris", "value": "Nilgiris" },
    { "label": "Perambalur", "value": "Perambalur" },
    { "label": "Pudukkottai", "value": "Pudukkottai" },
    { "label": "Ramanathapuram", "value": "Ramanathapuram" },
    { "label": "Salem", "value": "Salem" },
    { "label": "Sivaganga", "value": "Sivaganga" },
    { "label": "Thanjavur", "value": "Thanjavur" },
    { "label": "Theni", "value": "Theni" },
    { "label": "Thoothukudi", "value": "Thoothukudi" },
    { "label": "Tiruchirappalli", "value": "Tiruchirappalli" },
    { "label": "Tirunelveli", "value": "Tirunelveli" },
    { "label": "Tiruppur", "value": "Tiruppur" },
    { "label": "Tiruvallur", "value": "Tiruvallur" },
    { "label": "Tiruvannamalai", "value": "Tiruvannamalai" },
    { "label": "Tiruvarur", "value": "Tiruvarur" },
    { "label": "Vellore", "value": "Vellore" },
    { "label": "Villupuram", "value": "Villupuram" },
    { "label": "Virudhunagar", "value": "Virudhunagar" }
]

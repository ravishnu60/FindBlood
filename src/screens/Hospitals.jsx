import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import Geolocation from "react-native-geolocation-service";
import { Avatar, Card } from "react-native-paper";
import { iconBg, Loading } from "../utils/utils";
import axiosInstance from "../utils/axiosInstance";
import { ContextData } from "../Navigations/MainNavigator";

const hospitalsData = [
    { id: "1", name: "City Hospital", latitude: 37.7749, longitude: -122.4194, address: "123 Main St, San Francisco", phone: "123-456-7890" },
    { id: "2", name: "Blood Bank Center", latitude: 37.7849, longitude: -122.4094, address: "456 Elm St, San Francisco", phone: "987-654-3210" },
    { id: "3", name: "HealthCare Clinic", latitude: 37.7649, longitude: -122.4294, address: "789 Pine St, San Francisco", phone: "555-777-8888" },
];

const Hospitals = ({ navigation }) => {
    const contextVal= useContext(ContextData);

    const [region, setRegion] = useState({
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    const isFocused = useIsFocused();
    const [hospitalList, setHospitalList] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     Geolocation.getCurrentPosition(
    //         position => {
    //             setRegion({
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //                 latitudeDelta: 0.05,
    //                 longitudeDelta: 0.05,
    //             });
    //         },
    //         error => console.log(error),
    //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    //     );
    // }, []);

    const getRequest = () => {
        setLoading(true);
        axiosInstance.get('api/hospitals').then(res => {
            setHospitalList(res?.data.filter(hospital => hospital.district === contextVal?.user?.district));
        }).catch(err => console.log("eror", err)).finally(() => setLoading(false));
    }

    useEffect(() => {
        if (isFocused) {
            getRequest();
        }
    }, [isFocused, contextVal?.user?.district]);

    return (
        <View style={styles.container}>
            <Loading visible={loading} />
            <Text style={styles.title}>Nearby Hospitals & Blood Banks</Text>
            {/* <MapView style={styles.map} region={region}>
                {hospitalsData.map((hospital) => (
                    <Marker
                        key={hospital.id}
                        coordinate={{ latitude: hospital.latitude, longitude: hospital.longitude }}
                        title={hospital.name}
                        description={hospital.address}
                        onPress={() => navigation.navigate("HospitalDetails", { hospital })}
                    />
                ))}
            </MapView> */}
            <FlatList
                data={hospitalList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card} onPress={() => navigation.navigate("HospitalDetails", { hospital: item })}>
                        <Card.Title
                            title={item.name}
                            titleStyle={{fontWeight: 'bold'}}
                            subtitle={`Address: ${item.district} | Phone: ${item.phone}`}
                            left={(props) => <Avatar.Icon {...props} style={{backgroundColor: iconBg}} icon="hospital-building" />}
                        />
                    </Card>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginVertical: 15 },
    map: { flex: 1 },
    card: { marginBottom: 10, borderRadius: 10, backgroundColor: "#e8e8e8", elevation: 3 },

});

export default Hospitals;

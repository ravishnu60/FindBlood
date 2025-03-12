import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Fontawesome from "react-native-vector-icons/FontAwesome";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { bloodGroups, cities, dropdownArrow, Loading } from "../utils/utils";
import axiosInstance from "../utils/axiosInstance";

const FindDonors = ({ navigation }) => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);

    const requestSchema = yup.object().shape({
        blood_group: yup.string().required("Blood Group is required"),
        district: yup.string().required("District is required"),
    });

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(requestSchema),
    });


    const handleSearch = (data) => {
        setLoading(true);
        axiosInstance.get(`get/donor-list/${data.blood_group}/${data.district}`).then(res => {
            setDonors(res.data?.totalRequest);
        }).catch(err => console.log("eror", err)).finally(() => setLoading(false));
    };

    useEffect(() => {
        reset({});
    }, []);
    
    return (
        <View style={styles.container}>
            <Loading visible={loading} />
            <Text style={styles.title}>Find Blood Donors</Text>

            <Text style={styles.label}>Blood Group *</Text>
            <Controller
                control={control}
                name="blood_group"
                render={({ field: { onChange, value } }) => (
                    <View style={styles.pickerContainer}>
                        <Picker dropdownIconColor={dropdownArrow} selectedValue={value} onValueChange={onChange} style={styles.picker}>
                            <Picker.Item label="Select Blood Group" value="" />
                            {
                                bloodGroups.map((group, index) => (
                                    <Picker.Item key={index} label={group.label} value={group.value} />
                                ))
                            }
                        </Picker>
                    </View>
                )}
            />
            {errors.blood_group && <Text style={styles.error}>{errors.blood_group.message}</Text>}


            <Text style={styles.label}>District *</Text>
            <Controller
                control={control}
                name="district"
                render={({ field: { onChange, value } }) => (
                    <View style={styles.pickerContainer}>
                        <Picker dropdownIconColor={dropdownArrow} selectedValue={value} onValueChange={onChange} style={styles.picker}>
                            <Picker.Item label="Select District" value="" />
                            {
                                cities.map((city, index) => (
                                    <Picker.Item key={index} label={city.label} value={city.value} />
                                ))
                            }
                        </Picker>
                    </View>
                )}
            />
            {errors.district && <Text style={styles.error}>{errors.district.message}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSearch)}>
                <Text style={styles.buttonText}>Search Donors</Text>
            </TouchableOpacity>

            <FlatList
                data={donors}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("DonorDetails", { donor: item })} style={styles.list} >
                        <View style={styles.donorCard} >
                            <Text style={styles.donorName}>{item.name}</Text>
                            <Text style={{ fontWeight: "bold" }}>Blood Group: <Text style={{ fontWeight: "bold", color: "#e74c3c" }}>{item.blood_group}</Text></Text>
                            <Text style={{ fontWeight: "bold" }}>Location: <Text style={{ fontWeight: "normal", color: "#717171" }}>{item.district}</Text></Text>
                        </View>
                        <Fontawesome name="arrow-right" size={25} color="#959595" />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    input: { borderWidth: 1, borderColor: "#ccc", color: "#000", padding: 10, borderRadius: 5, marginBottom: 10 },
    pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
    picker: { height: 50, width: "100%", color: "#000" },
    button: { backgroundColor: "#e74c3c", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    donorCard: { flexDirection: "column", alignItems: "flex-start", rowGap: 5 },
    donorName: { fontSize: 16, fontWeight: "bold" },
    list: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, backgroundColor: "#f2f2f2", marginTop: 10, borderRadius: 8, padding: 10 },
    error: { color: "red", marginBottom: 10 },
});

export default FindDonors;

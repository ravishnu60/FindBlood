import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import { bloodGroups, cities, dropdownArrow } from "../utils/utils";
import axiosInstance from "../utils/axiosInstance";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const requestSchema = yup.object().shape({
    blood_group: yup.string().required("Blood Group is required"),
    urgency_level: yup.string().required("Urgency Level is required"),
    hospital_id: yup.string().required("Hospital name is required"),
    additional_notes: yup.string().optional(),
});

const BloodRequest = ({ navigation }) => {

    const isFocused = useIsFocused();
    const [hospitalList, setHospitalList] = useState([]);
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: yupResolver(requestSchema),
    });

    const getHospitalList = () => {
        setLoading(true);
        axiosInstance.get('api/hospitals').then(res => {
            console.log("res", res.data);

            setHospitalList(res.data);
        }).catch(err => console.log("eror", err)).finally(() => setLoading(false));
    };

    const selectedDistrict = watch("district");
    const filteredHospitalList = useMemo(() => hospitalList.filter(hospital => hospital.district === selectedDistrict), [selectedDistrict]);

    const onSubmit = (data) => {
        setLoading(true);
        axiosInstance.post('api/store/blood-request', data).then(res => {
            console.log("res", res.data);
            Alert.alert("Success", "Blood request submitted successfully!");
        }).catch(err => console.log("eror", err)).finally(() => setLoading(false));
    };


    useEffect(() => {
        if (isFocused) {
            getHospitalList();
            reset({});
        }
    }, [isFocused]);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Request Blood</Text>

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

            <Text style={styles.label}>Urgency Level *</Text>
            <Controller
                control={control}
                name="urgency_level"
                render={({ field: { onChange, value } }) => (
                    <View style={styles.pickerContainer}>
                        <Picker dropdownIconColor={dropdownArrow} selectedValue={value} onValueChange={onChange} style={styles.picker}>
                            <Picker.Item label="Select Urgency Level" value="" />
                            <Picker.Item label="Normal" value="Normal" />
                            <Picker.Item label="Urgent" value="Urgent" />
                        </Picker>
                    </View>
                )}
            />
            {errors.urgency_level && <Text style={styles.error}>{errors.urgency_level.message}</Text>}

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

            <Text style={styles.label}>Hospital *</Text>
            <Controller
                control={control}
                name="hospital_id"
                render={({ field: { onChange, value } }) => (
                    <View style={styles.pickerContainer}>
                        <Picker dropdownIconColor={dropdownArrow} selectedValue={value} onValueChange={onChange} style={styles.picker}>
                            <Picker.Item label="Select Hospital" value="" />
                            {
                                filteredHospitalList.map((item, index) => (
                                    <Picker.Item key={index} label={item.name} value={item.id} />
                                ))
                            }
                        </Picker>
                    </View>
                )}
            />
            {errors.hospital_id && <Text style={styles.error}>{errors.hospital_id.message}</Text>}

            <Text style={styles.label}>Additional Notes</Text>
            <Controller
                control={control}
                name="additional_notes"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        placeholder="Any additional details"
                        placeholderTextColor={'#3b3b3b'}
                        multiline
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />

            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                <Text style={styles.buttonText}>Submit Request</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Requests")} style={styles.pastReq}>
                <Text style={styles.buttonText}>My Requests</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    input: { borderWidth: 1, borderColor: "#ccc", color: '#000', padding: 10, borderRadius: 5, marginBottom: 10 },
    pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
    picker: { height: 50, width: "100%", color: '#000' },
    error: { color: "red", marginBottom: 10 },
    button: { backgroundColor: "#e74c3c", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
    pastReq: { backgroundColor: "#4daa85", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default BloodRequest;

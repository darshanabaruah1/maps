import React, { useEffect, useState } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import * as Location from 'expo-location';
export const Maps = ({ region, setRegion }) => {
    // const [pin, setPin] = useState({
    //   latitude: 37.78825,
    //   longitude: -122.4324
    // })

    // const [region, setRegion] = useState({
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421
    // })

    const userLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
        });
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
        });
        // setPin({
        //   latitude: location.coords.latitude,
        //   longitude: location.coords.longitude,
        // });
        console.log(location.coords.latitude, location.coords.longitude);
    };

    useEffect(() => {
        userLocation();
    }, []);


    return (
        <View style={{ marginTop: 50, flex: 1 }}>
            <GooglePlacesAutocomplete
                placeholder="Search"
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: "distance"
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details)
                    setRegion({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    })
                }}
                query={{
                    key: "KEY",
                    language: "en",
                    components: "country:us",
                    types: "establishment",
                    radius: 30000,
                    location: `${region.latitude}, ${region.longitude}`
                }}
                styles={{
                    container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
                    listView: { backgroundColor: "white" }
                }}
            />
            <MapView
                style={styles.map}
                region={region}
                provider="google"
            >
                {/* <Marker coordinate={region} /> */}
                <Marker
                    coordinate={region}
                    pinColor="black"
                    draggable={true}
                    onDragStart={(e) => {
                        console.log("Drag start", e.nativeEvent.coordinate)
                    }}
                    onDragEnd={(e) => {
                        setRegion({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                        console.log('drag end', e.nativeEvent.coordinate)
                    }}
                >
                    <Callout>
                        <Text>I'm here</Text>
                    </Callout>
                </Marker>
                <Circle center={region} radius={1000} />
            </MapView>
        </View>
    )
}
export default Maps;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    }
})




// import React, { useState, useEffect, useRef } from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import { StyleSheet, View, Button } from 'react-native';
// import * as Location from 'expo-location';
// export default function App() {
//   const [mapRegion, setMapRegion] = useState({
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.005,
//     longitudeDelta: 0.005,
//   })
//   const [errorMsg, setErrorMsg] = useState(null);
//   const mapRef = useRef(null);
//   const userLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       setErrorMsg('Permission to access location was denied');
//     }
//     let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
//     setMapRegion({
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//       latitudeDelta: 0.05,
//       longitudeDelta: 0.05
//     })
//     console.log(location.coords.latitude, location.coords.longitude)
//   }


//   const handleMapDrag = (e) => {
//     console.log(e.nativeEvent)
//     setMapRegion({
//       latitude: e.nativeEvent.coordinate.latitude,
//       longitude: e.nativeEvent.coordinate.longitude,
//       latitudeDelta: 0.0001,
//       longitudeDelta: 0.0001
//     });
//   }

//   // const handleMapDrag = (e) => {
//   //   // mapRef.current.animateToRegion(e, 500);

//   //   setMapRegion({
//   //     latitude: e.nativeEvent.coordinate.latitude,
//   //     longitude: e.nativeEvent.coordinate.longitude,
//   //     latitudeDelta: 0.05,
//   //     longitudeDelta: 0.05
//   //   });
//   // };
//   useEffect(() => {
//     userLocation();
//   }, [])
//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map}
//         ref={mapRef}
//         region={mapRegion}
//         onRegionChange={(newRegion) => setMapRegion(newRegion)}
//         onRegionChangeComplete={(newRegion) => setMapRegion(newRegion)}
//         onPanDrag={handleMapDrag}
//       >
//         <Marker
//           coordinate={mapRegion}
//         // draggable
//         // title='Marker'
//         />
//       </MapView>
//       <Button title='get location' onPress={userLocation} />
//     </View >
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });




import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Maps } from './common/Map'
import React, { useState } from 'react';

// const Example = () => {
//   const [value, setValue] = React.useState("one");
//   return <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
//     setValue(nextValue);
//   }}>
//     <Radio value="one" my={1}>
//       One
//     </Radio>
//     <Radio value="two" my={1}>
//       Two
//     </Radio>
//   </Radio.Group>;
// };
const App = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const [showMap, setShowMap] = useState(false)

  return (
    <View style={{ flex: 1 }}>
      {!showMap && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowMap(true)}
        >
          <Text style={styles.buttonText}>Add Location</Text>
        </TouchableOpacity>
      )}


      {showMap && (
        <>
          <Maps region={region} setRegion={setRegion} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowMap(false)}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </>

      )}
    </View >
  )
}

export default App

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    height: 40,
    backgroundColor: '#be123c',
    justifyContent: "center",
    borderRadius: 4,
  },
  buttonText: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
})
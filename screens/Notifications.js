// import React from "react";
// import { View, Text } from "react-native";
// import { TouchableOpacity } from "react-native";
// import { logUserIn, logUserOut } from "../apollo";

// export default function Notifications() {
//     return (
//         <View 
//             style={{ 
//                 backgroundColor: "black", 
//                 flex: 1, 
//                 alignItems: "center", 
//                 justifyContent: "center"
//             }}
//         >
//         <TouchableOpacity onPress ={ () => logUserOut() } >
//             <Text style={{ color: "white" }}>Notifications</Text>
//         </TouchableOpacity>
//         </View>
//     );
// }
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components";

//google map
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const index = ({ navigation }) => {

  const [initialRegion, setInitialRegion] = useState({
    latitude: 35.91395373474155,
    longitude: 127.73829440215488,
    latitudeDelta: 5,
    longitudeDelta: 5,
  })
  const [mapWidth, setMapWidth] = useState('99%');

  // Update map style to force a re-render to make sure the geolocation button appears
  const updateMapStyle = () => {
    setMapWidth('100%')
  }

  return (
    <Wrapper>
      <MapView
        initialRegion={initialRegion}
        style={[styles.map, { width: mapWidth }]}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={() => {
          updateMapStyle()
        }}  
      />


    </Wrapper>
  );
};

// <MapView.Marker
// coordinate={{
//   latitude: 36.94878200954522,
//   longtitude: 1278.90335222151083,

// }}
// />

export default index;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;
const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
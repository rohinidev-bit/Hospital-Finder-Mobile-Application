import * as React from 'react';
import Constants from 'expo-constants';
import { Button, Icon } from 'react-native-elements';
//new installs
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { StatusBar } from 'expo-status-bar';
 class Search extends React.Component {
   state = { 
      hasLocationPermission: false,
      hospitalList: [],
      latitude: 0,
      longitude: 0,
      
    }
    componentDidMount() {   
      this.getLocationAsync();
    }
  async getLocationAsync () {
    const { status } = await Permissions.askAsync(
      Permissions.LOCATION
    );
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        hasLocationPermissions: true,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } else {
      alert('Allow us to accesss your location');
    }
  }
  handleHospitalSearch = () => {
    const url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    const location = `location=${this.state.latitude},${this.state.longitude}`;
    const radius = '&radius=10000';
    const type = '&keyword=hospital';
    const key = '&key=AIzaSyC06y7rrRUR0Ii4Aq5lV44P6-RjPlqu-UU';
    const hospitalSearchUrl = url + location + radius + type + key;
    fetch(hospitalSearchUrl).then(response => response.json()).then(result => this.setState({hospitalList: result})).catch(e => console.log(e))


  }
   render(){
    console.log(this.state.hospitalList.results) 
    return (
      <View style={styles.b1}>
        <FlatList style={styles.flist}
        
            data={this.state.hospitalList.results}
            keyExtractor={(item) => item.place_id}
            renderItem={({item}) => (
              <Text>{item.name}</Text>
              
            )}
          />
        <TouchableOpacity onPress={() => this.handleHospitalSearch()}>
          <Text>
          Search Hospitals
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
   }
}
const styles = StyleSheet.create({
  b1:{
    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  flist:{
    backgroundColor:'crimson',
    color:'white',
    padding:1,
    width: '80%', 
    margin: 70, 
    }
  }

);
export default Search;
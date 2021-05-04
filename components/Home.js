import { Text, View, StyleSheet } from 'react-native';
import * as React from 'react';
import { Button, Icon } from 'react-native-elements';


export default function HomeScreen({ navigation }) {
    return (
      <View style={styles.b1}>
        <Button
          icon={
            <Icon
              raised
              name="heartbeat"
              type="font-awesome"
              size={15}
              color="#DC143C"
              onPress={() => navigation.navigate('Second')}
            />
          }
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    b1: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
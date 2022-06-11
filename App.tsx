import { Dimensions, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import MainScreen from './src/components/MainScreen';

export default function App() {

  const SCREEN_HEIGHT = Dimensions.get("screen").height;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#194591', '#85A1BA']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          height: SCREEN_HEIGHT,
        }}
        start={{
          x: 1,
          y: 0.1
        }}
        end={{
          x: 0,
          y: -0.1
        }}
      />
      <MainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import FilterButton from "./src/FilterButton";
import PlayerList from "./src/components/PlayerList";

export default function App() {
  return (
    <View style={styles.container}>
        <FilterButton title={"Filtrer"} />
        <PlayerList filter={"test"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#red',
    marginVertical: 30,
  },
  scrollView: {
      paddingVertical: 50,
      width: '100%',
  }
});

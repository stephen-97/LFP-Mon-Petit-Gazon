import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MainNavigator from "./src/navigation/MainNavigator";
import { store} from "./src/redux/redux";
import { Provider} from "react-redux";

export default function App() {
  return (
      <Provider store={store}>
          <View style={styles.container}>
              <MainNavigator />
          </View>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
  },
});

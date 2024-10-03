import StoreProvider from "./redux/StoreProvider";
import Navigation from "./StackNavigator";

import { StyleSheet } from "react-native";

export default function App() {
  return (
    <StoreProvider>
      <Navigation />
    </StoreProvider>
  );
}

const styles = StyleSheet.create({});

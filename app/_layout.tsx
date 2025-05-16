import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar, View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#030014" }}>
       <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

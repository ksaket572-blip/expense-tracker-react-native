import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

import SplashScreen from "../screens/Splash/SplashScreen";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
      />
    </Stack.Navigator>
  );
}
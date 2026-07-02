import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

import SplashScreen from "../screens/Splash/SplashScreen";
import DashboardScreen from "../screens/Dashboard/DashboardScreen";
import AddTransactionScreen from "../screens/Transaction/AddTransactionScreen";
import TransactionListScreen from "../screens/Transaction/TransactionListScreen";
import TransactionDetailsScreen from "../screens/Transaction/TransactionDetailsScreen";
import SummaryScreen from "../screens/Summary/SummaryScreen";

const Stack =
  createNativeStackNavigator<RootStackParamList>();

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

      <Stack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
      />

      <Stack.Screen
        name="TransactionList"
        component={TransactionListScreen}
      />

      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetailsScreen}
      />

      <Stack.Screen
        name="Summary"
        component={SummaryScreen}
      />
    </Stack.Navigator>
  );
}
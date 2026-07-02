import { View, Text, StyleSheet } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>💰</Text>

      <Text style={styles.title}>Expense Tracker</Text>

      <Text style={styles.subtitle}>
        Track your income and expenses
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  logo: {
    fontSize: 72,
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#E2E8F0",
  },
});
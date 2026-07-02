import { View, Text, StyleSheet } from "react-native";

interface SummaryCardProps {
  title: string;
  amount: number;
  backgroundColor: string;
}

export default function SummaryCard({
  title,
  amount,
  backgroundColor,
}: SummaryCardProps) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor },
      ]}
    >
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.amount}>
        ₹ {amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    margin: 8,
    elevation: 4,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  amount: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
});
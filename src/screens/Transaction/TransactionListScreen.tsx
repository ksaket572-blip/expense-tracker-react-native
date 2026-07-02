import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../types/navigation";
import { useTransactions } from "../../context/TransactionContext";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "TransactionList"
>;

export default function TransactionListScreen({
  navigation,
}: Props) {
  const { transactions } = useTransactions();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        All Transactions
      </Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No Transactions Found
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate(
                "TransactionDetails",
                {
                  transactionId: item.id,
                }
              )
            }
          >
            <View>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.category}>
                {item.category}
              </Text>

              <Text style={styles.date}>
                {item.date}
              </Text>
            </View>

            <Text
              style={[
                styles.amount,
                {
                  color:
                    item.type === "income"
                      ? "#16A34A"
                      : "#DC2626",
                },
              ]}
            >
              {item.type === "income"
                ? "+"
                : "-"}
              ₹{item.amount}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1E293B",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },

  category: {
    marginTop: 4,
    color: "#64748B",
  },

  date: {
    marginTop: 4,
    color: "#94A3B8",
    fontSize: 12,
  },

  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },

  empty: {
    marginTop: 100,
    textAlign: "center",
    fontSize: 18,
    color: "#64748B",
  },
});
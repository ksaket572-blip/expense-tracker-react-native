import React from "react";
import {
  View,
 Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useTransactions } from "../../context/TransactionContext";

export default function SummaryScreen() {
  const {
    transactions,
    totalIncome,
    totalExpense,
    totalBalance,
  } = useTransactions();

  const incomeCount = transactions.filter(
    (item) => item.type === "income"
  ).length;

  const expenseCount = transactions.filter(
    (item) => item.type === "expense"
  ).length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>
        Summary
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: "#2563EB" },
        ]}
      >
        <Text style={styles.cardTitle}>
          Total Balance
        </Text>

        <Text style={styles.cardAmount}>
          ₹{totalBalance}
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: "#22C55E" },
        ]}
      >
        <Text style={styles.cardTitle}>
          Total Income
        </Text>

        <Text style={styles.cardAmount}>
          ₹{totalIncome}
        </Text>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: "#EF4444" },
        ]}
      >
        <Text style={styles.cardTitle}>
          Total Expense
        </Text>

        <Text style={styles.cardAmount}>
          ₹{totalExpense}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          Total Transactions
        </Text>

        <Text style={styles.infoValue}>
          {transactions.length}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          Income Transactions
        </Text>

        <Text style={styles.infoValue}>
          {incomeCount}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          Expense Transactions
        </Text>

        <Text style={styles.infoValue}>
          {expenseCount}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 20,
  },

  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  cardAmount: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 8,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoText: {
    fontSize: 17,
    color: "#475569",
    fontWeight: "600",
  },

  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
  },
});
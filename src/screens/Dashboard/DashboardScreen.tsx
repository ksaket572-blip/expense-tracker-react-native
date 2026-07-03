import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import SummaryCard from "../../components/cards/SummaryCard";
import { useTransactions } from "../../context/TransactionContext";
import { RootStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Dashboard"
>;

export default function DashboardScreen({
  navigation,
}: Props) {
  const {
    transactions,
    totalBalance,
    totalIncome,
    totalExpense,
  } = useTransactions();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>Dashboard</Text>

      <SummaryCard
        title="Total Balance"
        amount={totalBalance}
        backgroundColor="#2563EB"
      />

      <View style={styles.row}>
        <SummaryCard
          title="Income"
          amount={totalIncome}
          backgroundColor="#16A34A"
        />

        <SummaryCard
          title="Expense"
          amount={totalExpense}
          backgroundColor="#DC2626"
        />
      </View>

      <Text style={styles.sectionTitle}>
        Recent Transactions
      </Text>

      {transactions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No transactions found.
          </Text>

          <Text style={styles.emptySubText}>
            Tap "Add Transaction" to create your first transaction.
          </Text>
        </View>
      ) : (
        <>
          {transactions.slice(0, 5).map((item) => (
            <View
              key={item.id}
              style={styles.transactionCard}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.transactionTitle}>
                  {item.title}
                </Text>

                <Text
                  style={styles.transactionCategory}
                >
                  {item.category}
                </Text>
              </View>

              <View
                style={{ alignItems: "flex-end" }}
              >
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
                    ? "+ ₹"
                    : "- ₹"}
                  {item.amount}
                </Text>

                <Text style={styles.date}>
                  {item.date}
                </Text>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() =>
              navigation.navigate(
                "TransactionList"
              )
            }
          >
            <Text
              style={styles.viewAllButtonText}
            >
              View All Transactions
            </Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("AddTransaction")
        }
      >
        <Text style={styles.buttonText}>
          Add Transaction
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.summaryButton}
  onPress={() => navigation.navigate("Summary")}
>
  <Text style={styles.summaryButtonText}>
    View Summary
  </Text>
</TouchableOpacity>
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
    paddingBottom: 100,
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1E293B",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 15,
    color: "#1E293B",
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
  },

  emptySubText: {
    marginTop: 8,
    textAlign: "center",
    color: "#64748B",
  },

  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  transactionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },

  transactionCategory: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },

  amount: {
    fontSize: 16,
    fontWeight: "700",
  },

  date: {
    marginTop: 4,
    fontSize: 12,
    color: "#94A3B8",
  },

  viewAllButton: {
    marginTop: 8,
    marginBottom: 15,
    alignSelf: "center",
  },

  viewAllButtonText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 15,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  summaryButton: {
    backgroundColor: "#16A34A",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  summaryButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
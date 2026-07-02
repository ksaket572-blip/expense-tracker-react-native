import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useTransactions } from "../../context/TransactionContext";
import {
  RootStackParamList,
} from "../../types/navigation";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "TransactionList"
>;

export default function TransactionListScreen({
  navigation,
}: Props) {
  const {
    transactions,
    deleteTransaction,
  } = useTransactions();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "income" | "expense"
  >("all");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        filter === "all"
          ? true
          : item.type === filter;

      return matchesSearch && matchesType;
    });
  }, [transactions, search, filter]);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTransaction(id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Transactions
      </Text>

      <TextInput
        placeholder="Search by title..."
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "all" &&
              styles.activeFilter,
          ]}
          onPress={() => setFilter("all")}
        >
          <Text>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "income" &&
              styles.activeIncome,
          ]}
          onPress={() =>
            setFilter("income")
          }
        >
          <Text>Income</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "expense" &&
              styles.activeExpense,
          ]}
          onPress={() =>
            setFilter("expense")
          }
        >
          <Text>Expense</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTransactions}
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
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.subtitle}>
                {item.category}
              </Text>

              <Text style={styles.date}>
                {item.date}
              </Text>
            </View>

            <View
              style={{
                alignItems: "flex-end",
              }}
            >
              <Text
                style={[
                  styles.amount,
                  {
                    color:
                      item.type ===
                      "income"
                        ? "#16A34A"
                        : "#DC2626",
                  },
                ]}
              >
                ₹{item.amount}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  handleDelete(item.id)
                }
              >
                <Text
                  style={
                    styles.deleteText
                  }
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
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
    padding: 16,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 20,
  },

  searchInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    gap: 10,
  },

  filterButton: {
    flex: 1,
    backgroundColor: "#E2E8F0",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  activeFilter: {
    backgroundColor: "#2563EB",
  },

  activeIncome: {
    backgroundColor: "#22C55E",
  },

  activeExpense: {
    backgroundColor: "#EF4444",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E293B",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748B",
  },

  date: {
    marginTop: 4,
    fontSize: 13,
    color: "#94A3B8",
  },

  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },

  deleteText: {
    marginTop: 8,
    color: "#DC2626",
    fontWeight: "600",
  },

  empty: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 18,
    color: "#64748B",
  },
});
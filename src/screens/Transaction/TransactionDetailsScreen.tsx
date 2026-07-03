import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../types/navigation";
import { useTransactions } from "../../context/TransactionContext";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "TransactionDetails"
>;

export default function TransactionDetailsScreen({
  navigation,
  route,
}: Props) {
  const { transactionId } = route.params;

  const {
    transactions,
    deleteTransaction,
  } = useTransactions();

  const transaction = transactions.find(
    (item) => item.id === transactionId
  );

  if (!transaction) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>
          Transaction Not Found
        </Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteTransaction(
              transaction.id
            );

            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Transaction Details
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Title
        </Text>

        <Text style={styles.value}>
          {transaction.title}
        </Text>

        <Text style={styles.label}>
          Amount
        </Text>

        <Text
          style={[
            styles.value,
            {
              color:
                transaction.type ===
                "income"
                  ? "#16A34A"
                  : "#DC2626",
            },
          ]}
        >
          ₹{transaction.amount}
        </Text>

        <Text style={styles.label}>
          Type
        </Text>

        <Text style={styles.value}>
          {transaction.type}
        </Text>

        <Text style={styles.label}>
          Category
        </Text>

        <Text style={styles.value}>
          {transaction.category}
        </Text>

        <Text style={styles.label}>
          Date
        </Text>

        <Text style={styles.value}>
          {transaction.date}
        </Text>

        <Text style={styles.label}>
          Notes
        </Text>

        <Text style={styles.value}>
          {transaction.notes || "-"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
onPress={() =>
  navigation.navigate("AddTransaction", {
    transactionId: transaction.id,
  })
}
      >
        <Text style={styles.buttonText}>
          Edit Transaction
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>
          Delete Transaction
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  notFound: {
    fontSize: 20,
    fontWeight: "600",
    color: "#64748B",
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 16,
  },

  value: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 4,
  },

  editButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
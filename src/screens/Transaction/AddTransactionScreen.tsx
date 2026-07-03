import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import uuid from "react-native-uuid";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useTransactions } from "../../context/TransactionContext";
import { RootStackParamList } from "../../types/navigation";
import { Category } from "../../types/transaction";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "AddTransaction"
>;

export default function AddTransactionScreen({
  navigation,
}: Props) {
  const { addTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const [type, setType] = useState<"income" | "expense">(
    "expense"
  );

  const [category, setCategory] =
    useState<Category>("Other");

  const [notes, setNotes] = useState("");

  const [date, setDate] = useState(new Date());

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Please enter title.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      Alert.alert("Validation", "Please enter valid amount.");
      return;
    }

    await addTransaction({
      id: uuid.v4().toString(),
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date: date.toLocaleDateString(),
      notes: notes.trim(),
    });

    Alert.alert("Success", "Transaction Added Successfully");

    navigation.goBack();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>
        Add Transaction
      </Text>

      <Text style={styles.label}>Title</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Amount</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Type</Text>

      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "income" &&
              styles.activeIncome,
          ]}
          onPress={() => setType("income")}
        >
          <Text style={styles.typeText}>
            Income
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeButton,
            type === "expense" &&
              styles.activeExpense,
          ]}
          onPress={() => setType("expense")}
        >
          <Text style={styles.typeText}>
            Expense
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>
        Category
      </Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(value) =>
            setCategory(value as Category)
          }
        >
          <Picker.Item
            label="Salary"
            value="Salary"
          />

          <Picker.Item
            label="Food"
            value="Food"
          />

          <Picker.Item
            label="Travel"
            value="Travel"
          />

          <Picker.Item
            label="Shopping"
            value="Shopping"
          />

          <Picker.Item
            label="Bills"
            value="Bills"
          />

          <Picker.Item
            label="Entertainment"
            value="Entertainment"
          />

          <Picker.Item
            label="Other"
            value="Other"
          />
        </Picker>
      </View>

      <Text style={styles.label}>Date</Text>

      <TouchableOpacity
        style={styles.dateButton}
        onPress={() =>
          setShowDatePicker(true)
        }
      >
        <Text style={styles.dateText}>
          {date.toDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={
            Platform.OS === "ios"
              ? "spinner"
              : "default"
          }
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);

            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>Notes</Text>

      <TextInput
        style={styles.notesInput}
        multiline
        placeholder="Optional Notes"
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>
          Save Transaction
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
    paddingBottom: 60,
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    padding: 15,
    fontSize: 16,
  },

  notesInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    padding: 15,
    height: 120,
    textAlignVertical: "top",
    fontSize: 16,
  },

  typeContainer: {
    flexDirection: "row",
    gap: 12,
  },

  typeButton: {
    flex: 1,
    backgroundColor: "#E2E8F0",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  activeIncome: {
    backgroundColor: "#22C55E",
  },

  activeExpense: {
    backgroundColor: "#EF4444",
  },

  typeText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#1E293B",
  },

  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    overflow: "hidden",
  },

  dateButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    padding: 16,
  },

  dateText: {
    fontSize: 16,
    color: "#1E293B",
  },

  saveButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 17,
    borderRadius: 12,
    marginTop: 30,
  },

  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
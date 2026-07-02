import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "../types/transaction";

const STORAGE_KEY = "transactions";

interface TransactionContextType {
  transactions: Transaction[];

  loading: boolean;

  addTransaction: (transaction: Transaction) => Promise<void>;

  updateTransaction: (
    transaction: Transaction
  ) => Promise<void>;

  deleteTransaction: (id: string) => Promise<void>;

  totalIncome: number;

  totalExpense: number;

  totalBalance: number;
}

const TransactionContext = createContext<
  TransactionContextType | undefined
>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export function TransactionProvider({
  children,
}: ProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data on app start
  useEffect(() => {
    loadTransactions();
  }, []);

  // Save automatically whenever data changes
  useEffect(() => {
    if (!loading) {
      saveTransactions();
    }
  }, [transactions]);

  const loadTransactions = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data) {
        setTransactions(JSON.parse(data));
      }
    } catch (error) {
      console.log("Load Error", error);
    } finally {
      setLoading(false);
    }
  };

  const saveTransactions = async () => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
      );
    } catch (error) {
      console.log("Save Error", error);
    }
  };

  const addTransaction = async (
    transaction: Transaction
  ) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const updateTransaction = async (
    updatedTransaction: Transaction
  ) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === updatedTransaction.id
          ? updatedTransaction
          : item
      )
    );
  };

  const deleteTransaction = async (id: string) => {
    setTransactions((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const totalIncome = transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpense = transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        totalIncome,
        totalExpense,
        totalBalance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used inside TransactionProvider"
    );
  }

  return context;
}
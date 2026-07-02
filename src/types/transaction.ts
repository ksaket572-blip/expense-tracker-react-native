export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Food"
  | "Travel"
  | "Shopping"
  | "Bills"
  | "Entertainment"
  | "Other";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
  notes?: string;
}
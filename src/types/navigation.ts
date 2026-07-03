export type RootStackParamList = {
  Splash: undefined;
  Dashboard: undefined;

  AddTransaction:
    | undefined
    | {
        transactionId: string;
      };

  TransactionList: undefined;

  TransactionDetails: {
    transactionId: string;
  };

  Summary: undefined;
};
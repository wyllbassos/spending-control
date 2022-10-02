export interface ReactFCProps {
  children: React.ReactNode;
}

export type RootStackParamList = {
  'Register-form': { registerId?: string };
  'Register-list': {};
  'Transaction-form': { transactionId?: string };
};
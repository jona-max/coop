export interface UserTransaction {
  id: number;
  firstName: string;
  lastName: string;
  accountNo: number;
  balance: number;
  amount: number;
  cause: string;
}

export interface userInfoProps {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  accountNo: number;
  balance: number;
}

export interface loginProps {
  balance: number;
  firstName: string;
  lastName: string;
  accountNo: number;
}

export interface newTransaction {
  amount: number;
  cause: string;
}

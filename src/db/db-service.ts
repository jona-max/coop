import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {UserTransaction} from '../model';

const tableName = 'accountTransaction';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'account-transaction.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
         balance INT(8), firstName VARCHAR(55), lastName VARCHAR(55), accountNo INT(8), amount INT(8), cause VARCHAR(55)
    );`;

  await db.executeSql(query);
};

export const getAccountInfo = async (
  db: SQLiteDatabase,
): Promise<UserTransaction[]> => {
  try {
    const transactions: UserTransaction[] = [];
    const results = await db.executeSql(
      `SELECT rowid as id, balance, firstName, lastName, accountNo, amount, cause  FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        transactions.push(result.rows.item(index));
      }
    });
    return transactions;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get transactions !!!');
  }
};

export const setAccountInfo = async (
  db: SQLiteDatabase,
  userTransactions: UserTransaction[],
) => {
  console.log(userTransactions, 'from db');
  const insertQuery =
    `INSERT INTO ${tableName}(rowid, balance, firstName, lastName, accountNo, amount, cause) values` +
    userTransactions
      .map(
        i =>
          `(${i.id}, '${i.balance}', '${i.firstName}','${i.lastName}','${i.accountNo}','${i.amount}','${i.cause}')`,
      )
      .join(',');

  return db.executeSql(insertQuery);
};

export const deleteAccountInfo = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};

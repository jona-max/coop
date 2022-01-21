import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {UserTransaction} from '../model';

interface transactionProps {
  transaction: UserTransaction;
}

export const Transactions = (props: transactionProps) => {
  return (
    <View style={styles.transactionContainer}>
      <View style={styles.transactionContain}>
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>First Name: </Text>
          <Text style={styles.sectionTitle}>{props.transaction.firstName}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>Last Name: </Text>
          <Text style={styles.sectionTitle}>{props.transaction.lastName}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>Account Number: </Text>
          <Text style={styles.sectionTitle}>{props.transaction.accountNo}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>Account Balance: </Text>
          <Text style={styles.sectionTitle}>{props.transaction.balance}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>Amount Spent: </Text>
          <Text style={styles.sectionTitle}>{props.transaction.amount}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.sectionTitle}>Cause: </Text>
          <Text style={styles.sectionTitle}>{props.transaction.cause}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  transactionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  transactionContain: {
    backgroundColor: '#fefefe',
    flexDirection: 'column',
    width: Dimensions.get('window').width - 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  button: {
    width: 100,
  },
});

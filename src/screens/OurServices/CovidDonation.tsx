import React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../../context/context.api';
import {getDBConnection, setAccountInfo} from '../../db/db-service';
import {newTransaction, UserTransaction} from '../../model';

const CovidDonation = () => {
  const auth = React.useContext(AuthContext);
  const {
    transactions,
    firstName,
    lastName,
    accountNo,
    balance,
    transactionSetter,
    // balanceCalc,
  } = auth;

  const [remark, setRemark] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const [error, setError] = React.useState({
    amount: false,
    remark: false,
  });

  const checkTextInput = () => {
    //Check for the Name TextInput

    if (!remark.trim()) {
      setError(prev => ({...prev, phoneNumber: true}));
      return;
    } else if (remark.trim()) {
      setError(prev => ({...prev, phoneNumber: false}));
    }
    if (!amount.trim()) {
      setError(prev => ({...prev, amount: true}));
      return;
    } else if (amount.trim()) {
      setError(prev => ({...prev, amount: false}));
    }

    //Checked Successfully
    //Do whatever you want
    createTwoButtonAlert();
  };

  const Transaction: newTransaction = {
    amount: parseInt(amount, 10),
    cause: 'Covid Donations',
  };

  const AddTransaction = async (props: newTransaction) => {
    if (!firstName.trim()) return;
    try {
      // if (Transaction.Transactions) {
      //   balanceCalc(balance, Transaction.Transactions);
      // }

      const newTodos: UserTransaction[] = [
        ...transactions,
        {
          id: transactions.length
            ? transactions.reduce((acc, cur) => {
                if (cur.id > acc.id) return cur;
                return acc;
              }).id + 1
            : 0,
          balance: balance - parseInt(amount, 10),
          firstName: firstName,
          lastName: lastName,
          accountNo: accountNo,
          amount: props.amount,
          cause: props.cause,
        },
      ];
      transactionSetter(newTodos);
      const db = await getDBConnection();
      await setAccountInfo(db, newTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      'Money Transfer',
      `Are sure you want to spend ${amount} birr for covid donations`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            AddTransaction(Transaction);
          },
        },
      ],
    );
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      // style={styles.container}
    >
      {/* <Text>Account Transfer</Text> */}
      <View style={styles.contain}>
        <View>
          <Text>Amount</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setAmount(text)}
            value={amount}
            placeholder="enter your amount for Covid Donation"
            keyboardType="numeric"
            numberOfLines={1}
          />
        </View>
        <View>
          <Text>Remark</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setRemark(text)}
            value={remark}
            placeholder="enter your remark"
          />
          {error.remark && (
            <Text style={styles.errorText}>{'please enter the remark'}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={checkTextInput} style={styles.button}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default CovidDonation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // justifyContent: 'center',
    marginTop: 100,
    alignItems: 'center',
  },
  contain: {
    alignItems: 'center',
    // alignContent: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fefefe',
    width: '85%',
    // height: 300,
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: '#34abeb',
    padding: 10,
    borderRadius: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34abeb',
    height: 30,
    width: 100,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  text: {
    color: '#fff',
  },
  errorText: {
    color: 'red',
  },
});

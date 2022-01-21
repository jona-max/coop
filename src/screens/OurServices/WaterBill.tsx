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

const WaterBill = () => {
  const auth = React.useContext(AuthContext);
  const {
    transactions,
    firstName,
    lastName,
    accountNo,
    balance,
    transactionSetter,
  } = auth;

  const [remark, setRemark] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const checkTextInput = () => {
    //Check for the Name TextInput

    if (!amount.trim()) {
      Alert.alert('Please Enter Amount of transfer');
      return;
    }
    if (!remark.trim()) {
      Alert.alert('Please Enter Phone Number');
      return;
    }

    //Checked Successfully
    //Do whatever you want
    createTwoButtonAlert();
  };

  const Transaction: newTransaction = {
    amount: parseInt(amount, 10),
    cause: 'Traffic Bill',
  };

  const AddTransaction = async (props: newTransaction) => {
    if (!firstName.trim()) return;
    try {
      const newTodos: UserTransaction[] = [
        ...transactions,
        {
          id: transactions.length
            ? transactions.reduce((acc, cur) => {
                if (cur.id > acc.id) return cur;
                return acc;
              }).id + 1
            : 0,
          balance: balance,
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
      `Are sure you want to buy ${amount} birr for water bill`,
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
            placeholder="enter your amount of water bill to pay"
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

export default WaterBill;

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
    padding: 10,
    borderRadius: 10,
    borderColor: '#34abeb',
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
});

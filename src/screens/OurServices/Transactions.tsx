import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Transactions} from '../../components/Transactions';

import {AuthContext} from '../../context/context.api';

const Testing = () => {
  const auth = React.useContext(AuthContext);
  const {transactions} = auth;

  console.log(transactions);
  return (
    <SafeAreaView>
      <View style={[styles.appTitleView]}>
        <View style={styles.titleContainer}>
          <Text style={styles.appTitleText}> Transaction History </Text>
        </View>
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{marginTop: 50}}>
          {transactions.map(account => (
            <Transactions key={account.id} transaction={account} />
          ))}
        </View>
        {/* <View style={styles.textInputContainer}>
          <Button
            onPress={() =>
              AddTransaction({
                Transactions: 300,
                Cause: 'Air Time',
              })
            }
            title="Add ToDo"
            color="#00c3ff"
            accessibilityLabel="add todo item"
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    position: 'absolute',
    top: -10,
    zIndex: 20,
    width: '100%',
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#00c3ff',
    textAlign: 'center',
  },
  textInputContainer: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    margin: 10,
  },
  titleContainer: {
    width: '80%',
    backgroundColor: '#fefefe',
    paddingVertical: 4,
  },
});
export default Testing;

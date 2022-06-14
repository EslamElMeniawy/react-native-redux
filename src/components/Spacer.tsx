import React from 'react';
import {View, StyleSheet} from 'react-native';

export default () => {
  return <View style={styles.spacer} />;
};

const styles = StyleSheet.create({
  spacer: {
    height: 16,
  },
});

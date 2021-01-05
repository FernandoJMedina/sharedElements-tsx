import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProgressIndicator from '../components/ProgressIndicator';

const TestingProgressIndicator = () => {
  return (
    <View style={styles.container}>
      <ProgressIndicator
        percentage={75}
        radius={35}
        strokeWidth={7}
        duration={500}
        color="tomato"
        delay={500}
        textColor="tomato"
        max={100}
      />
    </View>
  );
};

export default TestingProgressIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

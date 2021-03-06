import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import em from 'emoji-dictionary';
import { CLEAR_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../common/theme';

const Tag = ({ children, emoji, selected }) => {
  return (
    <View
      style={[
        styles.container,
        selected ? styles.selectedBackground : styles.noSelectedBackground,
      ]}>
      <Text style={styles.tag}>
        {children} {emoji ? em.getUnicode(emoji) : null}
      </Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 2,
    borderColor: SECONDARY_COLOR,
    borderWidth: 1,
  },
  tag: {
    fontSize: 16,
  },
  noSelectedBackground: {
    backgroundColor: CLEAR_COLOR,
  },
  selectedBackground: {
    backgroundColor: '#C1CEE1',
  },
});

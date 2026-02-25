import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getTheme} from '../constants/theme';

const EmptyState = ({icon = 'clipboard-text-outline', message, subMessage}) => {
  const {isDark} = useSelector(state => state.theme);
  const theme = getTheme(isDark);

  return (
    <View style={styles.container}>
      <Icon name={icon} size={64} color={theme.colors.border} />
      <Text
        style={[
          styles.message,
          {color: theme.colors.textSecondary, fontFamily: theme.fonts.semiBold},
        ]}>
        {message}
      </Text>
      {subMessage && (
        <Text
          style={[
            styles.subMessage,
            {color: theme.colors.textSecondary, fontFamily: theme.fonts.regular},
          ]}>
          {subMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  message: {
    fontSize: 17,
    marginTop: 16,
    textAlign: 'center',
  },
  subMessage: {
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default EmptyState;

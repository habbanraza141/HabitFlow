import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {toggleTheme} from '../redux/slices/themeSlice';
import {getTheme} from '../constants/theme';

const Header = ({title, showBack, onBack, rightComponent}) => {
  const dispatch = useDispatch();
  const {isDark} = useSelector(state => state.theme);
  const theme = getTheme(isDark);

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Icon
              name="arrow-left"
              size={24}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text,
              fontFamily: theme.fonts.bold,
            },
          ]}>
          {title}
        </Text>
      </View>
      <View style={styles.right}>
        {rightComponent || (
          <TouchableOpacity
            onPress={() => dispatch(toggleTheme())}
            style={[
              styles.themeButton,
              {backgroundColor: theme.colors.surface},
            ]}>
            <Icon
              name={isDark ? 'white-balance-sunny' : 'moon-waning-crescent'}
              size={20}
              color={isDark ? '#FFB020' : '#6C63FF'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  title: {
    fontSize: 26,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export default Header;

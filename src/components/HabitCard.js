import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {toggleHabitCompletion, deleteHabit} from '../redux/slices/habitSlice';
import {getTheme} from '../constants/theme';
import {getTodayString} from '../utils/dateUtils';

const HabitCard = ({habit}) => {
  const dispatch = useDispatch();
  const {isDark} = useSelector(state => state.theme);
  const theme = getTheme(isDark);

  const today = getTodayString();
  const isCompletedToday = habit.completedDates.includes(today);

  const handleToggle = () => {
    dispatch(toggleHabitCompletion(habit.id));
  };

  const handleDelete = () => {
    dispatch(deleteHabit(habit.id));
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow,
          borderLeftColor: habit.color,
        },
      ]}>
      <TouchableOpacity
        style={styles.content}
        onPress={handleToggle}
        activeOpacity={0.7}>
        <View
          style={[
            styles.checkbox,
            {
              borderColor: isCompletedToday ? habit.color : theme.colors.border,
              backgroundColor: isCompletedToday ? habit.color : 'transparent',
            },
          ]}>
          {isCompletedToday && <Icon name="check" size={18} color="#FFF" />}
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text,
                fontFamily: theme.fonts.semiBold,
                textDecorationLine: isCompletedToday ? 'line-through' : 'none',
                opacity: isCompletedToday ? 0.6 : 1,
              },
            ]}
            numberOfLines={1}>
            {habit.title}
          </Text>
          {habit.description ? (
            <Text
              style={[
                styles.description,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.regular,
                },
              ]}
              numberOfLines={1}>
              {habit.description}
            </Text>
          ) : null}
        </View>

        <View style={styles.rightSection}>
          {habit.streakCount > 0 && (
            <View style={styles.streakBadge}>
              <Icon name="fire" size={16} color={theme.colors.streak} />
              <Text
                style={[
                  styles.streakText,
                  {
                    color: theme.colors.streak,
                    fontFamily: theme.fonts.bold,
                  },
                ]}>
                {habit.streakCount}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
        <Icon name="trash-can-outline" size={18} color={theme.colors.danger} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
  },
  rightSection: {
    marginLeft: 8,
    alignItems: 'flex-end',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  streakText: {
    fontSize: 14,
  },
  deleteButton: {
    marginLeft: 12,
    padding: 6,
  },
});

export default HabitCard;

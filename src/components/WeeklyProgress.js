import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getTheme} from '../constants/theme';
import {getWeekDates} from '../utils/dateUtils';

const WeeklyProgress = () => {
  const {isDark} = useSelector(state => state.theme);
  const {habits} = useSelector(state => state.habits);
  const theme = getTheme(isDark);

  const weekDates = getWeekDates();

  const getCompletionForDate = dateString => {
    if (habits.length === 0) {
      return 0;
    }
    const completed = habits.filter(h =>
      h.completedDates.includes(dateString),
    ).length;
    return Math.round((completed / habits.length) * 100);
  };

  const totalCompleted = habits.reduce((acc, habit) => {
    const thisWeek = weekDates.filter(d =>
      habit.completedDates.includes(d.dateString),
    ).length;
    return acc + thisWeek;
  }, 0);

  const totalPossible = habits.length * weekDates.length;
  const weeklyPercentage =
    totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.colors.card},
      ]}>
      <View style={styles.headerRow}>
        <Text
          style={[
            styles.title,
            {color: theme.colors.text, fontFamily: theme.fonts.semiBold},
          ]}>
          Weekly Progress
        </Text>
        <Text
          style={[
            styles.percentage,
            {color: theme.colors.primary, fontFamily: theme.fonts.bold},
          ]}>
          {weeklyPercentage}%
        </Text>
      </View>

      <View style={styles.barsContainer}>
        {weekDates.map(day => {
          const pct = getCompletionForDate(day.dateString);
          return (
            <View key={day.dateString} style={styles.barWrapper}>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: `${Math.max(pct, 4)}%`,
                      backgroundColor: day.isToday
                        ? theme.colors.primary
                        : pct > 0
                        ? theme.colors.primaryLight
                        : theme.colors.border,
                      borderRadius: 4,
                    },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.dayLabel,
                  {
                    color: day.isToday
                      ? theme.colors.primary
                      : theme.colors.textSecondary,
                    fontFamily: day.isToday
                      ? theme.fonts.bold
                      : theme.fonts.medium,
                  },
                ]}>
                {day.dayLabel}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
  },
  percentage: {
    fontSize: 18,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  barTrack: {
    width: 24,
    height: 80,
    borderRadius: 4,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  barFill: {
    width: '100%',
  },
  dayLabel: {
    fontSize: 11,
    marginTop: 6,
  },
});

export default WeeklyProgress;

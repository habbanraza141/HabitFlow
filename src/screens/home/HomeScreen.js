import React, {useMemo} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {getTheme} from '../../constants/theme';
import Header from '../../components/Header';
import HabitCard from '../../components/HabitCard';
import WeeklyProgress from '../../components/WeeklyProgress';
import FloatingButton from '../../components/FloatingButton';
import EmptyState from '../../components/EmptyState';
import {getTodayString} from '../../utils/dateUtils';

const HomeScreen = ({navigation}) => {
  const {isDark} = useSelector(state => state.theme);
  const {habits} = useSelector(state => state.habits);
  const {user} = useSelector(state => state.auth);
  const theme = getTheme(isDark);

  const today = getTodayString();

  const stats = useMemo(() => {
    const completedToday = habits.filter(h =>
      h.completedDates.includes(today),
    ).length;
    const totalStreak = habits.reduce((sum, h) => sum + h.streakCount, 0);
    return {completedToday, total: habits.length, totalStreak};
  }, [habits, today]);

  const renderHeader = () => (
    <View>
      <View style={styles.greeting}>
        <Text
          style={[
            styles.greetingText,
            {color: theme.colors.textSecondary, fontFamily: theme.fonts.regular},
          ]}>
          Hello, {user?.name?.split(' ')[0] || 'there'}!
        </Text>
        <Text
          style={[
            styles.statsText,
            {color: theme.colors.text, fontFamily: theme.fonts.medium},
          ]}>
          {stats.completedToday}/{stats.total} completed today
        </Text>
      </View>

      <WeeklyProgress />

      <View style={styles.sectionHeader}>
        <Text
          style={[
            styles.sectionTitle,
            {color: theme.colors.text, fontFamily: theme.fonts.semiBold},
          ]}>
          Today's Habits
        </Text>
        <Text
          style={[
            styles.habitCount,
            {color: theme.colors.textSecondary, fontFamily: theme.fonts.regular},
          ]}>
          {habits.length} {habits.length === 1 ? 'habit' : 'habits'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      edges={['top']}>
      <Header title="HabitFlow" />

      <FlatList
        data={habits}
        keyExtractor={item => item.id}
        renderItem={({item}) => <HabitCard habit={item} />}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <EmptyState
            icon="rocket-launch-outline"
            message="No habits yet"
            subMessage="Tap the + button to create your first habit"
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <FloatingButton
        onPress={() => navigation.navigate('AddHabit')}
        color={theme.colors.primary}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  greeting: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 14,
  },
  statsText: {
    fontSize: 15,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
  },
  habitCount: {
    fontSize: 13,
  },
});

export default HomeScreen;

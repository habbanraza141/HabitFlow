import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addHabit} from '../../redux/slices/habitSlice';
import {getTheme} from '../../constants/theme';
import {HabitColors} from '../../constants/colors';
import Header from '../../components/Header';

const HABIT_ICONS = [
  'run',
  'book-open-variant',
  'meditation',
  'water',
  'dumbbell',
  'food-apple',
  'sleep',
  'pencil',
  'music',
  'code-tags',
  'walk',
  'bicycle',
];

const generateId = () => {
  return `habit_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

const AddHabitScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isDark} = useSelector(state => state.theme);
  const theme = getTheme(isDark);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(HabitColors[0]);
  const [selectedIcon, setSelectedIcon] = useState(HABIT_ICONS[0]);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      setError('Habit title is required');
      return;
    }

    const newHabit = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      completedDates: [],
      streakCount: 0,
      color: selectedColor,
      icon: selectedIcon,
    };

    dispatch(addHabit(newHabit));
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      edges={['top']}>
      <Header
        title="New Habit"
        showBack
        onBack={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text
              style={[
                styles.saveText,
                {color: theme.colors.primary, fontFamily: theme.fonts.semiBold},
              ]}>
              Save
            </Text>
          </TouchableOpacity>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.previewCard}>
            <View
              style={[
                styles.previewIcon,
                {backgroundColor: selectedColor},
              ]}>
              <Icon name={selectedIcon} size={28} color="#FFF" />
            </View>
            <Text
              style={[
                styles.previewTitle,
                {
                  color: title
                    ? theme.colors.text
                    : theme.colors.textSecondary,
                  fontFamily: theme.fonts.semiBold,
                },
              ]}>
              {title || 'Habit Name'}
            </Text>
          </View>

          <Text
            style={[
              styles.label,
              {color: theme.colors.text, fontFamily: theme.fonts.medium},
            ]}>
            Title *
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.inputBackground,
                color: theme.colors.text,
                borderColor: error ? theme.colors.danger : theme.colors.border,
                fontFamily: theme.fonts.regular,
              },
            ]}
            placeholder="e.g., Morning Workout"
            placeholderTextColor={theme.colors.textSecondary}
            value={title}
            onChangeText={t => {
              setTitle(t);
              if (error) {
                setError('');
              }
            }}
            maxLength={50}
          />
          {error ? (
            <Text style={[styles.error, {fontFamily: theme.fonts.regular}]}>
              {error}
            </Text>
          ) : null}

          <Text
            style={[
              styles.label,
              {color: theme.colors.text, fontFamily: theme.fonts.medium},
            ]}>
            Description (optional)
          </Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              {
                backgroundColor: theme.colors.inputBackground,
                color: theme.colors.text,
                borderColor: theme.colors.border,
                fontFamily: theme.fonts.regular,
              },
            ]}
            placeholder="Add a short description..."
            placeholderTextColor={theme.colors.textSecondary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            maxLength={150}
          />

          <Text
            style={[
              styles.label,
              {color: theme.colors.text, fontFamily: theme.fonts.medium},
            ]}>
            Color
          </Text>
          <View style={styles.colorGrid}>
            {HabitColors.map(color => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  {backgroundColor: color},
                  selectedColor === color && styles.colorSelected,
                ]}
                onPress={() => setSelectedColor(color)}>
                {selectedColor === color && (
                  <Icon name="check" size={18} color="#FFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Text
            style={[
              styles.label,
              {color: theme.colors.text, fontFamily: theme.fonts.medium},
            ]}>
            Icon
          </Text>
          <View style={styles.iconGrid}>
            {HABIT_ICONS.map(icon => (
              <TouchableOpacity
                key={icon}
                style={[
                  styles.iconOption,
                  {
                    backgroundColor:
                      selectedIcon === icon
                        ? selectedColor
                        : theme.colors.inputBackground,
                    borderColor:
                      selectedIcon === icon
                        ? selectedColor
                        : theme.colors.border,
                  },
                ]}
                onPress={() => setSelectedIcon(icon)}>
                <Icon
                  name={icon}
                  size={22}
                  color={selectedIcon === icon ? '#FFF' : theme.colors.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.createButton, {backgroundColor: theme.colors.primary}]}
            onPress={handleSave}
            activeOpacity={0.85}>
            <Icon name="plus" size={22} color="#FFF" />
            <Text
              style={[styles.createButtonText, {fontFamily: theme.fonts.semiBold}]}>
              Create Habit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  saveButton: {
    padding: 8,
  },
  saveText: {
    fontSize: 16,
  },
  previewCard: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 8,
  },
  previewIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewTitle: {
    fontSize: 18,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 15,
  },
  textArea: {
    height: 90,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  error: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSelected: {
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  createButton: {
    flexDirection: 'row',
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    gap: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default AddHabitScreen;

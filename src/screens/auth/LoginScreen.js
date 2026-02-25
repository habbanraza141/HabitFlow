import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {login} from '../../redux/slices/authSlice';
import {getTheme} from '../../constants/theme';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isDark} = useSelector(state => state.theme);
  const theme = getTheme(isDark);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) {
      return;
    }
    dispatch(
      login({
        id: 'user_001',
        name: 'John Doe',
        email: email.trim(),
      }),
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <View
              style={[
                styles.iconCircle,
                {backgroundColor: theme.colors.primary},
              ]}>
              <Icon name="check-bold" size={32} color="#FFF" />
            </View>
            <Text
              style={[
                styles.appName,
                {color: theme.colors.text, fontFamily: theme.fonts.bold},
              ]}>
              HabitFlow
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.regular,
                },
              ]}>
              Build better habits, one day at a time
            </Text>
          </View>

          <View style={styles.form}>
            <Text
              style={[
                styles.label,
                {color: theme.colors.text, fontFamily: theme.fonts.medium},
              ]}>
              Email
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: theme.colors.inputBackground,
                  borderColor: errors.email
                    ? theme.colors.danger
                    : theme.colors.border,
                },
              ]}>
              <Icon
                name="email-outline"
                size={20}
                color={theme.colors.textSecondary}
              />
              <TextInput
                style={[
                  styles.input,
                  {color: theme.colors.text, fontFamily: theme.fonts.regular},
                ]}
                placeholder="Enter your email"
                placeholderTextColor={theme.colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {errors.email && (
              <Text style={[styles.error, {fontFamily: theme.fonts.regular}]}>
                {errors.email}
              </Text>
            )}

            <Text
              style={[
                styles.label,
                {color: theme.colors.text, fontFamily: theme.fonts.medium},
              ]}>
              Password
            </Text>
            <View
              style={[
                styles.inputWrapper,
                {
                  backgroundColor: theme.colors.inputBackground,
                  borderColor: errors.password
                    ? theme.colors.danger
                    : theme.colors.border,
                },
              ]}>
              <Icon
                name="lock-outline"
                size={20}
                color={theme.colors.textSecondary}
              />
              <TextInput
                style={[
                  styles.input,
                  {color: theme.colors.text, fontFamily: theme.fonts.regular},
                ]}
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={[styles.error, {fontFamily: theme.fonts.regular}]}>
                {errors.password}
              </Text>
            )}

            <TouchableOpacity
              style={[styles.button, {backgroundColor: theme.colors.primary}]}
              onPress={handleLogin}
              activeOpacity={0.85}>
              <Text
                style={[styles.buttonText, {fontFamily: theme.fonts.semiBold}]}>
                Log In
              </Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text
                style={[
                  styles.footerText,
                  {
                    color: theme.colors.textSecondary,
                    fontFamily: theme.fonts.regular,
                  },
                ]}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text
                  style={[
                    styles.footerLink,
                    {
                      color: theme.colors.primary,
                      fontFamily: theme.fonts.semiBold,
                    },
                  ]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 30,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 6,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: '100%',
  },
  error: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
  },
});

export default LoginScreen;

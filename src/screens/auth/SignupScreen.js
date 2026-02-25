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
import {signup} from '../../redux/slices/authSlice';
import {getTheme} from '../../constants/theme';

const SignupScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isDark} = useSelector(state => state.theme);
  const theme = getTheme(isDark);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
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

  const handleSignup = () => {
    if (!validate()) {
      return;
    }
    dispatch(
      signup({
        id: `user_${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
      }),
    );
  };

  const renderInput = (label, icon, value, setter, opts = {}) => (
    <>
      <Text
        style={[
          styles.label,
          {color: theme.colors.text, fontFamily: theme.fonts.medium},
        ]}>
        {label}
      </Text>
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.colors.inputBackground,
            borderColor: errors[opts.errorKey]
              ? theme.colors.danger
              : theme.colors.border,
          },
        ]}>
        <Icon name={icon} size={20} color={theme.colors.textSecondary} />
        <TextInput
          style={[
            styles.input,
            {color: theme.colors.text, fontFamily: theme.fonts.regular},
          ]}
          placeholder={opts.placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          value={value}
          onChangeText={setter}
          secureTextEntry={opts.secure && !showPassword}
          keyboardType={opts.keyboardType || 'default'}
          autoCapitalize={opts.autoCapitalize || 'sentences'}
        />
        {opts.secure && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {errors[opts.errorKey] && (
        <Text style={[styles.error, {fontFamily: theme.fonts.regular}]}>
          {errors[opts.errorKey]}
        </Text>
      )}
    </>
  );

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
            <Text
              style={[
                styles.title,
                {color: theme.colors.text, fontFamily: theme.fonts.bold},
              ]}>
              Create Account
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.colors.textSecondary,
                  fontFamily: theme.fonts.regular,
                },
              ]}>
              Start your journey to better habits
            </Text>
          </View>

          <View style={styles.form}>
            {renderInput('Full Name', 'account-outline', name, setName, {
              placeholder: 'Enter your full name',
              errorKey: 'name',
            })}
            {renderInput('Email', 'email-outline', email, setEmail, {
              placeholder: 'Enter your email',
              errorKey: 'email',
              keyboardType: 'email-address',
              autoCapitalize: 'none',
            })}
            {renderInput('Password', 'lock-outline', password, setPassword, {
              placeholder: 'Create a password',
              errorKey: 'password',
              secure: true,
            })}

            <TouchableOpacity
              style={[styles.button, {backgroundColor: theme.colors.primary}]}
              onPress={handleSignup}
              activeOpacity={0.85}>
              <Text
                style={[styles.buttonText, {fontFamily: theme.fonts.semiBold}]}>
                Create Account
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
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text
                  style={[
                    styles.footerLink,
                    {
                      color: theme.colors.primary,
                      fontFamily: theme.fonts.semiBold,
                    },
                  ]}>
                  Log In
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
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
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

export default SignupScreen;

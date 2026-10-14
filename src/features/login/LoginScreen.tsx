import React, { useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import PrimaryButton from '../../components/PrimaryButton';
import TopBar from '../../components/TopBar';
import { strings } from '../../i18n/strings';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { colors } from '../../theme/colors';
import { useLoginForm } from './useLoginForm';


type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const passwordRef = useRef<TextInput>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useLoginForm(async (lineNumber, password) => {
    
    throw new Error('Authentication is not connected yet');
  });

  return (
    <SafeAreaView style={styles.screen}>
      <TopBar
        title={strings.login.topBarTitle}
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          <Text style={styles.heading}>{strings.login.heading}</Text>

          <Text style={styles.label}>{strings.login.lineNumberLabel}</Text>
          <TextInput
            value={form.lineNumber}
            onChangeText={form.setLineNumber}
            placeholder={strings.login.lineNumberPlaceholder}
            placeholderTextColor={colors.muted}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            autoComplete="tel"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            accessibilityLabel={strings.login.lineNumberLabel}
            accessibilityHint={form.errors.lineNumber}
            style={[styles.input, !!form.errors.lineNumber && styles.inputError]}
          />
          {!!form.errors.lineNumber && (
            <Text style={styles.error}>{form.errors.lineNumber}</Text>
          )}

          <Text style={styles.label}>{strings.login.passwordLabel}</Text>
          <View style={[styles.passwordRow, !!form.errors.password && styles.inputError]}>
            <TextInput
              ref={passwordRef}
              value={form.password}
              onChangeText={form.setPassword}
              placeholder={strings.login.passwordPlaceholder}
              placeholderTextColor={colors.muted}
              secureTextEntry={!showPassword}
              textContentType="password"
              autoComplete="password"
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
                void form.submit();
              }}
              accessibilityLabel={strings.login.passwordLabel}
              accessibilityHint={form.errors.password}
              style={styles.passwordInput}
            />
            <Pressable
              onPress={() => setShowPassword(value => !value)}
              accessibilityRole="button"
              accessibilityLabel={
                showPassword
                  ? strings.login.hidePassword
                  : strings.login.showPassword
              }
              style={styles.showButton}
            >
              <Text style={styles.showText}>
                {showPassword
                  ? strings.login.hidePassword
                  : strings.login.showPassword}
              </Text>
            </Pressable>
          </View>
          {!!form.errors.password && (
            <Text style={styles.error}>{form.errors.password}</Text>
          )}

          {!!form.submitError && (
            <Text accessibilityRole="alert" style={styles.error}>
              {form.submitError}
            </Text>
          )}

          <PrimaryButton
            title={strings.login.loginButton}
            onPress={() => void form.submit()}
            disabled={!form.canSubmit}
            loading={form.isLoading}
            style={styles.loginButton}
          />

          <Pressable
            onPress={() => {
              // Password recovery.
            }}
            accessibilityRole="button"
            style={styles.forgotButton}
          >
            <Text style={styles.forgotText}>
              {strings.login.forgotPassword}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 32 },
  heading: { marginTop: 12, marginBottom: 36, color: colors.text, fontSize: 28 },
  label: { color: colors.muted, fontSize: 12, marginBottom: 6 },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 2,
    paddingHorizontal: 15,
    color: colors.text,
    fontSize: 16,
    marginBottom: 24,
  },
  inputError: { borderColor: colors.error },
  passwordRow: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  passwordInput: { flex: 1, color: colors.text, fontSize: 16 },
  showButton: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  showText: { color: colors.muted },
  error: { color: colors.error, marginTop: 4, marginBottom: 12 },
  loginButton: { marginTop: 38 },
  forgotButton: {
    alignSelf: 'center',
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginTop: 12,
  },
  forgotText: { color: colors.primary, fontSize: 16 },
});

import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import PrimaryButton from '../components/PrimaryButton';
import TopBar from '../components/TopBar';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { strings } from '../i18n/strings';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const [lineNumber, setLineNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        // Authentication logic.
    };

    return (
        <SafeAreaView style={styles.screen}>
            <TopBar title={strings.login.topBarTitle} onBack={() => navigation.goBack()} />


            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.heading}>{strings.login.heading}</Text>

                    <View style={styles.field}>
                        <Text style={styles.label}>{strings.login.lineNumberLabel}</Text>
                        <TextInput
                            value={lineNumber}
                            onChangeText={setLineNumber}
                            placeholder={strings.login.lineNumberPlaceholder}
                            placeholderTextColor="#777"
                            keyboardType="phone-pad"
                            autoComplete="tel"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>{strings.login.passwordLabel}</Text>
                        <View style={styles.passwordRow}>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder={strings.login.passwordPlaceholder}
                                placeholderTextColor="#777"
                                secureTextEntry={!showPassword}
                                autoComplete="password"
                                style={[styles.input, styles.passwordInput]}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(value => !value)}
                                accessibilityRole="button"
                                accessibilityLabel={
                                    showPassword ? 'Hide password' : 'Show password'
                                }
                                style={styles.eyeButton}
                            >
                                <Text style={styles.eyeText}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <PrimaryButton
                        title={strings.login.loginButton}
                        onPress={handleLogin}
                        style={styles.loginButton}
                    />

                    <TouchableOpacity
                        style={styles.forgotButton}
                        onPress={() => {
                            // Password recovery screen.
                        }}
                    >
                        <Text style={styles.forgotText}>{strings.login.forgotPassword}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flex: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    heading: {
        marginTop: 12,
        marginBottom: 36,
        color: '#222',
        fontSize: 28,
        fontWeight: '400',
    },
    field: {
        height: 61,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 2,
        paddingHorizontal: 15,
        justifyContent: 'center',
        marginBottom: 25,
    },
    label: {
        color: '#888',
        fontSize: 12,
        marginBottom: 2,
    },
    input: {
        padding: 0,
        color: '#222',
        fontSize: 16,
    },
    passwordRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
    },
    eyeButton: {
        paddingLeft: 12,
        paddingVertical: 8,
    },
    eyeText: {
        color: '#929DA1',
        fontSize: 14,
    },
    loginButton: {
        marginTop: 13,
    },
    forgotButton: {
        alignSelf: 'center',
        marginTop: 22,
        padding: 4,
    },
    forgotText: {
        color: '#F54268',
        fontSize: 16,
    },
});

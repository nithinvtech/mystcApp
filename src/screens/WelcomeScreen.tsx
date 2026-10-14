import React from 'react';
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import PrimaryButton from '../components/PrimaryButton';
import TopBar from '../components/TopBar';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { strings } from '../i18n/strings';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
    return (
        <SafeAreaView style={styles.screen}>
            <TopBar
                title={strings.welcome.topBarTitle}
                rightText={strings.welcome.languageLabel}
                onRightPress={() => {
                    //Language switch.
                }}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.main}>
                    <Image
                        source={require('../assets/stc-logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                        accessibilityLabel="stc"
                    />

                    <View style={styles.illustrationContainer}>
                        <Image
                            source={require('../assets/welcome-illustration.png')}
                            style={styles.illustration}
                            resizeMode="contain"
                            accessibilityLabel="Welcome illustration"
                        />
                    </View>

                    <Text style={styles.title}>{strings.welcome.title}</Text>
                    <Text style={styles.subtitle}>
                        {strings.welcome.subtitle}
                    </Text>
                </View>

                <View style={styles.actions}>
                    <PrimaryButton
                        title={strings.welcome.loginButton}
                        onPress={() => navigation.navigate('Login')}
                    />
                    <Pressable
                        onPress={() => {
                            // Registration screen.
                        }}
                        style={styles.registerButton}
                    >
                        <Text style={styles.registerText}> {strings.welcome.register}</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    main: {
        paddingTop: 10,
    },
    logo: {
        width: 78,
        height: 52,
        marginBottom: 14,
    },
    illustrationContainer: {
        width: '100%',
        aspectRatio: 1.04,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F2F6',
        borderColor: '#E5E3E8',
        borderWidth: 1,
        borderRadius: 2,
    },
    illustration: {
        width: '90%',
        height: '90%',
    },
    title: {
        marginTop: 20,
        color: '#222',
        fontSize: 16,
        fontWeight: '500',
    },
    subtitle: {
        marginTop: 8,
        color: '#888',
        fontSize: 12,
        lineHeight: 18,
    },
    actions: {
        paddingTop: 32,
        paddingBottom: 12,
    },
    registerButton: {
        alignItems: 'center',
        paddingVertical: 14,
    },
    registerText: {
        color: '#F52B58',
        fontSize: 13,
    },
});

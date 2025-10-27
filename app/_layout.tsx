import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { getThemeColors } from '@/constants/Theme';

// Component that uses the theme
function ThemedStack() {
  const { currentTheme } = useTheme();
  const colors = getThemeColors(currentTheme);

  return (
    <>
      {/* Dynamic Status Bar based on theme */}
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: {
            backgroundColor: colors.background, // Dynamic background
          },
        }}
      >
        {/* Define navigation screens */}
        <Stack.Screen name="index" />
        <Stack.Screen name="LogIn" />
        <Stack.Screen name="SignUp" />
        <Stack.Screen name="ForgotPassword" />
        <Stack.Screen name="ModernAboutScreen" />
        <Stack.Screen name="AlertsScreen" />
        <Stack.Screen name="CalendarScreen" />
        <Stack.Screen name="EmergencyScreen" />
        <Stack.Screen name="ModernLandingPage" />
        <Stack.Screen name="NotificationsScreen" />
        <Stack.Screen name="PestsScreen" />
        <Stack.Screen name="ResourcesScreen" />
        <Stack.Screen name="ScanScreen" />
        <Stack.Screen name="SettingsScreen" />
        <Stack.Screen name="TipsAndGuidesScreen" />
        <Stack.Screen name="PrivacyScreen" />
        <Stack.Screen name="SupportScreen" />
        <Stack.Screen name="TermsScreen" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}
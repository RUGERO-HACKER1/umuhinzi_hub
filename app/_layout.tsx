import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      {/* Set status bar color to match dark mode */}
      <StatusBar style="light" backgroundColor="#0E1410" />

      <Stack
        screenOptions={{
          headerShown: false, // Hide headers globally for full-screen look
          animation: "slide_from_right", // Smooth transition between pages
          contentStyle: {
            backgroundColor: "#0E1410", // Consistent background
          },
        }}
      >
        {/* Define navigation screens */}
        <Stack.Screen name="LogIn" />
        <Stack.Screen name="SignUp" />
        <Stack.Screen name="ForgotPassword" />
        <Stack.Screen name="Dashboard" />

      </Stack>
    </>
  );
}

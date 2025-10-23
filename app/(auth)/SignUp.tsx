import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SignUp() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    region: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoGlow} />
                  <Ionicons name="leaf" size={40} color="#00FF88" />
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>
          Join UmuhinziHub and start your digital farming journey
        </Text>
      </View>

      {/* Form Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+250 XXX XXX XXX"
          keyboardType="phone-pad"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Email (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="your.email@example.com"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Region / District</Text>
        <TextInput
          style={styles.input}
          placeholder="Select your region"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a strong password"
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          secureTextEntry
          placeholderTextColor="#aaa"
        />

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Link to Login */}
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Link href="/LogIn" style={styles.loginLink}>
            Log In
          </Link>
        </Text>
      </View>

      <Text style={styles.footerNote}>
        Empowering farmers through innovation
      </Text>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0E1410",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoGlow: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#00FF88",
    opacity: 0.2,
    position: "absolute",
    top: 0,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 70,
  },
  subtitle: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 5,
    fontSize: 14,
  },
  form: {
    backgroundColor: "rgba(20, 30, 20, 0.7)",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#00FF88",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  label: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#1E261E",
    borderColor: "#00FF88",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#fff",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#00FF88",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: {
    color: "#0E1410",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    textAlign: "center",
    color: "#ccc",
    marginTop: 15,
  },
  loginLink: {
    color: "#00FF88",
    fontWeight: "600",
  },
  footerNote: {
    textAlign: "center",
    color: "#555",
    fontSize: 12,
    marginTop: 30,
  },
});

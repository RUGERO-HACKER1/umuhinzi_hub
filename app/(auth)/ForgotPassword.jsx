import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPassword() {
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const handleReset = () => {
    // Later you can connect this to your backend logic
    alert("Reset link sent to your email or phone!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoGlow}>
          <Ionicons name="key-outline" size={40} color="#00FF88" />
        </View>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your registered email or phone number to reset your password
        </Text>
      </View>

      {/* Input Section */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email or Phone Number</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#aaa" />
          <TextInput
            style={styles.input}
            placeholder="Enter your email or phone"
            placeholderTextColor="#aaa"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Ionicons name="send-outline" size={18} color="#0E1410" />
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>

        <Text style={styles.backText}>
          Remember your password?{" "}
          <Link href="/LogIn" style={styles.backLink}>
            Go Back to Login
          </Link>
        </Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Powered by <Text style={{ color: "#00FF88" }}>UmuhinziHub</Text>
      </Text>
    </ScrollView>
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
    backgroundColor: "rgba(0,255,136,0.1)",
    padding: 20,
    borderRadius: 50,
    marginBottom: 15,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    lineHeight: 20,
  },
  formContainer: {
    backgroundColor: "rgba(20,30,20,0.8)",
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E261E",
    borderColor: "#00FF88",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingVertical: 10,
    marginLeft: 8,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00FF88",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 25,
  },
  buttonText: {
    color: "#0E1410",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  backText: {
    textAlign: "center",
    color: "#ccc",
    marginTop: 20,
  },
  backLink: {
    color: "#00FF88",
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    color: "#666",
    marginTop: 30,
    fontSize: 12,
  },
});

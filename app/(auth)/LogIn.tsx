import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Link , router} from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LogIn() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logoGlow}>
          <Ionicons name="leaf" size={40} color="#00FF88" />
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Log in to continue growing with UmuhinziHub
        </Text>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Phone Number or Email</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#aaa" />
          <TextInput
            style={styles.input}
            placeholder="Enter phone or email"
            placeholderTextColor="#aaa"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#aaa" />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity>
          <Link href="/ForgotPassword" style={styles.forgot}>Forgot Password?</Link>

        </TouchableOpacity>

<TouchableOpacity
  style={styles.button}
  onPress={() => router.push("/(tabs)/home")}
>
  <Ionicons name="log-in-outline" size={18} color="#0E1410" />
  <Text style={styles.buttonText}>Log In</Text>
</TouchableOpacity>


        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Link href="/SignUp" style={styles.signUpLink}>
            Sign Up
          </Link>

        </Text>
      </View>

      {/* Footer Card */}
      <View style={styles.footerCard}>
        <Ionicons name="leaf-outline" size={28} color="#00FF88" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.footerTitle}>Digital Farming Solutions</Text>
          <Text style={styles.footerSub}>
            Empowering farmers with technology
          </Text>
        </View>
      </View>

      <Text style={styles.poweredText}>
        Powered by <Text style={{ color: "#00FF88" }}>UmuhinziHub</Text> — Digital Solutions for Farmers
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
  logoContainer: {
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
  forgot: {
    color: "#00FF88",
    textAlign: "right",
    marginTop: 10,
    fontSize: 13,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00FF88",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#0E1410",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  footerText: {
    textAlign: "center",
    color: "#ccc",
    marginTop: 15,
  },
  signUpLink: {
    color: "#00FF88",
    fontWeight: "600",
  },
  footerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(20,30,20,0.9)",
    borderRadius: 16,
    padding: 15,
    marginTop: 30,
  },
  footerTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  footerSub: {
    color: "#aaa",
    fontSize: 12,
  },
  poweredText: {
    color: "#555",
    fontSize: 12,
    textAlign: "center",
    marginTop: 15,
  },
});

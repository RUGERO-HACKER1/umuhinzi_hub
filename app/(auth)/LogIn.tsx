import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Alert
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '@/constants/Theme';

const { width: screenWidth } = Dimensions.get('window');

export default function LogIn() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

    const { currentTheme } = useTheme();
  const colors = getThemeColors(currentTheme);
  const styles = createStyles(colors);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert("Error", "Please enter your phone/email and password");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/(tabs)/home");
    }, 1500);
  };

  // const quickLoginOptions = [
  //   {
  //     icon: "fingerprint",
  //     label: "Use Biometric",
  //     onPress: () => Alert.alert("Biometric", "Biometric login coming soon!")
  //   },
  //   {
  //     icon: "phone-portrait",
  //     label: "Quick PIN",
  //     onPress: () => Alert.alert("PIN", "PIN login coming soon!")
  //   }
  // ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Animated Background */}
      <View style={styles.backgroundOverlay}>
        <Animated.View style={[styles.floatingOrb, styles.orb1]} />
        <Animated.View style={[styles.floatingOrb, styles.orb2]} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color="#00FF88" />
            </TouchableOpacity>

            <View style={styles.logoSection}>
              <View style={styles.logoContainer}>
                <View style={styles.logoGlow} />
                <MaterialCommunityIcons name="farmer" size={44} color="#00FF88" />
              </View>
              <Text style={styles.title}>Welcome Back Farmer!</Text>
              <Text style={styles.subtitle}>
                Log in to continue your farming journey with UmuhinziHub
              </Text>
            </View>
          </View>

          {/* Quick Stats */}
          {/* <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50K+</Text>
              <Text style={styles.statLabel}>Farmers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>40%</Text>
              <Text style={styles.statLabel}>Yield Increase</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>95%</Text>
              <Text style={styles.statLabel}>Satisfaction</Text>
            </View>
          </View> */}

          {/* Login Form */}
          <View style={styles.form}>
            <Text style={styles.label}>Phone Number or Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#00FF88" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number or email"
                placeholderTextColor="#64748b"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#00FF88" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#64748b"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#00FF88" 
                  style={styles.eyeIcon} 
                />
              </TouchableOpacity>
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.rememberForgotContainer}>
              <TouchableOpacity 
                style={styles.rememberMe}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe && <Ionicons name="checkmark" size={14} color="#0E1410" />}
                </View>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Link href="/ForgotPassword" style={styles.forgotLink}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </Link>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Ionicons name="reload" size={20} color="#0E1410" />
                  <Text style={styles.buttonText}>Logging In...</Text>
                </View>
              ) : (
                <>
                  <MaterialCommunityIcons name="login" size={20} color="#0E1410" />
                  <Text style={styles.buttonText}>Log In to My Farm</Text>
                  <Ionicons name="arrow-forward" size={18} color="#0E1410" />
                </>
              )}
            </TouchableOpacity>

            {/* Quick Login Options */}
            {/* <View style={styles.quickLoginSection}>
              <Text style={styles.quickLoginTitle}>Quick Access</Text>
              <View style={styles.quickLoginOptions}>
                {quickLoginOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickLoginButton}
                    onPress={option.onPress}
                  >
                    <Ionicons name={option.icon as any} size={20} color="#00FF88" />
                    <Text style={styles.quickLoginText}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View> */}

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Sign Up Link */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                New to UmuhinziHub?{" "}
                <Link href="/SignUp" style={styles.signUpLink}>
                  <Text style={styles.signUpLinkText}>Create Farmer Account</Text>
                </Link>
              </Text>
            </View>
          </View>

          {/* Benefits Card */}
          {/* <View style={styles.benefitsCard}>
            <View style={styles.benefitsHeader}>
              <MaterialCommunityIcons name="weather-cloudy" size={24} color="#00FF88" />
              <Text style={styles.benefitsTitle}>Todays Farming Tip</Text>
            </View>
            <Text style={styles.benefitsDescription}>
              Check weather forecasts regularly and plan your irrigation accordingly. 
              Our AI predicts rainfall with 95% accuracy for your specific location.
            </Text>
            <View style={styles.benefitsFooter}>
              <Ionicons name="sparkles" size={16} color="#00FF88" />
              <Text style={styles.benefitsFooterText}>Powered by AURA AI</Text>
            </View>
          </View> */}

          {/* Security Note */}
          <View style={styles.securityNote}>
            <Ionicons name="shield-checkmark" size={16} color="#00FF88" />
            <Text style={styles.securityText}>
              Your farming data is secure and encrypted
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    backgroundColor: colors.background, // Dynamic color
  },
  text: {
    color: colors.text, // Dynamic color
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#0E1410",
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingOrb: {
    position: "absolute",
    borderRadius: 999,
  },
  orb1: {
    top: "10%",
    right: "-10%",
    width: 120,
    height: 120,
    backgroundColor: "#00FF88",
    opacity: 0.1,
  },
  orb2: {
    bottom: "15%",
    left: "-10%",
    width: 180,
    height: 180,
    backgroundColor: "#60A5FA",
    opacity: 0.08,
  },
  // container: {
  //   flexGrow: 1,
  //   padding: 20,
  //   paddingBottom: 40,
  // },
  header: {
    marginBottom: 10,
  },
  backButton: {
    padding: 6,
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  logoGlow: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#00FF88",
    opacity: 0.2,
    position: "absolute",
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#A7F3D0",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
  },
  statsSection: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 255, 136, 0.05)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    color: "#00FF88",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    color: "#A7F3D0",
    fontSize: 12,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(0, 255, 136, 0.3)",
    marginHorizontal: 8,
  },
  form: {
    backgroundColor: "rgba(20, 30, 20, 0.8)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  label: {
    color: "#A7F3D0",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    marginTop: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E261E",
    borderWidth: 1,
    borderColor: "#2D4A3A",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingVertical: 14,
    fontSize: 16,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 10,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#00FF88",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#00FF88",
  },
  rememberMeText: {
    color: "#A7F3D0",
    fontSize: 14,
  },
  forgotText: {
    color: "#00FF88",
    fontSize: 14,
    fontWeight: "600",
  },
  forgotLink: {
    
  },
  button: {
    backgroundColor: "#00FF88",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: "#0E1410",
    fontSize: 16,
    fontWeight: "bold",
  },
  quickLoginSection: {
    marginTop: 20,
  },
  quickLoginTitle: {
    color: "#A7F3D0",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  quickLoginOptions: {
    flexDirection: "row",
    gap: 12,
  },
  quickLoginButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.2)",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  quickLoginText: {
    color: "#00FF88",
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#2D4A3A",
  },
  dividerText: {
    color: "#64748b",
    fontSize: 12,
    marginHorizontal: 10,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    color: "#A7F3D0",
    fontSize: 14,
  },
  signUpLink: {
    
  },
  signUpLinkText: {
    color: "#00FF88",
    fontWeight: "bold",
  },
  benefitsCard: {
    backgroundColor: "rgba(0, 255, 136, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  benefitsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  benefitsTitle: {
    color: "#00FF88",
    fontSize: 16,
    fontWeight: "bold",
  },
  benefitsDescription: {
    color: "#A7F3D0",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  benefitsFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  benefitsFooterText: {
    color: "#64748b",
    fontSize: 12,
    fontStyle: "italic",
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 20,
  },
  securityText: {
    color: "#64748b",
    fontSize: 12,
  },
});
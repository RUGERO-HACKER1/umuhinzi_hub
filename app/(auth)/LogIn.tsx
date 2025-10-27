import React, { useState, useEffect } from "react";
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

  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  // THEME SETUP - FIXED
  const { theme, currentTheme, setTheme, toggleTheme } = useTheme();
  const colors = getThemeColors(currentTheme);
  const styles = createStyles(colors);

  useEffect(() => {
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

  const quickLoginOptions = [
    {
      icon: "fingerprint",
      label: "Use Biometric",
      onPress: () => Alert.alert("Biometric", "Biometric login coming soon!")
    },
    {
      icon: "phone-portrait",
      label: "Quick PIN",
      onPress: () => Alert.alert("PIN", "PIN login coming soon!")
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Animated Background */}
      <View style={styles.backgroundOverlay}>
        <Animated.View style={[styles.floatingOrb, styles.orb1, { backgroundColor: colors.primary }]} />
        <Animated.View style={[styles.floatingOrb, styles.orb2, { backgroundColor: colors.info }]} />
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
              <Ionicons name="arrow-back" size={22} color={colors.primary} />
            </TouchableOpacity>

            <View style={styles.logoSection}>
              <View style={styles.logoContainer}>
                <View style={[styles.logoGlow, { backgroundColor: colors.primary }]} />
                <MaterialCommunityIcons name="farmer" size={44} color={colors.primary} />
              </View>
              <Text style={styles.title}>Welcome Back Farmer!</Text>
              <Text style={styles.subtitle}>
                Log in to continue your farming journey with UmuhinziHub
              </Text>
            </View>
          </View>

          {/* Theme Toggle Button */}
          <TouchableOpacity 
            style={[styles.themeToggle, { backgroundColor: `${colors.primary}20` }]}
            onPress={toggleTheme}
          >
            <Ionicons
              name={currentTheme === 'dark' ? "moon" : "sunny"}
              size={20}
              color={colors.primary}
            />
            <Text style={[styles.themeToggleText, { color: colors.primary }]}>
              {currentTheme === 'dark' ? 'Dark' : 'Light'} Mode
            </Text>
          </TouchableOpacity>

          {/* Quick Stats */}
          <View style={[styles.statsSection, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>50K+</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Farmers</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>40%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Yield Increase</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>95%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Satisfaction</Text>
            </View>
          </View>

          {/* Login Form */}
          <View style={[styles.form, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Phone Number or Email</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="person-outline" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your phone number or email"
                placeholderTextColor={colors.textSecondary}
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                autoCapitalize="none"
              />
            </View>

            <Text style={[styles.label, { color: colors.textSecondary }]}>Password</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your password"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color={colors.primary} 
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
                <View style={[
                  styles.checkbox, 
                  { borderColor: colors.primary },
                  rememberMe && [styles.checkboxChecked, { backgroundColor: colors.primary }]
                ]}>
                  {rememberMe && <Ionicons name="checkmark" size={14} color={colors.background} />}
                </View>
                <Text style={[styles.rememberMeText, { color: colors.textSecondary }]}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Link href="/ForgotPassword" style={styles.forgotLink}>
                  <Text style={[styles.forgotText, { color: colors.primary }]}>Forgot Password?</Text>
                </Link>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: colors.primary }, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Ionicons name="reload" size={20} color={colors.background} />
                  <Text style={[styles.buttonText, { color: colors.background }]}>Logging In...</Text>
                </View>
              ) : (
                <>
                  <MaterialCommunityIcons name="login" size={20} color={colors.background} />
                  <Text style={[styles.buttonText, { color: colors.background }]}>Log In to My Farm</Text>
                  <Ionicons name="arrow-forward" size={18} color={colors.background} />
                </>
              )}
            </TouchableOpacity>

            {/* Quick Login Options */}
            <View style={styles.quickLoginSection}>
              <Text style={[styles.quickLoginTitle, { color: colors.textSecondary }]}>Quick Access</Text>
              <View style={styles.quickLoginOptions}>
                {quickLoginOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.quickLoginButton, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}
                    onPress={option.onPress}
                  >
                    <Ionicons name={option.icon as any} size={20} color={colors.primary} />
                    <Text style={[styles.quickLoginText, { color: colors.primary }]}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerText, { color: colors.textSecondary }]}>or</Text>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            </View>

            {/* Sign Up Link */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                New to UmuhinziHub?{" "}
                <Link href="/SignUp" style={styles.signUpLink}>
                  <Text style={[styles.signUpLinkText, { color: colors.primary }]}>Create Farmer Account</Text>
                </Link>
              </Text>
            </View>
          </View>

          {/* Benefits Card */}
          <View style={[styles.benefitsCard, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
            <View style={styles.benefitsHeader}>
              <MaterialCommunityIcons name="weather-cloudy" size={24} color={colors.primary} />
              <Text style={[styles.benefitsTitle, { color: colors.primary }]}>Todays Farming Tip</Text>
            </View>
            <Text style={[styles.benefitsDescription, { color: colors.textSecondary }]}>
              Check weather forecasts regularly and plan your irrigation accordingly. 
              Our AI predicts rainfall with 95% accuracy for your specific location.
            </Text>
            <View style={styles.benefitsFooter}>
              <Ionicons name="sparkles" size={16} color={colors.primary} />
              <Text style={[styles.benefitsFooterText, { color: colors.textSecondary }]}>Powered by AURA AI</Text>
            </View>
          </View>

          {/* Security Note */}
          <View style={styles.securityNote}>
            <Ionicons name="shield-checkmark" size={16} color={colors.primary} />
            <Text style={[styles.securityText, { color: colors.textSecondary }]}>
              Your farming data is secure and encrypted
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
    opacity: 0.1,
  },
  orb1: {
    top: "10%",
    right: "-10%",
    width: 120,
    height: 120,
  },
  orb2: {
    bottom: "15%",
    left: "-10%",
    width: 180,
    height: 180,
    opacity: 0.08,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: 10,
  },
  backButton: {
    padding: 6,
    backgroundColor: `${colors.primary}20`,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  themeToggleText: {
    fontSize: 14,
    fontWeight: '600',
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
    opacity: 0.2,
    position: "absolute",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: colors.text,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  statsSection: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    marginHorizontal: 8,
  },
  form: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    marginTop: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
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
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  rememberMeText: {
    fontSize: 14,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: "600",
  },
  forgotLink: {
    
  },
  button: {
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
    fontSize: 16,
    fontWeight: "bold",
  },
  quickLoginSection: {
    marginTop: 20,
  },
  quickLoginTitle: {
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
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
  },
  quickLoginText: {
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
  },
  dividerText: {
    fontSize: 12,
    marginHorizontal: 10,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
  },
  signUpLink: {
    
  },
  signUpLinkText: {
    fontWeight: "bold",
  },
  benefitsCard: {
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
  },
  benefitsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  benefitsDescription: {
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
    fontSize: 12,
  },
});
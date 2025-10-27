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

export default function SignUp() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    region: "",
    farmType: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  // ⭐⭐⭐ THEME SETUP - ADD THESE 3 LINES ⭐⭐⭐
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

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignUp = async () => {
    // Basic validation
    if (!form.fullName || !form.phone || !form.region || !form.password || !form.farmType) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Welcome to UmuhinziHub!", 
        "Your farmer account has been created successfully!",
        [
          {
            text: "Start Farming",
            onPress: () => router.push("/(tabs)/home")
          }
        ]
      );
    }, 2000);
  };

  const farmTypes = [
    { id: "vegetables", name: "Vegetables", icon: "carrot" },
    { id: "fruits", name: "Fruits", icon: "apple" },
    { id: "cereals", name: "Cereals", icon: "wheat" },
    { id: "livestock", name: "Livestock", icon: "cow" },
    { id: "poultry", name: "Poultry", icon: "egg" },
    { id: "mixed", name: "Mixed Farming", icon: "sprout" },
  ];

  const farmerScales = [
    { id: "small", name: "Smallholder (<1 Ha)", icon: "home" },
    { id: "medium", name: "Medium (1-5 Ha)", icon: "account" },
    { id: "large", name: "Large (>5 Ha)", icon: "scale" },
    { id: "cooperative", name: "Cooperative", icon: "account-group" },
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
              style={[styles.backButton, { backgroundColor: `${colors.primary}20` }]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color={colors.primary} />
            </TouchableOpacity>

            <View style={styles.logoSection}>
              <View style={styles.logoContainer}>
                <View style={[styles.logoGlow, { backgroundColor: colors.primary }]} />
                <MaterialCommunityIcons name="farmer" size={44} color={colors.primary} />
              </View>
              <Text style={styles.title}>Join UmuhinziHub</Text>
              <Text style={styles.subtitle}>
                Create your farmer account and start your digital farming journey
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

          {/* Farm Type Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>What do you farm? *</Text>
            <View style={styles.farmTypeGrid}>
              {farmTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.farmTypeButton,
                    { backgroundColor: `${colors.primary}10`, borderColor: colors.border },
                    form.farmType === type.id && [styles.farmTypeButtonActive, { backgroundColor: colors.primary, borderColor: colors.primary }]
                  ]}
                  onPress={() => handleInputChange('farmType', type.id)}
                >
                  <MaterialCommunityIcons 
                    name={type.icon as any} 
                    size={20} 
                    color={form.farmType === type.id ? colors.background : colors.primary} 
                  />
                  <Text style={[
                    styles.farmTypeText,
                    { color: colors.primary },
                    form.farmType === type.id && [styles.farmTypeTextActive, { color: colors.background }]
                  ]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Farm Scale Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Farm Scale *</Text>
            <View style={styles.farmScaleGrid}>
              {farmerScales.map((scale) => (
                <TouchableOpacity
                  key={scale.id}
                  style={[styles.farmScaleButton, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}
                >
                  <MaterialCommunityIcons 
                    name={scale.icon as any} 
                    size={18} 
                    color={colors.primary} 
                  />
                  <Text style={[styles.farmScaleText, { color: colors.textSecondary }]}>{scale.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Form Fields */}
          <View style={[styles.form, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Full Name *</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="person-outline" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your full name"
                placeholderTextColor={colors.textSecondary}
                value={form.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
              />
            </View>

            <Text style={[styles.label, { color: colors.textSecondary }]}>Phone Number *</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="call-outline" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="+250 XXX XXX XXX"
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
              />
            </View>

            <Text style={[styles.label, { color: colors.textSecondary }]}>Email (Optional)</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="mail-outline" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="your.email@example.com"
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
                value={form.email}
                onChangeText={(value) => handleInputChange('email', value)}
              />
            </View>

            <Text style={[styles.label, { color: colors.textSecondary }]}>Region / District *</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="location-outline" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Select your region"
                placeholderTextColor={colors.textSecondary}
                value={form.region}
                onChangeText={(value) => handleInputChange('region', value)}
              />
              <Ionicons name="chevron-down" size={20} color={colors.primary} style={styles.dropdownIcon} />
            </View>

            <Text style={[styles.label, { color: colors.textSecondary }]}>Password *</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Create a strong password"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showPassword}
                value={form.password}
                onChangeText={(value) => handleInputChange('password', value)}
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

            <Text style={[styles.label, { color: colors.textSecondary }]}>Confirm Password *</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.primary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Confirm your password"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showConfirmPassword}
                value={form.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color={colors.primary} 
                  style={styles.eyeIcon} 
                />
              </TouchableOpacity>
            </View>

            {/* Terms Agreement */}
            <View style={styles.termsContainer}>
              <TouchableOpacity style={[styles.checkbox, { backgroundColor: colors.primary }]}>
                <Ionicons name="checkmark" size={16} color={colors.background} />
              </TouchableOpacity>
              <Text style={[styles.termsText, { color: colors.textSecondary }]}>
                I agree to the{" "}
                <Text style={[styles.termsLink, { color: colors.primary }]} onPress={() => router.push('/terms')}>
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text style={[styles.termsLink, { color: colors.primary }]} onPress={() => router.push('/privacy')}>
                  Privacy Policy
                </Text>
              </Text>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: colors.primary }, isLoading && styles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Ionicons name="reload" size={20} color={colors.background} />
                  <Text style={[styles.buttonText, { color: colors.background }]}>Creating Account...</Text>
                </View>
              ) : (
                <>
                  <MaterialCommunityIcons name="farmer" size={20} color={colors.background} />
                  <Text style={[styles.buttonText, { color: colors.background }]}>Become a Farmer Member</Text>
                  <Ionicons name="arrow-forward" size={18} color={colors.background} />
                </>
              )}
            </TouchableOpacity>

            {/* Benefits Section */}
            <View style={[styles.benefitsSection, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
              <Text style={[styles.benefitsTitle, { color: colors.primary }]}>Why join UmuhinziHub?</Text>
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Ionicons name="cloud" size={16} color={colors.primary} />
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>AI Weather Forecasts</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="cart" size={16} color={colors.primary} />
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>Direct Market Access</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="camera" size={16} color={colors.primary} />
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>Crop Disease Detection</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="chatbubble" size={16} color={colors.primary} />
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>24/7 AI Farming Assistant</Text>
                </View>
              </View>
            </View>

            {/* Link to Login */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                Already have an account?{" "}
                <Link href="/LogIn" style={styles.loginLink}>
                  <Text style={[styles.loginLinkText, { color: colors.primary }]}>Log In</Text>
                </Link>
              </Text>
            </View>
          </View>

          {/* Bottom Note */}
          <View style={styles.bottomNote}>
            <Ionicons name="shield-checkmark" size={16} color={colors.primary} />
            <Text style={[styles.bottomNoteText, { color: colors.textSecondary }]}>
              Trusted by 50,000+ African farmers
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ⭐⭐⭐ REPLACE StyleSheet.create WITH THIS FUNCTION ⭐⭐⭐
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
    top: "5%",
    right: "-10%",
    width: 150,
    height: 150,
  },
  orb2: {
    bottom: "10%",
    left: "-10%",
    width: 200,
    height: 200,
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
    marginBottom: 10,
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
    fontSize: 28,
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  farmTypeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  farmTypeButton: {
    width: (screenWidth - 60) / 3,
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    gap: 6,
  },
  farmTypeButtonActive: {
    borderWidth: 2,
  },
  farmTypeText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  farmTypeTextActive: {
    fontWeight: "bold",
  },
  farmScaleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  farmScaleButton: {
    width: (screenWidth - 60) / 2,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    gap: 6,
    flexDirection: "row",
    justifyContent: "center",
  },
  farmScaleText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
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
  dropdownIcon: {
    marginLeft: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 2,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
  },
  termsLink: {
    fontWeight: "600",
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
  benefitsSection: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  benefitText: {
    fontSize: 14,
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
  },
  loginLink: {
    
  },
  loginLinkText: {
    fontWeight: "bold",
  },
  bottomNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 20,
  },
  bottomNoteText: {
    fontSize: 12,
  },
});
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

  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

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

  // const farmTypes = [
  //   { id: "vegetables", name: "Vegetables", icon: "carrot" },
  //   { id: "fruits", name: "Fruits", icon: "apple" },
  //   { id: "cereals", name: "Cereals", icon: "wheat" },
  //   { id: "livestock", name: "Livestock", icon: "cow" },
  //   { id: "poultry", name: "Poultry", icon: "egg" },
  //   { id: "mixed", name: "Mixed Farming", icon: "sprout" },
  // ];

  // const farmerScales = [
  //   { id: "small", name: "Smallholder (<1 Ha)", icon: "home" },
  //   { id: "medium", name: "Medium (1-5 Ha)", icon: "account" },
  //   { id: "large", name: "Large (>5 Ha)", icon: "scale" },
  //   { id: "cooperative", name: "Cooperative", icon: "account-group" },
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
              <Text style={styles.title}>Join UmuhinziHub</Text>
              <Text style={styles.subtitle}>
                Create your farmer account and start your digital farming journey
              </Text>
            </View>
          </View>

          {/* Farm Type Selection */}
          {/* <View style={styles.section}>
            <Text style={styles.sectionTitle}>What do you farm? *</Text>
            <View style={styles.farmTypeGrid}>
              {farmTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.farmTypeButton,
                    form.farmType === type.id && styles.farmTypeButtonActive
                  ]}
                  onPress={() => handleInputChange('farmType', type.id)}
                >
                  <MaterialCommunityIcons 
                    name={type.icon as any} 
                    size={20} 
                    color={form.farmType === type.id ? "#0E1410" : "#00FF88"} 
                  />
                  <Text style={[
                    styles.farmTypeText,
                    form.farmType === type.id && styles.farmTypeTextActive
                  ]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View> */}

          {/* Farm Scale Selection */}
          {/* <View style={styles.section}>
            <Text style={styles.sectionTitle}>Farm Scale *</Text>
            <View style={styles.farmScaleGrid}>
              {farmerScales.map((scale) => (
                <TouchableOpacity
                  key={scale.id}
                  style={styles.farmScaleButton}
                >
                  <MaterialCommunityIcons 
                    name={scale.icon as any} 
                    size={18} 
                    color="#00FF88" 
                  />
                  <Text style={styles.farmScaleText}>{scale.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View> */}

          {/* Form Fields */}
          <View style={styles.form}>
            <Text style={styles.label}>Full Name *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#00FF88" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#64748b"
                value={form.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
              />
            </View>

            <Text style={styles.label}>Phone Number *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#00FF88" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="+250 XXX XXX XXX"
                placeholderTextColor="#64748b"
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
              />
            </View>

            <Text style={styles.label}>Email (Optional)</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#00FF88" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                value={form.email}
                onChangeText={(value) => handleInputChange('email', value)}
              />
            </View>

            <Text style={styles.label}>Region / District *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={20} color="#00FF88" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Select your region"
                placeholderTextColor="#64748b"
                value={form.region}
                onChangeText={(value) => handleInputChange('region', value)}
              />
              <Ionicons name="chevron-down" size={20} color="#00FF88" style={styles.dropdownIcon} />
            </View>

            <Text style={styles.label}>Password *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#00FF88" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Create a strong password"
                placeholderTextColor="#64748b"
                secureTextEntry={!showPassword}
                value={form.password}
                onChangeText={(value) => handleInputChange('password', value)}
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

            <Text style={styles.label}>Confirm Password *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#00FF88" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor="#64748b"
                secureTextEntry={!showConfirmPassword}
                value={form.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#00FF88" 
                  style={styles.eyeIcon} 
                />
              </TouchableOpacity>
            </View>

            {/* Terms Agreement */}
            <View style={styles.termsContainer}>
              <TouchableOpacity style={styles.checkbox}>
                <Ionicons name="checkmark" size={16} color="#0E1410" />
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I agree to the{" "}
                <Text style={styles.termsLink} onPress={() => router.push('/terms')}>
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text style={styles.termsLink} onPress={() => router.push('/privacy')}>
                  Privacy Policy
                </Text>
              </Text>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity 
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Ionicons name="reload" size={20} color="#0E1410" />
                  <Text style={styles.buttonText}>Creating Account...</Text>
                </View>
              ) : (
                <>
                  <MaterialCommunityIcons name="farmer" size={20} color="#0E1410" />
                  <Text style={styles.buttonText}>Become a Farmer Member</Text>
                  <Ionicons name="arrow-forward" size={18} color="#0E1410" />
                </>
              )}
            </TouchableOpacity>

            {/* Benefits Section */}
            <View style={styles.benefitsSection}>
              <Text style={styles.benefitsTitle}>Why join UmuhinziHub?</Text>
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Ionicons name="cloud" size={16} color="#00FF88" />
                  <Text style={styles.benefitText}>AI Weather Forecasts</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="cart" size={16} color="#00FF88" />
                  <Text style={styles.benefitText}>Direct Market Access</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="camera" size={16} color="#00FF88" />
                  <Text style={styles.benefitText}>Crop Disease Detection</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Ionicons name="chatbubble" size={16} color="#00FF88" />
                  <Text style={styles.benefitText}>24/7 AI Farming Assistant</Text>
                </View>
              </View>
            </View>

            {/* Link to Login */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?{" "}
                <Link href="/LogIn" style={styles.loginLink}>
                  <Text style={styles.loginLinkText}>Log In</Text>
                </Link>
              </Text>
            </View>
          </View>

          {/* Bottom Note */}
          <View style={styles.bottomNote}>
            <Ionicons name="shield-checkmark" size={16} color="#00FF88" />
            <Text style={styles.bottomNoteText}>
              Trusted by 50,000+ African farmers
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    top: "5%",
    right: "-10%",
    width: 150,
    height: 150,
    backgroundColor: "#00FF88",
    opacity: 0.1,
  },
  orb2: {
    bottom: "10%",
    left: "-10%",
    width: 200,
    height: 200,
    backgroundColor: "#60A5FA",
    opacity: 0.08,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
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
    backgroundColor: "#00FF88",
    opacity: 0.2,
    position: "absolute",
  },
  title: {
    color: "#fff",
    fontSize: 28,
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
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
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(0, 255, 136, 0.3)",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    gap: 6,
  },
  farmTypeButtonActive: {
    backgroundColor: "#00FF88",
    borderColor: "#00FF88",
  },
  farmTypeText: {
    color: "#00FF88",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  farmTypeTextActive: {
    color: "#0E1410",
    fontWeight: "bold",
  },
  farmScaleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  farmScaleButton: {
    width: (screenWidth - 60) / 2,
    backgroundColor: "rgba(0, 255, 136, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.2)",
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
    gap: 6,
    flexDirection: "row",
    justifyContent: "center",
  },
  farmScaleText: {
    color: "#A7F3D0",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
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
    backgroundColor: "#00FF88",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 2,
  },
  termsText: {
    flex: 1,
    color: "#A7F3D0",
    fontSize: 14,
    lineHeight: 18,
  },
  termsLink: {
    color: "#00FF88",
    fontWeight: "600",
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
  benefitsSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "rgba(0, 255, 136, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  benefitsTitle: {
    color: "#00FF88",
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
    color: "#A7F3D0",
    fontSize: 14,
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#A7F3D0",
    fontSize: 14,
  },
  loginLink: {
    
  },
  loginLinkText: {
    color: "#00FF88",
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
    color: "#64748b",
    fontSize: 12,
  },
});
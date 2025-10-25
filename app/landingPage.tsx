import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Animated,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function ModernLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Animated Background Orbs */}
        <View style={styles.backgroundOverlay}>
          <View style={[styles.floatingOrb, styles.orb1]} />
          <View style={[styles.floatingOrb, styles.orb2]} />
          <View style={[styles.floatingOrb, styles.orb3]} />
        </View>

        {/* Navigation */}
        <View style={styles.nav}>
          <View style={styles.navContent}>
            <View style={styles.logo}>
              <View style={styles.logoIcon}>
                <Ionicons name="leaf" size={24} color="#0a0e14" />
              </View>
              <Text style={styles.logoText}>UmuhinziHub</Text>
            </View>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Ionicons
                name={isMenuOpen ? "close" : "menu"}
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {isMenuOpen && (
            <View style={styles.mobileMenu}>
<TouchableOpacity
  style={styles.mobileMenuItem}
  onPress={() => router.push("/tips")} // 👈 navigates to your Tips file
>
  <Text style={styles.mobileMenuText}>Features</Text>
</TouchableOpacity>
<TouchableOpacity
  style={styles.mobileMenuItem}
  onPress={() => router.push("/About")}
>
  <Text style={styles.mobileMenuText}>About</Text>
</TouchableOpacity>

              <TouchableOpacity
                style={styles.mobileMenuItemBorder}
                onPress={() => router.push("/LogIn")}
              >
                <Text style={styles.mobileMenuTextGreen}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mobileMenuItemGradient}
                onPress={() => router.push("/SignUp")}
              >
                <Text style={styles.mobileMenuTextBold}>Get Started</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Hero Section */}
        <Animated.View
          style={[
            styles.hero,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>✨</Text>
            <Text style={styles.badgeText}>Transforming African Agriculture</Text>
          </View>

          <Text style={styles.heroTitleLight}>Empowering</Text>
          <Text style={styles.heroTitleGradient}>Smallholder Farmers</Text>

          <Text style={styles.heroDescription}>
            Smart farming intelligence, direct market access, and community
            support—all in your pocket
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push("/SignUp")}
          >
            <Text style={styles.primaryButtonText}>Start Growing Smarter →</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push("/LogIn")}
          >
            <Text style={styles.secondaryButtonText}>Watch Demo</Text>
          </TouchableOpacity>

          {/* Stats */}
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>50K+</Text>
              <Text style={styles.statLabel}>Active Farmers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>95%</Text>
              <Text style={styles.statLabel}>Satisfaction</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>40%</Text>
              <Text style={styles.statLabel}>Yield Increase</Text>
            </View>
          </View>
        </Animated.View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Why Choose <Text style={styles.gradientText}>UmuhinziHub</Text>?
          </Text>
          <Text style={styles.sectionSubtitle}>
            Cutting-edge technology meets traditional farming wisdom
          </Text>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <MaterialCommunityIcons
                name="weather-partly-cloudy"
                size={32}
                color="#10b981"
              />
            </View>
            <View style={styles.featureTextContent}>
              <Text style={styles.featureTitle}>AI Weather Intelligence</Text>
              <Text style={styles.featureDescription}>
                Real-time hyper-local forecasts with smart farming recommendations
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <MaterialCommunityIcons
                name="currency-usd"
                size={32}
                color="#10b981"
              />
            </View>
            <View style={styles.featureTextContent}>
              <Text style={styles.featureTitle}>Live Market Dynamics</Text>
              <Text style={styles.featureDescription}>
                Access real-time pricing and connect directly with buyers
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <MaterialCommunityIcons name="sprout" size={32} color="#10b981" />
            </View>
            <View style={styles.featureTextContent}>
              <Text style={styles.featureTitle}>Regenerative Farming</Text>
              <Text style={styles.featureDescription}>
                Sustainable practices that heal the earth and boost yields
              </Text>
            </View>
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Services <Text style={styles.gradientText}>Offered</Text>
          </Text>

          <View style={styles.serviceGrid}>
            <View style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <MaterialCommunityIcons
                  name="flower-tulip-outline"
                  size={28}
                  color="#10b981"
                />
              </View>
              <Text style={styles.serviceTitle}>Planting Intelligence</Text>
              <Text style={styles.serviceDescription}>
                Never miss optimal planting windows
              </Text>
            </View>

            <View style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <MaterialCommunityIcons
                  name="shopping-outline"
                  size={28}
                  color="#10b981"
                />
              </View>
              <Text style={styles.serviceTitle}>Digital Marketplace</Text>
              <Text style={styles.serviceDescription}>Sell direct, earn more</Text>
            </View>

            <View style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <MaterialCommunityIcons
                  name="calendar-check-outline"
                  size={28}
                  color="#10b981"
                />
              </View>
              <Text style={styles.serviceTitle}>Smart Reminders</Text>
              <Text style={styles.serviceDescription}>
                Automated crop care alerts
              </Text>
            </View>

            <View style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={28}
                  color="#10b981"
                />
              </View>
              <Text style={styles.serviceTitle}>Farmer Network</Text>
              <Text style={styles.serviceDescription}>Connect with local experts</Text>
            </View>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Pro <Text style={styles.gradientText}>Tips</Text>
          </Text>

          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <View style={styles.tipIconContainer}>
                <MaterialCommunityIcons
                  name="white-balance-sunny"
                  size={20}
                  color="#10b981"
                />
              </View>
              <Text style={styles.tipTitle}>Seasonal Planting</Text>
            </View>
            <Text style={styles.tipDescription}>
              Optimize yields by planting according to microclimates
            </Text>
          </View>

          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <View style={styles.tipIconContainer}>
                <MaterialCommunityIcons name="water" size={20} color="#10b981" />
              </View>
              <Text style={styles.tipTitle}>Water Management</Text>
            </View>
            <Text style={styles.tipDescription}>
              Smart irrigation reduces water use by 40%
            </Text>
          </View>

          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <View style={styles.tipIconContainer}>
                <MaterialCommunityIcons name="sprout" size={20} color="#10b981" />
              </View>
              <Text style={styles.tipTitle}>Soil Health</Text>
            </View>
            <Text style={styles.tipDescription}>
              Cover crops increase organic matter and profits
            </Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.section}>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>
              Join <Text style={styles.gradientText}>50,000+</Text> Farmers
            </Text>
            <Text style={styles.ctaDescription}>
              Start your journey to smarter, more profitable farming today
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#64748b"
            />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#64748b"
              keyboardType="email-address"
            />

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/SignUp")}
            >
              <Text style={styles.primaryButtonText}>Get Started Today</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLogo}>
            <View style={styles.logoIcon}>
              <Ionicons name="leaf" size={24} color="#0a0e14" />
            </View>
            <Text style={styles.logoText}>UmuhinziHub</Text>
          </View>

          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-whatsapp" size={24} color="#94a3b8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={24} color="#94a3b8" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="mail-outline" size={24} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            © 2024 UmuhinziHub. All rights reserved.
          </Text>
          <Text style={styles.footerLinks}>Privacy Policy | Terms of Service</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0a0e14",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#0a0e14",
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.15,
  },
  floatingOrb: {
    position: "absolute",
    borderRadius: 999,
  },
  orb1: {
    top: "10%",
    left: "5%",
    width: 250,
    height: 250,
    backgroundColor: "#10b981",
    opacity: 0.3,
  },
  orb2: {
    top: "30%",
    right: "10%",
    width: 300,
    height: 300,
    backgroundColor: "#06b6d4",
    opacity: 0.2,
  },
  orb3: {
    bottom: "15%",
    left: "30%",
    width: 280,
    height: 280,
    backgroundColor: "#84cc16",
    opacity: 0.25,
  },
  nav: {
    position: "relative",
    zIndex: 1000,
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(100, 116, 139, 0.2)",
  },
  navContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    backgroundColor: "#10b981",
    padding: 8,
    borderRadius: 12,
  },
  logoText: {
    color: "#10b981",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
  menuButton: {
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    padding: 10,
    borderRadius: 12,
  },
  mobileMenu: {
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(100, 116, 139, 0.2)",
    padding: 16,
  },
  mobileMenuItem: {
    padding: 14,
    marginBottom: 8,
    borderRadius: 12,
  },
  mobileMenuText: {
    color: "#fff",
    fontSize: 16,
  },
  mobileMenuItemBorder: {
    padding: 14,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  mobileMenuTextGreen: {
    color: "#10b981",
    fontSize: 16,
    fontWeight: "bold",
  },
  mobileMenuItemGradient: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#10b981",
  },
  mobileMenuTextBold: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  hero: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 50,
    marginBottom: 30,
  },
  badgeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  badgeText: {
    color: "#10b981",
    fontSize: 13,
    fontWeight: "600",
  },
  heroTitleLight: {
    color: "#cbd5e1",
    fontSize: 42,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 8,
  },
  heroTitleGradient: {
    color: "#10b981",
    fontSize: 48,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 52,
  },
  heroDescription: {
    color: "#94a3b8",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  primaryButton: {
    backgroundColor: "#10b981",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "rgba(16, 185, 129, 0.3)",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  secondaryButtonText: {
    color: "#10b981",
    fontSize: 16,
    fontWeight: "bold",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 40,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "#10b981",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 4,
  },
  statLabel: {
    color: "#64748b",
    fontSize: 12,
  },
  section: {
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  sectionSubtitle: {
    color: "#94a3b8",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  gradientText: {
    color: "#10b981",
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(71, 85, 105, 0.5)",
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
  },
  featureIconContainer: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: 16,
    borderRadius: 16,
    marginRight: 16,
  },
  featureTextContent: {
    flex: 1,
  },
  featureTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  featureDescription: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 22,
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    width: "48%",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(51, 65, 85, 1)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
  },
  serviceIcon: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    padding: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  serviceTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  serviceDescription: {
    color: "#94a3b8",
    fontSize: 12,
  },
  tipCard: {
    backgroundColor: "rgba(16, 185, 129, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.2)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tipIconContainer: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    padding: 8,
    borderRadius: 10,
    marginRight: 12,
  },
  tipTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tipDescription: {
    color: "#94a3b8",
    fontSize: 13,
  },
  ctaCard: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
  },
  ctaTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  ctaDescription: {
    color: "#cbd5e1",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(71, 85, 105, 1)",
    borderRadius: 12,
    padding: 16,
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(51, 65, 85, 1)",
    padding: 40,
    alignItems: "center",
  },
  footerLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  socialIcons: {
    flexDirection: "row",
    marginBottom: 24,
  },
  socialButton: {
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(71, 85, 105, 1)",
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },
  footerText: {
    color: "#64748b",
    fontSize: 13,
    textAlign: "center",
  },
  footerLinks: {
    color: "#475569",
    fontSize: 11,
    marginTop: 8,
    textAlign: "center",
  },
});
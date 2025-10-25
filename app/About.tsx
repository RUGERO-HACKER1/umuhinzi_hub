import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function ModernAboutScreen() {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(30);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Animated Background Orbs */}
      <View style={styles.backgroundOverlay}>
        <View style={[styles.floatingOrb, styles.orb1]} />
        <View style={[styles.floatingOrb, styles.orb2]} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Modern Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#10b981" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About Us</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-social-outline" size={22} color="#10b981" />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.heroImageContainer}>
              <Image
                source={{
                  uri: "https://via.placeholder.com/400x200/006400/FFFFFF?text=UmuhinziHub+Community",
                }}
                style={styles.heroImage}
              />
              <View style={styles.heroOverlay}>
                <View style={styles.logoIconLarge}>
                  <Ionicons name="leaf" size={40} color="#0a0e14" />
                </View>
              </View>
            </View>

            <View style={styles.heroBadge}>
              <Ionicons name="people" size={16} color="#10b981" />
              <Text style={styles.heroBadgeText}>50,000+ Active Farmers</Text>
            </View>
          </View>

          {/* Who We Are */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconWrapper}>
                <Ionicons name="information-circle" size={24} color="#10b981" />
              </View>
              <Text style={styles.sectionTitle}>Who We Are</Text>
            </View>
            <Text style={styles.paragraph}>
              <Text style={styles.brandName}>UmuhinziHub </Text>
              is a digital farming platform built to empower smallholder farmers
              across Rwanda and beyond. We connect technology, markets, and
              financial solutions to help farmers grow smarter and earn better.
            </Text>
          </View>

          {/* Mission & Vision Cards */}
          <View style={styles.cardGrid}>
            <View style={styles.missionCard}>
              <View style={styles.cardIconContainer}>
                <MaterialCommunityIcons name="target" size={32} color="#10b981" />
              </View>
              <Text style={styles.cardTitle}>Our Mission</Text>
              <Text style={styles.cardDescription}>
                To revolutionize farming by providing access to data-driven advice,
                digital marketplaces, and real-time agricultural information.
              </Text>
            </View>

            <View style={styles.visionCard}>
              <View style={styles.cardIconContainer}>
                <MaterialCommunityIcons name="earth" size={32} color="#06b6d4" />
              </View>
              <Text style={styles.cardTitle}>Our Vision</Text>
              <Text style={styles.cardDescription}>
                A thriving farming community empowered by technology, sustainable
                practices, and improved livelihoods.
              </Text>
            </View>
          </View>

          {/* Core Values */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconWrapper}>
                <Ionicons name="heart" size={24} color="#10b981" />
              </View>
              <Text style={styles.sectionTitle}>Our Core Values</Text>
            </View>

            <View style={styles.valuesGrid}>
              <View style={styles.valueCard}>
                <MaterialCommunityIcons name="leaf" size={28} color="#10b981" />
                <Text style={styles.valueTitle}>Sustainability</Text>
              </View>
              <View style={styles.valueCard}>
                <MaterialCommunityIcons name="handshake" size={28} color="#10b981" />
                <Text style={styles.valueTitle}>Collaboration</Text>
              </View>
              <View style={styles.valueCard}>
                <MaterialCommunityIcons name="lightbulb-on" size={28} color="#10b981" />
                <Text style={styles.valueTitle}>Innovation</Text>
              </View>
              <View style={styles.valueCard}>
                <MaterialCommunityIcons name="account-heart" size={28} color="#10b981" />
                <Text style={styles.valueTitle}>Empowerment</Text>
              </View>
              <View style={styles.valueCard}>
                <MaterialCommunityIcons name="eye-check" size={28} color="#10b981" />
                <Text style={styles.valueTitle}>Transparency</Text>
              </View>
              <View style={styles.valueCard}>
                <MaterialCommunityIcons name="shield-check" size={28} color="#10b981" />
                <Text style={styles.valueTitle}>Trust</Text>
              </View>
            </View>
          </View>

          {/* Impact Stats */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconWrapper}>
                <Ionicons name="stats-chart" size={24} color="#10b981" />
              </View>
              <Text style={styles.sectionTitle}>Our Impact</Text>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>50K+</Text>
                <Text style={styles.statLabel}>Active Farmers</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>40%</Text>
                <Text style={styles.statLabel}>Yield Increase</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>95%</Text>
                <Text style={styles.statLabel}>Satisfaction</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>200+</Text>
                <Text style={styles.statLabel}>Communities</Text>
              </View>
            </View>
          </View>

          {/* What We Offer */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconWrapper}>
                <Ionicons name="gift" size={24} color="#10b981" />
              </View>
              <Text style={styles.sectionTitle}>What We Offer</Text>
            </View>

            <View style={styles.offerCard}>
              <View style={styles.offerIcon}>
                <MaterialCommunityIcons name="weather-partly-cloudy" size={24} color="#10b981" />
              </View>
              <View style={styles.offerContent}>
                <Text style={styles.offerTitle}>Smart Weather Insights</Text>
                <Text style={styles.offerDescription}>
                  Real-time forecasts and planting recommendations
                </Text>
              </View>
            </View>

            <View style={styles.offerCard}>
              <View style={styles.offerIcon}>
                <MaterialCommunityIcons name="shopping" size={24} color="#10b981" />
              </View>
              <View style={styles.offerContent}>
                <Text style={styles.offerTitle}>Digital Marketplace</Text>
                <Text style={styles.offerDescription}>
                  Connect directly with buyers and get fair prices
                </Text>
              </View>
            </View>

            <View style={styles.offerCard}>
              <View style={styles.offerIcon}>
                <MaterialCommunityIcons name="school" size={24} color="#10b981" />
              </View>
              <View style={styles.offerContent}>
                <Text style={styles.offerTitle}>Expert Knowledge</Text>
                <Text style={styles.offerDescription}>
                  Access farming tips, guides, and video tutorials
                </Text>
              </View>
            </View>

            <View style={styles.offerCard}>
              <View style={styles.offerIcon}>
                <MaterialCommunityIcons name="account-group" size={24} color="#10b981" />
              </View>
              <View style={styles.offerContent}>
                <Text style={styles.offerTitle}>Community Network</Text>
                <Text style={styles.offerDescription}>
                  Join thousands of farmers sharing knowledge
                </Text>
              </View>
            </View>
          </View>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <View style={styles.ctaCard}>
              <Text style={styles.ctaTitle}>Ready to Join?</Text>
              <Text style={styles.ctaDescription}>
                Become part of Africas fastest-growing farming community
              </Text>
              <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => router.push("/SignUp")}
              >
                <Text style={styles.ctaButtonText}>Join Our Network</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Contact Info */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconWrapper}>
                <Ionicons name="mail" size={24} color="#10b981" />
              </View>
              <Text style={styles.sectionTitle}>Get In Touch</Text>
            </View>

            <View style={styles.contactCard}>
              <TouchableOpacity style={styles.contactItem}>
                <View style={styles.contactIconWrapper}>
                  <Ionicons name="mail-outline" size={20} color="#10b981" />
                </View>
                <Text style={styles.contactText}>info@umuhinzihub.rw</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactItem}>
                <View style={styles.contactIconWrapper}>
                  <Ionicons name="call-outline" size={20} color="#10b981" />
                </View>
                <Text style={styles.contactText}>+250 788 123 456</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactItem}>
                <View style={styles.contactIconWrapper}>
                  <Ionicons name="location-outline" size={20} color="#10b981" />
                </View>
                <Text style={styles.contactText}>Kigali, Rwanda</Text>
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
                <Ionicons name="logo-twitter" size={24} color="#94a3b8" />
              </TouchableOpacity>
            </View>

            <Text style={styles.footerText}>
              © 2024 UmuhinziHub. All rights reserved.
            </Text>
            <Text style={styles.footerSubtext}>
              Made with 💚 for Rwandan Farmers
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
    backgroundColor: "#0a0e14",
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  floatingOrb: {
    position: "absolute",
    borderRadius: 999,
  },
  orb1: {
    top: "10%",
    right: "10%",
    width: 200,
    height: 200,
    backgroundColor: "#10b981",
    opacity: 0.3,
  },
  orb2: {
    bottom: "20%",
    left: "10%",
    width: 250,
    height: 250,
    backgroundColor: "#06b6d4",
    opacity: 0.2,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(100, 116, 139, 0.2)",
  },
  backButton: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: 8,
    borderRadius: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  shareButton: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: 8,
    borderRadius: 10,
  },
  heroSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  heroImageContainer: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
  },
  heroImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoIconLarge: {
    backgroundColor: "#10b981",
    padding: 20,
    borderRadius: 20,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  heroBadgeText: {
    color: "#10b981",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIconWrapper: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: 8,
    borderRadius: 10,
    marginRight: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  paragraph: {
    color: "#94a3b8",
    fontSize: 15,
    lineHeight: 24,
  },
  brandName: {
    color: "#10b981",
    fontWeight: "700",
  },
  cardGrid: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  missionCard: {
    backgroundColor: "rgba(16, 185, 129, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.2)",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
  },
  visionCard: {
    backgroundColor: "rgba(6, 182, 212, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(6, 182, 212, 0.2)",
    borderRadius: 20,
    padding: 24,
  },
  cardIconContainer: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardDescription: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 22,
  },
  valuesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  valueCard: {
    width: "48%",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(71, 85, 105, 0.5)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 12,
  },
  valueTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: "rgba(16, 185, 129, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.2)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 12,
  },
  statValue: {
    color: "#10b981",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 4,
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: 12,
    textAlign: "center",
  },
  offerCard: {
    flexDirection: "row",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(71, 85, 105, 0.5)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  offerIcon: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  offerDescription: {
    color: "#94a3b8",
    fontSize: 13,
    lineHeight: 20,
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginTop: 30,
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
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 10,
  },
  ctaDescription: {
    color: "#cbd5e1",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 24,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  ctaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  contactCard: {
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(71, 85, 105, 0.5)",
    borderRadius: 16,
    padding: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(71, 85, 105, 0.3)",
  },
  contactIconWrapper: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  contactText: {
    color: "#cbd5e1",
    fontSize: 14,
  },
  footer: {
    alignItems: "center",
    marginTop: 40,
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: "rgba(51, 65, 85, 1)",
    paddingHorizontal: 20,
  },
  footerLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
  socialIcons: {
    flexDirection: "row",
    marginBottom: 20,
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
  footerSubtext: {
    color: "#475569",
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },
});
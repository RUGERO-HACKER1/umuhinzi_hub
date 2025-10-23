import React from "react";
import TipsAndGuidesScreen from "./tips"; // Adjust path if needed

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ImageBackground,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function LandingPageScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* --- Hero Section --- */}
        <ImageBackground
          source={{
            uri: "https://via.placeholder.com/400x300/228B22/FFFFFF?text=FARMING+BACKGROUND",
          }} // Placeholder for background image
          style={styles.heroBackground}
          imageStyle={styles.heroImageStyle}
        >
          <View style={styles.overlay}>
            <View style={styles.headerBar}>
              <View style={styles.logoContainer}>
                <Ionicons name="leaf" size={24} color="#00FF88" />
                <Text style={styles.logoText}>umuhinzihub</Text>
              </View>
              <View style={styles.headerIcons}>
                <TouchableOpacity>
                  <Ionicons name="menu-outline" size={28} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 10 }}>
                  <Ionicons name="information-circle-outline" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Empowering</Text>
              <Text style={styles.heroSubtitle}>Smallholder Farmers</Text>
              <Text style={styles.heroDescription}>
                Smart farming advice, market access, and financial support
                tailored to your unique needs
              </Text>
              <TouchableOpacity style={styles.getStartedButton}>
                <Text style={styles.getStartedButtonText}>Get Started</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* --- Why Choose Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Why Choose <Text style={{ color: "#00FF88" }}>UmuhinziHub</Text> ?
          </Text>

          <View style={styles.featureCard}>
            <MaterialCommunityIcons name="weather-partly-cloudy" size={32} color="#FCD34D" />
            <View style={styles.featureTextContent}>
              <Text style={styles.featureTitle}>Instant Weather & Soil Tips</Text>
              <Text style={styles.featureDescription}>
                Get real-time data and actionable advice for your local farm conditions.
              </Text>
            </View>
          </View>
          <View style={styles.featureCard}>
            <MaterialCommunityIcons name="currency-usd" size={32} color="#00FF88" />
            <View style={styles.featureTextContent}>
              <Text style={styles.featureTitle}>Real-time Market Prices</Text>
              <Text style={styles.featureDescription}>
                Access up-to-date market information to optimize your selling.
              </Text>
            </View>
          </View>
          <View style={styles.featureCard}>
            <MaterialCommunityIcons name="sprout" size={32} color="#34D399" />
            <View style={styles.featureTextContent}>
              <Text style={styles.featureTitle}>Sustainable Practices</Text>
              <Text style={styles.featureDescription}>
                Learn eco-friendly farming methods for a healthier planet.
              </Text>
            </View>
          </View>
        </View>

        {/* --- Services Offered Section --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Services <Text style={{ color: "#00FF88" }}>Offered</Text>
          </Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons name="flower-tulip-outline" size={32} color="#00FF88" />
              <Text style={styles.gridItemTitle}>Planting Tips</Text>
              <Text style={styles.gridItemDescription}>Dont miss a planting day</Text>
            </View>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons name="seed-outline" size={32} color="#00FF88" />
              <Text style={styles.gridItemTitle}>Marketplace</Text>
              <Text style={styles.gridItemDescription}>Buy and sell before selling</Text>
            </View>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons name="calendar-check-outline" size={32} color="#00FF88" />
              <Text style={styles.gridItemTitle}>Reminders/Updates</Text>
              <Text style={styles.gridItemDescription}>For up to date information</Text>
            </View>
            <View style={styles.gridItem}>
              <MaterialCommunityIcons name="account-group-outline" size={32} color="#00FF88" />
              <Text style={styles.gridItemTitle}>Community Contact</Text>
              <Text style={styles.gridItemDescription}>Access local networks</Text>
            </View>
          </View>
        </View>
        {/* --- Tips & Guides Section --- */}
<TipsAndGuidesScreen />

        {/* --- Join Our Network Section --- */}
        <ImageBackground
          source={{
            uri: "https://via.placeholder.com/400x200/556B2F/FFFFFF?text=FIELD+BACKGROUND",
          }} // Placeholder for background image
          style={[styles.section, styles.networkSection]}
          imageStyle={styles.networkImageStyle}
        >
          <View style={styles.overlay}>
            <Text style={styles.sectionTitle}>
              Join Our <Text style={{ color: "#00FF88" }}>Network</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us about your farming needs"
              placeholderTextColor="#aaa"
              multiline
            />
            <TouchableOpacity style={styles.getStartedButton}>
              <Text style={styles.getStartedButtonText}>Get Started Today</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* --- Footer --- */}
        <View style={styles.footer}>
          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-whatsapp" size={24} color="#ccc" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={24} color="#ccc" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="mail-outline" size={24} color="#ccc" />
            </TouchableOpacity>
          </View>
          <Text style={styles.footerText}>
            © 2024 UmuhinziHub. All rights reserved.
          </Text>
          <Text style={styles.footerText}>
            Privacy Policy | Terms of Service
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0E1410",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#0E1410",
  },
  heroBackground: {
    width: "100%",
    minHeight: 450, // Adjust as needed
    justifyContent: "flex-start",
  },
  heroImageStyle: {
    resizeMode: "cover",
    opacity: 0.3, // Make image darker to let text pop
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for text readability
    paddingBottom: 20,
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  heroContent: {
    padding: 20,
    marginTop: 50, // Push content down from header
  },
  heroTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "300",
  },
  heroSubtitle: {
    color: "#00FF88",
    fontSize: 34,
    fontWeight: "bold",
    lineHeight: 38,
  },
  heroDescription: {
    color: "#ccc",
    fontSize: 15,
    marginTop: 15,
    lineHeight: 22,
  },
  getStartedButton: {
    backgroundColor: "#00FF88",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },
  getStartedButtonText: {
    color: "#0E1410",
    fontWeight: "bold",
    fontSize: 16,
  },
  learnMoreButton: {
    borderColor: "#00FF88",
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  learnMoreButtonText: {
    color: "#00FF88",
    fontWeight: "bold",
    fontSize: 16,
  },
  section: {
    padding: 20,
    backgroundColor: "#1E261E", // Dark card background from your styles
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10, // Added margin to match the image's spacing
  },
  networkSection: {
    backgroundColor: "transparent", // Background image will handle this
    padding: 0,
    overflow: "hidden", // Ensure image doesn't spill
  },
  networkImageStyle: {
    resizeMode: "cover",
    opacity: 0.2, // Make image darker
    borderRadius: 10, // Match section border radius
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: "#2C3A4F", // Darker blue card
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  featureTextContent: {
    marginLeft: 15,
    flex: 1,
  },
  featureTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  featureDescription: {
    color: "#ccc",
    fontSize: 13,
    marginTop: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%", // Roughly half with some space
    backgroundColor: "#2C3A4F",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  gridItemTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  gridItemDescription: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 5,
  },
  input: {
    backgroundColor: "#2C3A4F",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10, // Added space after section title
    marginHorizontal: 15, // Added horizontal margin
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  footer: {
    backgroundColor: "#111", // Even darker footer
    padding: 20,
    alignItems: "center",
    marginTop: 10,
  },
  socialIcons: {
    flexDirection: "row",
    marginBottom: 15,
  },
  socialButton: {
    backgroundColor: "#2C3A4F",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  footerText: {
    color: "#888",
    fontSize: 12,
    marginTop: 5,
  },
});
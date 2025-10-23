import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* --- Header Bar --- */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIconCircle}>
            <Ionicons name="chevron-down" size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <Text style={styles.welcomeText}>
          Welcome back, <Text style={{ fontWeight: "bold" }}>Samuel</Text> 👋
        </Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* --- Ready to Grow Card --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ready to grow today?</Text>
          <Text style={styles.cardSubtitle}>
            Check your crops and stay ahead of the season
          </Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="add" size={20} color="#0E1410" />
            <Text style={styles.primaryButtonText}>Quick Add Crop</Text>
          </TouchableOpacity>
        </View>

        {/* --- My Crops Card --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>My Crops</Text>
            <Link href="/crops" style={styles.viewAllLink}>
              View All
            </Link>
          </View>
          <View style={styles.cropItem}>
            <Text style={styles.cropName}>Maize</Text>
            <Text style={styles.cropStage}>Flowering stage</Text>
            <Text style={styles.cropActionWater}>Water in 2 days!</Text>
          </View>
          <View style={styles.cropItem}>
            <Text style={styles.cropName}>Beans</Text>
            <Text style={styles.cropStage}>Vegetative stage</Text>
            <Text style={styles.cropActionFertilize}>Fertilize tomorrow</Text>
          </View>
        </View>

        {/* --- Weather Card --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Weather Today</Text>
            <Link href="/weather" style={styles.viewAllLink}>
              Full forecast
            </Link>
          </View>
          <View style={styles.weatherBody}>
            <Ionicons name="sunny" size={44} color="#FACC15" />
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherTemp}>28°C</Text>
              <Text style={styles.weatherRain}>20% rain chance</Text>
            </View>
            <View style={styles.weatherAdvice}>
              <Text style={styles.weatherGood}>
                <Ionicons name="checkmark-circle" size={16} color="#00FF88" />{" "}
                Good for spraying
              </Text>
              <Text style={styles.weatherDetails}>low wind, dry conditions</Text>
            </View>
          </View>
        </View>

        {/* --- Market Prices Card --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Market Prices</Text>
            <Link href="/market" style={styles.viewAllLink}>
              More prices
            </Link>
          </View>
          <View style={styles.priceItem}>
            <Text style={styles.priceName}>Maize (per kg)</Text>
            <Text style={styles.priceValue}>UGX 2,500</Text>
          </View>
          <View style={styles.priceItem}>
            <Text style={styles.priceName}>Beans (per kg)</Text>
            <Text style={styles.priceValue}>UGX 4,200</Text>
          </View>
          <View style={[styles.priceItem, { borderBottomWidth: 0 }]}>
            <Text style={styles.priceName}>Coffee (per kg)</Text>
            <Text style={styles.priceValue}>UGX 8,600</Text>
          </View>
        </View>

        {/* --- AI Assistant Card --- */}
        <View style={styles.card}>
          <View style={styles.aiHeader}>
            <View style={styles.aiIcon}>
              <MaterialCommunityIcons name="brain" size={24} color="#00FF88" />
            </View>
            <View>
              <Text style={styles.cardTitle}>AI Assistant</Text>
              <Text style={styles.aiSubtitle}>
                Ask about pest, fertilizer, or planting
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.primaryButton, { marginTop: 15 }]}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color="#0E1410"
            />
            <Text style={styles.primaryButtonText}>Chat Now</Text>
          </TouchableOpacity>
        </View>

        {/* --- Disease Alert Card --- */}
        <View style={styles.alertCard}>
          <Ionicons name="warning" size={24} color="#F87171" />
          <View style={styles.alertInfo}>
            <Text style={styles.alertTitle}>Disease Alert</Text>
            <Text style={styles.alertText}>
              Leaf rust detected in your area. Check maize crops.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* --- Floating Action Button (FAB) --- */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={32} color="#0E1410" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0E1410",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  profileButton: {
    // This is just to match the icon on the left
  },
  profileIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 255, 136, 0.3)", // Faded green
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    color: "#fff",
    fontSize: 18,
  },
  notificationButton: {
    position: "relative",
    padding: 5,
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#EF4444", // Red
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0E1410",
  },
  notificationText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 100, // Space for FAB and tab bar
  },
  card: {
    backgroundColor: "#1E261E", // Dark card background from your styles
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    // Adding shadow to match the image's depth
    shadowColor: "#00FF88",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 15,
  },
  viewAllLink: {
    color: "#00FF88",
    fontWeight: "600",
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: "#00FF88",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#0E1410",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  // My Crops Styles
  cropItem: {
    backgroundColor: "#2C2B3E", // Dark purple/blue from image
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  cropName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cropStage: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 2,
  },
  cropActionWater: {
    color: "#60A5FA", // Light Blue
    fontWeight: "bold",
    marginTop: 5,
  },
  cropActionFertilize: {
    color: "#FCD34D", // Light Yellow
    fontWeight: "bold",
    marginTop: 5,
  },
  // Weather Styles
  weatherBody: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  weatherInfo: {
    marginLeft: 12,
    flex: 1,
  },
  weatherTemp: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  weatherRain: {
    color: "#aaa",
    fontSize: 14,
  },
  weatherAdvice: {
    alignItems: "flex-start",
  },
  weatherGood: {
    color: "#00FF88",
    fontWeight: "600",
    fontSize: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  weatherDetails: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
  // Market Prices Styles
  priceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333", // Faint separator
  },
  priceName: {
    color: "#ccc",
    fontSize: 16,
  },
  priceValue: {
    color: "#00FF88",
    fontSize: 16,
    fontWeight: "bold",
  },
  // AI Assistant Styles
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 255, 136, 0.2)", // Green glow
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  aiSubtitle: {
    color: "#aaa",
    fontSize: 14,
  },
  // Alert Styles
  alertCard: {
    backgroundColor: "rgba(220, 38, 38, 0.2)", // Faded red
    borderColor: "#DC2626", // Solid red border
    borderWidth: 1,
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  alertInfo: {
    marginLeft: 10,
    flex: 1,
  },
  alertTitle: {
    color: "#F87171", // Light Red
    fontSize: 16,
    fontWeight: "bold",
  },
  alertText: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 2,
  },
  // FAB
  fab: {
    position: "absolute",
    bottom: 90, // Positioned above the tab bar
    right: 20,
    backgroundColor: "#00FF88",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#00FF88",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
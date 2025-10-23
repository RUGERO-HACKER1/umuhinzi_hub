import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CropsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.screenTitle}>My Crops</Text>
      <View style={styles.container}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.cardTitle}>My Crops</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.buttonGraySmall}>
              <Ionicons name="cloud-offline-outline" size={14} color="#ccc" />
              <Text style={styles.buttonGraySmallText}>Saved locally</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGraySmall}>
              <Text style={styles.buttonGraySmallText}>EN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonAdd}>
              <Ionicons name="add" size={20} color="#0E1410" />
              <Text style={styles.buttonAddText}>Add Crop</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Action Bar --- */}
        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="checkmark-done-outline" size={16} color="#ccc" />
            <Text style={styles.actionButtonText}>Mark Harvested</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-social-outline" size={16} color="#ccc" />
            <Text style={styles.actionButtonText}>Share Crop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonIcon}>
            <Ionicons name="person-outline" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* --- Crop List --- */}
        <ScrollView style={styles.cropList}>
          {/* --- Item 1: Tomatoes --- */}
          <View style={styles.cropCard}>
            <View style={styles.cropCardHeader}>
              <Image
                source={{
                  uri: "https://via.placeholder.com/60/FF0000/FFFFFF?text=IMG",
                }} // Placeholder
                style={styles.cropImage}
              />
              <View style={styles.cropInfo}>
                <Text style={styles.cropName}>Tomatoes</Text>
                <Text style={styles.cropDate}>Planted: March 15, 2024</Text>
                <Text style={styles.cropStage}>
                  Growth Stage:{" "}
                  <Text style={{ color: "#00FF88" }}>Flowering</Text>
                </Text>
              </View>
              <View style={[styles.statusBadge, styles.statusHealthy]}>
                <Text style={styles.statusBadgeText}>Healthy</Text>
              </View>
            </View>
            <View style={[styles.actionBox, styles.actionBoxInfo]}>
              <MaterialCommunityIcons
                name="clock-time-three-outline"
                size={20}
                color="#FCD34D"
              />
              <Text style={styles.actionBoxText}>Fertilize in 3 days</Text>
            </View>
          </View>

          {/* --- Item 2: Maize --- */}
          <View style={styles.cropCard}>
            <View style={styles.cropCardHeader}>
              <Image
                source={{
                  uri: "https://via.placeholder.com/60/FFFF00/000000?text=IMG",
                }} // Placeholder
                style={styles.cropImage}
              />
              <View style={styles.cropInfo}>
                <Text style={styles.cropName}>Maize</Text>
                <Text style={styles.cropDate}>Planted: February 28, 2024</Text>
                <Text style={styles.cropStage}>
                  Growth Stage:{" "}
                  <Text style={{ color: "#00FF88" }}>Vegetative</Text>
                </Text>
              </View>
              <View style={[styles.statusBadge, styles.statusWatch]}>
                <Text style={styles.statusBadgeText}>Watch</Text>
              </View>
            </View>
            <View style={[styles.actionBox, styles.actionBoxInfo]}>
              <Ionicons name="water-outline" size={20} color="#60A5FA" />
              <Text style={styles.actionBoxText}>Water tomorrow</Text>
            </View>
          </View>

          {/* --- Item 3: Green Beans --- */}
          <View style={styles.cropCard}>
            {/* ... Similar structure for Green Beans ... */}
            <View style={styles.cropCardHeader}>
              <Image
                source={{
                  uri: "https://via.placeholder.com/60/008000/FFFFFF?text=IMG",
                }} // Placeholder
                style={styles.cropImage}
              />
              <View style={styles.cropInfo}>
                <Text style={styles.cropName}>Green Beans</Text>
                <Text style={styles.cropDate}>Planted: April 2, 2024</Text>
                <Text style={styles.cropStage}>
                  Growth Stage:{" "}
                  <Text style={{ color: "#00FF88" }}>Seedling</Text>
                </Text>
              </View>
              <View style={[styles.statusBadge, styles.statusHealthy]}>
                <Text style={styles.statusBadgeText}>Healthy</Text>
              </View>
            </View>
            <View style={[styles.actionBox, styles.actionBoxInfo]}>
              <MaterialCommunityIcons name="bug-outline" size={20} color="#F59E0B" />
              <Text style={styles.actionBoxText}>Check for pests in 2 days</Text>
            </View>
          </View>

          {/* --- Item 4: Cabbage (Alert) --- */}
          <View style={[styles.cropCard, styles.cropCardAlert]}>
            <View style={styles.cropCardHeader}>
              <Image
                source={{
                  uri: "https://via.placeholder.com/60/90EE90/000000?text=IMG",
                }} // Placeholder
                style={styles.cropImage}
              />
              <View style={styles.cropInfo}>
                <Text style={styles.cropName}>Cabbage</Text>
                <Text style={styles.cropDate}>Planted: March 20, 2024</Text>
                <Text style={styles.cropStage}>
                  Growth Stage:{" "}
                  <Text style={{ color: "#00FF88" }}>Vegetative</Text>
                </Text>
              </View>
              <View style={[styles.statusBadge, styles.statusAlert]}>
                <Text style={styles.statusBadgeText}>Alert</Text>
              </View>
            </View>
            <View style={[styles.actionBox, styles.actionBoxAlert]}>
              <Ionicons name="warning-outline" size={20} color="#F87171" />
              <Text style={styles.actionBoxText}>
                Pest detected - treat now
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* --- Floating Action Button --- */}
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
  screenTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#191E2D", // Dark blue/purple card
    margin: 15,
    borderRadius: 20,
    padding: 15,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonGraySmall: {
    flexDirection: "row",
    backgroundColor: "#2C3A4F",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonGraySmallText: {
    color: "#ccc",
    fontSize: 12,
    marginLeft: 4,
  },
  buttonAdd: {
    flexDirection: "row",
    backgroundColor: "#00FF88",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonAddText: {
    color: "#0E1410",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
  actionBar: {
    flexDirection: "row",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#2C3A4F",
    paddingBottom: 10,
  },
  actionButton: {
    flexDirection: "row",
    backgroundColor: "#2C3A4F",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#ccc",
    fontSize: 12,
    marginLeft: 6,
  },
  actionButtonIcon: {
    backgroundColor: "#2C3A4F",
    padding: 8,
    borderRadius: 8,
    marginLeft: "auto",
  },
  cropList: {
    flex: 1,
    marginTop: 10,
  },
  cropCard: {
    backgroundColor: "#2C3A4F", // Darker blue item card
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  cropCardAlert: {
    borderColor: "#EF4444",
    borderWidth: 1,
  },
  cropCardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cropImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cropInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cropName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cropDate: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
  cropStage: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  statusHealthy: {
    backgroundColor: "rgba(0, 255, 136, 0.2)",
    color: "#00FF88",
  },
  statusWatch: {
    backgroundColor: "rgba(252, 211, 77, 0.2)",
    color: "#FCD34D",
  },
  statusAlert: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    color: "#EF4444",
  },
  actionBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  actionBoxInfo: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  actionBoxAlert: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
  },
  actionBoxText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 10,
  },
  fab: {
    position: "absolute",
    bottom: 20,
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
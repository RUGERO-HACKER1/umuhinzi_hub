import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
  Animated,
  Dimensions,
  Alert,
  Modal
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const { width: screenWidth } = Dimensions.get('window');

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [dataSync, setDataSync] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

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

  const handleLogout = () => {
    setShowLogoutModal(false);
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes, Log Out",
          onPress: () => router.replace("/LogIn"),
          style: "destructive"
        }
      ]
    );
  };

  const farmStats = [
    { icon: "land-plots", value: "12.5", label: "Hectares", color: "#00FF88" },
    { icon: "sprout", value: "4", label: "Crops", color: "#60A5FA" },
    { icon: "basket", value: "Mar", label: "Yield", color: "#FCD34D" },
    { icon: "calendar", value: "3", label: "Years", color: "#D8BFD8" },
  ];

  const mainCrops = [
    { name: "Tomatoes", icon: "food-apple", color: "#EF4444" },
    { name: "Potatoes", icon: "food-variant", color: "#F59E0B" },
    { name: "Maize", icon: "corn", color: "#10B981" },
    { name: "Cassava", icon: "carrot", color: "#8B5CF6" },
  ];

  const quickActions = [
    { icon: "weather-cloudy", label: "Weather", screen: "/weather" },
    { icon: "shopping", label: "Market", screen: "/market" },
    { icon: "robot", label: "AURA AI", screen: "/chat" },
    { icon: "camera", label: "Camera", screen: "/scan" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Animated Background */}
      <View style={styles.backgroundOverlay}>
        <Animated.View style={[styles.floatingOrb, styles.orb1]} />
        <Animated.View style={[styles.floatingOrb, styles.orb2]} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color="#00FF88" />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Profile</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="settings-outline" size={22} color="#00FF88" />
            </TouchableOpacity>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1577221084711-3f49713cbe14?w=150&h=150&fit=crop&crop=face" }}
                  style={styles.profileImage}
                />
                <TouchableOpacity 
                  style={styles.editIcon}
                  onPress={() => setIsEditing(true)}
                >
                  <Ionicons name="camera" size={14} color="#0E1410" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Jean Baptiste</Text>
                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={14} color="#00FF88" />
                  <Text style={styles.profileLocation}>Musanze, Northern Province</Text>
                </View>
                <Text style={styles.memberSince}>Farmer since 2022</Text>
              </View>
            </View>

            {/* Quick Stats */}
            <View style={styles.statsGrid}>
              {farmStats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                    <MaterialCommunityIcons name={stat.icon} size={20} color={stat.color} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>

            {/* Main Crops */}
            <View style={styles.cropsSection}>
              <Text style={styles.sectionTitle}>Main Crops</Text>
              <View style={styles.cropsGrid}>
                {mainCrops.map((crop, index) => (
                  <View key={index} style={styles.cropItem}>
                    <View style={[styles.cropIcon, { backgroundColor: `${crop.color}20` }]}>
                      <MaterialCommunityIcons name={crop.icon} size={18} color={crop.color} />
                    </View>
                    <Text style={styles.cropName}>{crop.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.actionButton}
                  onPress={() => router.push(action.screen)}
                >
                  <View style={styles.actionIcon}>
                    <MaterialCommunityIcons name={action.icon} size={24} color="#00FF88" />
                  </View>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Settings Section 1 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(0, 255, 136, 0.2)' }]}>
                  <Ionicons name="language-outline" size={20} color="#00FF88" />
                </View>
                <Text style={styles.settingText}>Language</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>English</Text>
                <Ionicons name="chevron-forward" size={18} color="#64748b" />
              </View>
            </TouchableOpacity>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(96, 165, 250, 0.2)' }]}>
                  <Ionicons name="notifications-outline" size={20} color="#60A5FA" />
                </View>
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <Switch
                trackColor={{ false: "#334155", true: "#00FF88" }}
                thumbColor="#ffffff"
                onValueChange={setNotifications}
                value={notifications}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(252, 211, 77, 0.2)' }]}>
                  <Ionicons name="sync-outline" size={20} color="#FCD34D" />
                </View>
                <Text style={styles.settingText}>Auto Data Sync</Text>
              </View>
              <Switch
                trackColor={{ false: "#334155", true: "#00FF88" }}
                thumbColor="#ffffff"
                onValueChange={setDataSync}
                value={dataSync}
              />
            </View>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(216, 191, 216, 0.2)' }]}>
                  <Ionicons name="shield-checkmark-outline" size={20} color="#D8BFD8" />
                </View>
                <Text style={styles.settingText}>Privacy & Terms</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Settings Section 2 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(0, 255, 136, 0.2)' }]}>
                  <Ionicons name="people-outline" size={20} color="#00FF88" />
                </View>
                <Text style={styles.settingText}>Contact Agriculture Expert</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#64748b" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(96, 165, 250, 0.2)' }]}>
                  <Ionicons name="flag-outline" size={20} color="#60A5FA" />
                </View>
                <Text style={styles.settingText}>Report an Issue</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#64748b" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: 'rgba(252, 211, 77, 0.2)' }]}>
                  <Ionicons name="help-circle-outline" size={20} color="#FCD34D" />
                </View>
                <Text style={styles.settingText}>FAQ & Help Center</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* Data Export */}
          <TouchableOpacity style={styles.exportButton}>
            <View style={styles.exportIcon}>
              <Ionicons name="download-outline" size={20} color="#00FF88" />
            </View>
            <Text style={styles.exportText}>Export Farm Data</Text>
            <Ionicons name="chevron-forward" size={18} color="#64748b" />
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => setShowLogoutModal(true)}
          >
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          {/* App Version */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>UmuhinziHub v1.0.0</Text>
            <Text style={styles.copyright}>© 2024 - Transforming African Agriculture</Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <Ionicons name="log-out-outline" size={40} color="#EF4444" />
            </View>
            <Text style={styles.modalTitle}>Log Out</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to log out? Youll need to sign in again to use our services.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancel}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalConfirm}
                onPress={handleLogout}
              >
                <Text style={styles.modalConfirmText}>Yes, Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    top: "10%",
    right: "-10%",
    width: 150,
    height: 150,
    backgroundColor: "#00FF88",
    opacity: 0.1,
  },
  orb2: {
    bottom: "20%",
    left: "-10%",
    width: 200,
    height: 200,
    backgroundColor: "#60A5FA",
    opacity: 0.08,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "rgba(14, 20, 16, 0.95)",
  },
  backButton: {
    padding: 6,
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderRadius: 8,
  },
  screenTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  settingsButton: {
    padding: 6,
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderRadius: 8,
  },
  profileCard: {
    backgroundColor: "rgba(30, 38, 45, 0.95)",
    margin: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#00FF88",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#00FF88",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1E262D",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  profileLocation: {
    color: "#A7F3D0",
    fontSize: 14,
    marginLeft: 6,
  },
  memberSince: {
    color: "#64748b",
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    alignItems: "center",
    flex: 1,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  statLabel: {
    color: "#A7F3D0",
    fontSize: 12,
    textAlign: "center",
  },
  cropsSection: {
    marginTop: 10,
  },
  section: {
    backgroundColor: "rgba(30, 38, 45, 0.95)",
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cropsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  cropItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 255, 136, 0.05)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  cropIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  cropName: {
    color: "#A7F3D0",
    fontSize: 12,
    fontWeight: "500",
  },
  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.2)",
  },
  actionLabel: {
    color: "#A7F3D0",
    fontSize: 12,
    textAlign: "center",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingText: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    color: "#64748b",
    fontSize: 14,
    marginRight: 8,
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 255, 136, 0.05)",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  exportIcon: {
    marginRight: 12,
  },
  exportText: {
    color: "#00FF88",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
    gap: 8,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
  versionContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  versionText: {
    color: "#64748b",
    fontSize: 12,
    marginBottom: 4,
  },
  copyright: {
    color: "#64748b",
    fontSize: 10,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1E262D",
    borderRadius: 20,
    padding: 24,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  modalIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  modalMessage: {
    color: "#A7F3D0",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  modalCancel: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  modalCancelText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalConfirm: {
    flex: 1,
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  modalConfirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
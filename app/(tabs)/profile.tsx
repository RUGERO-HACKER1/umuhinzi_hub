import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [ubutumwa, setUbutumwa] = useState(true);
  const [amakuru, setAmakuru] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.screenTitle}>Profile</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* --- Header --- */}
          <View style={styles.header}>
            <Text style={styles.cardTitle}>Profile</Text>
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color="#ccc" />
            </TouchableOpacity>
          </View>

          {/* --- User Info --- */}
          <View style={styles.userInfo}>
            <View>
              <Image
                source={{
                  uri: "https://via.placeholder.com/80/EEEEEE/000000?text=JB",
                }} // Placeholder
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editIcon}>
                <Ionicons name="pencil" size={16} color="#0E1410" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>Jean Baptiste</Text>
            <Text style={styles.profileLocation}>
              Musanze, Amajyaruguru
            </Text>
            <Text style={styles.profileLocation}>
              <Ionicons name="location-sharp" size={12} color="#00FF88" />{" "}
              Rwanda
            </Text>
          </View>

          {/* --- Stats Card --- */}
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12.5</Text>
              <Text style={styles.statLabel}>Hekari</Text>
            </View>
            <View style={styles.statSeparator} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>Ibihingwa</Text>
            </View>
            <View style={styles.statSeparator} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Mar</Text>
              <Text style={styles.statLabel}>Umusaruro</Text>
            </View>
          </View>
          <Text style={styles.statsNote}>
            Ibihingwa bikomeye: Ibinyomoro, Ibirayi, Amakara
          </Text>

          {/* --- Settings Section 1 --- */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Igenamiterere</Text>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="language-outline" size={22} color="#ccc" />
              <Text style={styles.settingText}>Ururimi</Text>
              <Text style={styles.settingValue}>Kinyarwanda</Text>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </TouchableOpacity>
            <View style={styles.settingItem}>
              <Ionicons name="notifications-outline" size={22} color="#ccc" />
              <Text style={styles.settingText}>Ubutumwa</Text>
              <Switch
                trackColor={{ false: "#333", true: "#00FF88" }}
                thumbColor={ubutumwa ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={setUbutumwa}
                value={ubutumwa}
                style={{ marginLeft: "auto" }}
              />
            </View>
            <View style={styles.settingItem}>
              <Ionicons name="sync-outline" size={22} color="#ccc" />
              <Text style={styles.settingText}>Guhinduranya amakuru</Text>
              <Switch
                trackColor={{ false: "#333", true: "#00FF88" }}
                thumbColor={amakuru ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={setAmakuru}
                value={amakuru}
                style={{ marginLeft: "auto" }}
              />
            </View>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="shield-checkmark-outline" size={22} color="#ccc" />
              <Text style={styles.settingText}>Ubwoba & Amategeko</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#555"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
          </View>

          {/* --- Settings Section 2 --- */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Ubufasha</Text>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="people-outline" size={22} color="#ccc" />
              <Text style={styles.settingText}>
                Vugana numukozi wubujyanama
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#555"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="flag-outline" size={22} color="#ccc" />
              <Text style={styles.settingText}>Menyesha ikibazo</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#555"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="help-circle-outline" size={22} color="#ccc" />
              <Text style={styles.settingText}>Ibibazo bikunze kubazwa</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#555"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="log-out-outline" size={22} color="#EF4444" />
              <Text style={[styles.settingText, { color: "#EF4444" }]}>
                Sohoka
              </Text>
            </TouchableOpacity>
          </View>

          {/* --- Footer Button --- */}
          <TouchableOpacity style={styles.footerButton}>
            <Ionicons name="download-outline" size={20} color="#00FF88" />
            <Text style={styles.footerButtonText}>
              Kuraguza amakuru yubukonde
            </Text>
          </TouchableOpacity>
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
  screenTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    backgroundColor: "#191E2D", // Dark blue/purple card
    margin: 15,
    borderRadius: 20,
    padding: 15,
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
  userInfo: {
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2C3A4F",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
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
    borderColor: "#191E2D",
  },
  profileName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileLocation: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 2,
  },
  statsCard: {
    backgroundColor: "#2C3A4F",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
  statSeparator: {
    width: 1,
    backgroundColor: "#445",
  },
  statsNote: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
  settingsSection: {
    marginTop: 25,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#2C3A4F",
  },
  settingText: {
    color: "#ccc",
    fontSize: 15,
    marginLeft: 15,
  },
  settingValue: {
    color: "#888",
    fontSize: 14,
    marginLeft: "auto",
    marginRight: 10,
  },
  footerButton: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 255, 136, 0.15)",
    borderColor: "#00FF88",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 25,
  },
  footerButtonText: {
    color: "#00FF88",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 10,
  },
});
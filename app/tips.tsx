import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
  ImageBackground, // <-- FIX: Added ImageBackground here
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type Category = "All" | "Planting" | "Pest Control" | "Post-harvest";

export default function TipsAndGuidesScreen() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [prePlantingChecklist, setPrePlantingChecklist] = useState({
    phLevel: false,
    soilTest: false,
    cropRotation: false,
  });
  const [pestMonitoringChecklist, setPestMonitoringChecklist] = useState({
    dailyCheck: false,
    recordTypes: false,
    applyTreatment: false,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBar}>
        <Text style={styles.screenTitle}>Tips & Guides</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconWrapper}>
            <Ionicons name="volume-high-outline" size={24} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconWrapper}>
            <Ionicons name="information-circle-outline" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* --- Categories --- */}
        <View style={styles.categories}>
          {(["All", "Planting", "Pest Control", "Post-harvest"] as Category[]).map(
            (category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  activeCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => setActiveCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    activeCategory === category && styles.categoryButtonTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* --- Featured Guides --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="star" size={18} color="#FCD34D" /> Featured Guides
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <TouchableOpacity style={styles.featuredCard}>
              <Image
                source={{
                  uri: "https://via.placeholder.com/150/228B22/FFFFFF?text=Planting",
                }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>
                  Perfect Seed Spacing for Maize
                </Text>
                <Text style={styles.featuredDescription}>
                  Learn optimal seed density techniques for a higher yield.
                </Text>
                <View style={styles.featuredFooter}>
                  <Text style={styles.readTime}>
                    <Ionicons name="time-outline" size={12} color="#888" /> 5 min
                  </Text>
                  <Ionicons name="bookmark-outline" size={20} color="#ccc" />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredCard}>
              <Image
                source={{
                  uri: "https://via.placeholder.com/150/008000/FFFFFF?text=Soil",
                }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>
                  Nutrient-rich Soil Guide
                </Text>
                <Text style={styles.featuredDescription}>
                  Understand essential nutrients for healthy soil.
                </Text>
                <View style={styles.featuredFooter}>
                  <Text style={styles.readTime}>
                    <Ionicons name="time-outline" size={12} color="#888" /> 7 min
                  </Text>
                  <Ionicons name="bookmark-outline" size={20} color="#ccc" />
                </View>
              </View>
            </TouchableOpacity>
            {/* Add more featured cards here */}
          </ScrollView>
        </View>

        {/* --- Quick Guides --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="list" size={18} color="#00FF88" /> Quick Guides
          </Text>
          <TouchableOpacity style={styles.quickGuideItem}>
            <View style={styles.quickGuideIconWrapper}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#00FF88" />
            </View>
            <View style={styles.quickGuideTextContent}>
              <Text style={styles.quickGuideTitle}>Soil pH Testing Guide</Text>
              <Text style={styles.quickGuideMeta}>
                <Ionicons name="time-outline" size={12} color="#888" /> 3 min • Nov 4 • 430
              </Text>
            </View>
            <Ionicons name="bookmark-outline" size={20} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickGuideItem}>
            <View style={styles.quickGuideIconWrapperBlue}>
              <Ionicons name="water-outline" size={24} color="#60A5FA" />
            </View>
            <View style={styles.quickGuideTextContent}>
              <Text style={styles.quickGuideTitle}>Water Management Tips</Text>
              <Text style={styles.quickGuideMeta}>
                <Ionicons name="time-outline" size={12} color="#888" /> 8 min • Dec 1 • 290
              </Text>
            </View>
            <Ionicons name="bookmark-outline" size={20} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickGuideItem}>
            <View style={styles.quickGuideIconWrapperOrange}>
              <MaterialCommunityIcons name="grain" size={24} color="#FCD34D" />
            </View>
            <View style={styles.quickGuideTextContent}>
              <Text style={styles.quickGuideTitle}>Proper Grain Storage Methods</Text>
              <Text style={styles.quickGuideMeta}>
                <Ionicons name="time-outline" size={12} color="#888" /> 10 min • Jan 10 • 190
              </Text>
            </View>
            <Ionicons name="bookmark-outline" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* --- Video Tutorials --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="play-circle-outline" size={18} color="#00FF88" /> Video Tutorials
          </Text>
          <View style={styles.grid}>
            <TouchableOpacity style={styles.videoCard}>
              <ImageBackground
                source={{
                  uri: "https://via.placeholder.com/180x100/A9A9A9/000000?text=VIDEO",
                }}
                style={styles.videoThumbnail}
              >
                <Ionicons name="play-circle" size={40} color="#fff" />
                <Text style={styles.videoDuration}>2:40</Text>
              </ImageBackground>
              <Text style={styles.videoTitle}>Composting Basics</Text>
              <Text style={styles.videoDescription}>Build healthy soil.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.videoCard}>
              <ImageBackground
                source={{
                  uri: "https://via.placeholder.com/180x100/8FBC8F/000000?text=VIDEO",
                }}
                style={styles.videoThumbnail}
              >
                <Ionicons name="play-circle" size={40} color="#fff" />
                <Text style={styles.videoDuration}>1:28</Text>
              </ImageBackground>
              <Text style={styles.videoTitle}>Transplanting Tips</Text>
              <Text style={styles.videoDescription}>Ensuring healthy growth.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.videoCard}>
              <ImageBackground
                source={{
                  uri: "https://via.placeholder.com/180x100/B0C4DE/000000?text=VIDEO",
                }}
                style={styles.videoThumbnail}
              >
                <Ionicons name="play-circle" size={40} color="#fff" />
                <Text style={styles.videoDuration}>3:12</Text>
              </ImageBackground>
              <Text style={styles.videoTitle}>Irrigation Setup</Text>
              <Text style={styles.videoDescription}>Water efficiency.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.videoCard}>
              <ImageBackground
                source={{
                  uri: "https://via.placeholder.com/180x100/DDA0DD/000000?text=VIDEO",
                }}
                style={styles.videoThumbnail}
              >
                <Ionicons name="play-circle" size={40} color="#fff" />
                <Text style={styles.videoTitle}>Harvest Timing</Text>
              </ImageBackground>
              <Text style={styles.videoDescription}>Know when to pick.</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Checklist Templates --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="checkbox-outline" size={18} color="#00FF88" /> Checklist Templates
          </Text>

          {/* Pre-planting Checklist */}
          <View style={styles.checklistCard}>
            <View style={styles.checklistHeader}>
              <Text style={styles.checklistTitle}>Pre-planting Checklist:</Text>
              <TouchableOpacity>
                <Ionicons name="sync-outline" size={20} color="#ccc" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }}>
                <Ionicons name="bookmark-outline" size={20} color="#ccc" />
              </TouchableOpacity>
            </View>
            <View style={styles.checklistRow}>
              <Switch
                trackColor={{ false: "#333", true: "#00FF88" }}
                thumbColor={"#f4f3f4"}
                onValueChange={(value) =>
                  setPrePlantingChecklist({ ...prePlantingChecklist, phLevel: value })
                }
                value={prePlantingChecklist.phLevel}
                style={styles.checklistSwitch}
              />
              <Text style={styles.checklistText}>Test soil pH level</Text>
            </View>
            <View style={styles.checklistRow}>
              <Switch
                trackColor={{ false: "#333", true: "#00FF88" }}
                thumbColor={"#f4f3f4"}
                onValueChange={(value) =>
                  setPrePlantingChecklist({ ...prePlantingChecklist, soilTest: value })
                }
                value={prePlantingChecklist.soilTest}
                style={styles.checklistSwitch}
              />
              <Text style={styles.checklistText}>Prepare seedbed</Text>
            </View>
            <View style={styles.checklistRow}>
              <Switch
                trackColor={{ false: "#333", true: "#00FF88" }}
                thumbColor={"#f4f3f4"}
                onValueChange={(value) =>
                  setPrePlantingChecklist({ ...prePlantingChecklist, cropRotation: value })
                }
                value={prePlantingChecklist.cropRotation}
                style={styles.checklistSwitch}
              />
              <Text style={styles.checklistText}>Choose suitable crop / rotation</Text>
            </View>
            <Text style={styles.checklistProgress}>Completed: 1/3 completed</Text>
          </View>

          {/* Pest Monitoring Checklist */}
          <View style={styles.checklistCard}>
            <View style={styles.checklistHeader}>
              <Text style={styles.checklistTitle}>Pest Monitoring Steps</Text>
              <TouchableOpacity>
                <Ionicons name="sync-outline" size={20} color="#ccc" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 10 }}>
                <Ionicons name="bookmark-outline" size={20} color="#ccc" />
              </TouchableOpacity>
            </View>
            <View style={styles.checklistRow}>
              <Switch
                trackColor={{ false: "#333", true: "#00FF88" }}
                thumbColor={"#f4f3f4"}
                onValueChange={(value) =>
                  setPestMonitoringChecklist({ ...pestMonitoringChecklist, dailyCheck: value })
                }
                value={pestMonitoringChecklist.dailyCheck}
                style={styles.checklistSwitch}
              />
              <Text style={styles.checklistText}>Daily visual inspection</Text>
            </View>
            <View style={styles.checklistRow}>
              <Switch
                trackColor={{ false: "#333", true: "#00FF88" }}
                thumbColor={"#f4f3f4"}
                onValueChange={(value) =>
                  setPestMonitoringChecklist({ ...pestMonitoringChecklist, recordTypes: value })
                }
                value={pestMonitoringChecklist.recordTypes}
                style={styles.checklistSwitch}
              />
              <Text style={styles.checklistText}>Record pest types, found</Text>
            </View>
            <View style={styles.checklistRow}>
              <Switch
                trackColor={{ false: "#333", true: "#00FF88" }}
                thumbColor={"#f4f3f4"}
                onValueChange={(value) =>
                  setPestMonitoringChecklist({ ...pestMonitoringChecklist, applyTreatment: value })
                }
                value={pestMonitoringChecklist.applyTreatment}
                style={styles.checklistSwitch}
              />
              <Text style={styles.checklistText}>Apply treatment if needed</Text>
            </View>
            <Text style={styles.checklistProgress}>Completed: 1/3 completed</Text>
          </View>
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
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1E261E",
  },
  screenTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  headerIconWrapper: {
    marginLeft: 15,
  },
  container: {
    flexGrow: 1,
    padding: 15,
  },
  categories: {
    flexDirection: "row",
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#2C3A4F",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: "#00FF88",
  },
  categoryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  categoryButtonTextActive: {
    color: "#0E1410",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  horizontalScroll: {
    marginBottom: 10,
  },
  featuredCard: {
    backgroundColor: "#191E2D", // Darker blue card
    borderRadius: 12,
    width: 280, // Fixed width for horizontal scroll
    marginRight: 15,
    overflow: "hidden",
  },
  featuredImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  featuredContent: {
    padding: 15,
  },
  featuredTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  featuredDescription: {
    color: "#ccc",
    fontSize: 13,
    marginTop: 5,
  },
  featuredFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  readTime: {
    color: "#888",
    fontSize: 12,
  },
  // Quick Guides
  quickGuideItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#191E2D",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  quickGuideIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(0, 255, 136, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  quickGuideIconWrapperBlue: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(96, 165, 250, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  quickGuideIconWrapperOrange: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(252, 211, 77, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  quickGuideTextContent: {
    flex: 1,
    marginLeft: 15,
  },
  quickGuideTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quickGuideMeta: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },
  // Video Tutorials
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  videoCard: {
    width: "48%", // Roughly half with some space
    backgroundColor: "#191E2D",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  videoThumbnail: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  videoDuration: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  videoDescription: {
    color: "#ccc",
    fontSize: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  // Checklist Templates
  checklistCard: {
    backgroundColor: "#191E2D",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  checklistHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checklistTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checklistSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Make switch smaller
    marginRight: 5,
  },
  checklistText: {
    color: "#ccc",
    fontSize: 15,
  },
  checklistProgress: {
    color: "#888",
    fontSize: 12,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#2C3A4F",
    paddingTop: 10,
  },
});
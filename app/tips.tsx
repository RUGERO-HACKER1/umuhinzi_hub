import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
  ImageBackground,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type Category = "All" | "Planting" | "Pest Control" | "Post-harvest" | "Soil Care" | "Irrigation";

export default function TipsAndGuidesScreen() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [prePlantingChecklist, setPrePlantingChecklist] = useState({
    phLevel: false,
    soilTest: false,
    cropRotation: false,
    seedSelection: false,
  });
  const [pestMonitoringChecklist, setPestMonitoringChecklist] = useState({
    dailyCheck: false,
    recordTypes: false,
    applyTreatment: false,
    monitorTraps: false,
  });

  const toggleSaved = (id: string) => {
    const newSaved = new Set(savedItems);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSavedItems(newSaved);
  };

  const getCompletedCount = (checklist: any) => {
    return Object.values(checklist).filter(Boolean).length;
  };

  const getTotalCount = (checklist: any) => {
    return Object.keys(checklist).length;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBar}>
        <Text style={styles.screenTitle}>Tips & Guides</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconWrapper}>
            <Ionicons name="search-outline" size={24} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconWrapper}>
            <Ionicons name="bookmark" size={24} color="#00FF88" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* --- Stats Overview --- */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(0, 255, 136, 0.2)' }]}>
              <Ionicons name="library-outline" size={20} color="#00FF88" />
            </View>
            <View>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Total Guides</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(96, 165, 250, 0.2)' }]}>
              <Ionicons name="play-circle-outline" size={20} color="#60A5FA" />
            </View>
            <View>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Videos</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(252, 211, 77, 0.2)' }]}>
              <Ionicons name="checkmark-done-outline" size={20} color="#FCD34D" />
            </View>
            <View>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
        </View>

        {/* --- Categories --- */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          <View style={styles.categories}>
            {(["All", "Planting", "Pest Control", "Post-harvest", "Soil Care", "Irrigation"] as Category[]).map(
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
        </ScrollView>

        {/* --- Featured Guides --- */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="star" size={18} color="#FCD34D" /> Featured Guides
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <TouchableOpacity style={styles.featuredCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=300",
                }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredContent}>
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>Popular</Text>
                </View>
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
                  <TouchableOpacity onPress={() => toggleSaved("featured1")}>
                    <Ionicons 
                      name={savedItems.has("featured1") ? "bookmark" : "bookmark-outline"} 
                      size={20} 
                      color={savedItems.has("featured1") ? "#00FF88" : "#ccc"} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300",
                }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredContent}>
                <View style={[styles.featuredBadge, { backgroundColor: 'rgba(96, 165, 250, 0.2)' }]}>
                  <Text style={[styles.featuredBadgeText, { color: '#60A5FA' }]}>New</Text>
                </View>
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
                  <TouchableOpacity onPress={() => toggleSaved("featured2")}>
                    <Ionicons 
                      name={savedItems.has("featured2") ? "bookmark" : "bookmark-outline"} 
                      size={20} 
                      color={savedItems.has("featured2") ? "#00FF88" : "#ccc"} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredCard}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1591862715132-2cf1d8c7efdb?w=300",
                }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredContent}>
                <Text style={styles.featuredTitle}>
                  Organic Pest Control Methods
                </Text>
                <Text style={styles.featuredDescription}>
                  Natural ways to protect your crops from pests.
                </Text>
                <View style={styles.featuredFooter}>
                  <Text style={styles.readTime}>
                    <Ionicons name="time-outline" size={12} color="#888" /> 6 min
                  </Text>
                  <TouchableOpacity onPress={() => toggleSaved("featured3")}>
                    <Ionicons 
                      name={savedItems.has("featured3") ? "bookmark" : "bookmark-outline"} 
                      size={20} 
                      color={savedItems.has("featured3") ? "#00FF88" : "#ccc"} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* --- Quick Guides --- */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="flash" size={18} color="#00FF88" /> Quick Tips
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.quickGuideItem}>
            <View style={styles.quickGuideIconWrapper}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#00FF88" />
            </View>
            <View style={styles.quickGuideTextContent}>
              <Text style={styles.quickGuideTitle}>Soil pH Testing Guide</Text>
              <Text style={styles.quickGuideMeta}>
                <Ionicons name="time-outline" size={12} color="#888" /> 3 min • Nov 4 • 430 reads
              </Text>
            </View>
            <TouchableOpacity onPress={() => toggleSaved("quick1")}>
              <Ionicons 
                name={savedItems.has("quick1") ? "bookmark" : "bookmark-outline"} 
                size={20} 
                color={savedItems.has("quick1") ? "#00FF88" : "#ccc"} 
              />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickGuideItem}>
            <View style={styles.quickGuideIconWrapperBlue}>
              <Ionicons name="water-outline" size={24} color="#60A5FA" />
            </View>
            <View style={styles.quickGuideTextContent}>
              <Text style={styles.quickGuideTitle}>Water Management Tips</Text>
              <Text style={styles.quickGuideMeta}>
                <Ionicons name="time-outline" size={12} color="#888" /> 8 min • Dec 1 • 290 reads
              </Text>
            </View>
            <TouchableOpacity onPress={() => toggleSaved("quick2")}>
              <Ionicons 
                name={savedItems.has("quick2") ? "bookmark" : "bookmark-outline"} 
                size={20} 
                color={savedItems.has("quick2") ? "#00FF88" : "#ccc"} 
              />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickGuideItem}>
            <View style={styles.quickGuideIconWrapperOrange}>
              <MaterialCommunityIcons name="grain" size={24} color="#FCD34D" />
            </View>
            <View style={styles.quickGuideTextContent}>
              <Text style={styles.quickGuideTitle}>Proper Grain Storage Methods</Text>
              <Text style={styles.quickGuideMeta}>
                <Ionicons name="time-outline" size={12} color="#888" /> 10 min • Jan 10 • 190 reads
              </Text>
            </View>
            <TouchableOpacity onPress={() => toggleSaved("quick3")}>
              <Ionicons 
                name={savedItems.has("quick3") ? "bookmark" : "bookmark-outline"} 
                size={20} 
                color={savedItems.has("quick3") ? "#00FF88" : "#ccc"} 
              />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickGuideItem}>
            <View style={styles.quickGuideIconWrapperPurple}>
              <FontAwesome5 name="seedling" size={20} color="#D8BFD8" />
            </View>
            <View style={styles.quickGuideTextContent}>
              <Text style={styles.quickGuideTitle}>Seed Germination Techniques</Text>
              <Text style={styles.quickGuideMeta}>
                <Ionicons name="time-outline" size={12} color="#888" /> 4 min • Feb 15 • 320 reads
              </Text>
            </View>
            <TouchableOpacity onPress={() => toggleSaved("quick4")}>
              <Ionicons 
                name={savedItems.has("quick4") ? "bookmark" : "bookmark-outline"} 
                size={20} 
                color={savedItems.has("quick4") ? "#00FF88" : "#ccc"} 
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* --- Video Tutorials --- */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="play-circle" size={18} color="#00FF88" /> Video Tutorials
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.grid}>
            <TouchableOpacity style={styles.videoCard}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=200",
                }}
                style={styles.videoThumbnail}
              >
                <View style={styles.playButton}>
                  <Ionicons name="play-circle" size={40} color="#fff" />
                </View>
                <Text style={styles.videoDuration}>2:40</Text>
              </ImageBackground>
              <View style={styles.videoContent}>
                <Text style={styles.videoTitle}>Composting Basics</Text>
                <Text style={styles.videoDescription}>Build healthy soil with proper composting techniques</Text>
                <View style={styles.videoFooter}>
                  <Text style={styles.videoViews}>1.2K views</Text>
                  <TouchableOpacity onPress={() => toggleSaved("video1")}>
                    <Ionicons 
                      name={savedItems.has("video1") ? "bookmark" : "bookmark-outline"} 
                      size={16} 
                      color={savedItems.has("video1") ? "#00FF88" : "#ccc"} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.videoCard}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200",
                }}
                style={styles.videoThumbnail}
              >
                <View style={styles.playButton}>
                  <Ionicons name="play-circle" size={40} color="#fff" />
                </View>
                <Text style={styles.videoDuration}>1:28</Text>
              </ImageBackground>
              <View style={styles.videoContent}>
                <Text style={styles.videoTitle}>Transplanting Tips</Text>
                <Text style={styles.videoDescription}>Ensuring healthy growth during transplantation</Text>
                <View style={styles.videoFooter}>
                  <Text style={styles.videoViews}>890 views</Text>
                  <TouchableOpacity onPress={() => toggleSaved("video2")}>
                    <Ionicons 
                      name={savedItems.has("video2") ? "bookmark" : "bookmark-outline"} 
                      size={16} 
                      color={savedItems.has("video2") ? "#00FF88" : "#ccc"} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.videoCard}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1560493678-69f13e13c844?w=200",
                }}
                style={styles.videoThumbnail}
              >
                <View style={styles.playButton}>
                  <Ionicons name="play-circle" size={40} color="#fff" />
                </View>
                <Text style={styles.videoDuration}>3:12</Text>
              </ImageBackground>
              <View style={styles.videoContent}>
                <Text style={styles.videoTitle}>Irrigation Setup</Text>
                <Text style={styles.videoDescription}>Efficient water management for your farm</Text>
                <View style={styles.videoFooter}>
                  <Text style={styles.videoViews}>1.5K views</Text>
                  <TouchableOpacity onPress={() => toggleSaved("video3")}>
                    <Ionicons 
                      name={savedItems.has("video3") ? "bookmark" : "bookmark-outline"} 
                      size={16} 
                      color={savedItems.has("video3") ? "#00FF88" : "#ccc"} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.videoCard}>
              <ImageBackground
                source={{
                  uri: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=200",
                }}
                style={styles.videoThumbnail}
              >
                <View style={styles.playButton}>
                  <Ionicons name="play-circle" size={40} color="#fff" />
                </View>
                <Text style={styles.videoDuration}>3:45</Text>
              </ImageBackground>
              <View style={styles.videoContent}>
                <Text style={styles.videoTitle}>Harvest Timing</Text>
                <Text style={styles.videoDescription}>Know exactly when to pick for best quality</Text>
                <View style={styles.videoFooter}>
                  <Text style={styles.videoViews}>2.1K views</Text>
                  <TouchableOpacity onPress={() => toggleSaved("video4")}>
                    <Ionicons 
                      name={savedItems.has("video4") ? "bookmark" : "bookmark-outline"} 
                      size={16} 
                      color={savedItems.has("video4") ? "#00FF88" : "#ccc"} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Checklist Templates --- */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="checkbox" size={18} color="#00FF88" /> Farming Checklists
            </Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Pre-planting Checklist */}
          <View style={styles.checklistCard}>
            <View style={styles.checklistHeader}>
              <View style={styles.checklistTitleSection}>
                <MaterialCommunityIcons name="sprout" size={20} color="#00FF88" />
                <Text style={styles.checklistTitle}>Pre-planting Checklist</Text>
              </View>
              <View style={styles.checklistActions}>
                <TouchableOpacity style={styles.checklistAction}>
                  <Ionicons name="refresh-outline" size={18} color="#ccc" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.checklistAction}
                  onPress={() => toggleSaved("checklist1")}
                >
                  <Ionicons 
                    name={savedItems.has("checklist1") ? "bookmark" : "bookmark-outline"} 
                    size={18} 
                    color={savedItems.has("checklist1") ? "#00FF88" : "#ccc"} 
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.checklistProgress}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${(getCompletedCount(prePlantingChecklist) / getTotalCount(prePlantingChecklist)) * 100}%` 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.checklistProgressText}>
                {getCompletedCount(prePlantingChecklist)}/{getTotalCount(prePlantingChecklist)} completed
              </Text>
            </View>

            <View style={styles.checklistRow}>
              <Switch
                trackColor={{ false: "#333", true: "#00FF88" }}
                thumbColor={"#f4f3f4"}
                onValueChange={(value) =>
                  setPrePlantingChecklist({ ...prePlantingChecklist, phLevel: value })
                }
                value={prePlantingChecklist.phLevel}
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
              />
              <Text style={styles.checklistText}>Choose suitable crop rotation</Text>
            </View>
            <View style={styles.checklistRow}>
              <Switch
                trackColor={{ false: "#333", true: "#00FF88" }}
                thumbColor={"#f4f3f4"}
                onValueChange={(value) =>
                  setPrePlantingChecklist({ ...prePlantingChecklist, seedSelection: value })
                }
                value={prePlantingChecklist.seedSelection}
              />
              <Text style={styles.checklistText}>Select quality seeds</Text>
            </View>
          </View>

          {/* Pest Monitoring Checklist */}
          <View style={styles.checklistCard}>
            <View style={styles.checklistHeader}>
              <View style={styles.checklistTitleSection}>
                <MaterialCommunityIcons name="bug" size={20} color="#FF6B6B" />
                <Text style={styles.checklistTitle}>Pest Monitoring Steps</Text>
              </View>
              <View style={styles.checklistActions}>
                <TouchableOpacity style={styles.checklistAction}>
                  <Ionicons name="refresh-outline" size={18} color="#ccc" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.checklistAction}
                  onPress={() => toggleSaved("checklist2")}
                >
                  <Ionicons 
                    name={savedItems.has("checklist2") ? "bookmark" : "bookmark-outline"} 
                    size={18} 
                    color={savedItems.has("checklist2") ? "#00FF88" : "#ccc"} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.checklistProgress}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${(getCompletedCount(pestMonitoringChecklist) / getTotalCount(pestMonitoringChecklist)) * 100}%`,
                      backgroundColor: '#FF6B6B'
                    }
                  ]} 
                />
              </View>
              <Text style={styles.checklistProgressText}>
                {getCompletedCount(pestMonitoringChecklist)}/{getTotalCount(pestMonitoringChecklist)} completed
              </Text>
            </View>

            <View style={styles.checklistRow}>
              <Switch
                trackColor={{ false: "#333", true: "#FF6B6B" }}
                thumbColor={"#f4f3f4"}
                onValueChange={(value) =>
                  setPestMonitoringChecklist({ ...pestMonitoringChecklist, dailyCheck: value })
                }
                value={pestMonitoringChecklist.dailyCheck}
              />
              <Text style={styles.checklistText}>Daily visual inspection</Text>
            </View>
            <View style={styles.checklistRow}>
              <Switch
                trackColor={{ false: "#333", true: "#FF6B6B" }}
                thumbColor={"#f4f3f4"}
                onValueChange={(value) =>
                  setPestMonitoringChecklist({ ...pestMonitoringChecklist, recordTypes: value })
                }
                value={pestMonitoringChecklist.recordTypes}
              />
              <Text style={styles.checklistText}>Record pest types found</Text>
            </View>
            <View style={styles.checklistRow}>
              <Switch
                trackColor={{ false: "#333", true: "#FF6B6B" }}
                thumbColor={"#f4f3f4"}
                onValueChange={(value) =>
                  setPestMonitoringChecklist({ ...pestMonitoringChecklist, applyTreatment: value })
                }
                value={pestMonitoringChecklist.applyTreatment}
              />
              <Text style={styles.checklistText}>Apply treatment if needed</Text>
            </View>
            <View style={styles.checklistRow}>
              <Switch
                trackColor={{ false: "#333", true: "#FF6B6B" }}
                thumbColor={"#f4f3f4"}
                onValueChange={(value) =>
                  setPestMonitoringChecklist({ ...pestMonitoringChecklist, monitorTraps: value })
                }
                value={pestMonitoringChecklist.monitorTraps}
              />
              <Text style={styles.checklistText}>Monitor pest traps</Text>
            </View>
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
    padding: 20,
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
    gap: 15,
  },
  headerIconWrapper: {
    padding: 4,
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  // Stats
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1E261E",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  statLabel: {
    color: "#aaa",
    fontSize: 12,
    textAlign: "center",
  },
  // Categories
  categoriesScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  categories: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 25,
  },
  categoryButton: {
    backgroundColor: "#1E261E",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#2D4A3A",
  },
  categoryButtonActive: {
    backgroundColor: "#00FF88",
    borderColor: "#00FF88",
  },
  categoryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: "#0E1410",
    fontWeight: "700",
  },
  // Sections
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  seeAllText: {
    color: "#00FF88",
    fontSize: 14,
    fontWeight: "600",
  },
  horizontalScroll: {
    marginBottom: 10,
  },
  // Featured Guides
  featuredCard: {
    backgroundColor: "#1E261E",
    borderRadius: 16,
    width: 280,
    marginRight: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2D4A3A",
  },
  featuredImage: {
    width: "100%",
    height: 140,
  },
  featuredContent: {
    padding: 16,
  },
  featuredBadge: {
    backgroundColor: "rgba(252, 211, 77, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  featuredBadgeText: {
    color: "#FCD34D",
    fontSize: 10,
    fontWeight: "600",
  },
  featuredTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  featuredDescription: {
    color: "#aaa",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  featuredFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  readTime: {
    color: "#888",
    fontSize: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  // Quick Guides
  quickGuideItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E261E",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2D4A3A",
  },
  quickGuideIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(0, 255, 136, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  quickGuideIconWrapperBlue: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(96, 165, 250, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  quickGuideIconWrapperOrange: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(252, 211, 77, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  quickGuideIconWrapperPurple: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(216, 191, 216, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  quickGuideTextContent: {
    flex: 1,
    marginLeft: 16,
  },
  quickGuideTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  quickGuideMeta: {
    color: "#888",
    fontSize: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  // Video Tutorials
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  videoCard: {
    width: "48%",
    backgroundColor: "#1E261E",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2D4A3A",
  },
  videoThumbnail: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  videoDuration: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
    fontSize: 11,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoContent: {
    padding: 12,
  },
  videoTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  videoDescription: {
    color: "#aaa",
    fontSize: 11,
    lineHeight: 14,
    marginBottom: 8,
  },
  videoFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  videoViews: {
    color: "#888",
    fontSize: 10,
  },
  // Checklist Templates
  checklistCard: {
    backgroundColor: "#1E261E",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#2D4A3A",
  },
  checklistHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  checklistTitleSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  checklistTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  checklistActions: {
    flexDirection: "row",
    gap: 8,
  },
  checklistAction: {
    padding: 4,
  },
  checklistProgress: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#2D4A3A",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00FF88",
    borderRadius: 3,
  },
  checklistProgressText: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  checklistText: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
  },
});
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  Modal,
  TextInput,
  Alert
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const { width: screenWidth } = Dimensions.get('window');

export default function CropsScreen() {
  const [showAddCropModal, setShowAddCropModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cropsData, setCropsData] = useState([
    {
      id: 1,
      name: "Tomatoes",
      type: "Vegetable",
      plantedDate: "March 15, 2024",
      growthStage: "Flowering",
      health: "healthy",
      nextAction: "Fertilize in 3 days",
      actionIcon: "clock-time-three-outline",
      actionColor: "#FCD34D",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&h=150&fit=crop",
      progress: 65,
      area: "0.5 Ha",
      yield: "Expected: 2.5 tons"
    },
    {
      id: 2,
      name: "Maize",
      type: "Cereal",
      plantedDate: "February 28, 2024",
      growthStage: "Vegetative",
      health: "watch",
      nextAction: "Water tomorrow",
      actionIcon: "water-outline",
      actionColor: "#60A5FA",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=150&h=150&fit=crop",
      progress: 45,
      area: "2.0 Ha",
      yield: "Expected: 8 tons"
    }
  ]);

  // Add Crop Form State
  const [newCrop, setNewCrop] = useState({
    name: "",
    type: "Vegetable",
    plantedDate: new Date().toISOString().split('T')[0],
    area: "",
    expectedYield: "",
    growthStage: "Seedling",
    notes: ""
  });

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

  const cropTypes = [
    { name: "All Crops", count: cropsData.length, icon: "sprout" },
    { name: "Vegetables", count: cropsData.filter(c => c.type === "Vegetable").length, icon: "carrot" },
    { name: "Cereals", count: cropsData.filter(c => c.type === "Cereal").length, icon: "wheat" },
    { name: "Legumes", count: cropsData.filter(c => c.type === "Legume").length, icon: "seed" },
  ];

  const cropOptions = [
    { name: "Tomatoes", type: "Vegetable", icon: "food-apple", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&h=150&fit=crop" },
    { name: "Maize", type: "Cereal", icon: "corn", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=150&h=150&fit=crop" },
    { name: "Green Beans", type: "Legume", icon: "seed", image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=150&h=150&fit=crop" },
    { name: "Cabbage", type: "Vegetable", icon: "leaf", image: "https://images.unsplash.com/photo-1620236067876-4e48eb9c4f27?w=150&h=150&fit=crop" },
    { name: "Potatoes", type: "Vegetable", icon: "food-variant", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&fit=crop" },
    { name: "Rice", type: "Cereal", icon: "rice", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop" },
  ];

  const growthStages = [
    { value: "Seedling", label: "Seedling Stage", progress: 25 },
    { value: "Vegetative", label: "Vegetative Stage", progress: 50 },
    { value: "Flowering", label: "Flowering Stage", progress: 75 },
    { value: "Fruiting", label: "Fruiting Stage", progress: 90 },
    { value: "Harvest", label: "Ready for Harvest", progress: 100 },
  ];

  const getStatusColor = (health) => {
    switch (health) {
      case 'healthy': return '#00FF88';
      case 'watch': return '#FCD34D';
      case 'alert': return '#EF4444';
      default: return '#64748b';
    }
  };

  const getStatusBackground = (health) => {
    switch (health) {
      case 'healthy': return 'rgba(0, 255, 136, 0.1)';
      case 'watch': return 'rgba(252, 211, 77, 0.1)';
      case 'alert': return 'rgba(239, 68, 68, 0.1)';
      default: return 'rgba(100, 116, 139, 0.1)';
    }
  };

  const handleInputChange = (field, value) => {
    setNewCrop(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectCrop = (crop) => {
    setNewCrop(prev => ({
      ...prev,
      name: crop.name,
      type: crop.type
    }));
  };

  const handleAddCrop = () => {
    // Validation
    if (!newCrop.name || !newCrop.area) {
      Alert.alert("Missing Information", "Please fill in crop name and area.");
      return;
    }

    const newCropData = {
      id: Date.now(),
      name: newCrop.name,
      type: newCrop.type,
      plantedDate: new Date(newCrop.plantedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      growthStage: newCrop.growthStage,
      health: "healthy",
      nextAction: "Monitor growth daily",
      actionIcon: "eye-outline",
      actionColor: "#00FF88",
      image: cropOptions.find(c => c.name === newCrop.name)?.image || "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=150&h=150&fit=crop",
      progress: growthStages.find(s => s.value === newCrop.growthStage)?.progress || 25,
      area: `${newCrop.area} Ha`,
      yield: newCrop.expectedYield ? `Expected: ${newCrop.expectedYield} tons` : "Yield not estimated"
    };

    setCropsData(prev => [newCropData, ...prev]);
    
    // Reset form
    setNewCrop({
      name: "",
      type: "Vegetable",
      plantedDate: new Date().toISOString().split('T')[0],
      area: "",
      expectedYield: "",
      growthStage: "Seedling",
      notes: ""
    });
    
    setShowAddCropModal(false);
    
    Alert.alert(
      "Crop Added Successfully!",
      `${newCropData.name} has been added to your farm.`,
      [{ text: "OK" }]
    );
  };

  const filteredCrops = cropsData.filter(crop => 
    crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Text style={styles.screenTitle}>My Crops</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <Ionicons name="filter-outline" size={22} color="#00FF88" />
            </TouchableOpacity>
          </View>

          {/* Stats Overview */}
          <View style={styles.statsOverview}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{cropsData.length}</Text>
              <Text style={styles.statLabel}>Active Crops</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {cropsData.reduce((total, crop) => total + parseFloat(crop.area), 0).toFixed(1)}
              </Text>
              <Text style={styles.statLabel}>Hectares</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Math.round((cropsData.filter(c => c.health === 'healthy').length / cropsData.length) * 100)}%
              </Text>
              <Text style={styles.statLabel}>Healthy</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search-outline" size={20} color="#64748b" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search crops..."
                placeholderTextColor="#64748b"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Ionicons name="close-circle" size={20} color="#64748b" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Crop Type Filters */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.cropTypesScroll}
            contentContainerStyle={styles.cropTypesContent}
          >
            {cropTypes.map((type, index) => (
              <TouchableOpacity key={index} style={styles.cropTypeButton}>
                <View style={styles.cropTypeIcon}>
                  <MaterialCommunityIcons name={type.icon} size={20} color="#00FF88" />
                </View>
                <Text style={styles.cropTypeName}>{type.name}</Text>
                <Text style={styles.cropTypeCount}>{type.count}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Crops List */}
          <View style={styles.cropsSection}>
            <Text style={styles.sectionTitle}>Your Crops</Text>
            <Text style={styles.sectionSubtitle}>
              {filteredCrops.length} crop{filteredCrops.length !== 1 ? 's' : ''} found
            </Text>

            {filteredCrops.map((crop) => (
              <TouchableOpacity 
                key={crop.id} 
                style={styles.cropCard}
                onPress={() => setSelectedCrop(crop)}
              >
                <View style={styles.cropHeader}>
                  <Image source={{ uri: crop.image }} style={styles.cropImage} />
                  <View style={styles.cropInfo}>
                    <View style={styles.cropTitleRow}>
                      <Text style={styles.cropName}>{crop.name}</Text>
                      <View style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusBackground(crop.health) }
                      ]}>
                        <View style={[
                          styles.statusDot,
                          { backgroundColor: getStatusColor(crop.health) }
                        ]} />
                        <Text style={[
                          styles.statusText,
                          { color: getStatusColor(crop.health) }
                        ]}>
                          {crop.health.charAt(0).toUpperCase() + crop.health.slice(1)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.cropType}>{crop.type}</Text>
                    <Text style={styles.cropDate}>Planted: {crop.plantedDate}</Text>
                  </View>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Growth Progress</Text>
                    <Text style={styles.progressPercentage}>{crop.progress}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { 
                          width: `${crop.progress}%`,
                          backgroundColor: getStatusColor(crop.health)
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.growthStage}>{crop.growthStage} Stage</Text>
                </View>

                {/* Crop Details */}
                <View style={styles.cropDetails}>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="map-marker" size={16} color="#64748b" />
                    <Text style={styles.detailText}>{crop.area}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialCommunityIcons name="basket" size={16} color="#64748b" />
                    <Text style={styles.detailText}>{crop.yield}</Text>
                  </View>
                </View>

                {/* Action Required */}
                <View style={[
                  styles.actionBox,
                  crop.health === 'alert' && styles.actionBoxAlert
                ]}>
                  <MaterialCommunityIcons 
                    name={crop.actionIcon} 
                    size={20} 
                    color={crop.actionColor} 
                  />
                  <Text style={styles.actionText}>{crop.nextAction}</Text>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={[
                      styles.actionButtonText,
                      { color: crop.actionColor }
                    ]}>
                      View
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color={crop.actionColor} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Empty State */}
          {filteredCrops.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="sprout-outline" size={64} color="#334155" />
              <Text style={styles.emptyStateTitle}>No crops found</Text>
              <Text style={styles.emptyStateText}>
                {searchQuery ? 'Try a different search term' : 'Start by adding your first crop'}
              </Text>
              <TouchableOpacity 
                style={styles.emptyStateButton}
                onPress={() => setShowAddCropModal(true)}
              >
                <Ionicons name="add" size={20} color="#0E1410" />
                <Text style={styles.emptyStateButtonText}>Add Your First Crop</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowAddCropModal(true)}
      >
        <Ionicons name="add" size={28} color="#0E1410" />
      </TouchableOpacity>

      {/* Add Crop Modal */}
      <Modal
        visible={showAddCropModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Crop</Text>
              <TouchableOpacity onPress={() => setShowAddCropModal(false)}>
                <Ionicons name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalDescription}>
                Track your crops and get personalized farming advice
              </Text>

              {/* Crop Selection */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Select Crop Type</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.cropOptionsScroll}
                >
                  {cropOptions.map((crop, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.cropOption,
                        newCrop.name === crop.name && styles.cropOptionSelected
                      ]}
                      onPress={() => handleSelectCrop(crop)}
                    >
                      <Image source={{ uri: crop.image }} style={styles.cropOptionImage} />
                      <Text style={[
                        styles.cropOptionText,
                        newCrop.name === crop.name && styles.cropOptionTextSelected
                      ]}>
                        {crop.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Custom Crop Input */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Or Enter Custom Crop</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="leaf-outline" size={20} color="#00FF88" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter crop name"
                    placeholderTextColor="#64748b"
                    value={newCrop.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                  />
                </View>
              </View>

              {/* Crop Type */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Crop Category</Text>
                <View style={styles.typeSelector}>
                  {["Vegetable", "Cereal", "Legume", "Fruit", "Other"].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeOption,
                        newCrop.type === type && styles.typeOptionSelected
                      ]}
                      onPress={() => handleInputChange('type', type)}
                    >
                      <Text style={[
                        styles.typeOptionText,
                        newCrop.type === type && styles.typeOptionTextSelected
                      ]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Planting Date */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Planting Date</Text>
                <View style={styles.inputContainer}>
                  <Ionicons name="calendar-outline" size={20} color="#00FF88" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#64748b"
                    value={newCrop.plantedDate}
                    onChangeText={(value) => handleInputChange('plantedDate', value)}
                  />
                </View>
              </View>

              {/* Area */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Area (Hectares)</Text>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="map-marker" size={20} color="#00FF88" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter area in hectares"
                    placeholderTextColor="#64748b"
                    value={newCrop.area}
                    onChangeText={(value) => handleInputChange('area', value)}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Growth Stage */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Current Growth Stage</Text>
                <View style={styles.stageSelector}>
                  {growthStages.map((stage) => (
                    <TouchableOpacity
                      key={stage.value}
                      style={[
                        styles.stageOption,
                        newCrop.growthStage === stage.value && styles.stageOptionSelected
                      ]}
                      onPress={() => handleInputChange('growthStage', stage.value)}
                    >
                      <Text style={[
                        styles.stageOptionText,
                        newCrop.growthStage === stage.value && styles.stageOptionTextSelected
                      ]}>
                        {stage.label}
                      </Text>
                      <Text style={styles.stageProgress}>{stage.progress}%</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Expected Yield */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Expected Yield (tons) - Optional</Text>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="basket" size={20} color="#00FF88" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter expected yield"
                    placeholderTextColor="#64748b"
                    value={newCrop.expectedYield}
                    onChangeText={(value) => handleInputChange('expectedYield', value)}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Notes */}
              <View style={styles.formSection}>
                <Text style={styles.formLabel}>Notes - Optional</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput
                    style={styles.textArea}
                    placeholder="Any additional notes about this crop..."
                    placeholderTextColor="#64748b"
                    value={newCrop.notes}
                    onChangeText={(value) => handleInputChange('notes', value)}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.modalCancel}
                onPress={() => setShowAddCropModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalConfirm}
                onPress={handleAddCrop}
              >
                <Text style={styles.modalConfirmText}>Add Crop</Text>
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
  statsOverview: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 255, 136, 0.05)",
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    color: "#00FF88",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    color: "#A7F3D0",
    fontSize: 12,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(0, 255, 136, 0.3)",
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E261E",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#2D4A3A",
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
    marginRight: 12,
  },
  cropTypesScroll: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cropTypesContent: {
    paddingRight: 20,
    gap: 12,
  },
  cropTypeButton: {
    backgroundColor: "rgba(30, 38, 45, 0.95)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    minWidth: 100,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  cropTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cropTypeName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  cropTypeCount: {
    color: "#00FF88",
    fontSize: 12,
    fontWeight: "bold",
  },
  cropsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: "#A7F3D0",
    fontSize: 14,
    marginBottom: 16,
  },
  cropCard: {
    backgroundColor: "rgba(30, 38, 45, 0.95)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  cropHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  cropImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  cropInfo: {
    flex: 1,
  },
  cropTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  cropName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  cropType: {
    color: "#00FF88",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  cropDate: {
    color: "#A7F3D0",
    fontSize: 12,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    color: "#A7F3D0",
    fontSize: 14,
  },
  progressPercentage: {
    color: "#00FF88",
    fontSize: 14,
    fontWeight: "bold",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#334155",
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  growthStage: {
    color: "#A7F3D0",
    fontSize: 12,
  },
  cropDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    color: "#64748b",
    fontSize: 12,
    marginLeft: 6,
  },
  actionBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 255, 136, 0.05)",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  actionBoxAlert: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  actionText: {
    color: "#A7F3D0",
    fontSize: 14,
    flex: 1,
    marginLeft: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
  emptyState: {
    alignItems: "center",
    padding: 40,
    marginTop: 40,
  },
  emptyStateTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: "#A7F3D0",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  emptyStateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00FF88",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  emptyStateButtonText: {
    color: "#0E1410",
    fontSize: 16,
    fontWeight: "bold",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#1E262D",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalBody: {
    padding: 20,
  },
  modalDescription: {
    color: "#A7F3D0",
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  formSection: {
    marginBottom: 24,
  },
  formLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  cropOptionsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  cropOption: {
    alignItems: "center",
    marginRight: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    minWidth: 80,
  },
  cropOptionSelected: {
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderColor: "#00FF88",
  },
  cropOptionImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 8,
  },
  cropOptionText: {
    color: "#A7F3D0",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  cropOptionTextSelected: {
    color: "#00FF88",
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  typeSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  typeOption: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  typeOptionSelected: {
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderColor: "#00FF88",
  },
  typeOptionText: {
    color: "#A7F3D0",
    fontSize: 14,
    fontWeight: "500",
  },
  typeOptionTextSelected: {
    color: "#00FF88",
    fontWeight: "bold",
  },
  stageSelector: {
    gap: 8,
  },
  stageOption: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stageOptionSelected: {
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderColor: "#00FF88",
  },
  stageOptionText: {
    color: "#A7F3D0",
    fontSize: 14,
    fontWeight: "500",
  },
  stageOptionTextSelected: {
    color: "#00FF88",
    fontWeight: "bold",
  },
  stageProgress: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
  },
  textAreaContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
  },
  textArea: {
    color: "#fff",
    fontSize: 16,
    minHeight: 100,
  },
  modalFooter: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    gap: 12,
  },
  modalCancel: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 14,
    borderRadius: 12,
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
    backgroundColor: "#00FF88",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  modalConfirmText: {
    color: "#0E1410",
    fontSize: 16,
    fontWeight: "bold",
  },
});
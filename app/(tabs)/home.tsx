import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface Crop {
  id: string;
  name: string;
  stage: string;
  nextAction: string;
  actionType: 'water' | 'fertilize' | 'harvest' | 'spray';
  daysLeft: number;
}

interface MarketPrice {
  id: string;
  name: string;
  price: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    condition: 'sunny',
    rainChance: 20,
    humidity: 65,
    wind: 8,
    advice: 'Good for spraying',
    details: 'low wind, dry conditions'
  });

  // Sample data
  const crops: Crop[] = [
    {
      id: '1',
      name: 'Maize',
      stage: 'Flowering stage',
      nextAction: 'Water',
      actionType: 'water',
      daysLeft: 2
    },
    {
      id: '2',
      name: 'Beans',
      stage: 'Vegetative stage',
      nextAction: 'Fertilize',
      actionType: 'fertilize',
      daysLeft: 1
    },
    {
      id: '3',
      name: 'Coffee',
      stage: 'Fruiting stage',
      nextAction: 'Spray',
      actionType: 'spray',
      daysLeft: 3
    }
  ];

  const marketPrices: MarketPrice[] = [
    { id: '1', name: 'Maize (per kg)', price: 'UGX 2,500', trend: 'up', change: '+5%' },
    { id: '2', name: 'Beans (per kg)', price: 'UGX 4,200', trend: 'down', change: '-2%' },
    { id: '3', name: 'Coffee (per kg)', price: 'UGX 8,600', trend: 'stable', change: '0%' }
  ];

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setWeatherData(prev => ({
        ...prev,
        temperature: 26 + Math.floor(Math.random() * 5),
        rainChance: 10 + Math.floor(Math.random() * 30)
      }));
      setRefreshing(false);
      Alert.alert('Updated', 'Farm data refreshed!');
    }, 1500);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'water': return '💧';
      case 'fertilize': return '🌱';
      case 'spray': return '🧪';
      case 'harvest': return '⛏️';
      default: return '📅';
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'water': return '#60A5FA';
      case 'fertilize': return '#FCD34D';
      case 'spray': return '#00FF88';
      case 'harvest': return '#F87171';
      default: return '#ccc';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#00FF88';
      case 'down': return '#F87171';
      case 'stable': return '#FCD34D';
      default: return '#ccc';
    }
  };

  const handleQuickAddCrop = () => {
    Alert.alert(
      'Quick Add Crop',
      'What would you like to add?',
      [
        { text: 'New Crop', onPress: () => router.push('/crops/new') },
        { text: 'From Template', onPress: () => router.push('/crops/templates') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleFABPress = () => {
    Alert.alert(
      'Quick Actions',
      'What would you like to do?',
      [
        { text: 'Add Crop', onPress: () => router.push('/crops/new') },
        { text: 'Record Activity', onPress: () => router.push('/activities/new') },
        { text: 'Scan Plant', onPress: () => router.push('/scan') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* --- Header Bar --- */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIconCircle}>
            <Ionicons name="person" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        
        <View style={styles.headerTextContainer}>
          <Text style={styles.greetingText}>{getGreeting()},</Text>
          <Text style={styles.welcomeText}>
            <Text style={styles.userName}>Samuel</Text> 👋
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => router.push('/notifications')}
        >
          <Ionicons name="notifications-outline" size={26} color="#fff" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#00FF88']}
            tintColor="#00FF88"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* --- Stats Overview --- */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Active Crops</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Due Today</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Healthy</Text>
          </View>
        </View>

        {/* --- Ready to Grow Card --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ready to grow today? 🌱</Text>
          <Text style={styles.cardSubtitle}>
            Check your crops and stay ahead of the season with smart farming
          </Text>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleQuickAddCrop}
          >
            <Ionicons name="add-circle" size={20} color="#0E1410" />
            <Text style={styles.primaryButtonText}>Quick Add Crop</Text>
          </TouchableOpacity>
        </View>

        {/* --- My Crops Card --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>My Crops</Text>
            <Link href="/crops" asChild>
              <TouchableOpacity>
                <Text style={styles.viewAllLink}>View All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          {crops.map((crop) => (
            <TouchableOpacity 
              key={crop.id}
              style={styles.cropItem}
              onPress={() => router.push(`/crops/${crop.id}`)}
            >
              <View style={styles.cropInfo}>
                <Text style={styles.cropName}>{crop.name}</Text>
                <Text style={styles.cropStage}>{crop.stage}</Text>
              </View>
              <View style={styles.cropAction}>
                <Text style={[styles.cropActionText, { color: getActionColor(crop.actionType) }]}>
                  {getActionIcon(crop.actionType)} {crop.nextAction} in {crop.daysLeft} day{crop.daysLeft !== 1 ? 's' : ''}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- Weather Card --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Weather Today</Text>
            <Link href="/weather" asChild>
              <TouchableOpacity>
                <Text style={styles.viewAllLink}>Full forecast</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.weatherBody}>
            <Ionicons name="sunny" size={44} color="#FACC15" />
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherTemp}>{weatherData.temperature}°C</Text>
              <Text style={styles.weatherRain}>{weatherData.rainChance}% rain chance</Text>
            </View>
            <View style={styles.weatherDetails}>
              <View style={styles.weatherDetailItem}>
                <Ionicons name="water-outline" size={16} color="#60A5FA" />
                <Text style={styles.weatherDetailText}>{weatherData.humidity}%</Text>
              </View>
              <View style={styles.weatherDetailItem}>
                <Ionicons name="speedometer-outline" size={16} color="#00FF88" />
                <Text style={styles.weatherDetailText}>{weatherData.wind} km/h</Text>
              </View>
            </View>
          </View>
          <View style={styles.weatherAdvice}>
            <Ionicons name="checkmark-circle" size={16} color="#00FF88" />
            <Text style={styles.weatherGood}>{weatherData.advice}</Text>
            <Text style={styles.weatherDetailsText}>{weatherData.details}</Text>
          </View>
        </View>

        {/* --- Market Prices Card --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Market Prices</Text>
            <Link href="/market" asChild>
              <TouchableOpacity>
                <Text style={styles.viewAllLink}>More prices</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          {marketPrices.map((item) => (
            <View key={item.id} style={styles.priceItem}>
              <View style={styles.priceInfo}>
                <Text style={styles.priceName}>{item.name}</Text>
                <Text style={[styles.priceTrend, { color: getTrendColor(item.trend) }]}>
                  {getTrendIcon(item.trend)} {item.change}
                </Text>
              </View>
              <Text style={styles.priceValue}>{item.price}</Text>
            </View>
          ))}
        </View>

        {/* --- Quick Actions --- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => router.push('/scan')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(0, 255, 136, 0.2)' }]}>
                <Ionicons name="camera" size={24} color="#00FF88" />
              </View>
              <Text style={styles.quickActionText}>Scan Plant</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => router.push('/pests')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(248, 113, 113, 0.2)' }]}>
                <FontAwesome5 name="bug" size={20} color="#F87171" />
              </View>
              <Text style={styles.quickActionText}>Pest Control</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => router.push('/calendar')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(96, 165, 250, 0.2)' }]}>
                <Ionicons name="calendar" size={24} color="#60A5FA" />
              </View>
              <Text style={styles.quickActionText}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => router.push('/resources')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(252, 211, 77, 0.2)' }]}>
                <Ionicons name="book" size={24} color="#FCD34D" />
              </View>
              <Text style={styles.quickActionText}>Resources</Text>
            </TouchableOpacity>
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
                Get instant help with pests, diseases, and farming advice
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.primaryButton, { marginTop: 15 }]}
            onPress={() => router.push('/chat')}
          >
            <Ionicons name="chatbubble-ellipses" size={20} color="#0E1410" />
            <Text style={styles.primaryButtonText}>Chat Now</Text>
          </TouchableOpacity>
        </View>

        {/* --- Disease Alert Card --- */}
        <TouchableOpacity 
          style={styles.alertCard}
          onPress={() => router.push('/alerts')}
        >
          <Ionicons name="warning" size={24} color="#F87171" />
          <View style={styles.alertInfo}>
            <Text style={styles.alertTitle}>Disease Alert</Text>
            <Text style={styles.alertText}>
              Leaf rust detected in your area. Check maize crops for yellow spots.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#F87171" />
        </TouchableOpacity>
      </ScrollView>

      {/* --- Floating Action Button (FAB) --- */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={handleFABPress}
      >
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1E3A2E",
  },
  profileButton: {
    // Profile button styling
  },
  profileIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 255, 136, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  greetingText: {
    color: "#888",
    fontSize: 14,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 18,
  },
  userName: {
    fontWeight: "bold",
    color: "#00FF88",
  },
  notificationButton: {
    position: "relative",
    padding: 5,
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#EF4444",
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
    paddingBottom: 100,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#1E3A2E",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    marginTop: 10,
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
    color: "#aaa",
    fontSize: 12,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#2D4A3A",
    marginHorizontal: 10,
  },
  card: {
    backgroundColor: "#1E261E",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#00FF88",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  viewAllLink: {
    color: "#00FF88",
    fontWeight: "600",
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: "#00FF88",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#00FF88",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#0E1410",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  // Crop Styles
  cropItem: {
    backgroundColor: "#2C2B3E",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cropStage: {
    color: "#ccc",
    fontSize: 14,
  },
  cropAction: {
    alignItems: "flex-end",
  },
  cropActionText: {
    fontWeight: "bold",
    fontSize: 13,
  },
  // Weather Styles
  weatherBody: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  weatherInfo: {
    marginLeft: 15,
    flex: 1,
  },
  weatherTemp: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  weatherRain: {
    color: "#aaa",
    fontSize: 14,
  },
  weatherDetails: {
    flexDirection: "row",
    gap: 15,
  },
  weatherDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  weatherDetailText: {
    color: "#ccc",
    fontSize: 12,
  },
  weatherAdvice: {
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#00FF88",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  weatherGood: {
    color: "#00FF88",
    fontWeight: "600",
    fontSize: 14,
    flex: 1,
  },
  weatherDetailsText: {
    color: "#aaa",
    fontSize: 12,
  },
  // Market Prices Styles
  priceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2D4A3A",
  },
  priceInfo: {
    flex: 1,
  },
  priceName: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 4,
  },
  priceTrend: {
    fontSize: 12,
    fontWeight: "600",
  },
  priceValue: {
    color: "#00FF88",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Quick Actions
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  quickAction: {
    width: '48%',
    alignItems: "center",
    padding: 15,
    backgroundColor: "#2C2B3E",
    borderRadius: 12,
    marginBottom: 10,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  // AI Assistant Styles
  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  aiIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 255, 136, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  aiSubtitle: {
    color: "#aaa",
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  // Alert Styles
  alertCard: {
    backgroundColor: "rgba(220, 38, 38, 0.15)",
    borderColor: "#DC2626",
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
    marginRight: 10,
  },
  alertTitle: {
    color: "#F87171",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  alertText: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 18,
  },
  // FAB
  fab: {
    position: "absolute",
    bottom: 90,
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
    shadowOffset: { width: 0, height: 4 },
  },
});
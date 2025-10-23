import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type Filter = "All" | "Grains" | "Vegetables" | "Fruits";

// Mock data for the list
const marketData = [
  {
    icon: "corn",
    name: "Maize",
    unit: "RWF/kg",
    price: 850,
    change: 5.2,
    trend: "up",
    color: "#FCD34D",
  },
  {
    icon: "rice",
    name: "Rice",
    unit: "RWF/kg",
    price: 1200,
    change: -1.8,
    trend: "down",
    color: "#F3B490",
  },
  {
    icon: "seed",
    name: "Beans",
    unit: "RWF/kg",
    price: 950,
    change: 3.1,
    trend: "up",
    color: "#E57373",
  },
  {
    icon: "food-apple",
    name: "Tomatoes",
    unit: "RWF/kg",
    price: 600,
    change: 8.5,
    trend: "up",
    color: "#EF4444",
  },
  {
    icon: "potato",
    name: "Potatoes",
    unit: "RWF/kg",
    price: 400,
    change: -2.3,
    trend: "down",
    color: "#D2B48C",
  },
  {
    icon: "help-circle",
    name: "Bananas",
    unit: "RWF/kg",
    price: 300,
    change: 1.2,
    trend: "up",
    color: "#FCD34D",
  },
];

export default function MarketScreen() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.screenTitle}>Market</Text>
      <View style={styles.container}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.cardTitle}>Market Prices</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>Kigali</Text>
            <Ionicons name="chevron-down" size={16} color="#aaa" />
          </TouchableOpacity>
        </View>

        {/* --- Summary --- */}
        <View style={styles.summary}>
          <Ionicons name="arrow-up" size={20} color="#00FF88" />
          <Text style={styles.summaryPercent}>+2.3%</Text>
          <Text style={styles.summaryText}>avg. today</Text>
          <Text style={styles.summaryTime}>Last updated 2:30 PM</Text>
        </View>
        <Text style={styles.summarySubtitle}>Prices updated hourly</Text>

        {/* --- Filters --- */}
        <View style={styles.filters}>
          {(["All", "Grains", "Vegetables", "Fruits"] as Filter[]).map(
            (filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  activeFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* --- Price List --- */}
        <ScrollView style={styles.priceList}>
          {marketData.map((item, index) => (
            <TouchableOpacity key={index} style={styles.priceItem}>
              <View
                style={[styles.itemIcon, { backgroundColor: item.color }]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={24}
                  color="#fff"
                />
              </View>
              <View style={styles.itemName}>
                <Text style={styles.itemNameText}>{item.name}</Text>
                <Text style={styles.itemUnitText}>{item.unit}</Text>
              </View>
              <Feather
                name={item.trend === "up" ? "trending-up" : "trending-down"}
                size={30}
                color={item.trend === "up" ? "#00FF88" : "#EF4444"}
                style={styles.itemTrend}
              />
              <View style={styles.itemPrice}>
                <Text style={styles.itemPriceText}>{item.price}</Text>
                <Text
                  style={[
                    styles.itemChangeText,
                    { color: item.trend === "up" ? "#00FF88" : "#EF4444" },
                  ]}
                >
                  {item.trend === "up" ? "▲" : "▼"}{" "}
                  {item.change.toFixed(1)}%
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* --- Footer Actions --- */}
        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.buttonCompare}>
            <Ionicons name="swap-horizontal" size={20} color="#0E1410" />
            <Text style={styles.buttonCompareText}>Compare Markets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPost}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.buttonPostText}>Post Offer</Text>
          </TouchableOpacity>
        </View>

        {/* --- Tip --- */}
        <View style={styles.tip}>
          <Ionicons name="bulb-outline" size={20} color="#00FF88" />
          <Text style={styles.tipText}>
            Tip: Harvest quality increases price — dry before sale.
          </Text>
        </View>
      </View>
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
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C3A4F",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  dropdownText: {
    color: "#fff",
    marginRight: 5,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  summaryPercent: {
    color: "#00FF88",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  summaryText: {
    color: "#aaa",
    fontSize: 16,
    marginLeft: 8,
  },
  summaryTime: {
    color: "#888",
    fontSize: 12,
    marginLeft: "auto",
    backgroundColor: "#2C3A4F",
    padding: 5,
    borderRadius: 5,
  },
  summarySubtitle: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 5,
  },
  filters: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#2C3A4F",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: "#00FF88",
  },
  filterText: {
    color: "#fff",
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#0E1410",
  },
  priceList: {
    flex: 1,
    marginTop: 10,
  },
  priceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2C3A4F",
  },
  itemIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    flex: 1,
    marginLeft: 12,
  },
  itemNameText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemUnitText: {
    color: "#aaa",
    fontSize: 12,
  },
  itemTrend: {
    marginHorizontal: 10,
  },
  itemPrice: {
    alignItems: "flex-end",
  },
  itemPriceText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemChangeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  footerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  buttonCompare: {
    backgroundColor: "#00FF88",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonCompareText: {
    color: "#0E1410",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 8,
  },
  buttonPost: {
    backgroundColor: "#2C3A4F",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonPostText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 8,
  },
  tip: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    padding: 10,
    borderRadius: 8,
  },
  tipText: {
    color: "#ccc",
    fontSize: 12,
    marginLeft: 10,
    flex: 1,
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const pestsData = [
  {
    id: '1',
    name: 'Fall Armyworm',
    scientificName: 'Spodoptera frugiperda',
    crops: ['Maize', 'Sorghum', 'Rice'],
    severity: 'High',
    description: 'Larvae feed on leaves, causing extensive damage to crops.',
    symptoms: ['Holes in leaves', 'Leaf skeletonization', 'Frass deposits'],
    treatment: ['Use neem oil', 'Apply biological pesticides', 'Practice crop rotation'],
    prevention: ['Early planting', 'Field monitoring', 'Use resistant varieties'],
    image: '🪲',
    color: '#F87171',
  },
  {
    id: '2',
    name: 'Bean Fly',
    scientificName: 'Ophiomyia phaseoli',
    crops: ['Beans', 'Peas'],
    severity: 'Medium',
    description: 'Larvae tunnel into stems, causing wilting and plant death.',
    symptoms: ['Leaf yellowing', 'Stem tunneling', 'Plant wilting'],
    treatment: ['Soil drenching', 'Use of insecticides', 'Remove infected plants'],
    prevention: ['Proper field hygiene', 'Early planting', 'Use healthy seeds'],
    image: '🐛',
    color: '#FCD34D',
  },
  {
    id: '3',
    name: 'Coffee Berry Borer',
    scientificName: 'Hypothenemus hampei',
    crops: ['Coffee'],
    severity: 'High',
    description: 'Small beetle that bores into coffee berries, reducing yield and quality.',
    symptoms: ['Small holes in berries', 'Berry drop', 'Reduced quality'],
    treatment: ['Beauveria bassiana fungus', 'Proper harvesting', 'Field sanitation'],
    prevention: ['Shade management', 'Timely harvesting', 'Biological control'],
    image: '☕',
    color: '#8B4513',
  },
  {
    id: '4',
    name: 'Aphids',
    scientificName: 'Aphidoidea',
    crops: ['Various vegetables', 'Fruits'],
    severity: 'Medium',
    description: 'Small sap-sucking insects that can transmit plant viruses.',
    symptoms: ['Curled leaves', 'Honeydew secretion', 'Sooty mold'],
    treatment: ['Insecticidal soap', 'Neem oil', 'Ladybird beetles'],
    prevention: ['Companion planting', 'Reflective mulches', 'Natural predators'],
    image: '🐜',
    color: '#60A5FA',
  },
];

export default function PestsScreen() {
  const router = useRouter();
  const [selectedPest, setSelectedPest] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPests = pestsData.filter(pest =>
    pest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pest.crops.some(crop => crop.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const PestCard = ({ pest }: { pest: any }) => (
    <TouchableOpacity
      style={styles.pestCard}
      onPress={() => setSelectedPest(selectedPest === pest.id ? null : pest.id)}
    >
      <View style={styles.pestHeader}>
        <View style={styles.pestIconContainer}>
          <Text style={styles.pestIcon}>{pest.image}</Text>
        </View>
        <View style={styles.pestInfo}>
          <Text style={styles.pestName}>{pest.name}</Text>
          <Text style={styles.pestScientific}>{pest.scientificName}</Text>
          <View style={styles.cropTags}>
            {pest.crops.map((crop, index) => (
              <View key={index} style={styles.cropTag}>
                <Text style={styles.cropTagText}>{crop}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.severityBadge, { backgroundColor: `${pest.color}20` }]}>
          <Text style={[styles.severityText, { color: pest.color }]}>
            {pest.severity}
          </Text>
        </View>
      </View>

      {selectedPest === pest.id && (
        <View style={styles.pestDetails}>
          <Text style={styles.detailTitle}>Description</Text>
          <Text style={styles.detailText}>{pest.description}</Text>

          <Text style={styles.detailTitle}>Symptoms</Text>
          {pest.symptoms.map((symptom, index) => (
            <View key={index} style={styles.listItem}>
              <Ionicons name="warning" size={16} color="#F87171" />
              <Text style={styles.listText}>{symptom}</Text>
            </View>
          ))}

          <Text style={styles.detailTitle}>Treatment</Text>
          {pest.treatment.map((treatment, index) => (
            <View key={index} style={styles.listItem}>
              <Ionicons name="medical" size={16} color="#00FF88" />
              <Text style={styles.listText}>{treatment}</Text>
            </View>
          ))}

          <Text style={styles.detailTitle}>Prevention</Text>
          {pest.prevention.map((prevention, index) => (
            <View key={index} style={styles.listItem}>
              <Ionicons name="shield-checkmark" size={16} color="#60A5FA" />
              <Text style={styles.listText}>{prevention}</Text>
            </View>
          ))}

          <TouchableOpacity 
            style={styles.askAuraButton}
            onPress={() => router.push('/chat')}
          >
            <Ionicons name="chatbubble-ellipses" size={20} color="#0E1410" />
            <Text style={styles.askAuraText}>Ask AURA About {pest.name}</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pest & Disease Control</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Protect Your Crops</Text>
            <Text style={styles.heroSubtitle}>
              Identify pests and diseases with AURAs expert guidance
            </Text>
          </View>
          <View style={styles.heroIcon}>
            <MaterialCommunityIcons name="bug" size={40} color="#00FF88" />
          </View>
        </View>

        {/* Quick Actions */}
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
            onPress={() => router.push('/chat')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(96, 165, 250, 0.2)' }]}>
              <Ionicons name="chatbubble-ellipses" size={24} color="#60A5FA" />
            </View>
            <Text style={styles.quickActionText}>Ask AURA</Text>
          </TouchableOpacity>

          <TouchableOpacity 
  style={styles.quickAction}
  onPress={() => router.push('/emergency')}  // Changed this line
>
  <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(248, 113, 113, 0.2)' }]}>
    <Ionicons name="warning" size={24} color="#F87171" />
  </View>
  <Text style={styles.quickActionText}>Emergency</Text>
</TouchableOpacity>
        </View>

        {/* Pest Library */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Pests & Diseases</Text>
          <Text style={styles.sectionSubtitle}>
            Tap on any pest to see detailed information and treatment options
          </Text>

          {filteredPests.map((pest) => (
            <PestCard key={pest.id} pest={pest} />
          ))}
        </View>

        {/* Prevention Tips */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Prevention Tips</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="eye" size={20} color="#00FF88" />
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Regular Monitoring</Text>
                <Text style={styles.tipDescription}>
                  Inspect crops weekly for early signs of pests and diseases
                </Text>
              </View>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="leaf" size={20} color="#00FF88" />
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Crop Rotation</Text>
                <Text style={styles.tipDescription}>
                  Rotate crops to break pest and disease cycles
                </Text>
              </View>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="water" size={20} color="#00FF88" />
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Proper Watering</Text>
                <Text style={styles.tipDescription}>
                  Avoid overwatering to prevent fungal diseases
                </Text>
              </View>
            </View>

            <View style={styles.tipItem}>
              <Ionicons name="trash" size={20} color="#00FF88" />
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Field Sanitation</Text>
                <Text style={styles.tipDescription}>
                  Remove crop residues and weeds that host pests
                </Text>
              </View>
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
    backgroundColor: '#0E1410',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1E3A2E',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 34,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  heroCard: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 20,
  },
  heroIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2C2B3E',
    borderRadius: 12,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  pestCard: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  pestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pestIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2C2B3E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pestIcon: {
    fontSize: 24,
  },
  pestInfo: {
    flex: 1,
  },
  pestName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  pestScientific: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  cropTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  cropTag: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cropTagText: {
    color: '#00FF88',
    fontSize: 10,
    fontWeight: '600',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  pestDetails: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#2D4A3A',
  },
  detailTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  detailText: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  listText: {
    color: '#ccc',
    fontSize: 14,
    flex: 1,
    lineHeight: 18,
  },
  askAuraButton: {
    backgroundColor: '#00FF88',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  askAuraText: {
    color: '#0E1410',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    backgroundColor: '#2C2B3E',
    borderRadius: 8,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipDescription: {
    color: '#aaa',
    fontSize: 12,
    lineHeight: 16,
  },
});
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const cropTemplates = [
  {
    id: '1',
    name: 'Maize Farming',
    description: 'High-yield maize production template',
    duration: '90-120 days',
    season: 'Rainy Season',
    difficulty: 'Beginner',
    icon: '🌽',
    color: '#FCD34D',
  },
  {
    id: '2',
    name: 'Beans Cultivation',
    description: 'Traditional beans farming guide',
    duration: '60-90 days',
    season: 'All Seasons',
    difficulty: 'Beginner',
    icon: '🫘',
    color: '#00FF88',
  },
  {
    id: '3',
    name: 'Coffee Plantation',
    description: 'Premium coffee growing template',
    duration: '3-4 years',
    season: 'Year-round',
    difficulty: 'Expert',
    icon: '☕',
    color: '#8B4513',
  },
  {
    id: '4',
    name: 'Vegetable Garden',
    description: 'Mixed vegetable garden setup',
    duration: '45-60 days',
    season: 'All Seasons',
    difficulty: 'Beginner',
    icon: '🥬',
    color: '#00FF88',
  },
  {
    id: '5',
    name: 'Banana Plantation',
    description: 'Commercial banana farming',
    duration: '9-12 months',
    season: 'Year-round',
    difficulty: 'Intermediate',
    icon: '🍌',
    color: '#FCD34D',
  },
  {
    id: '6',
    name: 'Potato Farming',
    description: 'High-density potato cultivation',
    duration: '75-100 days',
    season: 'Cool Season',
    difficulty: 'Intermediate',
    icon: '🥔',
    color: '#F97316',
  },
];

export default function CropTemplatesScreen() {
  const router = useRouter();

  const handleTemplateSelect = (template: any) => {
    router.push({
      pathname: '/crops/new',
      params: { template: template.name }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crop Templates</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Start Smart with AURA</Text>
          <Text style={styles.heroSubtitle}>
            Choose from proven farming templates optimized for your region
          </Text>
        </View>

        <View style={styles.templatesGrid}>
          {cropTemplates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={styles.templateCard}
              onPress={() => handleTemplateSelect(template)}
            >
              <View style={[styles.templateIcon, { backgroundColor: `${template.color}20` }]}>
                <Text style={styles.iconEmoji}>{template.icon}</Text>
              </View>
              
              <View style={styles.templateContent}>
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateDescription}>{template.description}</Text>
                
                <View style={styles.templateMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={14} color="#888" />
                    <Text style={styles.metaText}>{template.duration}</Text>
                  </View>
                  
                  <View style={styles.metaItem}>
                    <Ionicons name="calendar-outline" size={14} color="#888" />
                    <Text style={styles.metaText}>{template.season}</Text>
                  </View>
                </View>

                <View style={[styles.difficultyBadge, { 
                  backgroundColor: template.difficulty === 'Beginner' ? 'rgba(0, 255, 136, 0.2)' :
                                 template.difficulty === 'Intermediate' ? 'rgba(252, 211, 77, 0.2)'
                                 : 'rgba(248, 113, 113, 0.2)'
                }]}>
                  <Text style={[styles.difficultyText, {
                    color: template.difficulty === 'Beginner' ? '#00FF88' :
                           template.difficulty === 'Intermediate' ? '#FCD34D'
                           : '#F87171'
                  }]}>
                    {template.difficulty}
                  </Text>
                </View>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.customSection}>
          <View style={styles.customCard}>
            <Ionicons name="build-outline" size={32} color="#00FF88" />
            <Text style={styles.customTitle}>Custom Template</Text>
            <Text style={styles.customDescription}>
              Create your own farming template from scratch
            </Text>
            <TouchableOpacity 
              style={styles.customButton}
              onPress={() => router.push('/crops/new')}
            >
              <Text style={styles.customButtonText}>Create Custom</Text>
            </TouchableOpacity>
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
  heroSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  templatesGrid: {
    gap: 12,
    marginBottom: 20,
  },
  templateCard: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  templateIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconEmoji: {
    fontSize: 24,
  },
  templateContent: {
    flex: 1,
  },
  templateName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  templateDescription: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 18,
  },
  templateMeta: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#888',
    fontSize: 12,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  customSection: {
    marginBottom: 30,
  },
  customCard: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0, 255, 136, 0.3)',
    borderStyle: 'dashed',
  },
  customTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  customDescription: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  customButton: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00FF88',
  },
  customButtonText: {
    color: '#00FF88',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
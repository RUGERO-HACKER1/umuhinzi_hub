import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const resources = [
  {
    id: '1',
    title: 'Maize Farming Guide',
    type: 'guide',
    category: 'Crops',
    description: 'Complete guide to growing high-yield maize',
    duration: '15 min read',
    icon: '🌽',
    color: '#FCD34D',
    url: 'https://example.com/maize-guide',
  },
  {
    id: '2',
    title: 'Organic Pest Control',
    type: 'article',
    category: 'Pests',
    description: 'Natural methods to control common farm pests',
    duration: '8 min read',
    icon: '🐞',
    color: '#00FF88',
    url: 'https://example.com/organic-pest-control',
  },
  {
    id: '3',
    title: 'Soil Health Management',
    type: 'guide',
    category: 'Soil',
    description: 'Improve your soil quality for better yields',
    duration: '12 min read',
    icon: '🌱',
    color: '#8B4513',
    url: 'https://example.com/soil-health',
  },
  {
    id: '4',
    title: 'Irrigation Techniques',
    type: 'video',
    category: 'Water',
    description: 'Efficient water management for small farms',
    duration: '20 min watch',
    icon: '💧',
    color: '#60A5FA',
    url: 'https://example.com/irrigation-video',
  },
  {
    id: '5',
    title: 'Market Access Strategies',
    type: 'article',
    category: 'Business',
    description: 'How to get better prices for your produce',
    duration: '10 min read',
    icon: '💰',
    color: '#00FF88',
    url: 'https://example.com/market-access',
  },
  {
    id: '6',
    title: 'Climate Smart Agriculture',
    type: 'guide',
    category: 'Climate',
    description: 'Adapting to changing weather patterns',
    duration: '18 min read',
    icon: '🌍',
    color: '#60A5FA',
    url: 'https://example.com/climate-smart',
  },
];

const categories = [
  { id: 'all', name: 'All Resources', icon: '📚', count: resources.length },
  { id: 'Crops', name: 'Crops', icon: '🌽', count: resources.filter(r => r.category === 'Crops').length },
  { id: 'Pests', name: 'Pests', icon: '🐛', count: resources.filter(r => r.category === 'Pests').length },
  { id: 'Soil', name: 'Soil', icon: '🌱', count: resources.filter(r => r.category === 'Soil').length },
  { id: 'Water', name: 'Water', icon: '💧', count: resources.filter(r => r.category === 'Water').length },
  { id: 'Business', name: 'Business', icon: '💰', count: resources.filter(r => r.category === 'Business').length },
];

export default function ResourcesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleResourcePress = async (resource: any) => {
    // In a real app, you might open in WebView or deep link
    try {
      await Linking.openURL(resource.url);
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return '📖';
      case 'article': return '📄';
      case 'video': return '🎥';
      default: return '📚';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Farming Resources</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Learn & Grow</Text>
            <Text style={styles.heroSubtitle}>
              Access expert farming knowledge and improve your skills with AURAs resource library
            </Text>
          </View>
          <View style={styles.heroIcon}>
            <Ionicons name="library" size={40} color="#00FF88" />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            <View style={styles.categories}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={[
                    styles.categoryName,
                    selectedCategory === category.id && styles.categoryNameActive,
                  ]}>
                    {category.name}
                  </Text>
                  <Text style={[
                    styles.categoryCount,
                    selectedCategory === category.id && styles.categoryCountActive,
                  ]}>
                    {category.count}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Resources Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'all' ? 'All Resources' : `${selectedCategory} Resources`}
            </Text>
            <Text style={styles.resourceCount}>
              {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
            </Text>
          </View>

          {filteredResources.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={48} color="#666" />
              <Text style={styles.emptyTitle}>No Resources Found</Text>
              <Text style={styles.emptyDescription}>
                Try selecting a different category or search for something else.
              </Text>
            </View>
          ) : (
            <View style={styles.resourcesGrid}>
              {filteredResources.map((resource) => (
                <TouchableOpacity
                  key={resource.id}
                  style={styles.resourceCard}
                  onPress={() => handleResourcePress(resource)}
                >
                  <View style={[
                    styles.resourceIcon,
                    { backgroundColor: `${resource.color}20` }
                  ]}>
                    <Text style={styles.resourceEmoji}>{resource.icon}</Text>
                  </View>

                  <View style={styles.resourceType}>
                    <Text style={styles.typeIcon}>{getTypeIcon(resource.type)}</Text>
                    <Text style={styles.resourceTypeText}>{resource.type}</Text>
                  </View>

                  <Text style={styles.resourceTitle}>{resource.title}</Text>
                  <Text style={styles.resourceDescription}>{resource.description}</Text>

                  <View style={styles.resourceMeta}>
                    <View style={styles.categoryTag}>
                      <Text style={styles.categoryTagText}>{resource.category}</Text>
                    </View>
                    <Text style={styles.resourceDuration}>{resource.duration}</Text>
                  </View>

                  <View style={styles.resourceAction}>
                    <Text style={styles.resourceActionText}>Read Guide</Text>
                    <Ionicons name="arrow-forward" size={16} color="#00FF88" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Featured Section */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured from AURA</Text>
          
          <View style={styles.featuredCard}>
            <View style={styles.featuredHeader}>
              <View style={styles.featuredIcon}>
                <Ionicons name="sparkles" size={24} color="#00FF88" />
              </View>
              <View>
                <Text style={styles.featuredTitle}>AURA Farming Tips</Text>
                <Text style={styles.featuredSubtitle}>Weekly expert advice</Text>
              </View>
            </View>
            
            <View style={styles.featuredTips}>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color="#00FF88" />
                <Text style={styles.tipText}>Water plants early morning to reduce evaporation</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color="#00FF88" />
                <Text style={styles.tipText}>Rotate crops to prevent soil nutrient depletion</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle" size={16} color="#00FF88" />
                <Text style={styles.tipText}>Use companion planting for natural pest control</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.askAuraButton}
              onPress={() => router.push('/chat')}
            >
              <Ionicons name="chatbubble-ellipses" size={20} color="#0E1410" />
              <Text style={styles.askAuraText}>Get More Tips from AURA</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Government Resources */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Government Resources</Text>
          <Text style={styles.cardSubtitle}>
            Official agricultural programs and support
          </Text>

          <View style={styles.govLinks}>
            <TouchableOpacity style={styles.govLink}>
              <Ionicons name="document-text" size={20} color="#60A5FA" />
              <View style={styles.govLinkInfo}>
                <Text style={styles.govLinkTitle}>Subsidy Programs</Text>
                <Text style={styles.govLinkDesc}>Farming input subsidies and support</Text>
              </View>
              <Ionicons name="open-outline" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.govLink}>
              <Ionicons name="school" size={20} color="#00FF88" />
              <View style={styles.govLinkInfo}>
                <Text style={styles.govLinkTitle}>Training Programs</Text>
                <Text style={styles.govLinkDesc}>Free farming workshops and courses</Text>
              </View>
              <Ionicons name="open-outline" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.govLink}>
              <Ionicons name="call" size={20} color="#FCD34D" />
              <View style={styles.govLinkInfo}>
                <Text style={styles.govLinkTitle}>Extension Services</Text>
                <Text style={styles.govLinkDesc}>Contact agricultural officers</Text>
              </View>
              <Ionicons name="open-outline" size={20} color="#666" />
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
  heroCard: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resourceCount: {
    color: '#aaa',
    fontSize: 14,
  },
  categoriesScroll: {
    marginHorizontal: -15,
    paddingHorizontal: 15,
  },
  categories: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2C2B3E',
    borderRadius: 12,
    minWidth: 100,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryButtonActive: {
    backgroundColor: '#1E261E',
    borderColor: '#00FF88',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  categoryName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryNameActive: {
    color: '#00FF88',
  },
  categoryCount: {
    color: '#666',
    fontSize: 10,
  },
  categoryCountActive: {
    color: '#00FF88',
  },
  resourcesGrid: {
    gap: 15,
  },
  resourceCard: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  resourceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceEmoji: {
    fontSize: 20,
  },
  resourceType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  typeIcon: {
    fontSize: 12,
  },
  resourceTypeText: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  resourceTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 20,
  },
  resourceDescription: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 18,
  },
  resourceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryTagText: {
    color: '#00FF88',
    fontSize: 10,
    fontWeight: '600',
  },
  resourceDuration: {
    color: '#888',
    fontSize: 12,
  },
  resourceAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2D4A3A',
  },
  resourceActionText: {
    color: '#00FF88',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  featuredSection: {
    marginBottom: 20,
  },
  featuredCard: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  featuredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  featuredSubtitle: {
    color: '#aaa',
    fontSize: 14,
  },
  featuredTips: {
    gap: 12,
    marginBottom: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  askAuraButton: {
    backgroundColor: '#00FF88',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  askAuraText: {
    color: '#0E1410',
    fontSize: 14,
    fontWeight: 'bold',
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
    marginBottom: 8,
  },
  cardSubtitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 15,
  },
  govLinks: {
    gap: 12,
  },
  govLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2C2B3E',
    borderRadius: 12,
    gap: 12,
  },
  govLinkInfo: {
    flex: 1,
  },
  govLinkTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  govLinkDesc: {
    color: '#aaa',
    fontSize: 12,
  },
});
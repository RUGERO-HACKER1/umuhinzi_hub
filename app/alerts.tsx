import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isSmallScreen = screenWidth < 375;

const alerts = [
  {
    id: '1',
    type: 'disease',
    title: 'Leaf Rust Alert',
    severity: 'high',
    location: 'Your Region',
    crop: 'Maize',
    description: 'High risk of leaf rust infection due to recent weather conditions. Check your maize crops for yellow spots on leaves.',
    action: 'Apply fungicide and monitor closely',
    date: '2 hours ago',
    read: false,
    icon: 'warning',
    color: '#F87171',
    urgent: true,
  },
  {
    id: '2',
    type: 'weather',
    title: 'Heavy Rain Warning',
    severity: 'medium',
    location: 'Your Area',
    crop: 'All Crops',
    description: 'Heavy rainfall expected in the next 24 hours. Prepare drainage and protect sensitive crops.',
    action: 'Check drainage systems and postpone spraying',
    date: '5 hours ago',
    read: false,
    icon: 'rainy',
    color: '#60A5FA',
    urgent: false,
  },
  {
    id: '3',
    type: 'pest',
    title: 'Fall Armyworm Detection',
    severity: 'high',
    location: 'Neighboring Farms',
    crop: 'Maize',
    description: 'Fall armyworm reported in nearby farms. Increased monitoring recommended.',
    action: 'Inspect crops and set up pheromone traps',
    date: '1 day ago',
    read: true,
    icon: 'bug',
    color: '#F87171',
    urgent: true,
  },
  {
    id: '4',
    type: 'market',
    title: 'Price Drop Alert',
    severity: 'low',
    location: 'Local Market',
    crop: 'Beans',
    description: 'Bean prices have dropped by 15% this week. Consider alternative marketing strategies.',
    action: 'Explore storage options or alternative markets',
    date: '2 days ago',
    read: true,
    icon: 'trending-down',
    color: '#FCD34D',
    urgent: false,
  },
  {
    id: '5',
    type: 'system',
    title: 'AURA Update Available',
    severity: 'low',
    location: 'App',
    crop: 'System',
    description: 'New features available including improved pest detection and weather forecasting.',
    action: 'Update app for enhanced features',
    date: '3 days ago',
    read: true,
    icon: 'notifications',
    color: '#00FF88',
    urgent: false,
  },
  {
    id: '6',
    type: 'irrigation',
    title: 'Water Shortage Warning',
    severity: 'medium',
    location: 'Your Region',
    crop: 'All Crops',
    description: 'Reduced water availability expected next week. Plan irrigation schedules accordingly.',
    action: 'Optimize water usage and prioritize key crops',
    date: '4 days ago',
    read: true,
    icon: 'water',
    color: '#60A5FA',
    urgent: false,
  },
];

const alertCategories = [
  { id: 'all', name: 'All', icon: 'notifications', count: alerts.length },
  { id: 'unread', name: 'Unread', icon: 'mail-unread', count: alerts.filter(a => !a.read).length },
  { id: 'urgent', name: 'Urgent', icon: 'warning', count: alerts.filter(a => a.urgent).length },
  { id: 'disease', name: 'Disease', icon: 'medical', count: alerts.filter(a => a.type === 'disease').length },
  { id: 'pest', name: 'Pests', icon: 'bug', count: alerts.filter(a => a.type === 'pest').length },
  { id: 'weather', name: 'Weather', icon: 'cloud', count: alerts.filter(a => a.type === 'weather').length },
];

export default function AlertsScreen() {
  const router = useRouter();
  const [alertsList, setAlertsList] = useState(alerts);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredAlerts = alertsList.filter(alert => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'unread') return !alert.read;
    if (selectedCategory === 'urgent') return alert.urgent;
    return alert.type === selectedCategory;
  });

  const unreadCount = alertsList.filter(alert => !alert.read).length;
  const urgentCount = alertsList.filter(alert => alert.urgent && !alert.read).length;

  const markAsRead = (id: string) => {
    setAlertsList(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  const markAllAsRead = () => {
    Alert.alert(
      'Mark all as read?',
      'This will mark all alerts as read.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Mark All',
          onPress: () => {
            setAlertsList(prev =>
              prev.map(alert => ({ ...alert, read: true }))
            );
          },
        },
      ]
    );
  };

  const deleteAlert = (id: string) => {
    Alert.alert(
      'Delete Alert?',
      'This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAlertsList(prev => prev.filter(alert => alert.id !== id));
          },
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return { icon: 'warning', color: '#F87171', label: 'Critical' };
      case 'medium': return { icon: 'information', color: '#FCD34D', label: 'Important' };
      case 'low': return { icon: 'notifications', color: '#60A5FA', label: 'Info' };
      default: return { icon: 'notifications', color: '#aaa', label: 'Info' };
    }
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      disease: { icon: '🦠', name: 'medical', color: '#F87171' },
      weather: { icon: '🌧️', name: 'cloud', color: '#60A5FA' },
      pest: { icon: '🐛', name: 'bug', color: '#F87171' },
      market: { icon: '📊', name: 'trending-down', color: '#FCD34D' },
      system: { icon: '📱', name: 'notifications', color: '#00FF88' },
      irrigation: { icon: '💧', name: 'water', color: '#60A5FA' },
    };
    return icons[type as keyof typeof icons] || { icon: '📢', name: 'notifications', color: '#aaa' };
  };

  const AlertItem = ({ alert }: { alert: any }) => {
    const severityInfo = getSeverityIcon(alert.severity);
    const typeInfo = getTypeIcon(alert.type);
    const isExpanded = expandedAlert === alert.id;

    return (
      <Animated.View style={[styles.alertCard, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={[
            styles.alertHeader,
            !alert.read && styles.alertHeaderUnread,
            alert.urgent && styles.alertHeaderUrgent,
          ]}
          onPress={() => setExpandedAlert(isExpanded ? null : alert.id)}
        >
          <View style={styles.alertMain}>
            <View style={[styles.alertIcon, { backgroundColor: `${typeInfo.color}20` }]}>
              <Ionicons name={typeInfo.name as any} size={20} color={typeInfo.color} />
            </View>
            
            <View style={styles.alertContent}>
              <View style={styles.alertTitleRow}>
                <Text style={styles.alertTitle} numberOfLines={1}>{alert.title}</Text>
                {!alert.read && <View style={styles.unreadDot} />}
              </View>
              <View style={styles.alertMeta}>
                <Text style={styles.alertCrop}>{alert.crop}</Text>
                <Text style={styles.alertDate}>{alert.date}</Text>
              </View>
            </View>
          </View>

          <View style={styles.alertSeverity}>
            <Ionicons name={severityInfo.icon as any} size={16} color={severityInfo.color} />
            <Text style={[styles.severityText, { color: severityInfo.color }]}>
              {severityInfo.label}
            </Text>
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.alertDetails}>
            <Text style={styles.alertDescription}>{alert.description}</Text>
            
            <View style={styles.actionSection}>
              <View style={styles.actionHeader}>
                <Ionicons name="flash" size={16} color="#FCD34D" />
                <Text style={styles.actionLabel}>Recommended Action</Text>
              </View>
              <Text style={styles.actionText}>{alert.action}</Text>
            </View>

            <View style={styles.alertActions}>
              {!alert.read && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => markAsRead(alert.id)}
                >
                  <Ionicons name="checkmark" size={16} color="#00FF88" />
                  <Text style={styles.actionButtonText}>Mark Read</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/chat')}
              >
                <Ionicons name="chatbubble" size={16} color="#60A5FA" />
                <Text style={styles.actionButtonText}>Ask AURA</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => deleteAlert(alert.id)}
              >
                <Ionicons name="trash" size={16} color="#F87171" />
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alerts</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.headerActionText}>Mark All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#00FF88"
            colors={['#00FF88']}
          />
        }
      >
        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(248, 113, 113, 0.2)' }]}>
              <Ionicons name="warning" size={20} color="#F87171" />
            </View>
            <View>
              <Text style={styles.statNumber}>{urgentCount}</Text>
              <Text style={styles.statLabel}>Urgent</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(0, 255, 136, 0.2)' }]}>
              <Ionicons name="mail-unread" size={20} color="#00FF88" />
            </View>
            <View>
              <Text style={styles.statNumber}>{unreadCount}</Text>
              <Text style={styles.statLabel}>Unread</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: 'rgba(96, 165, 250, 0.2)' }]}>
              <Ionicons name="notifications" size={20} color="#60A5FA" />
            </View>
            <View>
              <Text style={styles.statNumber}>{alertsList.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </View>

        {/* Categories Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          <View style={styles.categories}>
            {alertCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Ionicons 
                  name={category.icon as any} 
                  size={16} 
                  color={selectedCategory === category.id ? '#0E1410' : '#aaa'} 
                />
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive,
                ]}>
                  {category.name}
                </Text>
                {category.count > 0 && (
                  <View style={[
                    styles.categoryCount,
                    selectedCategory === category.id && styles.categoryCountActive,
                  ]}>
                    <Text style={[
                      styles.categoryCountText,
                      selectedCategory === category.id && styles.categoryCountTextActive,
                    ]}>
                      {category.count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Alerts List */}
        <View style={styles.alertsSection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                {selectedCategory === 'all' ? 'All Alerts' : 
                 selectedCategory === 'unread' ? 'Unread Alerts' : 
                 selectedCategory === 'urgent' ? 'Urgent Alerts' :
                 `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Alerts`}
              </Text>
              <Text style={styles.sectionSubtitle}>
                {filteredAlerts.length} {filteredAlerts.length === 1 ? 'alert' : 'alerts'}
              </Text>
            </View>
            {filteredAlerts.length > 0 && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => {
                  if (selectedCategory === 'unread') {
                    markAllAsRead();
                  } else {
                    Alert.alert(
                      'Clear all alerts?',
                      'This will delete all alerts in this category.',
                      [
                        { text: 'Cancel', style: 'cancel' },
                        {
                          text: 'Clear',
                          style: 'destructive',
                          onPress: () => {
                            if (selectedCategory === 'all') {
                              setAlertsList([]);
                            } else {
                              setAlertsList(prev => 
                                prev.filter(alert => 
                                  selectedCategory === 'unread' ? alert.read :
                                  selectedCategory === 'urgent' ? !alert.urgent :
                                  alert.type !== selectedCategory
                                )
                              );
                            }
                          },
                        },
                      ]
                    );
                  }
                }}
              >
                <Text style={styles.clearText}>
                  {selectedCategory === 'unread' ? 'Mark All Read' : 'Clear All'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {filteredAlerts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons 
                name={selectedCategory === 'unread' ? "checkmark-done" : "notifications-off"} 
                size={64} 
                color="#2D4A3A" 
              />
              <Text style={styles.emptyTitle}>
                {selectedCategory === 'unread' ? 'No Unread Alerts' : 'No Alerts'}
              </Text>
              <Text style={styles.emptyDescription}>
                {selectedCategory === 'unread' 
                  ? "You're all caught up! New alerts will appear here."
                  : "No alerts found in this category."
                }
              </Text>
            </View>
          ) : (
            <View style={styles.alertsList}>
              {filteredAlerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => router.push('/emergency')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(248, 113, 113, 0.2)' }]}>
              <Ionicons name="warning" size={24} color="#F87171" />
            </View>
            <Text style={styles.quickActionText}>Emergency</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => router.push('/pests')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(252, 211, 77, 0.2)' }]}>
              <MaterialCommunityIcons name="bug" size={24} color="#FCD34D" />
            </View>
            <Text style={styles.quickActionText}>Pest Control</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => router.push('/tips')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(0, 255, 136, 0.2)' }]}>
              <Ionicons name="book" size={24} color="#00FF88" />
            </View>
            <Text style={styles.quickActionText}>Farming Tips</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => router.push('/(tabs)/chat')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(96, 165, 250, 0.2)' }]}>
              <Ionicons name="chatbubble" size={24} color="#60A5FA" />
            </View>
            <Text style={styles.quickActionText}>Ask AURA</Text>
          </TouchableOpacity>
        </View>

        {/* Alert Tips */}
        <View style={styles.tipsCard}>
          <View style={styles.tipsHeader}>
            <Ionicons name="bulb" size={20} color="#00FF88" />
            <Text style={styles.tipsTitle}>Alert Management Tips</Text>
          </View>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={14} color="#00FF88" />
              <Text style={styles.tipText}>Review alerts daily for timely actions</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={14} color="#00FF88" />
              <Text style={styles.tipText}>High severity alerts require immediate attention</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={14} color="#00FF88" />
              <Text style={styles.tipText}>Use AURA chat for personalized advice</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E3A2E',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerActionText: {
    color: '#00FF88',
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 12,
  },
  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E261E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  statNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 11,
    textAlign: 'center',
  },
  // Categories
  categoriesScroll: {
    marginHorizontal: -12,
    paddingHorizontal: 12,
  },
  categories: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1E261E',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2D4A3A',
  },
  categoryButtonActive: {
    backgroundColor: '#00FF88',
    borderColor: '#00FF88',
  },
  categoryText: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#0E1410',
  },
  categoryCount: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryCountActive: {
    backgroundColor: 'rgba(14, 20, 16, 0.3)',
  },
  categoryCountText: {
    color: '#00FF88',
    fontSize: 10,
    fontWeight: 'bold',
  },
  categoryCountTextActive: {
    color: '#0E1410',
  },
  // Alerts Section
  alertsSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  sectionSubtitle: {
    color: '#aaa',
    fontSize: 13,
  },
  clearButton: {
    padding: 6,
  },
  clearText: {
    color: '#F87171',
    fontSize: 13,
    fontWeight: '600',
  },
  // Alerts List
  alertsList: {
    gap: 10,
  },
  alertCard: {
    backgroundColor: '#1E261E',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2D4A3A',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  alertHeaderUnread: {
    backgroundColor: 'rgba(0, 255, 136, 0.05)',
    borderLeftWidth: 3,
    borderLeftColor: '#00FF88',
  },
  alertHeaderUrgent: {
    borderLeftColor: '#F87171',
  },
  alertMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  alertContent: {
    flex: 1,
  },
  alertTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  alertTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 6,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00FF88',
  },
  alertMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  alertCrop: {
    color: '#00FF88',
    fontSize: 12,
    fontWeight: '600',
  },
  alertDate: {
    color: '#888',
    fontSize: 11,
  },
  alertSeverity: {
    alignItems: 'center',
    gap: 2,
  },
  severityText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  alertDetails: {
    padding: 14,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#2D4A3A',
  },
  alertDescription: {
    color: '#aaa',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  actionSection: {
    backgroundColor: 'rgba(252, 211, 77, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FCD34D',
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  actionLabel: {
    color: '#FCD34D',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionText: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 16,
  },
  alertActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyDescription: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  quickAction: {
    width: '48%',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1E261E',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2D4A3A',
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Tips Card
  tipsCard: {
    backgroundColor: '#1E261E',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D4A3A',
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tipsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  tipText: {
    color: '#aaa',
    fontSize: 13,
    flex: 1,
    lineHeight: 16,
  },
});
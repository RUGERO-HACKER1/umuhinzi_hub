import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const notifications = [
  {
    id: '1',
    type: 'alert',
    title: 'Disease Alert - Urgent',
    message: 'Leaf rust detected in maize crops within 5km of your farm. Immediate inspection recommended.',
    time: '2 hours ago',
    read: false,
    icon: 'warning',
    color: '#F87171',
    priority: 'high',
    category: 'crop_health',
    action: 'view_details',
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Watering Schedule',
    message: 'Time to water your maize field. Optimal watering window: 6:00 AM - 8:00 AM',
    time: '5 hours ago',
    read: false,
    icon: 'water',
    color: '#60A5FA',
    priority: 'medium',
    category: 'reminder',
    action: 'snooze',
  },
  {
    id: '3',
    type: 'market',
    title: 'Price Increase Alert',
    message: 'Maize prices increased by 5% in your region. Current market rate: $250 per ton',
    time: '1 day ago',
    read: true,
    icon: 'trending-up',
    color: '#00FF88',
    priority: 'medium',
    category: 'market',
    action: 'view_market',
  },
  {
    id: '4',
    type: 'weather',
    title: 'Heavy Rain Warning',
    message: 'Heavy rainfall expected tomorrow. 80% chance of precipitation. Plan harvesting accordingly.',
    time: '1 day ago',
    read: true,
    icon: 'rainy',
    color: '#60A5FA',
    priority: 'high',
    category: 'weather',
    action: 'view_forecast',
  },
  {
    id: '5',
    type: 'system',
    title: 'New Farming Tips Available',
    message: 'Check out new planting techniques and pest control methods for maize cultivation.',
    time: '2 days ago',
    read: true,
    icon: 'leaf',
    color: '#00FF88',
    priority: 'low',
    category: 'tips',
    action: 'view_tips',
  },
  {
    id: '6',
    type: 'pest',
    title: 'Fall Armyworm Alert',
    message: 'Increased Fall Armyworm activity reported in your area. Monitor crops closely.',
    time: '3 days ago',
    read: true,
    icon: 'bug',
    color: '#FCD34D',
    priority: 'high',
    category: 'pest',
    action: 'view_pest_info',
  },
  {
    id: '7',
    type: 'maintenance',
    title: 'Equipment Service Due',
    message: 'Your irrigation system is due for maintenance. Schedule service to avoid breakdowns.',
    time: '4 days ago',
    read: true,
    icon: 'construct',
    color: '#F97316',
    priority: 'medium',
    category: 'maintenance',
    action: 'schedule_service',
  },
];

const notificationCategories = [
  { id: 'all', name: 'All', icon: 'notifications', count: notifications.length },
  { id: 'unread', name: 'Unread', icon: 'ellipse', count: notifications.filter(n => !n.read).length },
  { id: 'crop_health', name: 'Crop Health', icon: 'leaf', count: notifications.filter(n => n.category === 'crop_health').length },
  { id: 'weather', name: 'Weather', icon: 'cloud', count: notifications.filter(n => n.category === 'weather').length },
  { id: 'market', name: 'Market', icon: 'trending-up', count: notifications.filter(n => n.category === 'market').length },
  { id: 'pest', name: 'Pests', icon: 'bug', count: notifications.filter(n => n.category === 'pest').length },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [settings, setSettings] = useState({
    cropAlerts: true,
    weatherAlerts: true,
    marketUpdates: true,
    reminders: true,
    systemUpdates: false,
    pestAlerts: true,
    maintenanceReminders: true,
    pushNotifications: true,
    emailDigest: false,
  });

  const filteredNotifications = notificationsList.filter(notification => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'unread') return !notification.read;
    return notification.category === selectedCategory;
  });

  const unreadCount = notificationsList.filter(n => !n.read).length;
  const highPriorityCount = notificationsList.filter(n => n.priority === 'high' && !n.read).length;

  const markAsRead = (id: string) => {
    setNotificationsList(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    Alert.alert(
      'Mark all as read?',
      'This will mark all notifications as read.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Mark All',
          onPress: () => {
            setNotificationsList(prev =>
              prev.map(notification => ({ ...notification, read: true }))
            );
          },
        },
      ]
    );
  };

  const deleteNotification = (id: string) => {
    setNotificationsList(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    Alert.alert(
      'Clear all notifications?',
      'This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setNotificationsList([]),
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      // In a real app, you would fetch new notifications here
    }, 2000);
  };

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationAction = (notification: any) => {
    switch (notification.action) {
      case 'view_details':
        router.push('/pests');
        break;
      case 'view_market':
        // Navigate to market screen
        Alert.alert('Market', 'Opening market prices...');
        break;
      case 'view_forecast':
        // Navigate to weather screen
        Alert.alert('Weather', 'Opening weather forecast...');
        break;
      case 'view_tips':
        router.push('/tips');
        break;
      case 'view_pest_info':
        router.push('/pests');
        break;
      case 'schedule_service':
        Alert.alert('Maintenance', 'Scheduling service...');
        break;
      case 'snooze':
        Alert.alert('Reminder', 'Snoozed for 24 hours');
        break;
      default:
        markAsRead(notification.id);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return { icon: 'warning', color: '#F87171' };
      case 'medium':
        return { icon: 'information', color: '#FCD34D' };
      case 'low':
        return { icon: 'notifications', color: '#60A5FA' };
      default:
        return { icon: 'notifications', color: '#aaa' };
    }
  };

  const NotificationItem = ({ notification }: { notification: any }) => {
    const priorityInfo = getPriorityIcon(notification.priority);
    
    return (
      <TouchableOpacity
        style={[
          styles.notificationItem,
          !notification.read && styles.unreadNotification,
          notification.priority === 'high' && styles.highPriorityNotification,
        ]}
        onPress={() => handleNotificationAction(notification)}
        onLongPress={() => deleteNotification(notification.id)}
      >
        <View style={styles.notificationLeft}>
          <View style={[styles.notificationIcon, { backgroundColor: `${notification.color}20` }]}>
            <Ionicons name={notification.icon as any} size={20} color={notification.color} />
          </View>
          
          <View style={styles.notificationContent}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              {!notification.read && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.notificationMessage}>{notification.message}</Text>
            <View style={styles.notificationFooter}>
              <Text style={styles.notificationTime}>{notification.time}</Text>
              <View style={styles.priorityBadge}>
                <Ionicons name={priorityInfo.icon as any} size={12} color={priorityInfo.color} />
                <Text style={[styles.priorityText, { color: priorityInfo.color }]}>
                  {notification.priority}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.moreButton}
          onPress={() => deleteNotification(notification.id)}
        >
          <Ionicons name="close" size={16} color="#666" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
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
              <Text style={styles.statNumber}>{highPriorityCount}</Text>
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
              <Ionicons name="time" size={20} color="#60A5FA" />
            </View>
            <View>
              <Text style={styles.statNumber}>{notificationsList.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </View>

      
        {/* Notification Settings */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Notification Settings</Text>
            <TouchableOpacity>
              <Ionicons name="settings" size={20} color="#00FF88" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.settingsGrid}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="leaf" size={20} color="#00FF88" />
                <Text style={styles.settingTitle}>Crop Alerts</Text>
              </View>
              <Switch
                value={settings.cropAlerts}
                onValueChange={(value) => updateSetting('cropAlerts', value)}
                trackColor={{ false: '#2D4A3A', true: 'rgba(0, 255, 136, 0.5)' }}
                thumbColor={settings.cropAlerts ? '#00FF88' : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="cloud" size={20} color="#60A5FA" />
                <Text style={styles.settingTitle}>Weather Alerts</Text>
              </View>
              <Switch
                value={settings.weatherAlerts}
                onValueChange={(value) => updateSetting('weatherAlerts', value)}
                trackColor={{ false: '#2D4A3A', true: 'rgba(96, 165, 250, 0.5)' }}
                thumbColor={settings.weatherAlerts ? '#60A5FA' : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="trending-up" size={20} color="#00FF88" />
                <Text style={styles.settingTitle}>Market Updates</Text>
              </View>
              <Switch
                value={settings.marketUpdates}
                onValueChange={(value) => updateSetting('marketUpdates', value)}
                trackColor={{ false: '#2D4A3A', true: 'rgba(0, 255, 136, 0.5)' }}
                thumbColor={settings.marketUpdates ? '#00FF88' : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="bug" size={20} color="#FCD34D" />
                <Text style={styles.settingTitle}>Pest Alerts</Text>
              </View>
              <Switch
                value={settings.pestAlerts}
                onValueChange={(value) => updateSetting('pestAlerts', value)}
                trackColor={{ false: '#2D4A3A', true: 'rgba(252, 211, 77, 0.5)' }}
                thumbColor={settings.pestAlerts ? '#FCD34D' : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="construct" size={20} color="#F97316" />
                <Text style={styles.settingTitle}>Maintenance</Text>
              </View>
              <Switch
                value={settings.maintenanceReminders}
                onValueChange={(value) => updateSetting('maintenanceReminders', value)}
                trackColor={{ false: '#2D4A3A', true: 'rgba(249, 115, 22, 0.5)' }}
                thumbColor={settings.maintenanceReminders ? '#F97316' : '#f4f3f4'}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="notifications" size={20} color="#aaa" />
                <Text style={styles.settingTitle}>Push Notifications</Text>
              </View>
              <Switch
                value={settings.pushNotifications}
                onValueChange={(value) => updateSetting('pushNotifications', value)}
                trackColor={{ false: '#2D4A3A', true: 'rgba(170, 170, 170, 0.5)' }}
                thumbColor={settings.pushNotifications ? '#aaa' : '#f4f3f4'}
              />
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
            {notificationCategories.map((category) => (
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
  

        {/* Notifications List */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                {selectedCategory === 'all' ? 'All Notifications' : 
                 selectedCategory === 'unread' ? 'Unread Notifications' : 
                 `${selectedCategory.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`}
              </Text>
              <Text style={styles.sectionSubtitle}>
                {filteredNotifications.length} {filteredNotifications.length === 1 ? 'notification' : 'notifications'}
              </Text>
            </View>
            {filteredNotifications.length > 0 && (
              <TouchableOpacity onPress={clearAll} style={styles.clearButton}>
                <Text style={styles.clearText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>

          {filteredNotifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="notifications-off" size={64} color="#2D4A3A" />
              <Text style={styles.emptyTitle}>No Notifications</Text>
              <Text style={styles.emptyDescription}>
                {selectedCategory === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "No notifications in this category."}
              </Text>
            </View>
          ) : (
            <View style={styles.notificationsList}>
              {filteredNotifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
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
            <Text style={styles.quickActionText}>Emergency Alerts</Text>
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
  headerActionText: {
    color: '#00FF88',
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
  // Categories
  categoriesScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  categories: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1E261E',
    paddingHorizontal: 16,
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
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#0E1410',
  },
  categoryCount: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
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
  // Cards
  card: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2D4A3A',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#aaa',
    fontSize: 14,
  },
  clearButton: {
    padding: 8,
  },
  clearText: {
    color: '#F87171',
    fontSize: 14,
    fontWeight: '600',
  },
  // Settings
  settingsGrid: {
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Notifications
  notificationsList: {
    gap: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#2C2B3E',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  unreadNotification: {
    backgroundColor: 'rgba(0, 255, 136, 0.05)',
    borderLeftColor: '#00FF88',
  },
  highPriorityNotification: {
    borderLeftColor: '#F87171',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  notificationTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF88',
  },
  notificationMessage: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTime: {
    color: '#666',
    fontSize: 12,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  moreButton: {
    padding: 4,
    marginLeft: 8,
  },
  // Empty State
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
  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E261E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2D4A3A',
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
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
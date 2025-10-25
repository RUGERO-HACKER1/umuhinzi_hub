import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const notifications = [
  {
    id: '1',
    type: 'alert',
    title: 'Disease Alert',
    message: 'Leaf rust detected in your area. Check maize crops.',
    time: '2 hours ago',
    read: false,
    icon: 'warning',
    color: '#F87171',
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Watering Reminder',
    message: 'Time to water your maize field',
    time: '5 hours ago',
    read: false,
    icon: 'water',
    color: '#60A5FA',
  },
  {
    id: '3',
    type: 'market',
    title: 'Price Update',
    message: 'Maize prices increased by 5% in your region',
    time: '1 day ago',
    read: true,
    icon: 'trending-up',
    color: '#00FF88',
  },
  {
    id: '4',
    type: 'weather',
    title: 'Weather Alert',
    message: 'Heavy rain expected tomorrow. Plan accordingly.',
    time: '1 day ago',
    read: true,
    icon: 'rainy',
    color: '#60A5FA',
  },
  {
    id: '5',
    type: 'system',
    title: 'AURA Update',
    message: 'New farming tips available in your area',
    time: '2 days ago',
    read: true,
    icon: 'notifications',
    color: '#00FF88',
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [settings, setSettings] = useState({
    cropAlerts: true,
    weatherAlerts: true,
    marketUpdates: true,
    reminders: true,
    systemUpdates: false,
  });

  const markAsRead = (id: string) => {
    setNotificationsList(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const clearAll = () => {
    setNotificationsList(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Notification Settings */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notification Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="leaf" size={20} color="#00FF88" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Crop Alerts</Text>
                <Text style={styles.settingDescription}>Disease and pest warnings</Text>
              </View>
            </View>
            <Switch
              value={settings.cropAlerts}
              onValueChange={(value) => updateSetting('cropAlerts', value)}
              trackColor={{ false: '#767577', true: 'rgba(0, 255, 136, 0.5)' }}
              thumbColor={settings.cropAlerts ? '#00FF88' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="cloud" size={20} color="#60A5FA" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Weather Alerts</Text>
                <Text style={styles.settingDescription}>Rain, storms, and forecasts</Text>
              </View>
            </View>
            <Switch
              value={settings.weatherAlerts}
              onValueChange={(value) => updateSetting('weatherAlerts', value)}
              trackColor={{ false: '#767577', true: 'rgba(96, 165, 250, 0.5)' }}
              thumbColor={settings.weatherAlerts ? '#60A5FA' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="trending-up" size={20} color="#00FF88" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Market Updates</Text>
                <Text style={styles.settingDescription}>Price changes and trends</Text>
              </View>
            </View>
            <Switch
              value={settings.marketUpdates}
              onValueChange={(value) => updateSetting('marketUpdates', value)}
              trackColor={{ false: '#767577', true: 'rgba(0, 255, 136, 0.5)' }}
              thumbColor={settings.marketUpdates ? '#00FF88' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="alarm" size={20} color="#FCD34D" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Reminders</Text>
                <Text style={styles.settingDescription}>Watering and task reminders</Text>
              </View>
            </View>
            <Switch
              value={settings.reminders}
              onValueChange={(value) => updateSetting('reminders', value)}
              trackColor={{ false: '#767577', true: 'rgba(252, 211, 77, 0.5)' }}
              thumbColor={settings.reminders ? '#FCD34D' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={20} color="#aaa" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>System Updates</Text>
                <Text style={styles.settingDescription}>App features and news</Text>
              </View>
            </View>
            <Switch
              value={settings.systemUpdates}
              onValueChange={(value) => updateSetting('systemUpdates', value)}
              trackColor={{ false: '#767577', true: 'rgba(170, 170, 170, 0.5)' }}
              thumbColor={settings.systemUpdates ? '#aaa' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Notifications List */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notifications</Text>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{unreadCount} unread</Text>
              </View>
            )}
          </View>

          {notificationsList.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="notifications-off" size={48} color="#666" />
              <Text style={styles.emptyTitle}>No Notifications</Text>
              <Text style={styles.emptyDescription}>
                Youre all caught up! New alerts will appear here.
              </Text>
            </View>
          ) : (
            notificationsList.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  !notification.read && styles.unreadNotification,
                ]}
                onPress={() => markAsRead(notification.id)}
              >
                <View style={[styles.notificationIcon, { backgroundColor: `${notification.color}20` }]}>
                  <Ionicons name={notification.icon as any} size={20} color={notification.color} />
                </View>
                
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    {!notification.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>

                <Ionicons name="chevron-forward" size={16} color="#666" />
              </TouchableOpacity>
            ))
          )}
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
  clearText: {
    color: '#00FF88',
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
  unreadBadge: {
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unreadText: {
    color: '#F87171',
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2D4A3A',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    color: '#aaa',
    fontSize: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2D4A3A',
  },
  unreadNotification: {
    backgroundColor: 'rgba(0, 255, 136, 0.05)',
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
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
    marginBottom: 4,
    lineHeight: 18,
  },
  notificationTime: {
    color: '#666',
    fontSize: 12,
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
});
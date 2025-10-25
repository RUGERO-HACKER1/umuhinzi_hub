import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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
  },
];

export default function AlertsScreen() {
  const router = useRouter();
  const [alertsList, setAlertsList] = useState(alerts);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredAlerts = filter === 'unread' 
    ? alertsList.filter(alert => !alert.read)
    : alertsList;

  const markAsRead = (id: string) => {
    setAlertsList(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  const markAllAsRead = () => {
    setAlertsList(prev =>
      prev.map(alert => ({ ...alert, read: true }))
    );
    Alert.alert('Success', 'All alerts marked as read');
  };

  const deleteAlert = (id: string) => {
    setAlertsList(prev => prev.filter(alert => alert.id !== id));
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#F87171';
      case 'medium': return '#FCD34D';
      case 'low': return '#00FF88';
      default: return '#aaa';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'disease': return '🦠';
      case 'weather': return '🌧️';
      case 'pest': return '🐛';
      case 'market': return '📊';
      case 'system': return '📱';
      default: return '📢';
    }
  };

  const unreadCount = alertsList.filter(alert => !alert.read).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alerts & Warnings</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markReadText}>Mark All Read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Alert Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: 'rgba(248, 113, 113, 0.2)' }]}>
              <Ionicons name="warning" size={24} color="#F87171" />
            </View>
            <View style={styles.summaryText}>
              <Text style={styles.summaryNumber}>
                {alertsList.filter(a => a.severity === 'high').length}
              </Text>
              <Text style={styles.summaryLabel}>High Priority</Text>
            </View>
          </View>

          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: 'rgba(252, 211, 77, 0.2)' }]}>
              <Ionicons name="notifications" size={24} color="#FCD34D" />
            </View>
            <View style={styles.summaryText}>
              <Text style={styles.summaryNumber}>{unreadCount}</Text>
              <Text style={styles.summaryLabel}>Unread</Text>
            </View>
          </View>

          <View style={styles.summaryItem}>
            <View style={[styles.summaryIcon, { backgroundColor: 'rgba(0, 255, 136, 0.2)' }]}>
              <Ionicons name="calendar" size={24} color="#00FF88" />
            </View>
            <View style={styles.summaryText}>
              <Text style={styles.summaryNumber}>{alertsList.length}</Text>
              <Text style={styles.summaryLabel}>Total</Text>
            </View>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === 'all' && styles.filterTabActive,
            ]}
            onPress={() => setFilter('all')}
          >
            <Text style={[
              styles.filterTabText,
              filter === 'all' && styles.filterTabTextActive,
            ]}>
              All Alerts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterTab,
              filter === 'unread' && styles.filterTabActive,
            ]}
            onPress={() => setFilter('unread')}
          >
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
            <Text style={[
              styles.filterTabText,
              filter === 'unread' && styles.filterTabTextActive,
            ]}>
              Unread
            </Text>
          </TouchableOpacity>
        </View>

        {/* Alerts List */}
        <View style={styles.alertsList}>
          {filteredAlerts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-done" size={48} color="#666" />
              <Text style={styles.emptyTitle}>
                {filter === 'unread' ? 'No Unread Alerts' : 'No Alerts'}
              </Text>
              <Text style={styles.emptyDescription}>
                {filter === 'unread' 
                  ? 'You\'re all caught up! New alerts will appear here.'
                  : 'No alerts to display at this time.'
                }
              </Text>
            </View>
          ) : (
            filteredAlerts.map((alert) => (
              <View
                key={alert.id}
                style={[
                  styles.alertCard,
                  !alert.read && styles.alertCardUnread,
                ]}
              >
                <View style={styles.alertHeader}>
                  <View style={styles.alertTitleSection}>
                    <View style={styles.alertType}>
                      <Text style={styles.typeIcon}>{getTypeIcon(alert.type)}</Text>
                      <Text style={styles.alertTitle}>{alert.title}</Text>
                    </View>
                    <View style={styles.alertMeta}>
                      <Text style={styles.alertCrop}>{alert.crop}</Text>
                      <Text style={styles.alertDate}>{alert.date}</Text>
                    </View>
                  </View>

                  <View style={styles.alertSeverity}>
                    <Text style={styles.severityIcon}>{getSeverityIcon(alert.severity)}</Text>
                    <Text style={[
                      styles.severityText,
                      { color: getSeverityColor(alert.severity) }
                    ]}>
                      {alert.severity}
                    </Text>
                  </View>
                </View>

                <View style={styles.alertContent}>
                  <Text style={styles.alertDescription}>{alert.description}</Text>
                  
                  <View style={styles.actionSection}>
                    <View style={styles.actionRequired}>
                      <Ionicons name="flash" size={16} color="#FCD34D" />
                      <Text style={styles.actionLabel}>Action Required:</Text>
                      <Text style={styles.actionText}>{alert.action}</Text>
                    </View>
                  </View>

                  <View style={styles.alertActions}>
                    {!alert.read && (
                      <TouchableOpacity
                        style={styles.markReadButton}
                        onPress={() => markAsRead(alert.id)}
                      >
                        <Ionicons name="checkmark" size={16} color="#00FF88" />
                        <Text style={styles.markReadText}>Mark Read</Text>
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity
                      style={styles.askAuraButton}
                      onPress={() => router.push('/chat')}
                    >
                      <Ionicons name="chatbubble" size={16} color="#60A5FA" />
                      <Text style={styles.askAuraText}>Ask AURA</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteAlert(alert.id)}
                    >
                      <Ionicons name="trash" size={16} color="#F87171" />
                    </TouchableOpacity>
                  </View>
                </View>

                {!alert.read && <View style={styles.unreadIndicator} />}
              </View>
            ))
          )}
        </View>

        {/* Alert Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Alert Management Tips</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color="#00FF88" />
              <Text style={styles.tipText}>Review alerts daily for timely actions</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color="#00FF88" />
              <Text style={styles.tipText}>High severity alerts require immediate attention</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color="#00FF88" />
              <Text style={styles.tipText}>Use AURA chat for personalized advice</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color="#00FF88" />
              <Text style={styles.tipText}>Keep alert notifications enabled for critical warnings</Text>
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
  markReadText: {
    color: '#00FF88',
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 15,
  },
  summaryCard: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryText: {
    alignItems: 'center',
  },
  summaryNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  summaryLabel: {
    color: '#aaa',
    fontSize: 12,
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#2C2B3E',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  filterTabActive: {
    backgroundColor: '#1E261E',
  },
  filterTabText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
  },
  filterTabTextActive: {
    color: '#fff',
  },
  unreadBadge: {
    backgroundColor: '#F87171',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  unreadBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  alertsList: {
    gap: 12,
    marginBottom: 20,
  },
  alertCard: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  alertCardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: '#00FF88',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  alertTitleSection: {
    flex: 1,
  },
  alertType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  typeIcon: {
    fontSize: 16,
  },
  alertTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  alertCrop: {
    color: '#00FF88',
    fontSize: 12,
    fontWeight: '600',
  },
  alertDate: {
    color: '#888',
    fontSize: 12,
  },
  alertSeverity: {
    alignItems: 'center',
    gap: 4,
  },
  severityIcon: {
    fontSize: 12,
  },
  severityText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  alertContent: {
    gap: 12,
  },
  alertDescription: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 20,
  },
  actionSection: {
    backgroundColor: 'rgba(252, 211, 77, 0.1)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FCD34D',
  },
  actionRequired: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  actionLabel: {
    color: '#FCD34D',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 4,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    lineHeight: 18,
  },
  alertActions: {
    flexDirection: 'row',
    gap: 12,
  },
  markReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00FF88',
  },
  askAuraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(96, 165, 250, 0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#60A5FA',
    flex: 1,
    justifyContent: 'center',
  },
  askAuraText: {
    color: '#60A5FA',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F87171',
  },
  unreadIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF88',
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
  tipsCard: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  tipsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  tipsList: {
    gap: 12,
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
});
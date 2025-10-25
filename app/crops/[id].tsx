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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Mock crop data - in real app, this would come from API
const cropData = {
  '1': {
    id: '1',
    name: 'Maize Field 1',
    type: 'Maize',
    variety: 'Hybrid 621',
    plantingDate: '15/03/2024',
    area: '2.5',
    unit: 'acres',
    location: 'North Field',
    soilType: 'Loam',
    stage: 'Flowering',
    health: 'Good',
    notes: 'Planted during rainy season. Good germination rate.',
    activities: [
      { id: '1', type: 'Planting', date: '15/03/2024', notes: 'Seeds planted with fertilizer' },
      { id: '2', type: 'Weeding', date: '30/03/2024', notes: 'First weeding completed' },
      { id: '3', type: 'Fertilizing', date: '15/04/2024', notes: 'NPK fertilizer applied' },
    ],
    nextTasks: [
      { id: '1', task: 'Watering', dueIn: 2, priority: 'high' },
      { id: '2', task: 'Pest Control', dueIn: 5, priority: 'medium' },
    ]
  },
  '2': {
    id: '2',
    name: 'Beans Garden',
    type: 'Beans',
    variety: 'Red Kidney',
    plantingDate: '01/04/2024',
    area: '0.5',
    unit: 'acres',
    location: 'Backyard',
    soilType: 'Sandy Loam',
    stage: 'Vegetative',
    health: 'Excellent',
    notes: 'Organic farming. No chemicals used.',
    activities: [
      { id: '1', type: 'Planting', date: '01/04/2024', notes: 'Direct seeding' },
    ],
    nextTasks: [
      { id: '1', task: 'Fertilizing', dueIn: 1, priority: 'high' },
    ]
  }
};

export default function CropDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const crop = cropData[id as string];

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!crop) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#00FF88" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Crop Not Found</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.container}>
          <View style={styles.errorCard}>
            <Ionicons name="sad-outline" size={48} color="#F87171" />
            <Text style={styles.errorTitle}>Crop Not Found</Text>
            <Text style={styles.errorDescription}>
              The crop youre looking for doesnt exist or has been removed.
            </Text>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => router.back()}
            >
              <Text style={styles.primaryButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const handleDeleteCrop = () => {
    Alert.alert(
      'Delete Crop',
      `Are you sure you want to delete ${crop.name}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // In real app, call API to delete
            Alert.alert('Success', 'Crop deleted successfully');
            router.back();
          }
        },
      ]
    );
  };

  const getHealthColor = (health: string) => {
    switch (health.toLowerCase()) {
      case 'excellent': return '#00FF88';
      case 'good': return '#60A5FA';
      case 'fair': return '#FCD34D';
      case 'poor': return '#F87171';
      default: return '#aaa';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F87171';
      case 'medium': return '#FCD34D';
      case 'low': return '#60A5FA';
      default: return '#aaa';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{crop.name}</Text>
        <TouchableOpacity onPress={() => setShowDeleteConfirm(true)}>
          <Ionicons name="trash-outline" size={20} color="#F87171" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Crop Overview */}
        <View style={styles.card}>
          <View style={styles.cropHeader}>
            <View style={styles.cropIcon}>
              <MaterialCommunityIcons name="sprout" size={24} color="#00FF88" />
            </View>
            <View style={styles.cropBasicInfo}>
              <Text style={styles.cropName}>{crop.name}</Text>
              <Text style={styles.cropType}>{crop.type} • {crop.variety}</Text>
            </View>
            <View style={[styles.healthBadge, { backgroundColor: `${getHealthColor(crop.health)}20` }]}>
              <Text style={[styles.healthText, { color: getHealthColor(crop.health) }]}>
                {crop.health}
              </Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{crop.area} {crop.unit}</Text>
              <Text style={styles.statLabel}>Area</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{crop.stage}</Text>
              <Text style={styles.statLabel}>Growth Stage</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{crop.activities.length}</Text>
              <Text style={styles.statLabel}>Activities</Text>
            </View>
          </View>
        </View>

        {/* Basic Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Basic Information</Text>
          
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={16} color="#888" />
              <Text style={styles.infoLabel}>Planted:</Text>
              <Text style={styles.infoValue}>{crop.plantingDate}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={16} color="#888" />
              <Text style={styles.infoLabel}>Location:</Text>
              <Text style={styles.infoValue}>{crop.location}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="earth-outline" size={16} color="#888" />
              <Text style={styles.infoLabel}>Soil Type:</Text>
              <Text style={styles.infoValue}>{crop.soilType}</Text>
            </View>
          </View>

          {crop.notes && (
            <View style={styles.notesSection}>
              <Text style={styles.notesLabel}>Notes</Text>
              <Text style={styles.notesText}>{crop.notes}</Text>
            </View>
          )}
        </View>

        {/* Next Tasks */}
        {crop.nextTasks.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Next Tasks</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllLink}>View All</Text>
              </TouchableOpacity>
            </View>

            {crop.nextTasks.map((task) => (
              <TouchableOpacity key={task.id} style={styles.taskItem}>
                <View style={styles.taskInfo}>
                  <Text style={styles.taskName}>{task.task}</Text>
                  <Text style={styles.taskDue}>
                    Due in {task.dueIn} day{task.dueIn !== 1 ? 's' : ''}
                  </Text>
                </View>
                <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(task.priority)}20` }]}>
                  <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
                    {task.priority}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Recent Activities */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Recent Activities</Text>
            <TouchableOpacity onPress={() => router.push('/activities/new')}>
              <Text style={styles.viewAllLink}>Add New</Text>
            </TouchableOpacity>
          </View>

          {crop.activities.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="list-outline" size={32} color="#666" />
              <Text style={styles.emptyText}>No activities recorded</Text>
              <Text style={styles.emptySubtext}>Start by adding your first activity</Text>
            </View>
          ) : (
            crop.activities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons name="checkmark-circle" size={20} color="#00FF88" />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityType}>{activity.type}</Text>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                  {activity.notes && (
                    <Text style={styles.activityNotes}>{activity.notes}</Text>
                  )}
                </View>
              </View>
            ))
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => router.push('/activities/new')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(0, 255, 136, 0.2)' }]}>
                <Ionicons name="add-circle" size={24} color="#00FF88" />
              </View>
              <Text style={styles.quickActionText}>Record Activity</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => router.push('/scan')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(96, 165, 250, 0.2)' }]}>
                <Ionicons name="camera" size={24} color="#60A5FA" />
              </View>
              <Text style={styles.quickActionText}>Scan Health</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => Alert.alert('Edit Crop', 'Edit functionality would go here')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(252, 211, 77, 0.2)' }]}>
                <Ionicons name="create-outline" size={24} color="#FCD34D" />
              </View>
              <Text style={styles.quickActionText}>Edit Crop</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => router.push('/chat')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(139, 69, 19, 0.2)' }]}>
                <Ionicons name="chatbubble-ellipses" size={24} color="#8B4513" />
              </View>
              <Text style={styles.quickActionText}>Ask AURA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="warning" size={48} color="#F87171" />
            <Text style={styles.modalTitle}>Delete Crop</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete {crop.name}? This action cannot be undone.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.modalCancel}
                onPress={() => setShowDeleteConfirm(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalDelete}
                onPress={handleDeleteCrop}
              >
                <Text style={styles.modalDeleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    width: 20,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  errorCard: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginTop: 50,
  },
  errorTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  errorDescription: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllLink: {
    color: '#00FF88',
    fontSize: 14,
    fontWeight: '600',
  },
  cropHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cropIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cropBasicInfo: {
    flex: 1,
  },
  cropName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cropType: {
    color: '#aaa',
    fontSize: 14,
  },
  healthBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  healthText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#00FF88',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
  },
  infoGrid: {
    gap: 12,
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoLabel: {
    color: '#888',
    fontSize: 14,
    width: 80,
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  notesSection: {
    marginTop: 10,
  },
  notesLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  notesText: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 20,
    backgroundColor: '#2C2B3E',
    padding: 12,
    borderRadius: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2D4A3A',
  },
  taskInfo: {
    flex: 1,
  },
  taskName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskDue: {
    color: '#aaa',
    fontSize: 12,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2D4A3A',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityType: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityDate: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
  },
  activityNotes: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 18,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtext: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAction: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
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
  primaryButton: {
    backgroundColor: '#00FF88',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#0E1410',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  modalMessage: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalCancel: {
    flex: 1,
    backgroundColor: '#2C2B3E',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalCancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalDelete: {
    flex: 1,
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F87171',
  },
  modalDeleteText: {
    color: '#F87171',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
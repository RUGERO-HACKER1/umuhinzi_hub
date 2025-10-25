import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const emergencyContacts = [
  {
    id: '1',
    name: 'Emergency Helpline',
    number: '112',
    type: 'General Emergency',
    icon: 'emergency',
    color: '#F87171',
  },
  {
    id: '2',
    name: 'Agriculture Department',
    number: '0800-222-333',
    type: 'Crop Emergency',
    icon: 'leaf',
    color: '#00FF88',
  },
  {
    id: '3',
    name: 'Pest Control Unit',
    number: '0800-444-555',
    type: 'Pest Outbreak',
    icon: 'bug',
    color: '#FCD34D',
  },
  {
    id: '4',
    name: 'Veterinary Services',
    number: '0800-666-777',
    type: 'Livestock Emergency',
    icon: 'paw',
    color: '#60A5FA',
  },
];

const emergencyProcedures = [
  {
    id: '1',
    title: 'Pest Outbreak',
    steps: [
      'Isolate affected plants immediately',
      'Take photos for identification',
      'Contact agriculture extension officer',
      'Apply recommended treatment',
      'Monitor surrounding crops'
    ],
    icon: '🐛',
    color: '#FCD34D',
  },
  {
    id: '2',
    title: 'Crop Disease',
    steps: [
      'Stop irrigation to prevent spread',
      'Collect samples for testing',
      'Quarantine affected area',
      'Use approved fungicides',
      'Record symptoms and spread'
    ],
    icon: '🦠',
    color: '#F87171',
  },
  {
    id: '3',
    title: 'Weather Emergency',
    steps: [
      'Secure crops and equipment',
      'Harvest mature crops if possible',
      'Implement drainage measures',
      'Monitor weather updates',
      'Contact local authorities'
    ],
    icon: '⛈️',
    color: '#60A5FA',
  },
  {
    id: '4',
    title: 'Chemical Spill',
    steps: [
      'Evacuate area immediately',
      'Use protective equipment',
      'Contain the spill',
      'Ventilate the area',
      'Contact emergency services'
    ],
    icon: '⚠️',
    color: '#FF6B6B',
  },
];

export default function EmergencyScreen() {
  const router = useRouter();
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null);

  const handleCall = (number: string) => {
    Alert.alert(
      'Call Emergency',
      `Do you want to call ${number}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => Linking.openURL(`tel:${number}`)
        },
      ]
    );
  };

  const handleMessageAura = () => {
    router.push('/chat');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Assistance</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Emergency Alert Banner */}
        <View style={styles.alertBanner}>
          <View style={styles.alertIcon}>
            <Ionicons name="warning" size={32} color="#0E1410" />
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Emergency Mode Active</Text>
            <Text style={styles.alertSubtitle}>
              Immediate assistance and guidance available
            </Text>
          </View>
        </View>

        {/* Quick Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="call" size={20} color="#F87171" /> Emergency Contacts
          </Text>
          <Text style={styles.sectionSubtitle}>
            Tap to call emergency services immediately
          </Text>

          <View style={styles.contactsGrid}>
            {emergencyContacts.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={styles.contactCard}
                onPress={() => handleCall(contact.number)}
              >
                <View style={[styles.contactIcon, { backgroundColor: `${contact.color}20` }]}>
                  <Ionicons name={contact.icon as any} size={24} color={contact.color} />
                </View>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactType}>{contact.type}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
                <View style={styles.callButton}>
                  <Ionicons name="call" size={16} color="#fff" />
                  <Text style={styles.callButtonText}>Call Now</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emergency Procedures */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="medical" size={20} color="#00FF88" /> Emergency Procedures
          </Text>
          <Text style={styles.sectionSubtitle}>
            Follow these steps for common emergency situations
          </Text>

          {emergencyProcedures.map((procedure) => (
            <TouchableOpacity
              key={procedure.id}
              style={styles.procedureCard}
              onPress={() => setSelectedProcedure(
                selectedProcedure === procedure.id ? null : procedure.id
              )}
            >
              <View style={styles.procedureHeader}>
                <View style={styles.procedureTitleSection}>
                  <Text style={styles.procedureIcon}>{procedure.icon}</Text>
                  <View>
                    <Text style={styles.procedureTitle}>{procedure.title}</Text>
                    <Text style={styles.procedureSubtitle}>
                      {procedure.steps.length} emergency steps
                    </Text>
                  </View>
                </View>
                <Ionicons 
                  name={selectedProcedure === procedure.id ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#aaa" 
                />
              </View>

              {selectedProcedure === procedure.id && (
                <View style={styles.procedureSteps}>
                  {procedure.steps.map((step, index) => (
                    <View key={index} style={styles.stepItem}>
                      <View style={[styles.stepNumber, { backgroundColor: procedure.color }]}>
                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="flash" size={20} color="#60A5FA" /> Quick Actions
          </Text>

          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickAction}
              onPress={handleMessageAura}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(0, 255, 136, 0.2)' }]}>
                <Ionicons name="chatbubble-ellipses" size={24} color="#00FF88" />
              </View>
              <Text style={styles.quickActionText}>Message AURA</Text>
              <Text style={styles.quickActionSubtext}>Get AI Assistance</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => router.push('/scan')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(96, 165, 250, 0.2)' }]}>
                <Ionicons name="camera" size={24} color="#60A5FA" />
              </View>
              <Text style={styles.quickActionText}>Scan Problem</Text>
              <Text style={styles.quickActionSubtext}>Identify Issue</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => Linking.openURL('sms:?body=EMERGENCY: Need immediate agricultural assistance')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(248, 113, 113, 0.2)' }]}>
                <Ionicons name="alert-circle" size={24} color="#F87171" />
              </View>
              <Text style={styles.quickActionText}>Send Alert</Text>
              <Text style={styles.quickActionSubtext}>Quick SMS</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickAction}
              onPress={() => router.push('/pests')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(252, 211, 77, 0.2)' }]}>
                <MaterialCommunityIcons name="bug" size={24} color="#FCD34D" />
              </View>
              <Text style={styles.quickActionText}>Pest Library</Text>
              <Text style={styles.quickActionSubtext}>Identify Pests</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Safety Information */}
        <View style={styles.safetyCard}>
          <View style={styles.safetyHeader}>
            <Ionicons name="shield-checkmark" size={24} color="#00FF88" />
            <Text style={styles.safetyTitle}>Safety First</Text>
          </View>
          <View style={styles.safetyTips}>
            <View style={styles.safetyTip}>
              <Ionicons name="checkmark-circle" size={16} color="#00FF88" />
              <Text style={styles.safetyTipText}>Wear protective equipment when handling chemicals</Text>
            </View>
            <View style={styles.safetyTip}>
              <Ionicons name="checkmark-circle" size={16} color="#00FF88" />
              <Text style={styles.safetyTipText}>Keep emergency numbers saved in your phone</Text>
            </View>
            <View style={styles.safetyTip}>
              <Ionicons name="checkmark-circle" size={16} color="#00FF88" />
              <Text style={styles.safetyTipText}>Have a first aid kit readily available</Text>
            </View>
            <View style={styles.safetyTip}>
              <Ionicons name="checkmark-circle" size={16} color="#00FF88" />
              <Text style={styles.safetyTipText}>Know the location of nearest medical facility</Text>
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
    padding: 16,
  },
  alertBanner: {
    backgroundColor: '#FCD34D',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIcon: {
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    color: '#0E1410',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  alertSubtitle: {
    color: '#0E1410',
    fontSize: 14,
    opacity: 0.8,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionSubtitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  contactsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  contactCard: {
    width: '48%',
    backgroundColor: '#1E261E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D4A3A',
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  contactType: {
    color: '#aaa',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 8,
  },
  contactNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  callButton: {
    backgroundColor: '#F87171',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  procedureCard: {
    backgroundColor: '#1E261E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2D4A3A',
  },
  procedureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  procedureTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  procedureIcon: {
    fontSize: 24,
  },
  procedureTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  procedureSubtitle: {
    color: '#aaa',
    fontSize: 12,
  },
  procedureSteps: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2D4A3A',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickAction: {
    width: '48%',
    backgroundColor: '#1E261E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionSubtext: {
    color: '#aaa',
    fontSize: 11,
    textAlign: 'center',
  },
  safetyCard: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2D4A3A',
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  safetyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  safetyTips: {
    gap: 12,
  },
  safetyTip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  safetyTipText: {
    color: '#aaa',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
});
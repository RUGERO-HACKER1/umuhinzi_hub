import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewActivityScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    type: '',
    crop: '',
    date: new Date(),
    duration: '',
    notes: '',
    cost: '',
    workers: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const activityTypes = [
    'Plowing', 'Planting', 'Watering', 'Fertilizing', 'Weeding',
    'Spraying', 'Pruning', 'Harvesting', 'Soil Testing', 'Other'
  ];

  const crops = ['Maize Field 1', 'Beans Garden', 'Coffee Plantation', 'Vegetable Patch'];

  const handleSave = () => {
    if (!form.type) {
      Alert.alert('Missing Information', 'Please select an activity type.');
      return;
    }

    Alert.alert(
      'Activity Recorded',
      `${form.type} activity has been saved!`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const updateForm = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      updateForm('date', selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Record Activity</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activity Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Activity Type *</Text>
            <View style={styles.typeGrid}>
              {activityTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    form.type === type && styles.typeButtonSelected,
                  ]}
                  onPress={() => updateForm('type', type)}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      form.type === type && styles.typeButtonTextSelected,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Crop/Field</Text>
            <View style={styles.cropGrid}>
              {crops.map((crop) => (
                <TouchableOpacity
                  key={crop}
                  style={[
                    styles.cropButton,
                    form.crop === crop && styles.cropButtonSelected,
                  ]}
                  onPress={() => updateForm('crop', crop)}
                >
                  <Text
                    style={[
                      styles.cropButtonText,
                      form.crop === crop && styles.cropButtonTextSelected,
                    ]}
                  >
                    {crop}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date & Time</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color="#00FF88" />
              <Text style={styles.dateText}>
                {form.date.toLocaleDateString()} at {form.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={form.date}
                mode="datetime"
                onChange={onDateChange}
              />
            )}
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Duration (hours)</Text>
              <TextInput
                style={styles.input}
                placeholder="2.5"
                value={form.duration}
                onChangeText={(value) => updateForm('duration', value)}
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Workers</Text>
              <TextInput
                style={styles.input}
                placeholder="3"
                value={form.workers}
                onChangeText={(value) => updateForm('workers', value)}
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cost (UGX)</Text>
            <TextInput
              style={styles.input}
              placeholder="15,000"
              value={form.cost}
              onChangeText={(value) => updateForm('cost', value)}
              placeholderTextColor="#666"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the activity, observations, or results..."
              value={form.notes}
              onChangeText={(value) => updateForm('notes', value)}
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.primaryButton,
              !form.type && styles.primaryButtonDisabled
            ]}
            onPress={handleSave}
            disabled={!form.type}
          >
            <Ionicons name="checkmark-circle" size={20} color="#0E1410" />
            <Text style={styles.primaryButtonText}>Save Activity</Text>
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
  placeholder: {
    width: 34,
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2C2B3E',
    borderRadius: 12,
    padding: 15,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  textArea: {
    minHeight: 100,
  },
  row: {
    flexDirection: 'row',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#2C2B3E',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  typeButtonSelected: {
    backgroundColor: '#00FF88',
    borderColor: '#00FF88',
  },
  typeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  typeButtonTextSelected: {
    color: '#0E1410',
    fontWeight: 'bold',
  },
  cropGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cropButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#2C2B3E',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cropButtonSelected: {
    backgroundColor: '#60A5FA',
    borderColor: '#60A5FA',
  },
  cropButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  cropButtonTextSelected: {
    color: '#0E1410',
    fontWeight: 'bold',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2B3E',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    gap: 12,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#00FF88',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: '#0E1410',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#2C2B3E',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
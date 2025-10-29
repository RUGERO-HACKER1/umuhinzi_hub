import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NewCropScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    type: '',
    variety: '',
    plantingDate: '',
    area: '',
    location: '',
    soilType: '',
    notes: '',
    remindersEnabled: true,
  });

  const cropTypes = ['Maize', 'Beans', 'Coffee', 'Potatoes', 'Bananas', 'Vegetables', 'Fruits', 'Other'];

  const handleSave = () => {
    if (!form.name || !form.type) {
      Alert.alert('Missing Information', 'Please fill in at least crop name and type.');
      return;
    }

    // Simulate saving
    Alert.alert(
      'Crop Added',
      `${form.name} has been added to your farm!`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const updateForm = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Crop</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Crop Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Crop Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Maize Field 1"
              value={form.name}
              onChangeText={(value) => updateForm('name', value)}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Crop Type *</Text>
            <View style={styles.typeGrid}>
              {cropTypes.map((type) => (
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
            <Text style={styles.label}>Variety (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Hybrid 621"
              value={form.variety}
              onChangeText={(value) => updateForm('variety', value)}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Planting Date</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              value={form.plantingDate}
              onChangeText={(value) => updateForm('plantingDate', value)}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Area (Acres/Ha)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 2.5"
                value={form.area}
                onChangeText={(value) => updateForm('area', value)}
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Soil Type</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Loam"
                value={form.soilType}
                onChangeText={(value) => updateForm('soilType', value)}
                placeholderTextColor="#666"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location/Field</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., North Field"
              value={form.location}
              onChangeText={(value) => updateForm('location', value)}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Additional notes about this crop..."
              value={form.notes}
              onChangeText={(value) => updateForm('notes', value)}
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.switchGroup}>
            <View>
              <Text style={styles.label}>Enable Reminders</Text>
              <Text style={styles.switchSubtitle}>Get notifications for important tasks</Text>
            </View>
            <Switch
              value={form.remindersEnabled}
              onValueChange={(value) => updateForm('remindersEnabled', value)}
              trackColor={{ false: '#767577', true: 'rgba(0, 255, 136, 0.5)' }}
              thumbColor={form.remindersEnabled ? '#00FF88' : '#f4f3f4'}
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
              (!form.name || !form.type) && styles.primaryButtonDisabled
            ]}
            onPress={handleSave}
            disabled={!form.name || !form.type}
          >
            <Ionicons name="save-outline" size={20} color="#0E1410" />
            <Text style={styles.primaryButtonText}>Save Crop</Text>
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
  switchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  switchSubtitle: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
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
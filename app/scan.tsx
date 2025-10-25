import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function ScanScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleTakePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant camera access to take photos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        setAnalysisResult(null);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const handlePickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant photo library access.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
        setAnalysisResult(null);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const analyzeImage = () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const results = {
        plantType: 'Maize',
        confidence: '92%',
        health: 'Good',
        issues: [
          {
            type: 'pest',
            name: 'Fall Armyworm',
            confidence: '85%',
            description: 'Small holes in leaves, visible larvae',
            treatment: 'Apply neem oil or recommended pesticide'
          },
          {
            type: 'nutrient',
            name: 'Nitrogen Deficiency',
            confidence: '78%',
            description: 'Yellowing of lower leaves',
            treatment: 'Apply nitrogen-rich fertilizer'
          }
        ],
        recommendations: [
          'Monitor for increased pest activity',
          'Test soil nutrients',
          'Consider crop rotation next season'
        ]
      };

      setAnalysisResult(results);
      setIsAnalyzing(false);
    }, 3000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plant Scan</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Scan Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Scan Plant Health</Text>
          <Text style={styles.cardSubtitle}>
            Take a photo of your plant leaves to detect diseases, pests, and nutrient deficiencies
          </Text>

          {!selectedImage ? (
            <View style={styles.scanOptions}>
              <TouchableOpacity style={styles.scanOption} onPress={handleTakePhoto}>
                <View style={[styles.scanIcon, { backgroundColor: 'rgba(0, 255, 136, 0.2)' }]}>
                  <Ionicons name="camera" size={32} color="#00FF88" />
                </View>
                <Text style={styles.scanOptionTitle}>Take Photo</Text>
                <Text style={styles.scanOptionDesc}>Use camera to capture plant</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.scanOption} onPress={handlePickImage}>
                <View style={[styles.scanIcon, { backgroundColor: 'rgba(96, 165, 250, 0.2)' }]}>
                  <Ionicons name="image" size={32} color="#60A5FA" />
                </View>
                <Text style={styles.scanOptionTitle}>Choose from Gallery</Text>
                <Text style={styles.scanOptionDesc}>Select existing photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.imagePreview}>
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
              
              <View style={styles.imageActions}>
                <TouchableOpacity style={styles.imageAction} onPress={clearImage}>
                  <Ionicons name="close-circle" size={20} color="#F87171" />
                  <Text style={styles.imageActionText}>Retake</Text>
                </TouchableOpacity>
                
                {!analysisResult && (
                  <TouchableOpacity 
                    style={styles.analyzeButton}
                    onPress={analyzeImage}
                    disabled={isAnalyzing}
                  >
                    <Ionicons name="scan" size={20} color="#0E1410" />
                    <Text style={styles.analyzeButtonText}>
                      {isAnalyzing ? 'Analyzing...' : 'Analyze Plant'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>

        {/* Analysis Results */}
        {isAnalyzing && (
          <View style={styles.card}>
            <View style={styles.analyzingContainer}>
              <Ionicons name="leaf" size={48} color="#00FF88" />
              <Text style={styles.analyzingTitle}>AURA is Analyzing</Text>
              <Text style={styles.analyzingSubtitle}>Checking for diseases, pests, and nutrient issues...</Text>
              <View style={styles.loadingDots}>
                <View style={[styles.dot, styles.dot1]} />
                <View style={[styles.dot, styles.dot2]} />
                <View style={[styles.dot, styles.dot3]} />
              </View>
            </View>
          </View>
        )}

        {analysisResult && (
          <View style={styles.resultsContainer}>
            {/* Plant Identification */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Plant Identification</Text>
              <View style={styles.plantInfo}>
                <View style={styles.plantBadge}>
                  <Text style={styles.plantName}>{analysisResult.plantType}</Text>
                  <Text style={styles.confidence}>{analysisResult.confidence} confidence</Text>
                </View>
                <View style={[styles.healthBadge, { 
                  backgroundColor: analysisResult.health === 'Good' ? 'rgba(0, 255, 136, 0.2)' : 
                                 analysisResult.health === 'Fair' ? 'rgba(252, 211, 77, 0.2)' : 
                                 'rgba(248, 113, 113, 0.2)' 
                }]}>
                  <Text style={[styles.healthText, {
                    color: analysisResult.health === 'Good' ? '#00FF88' : 
                           analysisResult.health === 'Fair' ? '#FCD34D' : 
                           '#F87171'
                  }]}>
                    {analysisResult.health} Health
                  </Text>
                </View>
              </View>
            </View>

            {/* Detected Issues */}
            {analysisResult.issues.length > 0 && (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Detected Issues</Text>
                  <Text style={styles.issuesCount}>{analysisResult.issues.length} found</Text>
                </View>

                {analysisResult.issues.map((issue: any, index: number) => (
                  <View key={index} style={styles.issueItem}>
                    <View style={styles.issueHeader}>
                      <View style={styles.issueType}>
                        <Ionicons 
                          name={issue.type === 'pest' ? 'bug' : 'nutrition'} 
                          size={16} 
                          color="#F87171" 
                        />
                        <Text style={styles.issueName}>{issue.name}</Text>
                      </View>
                      <Text style={styles.issueConfidence}>{issue.confidence}</Text>
                    </View>
                    <Text style={styles.issueDescription}>{issue.description}</Text>
                    <View style={styles.treatment}>
                      <Text style={styles.treatmentLabel}>Treatment:</Text>
                      <Text style={styles.treatmentText}>{issue.treatment}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Recommendations */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>AURA Recommendations</Text>
              {analysisResult.recommendations.map((rec: string, index: number) => (
                <View key={index} style={styles.recommendationItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#00FF88" />
                  <Text style={styles.recommendationText}>{rec}</Text>
                </View>
              ))}
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={clearImage}
              >
                <Text style={styles.secondaryButtonText}>Scan Another</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => router.push('/chat')}
              >
                <Ionicons name="chatbubble-ellipses" size={20} color="#0E1410" />
                <Text style={styles.primaryButtonText}>Ask AURA</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Tips */}
        {!selectedImage && !analysisResult && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Scanning Tips</Text>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <Ionicons name="sunny" size={20} color="#FCD34D" />
                <Text style={styles.tipText}>Take photos in good lighting</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="crop" size={20} color="#00FF88" />
                <Text style={styles.tipText}>Focus on affected leaves or areas</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="camera" size={20} color="#60A5FA" />
                <Text style={styles.tipText}>Keep camera steady for clear images</Text>
              </View>
              <View style={styles.tipItem}>
                <Ionicons name="leaf" size={20} color="#00FF88" />
                <Text style={styles.tipText}>Include both healthy and affected parts</Text>
              </View>
            </View>
          </View>
        )}
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
    marginBottom: 8,
  },
  cardSubtitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  scanOptions: {
    flexDirection: 'row',
    gap: 15,
  },
  scanOption: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2C2B3E',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderStyle: 'dashed',
  },
  scanIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  scanOptionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  scanOptionDesc: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
  imagePreview: {
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 15,
  },
  imageActions: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
  },
  imageAction: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#2C2B3E',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  imageActionText: {
    color: '#F87171',
    fontSize: 14,
    fontWeight: '600',
  },
  analyzeButton: {
    flex: 2,
    backgroundColor: '#00FF88',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  analyzeButtonText: {
    color: '#0E1410',
    fontSize: 14,
    fontWeight: 'bold',
  },
  analyzingContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  analyzingTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  analyzingSubtitle: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00FF88',
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.6,
  },
  dot3: {
    opacity: 0.8,
  },
  resultsContainer: {
    gap: 15,
  },
  plantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plantBadge: {
    alignItems: 'flex-start',
  },
  plantName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  confidence: {
    color: '#aaa',
    fontSize: 12,
  },
  healthBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  healthText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  issuesCount: {
    color: '#F87171',
    fontSize: 14,
    fontWeight: '600',
  },
  issueItem: {
    backgroundColor: '#2C2B3E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  issueType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  issueName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  issueConfidence: {
    color: '#F87171',
    fontSize: 12,
    fontWeight: '600',
  },
  issueDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 18,
  },
  treatment: {
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F87171',
  },
  treatmentLabel: {
    color: '#F87171',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  treatmentText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 18,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
    padding: 12,
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    borderRadius: 8,
  },
  recommendationText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#2C2B3E',
    borderRadius: 8,
  },
  tipText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
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
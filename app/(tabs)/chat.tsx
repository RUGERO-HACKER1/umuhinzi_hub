import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

interface Message {
  id: number;
  type: 'ai' | 'user';
  text: string;
  image?: string;
  timestamp: Date;
}

const { width } = Dimensions.get('window');

export default function AuraFarmerChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      text: 'Muraho! 🌱 I\'m your farming assistant. Ask me about crops, pests, diseases, or farming techniques.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState('Kinyarwanda');
  const [showLanguages, setShowLanguages] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const languages = [
    { code: 'Kinyarwanda', name: 'Kinyarwanda' },
    { code: 'English', name: 'English' },
    { code: 'French', name: 'French' },
    { code: 'Swahili', name: 'Swahili' }
  ];

  // Auto scroll to bottom when 
  //  message
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isProcessing]);

  // Close language dropdown when tapping outside
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (showLanguages) {
        setShowLanguages(false);
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [showLanguages]);

  const handleVoiceInput = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant microphone permission to use voice input');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording:', err);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        
        const uri = recording.getURI();
        setRecording(null);
        setIsRecording(false);
        
        // Simulate speech-to-text conversion with language-specific responses
        const speechText = getVoiceInputByLanguage(language);
        setInputText(prev => prev ? `${prev} ${speechText}` : speechText);
        
        // Show success feedback
        Alert.alert(
          'Voice Recorded', 
          `Voice message converted to text in ${language}`,
          [{ text: 'OK' }]
        );
      }
    } catch (err) {
      console.error('Failed to stop recording:', err);
      Alert.alert('Error', 'Failed to process recording');
      setIsRecording(false);
    }
  };

  const getVoiceInputByLanguage = (currentLanguage: string) => {
    const prompts = {
      'Kinyarwanda': 'Nkeneye ubufasha ku bicurashwe byanjye',
      'English': 'I need help with my crops',
      'French': 'J\'ai besoin d\'aide avec mes cultures',
      'Swahili': 'Nahitaji usaidizi kuhusu mazao yangu'
    };
    return prompts[currentLanguage as keyof typeof prompts] || prompts.English;
  };

  const handleImagePick = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant photo library access to select images');
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
      }
    } catch (err) {
      console.error('Error picking image:', err);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleCameraLaunch = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant camera access to take photos');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error('Error launching camera:', err);
      Alert.alert('Error', 'Failed to launch camera');
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const simulateAIResponse = (userMessage: string, hasImage: boolean) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      let aiResponse = '';
      const currentLang = language;
      
      // Language-specific responses
      const responses = {
        Kinyarwanda: {
          image: `Narebye ifoto yawe. Mbona:\n\n• Ibimera biremba\n• Hari ibibazo by'inzoka ku mpande\n• Ubutaka bumeze neza\n\nInama: Raba neza kandi wandike udufunguro tw'umuti n'ubwo byarushije. Ushaka inama zigufi?`,
          maize: `Kubera ingano:\n\n• Intera: 75cm x 25cm\n• Ifumbire: NPK 17-17-17 mu butaka\n• Amazi buri gihe mu ibyatsi\n• Raba inzoka z'ingano\n\nUkeneye ibindi?`,
          pest: `Uburyo bwo kurwanya inzoka:\n\n• Kuraba imyaka buri gihe\n• Koresha ifunguro ry'inzoka\n• Amavuta ya neem nk'umuti\n• Imiti nk'umwihariko\n\nNi izoka kihe?`,
          disease: `Indwara z'ibimera:\n\n• Ifunguro - koresha umuti\n• Uburwayi bw'inyongera - kuraho ibimera\n• Indwara z'udukoko - kuzitira inzoka\n• Gufungura - kongera amazi\n\nSobanura ibimenyetso byawe?`,
          default: `Ndabizi ko uvuga ku "${userMessage}".\n\nInama zanjye:\n• Gutegura neza ubutaka\n• Kurondora intera nziza\n• Gukoresha ifumbire\n• Kuraba inzoka buri gihe\n\nWashobora kumbwira ibindi?`
        },
        English: {
          image: `I've analyzed your image. Based on what I can see:\n\n• Leaf discoloration detected\n• Possible pest damage on edges\n• Soil moisture appears adequate\n\nRecommendation: Monitor closely and consider applying organic pesticide if condition worsens. Would you like specific treatment options?`,
          maize: `For maize cultivation:\n\n• Plant spacing: 75cm x 25cm\n• Fertilizer: NPK 17-17-17 at planting\n• Water regularly during flowering\n• Watch for fall armyworm\n\nNeed more details on any point?`,
          pest: `Pest management strategies:\n\n• Regular field monitoring\n• Use insect traps\n• Neem oil as organic option\n• Chemical pesticides as last resort\n\nWhat specific pest are you dealing with?`,
          disease: `Common crop diseases:\n\n• Fungal infections - use fungicide\n• Bacterial wilt - remove infected plants\n• Viral diseases - control insect vectors\n• Root rot - improve drainage\n\nDescribe your crop symptoms?`,
          default: `I understand you're asking about "${userMessage}".\n\nHere's my advice:\n• Proper soil preparation\n• Follow recommended spacing\n• Apply balanced fertilizer\n• Monitor for pests regularly\n\nCould you provide more details?`
        },
        French: {
          image: `J'ai analysé votre image. Ce que je vois:\n\n• Décoloration des feuilles détectée\n• Dommages possibles des ravageurs sur les bords\n• L'humidité du sol semble adéquate\n\nRecommandation: Surveillez de près et appliquez un pesticide organique si nécessaire. Voulez-vous des options de traitement spécifiques?`,
          maize: `Pour la culture du maïs:\n\n• Espacement: 75cm x 25cm\n• Engrais: NPK 17-17-17 à la plantation\n• Arrosage régulier pendant la floraison\n• Surveillez la légionnaire\n\nBesoin de plus de détails?`,
          pest: `Stratégies de gestion des ravageurs:\n\n• Surveillance régulière du champ\n• Utilisez des pièges à insectes\n• Huile de neem comme option biologique\n• Pesticides chimiques en dernier recours\n\nQuel ravageur spécifique?`,
          disease: `Maladies courantes des cultures:\n\n• Infections fongiques - fongicide\n• Flétrissement bactérien - retirez les plantes\n• Maladies virales - contrôlez les vecteurs\n• Pourriture des racines - améliorez le drainage\n\nDécrivez vos symptômes?`,
          default: `Je comprends que vous demandez "${userMessage}".\n\nMes conseils:\n• Bonne préparation du sol\n• Respectez l'espacement recommandé\n• Appliquez un engrais équilibré\n• Surveillez régulièrement les ravageurs\n\nPouvez-vous fournir plus de détails?`
        },
        Swahili: {
          image: `Nimechambua picha yako. Kulingana na ninaweza kuona:\n\n• Rangi ya majani imebadilika\n• Uwezekano wa madhara ya wadudu kwenye kingo\n• Unyevu wa udongo unaonekana wa kutosha\n\nMapendekezo: Fuatilia kwa karibu na zingatia kutumia dawa ya wadudu ya asili. Unataka chaguzi maalum za matibabu?`,
          maize: `Kwa kilimo cha mahindi:\n\n• Nafasi ya kupanda: 75cm x 25cm\n• Mboji: NPK 17-17-17 wakati wa kupanda\n• Maji mara kwa mara wakati wa ua\n• Angalia wadudu wa mahindi\n\nUnahitaji maelezo zaidi?`,
          pest: `Mbinu za kudhibiti wadudu:\n\n• Ufuatiliaji wa shamba mara kwa mara\n• Tumia mitego ya wadudu\n• Mafuta ya neem kama chaguo asilia\n• Dawa za wadudu kama suluhisho la mwisho\n\nUnashughulika na wadudu gani maalum?`,
          disease: `Magonjwa ya kawaida ya mazao:\n\n• Maambukizo ya kuvu - tumia dawa ya kuvu\n• Uyabisi wa bakteria - ondoa mimea iliyoambukizwa\n• Magonjwa ya virusi - dhibiti wadudu waenezaji\n• Kuoza kwa mizizi - borekza mkondo wa maji\n\nEleza dalili za mazao yako?`,
          default: `Naelewa unauliza kuhusu "${userMessage}".\n\nHapa kuna ushauri wangu:\n• Maandalizi bora ya udongo\n• Fuata nafasi iliyopendekezwa\n• Tumia mbolea iliyokusanyika\n• Fuatilia wadudu mara kwa mara\n\nUnaweza kutoa maelezo zaidi?`
        }
      };

      const langResponses = responses[currentLang as keyof typeof responses] || responses.English;
      
      if (hasImage) {
        aiResponse = langResponses.image;
      } else if (userMessage.toLowerCase().includes('maize') || userMessage.toLowerCase().includes('corn') || userMessage.toLowerCase().includes('ingano')) {
        aiResponse = langResponses.maize;
      } else if (userMessage.toLowerCase().includes('pest') || userMessage.toLowerCase().includes('insect') || userMessage.toLowerCase().includes('inzoka')) {
        aiResponse = langResponses.pest;
      } else if (userMessage.toLowerCase().includes('disease') || userMessage.toLowerCase().includes('indwara')) {
        aiResponse = langResponses.disease;
      } else {
        aiResponse = langResponses.default;
      }

      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'ai',
        text: aiResponse,
        timestamp: new Date()
      }]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputText.trim() && !selectedImage) return;

    Keyboard.dismiss();

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: inputText || '📸 [Image sent]',
      image: selectedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    const messageText = inputText;
    const hasImage = !!selectedImage;
    
    setInputText('');
    setSelectedImage(null);
    
    simulateAIResponse(messageText, hasImage);
  };

  const speakText = async (text: string) => {
    try {
      // Stop any ongoing speech first
      Speech.stop();
      
      // Simple speech without language checking
      await Speech.speak(text, {
        pitch: 1.0,
        rate: 0.8,
      });
    } catch (error) {
      console.error('Error speaking text:', error);
      Alert.alert('Speech Error', 'Failed to read message aloud. Please try again.');
    }
  };

  const saveMessage = (messageId: number) => {
    Alert.alert('✅ Saved', 'Message saved to your favorites!', [
      { text: 'OK' }
    ]);
  };

  const getLanguageName = (code: string) => {
    const lang = languages.find(l => l.code === code);
    return lang ? lang.name : code;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.aiIcon}>
              <MaterialCommunityIcons name="brain" size={24} color="#00FF88" />
              <View style={styles.statusDot} />
            </View>
            <View>
              <Text style={styles.headerTitle}>Umuhinzi AI</Text>
              <View style={styles.headerSubtitle}>
                <Ionicons name="flash" size={10} color="#00FF88" />
                <Text style={styles.headerSubtitleText}>Powered by AI • {getLanguageName(language)}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.languageDropdown}
            onPress={() => setShowLanguages(!showLanguages)}
          >
            <Text style={styles.languageText}>{getLanguageName(language)}</Text>
            <Ionicons name="chevron-down" size={16} color="#00FF88" />
          </TouchableOpacity>
        </View>

        {/* Language Selector Modal */}
        {showLanguages && (
          <View style={styles.languageModal}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  language === lang.code && styles.languageOptionActive
                ]}
                onPress={() => {
                  setLanguage(lang.code);
                  setShowLanguages(false);
                  Alert.alert('Language Changed', `Now speaking in ${lang.name}`, [{ text: 'OK' }]);
                }}
              >
                <Text style={[
                  styles.languageOptionText,
                  language === lang.code && styles.languageOptionTextActive
                ]}>
                  {lang.name}
                </Text>
                {language === lang.code && (
                  <Ionicons name="checkmark" size={20} color="#00FF88" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Chat Container */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((msg) => (
            <View 
              key={msg.id} 
              style={[
                styles.messageRow,
                msg.type === 'user' ? styles.messageRowUser : styles.messageRowAi
              ]}
            >
              {msg.type === 'ai' && (
                <View style={styles.aiIconSmall}>
                  <MaterialCommunityIcons name="brain" size={16} color="#00FF88" />
                </View>
              )}
              
              <View style={[
                styles.bubble,
                msg.type === 'ai' ? styles.bubbleAi : styles.bubbleUser
              ]}>
                {msg.image && (
                  <Image 
                    source={{ uri: msg.image }} 
                    style={styles.messageImage}
                    resizeMode="cover"
                  />
                )}
                <Text style={styles.bubbleText}>{msg.text}</Text>
                
                {msg.type === 'ai' && (
                  <View style={styles.messageActions}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => speakText(msg.text)}
                    >
                      <Ionicons name="volume-medium" size={16} color="#00FF88" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => saveMessage(msg.id)}
                    >
                      <Ionicons name="bookmark-outline" size={16} color="#00FF88" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              
              {msg.type === 'user' && (
                <View style={styles.userIcon}>
                  <View style={styles.userAvatar} />
                </View>
              )}
            </View>
          ))}
          
          {isProcessing && (
            <View style={[styles.messageRow, styles.messageRowAi]}>
              <View style={styles.aiIconSmall}>
                <MaterialCommunityIcons name="brain" size={16} color="#00FF88" />
              </View>
              <View style={[styles.bubble, styles.bubbleAi]}>
                <View style={styles.typingIndicator}>
                  <View style={[styles.typingDot, styles.typingDot1]} />
                  <View style={[styles.typingDot, styles.typingDot2]} />
                  <View style={[styles.typingDot, styles.typingDot3]} />
                  <Text style={styles.typingText}>
                    {language === 'Kinyarwanda' ? 'Narakora...' : 
                     language === 'French' ? 'En train de rédiger...' :
                     language === 'Swahili' ? 'Inaandika...' : 'Analyzing...'}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Image Preview */}
        {selectedImage && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            <Text style={styles.previewText}>
              {language === 'Kinyarwanda' ? 'Ifoto yoherejwe' :
               language === 'French' ? 'Image prête à envoyer' :
               language === 'Swahili' ? 'Picha tayari kutuma' : 'Ready to send'}
            </Text>
            <TouchableOpacity onPress={removeImage} style={styles.removeButton}>
              <Ionicons name="close-circle" size={24} color="#FF4444" />
            </TouchableOpacity>
          </View>
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputBar}>
            <TextInput
              style={styles.textInput}
              placeholder={
                language === 'Kinyarwanda' ? 'Baza ku bicurashwe, inzoka...' :
                language === 'French' ? 'Demandez sur les cultures, ravageurs...' :
                language === 'Swahili' ? 'Uliza kuhusu mazao, wadudu...' :
                'Ask about crops, pests...'
              }
              placeholderTextColor="#888"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity 
              style={[styles.inputIcon, isRecording && styles.recordingActive]}
              onPress={handleVoiceInput}
            >
              <Ionicons 
                name={isRecording ? "stop-circle" : "mic-outline"} 
                size={22} 
                color={isRecording ? "#FF4444" : "#00FF88"} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputIcon} onPress={handleImagePick}>
              <Ionicons name="image-outline" size={22} color="#00FF88" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputIcon} onPress={handleCameraLaunch}>
              <Ionicons name="camera-outline" size={22} color="#00FF88" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={[
              styles.sendButton,
              (!inputText.trim() && !selectedImage) && styles.sendButtonDisabled
            ]}
            onPress={handleSend}
            disabled={!inputText.trim() && !selectedImage}
          >
            <Ionicons name="send" size={18} color="#0E1410" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Ionicons name="information-circle-outline" size={11} color="#888" />
          <Text style={styles.footerText}>
            {language === 'Kinyarwanda' ? 'Inama za AI ni inama. Kubibazo byikaze, soma umwarimu wubuhinzi.' :
             language === 'French' ? 'Les suggestions IA sont consultatives. Pour problèmes critiques contactez un agent.' :
             language === 'Swahili' ? 'Mapendekezo ya AI ni ya ushauri. Kwa matatizo makuwasiliana na afisa.' :
             'AI suggestions are advisory. For critical issues contact extension officer.'}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ... (keep the same styles as before)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0E1410',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E3A2E',
    backgroundColor: '#0E1410',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  statusDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#7FFF00',
    borderWidth: 2,
    borderColor: '#0E1410',
  },
  headerTitle: {
    color: '#00FF88',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 2,
  },
  headerSubtitleText: {
    color: '#00FF88',
    fontSize: 9,
    marginLeft: 3,
    opacity: 0.8,
  },
  languageDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A2E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  languageText: {
    color: '#fff',
    marginRight: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  languageModal: {
    position: 'absolute',
    top: 70,
    right: 16,
    backgroundColor: '#1E3A2E',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)',
    zIndex: 1000,
    minWidth: 160,
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  languageOptionActive: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
  },
  languageOptionText: {
    color: '#fff',
    fontSize: 13,
  },
  languageOptionTextActive: {
    color: '#00FF88',
    fontWeight: '600',
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 12,
    paddingBottom: 20,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'flex-end',
  },
  messageRowAi: {
    justifyContent: 'flex-start',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  aiIconSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1E3A2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  userIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1E3A2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  userAvatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#00FF88',
  },
  bubble: {
    borderRadius: 18,
    padding: 12,
    maxWidth: width * 0.75,
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bubbleAi: {
    backgroundColor: '#1E3A2E',
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  bubbleUser: {
    backgroundColor: '#007D43',
    borderTopRightRadius: 4,
  },
  bubbleText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  messageImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
  },
  messageActions: {
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    gap: 6,
  },
  actionButton: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#00FF88',
    marginRight: 3,
  },
  typingDot1: {
    opacity: 0.4,
  },
  typingDot2: {
    opacity: 0.6,
  },
  typingDot3: {
    opacity: 0.8,
  },
  typingText: {
    color: '#00FF88',
    fontSize: 13,
    marginLeft: 6,
    opacity: 0.8,
  },
  imagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A2E',
    marginHorizontal: 12,
    marginTop: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  previewText: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 10,
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#0E1410',
  },
  inputBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1E3A2E',
    borderRadius: 24,
    paddingHorizontal: 12,
    alignItems: 'center',
    minHeight: 46,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)',
  },
  textInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    maxHeight: 90,
    paddingVertical: 8,
  },
  inputIcon: {
    padding: 5,
    marginLeft: 4,
  },
  recordingActive: {
    backgroundColor: 'rgba(255, 68, 68, 0.2)',
    borderRadius: 18,
  },
  sendButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#00FF88',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#00FF88',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  sendButtonDisabled: {
    opacity: 0.4,
    backgroundColor: '#666',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  footerText: {
    color: '#888',
    fontSize: 10,
    textAlign: 'center',
    flexShrink: 1,
  },
});
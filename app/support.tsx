import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function SupportScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  const faqItems = [
    {
      question: "How do I get started with UmuhinziHub?",
      answer: "Download the app, create an account, and complete your farmer profile to access all features."
    },
    {
      question: "Is the app available in local languages?",
      answer: "Yes! We support Kinyarwanda, English, and French to serve all farmers better."
    },
    {
      question: "How accurate are the weather predictions?",
      answer: "Our AI uses satellite data and local sensors to provide 95% accurate hyper-local forecasts."
    },
    {
      question: "Can I sell my produce through the app?",
      answer: "Absolutely! Our marketplace connects you directly with verified buyers across the region."
    },
    {
      question: "How does plant disease detection work?",
      answer: "Take a photo of your crop, and our AI analyzes it instantly to identify diseases and suggest treatments."
    }
  ];

  const contactMethods = [
    {
      icon: "mail",
      title: "Email Support",
      description: "Get detailed help from our team",
      value: "support@umuhinzihub.rw",
      action: () => openLink('mailto:support@umuhinzihub.rw')
    },
    {
      icon: "call",
      title: "Phone Support",
      description: "Speak directly with our agents",
      value: "+250 788 123 456",
      action: () => openLink('tel:+250788123456')
    },
    {
      icon: "logo-whatsapp",
      title: "WhatsApp",
      description: "Quick chat support",
      value: "+250 788 123 456",
      action: () => openLink('https://wa.me/250788123456')
    },
    {
      icon: "time",
      title: "Support Hours",
      description: "When we're available",
      value: "Mon-Sun: 6AM - 8PM"
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#00FF88" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Support</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Ionicons name="help-buoy" size={40} color="#00FF88" />
          </View>
          <Text style={styles.heroTitle}>How can we help you?</Text>
          <Text style={styles.heroDescription}>
            Were here to support your farming journey. Get help with the app, farming advice, or technical issues.
          </Text>
        </View>

        {/* Contact Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Help Quickly</Text>
          <View style={styles.contactGrid}>
            {contactMethods.map((method, index) => (
              <TouchableOpacity
                key={index}
                style={styles.contactCard}
                onPress={method.action}
                disabled={!method.action}
              >
                <View style={styles.contactIcon}>
                  <Ionicons name={method.icon as any} size={24} color="#00FF88" />
                </View>
                <Text style={styles.contactTitle}>{method.title}</Text>
                <Text style={styles.contactDescription}>{method.description}</Text>
                <Text style={styles.contactValue}>{method.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqContainer}>
            {faqItems.map((item, index) => (
              <View key={index} style={styles.faqItem}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Emergency Support */}
        <View style={styles.emergencySection}>
          <View style={styles.emergencyIcon}>
            <Ionicons name="warning" size={32} color="#FCD34D" />
          </View>
          <Text style={styles.emergencyTitle}>Urgent Farming Issues?</Text>
          <Text style={styles.emergencyDescription}>
            For critical crop diseases or emergency farming advice, contact our agronomy team immediately.
          </Text>
          <TouchableOpacity 
            style={styles.emergencyButton}
            onPress={() => openLink('tel:+250788123456')}
          >
            <Ionicons name="call" size={18} color="#0E1410" />
            <Text style={styles.emergencyButtonText}>Call Emergency Support</Text>
          </TouchableOpacity>
        </View>

        {/* Community Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Support</Text>
          <View style={styles.communityCard}>
            <View style={styles.communityIcon}>
              <MaterialCommunityIcons name="account-group" size={32} color="#00FF88" />
            </View>
            <View style={styles.communityContent}>
              <Text style={styles.communityTitle}>Farmer Community</Text>
              <Text style={styles.communityDescription}>
                Connect with other farmers, share experiences, and get advice from the community.
              </Text>
              <TouchableOpacity style={styles.communityButton}>
                <Text style={styles.communityButtonText}>Join Community Forum</Text>
                <Ionicons name="arrow-forward" size={16} color="#00FF88" />
              </TouchableOpacity>
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
    backgroundColor: "#0E1410",
  },
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(14, 20, 16, 0.95)",
    borderBottomWidth: 1,
    borderBottomColor: "#1E3A2E",
  },
  backButton: {
    padding: 6,
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderRadius: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholder: {
    width: 34,
  },
  heroSection: {
    padding: 20,
    alignItems: "center",
    marginTop: 20,
  },
  heroIcon: {
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    padding: 20,
    borderRadius: 50,
    marginBottom: 16,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  heroDescription: {
    color: "#A7F3D0",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  section: {
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  contactGrid: {
    gap: 12,
  },
  contactCard: {
    backgroundColor: "#1E261E",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2D4A3A",
  },
  contactIcon: {
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    padding: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  contactTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  contactDescription: {
    color: "#A7F3D0",
    fontSize: 14,
    marginBottom: 8,
  },
  contactValue: {
    color: "#00FF88",
    fontSize: 14,
    fontWeight: "600",
  },
  faqContainer: {
    gap: 16,
  },
  faqItem: {
    backgroundColor: "#1E261E",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2D4A3A",
  },
  faqQuestion: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  faqAnswer: {
    color: "#A7F3D0",
    fontSize: 14,
    lineHeight: 20,
  },
  emergencySection: {
    margin: 20,
    backgroundColor: "rgba(252, 211, 77, 0.1)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(252, 211, 77, 0.3)",
    alignItems: "center",
  },
  emergencyIcon: {
    marginBottom: 12,
  },
  emergencyTitle: {
    color: "#FCD34D",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  emergencyDescription: {
    color: "#A7F3D0",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyButton: {
    backgroundColor: "#FCD34D",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  emergencyButtonText: {
    color: "#0E1410",
    fontSize: 16,
    fontWeight: "bold",
  },
  communityCard: {
    backgroundColor: "#1E261E",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2D4A3A",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  communityIcon: {
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  communityContent: {
    flex: 1,
  },
  communityTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  communityDescription: {
    color: "#A7F3D0",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  communityButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  communityButtonText: {
    color: "#00FF88",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
});
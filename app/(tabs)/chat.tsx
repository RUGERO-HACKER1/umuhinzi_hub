import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* --- Chat Header --- */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.aiIcon}>
            <MaterialCommunityIcons name="brain" size={24} color="#00FF88" />
          </View>
          <Text style={styles.headerTitle}>Umuhinzi AI</Text>
        </View>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Kinyarwanda</Text>
          <Ionicons name="chevron-down" size={16} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* --- Chat Body --- */}
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {/* --- AI Bubble --- */}
        <View style={styles.messageRowAi}>
          <View style={styles.aiIconSmall}>
            <MaterialCommunityIcons name="brain" size={16} color="#00FF88" />
          </View>
          <View style={styles.bubbleAi}>
            <Text style={styles.bubbleText}>
              Muraho! Im your farming assistant. Ask me about crops, pests,
              diseases, or farming techniques.
            </Text>
            <TouchableOpacity style={styles.buttonSave}>
              <Ionicons name="bookmark" size={14} color="#00FF88" />
              <Text style={styles.buttonSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- User Bubble --- */}
        <View style={styles.messageRowUser}>
          <View style={styles.bubbleUser}>
            <Text style={styles.bubbleText}>
              My maize leaves have yellow spots. What could be the problem?
            </Text>
          </View>
          <View style={styles.userIcon}>
            <Ionicons name="person" size={16} color="#ccc" />
          </View>
        </View>

        {/* --- AI Bubble with List --- */}
        <View style={styles.messageRowAi}>
          <View style={styles.aiIconSmall}>
            <MaterialCommunityIcons name="brain" size={16} color="#00FF88" />
          </View>
          <View style={styles.bubbleAi}>
            <Text style={styles.bubbleText}>
              Yellow spots on maize leaves could indicate:
            </Text>
            <Text style={styles.bulletText}>• Northern corn leaf blight</Text>
            <Text style={styles.bulletText}>• Nitrogen deficiency</Text>
            <Text style={styles.bulletText}>• Gray leaf spot disease</Text>

            <View style={styles.recommendation}>
              <Ionicons name="checkmark-circle" size={16} color="#00FF88" />
              <Text style={styles.recommendationText}>
                APPLY: Spray fungicide (Mancozeb 50g/L)
              </Text>
            </View>

            <View style={styles.bubbleActions}>
              <TouchableOpacity style={styles.buttonAction}>
                <Text style={styles.buttonActionText}>More Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonAction}>
                <Text style={styles.buttonActionText}>Show Images</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonActionIcon}>
                <Ionicons name="bookmark-outline" size={16} color="#ccc" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* --- User Bubble with Image --- */}
        <View style={styles.messageRowUser}>
          <View style={styles.bubbleUserImage}>
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={60} color="#ccc" />
            </View>
            <Text style={[styles.bubbleText, { marginTop: 10 }]}>
              Can you analyze this photo of my crop?
            </Text>
          </View>
          <View style={styles.userIcon}>
            <Ionicons name="person" size={16} color="#ccc" />
          </View>
        </View>

        {/* --- AI Typing --- */}
        <View style={styles.messageRowAi}>
          <View style={styles.aiIconSmall}>
            <MaterialCommunityIcons name="brain" size={16} color="#00FF88" />
          </View>
          <View style={styles.bubbleAi}>
            <Text style={styles.bubbleText}>••• Analyzing image...</Text>
          </View>
        </View>
      </ScrollView>

      {/* --- Input Bar --- */}
      <View style={styles.inputContainer}>
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask about crops, pests, diseases..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.inputIcon}>
            <Ionicons name="mic-outline" size={24} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputIcon}>
            <Ionicons name="camera-outline" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#0E1410" />
        </TouchableOpacity>
      </View>
      <Text style={styles.footerNote}>
        <Ionicons name="information-circle-outline" size={12} color="#888" />
        AI suggestions are advisory. For critical issues contact extension
        officer.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0E1410",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1E261E",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  aiIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 255, 136, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E261E",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  dropdownText: {
    color: "#fff",
    marginRight: 5,
  },
  chatContainer: {
    padding: 15,
    paddingBottom: 20,
  },
  messageRowAi: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-end",
  },
  messageRowUser: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  aiIconSmall: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1E261E",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  userIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  bubbleAi: {
    backgroundColor: "#1E261E",
    borderRadius: 16,
    borderTopLeftRadius: 4,
    padding: 12,
    maxWidth: "85%",
  },
  bubbleUser: {
    backgroundColor: "#007D43", // User bubble green
    borderRadius: 16,
    borderTopRightRadius: 4,
    padding: 12,
    maxWidth: "85%",
  },
  bubbleUserImage: {
    backgroundColor: "#007D43",
    borderRadius: 16,
    borderTopRightRadius: 4,
    padding: 12,
    maxWidth: "85%",
    alignItems: "center",
  },
  imagePlaceholder: {
    width: 200,
    height: 150,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bubbleText: {
    color: "#fff",
    fontSize: 15,
  },
  buttonSave: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  buttonSaveText: {
    color: "#00FF88",
    fontSize: 12,
    marginLeft: 5,
  },
  bulletText: {
    color: "#fff",
    fontSize: 15,
    marginTop: 5,
    marginLeft: 5,
  },
  recommendation: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 255, 136, 0.2)",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  recommendationText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  bubbleActions: {
    flexDirection: "row",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingTop: 10,
  },
  buttonAction: {
    backgroundColor: "#333",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 8,
  },
  buttonActionText: {
    color: "#ccc",
    fontSize: 12,
  },
  buttonActionIcon: {
    backgroundColor: "#333",
    padding: 5,
    borderRadius: 6,
    marginLeft: "auto",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  inputBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#1E261E",
    borderRadius: 25,
    paddingHorizontal: 15,
    alignItems: "center",
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },
  inputIcon: {
    padding: 5,
    marginLeft: 10,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#00FF88",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  footerNote: {
    color: "#888",
    fontSize: 11,
    textAlign: "center",
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
});
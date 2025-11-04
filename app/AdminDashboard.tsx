import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/app/contexts/ThemeContext';
import { getThemeColors } from '../constants/Theme';

export default function AdminTab() {
  const { currentTheme } = useTheme();
  const colors = getThemeColors(currentTheme);
  const styles = createStyles(colors);

  const adminFeatures = [
    {
      title: 'Dashboard',
      description: 'Platform overview and analytics',
      icon: 'speedometer',
      route: '/admin/dashboard',
      color: colors.primary
    },
    {
      title: 'User Management',
      description: 'Manage farmers and user accounts',
      icon: 'account-group',
      route: '/admin/users',
      color: colors.success
    },
    {
      title: 'Content Moderation',
      description: 'Review and manage platform content',
      icon: 'shield-check',
      route: '/admin/moderate',
      color: colors.warning
    },
    {
      title: 'Analytics',
      description: 'Detailed reports and insights',
      icon: 'chart-box',
      route: '/admin/analytics',
      color: colors.info
    },
    {
      title: 'System Settings',
      description: 'Platform configuration',
      icon: 'cog',
      route: '/admin/settings',
      color: colors.textTertiary
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: `${colors.primary}15` }]}>
              <MaterialCommunityIcons name="shield-account" size={32} color={colors.primary} />
            </View>
            <Text style={styles.title}>Admin Portal</Text>
            <Text style={styles.subtitle}>Platform Management Tools</Text>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresGrid}>
            {adminFeatures.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                onPress={() => router.push(feature.route as any)}
              >
                <View style={[styles.featureIcon, { backgroundColor: `${feature.color}15` }]}>
                  <MaterialCommunityIcons 
                    name={feature.icon as any} 
                    size={24} 
                    color={feature.color} 
                  />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription} numberOfLines={2}>
                    {feature.description}
                  </Text>
                </View>
                <Ionicons 
                  name="chevron-forward" 
                  size={20} 
                  color={colors.textSecondary} 
                  style={styles.chevron}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={[styles.footerIcon, { backgroundColor: `${colors.primary}10` }]}>
              <Ionicons name="information-circle" size={16} color={colors.primary} />
            </View>
            <Text style={styles.footerText}>
              Access to admin features is restricted to authorized personnel only.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  featuresGrid: {
    marginBottom: 24,
  },
  featureCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  featureTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  chevron: {
    opacity: 0.7,
  },
  footer: {
    backgroundColor: `${colors.primary}05`,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: `${colors.primary}15`,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  footerIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 1,
  },
  footerText: {
    color: colors.textTertiary,
    fontSize: 12,
    lineHeight: 16,
    flex: 1,
  },
});
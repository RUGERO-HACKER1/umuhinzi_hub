import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTheme } from "./contexts/ThemeContext";
import { getThemeColors } from "@/constants/Theme";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ModernLandingPage() {
  const { theme, currentTheme, setTheme, toggleTheme } = useTheme();
  const colors = getThemeColors(currentTheme);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  const features = [
    {
      icon: "weather-partly-cloudy",
      title: "AI Weather Intelligence",
      description: "Real-time hyper-local forecasts with smart farming recommendations",
      color: colors.primary
    },
    {
      icon: "currency-usd",
      title: "Live Market Dynamics",
      description: "Access real-time pricing and connect directly with buyers",
      color: colors.info
    },
    {
      icon: "sprout",
      title: "Regenerative Farming",
      description: "Sustainable practices that heal the earth and boost yields",
      color: colors.warning
    },
    {
      icon: "robot",
      title: "AI Assistant AURA",
      description: "24/7 farming guidance and problem-solving",
      color: colors.primary
    }
  ];

  const testimonials = [
    {
      name: "John K.",
      role: "Maize Farmer",
      text: "Increased my yield by 40% with UmuhinziHub's smart planting calendar.",
      avatar: "👨‍🌾"
    },
    {
      name: "Sarah M.",
      role: "Coffee Grower",
      text: "The pest detection feature saved my entire harvest last season!",
      avatar: "👩‍🌾"
    },
    {
      name: "David T.",
      role: "Vegetable Farmer",
      text: "Direct market access doubled my profits. Life-changing app!",
      avatar: "🧑‍🌾"
    }
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const FeatureCarousel = () => (
    <View style={[styles.carouselContainer, { backgroundColor: colors.card }]}>
      {features.map((feature, index) => (
        <Animated.View
          key={index}
          style={[
            styles.featureCarouselItem,
            {
              opacity: activeFeature === index ? 1 : 0.3,
              transform: [
                { scale: activeFeature === index ? 1 : 0.9 }
              ],
              backgroundColor: colors.card,
              borderColor: colors.border
            }
          ]}
        >
          <View style={[styles.featureCarouselIcon, { backgroundColor: `${feature.color}20` }]}>
            <MaterialCommunityIcons name={feature.icon} size={32} color={feature.color} />
          </View>
          <Text style={[styles.featureCarouselTitle, { color: colors.text }]}>{feature.title}</Text>
          <Text style={[styles.featureCarouselDescription, { color: colors.textSecondary }]}>{feature.description}</Text>
        </Animated.View>
      ))}
    </View>
  );

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Background */}
        <View style={styles.backgroundOverlay}>
          <Animated.View style={[styles.floatingOrb, styles.orb1, { backgroundColor: colors.primary }]} />
          <Animated.View style={[styles.floatingOrb, styles.orb2, { backgroundColor: colors.info }]} />
          <Animated.View style={[styles.floatingOrb, styles.orb3, { backgroundColor: colors.warning }]} />
          <View style={[styles.gradientOverlay, { backgroundColor: `${colors.background}E6` }]} />
        </View>

        {/* Navigation */}
        <Animated.View 
          style={[
            styles.nav,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              backgroundColor: `${colors.background}E6`,
              borderBottomColor: colors.border
            }
          ]}
        >
          <View style={styles.navContent}>
            <View style={styles.logo}>
              <View style={[styles.logoIcon, { backgroundColor: colors.primary }]}>
                <Ionicons name="leaf" size={28} color={colors.background} />
              </View>
              <Text style={[styles.logoText, { color: colors.primary }]}>UmuhinziHub</Text>
            </View>

            <View style={styles.navButtons}>
              <TouchableOpacity
                style={[styles.themeToggle, { backgroundColor: `${colors.primary}20` }]}
                onPress={toggleTheme}
              >
                <Ionicons
                  name={currentTheme === 'dark' ? "moon" : "sunny"}
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuButton, { backgroundColor: `${colors.primary}20`, borderColor: colors.border }]}
                onPress={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Ionicons
                  name={isMenuOpen ? "close" : "menu"}
                  size={28}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {isMenuOpen && (
            <Animated.View 
              style={[
                styles.mobileMenu,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                  backgroundColor: colors.card,
                  borderTopColor: colors.border
                }
              ]}
            >
              <TouchableOpacity
                style={[styles.mobileMenuItem, { backgroundColor: `${colors.primary}10` }]}
                onPress={() => { router.push("/tips"); setIsMenuOpen(false); }}
              >
                <Ionicons name="book" size={20} color={colors.primary} />
                <Text style={[styles.mobileMenuText, { color: colors.text }]}>Tips & Guides</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mobileMenuItem, { backgroundColor: `${colors.primary}10` }]}
                onPress={() => { router.push("/resources"); setIsMenuOpen(false); }}
              >
                <Ionicons name="library" size={20} color={colors.primary} />
                <Text style={[styles.mobileMenuText, { color: colors.text }]}>Resources</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mobileMenuItem, { backgroundColor: `${colors.primary}10` }]}
                onPress={() => { router.push("/scan"); setIsMenuOpen(false); }}
              >
                <Ionicons name="camera" size={20} color={colors.primary} />
                <Text style={[styles.mobileMenuText, { color: colors.text }]}>Plant Scanner</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mobileMenuItem, { backgroundColor: `${colors.primary}10` }]}
                onPress={() => { router.push("/pests"); setIsMenuOpen(false); }}
              >
                <Ionicons name="bug" size={20} color={colors.primary} />
                <Text style={[styles.mobileMenuText, { color: colors.text }]}>Pest Control</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mobileMenuItem, { backgroundColor: `${colors.primary}10` }]}
                onPress={() => { router.push("/emergency"); setIsMenuOpen(false); }}
              >
                <Ionicons name="warning" size={20} color={colors.primary} />
                <Text style={[styles.mobileMenuText, { color: colors.text }]}>Emergency</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mobileMenuItem, { backgroundColor: `${colors.primary}10` }]}
                onPress={() => { router.push("/calendar"); setIsMenuOpen(false); }}
              >
                <Ionicons name="calendar" size={20} color={colors.primary} />
                <Text style={[styles.mobileMenuText, { color: colors.text }]}>Calendar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mobileMenuItem, { backgroundColor: `${colors.primary}10` }]}
                onPress={() => { router.push("/notifications"); setIsMenuOpen(false); }}
              >
                <Ionicons name="notifications" size={20} color={colors.primary} />
                <Text style={[styles.mobileMenuText, { color: colors.text }]}>Alerts</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mobileMenuItem, { backgroundColor: `${colors.primary}10` }]}
                onPress={() => { router.push("/About"); setIsMenuOpen(false); }}
              >
                <Ionicons name="information-circle" size={20} color={colors.primary} />
                <Text style={[styles.mobileMenuText, { color: colors.text }]}>About</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mobileMenuItem, { backgroundColor: `${colors.primary}10` }]}
                onPress={() => { router.push("/(tabs)/chat"); setIsMenuOpen(false); }}
              >
                <Ionicons name="chatbubble" size={20} color={colors.primary} />
                <Text style={[styles.mobileMenuText, { color: colors.text }]}>AURA AI</Text>
              </TouchableOpacity>

                            <TouchableOpacity
                style={[styles.mobileMenuItem, { backgroundColor: `${colors.primary}10` }]}
                onPress={() => { router.push("/settings"); setIsMenuOpen(false); }}
              >
                <Ionicons name="settings" size={20} color={colors.primary} />
                <Text style={[styles.mobileMenuText, { color: colors.text }]}>settings</Text>
              </TouchableOpacity>

              <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />

              <TouchableOpacity
                style={[styles.mobileMenuItemBorder, { borderColor: colors.primary }]}
                onPress={() => { router.push("/LogIn"); setIsMenuOpen(false); }}
              >
                <Text style={[styles.mobileMenuTextGreen, { color: colors.primary }]}>Log In</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.mobileMenuItemGradient, { backgroundColor: colors.primary }]}
                onPress={() => { router.push("/SignUp"); setIsMenuOpen(false); }}
              >
                <Text style={[styles.mobileMenuTextBold, { color: colors.background }]}>Get Started Free</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>

        {/* Hero Section */}
        <Animated.View
          style={[
            styles.hero,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={[styles.badge, { backgroundColor: `${colors.primary}20`, borderColor: colors.border }]}>
            <Text style={styles.badgeIcon}>🚀</Text>
            <Text style={[styles.badgeText, { color: colors.primary }]}>Transforming African Agriculture</Text>
          </View>

          <Text style={[styles.heroTitleLight, { color: colors.textSecondary }]}>Empowering</Text>
          <Text style={[styles.heroTitleGradient, { color: colors.primary }]}>Smallholder Farmers</Text>

          <Text style={[styles.heroDescription, { color: colors.textSecondary }]}>
            Smart farming intelligence, direct market access, and community
            support—all in your pocket. Join 50,000+ farmers growing smarter.
          </Text>

          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push("/SignUp")}
            >
              <Text style={[styles.primaryButtonText, { color: colors.background }]}>Start Growing Smarter</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.background} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, { borderColor: colors.border }]}
              onPress={() => router.push("/LogIn")}
            >
              <Ionicons name="play-circle" size={20} color={colors.primary} />
              <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>Watch Demo</Text>
            </TouchableOpacity>
          </View>

          {/* Feature Carousel */}
          <FeatureCarousel />

          {/* Stats */}
          <View style={[styles.stats, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>50K+</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active Farmers</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>95%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Satisfaction</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>40%</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Yield Increase</Text>
            </View>
          </View>
        </Animated.View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Why Choose <Text style={{ color: colors.primary }}>UmuhinziHub</Text>?
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Cutting-edge technology meets traditional farming wisdom
          </Text>

          {features.map((feature, index) => (
            <Animated.View
              key={index}
              style={[
                styles.featureCard,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                  backgroundColor: colors.card,
                  borderColor: colors.border
                }
              ]}
            >
              <View style={[styles.featureIconContainer, { backgroundColor: `${feature.color}20` }]}>
                <MaterialCommunityIcons name={feature.icon} size={32} color={feature.color} />
              </View>
              <View style={styles.featureTextContent}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>{feature.title}</Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>{feature.description}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Everything You Need to <Text style={{ color: colors.primary }}>Succeed</Text>
          </Text>

          <View style={styles.serviceGrid}>
            <View style={[styles.serviceCard, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
              <View style={[styles.serviceIcon, { backgroundColor: `${colors.primary}20` }]}>
                <MaterialCommunityIcons name="flower-tulip" size={28} color={colors.primary} />
              </View>
              <Text style={[styles.serviceTitle, { color: colors.text }]}>Planting Intelligence</Text>
              <Text style={[styles.serviceDescription, { color: colors.textSecondary }]}>
                Never miss optimal planting windows
              </Text>
            </View>

            <View style={[styles.serviceCard, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
              <View style={[styles.serviceIcon, { backgroundColor: `${colors.info}20` }]}>
                <MaterialCommunityIcons name="shopping" size={28} color={colors.info} />
              </View>
              <Text style={[styles.serviceTitle, { color: colors.text }]}>Digital Marketplace</Text>
              <Text style={[styles.serviceDescription, { color: colors.textSecondary }]}>Sell direct, earn more</Text>
            </View>

            <View style={[styles.serviceCard, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
              <View style={[styles.serviceIcon, { backgroundColor: `${colors.warning}20` }]}>
                <MaterialCommunityIcons name="calendar-check" size={28} color={colors.warning} />
              </View>
              <Text style={[styles.serviceTitle, { color: colors.text }]}>Smart Reminders</Text>
              <Text style={[styles.serviceDescription, { color: colors.textSecondary }]}>
                Automated crop care alerts
              </Text>
            </View>

            <View style={[styles.serviceCard, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
              <View style={[styles.serviceIcon, { backgroundColor: `${colors.primary}20` }]}>
                <MaterialCommunityIcons name="account-group" size={28} color={colors.primary} />
              </View>
              <Text style={[styles.serviceTitle, { color: colors.text }]}>Farmer Network</Text>
              <Text style={[styles.serviceDescription, { color: colors.textSecondary }]}>Connect with local experts</Text>
            </View>
          </View>
        </View>

        {/* Testimonials */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Trusted by <Text style={{ color: colors.primary }}>Farmers</Text>
          </Text>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.testimonialsScroll}
          >
            {testimonials.map((testimonial, index) => (
              <View key={index} style={[styles.testimonialCard, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
                <View style={styles.testimonialHeader}>
                  <Text style={styles.testimonialAvatar}>{testimonial.avatar}</Text>
                  <View>
                    <Text style={[styles.testimonialName, { color: colors.text }]}>{testimonial.name}</Text>
                    <Text style={[styles.testimonialRole, { color: colors.primary }]}>{testimonial.role}</Text>
                  </View>
                </View>
                <Text style={[styles.testimonialText, { color: colors.textSecondary }]}>{testimonial.text}</Text>
                <View style={styles.rating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons key={star} name="star" size={16} color={colors.warning} />
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* CTA Section */}
        <View style={styles.section}>
          <View style={[styles.ctaCard, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
            <Text style={[styles.ctaTitle, { color: colors.text }]}>
              Ready to Transform Your <Text style={{ color: colors.primary }}>Farm</Text>?
            </Text>
            <Text style={[styles.ctaDescription, { color: colors.textSecondary }]}>
              Join thousands of successful farmers today. Get started in 2 minutes.
            </Text>

            <View style={styles.ctaStats}>
              <View style={styles.ctaStat}>
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                <Text style={[styles.ctaStatText, { color: colors.text }]}>Free Forever</Text>
              </View>
              <View style={styles.ctaStat}>
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                <Text style={[styles.ctaStatText, { color: colors.text }]}>No Credit Card</Text>
              </View>
              <View style={styles.ctaStat}>
                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                <Text style={[styles.ctaStatText, { color: colors.text }]}>Setup in 2min</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.ctaButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push("/SignUp")}
            >
              <Text style={[styles.ctaButtonText, { color: colors.background }]}>Start Free Trial</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.background} />
            </TouchableOpacity>

            <Text style={[styles.ctaFooter, { color: colors.textSecondary }]}>
              Already have an account?{' '}
              <Text 
                style={[styles.ctaFooterLink, { color: colors.primary }]}
                onPress={() => router.push("/LogIn")}
              >
                Log In
              </Text>
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <View style={styles.footerContent}>
            <View style={styles.footerLogo}>
              <View style={[styles.logoIcon, { backgroundColor: colors.primary }]}>
                <Ionicons name="leaf" size={24} color={colors.background} />
              </View>
              <Text style={[styles.logoText, { color: colors.primary }]}>UmuhinziHub</Text>
            </View>

            <Text style={[styles.footerTagline, { color: colors.textSecondary }]}>
              Empowering African farmers with AI-driven agriculture technology.
            </Text>

            <View style={styles.socialIcons}>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
                <Ionicons name="logo-whatsapp" size={20} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
                <Ionicons name="logo-facebook" size={20} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
                <Ionicons name="logo-twitter" size={20} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialButton, { backgroundColor: `${colors.primary}10`, borderColor: colors.border }]}>
                <Ionicons name="mail-outline" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.footerLinks}>
              <TouchableOpacity onPress={() => router.push('/privacy')}>
                <Text style={[styles.footerLink, { color: colors.primary }]}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/terms')}>
                <Text style={[styles.footerLink, { color: colors.primary }]}>Terms of Service</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/support')}>
                <Text style={[styles.footerLink, { color: colors.primary }]}>Support</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.footerCopyright, { color: colors.textSecondary }]}>
              © 2024 UmuhinziHub. All rights reserved.
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
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingOrb: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.1,
  },
  orb1: {
    top: "10%",
    left: "-10%",
    width: 300,
    height: 300,
  },
  orb2: {
    top: "30%",
    right: "-15%",
    width: 400,
    height: 400,
    opacity: 0.08,
  },
  orb3: {
    bottom: "20%",
    left: "20%",
    width: 250,
    height: 250,
    opacity: 0.06,
  },
  nav: {
    position: "relative",
    zIndex: 1000,
    borderBottomWidth: 1,
  },
  navContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  navButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  themeToggle: {
    padding: 10,
    borderRadius: 12,
  },
  menuButton: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  mobileMenu: {
    borderTopWidth: 1,
    padding: 20,
  },
  mobileMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
  },
  mobileMenuText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  menuDivider: {
    height: 1,
    marginVertical: 16,
  },
  mobileMenuItemBorder: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  mobileMenuTextGreen: {
    fontSize: 16,
    fontWeight: "bold",
  },
  mobileMenuItemGradient: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  mobileMenuTextBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  hero: {
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 30,
    borderWidth: 1,
  },
  badgeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  heroTitleLight: {
    fontSize: 42,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 8,
  },
  heroTitleGradient: {
    fontSize: 48,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 52,
  },
  heroDescription: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  heroButtons: {
    width: "100%",
    gap: 16,
    marginBottom: 50,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  carouselContainer: {
    width: "100%",
    marginBottom: 50,
    borderRadius: 20,
    padding: 10,
  },
  featureCarouselItem: {
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 10,
  },
  featureCarouselIcon: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  featureCarouselTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  featureCarouselDescription: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  featureCard: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
  },
  featureIconContainer: {
    padding: 16,
    borderRadius: 16,
    marginRight: 16,
  },
  featureTextContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 22,
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  serviceCard: {
    width: "48%",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
  },
  serviceIcon: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  serviceDescription: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },
  testimonialsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  testimonialCard: {
    width: 280,
    borderRadius: 20,
    padding: 24,
    marginRight: 16,
    borderWidth: 1,
  },
  testimonialHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  testimonialAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  testimonialRole: {
    fontSize: 12,
  },
  testimonialText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  rating: {
    flexDirection: "row",
  },
  ctaCard: {
    borderRadius: 24,
    padding: 40,
    alignItems: "center",
    borderWidth: 1,
  },
  ctaTitle: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  ctaDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  ctaStats: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginBottom: 30,
  },
  ctaStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ctaStatText: {
    fontSize: 14,
    fontWeight: "600",
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: "100%",
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  ctaFooter: {
    fontSize: 14,
    textAlign: "center",
  },
  ctaFooterLink: {
    fontWeight: "bold",
  },
  footer: {
    borderTopWidth: 1,
    padding: 40,
  },
  footerContent: {
    alignItems: "center",
  },
  footerLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  footerTagline: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  socialIcons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  footerLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginBottom: 24,
  },
  footerLink: {
    fontSize: 12,
    fontWeight: "600",
  },
  footerCopyright: {
    fontSize: 12,
    textAlign: "center",
  },
});
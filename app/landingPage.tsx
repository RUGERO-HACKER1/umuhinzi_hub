import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ModernLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.8);

  const features = [
    {
      icon: "weather-partly-cloudy",
      title: "AI Weather Intelligence",
      description: "Real-time hyper-local forecasts with smart farming recommendations",
      color: "#00FF88"
    },
    {
      icon: "currency-usd",
      title: "Live Market Dynamics",
      description: "Access real-time pricing and connect directly with buyers",
      color: "#60A5FA"
    },
    {
      icon: "sprout",
      title: "Regenerative Farming",
      description: "Sustainable practices that heal the earth and boost yields",
      color: "#FCD34D"
    },
    {
      icon: "robot",
      title: "AI Assistant AURA",
      description: "24/7 farming guidance and problem-solving",
      color: "#D8BFD8"
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
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
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
    <View style={styles.carouselContainer}>
      {features.map((feature, index) => (
        <Animated.View
          key={index}
          style={[
            styles.featureCarouselItem,
            {
              opacity: activeFeature === index ? 1 : 0.3,
              transform: [
                { scale: activeFeature === index ? 1 : 0.9 }
              ]
            }
          ]}
        >
          <View style={[styles.featureCarouselIcon, { backgroundColor: `${feature.color}20` }]}>
            <MaterialCommunityIcons name={feature.icon} size={32} color={feature.color} />
          </View>
          <Text style={styles.featureCarouselTitle}>{feature.title}</Text>
          <Text style={styles.featureCarouselDescription}>{feature.description}</Text>
        </Animated.View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Background */}
        <View style={styles.backgroundOverlay}>
          <Animated.View style={[styles.floatingOrb, styles.orb1]} />
          <Animated.View style={[styles.floatingOrb, styles.orb2]} />
          <Animated.View style={[styles.floatingOrb, styles.orb3]} />
          <View style={styles.gradientOverlay} />
        </View>

        {/* Navigation */}
        <Animated.View 
          style={[
            styles.nav,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.navContent}>
            <View style={styles.logo}>
              <View style={styles.logoIcon}>
                <Ionicons name="leaf" size={28} color="#0E1410" />
              </View>
              <Text style={styles.logoText}>UmuhinziHub</Text>
            </View>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Ionicons
                name={isMenuOpen ? "close" : "menu"}
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {isMenuOpen && (
            <Animated.View 
              style={[
                styles.mobileMenu,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <TouchableOpacity
                style={styles.mobileMenuItem}
                onPress={() => { router.push("/tips"); setIsMenuOpen(false); }}
              >
                <Ionicons name="book" size={20} color="#00FF88" />
                <Text style={styles.mobileMenuText}>Tips & Guides</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mobileMenuItem}
                onPress={() => { router.push("/resources"); setIsMenuOpen(false); }}
              >
                <Ionicons name="library" size={20} color="#00FF88" />
                <Text style={styles.mobileMenuText}>Resources</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mobileMenuItem}
                onPress={() => { router.push("/scan"); setIsMenuOpen(false); }}
              >
                <Ionicons name="camera" size={20} color="#00FF88" />
                <Text style={styles.mobileMenuText}>Plant Scanner</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mobileMenuItem}
                onPress={() => { router.push("/pests"); setIsMenuOpen(false); }}
              >
                <Ionicons name="bug" size={20} color="#00FF88" />
                <Text style={styles.mobileMenuText}>Pest Control</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mobileMenuItem}
                onPress={() => { router.push("/emergency"); setIsMenuOpen(false); }}
              >
                <Ionicons name="warning" size={20} color="#00FF88" />
                <Text style={styles.mobileMenuText}>Emergency</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mobileMenuItem}
                onPress={() => { router.push("/calendar"); setIsMenuOpen(false); }}
              >
                <Ionicons name="calendar" size={20} color="#00FF88" />
                <Text style={styles.mobileMenuText}>Calendar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mobileMenuItem}
                onPress={() => { router.push("/notifications"); setIsMenuOpen(false); }}
              >
                <Ionicons name="notifications" size={20} color="#00FF88" />
                <Text style={styles.mobileMenuText}>Alerts</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mobileMenuItem}
                onPress={() => { router.push("/(tabs)/chat"); setIsMenuOpen(false); }}
              >
                <Ionicons name="chatbubble" size={20} color="#00FF88" />
                <Text style={styles.mobileMenuText}>AURA AI</Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.mobileMenuItemBorder}
                onPress={() => { router.push("/LogIn"); setIsMenuOpen(false); }}
              >
                <Text style={styles.mobileMenuTextGreen}>Log In</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.mobileMenuItemGradient}
                onPress={() => { router.push("/SignUp"); setIsMenuOpen(false); }}
              >
                <Text style={styles.mobileMenuTextBold}>Get Started Free</Text>
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
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🚀</Text>
            <Text style={styles.badgeText}>Transforming African Agriculture</Text>
          </View>

          <Text style={styles.heroTitleLight}>Empowering</Text>
          <Text style={styles.heroTitleGradient}>Smallholder Farmers</Text>

          <Text style={styles.heroDescription}>
            Smart farming intelligence, direct market access, and community
            support—all in your pocket. Join 50,000+ farmers growing smarter.
          </Text>

          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.push("/SignUp")}
            >
              <Text style={styles.primaryButtonText}>Start Growing Smarter</Text>
              <Ionicons name="arrow-forward" size={20} color="#0E1410" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push("/LogIn")}
            >
              <Ionicons name="play-circle" size={20} color="#00FF88" />
              <Text style={styles.secondaryButtonText}>Watch Demo</Text>
            </TouchableOpacity>
          </View>

          {/* Feature Carousel */}
          <FeatureCarousel />

          {/* Stats */}
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>50K+</Text>
              <Text style={styles.statLabel}>Active Farmers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>95%</Text>
              <Text style={styles.statLabel}>Satisfaction</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>40%</Text>
              <Text style={styles.statLabel}>Yield Increase</Text>
            </View>
          </View>
        </Animated.View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Why Choose <Text style={styles.gradientText}>UmuhinziHub</Text>?
          </Text>
          <Text style={styles.sectionSubtitle}>
            Cutting-edge technology meets traditional farming wisdom
          </Text>

          {features.map((feature, index) => (
            <Animated.View
              key={index}
              style={[
                styles.featureCard,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <View style={[styles.featureIconContainer, { backgroundColor: `${feature.color}20` }]}>
                <MaterialCommunityIcons name={feature.icon} size={32} color={feature.color} />
              </View>
              <View style={styles.featureTextContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Everything You Need to <Text style={styles.gradientText}>Succeed</Text>
          </Text>

          <View style={styles.serviceGrid}>
            <View style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <MaterialCommunityIcons name="flower-tulip" size={28} color="#00FF88" />
              </View>
              <Text style={styles.serviceTitle}>Planting Intelligence</Text>
              <Text style={styles.serviceDescription}>
                Never miss optimal planting windows
              </Text>
            </View>

            <View style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <MaterialCommunityIcons name="shopping" size={28} color="#60A5FA" />
              </View>
              <Text style={styles.serviceTitle}>Digital Marketplace</Text>
              <Text style={styles.serviceDescription}>Sell direct, earn more</Text>
            </View>

            <View style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <MaterialCommunityIcons name="calendar-check" size={28} color="#FCD34D" />
              </View>
              <Text style={styles.serviceTitle}>Smart Reminders</Text>
              <Text style={styles.serviceDescription}>
                Automated crop care alerts
              </Text>
            </View>

            <View style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <MaterialCommunityIcons name="account-group" size={28} color="#D8BFD8" />
              </View>
              <Text style={styles.serviceTitle}>Farmer Network</Text>
              <Text style={styles.serviceDescription}>Connect with local experts</Text>
            </View>
          </View>
        </View>

        {/* Testimonials */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Trusted by <Text style={styles.gradientText}>Farmers</Text>
          </Text>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.testimonialsScroll}
          >
            {testimonials.map((testimonial, index) => (
              <View key={index} style={styles.testimonialCard}>
                <View style={styles.testimonialHeader}>
                  <Text style={styles.testimonialAvatar}>{testimonial.avatar}</Text>
                  <View>
                    <Text style={styles.testimonialName}>{testimonial.name}</Text>
                    <Text style={styles.testimonialRole}>{testimonial.role}</Text>
                  </View>
                </View>
                <Text style={styles.testimonialText}>{testimonial.text}</Text>
                <View style={styles.rating}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons key={star} name="star" size={16} color="#FCD34D" />
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* CTA Section */}
        <View style={styles.section}>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>
              Ready to Transform Your <Text style={styles.gradientText}>Farm</Text>?
            </Text>
            <Text style={styles.ctaDescription}>
              Join thousands of successful farmers today. Get started in 2 minutes.
            </Text>

            <View style={styles.ctaStats}>
              <View style={styles.ctaStat}>
                <Ionicons name="checkmark-circle" size={20} color="#00FF88" />
                <Text style={styles.ctaStatText}>Free Forever</Text>
              </View>
              <View style={styles.ctaStat}>
                <Ionicons name="checkmark-circle" size={20} color="#00FF88" />
                <Text style={styles.ctaStatText}>No Credit Card</Text>
              </View>
              <View style={styles.ctaStat}>
                <Ionicons name="checkmark-circle" size={20} color="#00FF88" />
                <Text style={styles.ctaStatText}>Setup in 2min</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => router.push("/SignUp")}
            >
              <Text style={styles.ctaButtonText}>Start Free Trial</Text>
              <Ionicons name="arrow-forward" size={20} color="#0E1410" />
            </TouchableOpacity>

            <Text style={styles.ctaFooter}>
              Already have an account?{' '}
              <Text 
                style={styles.ctaFooterLink}
                onPress={() => router.push("/LogIn")}
              >
                Log In
              </Text>
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerLogo}>
              <View style={styles.logoIcon}>
                <Ionicons name="leaf" size={24} color="#0E1410" />
              </View>
              <Text style={styles.logoText}>UmuhinziHub</Text>
            </View>

            <Text style={styles.footerTagline}>
              Empowering African farmers with AI-driven agriculture technology.
            </Text>

            <View style={styles.socialIcons}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-whatsapp" size={20} color="#00FF88" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={20} color="#00FF88" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-twitter" size={20} color="#00FF88" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="mail-outline" size={20} color="#00FF88" />
              </TouchableOpacity>
            </View>

            <View style={styles.footerLinks}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
              <Text style={styles.footerLink}>Terms of Service</Text>
              <Text style={styles.footerLink}>Support</Text>
              <Text style={styles.footerLink}>Contact</Text>
            </View>

            <Text style={styles.footerCopyright}>
              © 2024 UmuhinziHub. All rights reserved.
            </Text>
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
    backgroundColor: "#0E1410",
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
    backgroundColor: "rgba(14, 20, 16, 0.8)",
  },
  floatingOrb: {
    position: "absolute",
    borderRadius: 999,
  },
  orb1: {
    top: "10%",
    left: "-10%",
    width: 300,
    height: 300,
    backgroundColor: "#00FF88",
    opacity: 0.1,
  },
  orb2: {
    top: "30%",
    right: "-15%",
    width: 400,
    height: 400,
    backgroundColor: "#60A5FA",
    opacity: 0.08,
  },
  orb3: {
    bottom: "20%",
    left: "20%",
    width: 250,
    height: 250,
    backgroundColor: "#FCD34D",
    opacity: 0.06,
  },
  nav: {
    position: "relative",
    zIndex: 1000,
    backgroundColor: "rgba(14, 20, 16, 0.95)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 255, 136, 0.1)",
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
    backgroundColor: "#00FF88",
    padding: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  logoText: {
    color: "#00FF88",
    fontSize: 24,
    fontWeight: "bold",
  },
  menuButton: {
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.2)",
  },
  mobileMenu: {
    backgroundColor: "rgba(14, 20, 16, 0.98)",
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 255, 136, 0.1)",
    padding: 20,
  },
  mobileMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: "rgba(0, 255, 136, 0.05)",
  },
  mobileMenuText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    marginVertical: 16,
  },
  mobileMenuItemBorder: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.3)",
    alignItems: "center",
  },
  mobileMenuTextGreen: {
    color: "#00FF88",
    fontSize: 16,
    fontWeight: "bold",
  },
  mobileMenuItemGradient: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#00FF88",
    alignItems: "center",
  },
  mobileMenuTextBold: {
    color: "#0E1410",
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
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.3)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 30,
  },
  badgeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  badgeText: {
    color: "#00FF88",
    fontSize: 14,
    fontWeight: "600",
  },
  heroTitleLight: {
    color: "#E8F5E8",
    fontSize: 42,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 8,
  },
  heroTitleGradient: {
    color: "#00FF88",
    fontSize: 48,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 52,
  },
  heroDescription: {
    color: "#A7F3D0",
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
    backgroundColor: "#00FF88",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: "#00FF88",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  primaryButtonText: {
    color: "#0E1410",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "rgba(0, 255, 136, 0.3)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  secondaryButtonText: {
    color: "#00FF88",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  carouselContainer: {
    width: "100%",
    marginBottom: 50,
  },
  featureCarouselItem: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 255, 136, 0.05)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
    marginHorizontal: 10,
  },
  featureCarouselIcon: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  featureCarouselTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  featureCarouselDescription: {
    color: "#A7F3D0",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(0, 255, 136, 0.05)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(0, 255, 136, 0.2)",
  },
  statValue: {
    color: "#00FF88",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 4,
  },
  statLabel: {
    color: "#A7F3D0",
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  sectionSubtitle: {
    color: "#A7F3D0",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  gradientText: {
    color: "#00FF88",
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: "rgba(30, 41, 59, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
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
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  featureDescription: {
    color: "#A7F3D0",
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
    backgroundColor: "rgba(0, 255, 136, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  serviceIcon: {
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  serviceTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  serviceDescription: {
    color: "#A7F3D0",
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
    backgroundColor: "rgba(0, 255, 136, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.1)",
    borderRadius: 20,
    padding: 24,
    marginRight: 16,
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  testimonialRole: {
    color: "#00FF88",
    fontSize: 12,
  },
  testimonialText: {
    color: "#A7F3D0",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  rating: {
    flexDirection: "row",
  },
  ctaCard: {
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.2)",
    borderRadius: 24,
    padding: 40,
    alignItems: "center",
  },
  ctaTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  ctaDescription: {
    color: "#A7F3D0",
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
    color: "#fff",
    fontSize: 8.5,
    fontWeight: "600",
  },
  ctaButton: {
    backgroundColor: "#00FF88",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: "100%",
    marginBottom: 20,
    shadowColor: "#00FF88",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  ctaButtonText: {
    color: "#0E1410",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },
  ctaFooter: {
    color: "#A7F3D0",
    fontSize: 14,
    textAlign: "center",
  },
  ctaFooterLink: {
    color: "#00FF88",
    fontWeight: "bold",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 255, 136, 0.1)",
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
    color: "#A7F3D0",
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
    backgroundColor: "rgba(0, 255, 136, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 136, 0.2)",
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  footerLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginBottom: 24,
  },
  footerLink: {
    color: "#00FF88",
    fontSize: 12,
    fontWeight: "600",
  },
  footerCopyright: {
    color: "#64748b",
    fontSize: 12,
    textAlign: "center",
  },
});
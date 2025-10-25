import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isSmallScreen = screenWidth < 375;

// Sample data
const tasks = [
  {
    id: '1',
    title: 'Water Maize',
    crop: 'Maize Field 1',
    type: 'watering',
    date: new Date().toISOString().split('T')[0],
    time: '06:00 AM',
    duration: '2h',
    priority: 'high',
    completed: false,
  },
  {
    id: '2',
    title: 'Fertilize Beans',
    crop: 'Beans Garden',
    type: 'fertilizing',
    date: new Date().toISOString().split('T')[0],
    time: '08:00 AM',
    duration: '1h',
    priority: 'medium',
    completed: false,
  },
  {
    id: '3',
    title: 'Weed Patch',
    crop: 'Vegetable Patch',
    type: 'weeding',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '07:00 AM',
    duration: '2h',
    priority: 'low',
    completed: true,
  },
];

const events = [
  {
    id: '1',
    title: 'Market Day',
    type: 'market',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '08:00 AM',
    location: 'Town Market',
    description: 'Weekly produce market',
  },
];

const cropSchedules = [
  {
    crop: 'Maize',
    stage: 'Vegetative',
    tasks: ['Weeding', 'Fertilizer', 'Pest check'],
    nextStage: 'Tasseling soon'
  },
  {
    crop: 'Beans',
    stage: 'Flowering',
    tasks: ['Watering', 'Support', 'Disease check'],
    nextStage: 'Pod formation'
  }
];

export default function CalendarScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState<'tasks' | 'events' | 'schedule'>('tasks');
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const dailyTasks = tasks.filter(task => task.date === selectedDate);
  const dailyEvents = events.filter(event => event.date === selectedDate);

  // Mobile-optimized week dates
  const getWeekDates = () => {
    const dates = [];
    const today = new Date(selectedDate);
    
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 2),
        number: date.getDate().toString(),
        isToday: date.toDateString() === new Date().toDateString(),
      });
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const toggleTaskCompletion = (taskId: string) => {
    Alert.alert(
      'Mark as completed?',
      'This will mark the task as done.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Mark Complete', onPress: () => {} },
      ]
    );
  };

  const getTaskIcon = (type: string) => {
    const icons = {
      watering: '💧',
      fertilizing: '🌱',
      spraying: '🧪',
      weeding: '🌿',
      testing: '🔬',
      harvesting: '📦',
      planting: '🪴'
    };
    return icons[type as keyof typeof icons] || '📅';
  };

  const getTaskColor = (type: string) => {
    const colors = {
      watering: '#60A5FA',
      fertilizing: '#00FF88',
      spraying: '#FCD34D',
      weeding: '#84CC16',
      testing: '#D8BFD8',
      harvesting: '#F97316',
      planting: '#10B981'
    };
    return colors[type as keyof typeof colors] || '#aaa';
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'high' ? '#F87171' : 
           priority === 'medium' ? '#FCD34D' : '#60A5FA';
  };

  const TaskItem = ({ task }: { task: any }) => (
    <TouchableOpacity 
      style={styles.taskItem}
      onPress={() => toggleTaskCompletion(task.id)}
    >
      <View style={[styles.taskIcon, { backgroundColor: `${getTaskColor(task.type)}20` }]}>
        <Text style={styles.taskIconText}>{getTaskIcon(task.type)}</Text>
      </View>
      
      <View style={styles.taskContent}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle} numberOfLines={1}>{task.title}</Text>
          <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
        </View>
        <Text style={styles.taskCrop} numberOfLines={1}>{task.crop}</Text>
        <View style={styles.taskMeta}>
          <Text style={styles.taskTime}>{task.time}</Text>
          <Text style={styles.taskDuration}>• {task.duration}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.checkbox, task.completed && styles.checkboxChecked]}
        onPress={() => toggleTaskCompletion(task.id)}
      >
        {task.completed && <Ionicons name="checkmark" size={14} color="#0E1410" />}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const EventItem = ({ event }: { event: any }) => (
    <View style={styles.eventItem}>
      <View style={[styles.eventIcon, { backgroundColor: 'rgba(0, 255, 136, 0.2)' }]}>
        <Text style={styles.eventIconText}>🛒</Text>
      </View>
      
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle} numberOfLines={1}>{event.title}</Text>
        <Text style={styles.eventDescription} numberOfLines={1}>{event.description}</Text>
        <View style={styles.eventMeta}>
          <Ionicons name="time" size={10} color="#aaa" />
          <Text style={styles.eventTime}>{event.time}</Text>
        </View>
      </View>
    </View>
  );

  const CropScheduleItem = ({ schedule }: { schedule: any }) => (
    <View style={styles.cropScheduleItem}>
      <View style={styles.cropHeader}>
        <Text style={styles.cropName}>{schedule.crop}</Text>
        <View style={styles.stageBadge}>
          <Text style={styles.stageText}>{schedule.stage}</Text>
        </View>
      </View>
      <Text style={styles.nextStage}>Next: {schedule.nextStage}</Text>
      <View style={styles.tasksList}>
        {schedule.tasks.slice(0, 2).map((task: string, index: number) => (
          <View key={index} style={styles.cropTask}>
            <Ionicons name="checkmark-circle" size={12} color="#00FF88" />
            <Text style={styles.cropTaskText} numberOfLines={1}>{task}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/activities/new')}
        >
          <Ionicons name="add" size={22} color="#00FF88" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Week Calendar */}
        <View style={styles.weekCard}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.weekScrollContent}
          >
            {weekDates.map((day) => {
              const dayTasks = tasks.filter(task => task.date === day.date);
              const hasTasks = dayTasks.length > 0;
              const hasHighPriority = dayTasks.some(task => task.priority === 'high' && !task.completed);
              
              return (
                <TouchableOpacity
                  key={day.date}
                  style={[
                    styles.dayButton,
                    selectedDate === day.date && styles.dayButtonSelected,
                    day.isToday && styles.dayButtonToday,
                  ]}
                  onPress={() => setSelectedDate(day.date)}
                >
                  <Text style={[
                    styles.dayText,
                    selectedDate === day.date && styles.dayTextSelected,
                    day.isToday && styles.dayTextToday,
                  ]}>
                    {day.day}
                  </Text>
                  <Text style={[
                    styles.dateNumber,
                    selectedDate === day.date && styles.dateNumberSelected,
                    day.isToday && styles.dateNumberToday,
                  ]}>
                    {day.number}
                  </Text>
                  
                  {/* Task indicators */}
                  <View style={styles.taskIndicators}>
                    {hasHighPriority && <View style={styles.highPriorityIndicator} />}
                    {hasTasks && !hasHighPriority && <View style={styles.taskIndicator} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* View Toggle - Simplified for mobile */}
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              view === 'tasks' && styles.toggleButtonActive,
            ]}
            onPress={() => setView('tasks')}
          >
            <Ionicons 
              name="list" 
              size={16} 
              color={view === 'tasks' ? '#0E1410' : '#aaa'} 
            />
            <Text style={[
              styles.toggleText,
              view === 'tasks' && styles.toggleTextActive,
            ]}>
              Tasks
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              view === 'events' && styles.toggleButtonActive,
            ]}
            onPress={() => setView('events')}
          >
            <Ionicons 
              name="calendar" 
              size={16} 
              color={view === 'events' ? '#0E1410' : '#aaa'} 
            />
            <Text style={[
              styles.toggleText,
              view === 'events' && styles.toggleTextActive,
            ]}>
              Events
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              view === 'schedule' && styles.toggleButtonActive,
            ]}
            onPress={() => setView('schedule')}
          >
            <Ionicons 
              name="leaf" 
              size={16} 
              color={view === 'schedule' ? '#0E1410' : '#aaa'} 
            />
            <Text style={[
              styles.toggleText,
              view === 'schedule' && styles.toggleTextActive,
            ]}>
              Crops
            </Text>
          </TouchableOpacity>
        </View>

        {/* Selected Date Header */}
        <View style={styles.dateHeader}>
          <Text style={styles.dateTitle}>
            {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </Text>
          <Text style={styles.dateSubtitle}>
            {view === 'tasks' && `${dailyTasks.length} tasks`}
            {view === 'events' && `${dailyEvents.length} events`}
            {view === 'schedule' && 'Crop schedule'}
          </Text>
        </View>

        {/* Tasks View */}
        {view === 'tasks' && (
          <View style={styles.contentSection}>
            {dailyTasks.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="checkmark-done" size={48} color="#2D4A3A" />
                <Text style={styles.emptyTitle}>No Tasks Today</Text>
                <Text style={styles.emptyDescription}>
                  All caught up! Add new tasks to stay organized.
                </Text>
                <TouchableOpacity 
                  style={styles.primaryButton}
                  onPress={() => router.push('/activities/new')}
                >
                  <Ionicons name="add" size={16} color="#0E1410" />
                  <Text style={styles.primaryButtonText}>Add Task</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.tasksList}>
                {dailyTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </View>
            )}
          </View>
        )}

        {/* Events View */}
        {view === 'events' && (
          <View style={styles.contentSection}>
            {dailyEvents.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="calendar-outline" size={48} color="#2D4A3A" />
                <Text style={styles.emptyTitle}>No Events</Text>
                <Text style={styles.emptyDescription}>
                  No events scheduled for this day.
                </Text>
              </View>
            ) : (
              <View style={styles.eventsList}>
                {dailyEvents.map((event) => (
                  <EventItem key={event.id} event={event} />
                ))}
              </View>
            )}
          </View>
        )}

        {/* Crop Schedule View */}
        {view === 'schedule' && (
          <View style={styles.contentSection}>
            <View style={styles.cropSchedules}>
              {cropSchedules.map((schedule, index) => (
                <CropScheduleItem key={index} schedule={schedule} />
              ))}
            </View>
          </View>
        )}

        {/* Quick Stats - Simplified */}
        <View style={styles.statsCard}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {tasks.filter(t => !t.completed).length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {tasks.filter(t => t.completed).length}
            </Text>
            <Text style={styles.statLabel}>Done</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {tasks.filter(t => t.priority === 'high' && !t.completed).length}
            </Text>
            <Text style={styles.statLabel}>Urgent</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => router.push('/activities/new')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(0, 255, 136, 0.2)' }]}>
              <Ionicons name="add" size={20} color="#00FF88" />
            </View>
            <Text style={styles.quickActionText}>Add Task</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => router.push('/tips')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(96, 165, 250, 0.2)' }]}>
              <Ionicons name="book" size={20} color="#60A5FA" />
            </View>
            <Text style={styles.quickActionText}>Tips</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => router.push('/notifications')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: 'rgba(252, 211, 77, 0.2)' }]}>
              <Ionicons name="notifications" size={20} color="#FCD34D" />
            </View>
            <Text style={styles.quickActionText}>Reminders</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E3A2E',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 4,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  // Week Calendar
  weekCard: {
    backgroundColor: '#1E261E',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#2D4A3A',
  },
  weekScrollContent: {
    paddingHorizontal: 4,
  },
  dayButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: isSmallScreen ? 10 : 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 2,
    minWidth: isSmallScreen ? 44 : 48,
  },
  dayButtonSelected: {
    backgroundColor: '#00FF88',
  },
  dayButtonToday: {
    borderWidth: 1.5,
    borderColor: '#00FF88',
  },
  dayText: {
    color: '#aaa',
    fontSize: isSmallScreen ? 10 : 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  dayTextSelected: {
    color: '#0E1410',
  },
  dayTextToday: {
    color: '#00FF88',
  },
  dateNumber: {
    color: '#fff',
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  dateNumberSelected: {
    color: '#0E1410',
  },
  dateNumberToday: {
    color: '#00FF88',
  },
  taskIndicators: {
    flexDirection: 'row',
    gap: 2,
    height: 3,
  },
  taskIndicator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#60A5FA',
  },
  highPriorityIndicator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#F87171',
  },
  // View Toggle
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#1E261E',
    borderRadius: 10,
    padding: 3,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#2D4A3A',
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    gap: 4,
  },
  toggleButtonActive: {
    backgroundColor: '#00FF88',
  },
  toggleText: {
    color: '#aaa',
    fontSize: isSmallScreen ? 12 : 13,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#0E1410',
  },
  // Date Header
  dateHeader: {
    marginVertical: 12,
  },
  dateTitle: {
    color: '#fff',
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  dateSubtitle: {
    color: '#00FF88',
    fontSize: isSmallScreen ? 12 : 13,
  },
  // Content Sections
  contentSection: {
    marginBottom: 16,
  },
  // Tasks
  tasksList: {
    gap: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2B3E',
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#00FF88',
  },
  taskIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  taskIconText: {
    fontSize: 16,
  },
  taskContent: {
    flex: 1,
    marginRight: 8,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  taskTitle: {
    color: '#fff',
    fontSize: isSmallScreen ? 14 : 15,
    fontWeight: '600',
    flex: 1,
    marginRight: 6,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  taskCrop: {
    color: '#aaa',
    fontSize: isSmallScreen ? 11 : 12,
    marginBottom: 2,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTime: {
    color: '#00FF88',
    fontSize: isSmallScreen ? 10 : 11,
    fontWeight: '600',
  },
  taskDuration: {
    color: '#888',
    fontSize: isSmallScreen ? 10 : 11,
    marginLeft: 4,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#00FF88',
    borderColor: '#00FF88',
  },
  // Events
  eventsList: {
    gap: 8,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2B3E',
    borderRadius: 10,
    padding: 12,
  },
  eventIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  eventIconText: {
    fontSize: 16,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    color: '#fff',
    fontSize: isSmallScreen ? 14 : 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  eventDescription: {
    color: '#aaa',
    fontSize: isSmallScreen ? 11 : 12,
    marginBottom: 4,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventTime: {
    color: '#aaa',
    fontSize: isSmallScreen ? 10 : 11,
    marginLeft: 4,
  },
  // Crop Schedule
  cropSchedules: {
    gap: 8,
  },
  cropScheduleItem: {
    backgroundColor: '#2C2B3E',
    borderRadius: 10,
    padding: 12,
  },
  cropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cropName: {
    color: '#fff',
    fontSize: isSmallScreen ? 14 : 15,
    fontWeight: 'bold',
  },
  stageBadge: {
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  stageText: {
    color: '#00FF88',
    fontSize: isSmallScreen ? 10 : 11,
    fontWeight: '600',
  },
  nextStage: {
    color: '#aaa',
    fontSize: isSmallScreen ? 11 : 12,
    marginBottom: 8,
  },
//   tasksList: {
//     gap: 4,
//   },
  cropTask: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cropTaskText: {
    color: '#aaa',
    fontSize: isSmallScreen ? 11 : 12,
    flex: 1,
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyDescription: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#00FF88',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#0E1410',
    fontSize: 13,
    fontWeight: 'bold',
  },
  // Stats
  statsCard: {
    backgroundColor: '#1E261E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#2D4A3A',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#00FF88',
    fontSize: isSmallScreen ? 18 : 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    color: '#aaa',
    fontSize: isSmallScreen ? 10 : 11,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#2D4A3A',
  },
  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    gap: 8,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1E261E',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2D4A3A',
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  quickActionText: {
    color: '#fff',
    fontSize: isSmallScreen ? 11 : 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
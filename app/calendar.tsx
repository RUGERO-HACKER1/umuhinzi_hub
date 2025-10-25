import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const tasks = [
  {
    id: '1',
    title: 'Water Maize Field',
    crop: 'Maize Field 1',
    type: 'watering',
    date: '2024-06-15',
    time: 'Morning',
    priority: 'high',
    completed: false,
  },
  {
    id: '2',
    title: 'Fertilize Beans',
    crop: 'Beans Garden',
    type: 'fertilizing',
    date: '2024-06-16',
    time: 'Afternoon',
    priority: 'medium',
    completed: false,
  },
  {
    id: '3',
    title: 'Spray for Pests',
    crop: 'Coffee Plantation',
    type: 'spraying',
    date: '2024-06-17',
    time: 'Morning',
    priority: 'high',
    completed: false,
  },
  {
    id: '4',
    title: 'Weed Vegetable Patch',
    crop: 'Vegetable Patch',
    type: 'weeding',
    date: '2024-06-18',
    time: 'Morning',
    priority: 'low',
    completed: true,
  },
  {
    id: '5',
    title: 'Soil Testing',
    crop: 'All Fields',
    type: 'testing',
    date: '2024-06-20',
    time: 'Afternoon',
    priority: 'medium',
    completed: false,
  },
];

const events = [
  {
    id: '1',
    title: 'Market Day',
    type: 'market',
    date: '2024-06-22',
    description: 'Weekly produce market',
  },
  {
    id: '2',
    title: 'Farming Workshop',
    type: 'workshop',
    date: '2024-06-25',
    description: 'Organic farming techniques',
  },
  {
    id: '3',
    title: 'Harvest Festival',
    type: 'festival',
    date: '2024-07-01',
    description: 'Community harvest celebration',
  },
];

export default function CalendarScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('2024-06-15');
  const [view, setView] = useState<'tasks' | 'events'>('tasks');

  // Get tasks for selected date
  const dailyTasks = tasks.filter(task => task.date === selectedDate);
  const dailyEvents = events.filter(event => event.date === selectedDate);

  const toggleTaskCompletion = (taskId: string) => {
    // In real app, update task completion status
    console.log('Toggle task:', taskId);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'watering': return '💧';
      case 'fertilizing': return '🌱';
      case 'spraying': return '🧪';
      case 'weeding': return '🌿';
      case 'testing': return '🔬';
      default: return '📅';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F87171';
      case 'medium': return '#FCD34D';
      case 'low': return '#60A5FA';
      default: return '#aaa';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'market': return '🛒';
      case 'workshop': return '📚';
      case 'festival': return '🎉';
      default: return '📅';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'market': return '#00FF88';
      case 'workshop': return '#60A5FA';
      case 'festival': return '#FCD34D';
      default: return '#aaa';
    }
  };

  // Sample calendar dates for the current week
  const weekDates = [
    { date: '2024-06-15', day: 'Sat', number: '15' },
    { date: '2024-06-16', day: 'Sun', number: '16' },
    { date: '2024-06-17', day: 'Mon', number: '17' },
    { date: '2024-06-18', day: 'Tue', number: '18' },
    { date: '2024-06-19', day: 'Wed', number: '19' },
    { date: '2024-06-20', day: 'Thu', number: '20' },
    { date: '2024-06-21', day: 'Fri', number: '21' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#00FF88" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Farming Calendar</Text>
        <TouchableOpacity onPress={() => router.push('/activities/new')}>
          <Ionicons name="add" size={24} color="#00FF88" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Week View */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This Week</Text>
          <View style={styles.weekView}>
            {weekDates.map((day) => (
              <TouchableOpacity
                key={day.date}
                style={[
                  styles.dayButton,
                  selectedDate === day.date && styles.dayButtonSelected,
                ]}
                onPress={() => setSelectedDate(day.date)}
              >
                <Text style={[
                  styles.dayText,
                  selectedDate === day.date && styles.dayTextSelected,
                ]}>
                  {day.day}
                </Text>
                <Text style={[
                  styles.dateNumber,
                  selectedDate === day.date && styles.dateNumberSelected,
                ]}>
                  {day.number}
                </Text>
                
                {/* Task indicators */}
                <View style={styles.taskIndicators}>
                  {tasks.filter(task => task.date === day.date && !task.completed).length > 0 && (
                    <View style={styles.pendingIndicator} />
                  )}
                  {tasks.filter(task => task.date === day.date && task.completed).length > 0 && (
                    <View style={styles.completedIndicator} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              view === 'tasks' && styles.toggleButtonActive,
            ]}
            onPress={() => setView('tasks')}
          >
            <Text style={[
              styles.toggleText,
              view === 'tasks' && styles.toggleTextActive,
            ]}>
              Tasks ({dailyTasks.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              view === 'events' && styles.toggleButtonActive,
            ]}
            onPress={() => setView('events')}
          >
            <Text style={[
              styles.toggleText,
              view === 'events' && styles.toggleTextActive,
            ]}>
              Events ({dailyEvents.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tasks View */}
        {view === 'tasks' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Tasks for {new Date(selectedDate).toLocaleDateString()}
              </Text>
              <Text style={styles.sectionSubtitle}>
                {dailyTasks.filter(t => !t.completed).length} pending, {dailyTasks.filter(t => t.completed).length} completed
              </Text>
            </View>

            {dailyTasks.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="checkmark-done" size={48} color="#666" />
                <Text style={styles.emptyTitle}>No Tasks Scheduled</Text>
                <Text style={styles.emptyDescription}>
                  Youre all caught up for this day! Add new tasks to stay organized.
                </Text>
                <TouchableOpacity 
                  style={styles.primaryButton}
                  onPress={() => router.push('/activities/new')}
                >
                  <Ionicons name="add" size={20} color="#0E1410" />
                  <Text style={styles.primaryButtonText}>Add Task</Text>
                </TouchableOpacity>
              </View>
            ) : (
              dailyTasks.map((task) => (
                <TouchableOpacity
                  key={task.id}
                  style={[
                    styles.taskItem,
                    task.completed && styles.taskItemCompleted,
                  ]}
                  onPress={() => toggleTaskCompletion(task.id)}
                >
                  <View style={styles.taskIcon}>
                    <Text style={styles.taskIconText}>{getTaskIcon(task.type)}</Text>
                  </View>
                  
                  <View style={styles.taskContent}>
                    <Text style={[
                      styles.taskTitle,
                      task.completed && styles.taskTitleCompleted,
                    ]}>
                      {task.title}
                    </Text>
                    <Text style={styles.taskCrop}>{task.crop}</Text>
                    <Text style={styles.taskTime}>{task.time}</Text>
                  </View>

                  <View style={styles.taskActions}>
                    <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
                    <TouchableOpacity
                      style={[
                        styles.checkbox,
                        task.completed && styles.checkboxChecked,
                      ]}
                    >
                      {task.completed && (
                        <Ionicons name="checkmark" size={16} color="#0E1410" />
                      )}
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

        {/* Events View */}
        {view === 'events' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Events on {new Date(selectedDate).toLocaleDateString()}
              </Text>
            </View>

            {dailyEvents.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="calendar-outline" size={48} color="#666" />
                <Text style={styles.emptyTitle}>No Events Scheduled</Text>
                <Text style={styles.emptyDescription}>
                  No community events or markets scheduled for this day.
                </Text>
              </View>
            ) : (
              dailyEvents.map((event) => (
                <View key={event.id} style={styles.eventItem}>
                  <View style={[
                    styles.eventIcon,
                    { backgroundColor: `${getEventColor(event.type)}20` }
                  ]}>
                    <Text style={styles.eventIconText}>{getEventIcon(event.type)}</Text>
                  </View>
                  
                  <View style={styles.eventContent}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDescription}>{event.description}</Text>
                  </View>

                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </View>
              ))
            )}
          </View>
        )}

        {/* Upcoming Tasks */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Upcoming Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllLink}>View All</Text>
            </TouchableOpacity>
          </View>

          {tasks
            .filter(task => !task.completed && task.date !== selectedDate)
            .slice(0, 3)
            .map((task) => (
              <View key={task.id} style={styles.upcomingTask}>
                <View style={styles.upcomingTaskInfo}>
                  <Text style={styles.upcomingTaskTitle}>{task.title}</Text>
                  <Text style={styles.upcomingTaskDate}>
                    {new Date(task.date).toLocaleDateString()} • {task.crop}
                  </Text>
                </View>
                <View style={[styles.upcomingPriority, { backgroundColor: getPriorityColor(task.priority) }]} />
              </View>
            ))
          }

          {tasks.filter(task => !task.completed && task.date !== selectedDate).length === 0 && (
            <Text style={styles.noUpcomingText}>No upcoming tasks</Text>
          )}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsCard}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {tasks.filter(t => !t.completed).length}
            </Text>
            <Text style={styles.statLabel}>Pending Tasks</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {tasks.filter(t => t.completed).length}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {tasks.filter(t => t.priority === 'high' && !t.completed).length}
            </Text>
            <Text style={styles.statLabel}>High Priority</Text>
          </View>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllLink: {
    color: '#00FF88',
    fontSize: 14,
    fontWeight: '600',
  },
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    minWidth: 50,
  },
  dayButtonSelected: {
    backgroundColor: '#00FF88',
  },
  dayText: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  dayTextSelected: {
    color: '#0E1410',
  },
  dateNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dateNumberSelected: {
    color: '#0E1410',
  },
  taskIndicators: {
    flexDirection: 'row',
    gap: 2,
  },
  pendingIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F87171',
  },
  completedIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00FF88',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#2C2B3E',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#1E261E',
  },
  toggleText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#aaa',
    fontSize: 14,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2B3E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  taskItemCompleted: {
    opacity: 0.6,
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  taskIconText: {
    fontSize: 18,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  taskCrop: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 2,
  },
  taskTime: {
    color: '#888',
    fontSize: 11,
  },
  taskActions: {
    alignItems: 'center',
    gap: 8,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#00FF88',
    borderColor: '#00FF88',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2B3E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventIconText: {
    fontSize: 18,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventDescription: {
    color: '#aaa',
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: '#00FF88',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primaryButtonText: {
    color: '#0E1410',
    fontSize: 14,
    fontWeight: 'bold',
  },
  upcomingTask: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2D4A3A',
  },
  upcomingTaskInfo: {
    flex: 1,
  },
  upcomingTaskTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  upcomingTaskDate: {
    color: '#aaa',
    fontSize: 12,
  },
  upcomingPriority: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  noUpcomingText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
  },
  statsCard: {
    backgroundColor: '#1E261E',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#00FF88',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#2D4A3A',
  },
});
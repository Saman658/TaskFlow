
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type TaskFilter = "All" | "Pending" | "Completed";

const STORAGE_KEY = "tasks";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("All");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved tasks
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedTasks !== null) {
          const parsedTasks: unknown = JSON.parse(savedTasks);

          if (
            Array.isArray(parsedTasks) &&
            parsedTasks.every(
              (item) =>
                item !== null &&
                typeof item === "object" &&
                typeof item.id === "string" &&
                typeof item.title === "string" &&
                typeof item.description === "string" &&
                typeof item.completed === "boolean"
            )
          ) {
            setTasks(parsedTasks as Task[]);
          }
        }
      } catch (error) {
        console.log("Error loading tasks:", error);
        Alert.alert("Error", "Could not load saved tasks.");
      } finally {
        setIsLoaded(true);
      }
    };

    loadTasks();
  }, []);

  // Save tasks
  useEffect(() => {
    if (!isLoaded) return;

    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(tasks)
        );
      } catch (error) {
        console.log("Error saving tasks:", error);
        Alert.alert("Error", "Could not save tasks.");
      }
    };

    saveTasks();
  }, [tasks, isLoaded]);

  // Add a task
  const addTask = () => {
    if (!task.trim()) {
      Alert.alert("Missing Task", "Please enter a task title.");
      return;
    }

    const newTask: Task = {
      id: `${Date.now()}-${Math.random()}`,
      title: task.trim(),
      description: description.trim(),
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
    setTask("");
    setDescription("");
    setFilter("All");
    setSearch("");
  };

  // Clear title and description inputs
  const clearInput = () => {
    setTask("");
    setDescription("");
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks((previousTasks) =>
      previousTasks.filter((item) => item.id !== id)
    );
  };

  // Complete or undo a task
  const toggleTask = (id: string) => {
    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  // Search and filter tasks together
  const filteredTasks = tasks.filter((item) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    const matchesFilter =
      filter === "All" ||
      (filter === "Pending" && !item.completed) ||
      (filter === "Completed" && item.completed);

    return matchesSearch && matchesFilter;
  });

  // Clear all tasks after confirmation
  const handleClearAll = () => {
    Alert.alert(
      "Clear All Tasks",
      "Are you sure you want to delete all tasks?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => setTasks([]),
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>TaskFlow</Text>

      <Text style={styles.subtitle}>
        Hello! Ready to plan your day?
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Task Title"
        placeholderTextColor="#6B7280"
        value={task}
        onChangeText={setTask}
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Task Description"
        placeholderTextColor="#6B7280"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Pressable style={styles.addButton} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>

      <Pressable style={styles.clearButton} onPress={clearInput}>
        <Text style={styles.buttonText}>CLEAR INPUT</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>My Tasks</Text>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title or description..."
        placeholderTextColor="#6B7280"
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        onSubmitEditing={() => setSearch("")}
      />

      <Pressable
        style={styles.clearSearchButton}
        onPress={() => setSearch("")}
      >
        <Text style={styles.clearSearchText}>✖ Clear Search</Text>
      </Pressable>

      {/* Task filters */}
      <Text style={styles.filterHeading}>Filter Tasks</Text>

      <View style={styles.filterRow}>
        {(["All", "Pending", "Completed"] as TaskFilter[]).map(
          (item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              style={[
                styles.filterButton,
                filter === item && styles.activeFilterButton,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item && styles.activeFilterText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <Text style={styles.resultText}>
        Showing {filteredTasks.length} of {tasks.length} tasks
      </Text>

      {!isLoaded ? (
        <Text style={styles.emptyText}>Loading tasks...</Text>
      ) : filteredTasks.length === 0 ? (
        <Text style={styles.emptyText}>
          {tasks.length === 0
            ? "No tasks yet! Add your first task."
            : "No matching tasks found."}
        </Text>
      ) : (
        <View style={styles.taskGrid}>
          {filteredTasks.map((item) => (
            <View key={item.id} style={styles.taskCard}>
              <Text
                style={[
                  styles.taskTitle,
                  item.completed && styles.completedTask,
                ]}
              >
                {item.title}
              </Text>

              {item.description ? (
                <Text style={styles.taskDescription}>
                  {item.description}
                </Text>
              ) : null}

              <Text
                style={[
                  styles.statusText,
                  item.completed
                    ? styles.completedStatus
                    : styles.pendingStatus,
                ]}
              >
                {item.completed ? "Completed" : "Pending"}
              </Text>

              <Pressable
                style={styles.completeButton}
                onPress={() => toggleTask(item.id)}
              >
                <Text style={styles.buttonText}>
                  {item.completed ? "Undo ↩️" : "Complete ✅"}
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.buttonText}>Delete 🗑️</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}

      {tasks.length > 0 && (
        <Pressable
          style={styles.clearAllButton}
          onPress={handleClearAll}
        >
          <Text style={styles.buttonText}>DELETE ALL TASKS</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111827",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#374151",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#A3A3A3",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
    color: "#111827",
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  addButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  clearButton: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 22,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#111827",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#2563EB",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },
  clearSearchButton: {
    alignSelf: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  clearSearchText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "bold",
  },
  filterHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  filterButton: {
    flex: 1,
    minWidth: 85,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2563EB",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  activeFilterButton: {
    backgroundColor: "#2563EB",
  },
  filterText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 14,
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  resultText: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 14,
  },
  taskGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  taskCard: {
    width: "48%",
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#6B7280",
  },
  taskDescription: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 6,
  },
  completedStatus: {
    color: "#15803D",
  },
  pendingStatus: {
    color: "#B45309",
  },
  completeButton: {
    backgroundColor: "#16A34A",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  deleteButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
    marginVertical: 20,
    textAlign: "center",
  },
  clearAllButton: {
    backgroundColor: "#991B1B",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
});

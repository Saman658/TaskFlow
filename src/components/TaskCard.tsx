
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type TaskCardProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskCard({
  task,
  onToggle,
  onDelete,
}: TaskCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{task.title}</Text>

      {task.description ? (
        <Text style={styles.description}>{task.description}</Text>
      ) : null}

      <Text style={styles.status}>
        {task.completed ? "Completed" : "Pending"}
      </Text>

      <View style={styles.buttons}>
        <Pressable
          style={styles.completeButton}
          onPress={() => onToggle(task.id)}
        >
          <Text style={styles.buttonText}>
            {task.completed ? "Undo" : "Complete"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(task.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },
  status: {
    marginTop: 8,
    fontWeight: "600",
    color: "#2563EB",
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  completeButton: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#DC2626",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

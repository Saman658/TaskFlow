
import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import AppButton from "./AppButton";

type TaskInputProps = {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onAddTask: () => void;
};

export default function TaskInput({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onAddTask,
}: TaskInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={onTitleChange}
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter task description"
        value={description}
        onChangeText={onDescriptionChange}
        multiline
      />

      <AppButton
        title="Add Task"
        onPress={onAddTask}
        disabled={!title.trim()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
});

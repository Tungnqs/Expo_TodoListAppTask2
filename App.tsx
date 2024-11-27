import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";

interface Todo {
  id: string;
  text: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const addTodo = () => {
    if (inputText.trim()) {
      if (editingId) {
        setTodos(
          todos.map((todo) =>
            todo.id === editingId ? { ...todo, text: inputText } : todo
          )
        );
        setEditingId(null);
      } else {
        setTodos([...todos, { id: Date.now().toString(), text: inputText }]);
      }
      setInputText("");
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setInputText(todoToEdit.text);
      setEditingId(id);
    }
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.text}</Text>
      <View style={styles.todoButtons}>
        <TouchableOpacity
          onPress={() => editTodo(item.id)}
          style={styles.editButton}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteTodo(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter a task"
        />
        <TouchableOpacity onPress={addTodo} style={styles.addButton}>
          <Text style={styles.buttonText}>{editingId ? "Update" : "Add"}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 6,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  list: {
    width: "100%",
  },
  todoItem: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    marginHorizontal: 10,
    gap: 5,
  },
  todoText: {
    fontSize: 18,
    flexShrink: 1
  },
  todoButtons: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 8,
    borderRadius: 4,
  },
});

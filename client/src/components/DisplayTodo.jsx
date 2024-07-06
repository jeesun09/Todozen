import { Box, Input, useToast } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { TodoState } from "../context/TodoProvider";
import axios from "axios";

const DisplayTodo = ({ todos }) => {
  const toast = useToast();
  const { user, setTodos } = TodoState();
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const todoDelete = async (id) => {
    if (!user || !user.token) {
      toast({
        title: "An error occurred.",
        description: "User is not authenticated. Please Login to continue.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const options = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      await axios.delete(
        `https://todozen-iolq.onrender.com/api/todo/deleteTodo/${id}`,
        options
      );
      setTodos(todos.filter((todo) => todo._id !== id));
      toast({
        title: "Todo deleted.",
        description: "Todo has been deleted successfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to delete todo.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const todoEdit = (id, title, body) => {
    if (editId === id) {
      setEditId(null); // If the same todo is clicked, exit edit mode
      setEditTitle(""); // Reset the edit fields
      setEditBody("");
    } else {
      setEditId(id); // Enter edit mode for clicked todo
      setEditTitle(title); // Set the current title and body
      setEditBody(body);
    }
  };

  const handleEditTodo = async () => {
    if (!user || !user.token) {
      toast({
        title: "An error occurred.",
        description: "User is not authenticated. Please Login to continue.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    const options = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      const updateTodo = { title: editTitle, body: editBody };
      await axios.put(
        `https://todozen-iolq.onrender.com/api/todo/updateTodo/${editId}`,
        updateTodo,
        options
      );
      setTodos(
        todos.map((todo) =>
          todo._id === editId
            ? { ...todo, title: editTitle, body: editBody }
            : todo
        )
      );
      toast({
        title: "Todo updated.",
        description: "Todo has been updated successfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      setEditId(null); // Exit edit mode
      setEditTitle(""); // Reset the edit fields
      setEditBody("");
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to update todo.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleTitleChange = (e) => setEditTitle(e.target.value);
  const handleBodyChange = (e) => setEditBody(e.target.value);

  return (
    <Box w="70%">
      {todos.map((todo) => (
        <Box
          key={todo._id}
          p={4}
          borderWidth={1}
          borderRadius="lg"
          borderColor={editId !== todo._id ? "gray.200" : "blue.400"}
          my={2}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <Input
              fontWeight="bold"
              value={editId === todo._id ? editTitle : todo.title}
              variant={editId === todo._id ? "flushed" : "unstyled"}
              isReadOnly={editId !== todo._id}
              onChange={editId === todo._id ? handleTitleChange : null}
            />
            <Input
              variant={editId === todo._id ? "flushed" : "unstyled"}
              value={editId === todo._id ? editBody : todo.body}
              isReadOnly={editId !== todo._id}
              onChange={editId === todo._id ? handleBodyChange : null}
            />{" "}
          </Box>
          <Box display={"flex"} gap={3}>
            <EditIcon
              cursor={"pointer"}
              onClick={() => todoEdit(todo._id, todo.title, todo.body)}
            />
            {editId === todo._id ? (
              <CheckIcon onClick={handleEditTodo} cursor={"pointer"} />
            ) : (
              <DeleteIcon
                cursor={"pointer"}
                onClick={() => todoDelete(todo._id)}
              />
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default DisplayTodo;

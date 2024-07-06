import { Container, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import CreateTodo from "../components/CreateTodo";
import { TodoState } from "../context/TodoProvider";
import axios from "axios";
import DisplayTodo from "../components/DisplayTodo";

const Todo = () => {
  const toast = useToast();
  const { user, todos, setTodos } = TodoState();

  useEffect(() => {
    if (todos.length === 0) {
      if (user && user.token) {
        const fetchTodos = async () => {
          const options = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          try {
            const response = await axios.get(
              "https://todozen-iolq.onrender.com/api/todo/getTodos",
              options
            );
            setTodos(response.data.data);
          } catch (error) {
            toast({
              title: "An error occurred.",
              description: "Unable to fetch todos.",
              status: "error",
              duration: 4000,
              isClosable: true,
              position: "top",
            });
          }
        };
        fetchTodos();
      }
    }
  }, [user, todos]);

  return (
    <Container centerContent maxW={"90%"} bg={"white"} minH={'100vh'}>
      <Navbar />
      <CreateTodo />
      <DisplayTodo todos={todos} />
    </Container>
  );
};

export default Todo;

import { Button, Input, Stack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { TodoState } from "../context/TodoProvider";
import axios from "axios";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { user, setTodos } = TodoState();

  const createTodo = async () => {
    setLoading(true);

    if (!title || !body) {
      toast({
        title: "Error",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

       const response = await axios.post(
         "https://todozen-iolq.onrender.com/api/todo/createTodo",
         { title, body },
         options
       );
      toast({
        title: "Success",
        description: "Todo created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setTitle("");
      setBody("");
      setTodos((prev) => [...prev, response.data.data]);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  return (
    <Stack
      boxShadow="outline"
      m={2}
      p={1}
      borderRadius={"lg"}
      width={{ base: "100%", lg: "70%" }}
    >
      <Input
        value={title}
        variant="flushed"
        placeholder="Enter the title "
        onChange={(e) => setTitle(e.target.value)}
        fontSize={{ base: "20px", lg: "25px" }}
      />
      <Input
        value={body}
        variant="outline"
        placeholder="Enter the body"
        onChange={(e) => setBody(e.target.value)}
        fontSize={{ base: "20px", lg: "25px" }}
      />
      <Button
        width={{ base: "30%", md: "20%", lg: "15%" }}
        onClick={createTodo}
        isLoading={loading}
      >
        Enter
      </Button>
    </Stack>
  );
};

export default CreateTodo;

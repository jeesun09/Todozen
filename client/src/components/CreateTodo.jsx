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
        "http://localhost:3000/api/todo/createTodo",
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
    <Stack w={"70%"} boxShadow="outline" m={2} p={1} borderRadius={'lg'}>
      <Input
        value={title}
        variant="flushed"
        placeholder="Enter the title "
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        value={body}
        variant="outline"
        placeholder="Enter the body"
        onChange={(e) => setBody(e.target.value)}
      />
      <Button width={"15%"} onClick={createTodo} isLoading={loading}>
        Enter
      </Button>
    </Stack>
  );
};

export default CreateTodo;

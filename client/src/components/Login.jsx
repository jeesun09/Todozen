import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handlePasswordShow = () => setShow(!show);

  const loginHandler = async () => {
    setLoading(true);

    //email and password check
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const option = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:3000/api/user/login",
        { email, password },
        option
      );

      toast({
        title: "Login Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/todo");
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  return (
    <VStack>
      <FormControl id="email" isRequired="true">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          variant={"filled"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired="true">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            variant={"filled"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} onClick={handlePasswordShow} size={"sm"}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        width={"40%"}
        mt={15}
        onClick={loginHandler}
        borderRadius={"full"}
        colorScheme={"pink"}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;

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
import React, {  useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();


  const handlePasswordShow = () => setShow(!show);

  const signinHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordConfirmation", passwordConfirmation);
    formData.append("avatar", avatar);

    //password and confirm password check
    if (password !== passwordConfirmation) {
      toast({
        title: "Password and Confirm Password should be same",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/user/register",
        formData
      );

      toast({
        title: "Registration Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate('/todo')
    } catch (error) {
      toast({
        title: error.response.data.message,
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
      <FormControl id="username" isRequired="true">
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          variant={"filled"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>

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

      <FormControl id="confirmpassword" isRequired="true">
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            variant={"filled"}
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} onClick={handlePasswordShow} size={"sm"}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="avatar" isRequired="true">
        <FormLabel>Upload your image</FormLabel>
        <Input
          type="file"
          variant={"filled"}
          p={1.5}
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormControl>

      <Button
        width={"40%"}
        mt={15}
        onClick={signinHandler}
        borderRadius={"full"}
        colorScheme={"pink"}
        isLoading={loading}
      >
        Sign In
      </Button>
    </VStack>
  );
};

export default Signin;

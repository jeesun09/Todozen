import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { TodoState } from "../context/TodoProvider";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const { user, setUser, setTodos } = TodoState();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("userInfo");
      setUser(null);
      setTodos([]);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      w={"80%"}
      alignItems={"center"}
      bg={"red.100"}
      px={4}
      mt={2}
      borderRadius={"full"}
    >
      <Text>Todozen</Text>
      <Menu>
        <MenuButton
          as={Button}
          borderRadius={"full"}
          backgroundColor={"red.100"}
          _hover={{ bg: "gray.400" }}
        >
          {user && (
            <Avatar
              size={"sm"}
              cursor={"pointer"}
              name={user.username}
              src={user.avatar}
            />
          )}
        </MenuButton>
        <MenuList>
          <ProfileModal user={user}>
            <MenuItem>Profile</MenuItem>
          </ProfileModal>
          <MenuDivider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Navbar;

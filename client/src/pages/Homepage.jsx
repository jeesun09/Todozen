import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Signin from "../components/Signin";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/todo");
    }
  }, []);
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        display={"flex"}
        justifyContent={"center"}
        p={3}
        w={"100%"}
        m="30px 0 15px 0"
        borderRadius="full"
        borderWidth="1px"
        backgroundColor={"#E90074"}
      >
        <Text>Todozen</Text>
      </Box>
      <Box bg={"white"} w={"100%"} borderRadius={"xl"} mb={3}>
        <Tabs variant={"soft-rounded"} colorScheme="pink">
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Signin</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signin />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;

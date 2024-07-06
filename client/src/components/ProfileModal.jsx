import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleEdit = () => {
    toast({
      title: "Info",
      description: "Edit feature coming soon",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top",
    })
  }

  return (
    <>
      {children && <span onClick={onOpen}>{children}</span>}
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent minH="410px" display={"flex"}>
          <ModalHeader
            fontSize={"40px"}
            display={"flex"}
            justifyContent={"center"}
          >
            Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              borderRadius={"full"}
              boxSize={"150px"}
              src={user?.avatar}
              alt={user?.username}
            />
            <Box display={"flex"} flexDir={"row"} alignItems={"center"}>
              <Text fontSize={"20px"} fontWeight={"bold"}>
                Username:{" "}
              </Text>
              <Input readOnly value={user?.username} variant={"unstyle"} />
            </Box>
            <Box display={"flex"} flexDir={"row"} alignItems={"center"}>
              <Text fontSize={"20px"} fontWeight={"bold"}>
                Email:{" "}
              </Text>
              <Input readOnly value={user?.email} variant={"unstyle"} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleEdit}>
              Edit
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;

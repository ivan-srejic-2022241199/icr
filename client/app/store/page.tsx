"use client";
import { Flex } from "@mantine/core";
import Header from "../components/header/Header";

const StorePage = () => {
  return (
    <Flex h={"100vh"} direction={"column"} w={"100%"}>
      <Header />
      <Flex flex={1}>
        {/* Sidebar */}
        <Flex w={"300px"} h={"100%"} bg={"black"}>
          sdadsa
        </Flex>
        <Flex flex={1} bg={"red"}></Flex>
      </Flex>
    </Flex>
  );
};

export default StorePage;

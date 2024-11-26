"use client";
import { Flex } from "@mantine/core";
import Header from "../components/header/Header";

const StorePage = () => {
  return (
    <Flex w={"100%"} h={"100vh"} direction={"column"}>
      <Header />
      <Flex w={"100%"} h={"100vh"} justify={"center"}>
        <Flex h={"100%"} w={"80%"}>
          <Flex w={"25%"} h={"100%"} bg={"black"}>
            sdadsa
          </Flex>
          <Flex w={"75%"} h={"100%"} bg={"red"}>
            sadsdadsadsadsa
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StorePage;

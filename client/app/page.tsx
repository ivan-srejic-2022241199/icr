import { Button, Flex, Text } from "@mantine/core";
import Header from "./components/header/Header";
import Link from "next/link";

export default function Home() {
  return (
    <Flex h={"100vh"} direction={"column"}>
      <Header />
      <Flex
        w={"100%"}
        h={"100%"}
        flex={1}
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1483181957632-8bda974cbc91?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover", // Cover the entire Flex area
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat", // Prevent the image from repeating
          opacity: "0.9",
        }}
        justify={"center"}
        align={"center"}
      >
        <Flex
          direction={"column"}
          align={"center"}
          gap={"20px"}
          w={"100%"}
          h={"100%"}
          flex={1}
          bg="rgba(0, 0, 0, 0.6)"
          p={"60px"}
          pt={"300px"}
          justify={"center"}
        >
          <Text
            style={{ fontSize: "42px" }}
            fw={900}
            variant="gradient"
            gradient={{ from: "yellow", to: "gold", deg: 90 }}
          >
            Elevate Your Style
          </Text>
          <Text
            style={{ fontSize: "42px" }}
            fw={900}
            variant="gradient"
            gradient={{ from: "yellow", to: "gold", deg: 90 }}
          >
            Discover the Perfect Outfit Today!
          </Text>
          <Link href={"/store"}>
            <Button
              mt={"25px"}
              w={"250px"}
              size="xl"
              color="gold"
              variant="outline"
              gradient={{ from: "black", to: "gold", deg: 45 }}
            >
              SHOP NOW
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}

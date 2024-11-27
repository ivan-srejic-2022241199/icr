import { Button, Flex, Text } from "@mantine/core";
import Header from "./components/header/Header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Flex w={"100%"} h={"100vh"} direction={"column"} c={"blue.6"}>
      <Header />
      <Flex w="100%" h={"100%"} justify={"center"}>
        <Flex w={"80%"} h={"100%"} wrap={"wrap"}>
          <Flex
            w={"65%"}
            align={"flex-start"}
            // justify={"flex-start"}
            direction={"column"}
            pt={"240px"}
          >
            <Flex direction={"column"}>
              <Text size={"86px"}>Discover and Find</Text>
              <Text size={"86px"}> Your Own</Text>
              <Text size={"86px"}>Fashion!</Text>
            </Flex>

            <Flex direction={"column"} mt={"24px"}>
              <Text c={"blue.5"} size={"24px"}>
                Explore our curated collection of stylish
              </Text>
              <Text c={"blue.5"} size={"24px"}>
                clothing and accessories tailored to your
              </Text>
              <Text c={"blue.5"} size={"24px"}>
                unique taste.
              </Text>
            </Flex>
            <Link href="/store">
              <Button w={"256px"} h={"74px"} size={"2xl"} mt={"54px"}>
                <Text size={"20px"}>SHOP NOW</Text>
              </Button>
            </Link>
          </Flex>
          <Flex w={"250px"} justify={"center"} mt={"120px"}>
            <Flex>
              <Image
                src={"/assets/tempProducts/dots.svg"}
                alt={"Dots"}
                width={"950"}
                height={"850"}
              />
            </Flex>
            <Flex pos={"absolute"}>
              <Image
                alt={"Landing page girl"}
                src={`/assets/tempProducts/landing.png`}
                height={"750"}
                width={"650"}
                style={{
                  borderRadius: "10px",
                }}
              ></Image>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

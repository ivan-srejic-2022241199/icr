"use client";
import { Button, Flex, Text } from "@mantine/core";
import styles from "./Header.styles";
import image from "../../assets/Logo-Small.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoBagOutline } from "react-icons/io5";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { RiAdminFill } from "react-icons/ri";

const Header = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    await axios.post("http://localhost:3001/logout", null, {
      withCredentials: true,
    });
    setUser(null);
    router.push("/");
  };

  return (
    <header>
      <Flex style={{ ...styles.header }}>
        <Flex w={"80%"} justify={"space-between"} align={"center"}>
          <Image
            src={image}
            width={140}
            height={90}
            alt="Logo"
            onClick={() => (window.location.href = "/")}
          />
          <Flex align={"center"}>
            {user?.role === "ADMIN" && (
              <Button variant={"white"} onClick={() => router.push("/admin")}>
                <RiAdminFill color={"228be6"} size={"24"} />
              </Button>
            )}

            <Button variant={"white"} w={"fit-content"} mr={"18px"}>
              <IoBagOutline size={"24"} color={"228be6"} />
              <Flex
                style={{ borderRadius: "100%", marginLeft: "-8px" }}
                w={"15px"}
                h={"15px"}
                bg={"#228be6"}
                align={"center"}
                justify={"center"}
                p={"8px"}
              >
                <Text c={"white"} size={"xs"}>
                  1
                </Text>
              </Flex>
            </Button>

            {user ? (
              <Button
                onClick={handleLogout}
                variant={"outline"}
                color={"blue.6"}
              >
                <Text>Logout</Text>
              </Button>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                variant={"outline"}
                color={"blue.6"}
              >
                <Text>Login</Text>
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </header>
  );
};

export default Header;

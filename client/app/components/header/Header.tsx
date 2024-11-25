"use client";
import { Flex } from "@mantine/core";
import styles from "./Header.styles";
import image from "../../assets/Logo-Small.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header>
      <Flex style={{ ...styles.header }}>
        <Image
          src={image}
          width={80}
          height={50}
          alt="Logo"
          onClick={() => router.push("/")}
        />
      </Flex>
    </header>
  );
};

export default Header;

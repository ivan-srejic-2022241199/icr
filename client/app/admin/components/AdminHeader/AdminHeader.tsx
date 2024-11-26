"use client";
import { Flex } from "@mantine/core";
import styles from "./AdminHeader.styles";
import image from "../../../assets/Logo-Small.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <header>
      <Flex style={{ ...styles.header }}>
        <Image
          src={image}
          width={120}
          height={75}
          alt="Logo"
          onClick={() => router.push("/")}
        />
      </Flex>
    </header>
  );
};

export default Header;

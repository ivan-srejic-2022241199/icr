"use client";
import React from "react";
import { Button, Flex, NavLink, Text } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation"; // Correct hook for Next.js 13+
import styles from "./Sidebar.styles";
import { GiAmpleDress } from "react-icons/gi";
import { IoReceipt } from "react-icons/io5";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { IoLogOut } from "react-icons/io5";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    await axios.post("http://localhost:3001/logout", null, {
      withCredentials: true,
    });
    setUser(null);
    router.push("/");
  };

  const links = [
    {
      icon: <GiAmpleDress size={"1.5rem"} />,
      href: "/admin",
      label: "Products",
    },
    {
      icon: <IoReceipt size={"1.5rem"} />,
      href: "/admin/orders",
      label: "Orders",
    },
  ];

  return (
    <Flex direction="column" style={{ ...styles.sidebar }} p={"12px"} gap="8px">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <NavLink
            key={link.href}
            href={link.href}
            active={isActive}
            label={link.label}
            leftSection={link.icon}
            color="blue.5"
          />
        );
      })}

      <Button color="blue.5" mb="25px" mt={"120px"} onClick={handleLogout}>
        <Flex gap={"10px"}>
          <Text>Logout</Text>
          <IoLogOut size={"1.5rem"} />
        </Flex>
      </Button>
    </Flex>
  );
};

export default Sidebar;

{
}

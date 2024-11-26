import React from "react";
import { Box, Flex } from "@mantine/core";
import styles from "./AdminLayout.styles";
import Sidebar from "../components/Sidebar/Sidebar";
import AdminHeader from "@/app/admin/components/AdminHeader/AdminHeader";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <Flex
      h={"100vh"}
      direction={"column"}
      flex={1}
      w={"100%"}
      bg={"gray.1"}
      align={"center"}
    >
      <AdminHeader />
      <Flex flex={1} gap={"10px"} px="12px" pb={"12px"} w={"80%"}>
        <Sidebar />
        <Box style={{ ...styles.content }}>{children}</Box>
      </Flex>
    </Flex>
  );
};

export default AdminLayout;

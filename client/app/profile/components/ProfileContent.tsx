"use client";
import { Tabs } from "@mantine/core";
import { CgProfile } from "react-icons/cg";
import { IoReceiptOutline } from "react-icons/io5";
import MyProfile from "@/app/profile/components/MyProfile";
import MyOrders from "@/app/profile/components/MyOrders";

const ProfileContent = () => {
  return (
    <Tabs defaultValue="my profile" style={{ height: "100%", width: "100%" }}>
      <Tabs.List grow>
        <Tabs.Tab value="my profile" leftSection={<CgProfile />}>
          My profile
        </Tabs.Tab>
        <Tabs.Tab value="orders" leftSection={<IoReceiptOutline />}>
          Orders
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="my profile" pt="xs">
        <MyProfile />
      </Tabs.Panel>

      <Tabs.Panel value="orders" pt="xs" bg={"red"} w={"100%"} h={"100%"}>
        <MyOrders />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ProfileContent;

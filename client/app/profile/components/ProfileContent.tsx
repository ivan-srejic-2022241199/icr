"use client";
import { Loader, Tabs } from "@mantine/core";
import { CgProfile } from "react-icons/cg";
import { IoReceiptOutline } from "react-icons/io5";
import MyProfile from "@/app/profile/components/MyProfile";
import MyOrders from "./MyOrders";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";

const ProfileContent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/orders/${user?.id}`,
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <Loader />;
  }
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

      <Tabs.Panel value="orders" pt="xs" w={"100%"} h={"100%"}>
        <MyOrders orders={orders} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ProfileContent;

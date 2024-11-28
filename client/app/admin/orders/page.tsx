/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AdminLayout from "@/app/admin/layout/AdminLayout";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Title, Flex, Loader } from "@mantine/core";
import AdminOrderCard from "../components/AdminOrderCard";

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin/orders", {
        withCredentials: true,
      });
      const sortedOrders = response.data.sort((a: any, b: any) => a.id - b.id);
      setOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setLoading(false);
    }
  };

  const refetchOrders = async () => {
    setLoading(true);
    await fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <AdminLayout>
      <Container>
        <Title order={2} mt="lg">
          Orders
        </Title>
        <Flex wrap="wrap" mt="xl" gap="lg" justify={"center"}>
          {orders.map((order) => (
            <Flex
              key={order.id}
              direction="column"
              style={{ width: "100%", maxWidth: "550px" }}
            >
              <AdminOrderCard refetchOrders={refetchOrders} order={order} />
            </Flex>
          ))}
        </Flex>
      </Container>
    </AdminLayout>
  );
};

export default AdminOrders;

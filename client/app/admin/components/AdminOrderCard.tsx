/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Card,
  Text,
  Image,
  Group,
  Divider,
  Box,
  Flex,
  Button,
  Modal,
} from "@mantine/core";
import axios from "axios";
import { toast } from "react-hot-toast";
import StatusBadge from "@/app/admin/components/StatusBadge";

const AdminOrderCard = ({
  order,
  refetchOrders,
}: {
  order: any;
  refetchOrders: any;
}) => {
  const [userModalOpened, setUserModalOpened] = useState(false);

  const totalCost = order.orderItems.reduce(
    (sum: any, item: any) => sum + item.product_price * item.quantity,
    0,
  );

  const updateOrderStatus = async (status: any) => {
    try {
      await axios.put(
        "http://localhost:3001/admin/update-order-status",
        {
          status,
          orderId: order.id,
        },
        {
          withCredentials: true,
        },
      );
      refetchOrders();
    } catch (error) {
      toast.error("Error updating order status");
      console.error(error);
    }
  };

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group>
          <Text size="lg" style={{ fontWeight: 500 }}>
            Order ID: {order.id}
          </Text>
          <StatusBadge status={order.order_status} />
        </Group>
        <Text size="sm" c="dimmed">
          Created at: {new Date(order.created_at).toLocaleString()}
        </Text>
        <Divider my="sm" />
        <Text size="md" mt="md">
          Order Items:
        </Text>
        <Box mt="sm">
          {order.orderItems.map((item: any) => (
            <Flex
              key={item.id}
              align="center"
              justify="space-between"
              direction="row"
              p="md"
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                marginBottom: "1rem",
              }}
            >
              <Image
                src={`../assets/tempProducts/${item.product.cover_image}`}
                alt={item.product.name}
                width={100}
                height={100}
                style={{
                  objectFit: "cover",
                  marginRight: "1rem",
                  borderRadius: "8px",
                }}
              />
              <Box style={{ flex: 1 }}>
                <Text>{item.product.name}</Text>
                <Text size="sm" c="dimmed">
                  {item.product.description}
                </Text>
                <Text size="sm">Size: {item.size.size}</Text>
                <Text size="md" c="green">
                  ${item.product_price}
                </Text>
                <Text size="sm" c="dimmed">
                  Quantity: {item.quantity}
                </Text>
              </Box>
            </Flex>
          ))}
        </Box>
        {/* Display the total cost at the bottom */}
        <Divider my="sm" />
        <Group>
          <Text size="lg">Total Cost:</Text>
          <Text size="lg" c="green">
            ${totalCost.toFixed(2)}
          </Text>
        </Group>
        <Button
          fullWidth
          variant="outline"
          mt="md"
          onClick={() => setUserModalOpened(true)}
        >
          View User Information
        </Button>
        {/* Buttons to change order status */}
        <Group mt="md">
          <Button
            variant="outline"
            color="yellow"
            onClick={() => updateOrderStatus("PENDING")}
          >
            Set as Pending
          </Button>
          <Button
            variant="outline"
            color="blue"
            onClick={() => updateOrderStatus("SHIPPED")}
          >
            Set as Shipped
          </Button>
          <Button
            variant="outline"
            color="green"
            onClick={() => updateOrderStatus("DELIVERED")}
          >
            Set as Delivered
          </Button>
          <Button
            variant="outline"
            color="red"
            onClick={() => updateOrderStatus("CANCELED")}
          >
            Set as Canceled
          </Button>
        </Group>
      </Card>

      <Modal
        opened={userModalOpened}
        onClose={() => setUserModalOpened(false)}
        title="User Information"
      >
        <Text>
          <strong>Name:</strong>{" "}
          {`${order.user.first_name} ${order.user.last_name}`}
        </Text>
        <Text>
          <strong>Email:</strong> {order.user.email}
        </Text>
        <Text>
          <strong>Address:</strong> {order.user.address}
        </Text>
      </Modal>
    </>
  );
};

export default AdminOrderCard;

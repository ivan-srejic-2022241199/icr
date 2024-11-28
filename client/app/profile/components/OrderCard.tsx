/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Flex,
  Card,
  Text,
  Image,
  Group,
  Divider,
  Box,
  Badge,
} from "@mantine/core";
import StatusBadge from "@/app/admin/components/StatusBadge";

const OrderCard = ({ order }: { order: any }) => {
  const totalCost = order.orderItems.reduce(
    (sum: any, item: any) => sum + item.product_price * item.quantity,
    0,
  );
  return (
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
              src={`assets/tempProducts/${item.product.cover_image}`}
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
              <Text size="md" color="green">
                ${item.product_price}
              </Text>
              <Text size="sm" color="dimmed">
                Quantity: {item.quantity}
              </Text>
            </Box>
          </Flex>
        ))}
      </Box>
      <Divider my="sm" />
      <Group>
        <Text size="lg">Total Cost:</Text>
        <Text size="lg" c="green">
          ${totalCost.toFixed(2)}
        </Text>
      </Group>
    </Card>
  );
};

export default OrderCard;

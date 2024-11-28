/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Flex, Title } from "@mantine/core";
import OrderCard from "@/app/profile/components/OrderCard";

const MyOrders = ({ orders }: { orders: any }) => {
  return (
    <Container>
      <Title order={2} mt="lg">
        My Orders
      </Title>
      <Flex mt="xl" direction="column" gap="xl">
        {orders.map((order: any) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </Flex>
    </Container>
  );
};

export default MyOrders;

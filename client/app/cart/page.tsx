/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Flex, Loader, Text, Image, Button } from "@mantine/core";
import useProducts from "@/app/hooks/useProducts";
import { useEffect, useState } from "react";
import Header from "@/app/components/header/Header";

const CartPage = () => {
  const { products, loadingProducts } = useProducts();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const filteredCartItems = products?.filter((product: any) =>
      cart.some((cartItem: any) => cartItem.id === product.id),
    );

    setCartItems(filteredCartItems);
  }, [products]);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      cartItems?.forEach((item: any) => {
        const discount = item.discount || 0;
        const discountedPrice = item.price * (1 - discount / 100);
        total += discountedPrice;
      });
      setTotalPrice(total);
    };

    calculateTotal();
  }, [cartItems]);

  const removeItem = (id: any) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter((cartItem: any) => cartItem.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (loadingProducts) {
    return <Loader />;
  }

  return (
    <Flex w={"100%"} h={"100vh"} direction={"column"}>
      <Header />
      <Flex w={"100%"} h={"100vh"} justify={"center"}>
        <Flex w={"80%"} direction="column" justify={"flex-start"}>
          <Text size="xl" mb={20}>
            Your Cart
          </Text>

          {cartItems?.length === 0 ? (
            <Text>No items in the cart</Text>
          ) : (
            cartItems?.map((item: any) => {
              const discountedPrice = item.price * (1 - item.discount / 100);

              return (
                <Flex
                  key={item.id}
                  mb={20}
                  justify="space-between"
                  align="center"
                >
                  <Flex align="center">
                    <Image
                      src={`assets/tempProducts/${item.cover_image}`}
                      alt={item.name}
                      width={80}
                      height={80}
                      style={{ borderRadius: "8px", objectFit: "cover" }}
                    />
                    <Flex direction="column" ml={15}>
                      <Text size="md">{item.name}</Text>
                      <Text size="sm" c="dimmed">
                        {item.description}
                      </Text>
                      <Text
                        size="sm"
                        c="green"
                      >{`Discounted Price: $${discountedPrice.toFixed(2)}`}</Text>
                    </Flex>
                  </Flex>

                  <Flex
                    direction="column"
                    justify="space-between"
                    align="center"
                  >
                    <Text size="lg">{`$${discountedPrice.toFixed(2)}`}</Text>
                    <Button
                      onClick={() => removeItem(item.id)}
                      variant="outline"
                      color="red"
                      size="xs"
                    >
                      Remove
                    </Button>
                  </Flex>
                </Flex>
              );
            })
          )}

          <Flex justify="space-between" mt={30} align="center">
            <Text size="xl">Total Price:</Text>
            <Text size="xl" c="blue">
              ${totalPrice.toFixed(2)}
            </Text>
          </Flex>

          <Button variant="filled" color="blue" mt={20}>
            Place order
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Flex, Text } from "@mantine/core";
import styles from "./Header.styles";
import image from "../../assets/Logo-Small.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoBagOutline } from "react-icons/io5";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { RiAdminFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleLogout = async () => {
    await axios.post("http://localhost:3001/logout", null, {
      withCredentials: true,
    });
    localStorage.removeItem("cart");
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);
    setProducts(cart);
  }, []);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <header>
      <Flex style={{ ...styles.header }}>
        <Flex w={"80%"} justify={"space-between"} align={"center"}>
          <Image
            src={image}
            width={140}
            height={90}
            alt="Logo"
            onClick={() => (window.location.href = "/")}
          />
          <Flex align={"center"}>
            {user?.role === "ADMIN" && (
              <Button variant={"white"} onClick={() => router.push("/admin")}>
                <RiAdminFill color={"228be6"} size={"24"} />
              </Button>
            )}
            {user?.role === "CUSTOMER" && (
              <Button variant={"white"} onClick={() => router.push("/profile")}>
                <CgProfile color={"228be6"} size={"24"} />
              </Button>
            )}

            <Button
              variant={"white"}
              w={"fit-content"}
              mr={"18px"}
              onClick={toggleCartVisibility}
            >
              <IoBagOutline size={"24"} color={"228be6"} />
              <Flex
                style={{ borderRadius: "100%", marginLeft: "-8px" }}
                w={"15px"}
                h={"15px"}
                bg={"#228be6"}
                align={"center"}
                justify={"center"}
                p={"8px"}
              >
                <Text c={"white"} size={"xs"}>
                  {cartCount}
                </Text>
              </Flex>
            </Button>

            {user ? (
              <Button
                onClick={handleLogout}
                variant={"outline"}
                color={"blue.6"}
              >
                <Text>Logout</Text>
              </Button>
            ) : (
              <Button
                onClick={() => router.push("/login")}
                variant={"outline"}
                color={"blue.6"}
              >
                <Text>Login</Text>
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>

      {isCartVisible && (
        <Flex
          direction={"column"}
          style={{
            position: "absolute",
            top: "60px",
            right: "10px",
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "16px",
            borderRadius: "8px",
            zIndex: 100,
            width: "300px",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <h3>Cart:</h3>
          {products.length > 0 ? (
            <Flex style={{ height: "fit-content" }}>
              <ul>
                {products?.map((product: any, index) => (
                  <li key={index}>
                    <Text>{product.name}</Text>
                    <Text>{product.price}</Text>
                  </li>
                ))}
              </ul>
            </Flex>
          ) : (
            <Text>No products in your cart.</Text>
          )}
          <Button fullWidth onClick={() => router.push("/cart")}>
            Go to Cart
          </Button>
        </Flex>
      )}
    </header>
  );
};

export default Header;

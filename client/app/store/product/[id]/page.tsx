"use client";

import { Button, Flex, Loader, Text } from "@mantine/core";
import Header from "@/app/components/header/Header";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import styles from "@/app/admin/components/ProductCard/ProductCard.styles";

const ProductPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [product, setProduct] = useState<any>(null);
  const [size, setSize] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const price = parseFloat(product?.price);
  const discount = parseFloat(product?.discount);
  const discountedPrice = price - (price * discount) / 100;

  // Fetch product data client-side
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/public/product/${id}`,
        );
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          console.error("Failed to fetch product data");
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!size) {
      alert("Please select a size");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      image: product.cover_image,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = existingCart.findIndex(
      (item: any) => item.id === cartItem.id && item.size === cartItem.size,
    );

    if (existingProductIndex !== -1) {
      alert("This product with the selected size is already in the cart.");
    } else {
      existingCart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      toast.success("Product added to cart!");
      window.location.href = "/store";
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <Text>No product found</Text>;
  }

  return (
    <Flex w={"100%"} h={"100vh"} direction={"column"}>
      <Header />
      <Flex w={"100%"} h={"100vh"} justify={"center"}>
        <Flex w={"80%"} justify={"center"}>
          <Flex>
            <Image
              src={`/assets/tempProducts/${product.cover_image}`}
              alt={"cover"}
              width={450}
              height={700}
              style={{ borderRadius: "20px" }}
            />
          </Flex>
          <Flex pl={"120px"} gap={"24px"} direction={"column"}>
            <Flex direction={"column"} gap={"8px"}>
              <Text size={"84px"}>{product.name}</Text>
            </Flex>
            <Flex direction={"column"} gap={"8px"}>
              <Text size={"36px"} c={"gray.6"}>
                {product.description}
              </Text>
            </Flex>
            <Flex>
              {discount > 0 ? (
                <Flex
                  gap={"4px"}
                  direction={"row"}
                  align={"center"}
                  justify={"center"}
                >
                  <Text style={styles.originalPrice}>
                    {price.toFixed(2)} <span>&#8364;</span>
                  </Text>
                  <Flex>
                    <Text style={styles.discountedPrice}>
                      {discountedPrice.toFixed(2)} <span>&#8364;</span>
                    </Text>
                    <Text style={styles.discountLabel}>-{discount}%</Text>
                  </Flex>
                </Flex>
              ) : (
                <Text style={styles.price}>
                  {price.toFixed(2)} <span>&#8364;</span>
                </Text>
              )}
            </Flex>
            <Flex direction={"column"} gap={"8px"}>
              <Text size={"24px"}> Sizes:</Text>
              <Flex gap={"8px"}>
                {product.ProductSizeRelation.map((productSize: any) => (
                  <Button
                    w={"65px"}
                    key={productSize.productSizeId}
                    variant={
                      size === productSize.productSize.id ? "filled" : "outline"
                    }
                    color={"blue.6"}
                    onClick={() => {
                      if (size === productSize.productSize.id) {
                        setSize(null);
                      } else {
                        setSize(productSize.productSize.id);
                      }
                    }}
                  >
                    <Text>{productSize.productSize.size}</Text>
                  </Button>
                ))}
              </Flex>
              <Button onClick={() => addToCart()} mt={"96px"}>
                Add to cart
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductPage;

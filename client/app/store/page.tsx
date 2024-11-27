/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Flex, Loader } from "@mantine/core";
import Header from "../components/header/Header";
import StoreSidebar from "@/app/store/components/StoreSidebar/StoreSidebar";
import StoreContent from "@/app/store/components/StoreContent/StoreContent";
import useProducts from "@/app/hooks/useProducts";
import { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import Chatbot from "@/app/components/chatbot/Chatbot";

const StorePage = () => {
  const { products, loadingProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<
    Product[] | undefined
  >(products);

  console.log("Ovo", filteredProducts);
  const [filters, setFilters] = useState({
    price: [0, 400],
    sizes: [0],
    categories: [0],
  });

  useEffect(() => {
    if (products && products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (!products) return;

    let filtered = products;

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product: Product) =>
        product.categories.some((cat) => filters.categories.includes(cat.id)),
      );
    }

    // Filter by sizes
    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product: Product) =>
        product.ProductSizeRelation.some((size) =>
          filters.sizes.includes(size.productSize.id),
        ),
      );
    }

    // Filter by price range
    if (filters.price) {
      const [minPrice, maxPrice] = filters.price;
      filtered = filtered.filter(
        (product: Product) =>
          parseInt(product.price) >= minPrice &&
          parseInt(product.price) <= maxPrice,
      );
    }

    setFilteredProducts(filtered); // Update the filtered products
  }, [filters]);

  if (loadingProducts && filteredProducts === undefined) {
    return <Loader />;
  }

  return (
    <Flex w={"100%"} h={"100vh"} direction={"column"}>
      <Header />
      <Chatbot products={products} />
      <Flex w={"100%"} h={"100vh"} justify={"center"}>
        <Flex h={"100%"} w={"80%"}>
          {/*  Sidebar*/}
          <Flex w={"295px"} h={"100%"}>
            <StoreSidebar setFilters={setFilters} />
          </Flex>
          {/*  Main content*/}
          <Flex w={"100%"}>
            <StoreContent
              loadingProducts={loadingProducts}
              products={filteredProducts}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default StorePage;

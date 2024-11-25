/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Flex, Loader, Text } from "@mantine/core";
import AdminLayout from "./layout/AdminLayout";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard/ProductCard";
import { Product } from "../types/product";
import { useDisclosure } from "@mantine/hooks";
import { CiFilter } from "react-icons/ci";
import { HiOutlineXMark } from "react-icons/hi2";
import FilterModal from "./components/FilterModal/FilterModal";
import useProducts from "../hooks/useProducts";
import CreateProductModal from "./components/CreateProductModal/CreateProductModal";

const AdminPage = () => {
  const { products, loadingProducts, refetchProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [
    openedFilteredModal,
    { open: filterModalOpen, close: filterModalClose },
  ] = useDisclosure(false);

  const [
    openedCreateProductModal,
    { open: openCreateProductModal, close: closeCreateProductModal },
  ] = useDisclosure(false);

  const [filter, setFilter] = useState({
    size: "",
    category: "",
  });
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    let filteredProducts: any = products;

    if (filter.size !== "") {
      filteredProducts = filteredProducts.filter((product: Product) =>
        product.ProductSizeRelation.some(
          (size) => size.productSize.size === filter.size
        )
      );
    }

    if (filter.category !== "") {
      filteredProducts = filteredProducts.filter((product: Product) =>
        product.categories.some((cat) => cat.name === filter.category)
      );
    }

    setFilteredProducts(filteredProducts);
  }, [size, category, products]);

  const handleCategoryChange = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSizeChange = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      size: value,
    }));
  };

  const applyFilters = () => {
    if (filter.size !== "") {
      setSize(filter.size);
    }
    if (filter.category !== "") {
      setCategory(filter.category);
    }
    filterModalClose();
  };

  return (
    <AdminLayout>
      <Flex wrap={"wrap"} mah={"90vh"} justify={"center"} gap={"10px"}>
        <FilterModal
          opened={openedFilteredModal}
          close={filterModalClose}
          handleSizeChange={handleSizeChange}
          handleCategoryChange={handleCategoryChange}
          filter={filter}
          applyFilters={applyFilters}
        />

        <CreateProductModal
          opened={openedCreateProductModal}
          close={closeCreateProductModal}
          refetchProducts={refetchProducts}
        />

        <Flex
          align={"center"}
          p={"12px"}
          h={"60px"}
          w={"90%"}
          justify={"space-between"}
        >
          <Text c={"blue.6"} size="lg" fw={"bold"}>
            Moji proizvodi
          </Text>
          <Flex gap={"8px"}>
            <Flex>
              {/* Crtaj filtere ovde */}
              {size !== "" ? (
                <Flex gap={"8px"} align={"center"} mr={"24px"}>
                  <Flex
                    bg={"blue.6"}
                    style={{ borderRadius: "10px" }}
                    align={"center"}
                    gap={"4px"}
                    p={"4px"}
                  >
                    <Text c={"white"}>
                      Velicina: <strong>{size}</strong>
                    </Text>
                    <HiOutlineXMark
                      onClick={() => {
                        setFilter({ category, size: "" });
                        setSize("");
                      }}
                      color="white"
                    />
                  </Flex>
                </Flex>
              ) : null}
              {category !== "" ? (
                <Flex gap={"8px"} align={"center"} mr={"24px"}>
                  <Flex
                    bg={"blue.6"}
                    style={{ borderRadius: "10px" }}
                    align={"center"}
                    gap={"4px"}
                    p={"4px"}
                  >
                    <Text c={"white"}>
                      Kategorija: <strong>{category}</strong>
                    </Text>
                    <HiOutlineXMark
                      onClick={() => {
                        setFilter({ size, category: "" });
                        setCategory("");
                      }}
                      color="white"
                    />
                  </Flex>
                </Flex>
              ) : null}
            </Flex>

            <Button onClick={filterModalOpen} color="gray.1">
              <CiFilter color="black" />
            </Button>
            <Button onClick={openCreateProductModal} color="blue.6">
              Dodaj
            </Button>
          </Flex>
        </Flex>

        <Flex
          wrap={"wrap"}
          mah={"80vh"}
          style={{ overflow: "auto" }}
          justify={"center"}
          w={"100%"}
        >
          {loadingProducts && <Loader color="blue.6" />}
          {filteredProducts?.map((product: Product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </Flex>
      </Flex>
    </AdminLayout>
  );
};

export default AdminPage;

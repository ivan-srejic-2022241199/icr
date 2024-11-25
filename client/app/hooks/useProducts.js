"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProducts = () => {
  const createProductCallback = async ({
    name,
    description,
    price,
    discount,
    cover_image,
    images,
    sizeAndQuantity,
    categories,
  }) => {
    const { data } = await axios.post(
      "http://localhost:3001/admin/add-product",
      {
        name,
        description,
        price,
        discount,
        cover_image,
        images,
        sizeAndQuantity,
        categories,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  };

  const createProduct = useMutation({
    mutationFn: createProductCallback,
    onError: (error) => {
      return error.response?.data || "An unknown error occured";
    },
  });

  const getProducts = async () => {
    const { data } = await axios.get("http://localhost:3001/public/products");
    return data;
  };

  const addSizeCallback = async ({ size }) => {
    const { data } = await axios.post(
      "http://localhost:3001/admin/add-size",
      {
        size,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  };

  const addSize = useMutation({
    mutationFn: addSizeCallback,
    onError: (error) => {
      return error.response?.data || "An unknown error occured";
    },
  });

  const {
    data: products,
    isLoading: loadingProducts,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
  });
  const getSizes = async () => {
    const { data } = await axios.get("http://localhost:3001/public/sizes");
    return data;
  };

  const {
    data: sizes,
    isLoading: loadingSizes,
    refetch: refetchSizes,
    error: errorSizes,
  } = useQuery({
    queryKey: ["get-sizes"],
    queryFn: getSizes,
  });

  const addCategoryCallback = async ({ name, description }) => {
    const { data } = await axios.post(
      "http://localhost:3001/admin/add-category",
      {
        name,
        description,
      },
      {
        withCredentials: true,
      }
    );
    return data;
  };

  const addCategory = useMutation({
    mutationFn: addCategoryCallback,
    onError: (error) => {
      return error.response?.data || "An unknown error occured";
    },
  });

  const getCategories = async () => {
    const { data } = await axios.get("http://localhost:3001/public/categories");
    return data;
  };

  const {
    data: categories,
    isLoading: loadingCategories,
    refetch: refetchCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategories,
  });

  return {
    sizes,
    loadingSizes,
    refetchSizes,
    errorSizes,
    categories,
    loadingCategories,
    refetchCategories,
    errorCategories,
    products,
    loadingProducts,
    refetchProducts,
    createProduct,
    addCategory,
    addSize,
  };
};

export default useProducts;

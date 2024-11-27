/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useProducts from "@/app/hooks/useProducts";
import { ProductSize, Category, Product } from "@/app/types/product";
import {
  Button,
  FileButton,
  Flex,
  Loader,
  Modal,
  MultiSelect,
  NumberInput,
  Popover,
  Table,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { FaDollarSign, FaPercentage, FaPlus } from "react-icons/fa";
import Image from "next/image";

interface EditProductModalProps {
  opened: boolean;
  close: () => void;
  refetchProducts: () => void;
  product: Product;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  opened,
  close,
  refetchProducts,
  product,
}) => {
  const [coverImage, setCoverImage] = useState(product.cover_image);
  const [images, setImages] = useState(product.images);

  console.log(images);

  const {
    sizes,
    refetchSizes,
    loadingSizes,
    categories,
    refetchCategories,
    loadingCategories,
    addCategory,
    addSize,
    updateProduct,
  } = useProducts();

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizeQuantities, setSizeQuantities] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [sizeToAdd, setSizeToAdd] = useState("");

  const [createProductForm, setCreateProductForm] = useState({
    name: product.name,
    categories: [],
    description: product.description,
    price: product.price,
    discount: product?.discount,
    sizeAndQuantity: {},
    cover_image: product.cover_image,
    images: product.images,
  });

  useEffect(() => {
    setImages(product.images);
    setCoverImage(product.cover_image);
    setCreateProductForm({
      name: product.name,
      categories: [],
      description: product.description,
      price: product.price,
      discount: product?.discount,
      sizeAndQuantity: {},
      cover_image: product.cover_image,
      images: product.images,
    });
  }, [product]);

  const handleSizeSelect = (selected: any) => {
    setSelectedSizes(selected);

    const updatedQuantities: any = { ...createProductForm.sizeAndQuantity };

    selected.forEach((sizeId: any) => {
      if (!updatedQuantities[sizeId]) {
        updatedQuantities[sizeId] = 1;
      }
    });

    Object.keys(updatedQuantities).forEach((sizeId) => {
      if (!selected.includes(sizeId)) {
        delete updatedQuantities[sizeId];
      }
    });

    const sizeAndQuantityArray = Object.keys(updatedQuantities).map((key) => ({
      id: parseInt(key),
      quantity: parseInt(updatedQuantities[key]),
    }));

    setCreateProductForm((prevForm) => ({
      ...prevForm,
      sizeAndQuantity: sizeAndQuantityArray,
    }));
  };

  const handleQuantityChange = (sizeId: string, newQuantity: number) => {
    const updatedQuantities: any = { ...sizeQuantities, [sizeId]: newQuantity };

    setSizeQuantities(updatedQuantities);

    const updatedSizeAndQuantity = Object.keys(updatedQuantities).map(
      (sizeId) => ({
        id: parseInt(sizeId),
        quantity: updatedQuantities[sizeId],
      }),
    );

    setCreateProductForm((prevForm) => ({
      ...prevForm,
      sizeAndQuantity: updatedSizeAndQuantity,
    }));
  };

  const handleCoverImageUpload = (file: any) => {
    setCoverImage(file.name);
    handleInputChange("cover_image", file.name);
  };

  const handleImagesUpload = (files: any) => {
    setImages(files.map((file: File) => file.name));
    handleInputChange(
      "images",
      files.map((file: File) => file.name),
    );
  };

  const handleInputChange = (field: string, value: any) => {
    setCreateProductForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateProduct = async () => {
    try {
      await updateProduct.mutateAsync({
        id: product.id as number,
        ...createProductForm,
      });
      setSizeQuantities({});
      setSelectedSizes([]);
      close();
      refetchProducts();
    } catch (error) {
      console.log(error);
      alert("Nisu popunjena obavezna polja!"); //TODO: Instead of validating like this, use mantine form and validation
    }
  };

  const handleCategoryChange = (value: any) => {
    setCategoryName(value);
  };

  // Function to handle category description change
  const handleCategoryDescription = (value: any) => {
    setCategoryDescription(value);
  };

  const handleSizeToAddChande = (value: any) => {
    setSizeToAdd(value);
  };

  const handleAddCategory = async () => {
    if (categoryDescription !== "" && categoryName !== "") {
      await addCategory.mutateAsync({
        name: categoryName,
        description: categoryDescription,
      });
      setCategoryName("");
      setCategoryDescription("");
      refetchCategories();
    }
  };

  const handleAddSize = async () => {
    if (sizeToAdd !== "") {
      await addSize.mutateAsync({
        size: sizeToAdd.toUpperCase(),
      });
      setSizeToAdd("");
      refetchSizes();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setSizeQuantities({});
        setSelectedSizes([]);
        close();
      }}
      closeOnClickOutside={false}
      size="auto"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Flex w={"100%"} direction={"column"} align={"center"}>
        <Flex justify={"center"}>
          <Title c={"blue.6"} order={2}>
            Dodavanje proizvoda
          </Title>
        </Flex>
        <Flex w={"100%"} h={"100%"} py={"1rem"} gap={"24px"}>
          <Flex
            flex={1}
            h={"100%"}
            direction={"column"}
            p={"12px"}
            gap={"12px"}
          >
            <Flex w={"100%"} gap={"12px"}>
              <Flex w={"100%"} direction={"column"}>
                <Text>Ime proizvoda:</Text>
                <TextInput
                  style={{
                    color: "red",
                  }}
                  bd={"red"}
                  w={"100%"}
                  radius={"10px"}
                  value={createProductForm.name}
                  onChange={(e) =>
                    handleInputChange("name", e.currentTarget.value)
                  }
                />
              </Flex>

              <Flex w={"100%"} direction="column">
                <Text>Kategorija:</Text>
                {loadingCategories ? (
                  <Loader color="blue.6" />
                ) : (
                  <Flex>
                    <MultiSelect
                      w={"100%"}
                      radius={"10px 0 0 10px"}
                      data={categories.map((category: Category) => ({
                        value: category.id.toString(),
                        label: category.name,
                      }))}
                      // value={createProductForm.categories}
                      onChange={(value) =>
                        handleInputChange(
                          "categories",
                          value.map((val: string) => parseInt(val)),
                        )
                      }
                    />
                    <Popover
                      trapFocus
                      position="bottom-end"
                      withArrow
                      shadow="md"
                    >
                      <Popover.Target>
                        <Button
                          w={"35px"}
                          style={{
                            borderRadius: "0 10px 10px 0",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          color="blue.5"
                        >
                          <FaPlus color="white" />
                        </Button>
                      </Popover.Target>
                      <Popover.Dropdown>
                        <Flex direction={"column"} gap={"8px"}>
                          <Flex direction={"column"}>
                            <Text>Nova kategorija</Text>
                            <Flex align={"center"} gap={"4px"}>
                              <TextInput
                                value={categoryName}
                                onChange={(e) =>
                                  handleCategoryChange(e.target.value)
                                }
                                size="sm"
                              />
                            </Flex>
                          </Flex>
                          <Flex direction={"column"}>
                            <Text>Opis</Text>
                            <Flex align={"center"} gap={"4px"}>
                              <TextInput
                                value={categoryDescription}
                                onChange={(e) =>
                                  handleCategoryDescription(e.target.value)
                                }
                                color="blue.5"
                                size="sm"
                              />
                            </Flex>
                          </Flex>
                          <Flex justify={"center"}>
                            <Button
                              color="blue.5"
                              size="sm"
                              onClick={handleAddCategory}
                              mt={"4px"}
                            >
                              Dodaj kategoriju
                            </Button>
                          </Flex>
                        </Flex>
                      </Popover.Dropdown>
                    </Popover>
                  </Flex>
                )}
              </Flex>
            </Flex>
            <Flex w={"100%"} direction="column">
              <Text>Opis proizvoda:</Text>
              <Textarea
                value={createProductForm.description}
                onChange={(e) =>
                  handleInputChange("description", e.currentTarget.value)
                }
                radius={"10px"}
                w={"100%"}
              />
            </Flex>
            <Flex w={"100%"} gap={"48px"} direction={"column"}>
              <Flex w={"100%"} gap={"12px"}>
                <Flex w={"100%"} direction={"column"}>
                  <Text>Cena:</Text>
                  <Flex w={"100%"}>
                    <NumberInput
                      rightSection={<FaDollarSign />}
                      placeholder="0"
                      radius={"10px"}
                      hideControls
                      w={"100%"}
                      value={createProductForm.price}
                      onChange={(value) =>
                        handleInputChange("price", value?.toString() || "")
                      }
                    />
                  </Flex>
                </Flex>
                <Flex w={"100%"} direction="column">
                  <Text>Popust:</Text>
                  <Flex w={"100%"}>
                    <NumberInput
                      rightSection={<FaPercentage />}
                      hideControls
                      placeholder="0"
                      radius={"10px"}
                      min={0}
                      max={99}
                      w={"100%"}
                      value={parseInt(createProductForm.discount)}
                      onChange={(value) =>
                        handleInputChange("discount", value?.toString() || "0")
                      }
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Flex>
                <Flex direction={"column"}>
                  <Text>Velicine:</Text>
                  {loadingSizes ? (
                    <Loader color="blue.5" />
                  ) : (
                    <Flex>
                      <MultiSelect
                        radius={"10px 0 0 10px"}
                        w={"200px"}
                        checkIconPosition="right"
                        data={sizes.map((size: ProductSize) => ({
                          value: size.id.toString(),
                          label: size.size,
                        }))}
                        onChange={handleSizeSelect}
                      />
                      <Popover
                        width={300}
                        trapFocus
                        position="bottom"
                        withArrow
                        shadow="md"
                      >
                        <Popover.Target>
                          <Button
                            w={"35px"}
                            style={{
                              borderRadius: "0 10px 10px 0",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            color="blue.5"
                          >
                            <FaPlus color="white" />
                          </Button>
                        </Popover.Target>
                        <Popover.Dropdown c={"blue.5"}>
                          <Text>Nova velicina</Text>
                          <Flex align={"center"} gap={"4px"}>
                            <TextInput
                              value={sizeToAdd}
                              onChange={(e) =>
                                handleSizeToAddChande(e.target.value)
                              }
                              color="blue.5"
                              size="sm"
                            />
                            <Button color="blue.5" onClick={handleAddSize}>
                              Dodaj
                            </Button>
                          </Flex>
                        </Popover.Dropdown>
                      </Popover>
                    </Flex>
                  )}
                </Flex>
                {selectedSizes.length > 0 && (
                  <Table
                    align="center"
                    style={{ textAlign: "center" }}
                    ml={"24px"}
                    highlightOnHover
                  >
                    <thead>
                      <tr>
                        <th>Velicina</th>
                        <th>Kolicina</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSizes.map((sizeId) => {
                        const size = sizes.find(
                          (s: any) => s.id.toString() === sizeId,
                        );
                        return (
                          <tr key={sizeId}>
                            <td>{size?.size}</td>
                            <td align="center">
                              <NumberInput
                                min={1}
                                value={1}
                                onChange={(value) =>
                                  handleQuantityChange(sizeId, Number(value))
                                }
                                style={{ width: "50px" }}
                                hideControls
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </Flex>
            </Flex>
            {/* Image input */}
            <Flex w={"100%"} direction={"column"}>
              <Text>Glavna slika:</Text>
              <Flex gap={"24px"}>
                <FileButton
                  onChange={handleCoverImageUpload}
                  accept="image/png,image/jpeg"
                >
                  {(props) => (
                    <Button color={"blue.5"} {...props}>
                      Upload
                    </Button>
                  )}
                </FileButton>
              </Flex>
              {coverImage && (
                <Flex mt={"12px"}>
                  <Image
                    alt={"Cover image"}
                    src={`/assets/tempProducts/${createProductForm.cover_image}`}
                    height={"125"}
                    width={"100"}
                    style={{
                      borderRadius: "10px",
                    }}
                  ></Image>
                </Flex>
              )}
            </Flex>
            <Flex w={"100%"} direction={"column"}>
              <Text>Slike:</Text>
              <Flex gap={"24px"}>
                <FileButton
                  onChange={handleImagesUpload}
                  accept="image/png,image/jpeg"
                  multiple
                >
                  {(props) => (
                    <Button color={"blue.5"} {...props}>
                      Upload
                    </Button>
                  )}
                </FileButton>
              </Flex>
              {images && (
                <Flex gap={"12px"} mt={"12px"}>
                  {createProductForm.images.map((image) => {
                    return (
                      <Image
                        key={image}
                        alt={"Additional image"}
                        src={`/assets/tempProducts/${image}`}
                        height={"125"}
                        width={"100"}
                        style={{
                          borderRadius: "10px",
                        }}
                      ></Image>
                    );
                  })}
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex mt={"24px"}>
          <Button onClick={handleUpdateProduct} color="blue.5">
            Izmeni proizvod
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default EditProductModal;

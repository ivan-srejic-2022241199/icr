import {
  Button,
  Divider,
  Flex,
  Loader,
  RangeSlider,
  Text,
} from "@mantine/core";
import { GiSettingsKnobs } from "react-icons/gi";
import useProducts from "@/app/hooks/useProducts";
import { Category, ProductSize } from "@/app/types/product";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const StoreSidebar = ({ setFilters }) => {
  const { categories, loadingCategories, sizes, loadingSizes } = useProducts();
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(
    new Set(),
  );
  const [selectedSizes, setSelectedSizes] = useState<Set<number>>(new Set());
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Toggle size selection
  const handleSizeClick = (sizeId: number) => {
    setSelectedSizes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sizeId)) {
        newSet.delete(sizeId);
      } else {
        newSet.add(sizeId);
      }
      return newSet;
    });
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const applyFilters = () => {
    setFilters({
      price: priceRange,
      categories: Array.from(selectedCategories), // Selected category IDs
      sizes: Array.from(selectedSizes),
    });
  };
  return (
    <Flex
      direction={"column"}
      // justify={"center"}
      // align={"center"}
      style={{
        borderRadius: "20px",
        border: "1px solid",
        borderColor: "#ced4da", //gray.4
      }}
      w={"100%"}
      h={"fit-content"}
      py={"20px"}
      px={"24px"}
    >
      <Flex
        h={"fit-content"}
        w={"100%"}
        align={"center"}
        justify={"space-between"}
      >
        <Text size={"24px"}>Filters</Text>
        <GiSettingsKnobs color={"gray"} size={"20"} />
      </Flex>
      <Divider my={"24px"} color={"blue.1"} orientation={"horizontal"} />
      <Flex direction={"column"} w={"100%"} gap={"20px"}>
        <Flex align={"center"} justify={"space-between"}>
          <Text size={"24px"}>Price</Text>
          <Text c={"blue.5"} size={"18px"}>
            {priceRange[0]}
            <span>&#8364;</span> - {priceRange[1]}
            <span>&#8364;</span>
          </Text>
        </Flex>

        <RangeSlider
          minRange={10}
          min={0}
          max={400}
          step={1}
          value={priceRange}
          onChange={handlePriceChange}
        />
      </Flex>
      <Divider my={"24px"} color={"blue.1"} orientation={"horizontal"} />
      <Flex direction={"column"} w={"100%"} gap={"20px"}>
        <Text size={"24px"}>Categories</Text>
        {loadingCategories ? (
          <Loader />
        ) : (
          <Flex gap={"4px"} wrap={"wrap"}>
            {categories.map((category: Category) => {
              const isSelected = selectedCategories.has(category.id);
              return (
                <Button
                  w={"130px"}
                  key={category.id}
                  variant={isSelected ? "filled" : "outline"}
                  color={"blue.6"}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <Text>{category.name}</Text>
                </Button>
              );
            })}
          </Flex>
        )}
      </Flex>
      <Divider my={"24px"} color={"blue.1"} orientation={"horizontal"} />
      <Flex direction={"column"} w={"100%"} gap={"20px"}>
        <Text size={"24px"}>Categories</Text>
        {loadingSizes ? (
          <Loader />
        ) : (
          <Flex gap={"4px"} wrap={"wrap"}>
            {sizes.map((size: ProductSize) => {
              const isSelected = selectedSizes.has(size.id);
              return (
                <Button
                  w={"65px"}
                  key={size.id}
                  variant={isSelected ? "filled" : "outline"}
                  color={"blue.6"}
                  onClick={() => handleSizeClick(size.id)}
                >
                  <Text>{size.size}</Text>
                </Button>
              );
            })}
          </Flex>
        )}
      </Flex>
      <Button onClick={() => applyFilters()} mt={"20px"}>
        Apply filters
      </Button>
    </Flex>
  );
};

export default StoreSidebar;

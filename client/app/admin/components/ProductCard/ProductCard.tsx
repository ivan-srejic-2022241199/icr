import { Flex, Divider, Popover, Text } from "@mantine/core";
import { Product } from "../../../types/product";
import { useHover } from "@mantine/hooks";
import Image from "next/image";
import styles from "./ProductCard.styles";

interface ProductComponentProps {
  product: Product;
}

const ProductCard: React.FC<ProductComponentProps> = ({ product }) => {
  const { hovered, ref } = useHover();

  const price = parseFloat(product.price);
  const discount = parseFloat(product.discount);
  const discountedPrice = price - (price * discount) / 100;

  return (
    <Flex
      ref={ref}
      w={"90%"}
      my={"12px"}
      style={{
        borderRadius: "5px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
      key={product.id}
      align={"center"}
      p={"12px"}
      gap={"32px"}
      bg={hovered ? "gray.0" : "white"}
      onClick={() => alert("Lele")}
    >
      <Image
        width={100}
        height={150}
        alt="product image"
        src={`/assets/tempProducts/${product.cover_image}`}
        style={{ borderRadius: "10px" }}
      />

      <Flex flex={1} direction={"column"} gap="12px" h={"80%"}>
        <Text c="blue.5" size="xl">
          Naziv
        </Text>
        <Text>{product.name}</Text>
      </Flex>
      <Flex h={"70%"}>
        <Divider color={"blue.1"} orientation={"vertical"} />
      </Flex>
      <Flex flex={1} direction={"column"} gap="12px" h={"80%"}>
        <Text c="blue.5" size="xl">
          Opis
        </Text>
        <Text>{product.description}</Text>
      </Flex>
      <Flex h={"70%"}>
        <Divider color={"blue.1"} orientation={"vertical"} />
      </Flex>
      <Flex flex={1} direction={"column"} h={"80%"} gap="12px">
        <Text c="blue.5" size="xl">
          Cena
        </Text>
        <Flex>
          {discount > 0 ? (
            <Flex direction={"column"}>
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
      </Flex>
      <Flex h={"70%"}>
        <Divider color={"blue.1"} orientation={"vertical"} />
      </Flex>
      <Flex flex={1} h={"80%"} direction={"column"} gap={"12px"}>
        <Text c="blue.5" size="xl">
          Velicine
        </Text>
        <Flex gap={"8px"} wrap={"wrap"}>
          {product.ProductSizeRelation.map((ps) =>
            ps.quantity > 0 ? (
              <Popover
                width={200}
                position="bottom"
                withArrow
                shadow="md"
                key={ps.id}
              >
                <Popover.Target>
                  <Flex
                    align={"center"}
                    justify={"center"}
                    bg={"blue.5"}
                    h={"35px"}
                    w={"55px"}
                    p={"4px"}
                    key={ps.productSize.id}
                    style={{ borderRadius: "10px" }}
                    gap={"4px"}
                  >
                    <Text c={"white"}>{ps.productSize.size}</Text>
                  </Flex>
                </Popover.Target>
                <Popover.Dropdown w={"150px"}>
                  <Text c="blue.5" size="lg">
                    Na stanju: <strong>{ps.quantity}</strong>
                  </Text>
                </Popover.Dropdown>
              </Popover>
            ) : null,
          )}
        </Flex>
      </Flex>
      <Flex h={"70%"}>
        <Divider color={"blue.1"} orientation={"vertical"} />
      </Flex>
      <Flex flex={1} direction={"column"} h={"80%"} gap="12px">
        <Text c="blue.5" size="xl">
          Kategorije
        </Text>
        <Flex>
          {product.categories.map((ps) => (
            <Text key={ps.name}>{ps.name}</Text>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductCard;

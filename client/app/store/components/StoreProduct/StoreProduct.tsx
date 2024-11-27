import { Flex, Text } from "@mantine/core";
import { Product } from "@/app/types/product";
import { Image } from "@mantine/core";
import styles from "@/app/admin/components/ProductCard/ProductCard.styles";
import { useHover } from "@mantine/hooks";
import { useRouter } from "next/navigation";

const StoreProduct = ({ product }: { product: Product }) => {
  const { hovered, ref } = useHover();
  const router = useRouter();
  const price = parseFloat(product.price);
  const discount = parseFloat(product.discount);
  const discountedPrice = price - (price * discount) / 100;
  return (
    <Flex
      ref={ref}
      direction={"column"}
      w={"250"}
      style={{
        borderRadius: "10px",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.3s ease",
      }}
      onClick={() => router.push(`/store/product/${product.id}`)}
    >
      <Flex w={"100%"} h={"70%"} pos="relative">
        <Image
          src={`/assets/tempProducts/${product.cover_image}`}
          alt={"Cover image"}
          radius={"10px"}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </Flex>
      <Flex direction={"column"}>
        <Flex>
          <Text size={"lg"}>{product.name}</Text>
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
      </Flex>
    </Flex>
  );
};

export default StoreProduct;

import { Flex, Text } from "@mantine/core";
import { Product } from "@/app/types/product";

const StoreContent = ({ products }: { products: Product[] | undefined }) => {
  console.log(products);
  return (
    <Flex w={"100%"} h={"100%"}>
      {products?.map((product) => {
        return <Text key={product.id}>{product.name}</Text>;
      })}
    </Flex>
  );
};

export default StoreContent;

import { Flex, Loader } from "@mantine/core";
import { Product } from "@/app/types/product";
import StoreProduct from "@/app/store/components/StoreProduct/StoreProduct";

const StoreContent = ({
  products,
  loadingProducts,
}: {
  products: Product[] | undefined;
  loadingProducts: boolean;
}) => {
  if (loadingProducts) {
    return <Loader />;
  }

  return (
    <Flex
      pl={"24px"}
      w={"100%"}
      h={"fit-content"}
      wrap={"wrap"}
      gap={"50px"}
      justify="flex-start" // Ensure left-aligned layout
      align="flex-start"
    >
      {products?.map((product) => {
        return <StoreProduct key={product.id} product={product} />;
      })}
    </Flex>
  );
};

export default StoreContent;

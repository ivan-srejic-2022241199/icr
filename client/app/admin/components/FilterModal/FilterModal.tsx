"use client";
import useProducts from "@/app/hooks/useProducts";
import { Button, Flex, Loader, Modal, Select } from "@mantine/core";
interface FilterModalProps {
  opened: boolean;
  close: () => void;
  handleSizeChange: (value: string) => void;
  handleCategoryChange: (value: string) => void;
  filter: {
    size: string;
    category: string;
  };
  applyFilters: () => void;
}
const FilterModal: React.FC<FilterModalProps> = ({
  opened,
  close,
  handleSizeChange,
  handleCategoryChange,
  filter,
  applyFilters,
}) => {
  const { sizes, loadingSizes, categories, loadingCategories } = useProducts();

  return (
    <Modal opened={opened} onClose={close} title="Filter">
      <Flex direction={"column"}>
        <Flex h={"250px"} direction={"column"} gap={"24px"}>
          {loadingSizes ? (
            <Loader />
          ) : (
            <Select
              placeholder="Velicina"
              data={sizes.map(
                (item: { id: number; size: string }) => item.size
              )}
              color="blue.5"
              onChange={(value) => handleSizeChange(value as string)}
              value={filter.size || ""}
            />
          )}
          {loadingCategories ? (
            <Loader />
          ) : (
            <Select
              placeholder="Izaberi kategoriju"
              data={categories.map(
                (category: {
                  id: number;
                  name: string;
                  description: string;
                  created_at: string;
                  updated_at: string;
                }) => category.name
              )}
              onChange={(value) => handleCategoryChange(value as string)}
              value={filter.category || ""}
              color="blue.5"
            />
          )}
        </Flex>

        <Flex mt="auto" justify={"flex-end"} gap={"8px"}>
          <Button onClick={() => applyFilters()}>Apply</Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default FilterModal;

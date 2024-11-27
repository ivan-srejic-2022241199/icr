/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, TextInput, Text, Flex } from "@mantine/core";

const Chatbot = ({ products }: any) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleQuery = () => {};

  return (
    <div>
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          zIndex: 1000,
        }}
      >
        Botko
      </Button>

      {isOpen && (
        <Flex
          direction="column"
          align="center"
          p="lg"
          style={{
            position: "fixed",
            bottom: "70px",
            right: "20px",
            maxWidth: "400px",
            margin: "auto",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
            zIndex: 999,
            padding: "20px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Text size="xl" mb={20}>
            Botko! At your service.
          </Text>
          <TextInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask me about products"
            mt={20}
            style={{ width: "100%" }}
          />
          <Button onClick={handleQuery} mt={10}>
            Ask
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default Chatbot;

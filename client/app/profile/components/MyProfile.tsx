"use client";
import { Flex, TextInput, Button, Container, Title, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const MyProfile = () => {
  const { user, setUser } = useAuth();

  console.log(user);
  const form = useForm({
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      city: user?.city || "",
      postal_code: user?.postal_code || "",
      address: user?.address || "",
    },

    validate: {
      first_name: (value) =>
        value.trim().length < 2
          ? "First name must have at least 2 characters"
          : null,
      last_name: (value) =>
        value.trim().length < 2
          ? "Last name must have at least 2 characters"
          : null,
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
      phone_number: (value) =>
        value.trim().length < 9 ? "Phone number must be valid" : null,
      city: (value) => (value.trim().length === 0 ? "City is required" : null),
      postal_code: (value) =>
        value.trim().length < 5 ? "Postal code must be valid" : null,
      address: (value) =>
        value.trim().length === 0 ? "Address is required" : null,
    },
  });

  useEffect(() => {
    if (user) {
      form.setValues({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        city: user.city || "",
        postal_code: user.postal_code || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/update-user",
        values,
        {
          withCredentials: true,
        },
      );

      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (err: any) {
      toast.error("Error updating profile, please try again.", err);
    }
  };

  return (
    <Container size="md" my={40}>
      <Title order={2} mb="lg">
        Edit Profile
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap="md">
          <TextInput
            label="First Name"
            placeholder="Your first name"
            {...form.getInputProps("first_name")}
          />
          <TextInput
            label="Last Name"
            placeholder="Your last name"
            {...form.getInputProps("last_name")}
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            {...form.getInputProps("email")}
            disabled
          />
          <TextInput
            label="Phone Number"
            placeholder="Your phone number"
            {...form.getInputProps("phone_number")}
          />
          <TextInput
            label="City"
            placeholder="Your city"
            {...form.getInputProps("city")}
          />
          <TextInput
            label="Postal Code"
            placeholder="Your postal code"
            {...form.getInputProps("postal_code")}
          />
          <TextInput
            label="Address"
            placeholder="Your address"
            {...form.getInputProps("address")}
          />
          <Box mt="lg">
            <Button type="submit" fullWidth>
              Save Changes
            </Button>
          </Box>
        </Flex>
      </form>
    </Container>
  );
};

export default MyProfile;

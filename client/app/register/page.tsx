/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Title,
  Anchor,
} from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone_number: "",
      city: "",
      postal_code: "",
      address: "",
    },

    validate: {
      first_name: (value) =>
        value.trim().length === 0 ? "First name is required" : null,
      last_name: (value) =>
        value.trim().length === 0 ? "Last name is required" : null,
      email: (value) =>
        value.length < 5 ? "Email must be at least 5 characters long" : null,
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters long" : null,
      phone_number: (value) =>
        value.trim().length === 0 ? "Phone number is required" : null,
      city: (value) => (value.trim().length === 0 ? "City is required" : null),
      postal_code: (value) =>
        value.trim().length === 0 ? "Postal code is required" : null,
      address: (value) =>
        value.trim().length === 0 ? "Address is required" : null,
    },
  });

  const register = async (values: typeof form.values) => {
    try {
      const payload = {
        ...values,
        role: "CUSTOMER",
      };

      await axios.post("http://localhost:3001/register", payload);
      router.push("/login");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Container size="xs" my={40}>
      <Title>Register</Title>
      <form onSubmit={form.onSubmit(register)}>
        <TextInput label="First Name" {...form.getInputProps("first_name")} />
        <TextInput label="Last Name" {...form.getInputProps("last_name")} />
        <TextInput label="Email" {...form.getInputProps("email")} />
        <PasswordInput label="Password" {...form.getInputProps("password")} />
        <TextInput
          label="Phone Number"
          {...form.getInputProps("phone_number")}
        />
        <TextInput label="City" {...form.getInputProps("city")} />
        <TextInput label="Postal Code" {...form.getInputProps("postal_code")} />
        <TextInput label="Address" {...form.getInputProps("address")} />
        <Button type="submit" fullWidth mt="xl">
          Register
        </Button>
      </form>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        Already have an account?{" "}
        <Anchor onClick={() => router.push("/login")} component="button">
          Login
        </Anchor>
      </div>
    </Container>
  );
};

export default RegisterPage;

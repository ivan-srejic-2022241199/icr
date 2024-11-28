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
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        value.length < 5 ? "Email must be at least 5 characters long" : null,
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters long" : null,
    },
  });

  const login = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post("http://localhost:3001/login", values, {
        withCredentials: true,
      });
      if (response) {
        setUser(response.data.userInfo);
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.error(err);
    }
  };

  return (
    <Container size="xs" my={40}>
      <Title>Login</Title>
      <form onSubmit={form.onSubmit(login)}>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          {...form.getInputProps("password")}
        />
        <Button type="submit" fullWidth mt="xl">
          Log in
        </Button>
      </form>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        Don&#39;t have an account?{" "}
        <Anchor onClick={() => router.push("/register")} component="button">
          Register
        </Anchor>
      </div>
    </Container>
  );
};

export default LoginPage;

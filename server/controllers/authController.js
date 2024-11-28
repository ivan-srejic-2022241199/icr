const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { createToken, hashPassword, verifyPassword } = require("../util.js");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Wrong email or password.",
      });
    }

    const passwordValid = await verifyPassword(password, user.password);

    if (passwordValid) {
      const { password, ...userInfo } = user;

      const token = createToken(userInfo);
      const decodedToken = jwt.decode(token);
      const expiresAt = decodedToken.exp;

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
      });

      res.json({
        message: "Authentication successful!",
        token,
        userInfo,
        expiresAt,
      });
    } else {
      res.status(StatusCodes.FORBIDDEN).json({
        message: "Wrong email or password.",
      });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Something went wrong." });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({ message: "Logged out successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong during logout.",
    });
  }
};

const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      role,
      password,
      phone_number,
      city,
      postal_code,
      address,
    } = req.body;

    const hashedPassword = await hashPassword(password);

    const userData = {
      first_name,
      last_name,
      email,
      role,
      password: hashedPassword,
      phone_number,
      city,
      postal_code: parseInt(postal_code, 10),
      address,
    };

    const existingEmail = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingEmail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email already exists" });
    }

    const newUser = await prisma.user.create({
      data: userData,
    });

    // res.json(newUser);
    if (newUser) {
      const token = createToken(newUser);
      const decodedToken = jwt.decode(token);
      const expiresAt = decodedToken.exp;

      const {
        first_name,
        last_name,
        email,
        role,
        phone_number,
        city,
        postal_code,
        address,
      } = newUser;

      const userInfo = {
        first_name,
        last_name,
        email,
        role,
        phone_number,
        city,
        postal_code,
        address,
      };

      res.cookie("token", token, { httpOnly: true });

      return res.json({
        message: "User created!",
        token,
        decodedToken,
        expiresAt,
        userInfo,
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "There was a problem creating your account",
      });
    }
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "There was a problem creating your account / OVDE PUCA",
      error: err,
    });
  }
};

const updateUserProfile = async (req, res) => {
  const { first_name, last_name, email, phone_number, city, postal_code, address } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required to update profile" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        first_name,
        last_name,
        phone_number,
        city,
        postal_code,
        address,
      },
    });

    return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ error: "An error occurred while updating the profile" });
  }
};

const getUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Invalid token");
  }

  try {
    const decodedToken = jwt.decode(token);

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: false,
        role: true,
        phone_number: true,
        city: true,
        postal_code: true,
        address: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      return res.status(404).json("Unknown user");
    }

    return res.status(200).json({ user: user });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ user: "Roor" });
  }
};

module.exports = { login, register, logout, getUser, updateUserProfile };

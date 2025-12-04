import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma.ts";
import ApiResponse from "../utils/ApiResponse.js";

const generateTokens = (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Token generation failed");
  }
};

const register = async (req, res) => {
  try {
    const { email, password, firstName, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json(new ApiResponse(400, "Email already in use"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        role: role || "JOB_SEEKER",
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        role: true,
      },
    });

    if (user.role === "JOB_SEEKER") {
      await prisma.jobSeekerProfile.create({
        data: { userId: user.id },
      });
    } else if (user.role === "RECRUITER") {
      await prisma.employerProfile.create({
        data: { userId: user.id, companyName: req.body.companyName || "" },
      });
    }

    if (!user) {
      throw new ApiError(500, "Failed to create user");
    }

    const token = generateTokens(user.id);

    res
      .status(201)
      .json(new ApiResponse(201, "User registered successfully", { user }));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        jobSeekerProfile: true,
        employerProfile: true,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Invalid email or password"));
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json(new ApiResponse(400, "Invalid email or password"));
    }
    const token = generateTokens(user.id);

    delete user.password;

    res.status(200).json(new ApiResponse(200, "Login successful", { user }));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Login Failed"));
  }
};

const logout = async (req, res) => {
  // Implement logout logic if needed (e.g., token invalidation)
  try {
    res.status(200).json(new ApiResponse(200, "Logout successful"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, "Logout Failed"));
  }
};

export { register, login, logout };

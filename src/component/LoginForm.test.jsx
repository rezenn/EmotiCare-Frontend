import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "./LoginForm"; // Adjust path as needed
import axios from "../axios/axios";

// Mock axios
jest.mock("../axios/axios", () => ({
  post: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
}));

describe("LoginForm Component", () => {
  it("renders the login form correctly", () => {
    render(
      <MemoryRouter>
        <LoginForm setAuth={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Nice to see you again")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("updates input fields correctly", () => {
    render(
      <MemoryRouter>
        <LoginForm setAuth={jest.fn()} />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText("Email Address");
    const passwordInput = screen.getByPlaceholderText("Enter password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("toggles password visibility", () => {
    render(
      <MemoryRouter>
        <LoginForm setAuth={jest.fn()} />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText("Enter password");
    const toggleButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });

  it("submits form and stores token in localStorage", async () => {
    axios.post.mockResolvedValue({
      data: { token: "mocked-token" },
    });

    const setAuthMock = jest.fn();

    render(
      <MemoryRouter>
        <LoginForm setAuth={setAuthMock} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Sign in"));

    // Ensure axios was called with correct data
    expect(axios.post).toHaveBeenCalledWith("/auth/login", {
      email: "test@example.com",
      password: "password123",
    });

    // Ensure token is stored and authentication state is updated
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for state update
    expect(localStorage.getItem("token")).toBe("mocked-token");
    expect(setAuthMock).toHaveBeenCalledWith(true);
  });
});

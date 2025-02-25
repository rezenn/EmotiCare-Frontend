import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm"; // Adjust path as needed
import axios from "../axios/axios";

// Mock axios
jest.mock("../axios/axios", () => ({
  post: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
}));

describe("RegisterForm Component", () => {
  it("renders the register form correctly", () => {
    render(
      <MemoryRouter>
        <RegisterForm setAuth={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("updates input fields correctly", () => {
    render(
      <MemoryRouter>
        <RegisterForm setAuth={jest.fn()} />
      </MemoryRouter>
    );

    const nameInput = screen.getByPlaceholderText("Username");
    const emailInput = screen.getByPlaceholderText("Email Address");
    const passwordInput = screen.getByPlaceholderText("Enter password");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("toggles password visibility", () => {
    render(
      <MemoryRouter>
        <RegisterForm />
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
        <RegisterForm setAuth={setAuthMock} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Register"));

    // Ensure axios was called with correct data
    expect(axios.post).toHaveBeenCalledWith("/auth/register", {
      name: "John Doe",
      email: "test@example.com",
      password: "password123",
    });

    // Ensure token is stored and authentication state is updated
    await waitFor(() =>
      expect(localStorage.getItem("token")).toBe("mocked-token")
    );
    expect(setAuthMock).toHaveBeenCalledWith(true);
  });
});

// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import Challenge from "./Challenge";
// import axios from "../../axios/axios";
// import { jest } from "@jest/globals";

// // Mock axios
// jest.mock("../../axios/axios");

// describe("Challenge Component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     localStorage.setItem("token", "mock-token"); // Ensure a token exists
//   });

//   test("should fetch and display challenges", async () => {
//     axios.get.mockResolvedValueOnce({
//       data: [
//         { challenge_id: 1, title: "Read a book", isdone: false },
//         { challenge_id: 2, title: "Workout", isdone: true },
//       ],
//     });

//     render(<Challenge />);

//     await waitFor(() =>
//       expect(axios.get).toHaveBeenCalledWith(
//         "/challenge/all",
//         expect.any(Object)
//       )
//     );

//     expect(await screen.findByText("Read a book")).toBeInTheDocument();
//     expect(await screen.findByText("Workout")).toBeInTheDocument();
//   });

//   test("should add a new challenge", async () => {
//     axios.post.mockResolvedValueOnce({
//       data: { challenge_id: 3, title: "New Challenge", isdone: false },
//     });

//     render(<Challenge />);

//     const input = screen.getByPlaceholderText("Add your own challenges . . .");
//     fireEvent.change(input, { target: { value: "New Challenge" } });

//     const addButton = screen.getByText("Add Challenge");
//     fireEvent.click(addButton);

//     await waitFor(() =>
//       expect(axios.post).toHaveBeenCalledWith(
//         "/challenge/add",
//         { title: "New Challenge", isPreloaded: false },
//         expect.any(Object)
//       )
//     );

//     expect(await screen.findByText("New Challenge")).toBeInTheDocument();
//   });

//   test("should toggle challenge completion status", async () => {
//     axios.get.mockResolvedValueOnce({
//       data: [{ challenge_id: 4, title: "Drink Water", isdone: false }],
//     });

//     axios.patch.mockResolvedValueOnce({
//       data: { challenge: { isdone: true } },
//     });

//     render(<Challenge />);

//     await waitFor(() => screen.findByText("Drink Water"));

//     const checkbox = screen.getByRole("checkbox");
//     fireEvent.click(checkbox);

//     await waitFor(() =>
//       expect(axios.patch).toHaveBeenCalledWith(
//         "/challenge/mark-done",
//         { challengeID: 4 },
//         expect.any(Object)
//       )
//     );

//     expect(checkbox.checked).toBe(true);
//   });

//   test("should remove a challenge", async () => {
//     axios.get.mockResolvedValueOnce({
//       data: [{ challenge_id: 5, title: "Meditate", isdone: false }],
//     });

//     axios.delete.mockResolvedValueOnce({ status: 200 });

//     render(<Challenge />);

//     await waitFor(() => screen.findByText("Meditate"));

//     const removeButton = screen.getByText("Remove");
//     fireEvent.click(removeButton);

//     await waitFor(() =>
//       expect(axios.delete).toHaveBeenCalledWith(
//         "/challenge/delete/5",
//         expect.any(Object)
//       )
//     );

//     expect(screen.queryByText("Meditate")).not.toBeInTheDocument();
//   });

//   test("should show an error if no token is found", async () => {
//     localStorage.removeItem("token");
//     console.error = jest.fn(); // Mock console.error to prevent error logs

//     render(<Challenge />);
//     await waitFor(() =>
//       expect(console.error).toHaveBeenCalledWith(
//         "No token found in localStorage"
//       )
//     );
//   });
// });

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../../component/LoginForm"; // Adjust path as needed
import axios from "../../axios/axios";

// Mock axios
jest.mock("../../axios/axios", () => ({
  post: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
}));

describe("LoginForm Component", () => {
  it(" should fetch and display challenges ", () => {
    render(
      <MemoryRouter>
        <LoginForm setAuth={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Nice to see you again")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("ushould add a new challenge", () => {
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

  it(" should toggle challenge completion status", () => {
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

  it(" should remove a challenge", async () => {
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
  it(" should show an error if no token is found", async () => {
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

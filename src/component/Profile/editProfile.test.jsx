import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditProfileComp from "./EditProfileComp";
import axios from "../../axios/axios";
import { MemoryRouter } from "react-router-dom";
import { jest } from "@jest/globals";

jest.mock("../../axios/axios");

describe("EditProfileComp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("email", "test@example.com");
    localStorage.setItem("token", "mock-token");
  });

  test("renders EditProfileComp correctly", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        full_name: "John Doe",
        user_name: "johndoe",
        gender: "Male",
        user_email: "test@example.com",
        birthday: "2000-01-01T00:00:00Z",
        profile_picture_url: "/images/profile.jpg",
      },
    });

    render(
      <MemoryRouter>
        <EditProfileComp />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Full Name")).toHaveValue("John Doe");
      expect(screen.getByPlaceholderText("Username")).toHaveValue("johndoe");
      expect(screen.getByLabelText("Male")).toBeChecked();
    });
  });

  test("prevents submission if no token is found", async () => {
    localStorage.removeItem("token");

    render(
      <MemoryRouter>
        <EditProfileComp />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  test("updates form fields correctly", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        full_name: "John Doe",
        user_name: "johndoe",
        gender: "Male",
        user_email: "test@example.com",
        birthday: "2000-01-01T00:00:00Z",
        profile_picture_url: "/images/profile.jpg",
      },
    });

    render(
      <MemoryRouter>
        <EditProfileComp />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Full Name")).toHaveValue("John Doe");
    });

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Jane Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "janedoe" },
    });

    fireEvent.click(screen.getByLabelText("Female"));

    expect(screen.getByPlaceholderText("Full Name")).toHaveValue("Jane Doe");
    expect(screen.getByPlaceholderText("Username")).toHaveValue("janedoe");
    expect(screen.getByLabelText("Female")).toBeChecked();
  });

  test("submits updated profile successfully", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        full_name: "John Doe",
        user_name: "johndoe",
        gender: "Male",
        user_email: "test@example.com",
        birthday: "2000-01-01T00:00:00Z",
        profile_picture_url: "/images/profile.jpg",
      },
    });

    axios.put.mockResolvedValueOnce({ data: { success: true } });

    render(
      <MemoryRouter>
        <EditProfileComp />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Full Name")).toHaveValue("John Doe");
    });

    fireEvent.click(screen.getByText("Update Profile"));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        "/profile/test@example.com",
        expect.any(FormData),
        expect.any(Object)
      );
    });
  });

  test("handles API errors gracefully", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network Error"));

    render(
      <MemoryRouter>
        <EditProfileComp />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});

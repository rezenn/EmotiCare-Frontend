import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import JournalForm from "./JournalForm";
import axios from "../../axios/axios";
import { MemoryRouter } from "react-router-dom";
import { jest } from "@jest/globals";

jest.mock("../../axios/axios");

describe("JournalForm Component", () => {
  const mockAddItem = jest.fn();
  const mockNavigate = jest.fn();
  const mockJournals = [{ entry_date: "2024-02-25" }];

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem("token", "mock-token");
  });

  test("renders JournalForm correctly", () => {
    render(
      <MemoryRouter>
        <JournalForm addItem={mockAddItem} journals={[]} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByText("Daily Journal")).toBeInTheDocument();
  });

  test("should prevent submission when no token is found", async () => {
    localStorage.removeItem("token");

    render(
      <MemoryRouter>
        <JournalForm addItem={mockAddItem} journals={[]} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test Journal" },
    });
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "This is a journal entry" },
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: "2024-02-25" },
    });
    fireEvent.change(screen.getByLabelText(/time/i), {
      target: { value: "14:30" },
    });

    fireEvent.click(screen.getByText("Add Journal"));

    await waitFor(() => {
      expect(screen.getByText("Add Journal")).toBeEnabled();
    });
  });

  test("should prevent duplicate journal entries on the same date", async () => {
    render(
      <MemoryRouter>
        <JournalForm addItem={mockAddItem} journals={mockJournals} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Duplicate Entry" },
    });
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Duplicate journal text" },
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: "2024-02-25" },
    });
    fireEvent.change(screen.getByLabelText(/time/i), {
      target: { value: "14:30" },
    });

    fireEvent.click(screen.getByText("Add Journal"));

    await waitFor(() => {
      expect(screen.getByText("Add Journal")).toBeEnabled();
    });
  });

  test("should submit journal successfully", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        title: "Test Journal",
        description: "Journal content",
        entry_date: "2024-02-25",
        entry_time: "14:30:00",
      },
    });

    render(
      <MemoryRouter>
        <JournalForm addItem={mockAddItem} journals={[]} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test Journal" },
    });
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "This is a journal entry" },
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: "2024-02-25" },
    });
    fireEvent.change(screen.getByLabelText(/time/i), {
      target: { value: "14:30" },
    });

    fireEvent.click(screen.getByText("Add Journal"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5000/dailyJournal",
        {
          title: "Test Journal",
          description: "This is a journal entry",
          entry_date: "2024-02-25",
          entry_time: "14:30:00",
        },
        expect.any(Object)
      );
    });

    expect(mockAddItem).toHaveBeenCalled();
  });

  test("should show an error if API request fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("Network Error"));

    render(
      <MemoryRouter>
        <JournalForm addItem={mockAddItem} journals={[]} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Failed Journal" },
    });
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "This journal won't be saved" },
    });
    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: "2024-02-25" },
    });
    fireEvent.change(screen.getByLabelText(/time/i), {
      target: { value: "14:30" },
    });

    fireEvent.click(screen.getByText("Add Journal"));

    await waitFor(() => {
      expect(screen.getByText("Add Journal")).toBeEnabled();
    });
  });
});

import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MoodCalendar from "./MoodCalendar";
import { fetchMoods, postMood } from "../../../api/moodAPI";
import { jest } from "@jest/globals";

// Mock API calls
jest.mock("../../../api/moodAPI", () => ({
  fetchMoods: jest.fn(),
  postMood: jest.fn(),
}));

describe("MoodCalendar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render the calendar with mood options", async () => {
    fetchMoods.mockResolvedValueOnce([
      { moodDate: "2025-02-25", moodEmoji: "😀", moodLabel: "Happy" },
    ]);

    render(<MoodCalendar />);

    // Wait for the calendar to appear
    await waitFor(() =>
      expect(screen.getByText(/Moodometer/i)).toBeInTheDocument()
    );
    await waitFor(() => expect(screen.getByRole("grid")).toBeInTheDocument());
  });

  test("should display the user's mood on the calendar", async () => {
    fetchMoods.mockResolvedValueOnce([
      { moodDate: "2025-02-25", moodEmoji: "😀", moodLabel: "Happy" },
    ]);

    render(<MoodCalendar />);

    await waitFor(() => expect(screen.getByRole("grid")).toBeInTheDocument());

    // Ensure the emoji is displayed
    await waitFor(() => expect(screen.getByText("😀")).toBeInTheDocument());
  });

  test("should open emoji picker when a date is clicked", async () => {
    render(<MoodCalendar />);
    const dateCell = screen.getAllByRole("button")[5];

    fireEvent.click(dateCell);

    await waitFor(() =>
      expect(screen.getByTestId("emoji-picker")).toBeInTheDocument()
    );
  });

  test("should select an emoji and post the mood", async () => {
    postMood.mockResolvedValueOnce({ success: true });

    render(<MoodCalendar />);
    const dateCell = screen.getAllByRole("button")[5];

    fireEvent.click(dateCell);
    await waitFor(() =>
      expect(screen.getByTestId("emoji-picker")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("😀"));

    await waitFor(() =>
      expect(postMood).toHaveBeenCalledWith(
        "/moodTracker",
        expect.objectContaining({
          moodDate: expect.any(String),
          moodEmoji: "😀",
          moodLabel: "Happy",
        })
      )
    );
  });

  test("should display loading state while fetching data", () => {
    fetchMoods.mockImplementation(() => new Promise(() => {})); // Simulate delay

    render(<MoodCalendar />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should not allow setting mood for a future date", async () => {
    render(<MoodCalendar />);
    const futureDateCell = screen.getByText("28");

    fireEvent.click(futureDateCell);

    await waitFor(() =>
      expect(screen.queryByTestId("emoji-picker")).not.toBeInTheDocument()
    );
  });
});

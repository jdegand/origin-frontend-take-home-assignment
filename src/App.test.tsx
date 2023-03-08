import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("Renders", () => {
    render(<App />);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Confirm");
  });

  test("HandleChange - Amount Input", () => {
    render(<App />);

    const amountInput = screen.getByTestId("amount");

    fireEvent.keyDown(amountInput, { key: "e" });
    expect(amountInput).toBeNull;

    fireEvent.change(amountInput, { target: { value: "dasdad" } });
    expect(amountInput).toBeNull;

    fireEvent.change(amountInput, { target: { value: 40000 } });
    expect(amountInput).toHaveValue(40000);
  });

  test("HandleChange - ReachDate Input", () => {
    render(<App />);

    const dateInput = screen.getByTestId("reachDate");

    fireEvent.change(dateInput, { target: { value: "2024-01" } });

    expect(dateInput).toHaveValue("2024-01");
  });

  test("ReachDate Input min", () => {
    render(<App />);

    const date = new Date();

    const year = date.getFullYear();

    const month = date.getMonth();

    const prevMonth = month - 1;

    const dateInput = screen.getByTestId("reachDate");

    fireEvent.change(dateInput, { target: { value: `${year}-${prevMonth}` } });

    expect(dateInput).toBeNull;
  });

  test("ReachDate min - months < 10", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("20 July 2024 02:12:00 GMT").getTime());
    render(<App />);

    const dateInput = screen.getByTestId("reachDate");

    expect(dateInput).toHaveAttribute("min", `2024-08`);
  });

  test("ReachDate min - December", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("20 Dec 2024 02:12:00 GMT").getTime());
    render(<App />);

    const dateInput = screen.getByTestId("reachDate");

    expect(dateInput).toHaveAttribute("min", `2024-12`);
  });

  test("ReachDate min - December", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("20 Nov 2024 02:12:00 GMT").getTime());
    render(<App />);

    const dateInput = screen.getByTestId("reachDate");

    expect(dateInput).toHaveAttribute("min", `2024-12`);
  });
});

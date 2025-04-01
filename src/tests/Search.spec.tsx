import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Search from "@/components/Search";

describe("Search", () => {
  it("should render Search component", () => {
    render(<Search onSearch={() => {}} suggestions={[]} />);

    expect(screen.getByRole("searchbox")).toBeDefined();
  });

  it("should display suggestions when typing", () => {
    render(<Search onSearch={() => {}} suggestions={["Suggestion 1", "Suggestion 2"]} />);
    const input = screen.getByRole("searchbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Suggestion 1" } });

    expect(screen.getByText("Suggestion 1")).toBeDefined();
  })

  it("should return the input value to parent component", async () => {
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} suggestions={[]} />);
    const input = screen.getByRole("searchbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Suggestion 1" } });

    expect(onSearch).toHaveBeenCalledWith("Suggestion 1");
  })

  it("should clear suggestions when input is cleared", () => {
    render(<Search onSearch={() => {}} suggestions={["Suggestion 1", "Suggestion 2"]} />);
    const input = screen.getByRole("searchbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Suggestion 1" } });
    expect(screen.getByText("Suggestion 1")).toBeDefined();
    
    fireEvent.change(input, { target: { value: "" } });
    expect(screen.queryByText("Suggestion 1")).toBeNull();
  })

  it("should clear input when clear button is clicked", () => {
    render(<Search onSearch={() => {}} suggestions={["Suggestion 1", "Suggestion 2"]} />);
    const input = screen.getByRole("searchbox") as HTMLInputElement;
    const clearButton = document.querySelector(".search__clear");
    
    fireEvent.change(input, { target: { value: "Suggestion 1" } });
    fireEvent.click(clearButton!);
    
    expect(input.value).toBe("");
  })
});

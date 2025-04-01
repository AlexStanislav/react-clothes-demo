import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Checkbox from "@/components/Checkbox";

describe("Checkbox", () => {
  it("should render Checkbox component", () => {
    render(
      <Checkbox currentValue="" onChange={() => {}} value="Checkbox label" />
    );

    expect(screen.getByText("CHECKBOX LABEL")).toBeDefined();
  });

  it("should return the checked value to parent component", async () => {
    const onChange = vi.fn();
    render(
      <Checkbox currentValue="" onChange={onChange} value="Checkbox label" />
    );
    const checkbox = screen.getByRole("radio");

    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith("Checkbox label");
  });

  it("should check the checkbox when the value matches the current value", () => {
    render(
      <Checkbox
        currentValue="Checkbox label"
        onChange={() => {}}
        value="Checkbox label"
      />
    );
    const checkbox = screen.getByRole("radio") as HTMLInputElement;

    expect(checkbox.checked).toBe(true);
  });
});

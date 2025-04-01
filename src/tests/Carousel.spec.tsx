import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Carousel from "@/components/Carousel";

describe("Carousel", () => {
  it("should render Carousel component", () => {
    render(<Carousel />);

    const carousel = screen.getAllByTestId("carousel");

    expect(carousel).toBeDefined();
  });

  it("should update carousel slide on next button click", () => {
    render(<Carousel />);
    const carouselSlider = screen.getByTestId("carousel__slider");
    const nextButton = screen.getByTestId("next__button");

    fireEvent.click(nextButton);

    expect(carouselSlider.style.transform).toBe("translateX(-100%)");
  });

  it("should update carousel slide on previous button click", () => {
    render(<Carousel />);
    const carouselSlider = screen.getByTestId("carousel__slider");
    const previousButton = screen.getByTestId("prev__button");

    fireEvent.click(previousButton);

    expect(carouselSlider.style.transform).toBe("translateX(-0%)");
  });
});

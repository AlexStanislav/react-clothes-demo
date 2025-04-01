import { carouselItems } from "@/helpers";
import { useState } from "react";
import "@/assets/css/components/Carousel.css";
import CarouselItem from "./CarouselItem";

interface CarouselProps {
  autoplayInterval?: number;
}

function Carousel({ autoplayInterval }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  function updateIndex(newIndex: number) {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= carouselItems.length) {
      newIndex = carouselItems.length - 1;
    }

    setActiveIndex(newIndex);
  }

  if (autoplayInterval) {
    setInterval(() => {
      if (activeIndex === carouselItems.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, autoplayInterval);
  }

  return (
    <div className="carousel" data-testid="carousel">
      <div className="carousel__control">
        <i
          className="pi pi-chevron-left"
          onClick={() => updateIndex(activeIndex - 1)}
          data-testid="prev__button"
        ></i>
        <i
          className="pi pi-chevron-right"
          onClick={() => updateIndex(activeIndex + 1)}
          data-testid="next__button"
        ></i>
      </div>
      
      <div className="carousel__wrapper">
        <div
          className="carousel__slider"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          data-testid="carousel__slider"
        >
          {carouselItems.map((item, index) => (
            <CarouselItem
              item={item}
              key={index}
              listID={index}
              index={activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;

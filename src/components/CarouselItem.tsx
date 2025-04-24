import type { CarouselItem } from "../types";
import "../assets/css/components/CarouselItem.css";

interface CarouselItemProps {
  item: CarouselItem;
  listID: number;
  index: number;
}
function CarouselItem({ item, listID, index }: CarouselItemProps) {
  return (
    <div className="carousel-item">
      <img className="carousel-item__image" src={item.image} alt={item.title} />
      <div className="carousel-item__text" style={item.textPosition}>
        <h2
          className={
            listID === index
              ? "carousel-item__title carousel-item__title--active"
              : "carousel-item__title"
          }
        >
          {item.title}
        </h2>
        <p
          className={
            listID === index
              ? "carousel-item__description carousel-item__description--active"
              : "carousel-item__description"
          }
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default CarouselItem;

import "../assets/css/pages/Contact.css";
import { MapContainer, TileLayer } from "react-leaflet";

const Contact = () => {
  return (
    <section className="contact">
      <h1 className="contact__title">Contact</h1>
      <MapContainer
        className="contact__map"
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>

      <h2 className="contact__subtitle">Contact Form</h2>

      <div className="contact__container">
        <ul className="contact__info">
          <li className="info__item">
            <i className="pi pi-map-marker"></i>
            <span className="info__label">Address</span>
            <p>123 Main St, City, Country</p>
          </li>
          <li className="info__item">
            <i className="pi pi-phone"></i>
            <span className="info__label">Phone</span>
            <p>(123) 456-7890</p>
          </li>
          <li className="info__item">
            <i className="pi pi-envelope"></i>
            <span className="info__label">Email</span>
            <p>fake@example.com</p>
          </li>
        </ul>
        <form className="contact__form">
          <span className="form__row">
            <i className="pi pi-user"></i>
            <input className="form__input" type="text" placeholder="Name" />
          </span>
          <span className="form__row">
            <i className="pi pi-envelope"></i>
            <input className="form__input" type="email" placeholder="Email" />
          </span>
          <textarea
            className="form__textarea"
            rows={10}
            cols={33}
            placeholder="Message"
          ></textarea>
          <button
            className="form__button"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

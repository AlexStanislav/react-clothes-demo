import "@/assets/css/pages/About.css";

function About() {
  return (
    <section className="about">
      <header className="about__header">
        <h1 className="about__title">ABOUT US</h1>
        <div className="about__overlay"></div>
        <div className="about__parallax"></div>
      </header>
      <section className="about__section about__team">
        <div className="about__container">
          <h2>Our Team</h2>
          <p className="about__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            corporis, excepturi quis illo deleniti nisi asperiores
            necessitatibus alias aliquid, magni dolorum vitae delectus
            voluptatibus recusandae laudantium cupiditate harum doloribus aut.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            omnis unde, repellendus distinctio dolore exercitationem impedit.
            Sequi illo placeat fuga aut voluptatem odio obcaecati possimus. Odit
            quisquam ipsum officiis eum!
          </p>
        </div>
        <img
          className="about__image"
          src="https://picsum.photos/600/400?random=1"
          alt=""
        />
      </section>
      <section className="about__section about__contact">
        <img
          className="about__image"
          src="https://picsum.photos/600/400?random=2"
          alt=""
        />
        <div className="about__container">
          <h2>Contact</h2>
          <p className="about__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
            corporis, excepturi quis illo deleniti nisi asperiores
            necessitatibus alias aliquid, magni dolorum vitae delectus
            voluptatibus recusandae laudantium cupiditate harum doloribus aut.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            omnis unde, repellendus distinctio dolore exercitationem impedit.
            Sequi illo placeat fuga aut voluptatem odio obcaecati possimus. Odit
            quisquam ipsum officiis eum!
          </p>
        </div>
      </section>
      <blockquote className="about__quote">
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae omnis
        voluptatem nemo eveniet."
        <span className="quote__author">– John Doe</span>
      </blockquote>
    </section>
  );
}

export default About;

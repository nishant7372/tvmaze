import "./carousel.css";
import Carousel from "react-bootstrap/Carousel";

export default function HomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="c-img  d-block w-100"
          src="https://wallpaperaccess.com/full/2751687.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="c-img d-block w-100"
          src="https://i0.wp.com/www.supermanhomepage.com/clickandbuilds/SupermanHomepage/wp-content/uploads/2023/02/SandL-Season3-Banner.jpg?fit=680%2C383&ssl=1"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="c-img d-block w-100"
          src="https://w0.peakpx.com/wallpaper/696/1015/HD-wallpaper-the-legend-of-hanuman.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="c-img d-block w-100"
          src="https://www.pixel4k.com/wp-content/uploads/2021/07/loki-marvel-tvseries-4k_1627769398.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="c-img d-block w-100"
          src="https://user-images.githubusercontent.com/91368799/230711507-a12c1988-28ee-4d86-925a-8689ff6654d3.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

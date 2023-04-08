import "./carousel.css";
import Carousel from "react-bootstrap/Carousel";

export default function HomeCarouselMobile() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="c-img  d-block w-100"
          src="https://i0.wp.com/thewordyhabitat.com/wp-content/uploads/2021/06/vincenzo-kdrama-poster.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="c-img d-block w-100"
          src="https://images.justwatch.com/poster/304409247/s718/superman-and-lois.%7Bformat%7D"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="c-img d-block w-100"
          src="https://bollyspice.com/wp-content/uploads/2021/03/LegendOfHanuman_Poster_04-612x906.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="c-img d-block w-100"
          src="https://c4.wallpaperflare.com/wallpaper/916/420/2/the-flash-season-3-grant-gustin-wallpaper-preview.jpg"
          alt="Fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="c-img d-block w-100"
          src="https://e1.pxfuel.com/desktop-wallpaper/440/1021/desktop-wallpaper-1440x2560-loki-marvel-tvseries-samsung-galaxy-s6-s7-google-pixel-xl-nexus-6-6p-lg-g5-backgrounds-and-marvel-loki.jpg"
          alt="Fifth slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

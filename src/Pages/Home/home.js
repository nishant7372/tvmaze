import "./home.css";
import HomeCarousel from "./carousel";
import HomeCarouselMobile from "./carouselMobile";

import { useEffect, useState } from "react";

export default function Home() {
  const [currCarousel, setCarousel] = useState(
    window.innerWidth > 600 ? <HomeCarousel /> : <HomeCarouselMobile />
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 600) {
        setCarousel(<HomeCarousel />);
      } else {
        setCarousel(<HomeCarouselMobile />);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div className="homecarousel">{currCarousel}</div>;
}

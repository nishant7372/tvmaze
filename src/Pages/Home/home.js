import "./home.css";

export default function Home() {
  return (
    <div className="main">
      <div className="heading">
        <img
          className="fImage"
          src={process.env.PUBLIC_URL + "/img/logo.png"}
          alt="home-logo"
        />
        Search for your favourite Tv Shows
      </div>
    </div>
  );
}

import "./home.css";

export default function Home() {
  return (
    <div className="main">
      <div className="heading">
        <img
          className="fImage"
          src={require("../../img/logo.png")}
          alt="home-logo"
        />
        Search for your favourite Tv Shows
      </div>
    </div>
  );
}

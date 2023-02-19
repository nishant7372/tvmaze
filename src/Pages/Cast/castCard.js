import "./castCard.css";
import { useEffect, useReducer } from "react";

export default function CastCard({ data }) {
  const initialValue = {
    characterName: "Character Name: N/A",
    personName: "Person Name: N/A",
    image: require("../../img/cast.png"),
    imagePresent: true,
  };

  function reducer() {
    let characterName = "Character Name: N/A";
    let personName = "Person Name: N/A";
    let image = require("../../img/cast.png");
    let imagePresent = true;

    if (data.character.name) characterName = data.character.name;
    if (data.person.name) personName = data.person.name;
    if (data.character.image) image = data.character.image.medium;
    else imagePresent = false;

    return {
      characterName: characterName,
      personName: personName,
      image: image,
      imagePresent: imagePresent,
    };
  }

  const [cast, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    dispatch();
  }, [data]);

  return (
    <div className="castCard">
      <div className="upperSection-castCard">
        <img
          className={cast.imagePresent ? `castImage` : `castImage invert`}
          src={cast.image}
          alt="actor/actress"
        />
      </div>
      <div className="lowerSection-castCard">
        <div className="lowerSection-castCard-cName">{cast.characterName}</div>
        <div className="lowerSection-castCard-pName">{cast.personName}</div>
      </div>
    </div>
  );
}

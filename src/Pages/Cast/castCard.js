import "./castCard.css";
import { useEffect, useReducer } from "react";

export default function CastCard({ data }) {
  const initialValue = {
    characterName: "Character Name: N/A",
    personName: "Person Name: N/A",
    image: `${process.env.PUBLIC_URL}/img/cast.png`,
    imagePresent: false,
  };

  function reducer() {
    let characterName = initialValue.characterName;
    let personName = initialValue.personName;
    let image = initialValue.image;
    let imagePresent = initialValue.imagePresent;

    if (data.character.name) characterName = data.character.name;
    if (data.person.name) personName = data.person.name;
    if (data.character.image) {
      image = data.character.image.medium;
      imagePresent = true;
    }

    return {
      characterName,
      personName,
      image,
      imagePresent,
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

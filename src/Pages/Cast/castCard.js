import "./castCard.css";
import { useEffect, useReducer } from "react";
export default function CastCard({ data }) {
  const initialValue = {
    characterName: "Character Name: N/A",
    personName: "Person Name: N/A",
    image: require("../../img/tvshow.png"),
  };

  function reducer() {
    let characterName = "Character Name: N/A";
    let personName = "Person Name: N/A";
    let image = require("../../img/tvshow.png");

    if (data.character.name) characterName = data.character.name;
    if (data.person.name) personName = data.person.name;
    if (data.character.image) image = data.character.image.medium;

    return {
      characterName: characterName,
      personName: personName,
      image: image,
    };
  }

  const [cast, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    dispatch();
  }, [data]);

  console.log(data);
  return (
    <div className="castCard">
      <div className="upperSection-castCard">
        <img className="castImage" src={cast.image}></img>
      </div>
      <div className="lowerSection-castCard">
        <div className="lowerSection-castCard-cName">{cast.characterName}</div>
        <div className="lowerSection-castCard-pName">{cast.personName}</div>
      </div>
    </div>
  );
}

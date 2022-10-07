import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const character = ({ character }) => {
  return (
    <div className="header" key={character.id}>
      <div className="card mb-3 card-color">
        <div className="row g-0 ">
          <div className="col-md-5 ">
            <img src={character.image} className="img-fluid rounded-start" />
          </div>
          <div className="col-md-5">
            <div className="card-body">
              <h2 className="card-title">{character.name}</h2>
              <h6 className="card-text">
                {character.status} - {character.species}
              </h6>
              <p className="card-text">
                Last known location: <br />
                {character.origin.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default character;

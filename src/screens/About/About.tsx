import React from "react";

import logo from "./images/about.png";

export default function About() {
  return (
    <div className="about-page">
      <div className="about-page__content">
        <img className="about-page__content-logo" alt="Joker" src={logo} />
        <h2>Hey! Why so serious?</h2>
      </div>
    </div>
  );
}

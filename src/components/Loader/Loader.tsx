import React, { useCallback } from "react";

import icon from "./images/joker-spinner.png";

export default function BtnDelete() {
  return (
    <div className="app-loader">
      <img className="spinner" src={icon} />
    </div>
  );
}

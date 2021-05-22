import React, { useCallback } from "react";

import icon from "./images/delete.svg";

export type Props = {
  onClick: () => void | Promise<void>;
};

export default function BtnDelete(props: Props) {
  const { onClick } = props;

  const clickCallback = useCallback(
    (event: any) => {
      event.stopPropagation();
      onClick && onClick();
    },
    [onClick],
  );

  return (
    <button className="btn-delete" onClick={clickCallback}>
      <img src={icon} />
    </button>
  );
}

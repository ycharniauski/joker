import React, { useCallback } from "react";

import expandedIcon from "./images/expanded.png";
import collapsedIcon from "./images/collapsed.png";

export type Props = {
  expanded: boolean;
  onClick: () => void | Promise<void>;
};

export default function BtnExpand(props: Props) {
  const { expanded, onClick } = props;

  const clickCallback = useCallback(
    (event: any) => {
      event.stopPropagation();
      onClick && onClick();
    },
    [onClick],
  );

  const icon = expanded ? expandedIcon : collapsedIcon;

  return (
    <button className="btn-expand" onClick={clickCallback}>
      <img src={icon} />
    </button>
  );
}

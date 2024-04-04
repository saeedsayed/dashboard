import React from "react";

const NavButton = ({
  content,
  notification,
  tooltip,
  handelClick,
  customStyle,
}) => {
  // notification point 👇
  const ntf =
    notification &&
    "after:block after:w-2 after:h-2 after:bg-green-400 after:rounded-full after:absolute after:top-1 after:right-0";

  return (
    <button
      className={`hover:bg-hover relative w-8 h-8 rounded-lg flex justify-center items-center ${ntf} ${customStyle}`}
      title={tooltip}
      onClick={handelClick}
    >
      {content}
    </button>
  );
};

export default NavButton;

import React, { useEffect, useState } from "react";

export default function Button({ link, buttonType = 'primary', displayText, onClickAction }) {
  const cssClass = setButtonCss(buttonType)

  return (
    <div
      onClick={() => onClickAction()}
      key={link}
      className={cssClass}
    >
      {displayText || "Click Me"}
    </div>
  );
}

function setButtonCss(buttonType) {
  let cssClass = "bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-lg text-center"

  if (buttonType === 'primary') {
    cssClass = "bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-lg text-center"
  } else if (buttonType === 'secondary') {
    cssClass = "bg-teal-500 hover:bg-teal-600 text-white py-1 px-4 rounded-lg text-center"
  } else if (buttonType === 'tertiary') {
    cssClass = "bg-fuchsia-800 hover:bg-fuchsia-500 border-2 border-fuchsia-300 text-white py-1 px-4 rounded-lg text-center"
  } 

  return cssClass
}
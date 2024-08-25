import React, { useEffect, useState } from "react";

export default function StickyTextDisplay({ displayCoordinates, displayText, isShown }) {
  const defaultStickyTextMetaData = {
    isVisible: false,
    textContent: "",
    xCoordinate: "",
    yCoordinate: "",
  };
  const [stickyTextMetaData, setStickyTextMetaData] = useState(
    defaultStickyTextMetaData
  );

  useEffect(() => {
    if (displayCoordinates.xCoordinate && displayCoordinates.yCoordinate) {
      setStickyTextMetaData((prevState) => {
        return {
          ...prevState,
          textContent: displayText || defaultStickyTextMetaData.textContent,
          yCoordinate: displayCoordinates.yCoordinate,
          xCoordinate: displayCoordinates.xCoordinate,
        };
      });
    }
  }, [displayCoordinates]);

  useEffect(() => {
    setStickyTextMetaData((prevState) => {
      return { ...prevState, isVisible: isShown };
    });
  }, [isShown]);

  return (
    <div
      className={`fixed bg-inherit text-white p-4 border-2 border-gray-600 shadow-md h-auto ${
        stickyTextMetaData.isVisible ? "visible cursor-pointer" : "invisible"
      }`}
      style={
        stickyTextMetaData.isVisible
          ? {
              // TRUNS OUT THE CSS COULD HAVE SOLVED THE ISSUE I THINK. THE fixed param was causing the box to hide again but if we change it to absolute it will take care od the position
              position: "absolute",
              left: `${stickyTextMetaData.xCoordinate}px`,
              top: `${stickyTextMetaData.yCoordinate}px`,
              maxWidth: "600px",
              whiteSpace: "normal",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              height: "auto",
            }
          : { display: "none" }
      }
    >
      <p>{stickyTextMetaData.textContent}</p>
    </div>
  );
}

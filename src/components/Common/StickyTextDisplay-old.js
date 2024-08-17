import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";

function StickyTextDisplay(
  {},
  // displayCoordinates, displayText
  ref
) {
  const defaultStickyTextMetaData = {
    isVisible: false,
    textContent: "",
    xCoordinate: "",
    yCoordinate: "",
  };
  const [stickyTextMetaData, setStickyTextMetaData] = useState(
    defaultStickyTextMetaData
  );

  //   useEffect(() => {
  //   if (displayCoordinates.xCoordinate && displayCoordinates.yCoordinate) {
  //     setStickyTextMetaData((prevState) => {
  //       return {
  //         ...prevState,
  //         isVisible: true,
  //         textContent: displayText,
  //         yCoordinate: displayCoordinates.yCoordinate,
  //         xCoordinate: displayCoordinates.xCoordinate,
  //       };
  //     });
  //   } else {
  //     setStickyTextMetaData(defaultStickyTextMetaData);
  //   }
  //   }, [displayCoordinates]);

  const handleStackyTextDisplayMetaData = ({
    xCoordinate,
    yCoordinate,
    displayText,
  }) => {
    if (xCoordinate && yCoordinate) {
      setStickyTextMetaData((prevState) => {
        return {
          ...prevState,
          isVisible: true,
          textContent: displayText ||  defaultStickyTextMetaData.textContent,
          yCoordinate,
          xCoordinate,
        };
      });
    } else {
      setStickyTextMetaData(defaultStickyTextMetaData);
    }
  };

  useImperativeHandle(ref, () => ({
    handleStackyTextDisplayMetaData,
  }));

  return (
    <div
      className={`fixed bg-inherit text-white p-4 border-2 border-gray-600 shadow-md inline-flex h-auto text-wrap ${
        stickyTextMetaData.isVisible ? "visible cursor-pointer" : "invisible"
      }`}
      style={
        stickyTextMetaData.isVisible
          ? {
              left: `${stickyTextMetaData.xCoordinate}px`,
              top: `${stickyTextMetaData.yCoordinate}px`,
            }
          : { display: "none" }
      }
    >
      <p>{stickyTextMetaData.textContent}</p>
    </div>
  );
}

export default forwardRef(StickyTextDisplay);

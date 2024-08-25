import React, { useMemo, useState } from "react";
import {
  LinksForTableColmns,
} from "../../utils/constants";

import { Button, Modal } from "../Common";
import Solution from "./Solution";
import EditDeleteOptions from "./EditDeleteOptions";
import StickyTextDisplay from "../Common/StickyTextDisplay";

export default function Questions({ solvedQuestion = {} }) {
  // For Questions Component
  const [solutionModelStatus, setSolutionModelStatus] = useState(false);

  const defaultSolutionDetails = {
    tc: "",
    sc: "",
    solution: "",
    question: "",
  };
  const [solutionDetails, setSolutionDetails] = useState(
    defaultSolutionDetails
  );

  const TableColumnsObject = useMemo(() => {
    return {
      "Level": solvedQuestion["problem_level"],
      "Question": solvedQuestion["question_description"],
      "Link": solvedQuestion["question_link"],
      "BF Approach": solvedQuestion["brute_force_solution_description"],
      "BF Solution": solvedQuestion["brute_force_solution"],
      "BF Complexity": makeComplexityText(
        solvedQuestion["brute_force_solution_tc"],
        solvedQuestion["brute_force_solution_sc"]
      ),
      "Opt Approach": solvedQuestion["optimal_solution_description"],
      "Opt Solution": solvedQuestion["optimal_solution"],
      "Opt Complexity": makeComplexityText(
        solvedQuestion["optimal_solution_tc"],
        solvedQuestion["optimal_solution_sc"]
      ),
      "Edit Delete Option": "update",
    };
  }, [solvedQuestion]);

  const openLeetCodeLink = (link) => {
    window.open(link, "_blank");
  };

  const openPopUp = (key) => {
    setSolutionModelStatus(true);
    if (key === "BF Solution") {
      setSolutionDetails({
        tc: solvedQuestion["brute_force_solution_tc"],
        sc: solvedQuestion["brute_force_solution_sc"],
        solution: solvedQuestion["brute_force_solution"],
        question: solvedQuestion["question_description"],
      });
    } else {
      setSolutionDetails({
        tc: solvedQuestion["optimal_solution_tc"],
        sc: solvedQuestion["optimal_solution_sc"],
        solution: solvedQuestion["optimal_solution"],
        question: solvedQuestion["question_description"],
      });
    }
  };

  // For StickyText
  const defaultMouseCoordinates = {
    xCoordinate: "",
    yCoordinate: "",
  };
  const [mouseCoordinates, setMouseCoordinates] = useState(
    defaultMouseCoordinates
  );

  const [isShown, setIsShown] = useState(false);
  const [currentSelection, setCurrentSelection] = useState("");

  const handleRowDisplayMouseMove = (e, displayText) => {
    setMouseCoordinates({
      xCoordinate: e.clientX,
      yCoordinate: e.clientY,
    });

    setCurrentSelection(displayText);
  };

  return (
    <>
      {/* MODEL COMPONENT TO DISPLAY SOLVED QUESTIONS */}
      <Modal
        open={solutionModelStatus}
        onClose={() => setSolutionModelStatus(false)}
      >
        <Solution {...solutionDetails} />
      </Modal>

      {/* STICKY TEXT DISPLAY COMPONENT */}
      <StickyTextDisplay
        isShown={isShown}
        displayCoordinates={mouseCoordinates}
        displayText={currentSelection}
      />

      {/* START OF LISTING ELEMENTS */}
      <div className="flex flex-row">
        {Object.keys(TableColumnsObject).map((key) => {
          return (
            <div
              key={key}
              className='dark:text-slate-500 text-base m-4 break-words flex-none w-36'
            >
              {/* DISPLAYING BUTTON FOR LINKS AND POPUPS AND FOR ALL OTHER ELEMENTS WE DISPLAY SIMPLE TEXT */}

              {LinksForTableColmns.includes(key) ? (
                <Button
                  displayText={makeLinkBtnDisplayName(key)}
                  link={TableColumnsObject[key]}
                  buttonType={makeLinkBtnStyle(key)}
                  onClickAction={
                    key === "Link"
                      ? () => openLeetCodeLink(TableColumnsObject[key])
                      : () => openPopUp(key)
                  }
                />
              ) : key === "Edit Delete Option" ? (
                <EditDeleteOptions questionId={solvedQuestion._id}/>
              ) : (
                <div
                  onMouseMove={(e) =>
                    handleRowDisplayMouseMove(e, TableColumnsObject[key])
                  }
                  // onMouseLeave={handleRowDisplayMouseOut}
                  onMouseEnter={() => setIsShown(true)}
                  onMouseLeave={() => setIsShown(false)}
                >
                  <p
                    className={makeRowDisplayTextCssClass(
                      TableColumnsObject[key]
                    )}
                  >
                    {TableColumnsObject[key].length > 36
                      ? TableColumnsObject[key].slice(0, 36) + "... "
                      : TableColumnsObject[key]}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function makeComplexityText(tc, sc) {
  let returnValue = [];
  tc && returnValue.push(`TC: ${tc}`);
  sc && returnValue.push(`SC: ${sc}`);

  return returnValue.join(" ");
}

function makeRowDisplayTextCssClass(displayText) {
  let cssClass = "";
  switch (displayText) {
    case "easy":
      cssClass = `border-2 border-emerald-400 bg-emerald-900 text-emerald-200 text-center pb-1`;
      break;
    case "medium":
      cssClass = `border-2 border-yellow-400 bg-yellow-900 text-yellow-200 text-center pb-1`;
      break;
    case "hard":
      cssClass = `border-2 border-red-400 bg-red-900 text-red-200 text-center pb-1`;
      break;
    default:
      cssClass = "";
  }

  return cssClass;
}

function makeLinkBtnStyle(linkKey) {
  let buttonType = "primary";

  if (["BF Solution", "Opt Solution"].includes(linkKey)) {
    buttonType = "secondary";
  }

  return buttonType;
}

function makeLinkBtnDisplayName(linkKey) {
  let buttonText = "Link";

  if (["BF Solution", "Opt Solution"].includes(linkKey)) {
    buttonText = "Open";
  }
  return buttonText;
}

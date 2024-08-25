import React, { useEffect, useState } from "react";
import { TableColumns, ExtendedTableColumns } from "../../utils/constants";

import Questions from "./Questions";
import QuestionsForm from "./QuestionsForm";

import { Button, Modal } from "../Common";

export default function Dashboard() {
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [addQuestionModelStatus, setAddQuestionModelStatus] = useState(false);

  const getSolvedQuestions = () => {
    fetch("http://localhost:7081/solved-questions")
      .then((res) => res.json())
      .then((res) => (res ? setSolvedQuestions(res) : null));
  };

  useEffect(() => {
    getSolvedQuestions();
  }, []);

  return (
    <>
      {/* POP UP MODEL */}
      <Modal
        open={addQuestionModelStatus}
        onClose={() => setAddQuestionModelStatus(false)}
      >
        <QuestionsForm
          questionModelStatus={addQuestionModelStatus}
          setQuestionModelStatus={setAddQuestionModelStatus}
          fallbackFunction={getSolvedQuestions}
          buttonText="ADD"
        />
      </Modal>
      {/* DASHBOARD MAIN */}
      <div className="m-5">
        <div className="bg-white dark:bg-slate-800 rounded-lg ring-1 ring-slate-900/5 shadow-xl h-[calc(100vh-11rem)] overflow-y-auto">
          {/* ADD BTN */}
          <div className="flex flex-row justify-end right-0 m-2">
            <Button
              displayText={"ADD SOLVED QUESTION"}
              buttonType={"tertiary"}
              onClickAction={() => setAddQuestionModelStatus(true)}
            />
          </div>

          {/* LIST HEADING */}
          <div className="flex flex-row">
            {TableColumns.map((colName, i) => (
              <div
                key={i}
                className="dark:text-white text-base font-medium m-4 flex-none w-36"
              >
                {colName}
              </div>
            ))}
          </div>

          {/* QUESTION LIST */}
          {solvedQuestions.map((solvedQuestion) => (
            <Questions
              key={solvedQuestion["_id"]}
              solvedQuestion={solvedQuestion}
            />
          ))}
        </div>
      </div>
    </>
  );
}

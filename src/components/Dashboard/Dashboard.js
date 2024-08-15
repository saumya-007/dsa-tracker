import React, { useEffect, useState } from "react";
import { TableColumns, ExtendedTableColumns } from "../../utils/constants";

import Questions from "./Questions";
import AddQuestionsForm from "./AddQuestionsForm";
import { Button, Modal } from "../Common";

export default function Dashboard() {
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [addQuestionModelStatus, setAddQuestionModelStatus] = useState(false);

  useEffect(() => {
    fetch("http://localhost:7081/solved-questions")
      .then((res) => res.json())
      .then((res) => res ? setSolvedQuestions(res) : null);
  }, []);

  return (
    <>
      {/* POP UP MODEL */}
      <Modal
        open={addQuestionModelStatus}
        onClose={() => setAddQuestionModelStatus(false)}
      >
        <AddQuestionsForm />
      </Modal>
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
          {/* HEADING */}
          <div className="flex flex-row">
            {TableColumns.map((colName, i) => {
              return ExtendedTableColumns.includes(colName) ? (
                <div
                  key={i}
                  className="dark:text-white text-base font-medium m-4 flex-none w-64"
                >
                  {colName}
                </div>
              ) : (
                <div
                  key={i}
                  className="dark:text-white text-base font-medium m-4 flex-none w-28"
                >
                  {colName}
                </div>
              );
            })}
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

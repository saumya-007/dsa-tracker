import React, { useState, useRef, useEffect } from "react";
import { AddQuestionFormInputs } from "../../utils/constants";

import { Button, InputForm } from "../Common";
import GoEditor from "./GoEditor";

export default function AddQuestionsForm({addQuestionModelStatus, setAddQuestionModelStatus, getSolvedQuestions}) {
  const defaultEmptyValues = {
    category: "",
    level: "",
    question_desc: "",
    question_link: "",
    bf_approach: "",
    bf_solution: "",
    bf_sc: "",
    bf_tc: "",
    opt_approach: "",
    opt_solution: "",
    opt_sc: "",
    opt_tc: "",
  }
  const [value, setValue] = useState(defaultEmptyValues);

  const onInputChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onCodeEditorChange = (currentValue, name) => {
    setValue({ ...value, [name]: currentValue });
  };

  const addSolvedQuestion = () => {
    fetch("http://localhost:7081/solved-question", {
      method: "POST",
      body: JSON.stringify({
        problem_category: value["category"],
        problem_level: value["level"],
        question_description: value["question_desc"],
        question_link: value["question_link"],
        brute_force_solution_description: value["bf_approach"],
        brute_force_solution: value["bf_solution"],
        brute_force_solution_tc: value["bf_tc"],
        brute_force_solution_sc: value["bf_sc"],
        optimal_solution_description: value["opt_approach"],
        optimal_solution: value["opt_solution"],
        optimal_solution_tc: value["opt_tc"],
        optimal_solution_sc: value["opt_sc"],
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setValue(defaultEmptyValues)
        setAddQuestionModelStatus(false)
        getSolvedQuestions()
      })
      .catch((e) => {
        console.log(e)
      });   
  };

  useEffect(() => {
    !addQuestionModelStatus && setValue(defaultEmptyValues)
  }, [addQuestionModelStatus])

  return (
    <div className="text-center grid grid-cols-2 gap-9 bg-inherit text-white">
      {/* LEFT SIDE */}
      <div className="grid grid-cols-2 gap-2">
        {AddQuestionFormInputs.map((input, index) =>
          index < AddQuestionFormInputs.length - 2 ? (
            <div
              key={index}
              className={`${
                input["type"] == "text" ? "col-span-2" : "col-span-1 "
              }`}
            >
              <InputForm
                key={input.id}
                {...input}
                value={value[input.name]}
                onChange={onInputChange}
              />
            </div>
          ) : (
            null
          )
        )}
        <div className="w-20">
          <Button
            link={Math.random().toString()}
            buttonType="tertiary"
            displayText={"Add"}
            onClickAction={addSolvedQuestion}
          />
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div>
        {AddQuestionFormInputs.map((input, index) =>
          index >= AddQuestionFormInputs.length - 2 ? (
            <span key={index}>
              <p className="text-left font-semibold p-2">{input["label"]}</p>
              <GoEditor
                value={value[input.name]}
                name={input["name"]}
                onChange={onCodeEditorChange}
                width="35vw"
              />
            </span>
          ) : (
            null
          )
        )}
      </div>
    </div>
  );
}

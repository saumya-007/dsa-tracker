import React, { useState, useEffect } from "react";
import { AddQuestionFormInputs } from "../../utils/constants";

import { Button, InputForm } from "../Common";
import GoEditor from "./GoEditor";

import DeleteIcon from "../../images/trash.svg";

export default function QuestionsForm({
  questionId,
  questionModelStatus,
  setQuestionModelStatus,
  fallbackFunction,
  buttonText = "submit",
  enableDeleteOption,
}) {
  typeof fallbackFunction !== "function" && (fallbackFunction = () => {});

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
  };
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
        console.log(res);
        setValue(defaultEmptyValues);
        setQuestionModelStatus(false);
        fallbackFunction();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateSolvedQuestion = (id) => {
    fetch(`http://localhost:7081/solved-question/${id}`, {
      method: "PUT",
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
        console.log(res);
        setValue(defaultEmptyValues);
        setQuestionModelStatus(false);
        // FOR NOW THIS GET CALL IS NOT WORKING AS I HAVE NOT GIVEN THE FALLBACK FUNCTION CALL (THAT IS GET CALL)
        fallbackFunction();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getSolvedQuestionsById = (id) => {
    fetch(`http://localhost:7081/solved-questions/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setValue({
          category: res["problem_category"],
          level: res["problem_level"],
          question_desc: res["question_description"],
          question_link: res["question_link"],
          bf_approach: res["brute_force_solution_description"],
          bf_solution: res["brute_force_solution"],
          bf_sc: res["brute_force_solution_sc"],
          bf_tc: res["brute_force_solution_tc"],
          opt_approach: res["optimal_solution_description"],
          opt_solution: res["optimal_solution"],
          opt_sc: res["optimal_solution_sc"],
          opt_tc: res["optimal_solution_tc"],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteSolvedQuestionsById = (id) => {
    if (id) {
      fetch(`http://localhost:7081/solved-question/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          console.log(res);
          setValue(defaultEmptyValues);
          setQuestionModelStatus(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleButtonClick = (buttonText) => {
    if (buttonText == "ADD") {
      addSolvedQuestion();
    } else if (buttonText == "EDIT") {
      updateSolvedQuestion(questionId);
    }
  };

  useEffect(() => {
    !questionModelStatus && setValue(defaultEmptyValues);
  }, [questionModelStatus]);

  useEffect(() => {
    if (questionId) {
      getSolvedQuestionsById(questionId);
    }
  }, [questionId, questionModelStatus]);

  return (
    <div className="text-center grid grid-cols-2 gap-9 bg-inherit text-white">
      {/* LEFT SIDE */}
      <div className="grid grid-cols-2 gap-2">
        {AddQuestionFormInputs.map((input, index) =>
          index < AddQuestionFormInputs.length - 2 ? (
            <div
              key={index}
              className={`${
                input["type"] === "text" ? "col-span-2" : "col-span-1 "
              }`}
            >
              <InputForm
                key={input.id}
                {...input}
                value={value[input.name]}
                onChange={onInputChange}
              />
            </div>
          ) : null
        )}
        <div className="w-20">
          <Button
            link={Math.random().toString()}
            buttonType="tertiary"
            displayText={buttonText}
            onClickAction={() => handleButtonClick(buttonText)}
          />
        </div>
        {enableDeleteOption ? (
          <div className="w-20">
            <Button
              link={Math.random().toString()}
              buttonType="tertiary"
              displayText={<img src={DeleteIcon} />}
              onClickAction={() => deleteSolvedQuestionsById(questionId)}
              style={{ width: "60px" }}
            />
          </div>
        ) : (
          <></>
        )}
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
          ) : null
        )}
      </div>
    </div>
  );
}

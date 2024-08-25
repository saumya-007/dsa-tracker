import React, { useState } from "react";
import { Button, Modal } from "../Common";
import DownArrow from "../../images/down-arrow.svg";
import QuestionsForm from "./QuestionsForm";

export default function EditDeleteOptions({questionId}) {
  const [editDeleteModelStatus, setEditDeleteModelStatus] = useState(false);
  return (
    <div>
      <Modal
        open={editDeleteModelStatus}
        onClose={() => setEditDeleteModelStatus(false)}
      >
        {
          <QuestionsForm
            questionId={questionId}
            questionModelStatus={editDeleteModelStatus}
            setQuestionModelStatus={setEditDeleteModelStatus}
            buttonText="EDIT"
            enableDeleteOption={true}
          />
        }
      </Modal>
      <Button
        link={Math.random()}
        buttonType="transparant"
        displayText={
          <img
            src={DownArrow}
            style={{
              height: "40px",
              width: "auto",
            }}
          />
        }
        onClickAction={() => setEditDeleteModelStatus(true)}
      />
    </div>
  );
}

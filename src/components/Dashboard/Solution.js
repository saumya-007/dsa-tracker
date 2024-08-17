import React from "react";
import GoEditor from "./GoEditor";

export default function Solution({ tc, sc, solution, question }) {
  return (
      <div className="grid grid-cols-3 gap-4 w-1/2 mx-auto text-white">
        <div className="font-semibold p-4">{"Question : " + question}</div>
        <div className="font-semibold p-4">{"Time Complexity : " + tc}</div>
        <div className="font-semibold p-4">{"Space Complexity : " + sc}</div>
        <GoEditor value={solution} name={question} onChange={() => {}} />
      </div>
  );
}

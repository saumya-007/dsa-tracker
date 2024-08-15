import React from "react";

export default function InputForm({ label, onChange, id, ...inputProperties }) {
  return (
    <div className="flex flex-col text-left">
      <label className="mb-1 text-white text-sm pl-1">{label}</label>
      <input
        className={`invalid:border-red-500 border-2 w-full border-slate-600 rounded-lg p-2 text-white bg-inherit ${
          inputProperties["type"] === "text" ? "text-left align-top h-40" : "h-10"
        }`}
        {...inputProperties}
        onChange={onChange}
      />
    </div>
  );
}

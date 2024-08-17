import React from "react";

export default function InputForm({ label, onChange, id, type, ...inputProperties }) {
  return (
    <div className="flex flex-col text-left">
      <label className="mb-1 text-white text-sm pl-1">{label}</label>
      {type === "text" ? (
        <textarea
          className="invalid:border-red-500 border-2 w-full border-slate-600 rounded-lg p-2 text-white bg-inherit text-left h-40"
          {...inputProperties}
          onChange={onChange}
        />
      ) : (
        <input
          className="invalid:border-red-500 border-2 w-full border-slate-600 rounded-lg p-2 text-white bg-inherit h-10"
          type={type}
          {...inputProperties}
          onChange={onChange}
        />
      )}
    </div>
  );
}

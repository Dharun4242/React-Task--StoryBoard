import React from "react";
import { useApp } from "../store/appStore";

const controls = [
  { key: "base", label: "Base" },
  { key: "apex", label: "Apex" },
  { key: "lateral", label: "Lateral Faces" },
  { key: "slant", label: "Slant Height" },
];

const Sidebar = () => {
  const { state, dispatch } = useApp();
  const { highlights } = state;

  const handleSelect = (part) => {
    dispatch({ type: "SET_ACTIVE_PART", payload: part });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold">Parts</h3>

      {controls.map((item) => (
        <button
          key={item.key}
          onClick={() => handleSelect(item.key)}
          className={`w-full text-left py-3 px-4 rounded-md font-medium transition ${
            highlights[item.key]
              ? "bg-sky-400 text-slate-900 shadow"
              : "bg-orange-400 text-slate-900/95"
          }`}
        >
          {item.label}
        </button>
      ))}

      <button
        onClick={handleReset}
        className="mt-4 py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded"
      >
        Reset
      </button>
    </div>
  );
};

export default Sidebar;

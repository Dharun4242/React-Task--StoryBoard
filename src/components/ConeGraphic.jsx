import React from "react";
import { useApp } from "../store/appStore";

const HIGHLIGHT = "#93c5fd";
const ORANGE_BODY = "#f97316";
const ORANGE_BASE = "#fb923c";
const ORANGE_DETAIL = "#ea580c";

const LabelWithArrow = ({ top, text }) => {
  return (
    <div className="absolute left-[320px] flex items-center" style={{ top }}>
      <div className="relative w-[200px] h-[2px] bg-blue-300">
        <div
          className="absolute right-0 -top-[4px] w-0 h-0"
          style={{
            borderLeft: "10px solid #93c5fd",
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
          }}
        />
      </div>
      <span className="ml-2 text-sm font-medium text-blue-300">{text}</span>
    </div>
  );
};

const ConeGraphic = () => {
  const { state, dispatch } = useApp();
  const { highlights } = state;

  const getActivePart = (map) => {
    for (const key in map) {
      if (map[key]) return key;
    }
    return null;
  };

  const active = getActivePart(highlights);

  const handleSetActive = (key) => {
    dispatch({ type: "SET_ACTIVE_PART", payload: key });
  };

  return (
    <div className="w-full max-w-[650px] mx-auto">
      <div className="relative w-full h-[350px]">
        <div className="absolute left-[80px] top-[40px] w-[230px] h-[240px] flex flex-col items-center">
          <div
            onClick={() => handleSetActive("lateral")}
            className="relative w-0 h-0 cursor-pointer"
            style={{
              borderLeft: "100px solid transparent",
              borderRight: "100px solid transparent",
              borderBottomWidth: "200px",
              borderBottomStyle: "solid",
              borderBottomColor: active === "lateral" ? HIGHLIGHT : ORANGE_BODY,
            }}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleSetActive("apex");
              }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 cursor-pointer"
            />

            {active === "apex" && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-orange-900"
                style={{ backgroundColor: HIGHLIGHT }}
              />
            )}
          </div>

          <div
            onClick={() => handleSetActive("base")}
            className="-mt-7 w-[200px] h-[50px] cursor-pointer relative"
            aria-label="Select base"
          >
            <div
              className="w-full h-full shadow-md border border-orange-900"
              style={{
                backgroundColor: active === "base" ? HIGHLIGHT : ORANGE_BASE,
                clipPath: "ellipse(50% 50% at 50% 50%)",
              }}
            />
          </div>
        </div>

        {active === "slant" && (
          <div
            className="absolute origin-top"
            style={{
              left: "200px",
              top: "40px",
              width: "5px",
              height: "200px",
              transform: "rotate(333deg)",
              backgroundColor: HIGHLIGHT,
            }}
            aria-label="Slant height"
          />
        )}

        {active === "base" && <LabelWithArrow top={220} text="Base" />}
        {active === "apex" && <LabelWithArrow top={25} text="Apex" />}
        {active === "lateral" && (
          <LabelWithArrow top={130} text="Lateral Faces" />
        )}
        {active === "slant" && <LabelWithArrow top={140} text="Slant Height" />}
      </div>
    </div>
  );
};

export default ConeGraphic;

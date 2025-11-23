import React, { createContext, useContext, useEffect, useReducer } from "react";

const STORAGE_KEY = "cone_state_v1";

const initialState = {
  highlights: {
    base: false,
    apex: false,
    lateral: false,
    slant: false,
  },
};

const AppContext = createContext(null);

function appReducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_PART": {
      const key = action.payload;

      return {
        ...state,
        highlights: {
          base: false,
          apex: false,
          lateral: false,
          slant: false,
          [key]: true,
        },
      };
    }

    case "RESET":
      return {
        ...state,
        highlights: {
          base: false,
          apex: false,
          lateral: false,
          slant: false,
        },
      };

    case "LOAD":
      return {
        ...state,
        ...(action.payload || {}),
      };

    default:
      return state;
  }
}

function loadInitialState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialState;
    const parsed = JSON.parse(stored);
    return parsed || initialState;
  } catch (err) {
    console.warn("Failed to load state from storage", err);
    return initialState;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(
    appReducer,
    initialState,
    loadInitialState
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn("Failed to save state to storage", err);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
}

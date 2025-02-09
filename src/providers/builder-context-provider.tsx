/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { Page, Section, Theme } from "@/types/theme";

export const loadComponents = async (componentsNames: string[]) => {
  const componentFiles = componentsNames || [];

  const components = await Promise.all(
    componentFiles.map(async (file) => {
      const mod = await import(
        `@/components/themes/minimal-theme/sections/${file}`
      );
      return {
        [file]: mod.default,
      };
    })
  );

  return Object.assign({}, ...components);
};

export type State = {
  selectedTheme: Theme | null;
  selectedPage: Page | null;
  selectedSection: Section | null;
  availableSections: string[];
  loadedComponents: Record<string, React.ComponentType<any>>;
};

type Action =
  | { type: "SELECT_THEME"; payload: Theme }
  | { type: "SELECT_PAGE"; payload: Page }
  | { type: "ADD_SECTION"; payload: Section }
  | {
      type: "UPDATE_SECTION";
      payload: { id: string; data: Record<string, any> };
    }
  | { type: "DELETE_SECTION"; payload: string }
  | { type: "SET_SELECTED_SECTION"; payload: Section | null }
  | { type: "REORDER_SECTIONS"; payload: Section[] }
  | { type: "UNDO" }
  | { type: "REDO" }
  | {
      type: "LOAD_COMPONENTS";
      payload: Record<string, React.ComponentType<any>>;
    };

type BuilderContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

const initialState: State = {
  selectedTheme: null,
  selectedPage: null,
  selectedSection: null,
  availableSections: [],
  loadedComponents: {},
};

function historyReducer(
  state: { past: State[]; present: State; future: State[] },
  action: Action
) {
  const { past, present, future } = state;

  switch (action.type) {
    case "UNDO": {
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, -1);
      return {
        past: newPast,
        present: { ...previous, selectedSection: null },
        future: [present, ...future],
      };
    }
    case "REDO": {
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: { ...next, selectedSection: null },
        future: newFuture,
      };
    }
    case "SET_SELECTED_SECTION": {
      const newPresent = builderReducer(present, action);
      return {
        past,
        present: newPresent,
        future,
      };
    }
    default: {
      const newPresent = builderReducer(present, action);
      if (present === newPresent) return state;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
  }
}

function builderReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SELECT_THEME": {
      const availableSections = action.payload.pages[0].sections;
      return {
        ...state,
        selectedTheme: action.payload,
        selectedPage: action.payload.pages[0],
        availableSections,
      };
    }

    case "SELECT_PAGE":
      return {
        ...state,
        selectedPage: action.payload,
        availableSections: action.payload.sections,
      };

    case "ADD_SECTION": {
      if (!state.selectedTheme || !state.selectedPage) return state;
      const updatedPages = state.selectedTheme.pages.map((page) =>
        page.name === state.selectedPage?.name
          ? { ...page, body: [...page.body, action.payload] }
          : page
      );

      return {
        ...state,
        selectedTheme: {
          ...state.selectedTheme,
          pages: updatedPages,
        },
        selectedPage:
          updatedPages.find((page) => page.name === state.selectedPage?.name) ||
          null,
      };
    }

    case "UPDATE_SECTION": {
      if (!state.selectedTheme || !state.selectedPage) return state;
      const updatedPages = state.selectedTheme.pages.map((page) =>
        page.name === state.selectedPage?.name
          ? {
              ...page,
              body: page.body.map((section) =>
                section.id === action.payload.id
                  ? { ...section, data: action.payload.data }
                  : section
              ),
            }
          : page
      );
      return {
        ...state,
        selectedTheme: {
          ...state.selectedTheme,
          pages: updatedPages,
        },
        selectedPage:
          updatedPages.find((page) => page.name === state.selectedPage?.name) ||
          null,
      };
    }

    case "DELETE_SECTION": {
      if (!state.selectedTheme || !state.selectedPage) return state;
      const updatedPages = state.selectedTheme.pages.map((page) =>
        page.name === state.selectedPage?.name
          ? {
              ...page,
              body: page.body.filter(
                (section) => section.id !== action.payload
              ),
            }
          : page
      );
      return {
        ...state,
        selectedTheme: {
          ...state.selectedTheme,
          pages: updatedPages,
        },
        selectedPage:
          updatedPages.find((page) => page.name === state.selectedPage?.name) ||
          null,
      };
    }

    case "REORDER_SECTIONS": {
      if (!state.selectedTheme || !state.selectedPage) return state;
      const updatedPages = state.selectedTheme.pages.map((page) =>
        page.name === state.selectedPage?.name
          ? { ...page, body: action.payload }
          : page
      );
      return {
        ...state,
        selectedTheme: {
          ...state.selectedTheme,
          pages: updatedPages,
        },
        selectedPage:
          updatedPages.find((page) => page.name === state.selectedPage?.name) ||
          null,
      };
    }

    case "SET_SELECTED_SECTION":
      return { ...state, selectedSection: action.payload };

    case "LOAD_COMPONENTS":
      return {
        ...state,
        loadedComponents: action.payload,
      };
    default:
      return state;
  }
}

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [history, dispatch] = useReducer(historyReducer, {
    past: [],
    present: initialState,
    future: [],
  });

  useEffect(() => {
    if (history.present.availableSections.length > 0) {
      (async () => {
        const components = await loadComponents(
          history.present.availableSections
        );
        dispatch({ type: "LOAD_COMPONENTS", payload: components });
      })();
    }
  }, [history.present.availableSections, dispatch]);

  const undoLimit = initialState.selectedPage?.body.length || 2;

  const canUndo = history.past.length >= undoLimit;
  const canRedo = history.future.length > 0;

  const undo = () => dispatch({ type: "UNDO" });
  const redo = () => dispatch({ type: "REDO" });

  return (
    <BuilderContext.Provider
      value={{
        state: history.present,
        dispatch,
        canUndo,
        canRedo,
        undo,
        redo,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context)
    throw new Error("useBuilder must be used within BuilderProvider");
  return context;
}

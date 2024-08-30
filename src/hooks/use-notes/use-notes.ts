import { StickyNotesType } from "@/App";
import { useReducer } from "react";
import { dummyData } from "./dummy-data";
// const generateState = () => {};

type NoteState = StickyNotesType[];

type AddNoteAction = {
  type: "ADD";
  payload: StickyNotesType;
};

type EditNoteAction = {
  type: "Edit";
  payload: {
    index: number; //slug
    note: StickyNotesType;
  };
};

type RemoveNoteAction = {
  type: "REMOVE";
  payload: number;
};

type DropNoteAction = {
  type: "DROP";
  payload: { draggedSlug: number; droppedSlug: number };
};

type Action =
  | AddNoteAction
  | EditNoteAction
  | RemoveNoteAction
  | DropNoteAction;

const reducer = function (pervState: NoteState, action: Action) {
  switch (action.type) {
    case "ADD": {
      return [...pervState, action.payload];
    }
    case "REMOVE": {
      const newState = [...pervState];
      newState.splice(action.payload, 1);
      return newState;
    }
    case "Edit": {
      const newState = [...pervState];
      newState[action.payload.index] = action.payload.note;
      return newState;
    }
    case "DROP": {
      const newState = [...pervState];
      const droppedNote = newState[action.payload.droppedSlug];
      newState[action.payload.droppedSlug] =
        newState[action.payload.draggedSlug];
      newState[action.payload.draggedSlug] = droppedNote;
      return newState;
    }
    default: {
      return pervState;
    }
  }
};

export default function useNotes() {
  const [notes, dispatch] = useReducer(reducer, [...dummyData]);

  const addNote = (note: StickyNotesType) => {
    dispatch({
      type: "ADD",
      payload: note,
    });
  };

  const removeNote = (slug: number) => {
    dispatch({
      type: "REMOVE",
      payload: slug,
    });
  };

  const editNote = (slug: number, note: StickyNotesType) => {
    dispatch({
      type: "Edit",
      payload: {
        index: slug,
        note,
      },
    });
  };

  const onDropNote = (draggedSlug: number, droppedSlug: number) => {
    dispatch({
      type: "DROP",
      payload: {
        draggedSlug,
        droppedSlug,
      },
    });
  };
  return {
    notes,
    addNote,
    removeNote,
    editNote,
    onDropNote,
  };
}

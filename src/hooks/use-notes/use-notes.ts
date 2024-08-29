import { StickyNotesType } from "@/App";
import { useReducer } from "react";

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

type Action = AddNoteAction | EditNoteAction | RemoveNoteAction

const reducer = function (pervState : NoteState, action : Action) {
  switch (action.type) {
    case "ADD": {
        return [...pervState, action.payload]
    }
    case 'REMOVE': {
        return pervState.splice(action.payload, 1);
    }
    case "Edit": {
        const newState = [...pervState];
        newState[action.payload.index] = action.payload.note ;
        return newState
    }
    default : {
        return pervState;
    }
  }
};

export default function useNotes() {
    const [notes, dispatch] = useReducer(reducer, []);

    const addNote = (note: StickyNotesType) => {
        dispatch({
            type: 'ADD',
            payload: note
        })
    };

    const removeNote = (slug: number) => {
        dispatch({
            type: 'REMOVE',
            payload: slug
        })
    }

    const editNote = (slug: number, note: StickyNotesType) => {
        dispatch({
            type: 'Edit',
            payload: {
                index: slug,
                note
            }
        })
    }
    return {
        notes, 
        addNote,
        removeNote,
        editNote
    }
}

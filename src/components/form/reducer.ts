import { StickyNotesType } from "@/App";

type FormState = StickyNotesType;

function generateState(stickyNote: StickyNotesType | null): FormState {
  return {
    title: stickyNote?.title ?? "",
    description: stickyNote?.description ?? "",
    creationDate: stickyNote?.creationDate ?? "",
    deadline: stickyNote?.deadline ?? "",
  };
}

type TitleAndDescriptionActionType = {
  type: "TITLE" | "DESCRIPTION";
  payload: string;
};

type DateActionType = {
  type: "CREATION_DATE" | "DEADLINE";
  payload: string;
};

type ResetAction = {
    type: 'RESET'
}

type Action = TitleAndDescriptionActionType | DateActionType | ResetAction;

const reducer = (state: FormState, action: Action) => {
  switch (action.type) {
    case "TITLE": {
      return { ...state, title: action.payload };
    }
    case "DESCRIPTION": {
      return { ...state, description: action.payload };
    }
    case "CREATION_DATE": {
      return { ...state, creationDate: action.payload };
    }
    case "DEADLINE": {
      return { ...state, deadline: action.payload };
    }
    case "RESET": {
      return generateState(null);
    }
  }
  return state;
};

export default reducer;
export { generateState };

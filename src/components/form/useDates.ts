import { StickyNotesType } from "@/App";
import { type FormEvent, useReducer, useEffect, useRef } from "react";
import { validation, dateHelper } from "@/utils";

type FormState = {
  creationDate: Date | null;
  deadline: Date | null;
  isCreationDateTouched: boolean;
  isDeadlineTouched: boolean;
  isCreationDateValid: boolean;
  isDeadlineValid: boolean;
  creationInputErrors: string[];
  deadlineInputErrors: string[];
};

const generateState = (stickyNotesType: StickyNotesType | null) => ({
  creationDate: stickyNotesType ? stickyNotesType.creationDate : null,
  deadline: stickyNotesType ? stickyNotesType.deadline : null,
  isCreationDateValid: false,
  isCreationDateTouched: false,
  isDeadlineTouched: false,
  isDeadlineValid: false,
  creationInputErrors: [],
  deadlineInputErrors: [],
});

type ChangeDateActionType = {
  type: "CHANGE_CREATION_DATE" | "CHANGE_DEADLINE";
  payload: Date | null;
};

type SetErrorActions = {
  type: "SET_CREATION_INPUT_ERRORS" | "SET_DEADLINE_INPUT_ERRORS";
  payload: string[];
};

type ValidateDateActionType = {
  type: "VALIDATE_CREATION_DATE" | "VALIDATE_DEADLINE";
  payload: boolean;
};

type ResetOrTouchAction = {
  type: "RESET" | "TOUCH_CREATION_DATE" | "TOUCH_DEADLINE";
};

type Action =
  | ChangeDateActionType
  | ResetOrTouchAction
  | ValidateDateActionType
  | SetErrorActions;

const reducer = (pervState: FormState, action: Action): FormState => {
  switch (action.type) {
    case "CHANGE_CREATION_DATE": {
      return {
        ...pervState,
        creationDate: action.payload,
      };
    }
    case "CHANGE_DEADLINE": {
      return {
        ...pervState,
        deadline: action.payload,
      };
    }
    case "VALIDATE_CREATION_DATE": {
      return { ...pervState, isCreationDateValid: action.payload };
    }
    case "VALIDATE_DEADLINE": {
      return { ...pervState, isDeadlineValid: action.payload };
    }
    case "TOUCH_CREATION_DATE": {
      return { ...pervState, isCreationDateTouched: true };
    }
    case "TOUCH_DEADLINE": {
      return { ...pervState, isDeadlineTouched: true };
    }
    case "SET_CREATION_INPUT_ERRORS": {
      return { ...pervState, creationInputErrors: action.payload };
    }
    case "SET_DEADLINE_INPUT_ERRORS": {
      return { ...pervState, deadlineInputErrors: action.payload };
    }
    case "RESET": {
      return generateState(null);
    }
  }
  return pervState;
};

function useDates(selectedStickyNote: StickyNotesType | null) {
  const [formState, dispatch] = useReducer(
    reducer,
    selectedStickyNote,
    generateState
  );

  const {
    creationDate,
    deadline,
    isCreationDateTouched,
    isDeadlineTouched,
    isDeadlineValid,
    isCreationDateValid,
    creationInputErrors,
    deadlineInputErrors,
  } = formState;

  const isFirstCreationInputUpdate = useRef(true);
  const hasCreationInputReset = useRef(false);
  const isFirstDeadlineInputUpdate = useRef(true);
  const hasDeadlineInputReset = useRef(false);

  const creationDateChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE_CREATION_DATE",
      payload: dateHelper.getDateFromInput(event.currentTarget.value),
    });
  };

  const deadlineChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE_DEADLINE",
      payload: event.currentTarget.valueAsDate,
    });
  };

  const minDeadlineValue = creationDate;

  useEffect(() => {
    if (hasCreationInputReset.current) {
      return;
    }

    const creationInputErrors: string[] = [];
    validation.isCreationDateValid(creationDate, creationInputErrors);
    if (creationInputErrors.length !== 0 && isCreationDateValid) {
      dispatch({
        type: "VALIDATE_CREATION_DATE",
        payload: false,
      });
    } else if (creationInputErrors.length === 0 && !isCreationDateValid) {
      dispatch({
        type: "VALIDATE_CREATION_DATE",
        payload: true,
      });
    }
    dispatch({
      type: "SET_CREATION_INPUT_ERRORS",
      payload: creationInputErrors,
    });

    const deadlineInputErrors: string[] = [];
    validation.isValidDeadline(creationDate, deadline, deadlineInputErrors);

    if (deadlineInputErrors.length !== 0 && isDeadlineValid) {
      dispatch({
        type: "VALIDATE_DEADLINE",
        payload: false,
      });
    } else if (deadlineInputErrors.length === 0 && !isDeadlineValid) {
      dispatch({
        type: "VALIDATE_DEADLINE",
        payload: true,
      });
    }

    dispatch({
      type: "SET_DEADLINE_INPUT_ERRORS",
      payload: deadlineInputErrors,
    });

    // validation.isValidDeadline()
  }, [creationDate]);

  useEffect(() => {
    if (hasCreationInputReset.current) {
      hasCreationInputReset.current = false;
      return;
    }

    if (isFirstCreationInputUpdate.current) {
      isFirstCreationInputUpdate.current = false;
      return;
    }

    if (!isCreationDateTouched) {
      dispatch({
        type: "TOUCH_CREATION_DATE",
      });
    }
  }, [creationDate]);

  useEffect(() => {
    const deadlineInputErrors: string[] = [];

    validation.isValidDeadline(creationDate, deadline, deadlineInputErrors);

    if (deadlineInputErrors.length !== 0 && isDeadlineValid) {
      dispatch({
        type: "VALIDATE_DEADLINE",
        payload: false,
      });
    } else if (deadlineInputErrors.length === 0 && !isDeadlineValid) {
      dispatch({
        type: "VALIDATE_DEADLINE",
        payload: true,
      });
    }

    dispatch({
      type: "SET_DEADLINE_INPUT_ERRORS",
      payload: deadlineInputErrors,
    });
  }, [deadline]);

  useEffect(() => {
    if (hasDeadlineInputReset.current) {
      hasDeadlineInputReset.current = false;
      return;
    }
    if (isFirstDeadlineInputUpdate.current) {
      isFirstDeadlineInputUpdate.current = false;
      return;
    }

    if (!isDeadlineTouched) {
      dispatch({
        type: "TOUCH_DEADLINE",
      });
    }
  }, [deadline]);

  const setDatesTouched = () => {
    dispatch({ type: "TOUCH_CREATION_DATE" });
    dispatch({ type: "TOUCH_DEADLINE" });
  };

  const reset = () => {
    dispatch({
      type: "RESET",
    });
  };

  return {
    creationDate,
    isCreationDateTouched,
    isCreationDateValid,
    creationInputErrors,
    creationDateChangeHandler,
    deadline,
    isDeadlineTouched,
    isDeadlineValid,
    deadlineInputErrors,
    minDeadlineValue,
    deadlineChangeHandler,
    setDatesTouched,
    reset,
  };
}

export default useDates;

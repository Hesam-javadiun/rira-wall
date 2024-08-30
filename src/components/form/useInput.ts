import { dateHelper } from "@/utils";
import { useEffect, useReducer, useRef, type FormEvent } from "react";

type DateInputValue = Date | null;
type InputValue = string | DateInputValue;

type OnChangeActionType = {
  type: "ONCHANGE";
  payload: InputValue;
};

type ResetOrTouchActionType = {
  type: "TOUCHED";
};

type ErrorsActions = {
  type: "ERROR";
  payload: string[];
};

type ActionTypes = ResetOrTouchActionType | OnChangeActionType | ErrorsActions;

type InputState = {
  value: InputValue;
  errors: string[];
  isTouched: boolean;
};

const generateState = function (initialValue: InputValue): InputState {
  return {
    value: initialValue,
    errors: [],
    isTouched: false,
  };
};

const reducer = function (pervState: InputState, action: ActionTypes) {
  switch (action.type) {
    case "ONCHANGE": {
      return { ...pervState, value: action.payload };
    }
    case "TOUCHED": {
      return { ...pervState, isTouched: true };
    }
    case "ERROR": {
      return {
        ...pervState,
        errors: action.payload,
      };
    }
  }
  return pervState;
};

type UseInput<T extends InputValue> = {
  initialValue: T;
  validationAction: (value: T, errors: string[]) => void;
  type: "text" | "date";
  dependencies?: InputValue[];
};

function useInput<T extends InputValue>({
  validationAction,
  initialValue,
  type,
  dependencies = [],
}: UseInput<T>) {
  const [inputState, dispatch] = useReducer(
    reducer,
    initialValue,
    generateState
  );

  const isFirstUpdate = useRef(true);

  const { value, errors, isTouched } = inputState;
  const inputValue = value as T;

  useEffect(() => {
    const id = setTimeout(() => {
      const errors: string[] = [];

      validationAction(value as T, errors);

      dispatch({
        type: "ERROR",
        payload: errors,
      });
    }, 500);

    return () => {
      clearTimeout(id);
    };
  }, [value?.toString(), dependencies.toString()]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (isFirstUpdate.current) {
        isFirstUpdate.current = false;
        return;
      }

      if (!isTouched) {
        dispatch({
          type: "TOUCHED",
        });
      }
    }, 500);

    return () => {
      clearTimeout(id);
    };
  }, [value?.toString()]);

  let onChangeHandler;
  if (type === "text") {
    onChangeHandler = (event: FormEvent<HTMLInputElement>) => {
      dispatch({
        type: "ONCHANGE",
        payload: event.currentTarget.value,
      });
    };
  } else {
    onChangeHandler = (event: FormEvent<HTMLInputElement>) => {
      dispatch({
        type: "ONCHANGE",
        payload: dateHelper.getDateFromInput(event.currentTarget.value),
      });
    };
  }

  const touch = () => {
    dispatch({
      type: "TOUCHED",
    });
  };

  const isValid = errors.length === 0;
  return {
    value: inputValue,
    errors,
    isTouched,
    isValid,
    onChangeHandler,
    touch,
  };
}

export default useInput;

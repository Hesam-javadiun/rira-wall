import { useEffect, useReducer, useRef } from "react";
import { type FormEvent } from "react";

type OnChangeActionType = {
  type: "ONCHANGE";
  payload: string;
};

type ResetOrTouchActionType = {
  type: "RESET" | "TOUCHED";
};

type ChangeValidityAction = {
  type: "VALIDITY";
  payload: boolean;
};

type ErrorsActions = {
  type: "ERROR";
  payload: string[];
};

type ActionTypes =
  | ChangeValidityAction
  | ResetOrTouchActionType
  | OnChangeActionType
  | ErrorsActions;

type InputState = {
  value: string;
  isValid: boolean;
  errors: string[];
  isTouched: boolean;
};
const initialState = {
  value: "",
  isValid: false,
  errors: [],
  isTouched: false,
};

const reducer = (pervState: InputState, action: ActionTypes) => {
  switch (action.type) {
    case "ONCHANGE": {
      return { ...pervState, value: action.payload };
    }
    case "VALIDITY": {
      return { ...pervState, isValid: action.payload };
    }
    case "TOUCHED": {
      return { ...pervState, isTouched: true };
    }
    case "RESET": {
      return { ...initialState };
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

type UseInput = {
  validationAction: (value: string, errors: string[]) => void;
};

function useInput({ validationAction }: UseInput) {
  const [inputState, dispatch] = useReducer(reducer, initialState);
  const isFirstUpdate = useRef(true);
  const hasBeenReset = useRef(false);
  const { value, isValid, errors, isTouched } = inputState;

  useEffect(() => {
    const errors: string[] = [];
    const id = setTimeout(() => {
      if (hasBeenReset.current) {
        hasBeenReset.current = false;
        return;
      }

      validationAction(value, errors);
      if (errors.length !== 0 && isValid) {
        dispatch({
          type: "VALIDITY",
          payload: false,
        });
      } else if (!isValid && errors.length === 0) {
        dispatch({
          type: "VALIDITY",
          payload: true,
        });
      }
      dispatch({
        type: "ERROR",
        payload: errors,
      });

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
  }, [value]);

  const onChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    dispatch({
      type: "ONCHANGE",
      payload: event.currentTarget.value,
    });
  };

  const reset = () => {
    dispatch({
      type: "RESET",
    });
  };

  const touch = () => {
    isFirstUpdate.current = true;
    hasBeenReset.current = true;
    dispatch({
      type: "TOUCHED",
    });
  };

  return {
    value,
    errors,
    isTouched,
    isValid,
    reset,
    onChangeHandler,
    touch,
  };
}

export default useInput;

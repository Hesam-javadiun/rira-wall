import { StickyNotesType } from "@/App";
// import { useReducer } from "react";
// import { type FormEvent } from "react";
import { validation } from "@/utils";
// import reducer, { generateState } from "./reducer";
import useInput from "./useInput";

function useWallForm(selectedStickyNote: StickyNotesType | null) {
  // const [formState, dispatch] = useReducer(
  //   reducer,
  //   selectedStickyNote,
  //   generateState
  // );

  // const {

  //   // creationDate,
  //   // deadline,
  // } = formState;

  const titleInput = useInput({
    validationAction: validation.isValidTitle.bind(validation),
  });

  const descriptionInput = useInput({
    validationAction: validation.isValidDescription.bind(validation),
  });

  const formDataIsValid = titleInput.isValid && descriptionInput.isValid;

  const setInputsTouched = () => {
    titleInput.touch();
    descriptionInput.touch();
  };

  const resetForm = () => {
    titleInput.reset();
    descriptionInput.reset();
  };

  return {
    description: descriptionInput.value,
    descriptionErrorMsges: descriptionInput.errors,
    descriptionIsTouched: descriptionInput.isTouched,
    descriptionChangeHandler: descriptionInput.onChangeHandler,
    title: titleInput.value,
    titleErrorMsges: titleInput.errors,
    titleIsTouched: titleInput.isTouched,
    titleChangeHandler: titleInput.onChangeHandler,
    formDataIsValid,
    setInputsTouched,
    resetForm,
  };
}

export default useWallForm;

import { StickyNotesType } from "@/App";
import { validation } from "@/utils";
import useInput from "./useInput";
import { useCallback } from "react";

function useWallForm(selectedStickyNote: StickyNotesType | null) {
  const titleInput = useInput({
    type: "text",
    initialValue: selectedStickyNote?.title ?? "",
    validationAction: validation.isValidTitle.bind(validation),
  });

  const descriptionInput = useInput({
    type: "text",
    initialValue: selectedStickyNote?.description ?? "",
    validationAction: validation.isValidDescription.bind(validation),
  });

  const creationDateInput = useInput({
    type: "date",
    initialValue: selectedStickyNote?.creationDate ?? null,
    validationAction: validation.isCreationDateValid.bind(validation),
  });

  const deadlineValidation = useCallback(
    validation.isValidDeadline
      .bind(validation)
      .bind(null, creationDateInput.value),
    [creationDateInput.value]
  );

  const deadlineInput = useInput({
    type: "date",
    initialValue: selectedStickyNote?.deadline ?? null,
    validationAction: deadlineValidation,
    dependencies: [creationDateInput.value],
  });

  const formDataIsValid =
    titleInput.isValid &&
    descriptionInput.isValid &&
    creationDateInput.isValid &&
    deadlineInput.isValid;

  const setInputsTouched = () => {
    titleInput.touch();
    descriptionInput.touch();
    creationDateInput.touch();
    deadlineInput.touch();
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
    creationDate: creationDateInput.value,
    isCreationDateTouched: creationDateInput.isTouched,
    creationInputErrors: creationDateInput.errors,
    creationDateChangeHandler: creationDateInput.onChangeHandler,
    deadline: deadlineInput.value,
    isDeadlineTouched: deadlineInput.isTouched,
    deadlineInputErrors: deadlineInput.errors,
    deadlineChangeHandler: deadlineInput.onChangeHandler,
    minDeadlineValue: creationDateInput.value,
    formDataIsValid,
    setInputsTouched,
  };
}

export default useWallForm;

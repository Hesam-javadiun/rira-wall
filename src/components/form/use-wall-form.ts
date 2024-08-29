import { StickyNotesType } from "@/App";
import { validation } from "@/utils";
import useDates from "./useDates";
import useInput from "./useInput";

//TODO need to refactored 
  // add useDates hook functionality to useInput
  // pull out side effects common code
  // pull our first render and last render side effect to into seperate useEffect
    
function useWallForm(selectedStickyNote: StickyNotesType | null) {
  const {
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
    reset: resetDates,
  } = useDates(selectedStickyNote);

  const titleInput = useInput({
    validationAction: validation.isValidTitle.bind(validation),
  });

  const descriptionInput = useInput({
    validationAction: validation.isValidDescription.bind(validation),
  });

  const formDataIsValid =
    titleInput.isValid &&
    descriptionInput.isValid &&
    isCreationDateValid &&
    isDeadlineValid;

  const setInputsTouched = () => {
    titleInput.touch();
    descriptionInput.touch();
    setDatesTouched();
  };

  const resetForm = () => {
    titleInput.reset();
    descriptionInput.reset();
    resetDates();
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
    creationDate,
    isCreationDateTouched,
    creationInputErrors,
    creationDateChangeHandler,
    deadline,
    isDeadlineTouched,
    deadlineInputErrors,
    minDeadlineValue,
    deadlineChangeHandler,
    formDataIsValid,
    setInputsTouched,
    resetForm,
  };
}

export default useWallForm;

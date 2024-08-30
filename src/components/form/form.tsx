import { type ComponentPropsWithoutRef, type FormEvent } from "react";
import { StickyNotesType } from "@/App";
import Button from "../button";
import Input from "@/components/input";
import useSubmit from "./use-submit";
import useWallForm from "./use-wall-form";
import classes from "./form.module.css";
import { dateHelper } from "@/utils";

type FormProps = ComponentPropsWithoutRef<"form"> & {
  addNote: (note: StickyNotesType) => void;
  editNote: (slug: number, note: StickyNotesType) => void;
  onClose: () => void;
  listOfNotes: StickyNotesType[];
};

const Form = function (props: FormProps) {
  const { addNote, editNote, onClose, listOfNotes, ...formProps } = props;
  
  const { selectedStickyNote, onSubmit } = useSubmit(
    listOfNotes,
    addNote,
    editNote
  );

  const {
    description,
    descriptionErrorMsges,
    descriptionIsTouched,
    descriptionChangeHandler,
    title,
    titleErrorMsges,
    titleIsTouched,
    titleChangeHandler,
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
  } = useWallForm(selectedStickyNote);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formDataIsValid) {
      if (
        !descriptionIsTouched ||
        !titleIsTouched ||
        !isDeadlineTouched ||
        !isCreationDateTouched
      ) {
        setInputsTouched();
      }
      return;
    }

    if (!(creationDate !== null && deadline !== null)) {
      throw Error("creationDate or deadline is null");
    }

    onSubmit({ title, description, creationDate, deadline });
    console.log("form submitted with data => ", {
      title,
      description,
      creationDate,
      deadline,
    });
    onClose();
    resetForm();
  };

  const cancelHandler = () => {
    resetForm();
    onClose();
  };

  return (
    <form {...formProps} onSubmit={submitHandler} className={classes.form}>
      <Input
        id={"title"}
        label={"Title"}
        value={title}
        // required
        errors={titleErrorMsges}
        onChange={titleChangeHandler}
        className={classes.input}
        isTouched={titleIsTouched}
      ></Input>
      <Input
        id={"description"}
        type={"text"}
        // required
        label={"Description"}
        value={description}
        errors={descriptionErrorMsges}
        onChange={descriptionChangeHandler}
        className={classes.input}
        isTouched={descriptionIsTouched}
      ></Input>
      <div className={classes.dateContainer}>
        <Input
          id={"creation_date"}
          type={"date"}
          // required
          label={"Date of registration"}
          value={dateHelper.convertDateToInputValue(creationDate)}
          errors={creationInputErrors}
          onChange={creationDateChangeHandler}
          className={classes.input}
          isTouched={isCreationDateTouched}
        ></Input>
        <Input
          id={"deadline"}
          type={"date"}
          // required
          label={"Deadline Date"}
          value={dateHelper.convertDateToInputValue(deadline)}
          errors={deadlineInputErrors}
          onChange={deadlineChangeHandler}
          className={classes.input}
          isTouched={isDeadlineTouched}
          min={dateHelper.convertDateToInputValue(minDeadlineValue)}
        ></Input>
      </div>
      <Button type="submit" className={classes.submitBtn}>
        Submit
      </Button>
      <Button className={classes.submitBtn} onClick={cancelHandler}>
        Cancel
      </Button>
    </form>
  );
};

export default Form;

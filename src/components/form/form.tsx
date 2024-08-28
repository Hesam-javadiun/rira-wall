import { type ComponentPropsWithoutRef, type FormEvent } from "react";
import { StickyNotesType } from "@/App";
import Button from "../button";
import Input from "@/components/input";
import useSelectedNote from "./use-selected-note";
import useWallForm from "./use-wall-form";
import classes from './form.module.css';

type FormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (data: StickyNotesType) => void;
  onClose:() => void; 
  listOfNotes: StickyNotesType[];
};

const Form = function (props: FormProps) {
  const { onSave, onClose, listOfNotes, ...formProps } = props;
  const { selectedStickyNote } = useSelectedNote(listOfNotes);

  const {
    description,
    descriptionErrorMsges,
    descriptionIsTouched,
    descriptionChangeHandler,
    title,
    titleErrorMsges,
    titleIsTouched,
    titleChangeHandler,
    formDataIsValid,
    setInputsTouched,
    resetForm,
  } = useWallForm(selectedStickyNote);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const data = Object.fromEntries(formData);
    console.log('=> ', !formDataIsValid, !descriptionIsTouched , !titleIsTouched);
    if(!formDataIsValid ){
      if(!descriptionIsTouched || !titleIsTouched ){
        setInputsTouched()
      }
      return
    }
    console.log('submit fired with ', title, description);
    // onSave({title, description, });
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
        type={'text'}
        // required
        label={"Description"}
        value={description}
        errors={descriptionErrorMsges}
        onChange={descriptionChangeHandler}
        className={classes.input}
        isTouched={descriptionIsTouched}
      ></Input>
      {/* <Input id={"creationDate"} label={"CreationDate"}></Input>
      <Input id={"deadline"} label={"Deadline"}></Input> */}
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

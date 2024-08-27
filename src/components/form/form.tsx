import {
  type ReactNode,
  type ComponentPropsWithoutRef,
  type FormEvent,
  useState,
  useReducer,
  useMemo,
} from "react";
import { StickyNotesType } from "@/App";
import Button from "../button";
import { searchParamsUtils } from "@/utils";

type FormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (data: StickyNotesType) => void;
  listOfNotes: StickyNotesType[];
};

type FormState = StickyNotesType & {
  isValidTitle: boolean;
  isValidDescription: boolean;
  isCreationValid: boolean;
  isValidDeadline: boolean;
};
function generateState(stickyNote: StickyNotesType | null) {
  return {
    title: stickyNote?.title ?? "",
    description: stickyNote?.description ?? "",
    creationDate: stickyNote?.creationDate ?? "",
    deadline: stickyNote?.deadline ?? "",
    isValidTitle: true,
    isValidDescription: true,
    isCreationValid: true,
    isValidDeadline: true,
  };
}
const initialState: FormState = {
  isValidTitle: true,
  isValidDescription: true,
  isCreationValid: true,
  isValidDeadline: true,
};

type TitleAndDescriptionActionType = {
  type: "TITLE" | "DESCRIPTION";
  payload: string;
};

type DateActionType = {
  type: "CREATION_DATE" | "DEADLINE";
  payload: string;
};

const reducer = (state, action) => {};

const Form = function (props: FormProps) {
  const { onSave, listOfNotes, ...formProps } = props;
  const [disable, setDisable] = useState(false);

  const slug = searchParamsUtils.getSlugFromSearchParam();

  const selectedStickyNote = useMemo<StickyNotesType | null>(() => {
    return listOfNotes.find((_, index) => index === slug) ?? null
  }, [slug]);

  const [formState, dispatch] = useReducer(
    reducer,
    selectedStickyNote,
    generateState
  );

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    onSave(data);
  };

  return (
    <form {...formProps} onSubmit={submitHandler}>
      <Button type="submit" disabled={disable}>
        Submit
      </Button>
    </form>
  );
};

export default Form;

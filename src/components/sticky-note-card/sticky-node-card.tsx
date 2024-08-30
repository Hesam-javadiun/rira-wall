import classes from "./sticky-node-card.module.css";
import { type StickyNotesType } from "@/App";
import Button from "@/components/button";
import { CrossIcon, EditIcon } from "../icons";
import { dateHelper } from "@/utils";
import { type ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

type StickyNoteCardPropType = {
  removeHandler: () => void;
  editHandler: () => void;
  note: StickyNotesType;
} & ComponentPropsWithoutRef<"section">;

const StickyNoteCard = forwardRef<HTMLElement, StickyNoteCardPropType>(
  function ({ removeHandler, editHandler, note, ...containerProps }, ref) {
    const onClickRemoveHandler = () => {
      removeHandler();
    };

    const onClickEditHandler = () => {
      editHandler();
    };
    const className = `${classes.cardContainer} ${
      containerProps.className ?? ""
    }`;
    return (
      <section ref={ref} {...containerProps} className={className}>
        <header className={classes.header}>
          <h3>{note.title}</h3>
          <div>
            <Button onClick={onClickEditHandler} className={classes.btn}>
              <EditIcon />
            </Button>
            <Button onClick={onClickRemoveHandler} className={classes.btn}>
              <CrossIcon />
            </Button>
          </div>
        </header>
        <h6>Description:</h6>
        <article className={classes.descriptionContainer}>
          <p>{note.description}</p>
        </article>
        <article className={classes.dateContainer}>
          <div className={classes.coloredBox}>
            <h6>Registered in:</h6>
            <time
              dateTime={dateHelper.convertDateToInputValue(note.creationDate)}
            >
              {dateHelper.customizeDateStringForShowing(note.creationDate)}
            </time>
          </div>
          <div className={classes.coloredBox}>
            <h6>Deadline:</h6>
            <time dateTime={dateHelper.convertDateToInputValue(note.deadline)}>
              {dateHelper.customizeDateStringForShowing(note.deadline)}
            </time>
          </div>
        </article>
      </section>
    );
  }
);

export default StickyNoteCard;

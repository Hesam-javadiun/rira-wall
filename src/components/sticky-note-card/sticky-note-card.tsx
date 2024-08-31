import classes from "./sticky-note-card.module.css";
import { type StickyNotesType } from "@/App";
import Button from "@/components/button";
import { CrossIcon, EditIcon } from "../icons";
import { dateHelper } from "@/utils";
import { type ComponentPropsWithoutRef } from "react";
import Container from "@/components/container";
import useAddRedHighlightToUpcomingDeadline from "./use-add-red-highlight-to-upcoming-deadline";
import { DeadlineStatus } from "@/utils";

type StickyNoteCardPropType = {
  removeHandler: () => void;
  editHandler: () => void;
  note: StickyNotesType;
} & ComponentPropsWithoutRef<"section">;

const StickyNoteCard = function ({
  removeHandler,
  editHandler,
  note,
  ...containerProps
}: StickyNoteCardPropType) {
  const { deadlineStatus } = useAddRedHighlightToUpcomingDeadline(
    note.deadline
  );

  const onClickRemoveHandler = () => {
    removeHandler();
  };

  const onClickEditHandler = () => {
    editHandler();
  };

  let cardColorClass;
  switch (deadlineStatus) {
    case DeadlineStatus.IS_NEAR: {
      cardColorClass = classes.red;
      break;
    }
    case DeadlineStatus.IS_NOT_NEAR: {
      cardColorClass = classes.green;
      break;
    }
    case DeadlineStatus.IS_PASSED: {
      cardColorClass = classes.gray;
      break;
    }
    default: {
      cardColorClass = "";
    }
  }
  const containerClassName = `${classes.cardContainer} ${cardColorClass} ${
    containerProps.className ?? ""
  }`;

  return (
    <Container tag="section" {...containerProps} className={containerClassName}>
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
    </Container>
  );
};

export default StickyNoteCard;

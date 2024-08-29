import Container from "@/components/container";
import classes from "./sticky-node-card.module.css";
import { type StickyNotesType } from "@/App";
import Button from "@/components/button";
import { CrossIcon, EditIcon } from "../icons";
import { dateHelper } from "@/utils";
type StickyNoteCardPropType = StickyNotesType & {
  removeHandler: (slug: number) => void;
  slug: number;
  editHandler: (slug: number, note: StickyNotesType) => void;
};

const StickyNoteCard = function ({
  removeHandler,
  slug,
  editHandler,
  ...note
}: StickyNoteCardPropType) {
  const onClickRemoveHandler = () => {
    removeHandler(slug);
  };

  const onClickEditHandler = () => {
    editHandler(slug, note);
  };

  return (
    <Container tag="section" className={classes.cardContainer}>
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

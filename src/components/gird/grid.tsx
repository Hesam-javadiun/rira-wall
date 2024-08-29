import Container from "@/components/container";
import classes from "./grid.module.css";
import StickyNoteCard from "../sticky-note-card/sticky-node-card";
import { StickyNotesType } from "@/App";
const Grid = function () {
  return (
    <Container tag="ul" className={classes.girdContainer}>
      <li className={classes.gridItem}>
        <StickyNoteCard
          creationDate={new Date()}
          deadline={new Date()}
          title={"Test title"}
          description="test description "
          slug={2}
          removeHandler={(slug: number) => {
            console.log(slug);
          }}
          editHandler={(slug: number, note: StickyNotesType) => {
            console.log(slug, note);
          }}
        />
      </li>
      <li className={classes.gridItem}></li>
      <li className={classes.gridItem}></li>
      <li className={classes.gridItem}></li>
      <li className={classes.gridItem}></li>
      <li className={classes.gridItem}></li>
      <li className={classes.gridItem}></li>
      <li className={classes.gridItem}></li>
      <li className={classes.gridItem}></li>
      <li className={classes.gridItem}></li>
      <li className={classes.gridItem}></li>
      <li className={classes.gridItem}></li>
    </Container>
  );
};

export default Grid;

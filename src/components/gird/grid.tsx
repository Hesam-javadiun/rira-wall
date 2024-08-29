import Container from "@/components/container";
import classes from "./grid.module.css";

const Grid = function () {
  return (
    <Container tag="ul" className={classes.girdContainer}>
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
      <li className={classes.gridItem}></li>
    </Container>
  );
};

export default Grid;

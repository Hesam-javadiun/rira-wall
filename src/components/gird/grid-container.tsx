import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import Container from "../container/container";
import classes from "./grid-container.module.css";

type GridContainerProps<T extends ElementType> = {
  tag?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const GridContainer = function <tagType extends ElementType>(
  props: GridContainerProps<tagType>
) {
  const { tag, children, className, containerProps } = props;
  
  return (
    <Container
      tag={tag ?? "ul"}
      {...containerProps}
      className={`${classes.gridContainer} ${className ?? ""}`}
    >
      {children}
    </Container>
  );
};

export default GridContainer;

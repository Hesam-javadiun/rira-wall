import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import Container from "../container/container";
import classes from "./grid-item.module.css";

type GridItemProps<T extends ElementType> = {
  tag?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

const GridItem = function <tagType extends ElementType>(
  props: GridItemProps<tagType>
) {
  const { tag, children, className, containerProps } = props;

  return (
    <Container
      tag={tag ?? "li"}
      {...containerProps}
      className={`${classes.gridItem} ${className ?? ""}`}
    >
      {children}
    </Container>
  );
};

export default GridItem;

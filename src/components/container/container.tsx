import { type ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  tag?: T;
};

const Container = function <T extends ElementType>({
  tag,
  ...restOfProps
}: ContainerProps<T>) {
  const Component = tag || "div";
  return <Component {...restOfProps}></Component>;
};

export default Container;

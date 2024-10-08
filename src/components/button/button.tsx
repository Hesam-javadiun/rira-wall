import { type ComponentPropsWithoutRef } from "react";
import classes from "./button.module.css";

type AnchorElementProps = ComponentPropsWithoutRef<"a"> & {
  href?: string;
};

type ButtonElementProps = ComponentPropsWithoutRef<"button"> & {
  href?: never;
};

type ButtonProps = AnchorElementProps | ButtonElementProps;

function isAnchor(props: ButtonProps): props is AnchorElementProps {
  return "href" in props;
}
const Button = function (props: ButtonProps) {
  const className = props.className ?? classes.color
  if (isAnchor(props)) {
    return <a {...props} className={`${classes.button} ${className}`}></a>;
  }

  return <button {...props} className={`${classes.button} ${className}`}></button>;
};

export default Button;

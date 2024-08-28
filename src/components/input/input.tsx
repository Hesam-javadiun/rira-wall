import { type ComponentPropsWithoutRef } from "react";
import classes from "./input.module.css";
import Container from "@/components/container";

type InputProps = {
  id: string;
  label: string;
  isValid?: boolean;
  errors: string[];
  isTouched: boolean;
} & ComponentPropsWithoutRef<"input">;

const Input = function (props: InputProps) {
  const { id, label, errors, className, isTouched, ...inputProps } = props;
  const modifiedClassName = `${className ?? ""} ${classes.input}`;

  let tooltip;
  if (errors.length !== 0 && isTouched) {
    tooltip = (
      <ul className={classes.warningContainer}>
        {errors.map((error) => (
          <li key={error}>
            <p className={classes.warning}>{error}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Container className={classes.container}>
      <p>
        <label htmlFor={id} className={classes.label}>
          {label}
        </label>
        <input {...inputProps} id={id} className={modifiedClassName}></input>
      </p>
      {tooltip}
    </Container>
  );
};

export default Input;

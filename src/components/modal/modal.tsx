import classes from "./modal.module.css";
import {
  ComponentPropsWithoutRef,
  // useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { forwardRef } from "react";

type ModalProps = ComponentPropsWithoutRef<"dialog"> 

export type ModalExposedRef = {
  close: () => void;
  show: () => void;
};

const Modal = forwardRef<ModalExposedRef, ModalProps>(function Modal(
  props,
  ref
) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // useEffect(() => {
  //   const modal = dialogRef.current!;
  //   modal.showModal();

  //   return () => {
  //     modal.close();
  //   };
  // }, []);

  useImperativeHandle(ref, () => {
    const modal = dialogRef.current!;

    return {
      close: () => {
        modal.close();
      },

      show: () => {
        modal.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialogRef}
      {...props}
      className={`${classes.modal} ${props.className ?? ""}`}
    >
      {props.children}
    </dialog>,
    document.getElementById("modal-root")!
  );
});

export default Modal;

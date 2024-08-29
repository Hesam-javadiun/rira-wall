import classes from "./layout.module.css";
import Container from "@/components/container";
import { type ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  openModalButton: ReactNode
}

const Layout = function ({openModalButton, children}: LayoutProps) {
  return (
    <>
      <Container tag="section" className={classes.container}>
        <div className={classes.leftBar}>
          {openModalButton}
        </div>
        <main className={classes.mainContent}>
          {children}
        </main>
      </Container>
    </>
  );
};

export default Layout;

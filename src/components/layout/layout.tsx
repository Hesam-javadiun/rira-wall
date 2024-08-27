import classes from "./layout.module.css";
import Button from "@/components/button";
import Container from "@/components/container";

const Layout = function () {
  return (
    <>
      <Container tag="section" className={classes.container}>
        <div className={classes.sideBar}>
          <Button>click</Button>
        </div>
        <main className={classes.grid}></main>
      </Container>
    </>
  );
};

export default Layout;

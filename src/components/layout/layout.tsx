import classes from './layout.module.css'

import Container from "@/components/container";

const Layout = function (){
    return <Container tag='section' className={classes.container} >
        <Container tag="section" className={classes.sideBar}></Container>
        <Container tag='main' className={classes.grid}></Container>
    </Container>
}

export default Layout;

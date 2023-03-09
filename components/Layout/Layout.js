import React from 'react';
import HeadTags from './HeadTags'
import Navbar from './Navbar'
import { Container } from 'semantic-ui-react';
// import nprogress from "../../public/nprogress.css"
import { Router } from 'next/router';

function Layout({ children }) {
    // Route.onRouteChangeStart = () => nprogress.start();
    // Route.onRouteChangeComplete = () => nprogress.done(); //done();
    // Route.onRouteChangeError = () => nprogress.done();
    return (
        <>
            <HeadTags />
            <Navbar />
            <Container style={{ paddingTop: "1rem" }} text>
                {children}
            </Container>
        </>
    )
}

export default Layout;
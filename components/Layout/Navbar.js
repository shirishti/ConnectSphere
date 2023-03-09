import React from "react";
import { Menu, Container,Icon } from 'semantic-ui-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Router from 'next/router'
function Navbar() {
    const router = useRouter()

    const isActive=(route) => {
        return router.pathname === route;  
    }
    return (
        <Menu  fluid borderless>
            <Container>
                <Link href="/">
                    <Menu.Item header>ConnectSphere</Menu.Item>
                </Link>
                <Link href="/login">     
              
                    <Menu.Item active={isActive("/login")}>
                    <Icon size="small" name="sign in" />
                        Login
                    </Menu.Item>
                </Link>
                <Link href="/signup">
                    <Menu.Item active={isActive("/signup")}>
                    <Icon size="small" name="signup" />
                        Signup
                    </Menu.Item>
                </Link>
      </Container>
    </Menu>
    )
}


export default Navbar;
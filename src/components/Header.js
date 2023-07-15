import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <header>
        <Navbar variant="dark" expand = "lg" collapseOnSelect>
            <Container className='d-flex justify-content-center'>
                <LinkContainer to="/">
                    <Navbar.Brand>
                      <img src={`${process.env.PUBLIC_URL}/assets/pokemon-logo-black-transparent.png`} style={{width: "14rem"}} alt=""/>
                    </Navbar.Brand>
                </LinkContainer>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
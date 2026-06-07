import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE} from "../utils/consts";
import {Button, Badge} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'

const NavBar = observer(() => {
    const {user, device} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={SHOP_ROUTE}>LayerByLayer</NavLink>
                <Nav className="ms-auto" style={{color: 'white'}}>
                    <Button
                        variant={"outline-light"}
                        onClick={() => history.push(BASKET_ROUTE)}
                        className="me-2 position-relative"
                    >
                        🛒 Корзина
                        {device.basketCount > 0 && (
                            <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                                {device.basketCount}
                            </Badge>
                        )}
                    </Button>
                    {user.isAuth ?
                        <>
                            {user.user.role === 'ADMIN' && (
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => history.push(ADMIN_ROUTE)}
                                    className="me-2"
                                >
                                    Админ панель
                                </Button>
                            )}
                            <Button
                                variant={"outline-light"}
                                onClick={() => logOut()}
                            >
                                Выйти
                            </Button>
                        </>
                        :
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    }
                </Nav>
            </Container>
        </Navbar>

    );
});

export default NavBar;

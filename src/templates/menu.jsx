import { Link } from "react-router-dom"
import { useContext } from 'react';
import { ContextoUsuario } from '../contextos/contexto.js';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";

export default function Menu() {

    const [usuario, setUsuario] = useContext(ContextoUsuario);

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Button variant="outline-primary"><Link to="/">Home</Link></Button></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Button variant="outline-primary"><Link to="/carros">Carros</Link></Button></Nav.Link>
                        <Nav.Link><Button variant="outline-primary"><Link to="/grupos">Grupos</Link></Button></Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="me-2">
                            Usuário Logado: {usuario.nome}
                        </Navbar.Text>
                        <Nav.Link>
                            <Button variant="outline-danger">
                                <Link onClick={() => {
                                    setUsuario({ ...usuario, logado: false })
                                }
                                } to="/">Sair</Link>
                            </Button>
                        </Nav.Link>
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
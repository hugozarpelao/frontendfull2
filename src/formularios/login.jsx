import { ContextoUsuario } from "../contextos/contexto.js";
import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';

export default function FormularioLogin() {

    const [usuario, setUsuario] = useContext(ContextoUsuario);
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [senha, setSenha] = useState("");

    function realizarLogin() {
        if (nomeUsuario === 'admin' && senha === 'admin') {
            setUsuario({
                nome: nomeUsuario,
                logado: true
            });
        }
    }

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Form>
                <Row className="mb-3">
                    <h3>Faça o login</h3>
                </Row>
                <Row className='mt-2 mb-2'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control
                                id="userlogin"
                                name="userlogin"
                                required
                                type="text"
                                onChange={(e) => setNomeUsuario(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe o nome do carro
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Senha</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id="senhaLogin"
                                    name="senhaLogin"
                                    type="password"
                                    required
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o preço da locação.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Button className="mt-3" onClick={realizarLogin}>Entrar</Button>
            </Form>
        </Container>
    );
}
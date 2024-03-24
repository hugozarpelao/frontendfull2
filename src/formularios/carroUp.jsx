import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import React, { useState, useRef, useEffect } from 'react';
import CaixaSelecao from '../componentes/caixaSelecao.js';
import ipBackend from '../ipBackend.js';
import CARRO from '../estados/useCarros.js';

export default function FormularioCarroUp(props) {

    const [formValidado, setFormValidado] = useState(false);
    const [valorSelecionado, setValorSelecionado] = useState({});
    const descricao = useRef("");
    const precoAluguel = useRef("");

    useEffect(() => {
        if (props.dadosAtualiza) {
            descricao.current.value = props.dadosAtualiza.descricao
            precoAluguel.current.value = props.dadosAtualiza.precoAluguel
        }
    }, []);


    function validarDados() {
        const carro = {
            codigo: props.dadosAtualiza.codigo,
            descricao: descricao.current.value,
            precoAluguel: precoAluguel.current.value,
            grupo: {
                codigo: valorSelecionado.codigo
            }
        }
        if (carro.descricao && carro.precoAluguel && carro.grupo) {
            return carro;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const novoCarro = validarDados();
            if (novoCarro) {
                cadastrarCarro(novoCarro)
            }
        }
        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    };

    function cadastrarCarro(dados) {
        fetch(ipBackend + "carro", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            alert(dados.mensagem)
            props.controleTela(CARRO.listagem)
        }).catch((erro) => {
            alert(erro.mensagem)
        });
    }

    return (
        <Container className='d-flex justify-content-center'>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row className='mt-2 mb-2'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Carro</Form.Label>
                            <Form.Control
                                id="descricao"
                                name="descricao"
                                required
                                type="text"
                                ref={descricao}
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
                            <Form.Label>Preço Locação</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    id="precoAluguel"
                                    name="precoAluguel"
                                    type="text"
                                    required
                                    ref={precoAluguel}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Informe o preço da locação.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Grupo</Form.Label>
                            <InputGroup hasValidation>
                                <CaixaSelecao
                                    enderecoFonteDados="http://localhost:4000/grupo"
                                    campoChave="codigo"
                                    campoExibicao="descricao"
                                    funcaoSelecao={setValorSelecionado}
                                    required />
                                <Form.Control.Feedback type="invalid">
                                    Informe o Grupo.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className='me-2'>Atualizar</Button>
                <Button onClick={() => { props.controleTela(CARRO.listagem) }}>Voltar</Button>
            </Form>
        </Container>
    );
}
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useState, useRef } from 'react';
import GRUPO from '../estados/useGrupo.js';
import ipBackend from '../ipBackend.js';


export default function FormularioGrupoCarro(props) {

    const [formValidado, setFormValidado] = useState(false);
    const descricao = useRef("");

    function validarDados() {
        const grupo = {
            descricao: descricao.current.value
        }
        if (grupo.descricao) {
            return grupo;
        }
        else {
            return undefined;
        }
    }

    function manipularSubmissao(evento) {
        const formulario = evento.currentTarget;
        if (formulario.checkValidity()) {
            const novoGrupo = validarDados();
            if (novoGrupo) {
                cadastrarGrupo(novoGrupo)
            }
        }
        evento.preventDefault();
        evento.stopPropagation();
        setFormValidado(true);
    };

    function cadastrarGrupo(dados) {
        fetch(ipBackend + "grupo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            alert(dados.mensagem)
            props.controleTela(GRUPO.listagem)
        }).catch((erro) => {
            alert(erro.mensagem)
        });
    }
    return (
        <div className='d-flex justify-content-center'>
            <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                <Row className='mt-2 mb-2'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Nome do Grupo</Form.Label>
                            <Form.Control
                                id="descricao"
                                name="descricao"
                                required
                                type="text"
                                ref={descricao}
                            />
                            <Form.Control.Feedback type="invalid">
                                Informe o nome do grupo
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" className='me-2 mt-2' variant='outline-primary'>Cadastrar</Button>
                <Button variant='outline-primary' className='mt-2' onClick={() => { props.controleTela(GRUPO.listagem) }}>Voltar</Button>
            </Form>
        </div>
    );
}
import { useState, useEffect, useRef } from "react";
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import CaixaSelecaoRev from "../componentes/caixaSelecaoRev.jsx";
import TabelaItensReserva from "../tabelas/itensReserva";
import Cabeçalho from "../templates/cabecalho";
import Menu from "../templates/menu";
import BarraBusca from "../componentes/BarraBusca";


export default function FormularioReserva() {

    const [validado, setValidado] = useState(false);
    const [listaClientes, setListaClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState({});
    const [carroSelecionado, setCarroSelecionado] = useState({});
    const [qtdItem, setQtdItem] = useState(0);
    const [subTotalCalculado, setSubTotalCalculado] = useState(0.00);
    const [valorTotal, setValorTotal] = useState(0);
    const [reserva, setReserva] = useState({
        cod_rev: 0,
        usuario: 0,
        data_retirada: "",
        data_devolucao: "",
        total: 0,
        carro: []
    });

    const data_retirada = useRef("");
    const data_devolucao = useRef("");

    useEffect(() => {
        fetch('http://localhost:4000/usuario', { method: "GET" })
            .then((resposta) => {
                return resposta.json();
            })
            .then((listaClientes) => {
                setListaClientes(listaClientes.listaUsuarios);
            })
            .catch((erro) => {
                alert("Não foi possível recuperar os usuários do backend." + erro);
            });
    }, []);

    function manipularMudanca(e) {
        const alvo = e.target.name;
        if (e.target.type === "checkbox") {
            setReserva({ ...reserva, [alvo]: e.target.checked });
        }
        else {
            setReserva({ ...reserva, [alvo]: e.target.value });
        }
    }

    function gravarVenda() {
        fetch('http://localhost:4000/reserva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario: clienteSelecionado.codigo,
                data_retirada: data_retirada.current.value,
                data_devolucao: data_devolucao.current.value,
                total: valorTotal,
                carro: reserva.carro
            })
        })
            .then((resposta) => {
                return resposta.json()
            })
            .then((dados) => {
                if (dados.status) {
                    setReserva({ ...reserva, cod_rev: dados.cod_rev })
                }
                alert(dados.mensagem);
            })
            .catch(erro => alert(erro.message));
    }

    const manipulaSubmissao = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            setValidado(false);
            gravarVenda();
        }
        else {
            setValidado(true);
        }
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Container >
            <Cabeçalho />
            <Menu />
            <Form noValidate validated={validado} onSubmit={manipulaSubmissao} className="mt-3" s>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="data_retirada">
                        <Form.Label>Data da Retirada</Form.Label>
                        <Form.Control
                            type="date"
                            required
                            name="data_retirada"
                            ref={data_retirada}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor informe a data da retirada.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="data_devolucao">
                        <Form.Label>Data da Devolução</Form.Label>
                        <Form.Control
                            type="date"
                            required
                            name="data_devolucao"
                            ref={data_devolucao}
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor informe a data da devolução.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="total">
                        <Form.Label>Total da Reserva</Form.Label>
                        <Form.Control
                            type="number"
                            value={valorTotal}
                            name="total"
                            onChange={manipularMudanca}
                            required
                            disabled />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o valor total da reserva
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="12" controlId="usuario">
                        <Form.Label>Cliente:</Form.Label>
                        <BarraBusca campoBusca={"nome"}
                            campoChave={"codigo"}
                            dados={listaClientes}
                            funcaoSelecao={setClienteSelecionado}
                            placeHolder={"Selecione um cliente"}
                            valor={""} />
                    </Form.Group>
                </Row>
                <Row>
                    <Container className="m-3 border">
                        <Row className="m-3">
                            <Col md={2}>
                                <Form.Label>Selecione um automóvel</Form.Label>
                            </Col>
                            <Col>
                                <CaixaSelecaoRev enderecoFonteDados={"http://localhost:4000/carro"}
                                    campoChave={"codigo"}
                                    campoExibicao={"descricao"}
                                    funcaoSelecao={setCarroSelecionado} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                                <Row>
                                    <Col md={1}>
                                        <Form.Group>
                                            <Form.Label>Código</Form.Label>
                                            <Form.Control type="text" value={carroSelecionado?.codigo} disabled />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Descrição do Produto</Form.Label>
                                            <Form.Control type="text" value={carroSelecionado?.descricao} disabled />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group>
                                            <Form.Label>Aluguel R$</Form.Label>
                                            <Form.Control type="text" value={carroSelecionado?.precoAluguel} disabled />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group>
                                            <Form.Label>Qtd</Form.Label>
                                            <Form.Control type="number"
                                                min={1}
                                                value={qtdItem}
                                                onChange={(e) => {
                                                    const qtdInformada = e.currentTarget.value;
                                                    if (!isNaN(qtdInformada)) {
                                                        setQtdItem(qtdInformada);
                                                        setSubTotalCalculado(qtdInformada * parseFloat(carroSelecionado?.precoAluguel));
                                                    }
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group>
                                            <Form.Label>SubTotal</Form.Label>
                                            <Form.Control type="text" value={subTotalCalculado} disabled />
                                        </Form.Group>
                                    </Col>
                                    <Col md={1} className="middle">
                                        <Form.Group>
                                            <Form.Label>Adicionar</Form.Label>
                                            <Button onClick={() => {
                                                //adicionar o item na lista de itens vendidos
                                                if (qtdItem > 0) {
                                                    setReserva({
                                                        ...reserva,
                                                        carro: [...reserva.carro, {
                                                            codigo: carroSelecionado?.codigo,
                                                            descricao: carroSelecionado?.descricao,
                                                            precoUnitario: carroSelecionado?.precoAluguel,
                                                            grupo: carroSelecionado?.grupo.descricao,
                                                            subtotal: subTotalCalculado
                                                        }],
                                                        totalPedido: reserva.totalPedido + subTotalCalculado
                                                    })
                                                }
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-bag-plus-fill"
                                                    viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z" />
                                                </svg>
                                            </Button>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <p><strong>Lista de produtos escolhidos</strong></p>
                            <TabelaItensReserva
                                listaItens={reserva}
                                setReserva={setReserva}
                                dadosReserva={reserva} 
                                valorReserva={setValorTotal}/>
                        </Row>
                    </Container>
                </Row>
                <Button type="submit">Finalizar Reserva</Button>
            </Form>
        </Container>
    );
}
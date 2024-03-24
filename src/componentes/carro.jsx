import TabelaCarros from "../tabelas/carro";
import Menu from "../templates/menu";
import Cabeçalho from "../templates/cabecalho";
import { Container } from "react-bootstrap";
import CARRO from "../estados/useCarros";
import FormularioCarro from "../formularios/carro";
import FormularioCarroUp from "../formularios/carroUp";
import { useState } from "react";
import ipBackend from "../ipBackend.js";

export default function Carro() {

    const [carros, setCarros] = useState(CARRO.listagem);
    const [atualizaCarro, setAtualizaCarro] = useState([]);

    function atualizaCarros(carro) {
        setCarros(CARRO.atualizar);
        setAtualizaCarro(carro);
    }

    function removerCarro(carro) {
        apagarCarro(carro);
        setCarros(CARRO.listagem);
    }

    function apagarCarro(carro) {
        const codigo = { codigo: carro.codigo }
        fetch(ipBackend + 'carro',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(codigo)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                alert(dados.mensagem);
                setCarros(CARRO.listagem)
            }).catch((erro) => {
                alert(erro.mensagem)
            });
    }

    if (carros === CARRO.listagem) {
        return (
            <Container>
                <Cabeçalho />
                <Menu />
                <TabelaCarros controleTela={setCarros} editaCarro={atualizaCarros} apagaCarro={removerCarro}/>
            </Container>
        );
    }

    else if (carros === CARRO.cadastro) {
        return (
            <Container>
                <Cabeçalho />
                <Menu />
                <FormularioCarro controleTela={setCarros} />
            </Container>
        );
    }

    else if (carros === CARRO.atualizar) {
        return (
            <Container>
                <Cabeçalho />
                <Menu />
                <FormularioCarroUp controleTela={setCarros} dadosAtualiza={atualizaCarro} />
            </Container>
        )
    }
}
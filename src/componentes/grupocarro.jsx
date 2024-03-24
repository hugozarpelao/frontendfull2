import FormularioGrupoCarro from "../formularios/grupo";
import FormularioGrupoCarroUp from "../formularios/grupoUp";
import TabelaGrupos from "../tabelas/grupo";
import Menu from "../templates/menu";
import Cabeçalho from "../templates/cabecalho";
import { Container } from "react-bootstrap";
import GRUPO from "../estados/useGrupo.js";
import { useState } from "react";
import ipBackend from "../ipBackend.js";

export default function GrupoCarro() {

    const [grupos, setGrupos] = useState(GRUPO.listagem);
    const [atualizaGrupo, setAtualizaGrupo] = useState([]);

    function atualizaGrupos(grupo) {
        setGrupos(GRUPO.atualizar);
        setAtualizaGrupo(grupo);
    }

    function removerGrupo(grupo) {
        apagarGrupos(grupo);
        setGrupos(GRUPO.listagem);
    }

    function apagarGrupos(grupo) {
        const codigo = { codigo: grupo.codigo }
        fetch(ipBackend + 'grupo',
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(codigo)
            }).then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                alert(dados.mensagem);
                setGrupos(GRUPO.listagem)
            }).catch((erro) => {
                alert(erro.mensagem)
            });
    }

    if (grupos === GRUPO.listagem) {
        return (
            <Container>
                <Cabeçalho />
                <Menu />
                <TabelaGrupos controleTela={setGrupos} editaGrupo={atualizaGrupos} apagarGrupo={removerGrupo}/>
            </Container>
        );
    }

    else if (grupos === GRUPO.cadastro) {
        return (
            <Container>
                <Cabeçalho />
                <Menu />
                <FormularioGrupoCarro controleTela={setGrupos} />
            </Container>
        );
    }

    else if (grupos === GRUPO.atualizar) {
        return (
            <Container>
                <Cabeçalho />
                <Menu />
                <FormularioGrupoCarroUp controleTela={setGrupos} dadosAtualiza={atualizaGrupo} />
            </Container>
        )
    }
}
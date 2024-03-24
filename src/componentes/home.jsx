import Menu from "../templates/menu";
import Cabeçalho from "../templates/cabecalho";
import { Container } from "react-bootstrap";

export default function Home() {
    return (
        <Container>
            <Cabeçalho />
            <Menu />
            <h4 className="mt-4">Seja Bem-Vindo</h4>
        </Container>
    );
}
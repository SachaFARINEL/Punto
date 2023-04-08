import './styles/cardStyle.css'
import Punto from "../../../components/Punto";
import styled from "styled-components";
import {puntoColor} from "../../../ressources/Constants";

const Div = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
    `
export default function BackCard() {
    return (
        <Div className={'dice'}>
            <Punto size={'0.8rem'}/>
        </Div>
    )
}
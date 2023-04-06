import styled from 'styled-components';
import {puntoColor} from "../ressources/Constants";

const PuntoTitle = styled.h1`
    font-size: ${props => props.size}
    `
const Red = styled.span`
      color: ${puntoColor.red};
    `
const Blue = styled.span`
      color: ${puntoColor.blue};
    `
const Yellow = styled.span`
      color: ${puntoColor.yellow};
    `
const Green = styled.span`
      color: ${puntoColor.green};
    `
const Punto = ({size}) => {
    return (
        <PuntoTitle size={size}>
            <Red>P</Red>
            <Blue>u</Blue>
            <Yellow>n</Yellow>
            <Green>t</Green>
            <Red>o</Red>
        </PuntoTitle>
    );
};

export default Punto;

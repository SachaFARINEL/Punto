import Punto from './Punto'
import styled from 'styled-components';
import {puntoColor} from "../ressources/Constants";

const HeaderPunto = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem
`
const Dot = styled.div`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background-color: ${props => props.color};
`

const Header = () => {
    return (
        <>
            <HeaderPunto>
                <Dot color={puntoColor.red} size="6px"></Dot>
                <Dot color={puntoColor.blue} size="10px"></Dot>
                <Punto size='3rem'/>
                <Dot color={puntoColor.yellow} size="10px"></Dot>
                <Dot color={puntoColor.green} size="6px"></Dot>
            </HeaderPunto>
        </>
    )
}

export default Header;
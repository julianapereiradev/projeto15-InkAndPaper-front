import { styled } from "styled-components"
import logoinicio from "../images/logoinicio.png"

export default function Logo({width}) {
    return (
        <LogoSC width={width}>
            <img src={logoinicio} />
        </LogoSC>
    )
}

const LogoSC = styled.div`
    margin-top: '30px';

    img {
        width: ${props => props.width || '200px'};
    }
`
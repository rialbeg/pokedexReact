import styled, { css } from 'styled-components'
import { Color } from 'objs/Colors'
const TypeButton = styled.button`
  border-radius: 3px;
  color: white;
  margin: 5px;
  padding: 10px 15px;
  text-align:center;
  font-size:20px;
  font-family:'Press Start 2P', cursive;
  ${props => props.type && css`
    background: ${Color[props.type]};
    color: white;
  `}
`
export { TypeButton }
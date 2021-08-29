import React from 'react';
import styled from 'styled-components';
import defaultImg from '../../images/apartment-1.jpeg';

//styled components for each individual room hero image
const StyledHero = styled.header`
    min-height: 60vh;
    background: url(${props => props.img? props.img : defaultImg}) center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default StyledHero;

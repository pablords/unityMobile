import React from 'react';



import {Container, Content, Icon, TextIcon} from './styles';
import logo from '../../assets/globe.png';

export default function Header() {
    return (
        <Container>
            <Content>
                  <Icon source={logo}/>     
                      <TextIcon>Unity</TextIcon>
            </Content>
        </Container>
    )


}
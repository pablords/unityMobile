import React from 'react';
import styled from 'styled-components/native';


const Container = styled.View`
width: 100%;
height:110px;
background-color:#708090;
border-bottom-color:#ADD8E6;
border-bottom-width:5px;
top:0px;

`;

const Content = styled.View `
   margin-top:30px;
   flex: 1;
   align-items: center;
   justify-content: center;
   flex-direction: row;

`;


const Icon = styled.Image`
width:50px;
height:50px;


`;



const TextIcon = styled.Text`
  font-size:30px;
  font-weight: bold;
  color:#FFF;
 
`;


export {Container, Content, Icon, TextIcon};
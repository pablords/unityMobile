import React from 'react';
import styled from 'styled-components/native';


export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #D3D3D3;
`;



export const Content = styled.View`
   flex: 1;
   align-items: center;
   justify-content: center;
   flex-direction: row;
   border-color:#708090;

   
`;



export const IconHome = styled.Image`
  width:100px;
  height: 100px;
  margin:10px;
  
`;

export const ContentText = styled.View`
   width:100%;
   display:flex;
   justify-content:center;
   align-items:center;
`;

export const TextIcon = styled.Text`
  font-size:12px;
  font-weight: bold;
  color:#708090;
`;

export const BoxMessage = styled.View`
width:370px;
margin-bottom:10px;
padding:10px;
`;

export const TextMessage = styled.Text`
font-size:15px;
font-weight:bold;
text-align:center;

`;


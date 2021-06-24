import styled from 'styled-components';



export const Container = styled.View`
flex:1;

`;

export const Top = styled.View`
height:30px;
width:100%;
justify-content:center;
align-items:center;
`;

export const Content = styled.View`
background-color:#fff;
margin-top:10px;
width:100%;


`;

export const Box = styled.View`
    margin-top:20px;
    flex-direction:row;
    align-items: center;
    justify-content: center;
    background-color:#fff;
    padding:8px 20px 10px 20px;
    border-bottom-color:#708090;
    border-bottom-width:1px;
 
`;

export const Title = styled.Text`
font-size:10px;
color:#778899;
margin-left:4px;

`;

export const Item = styled.Text`
font-size:11px;
color:black;
margin-left:4px;
`;

export const Button = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 9px;
  background-color: #4EADBE;
  align-self: stretch;
  margin: 10px 30px;
`;

export const ButtonText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;

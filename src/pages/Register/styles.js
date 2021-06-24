import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #708090;
`;

export const Logo = styled.Image`
  height: 10%;
  margin-bottom:5px;
`;


export const LogoText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  margin-top:10px;
  margin-bottom:10px;

`;

export const Input = styled.TextInput`
  padding: 15px 20px;
  border-radius: 5px;
  background-color: #FFF;
  align-self: stretch;
  margin:5px 20px;
  font-size: 16px;
`;

export const ErrorMessage = styled.Text`
  text-align: center;
  color: #FF4500;
  font-size: 16px;
  margin: 10px 20px;

`;

export const ButtonRegister = styled.TouchableHighlight`
  padding: 20px;
  border-radius: 5px;
  background-color: #00BFFF;
  align-self: stretch;
  margin: 20px;
  margin-top:20px;
`;

export const ButtonText = styled.Text`
  color: #FFF;
  font-size: bold;
  font-size: 18px;
  text-align: center;
`;

export const SignUpLink = styled.TouchableHighlight`
  padding: 5px;

`;

export const SignUpLinkText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  margin-top: -10px;
`;


export const Modal = styled.Modal`

`;

export const ModalArea = styled.View`
flex:1;

background-color:rgba(0,0,0,0.5);
justify-content:flex-end;
`;

export const ModalBody = styled.View`
background-color:#fff;
border-top-left-radius:20px;
border-top-right-radius:20px;
min-height:300px;
padding:10px 20px 40px 20px;
`;

export const ModalItem = styled.Text`
padding:15px;
font-size:12px;
font-weight:bold;

`; 

export const Avatar = styled.Image`
width:130px;
height:130px;
border-radius:65px;
margin: 10px;

`;


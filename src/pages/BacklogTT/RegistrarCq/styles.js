import styled from 'styled-components';

export const Container = styled.View`
  flex:1;
`;

export const Content = styled.View`
background-color:#fff;
padding:5px;
margin:10px;
z-index: 9;


`;

export const Box = styled.View`
    width: 100%;
    flex-direction:row;
    align-items: center;
    justify-content: center;
    background-color:#fff;
    padding:10px 10px 30px 0px;
    z-index: 10;
 
`;

export const Title = styled.Text`
font-size:12px;
color:#778899;
margin-left:10px;

`;

export const Item = styled.Text`
font-size:13px;
color:black;
margin-left:4px;
`;

export const Button = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 10px;
  background-color: #00BFFF;
  align-self: stretch;
  margin: 20px 30px;
  justify-content:center;
  align-items:center;
`;

export const ButtonText = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
`;

export const InputText = styled.TextInput`
width:90%;
height:80px;
border: solid 1px #ffff;
border-radius:10px;
background-color:#ffff;
margin:10px 10px;
padding:10px;

`;

export const ContentImage = styled.View`

flex-direction:row;
align-items:center;



`;

export const ContentItems = styled.TouchableOpacity`
flex-direction:row;
justify-content: center;

`;

export const ImageCq = styled.Image`
width:110px;
height:110px;
border-radius:10px;
margin: 10px;

`;


export const ImageCqPrincipal = styled.Image`
width:270px;
height:110px;
border-radius:10px;
margin: 10px;

`;

export const TextImage = styled.Text`
font-size:15px;
color:#778899;
margin:30px;
font-weight:bold;

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


export const IconcloseImage = styled.Image`
  width:40px;
  height: 40px;
  margin:10px;
  
`;


export const CloseButton = styled.TouchableOpacity`
width:40px;
height:40px;
`;

export const ImageSelected = styled.Image`
width:300px;
height:200px;
border-radius:10px;
margin: 10px;
`;

export const ButtonRemove = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 10px;
  background-color: red;
  align-self: stretch;
  margin: 50px 30px;
`;

export const ContentImageModal = styled.View`

`;

export const LoadingIcon = styled.ActivityIndicator`

`;

export const ModalErros = styled.Modal`

`;

export const ModalAreaErros = styled.View`
flex:1;

background-color:rgba(0,0,0,0.5);
justify-content:flex-end;
`;

export const ModalBodyErros = styled.View`
background-color:#fff;
border-top-left-radius:20px;
border-top-right-radius:20px;
min-height:300px;
padding:10px 20px 40px 20px;
`;

export const ModalItemErros = styled.Text`
padding:15px;
font-size:12px;
font-weight:bold;

`; 

export const ErrorMessage = styled.Text`
  text-align: center;
  color: #FF4500;
  font-size: 16px;
  margin: 10px 20px;

`;

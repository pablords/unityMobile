import styled from 'styled-components/native';

export const Container = styled.View `
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #D3D3D3;
`;



export const Content = styled.View `
   flex: 1;
   align-items: center;
   justify-content: center;


   
`;

export const ContentInfo = styled.View `
   align-items: center;
   justify-content: center;
   width:300px;

`;

export const Form = styled.TouchableOpacity`
width:100%;
flex-direction:row;
align-items:center;
justify-content:space-between;
border-bottom-color:#708090;
border-bottom-width:1px;
margin-bottom:40px;
padding:10px;
`;

export const Title = styled.Text`
font-size:16px;
font-weight:bold;

`;

export const Input = styled.Text`
font-size:16px;

`;

export const ListPapel = styled.View`
padding-top:10px;
justify-content:center;
align-items:center;
`;


export const Avatar = styled.Image`
width:150px;
height:150px;
border-radius:75px;
margin: 10px;

`;


import styled from 'styled-components/native';


export const Container = styled.View `
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #D3D3D3;
`;


export const Scroller = styled.ScrollView`
flex:1;
padding:10px;
width:100%;
`;

export const HeaderArea = styled.View`
flex-direction: row;
justify-content:space-between;
align-items:center;
margin-top:20px;
`;

export const HeaderTitle = styled.Text`
width:260px;
font-size:24px;
font-weight:bold;
color:#fff;
`;

export const SearchButton = styled.TouchableOpacity`
width:26px;
height:26px;
`;

export const LocationArea = styled.View`
background-color: #708090;
height:60px;
width:90%;
border-radius:30px;
flex-direction:row;
align-items:center;
padding-left:5px;
padding-right:10px;
margin-top:15px;

`;

export const LocationInput = styled.TextInput`
flex:1;
font-size: 16px;
color:#fff;
margin:0px 10px;
`;

export const LocationFinder = styled.TouchableOpacity`
width:24px;
height:24px;
`;

export const LoadingIcon = styled.ActivityIndicator`
margin-top:50px;
`;

export const ListArea = styled.View`
margin-top:0px;
margin-bottom: 30px;
`;

export const Icon = styled.Image`
width:25px;
height:25px;


`;


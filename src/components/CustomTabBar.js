import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../contexts/UserContext';

import iconHome from '../assets/global.png';
import iconProfile from '../assets/profle.png';
import iconLogout from '../assets/power.png';

import Api from '../../services/api';

const Container = styled.View`
width: 100%;
height:70px;
background-color:#708090;
border-top-color:#ADD8E6;
border-top-width:5px;
bottom:0px;

`;

const Content = styled.View`

   flex: 1;
   align-items: center;
   justify-content: space-around;
   flex-direction: row;

`;


const Icon = styled.Image`
width:30px;
height:30px;


`;

const ContentText = styled.View`
   width:100%;
   display:flex;
   justify-content:center;
   align-items:center;
`;

const TextIcon = styled.Text`
  font-size:12px;
  font-weight: bold;
  color:#FFF;
 
`;

export default ({ state, navigation }) => {

  const { state: { user } } = useContext(UserContext);


  const handleLogout = async () => {

    await Api.logout();

    navigation.reset({
      routes: [{ name: 'Login' }]
    });

  }

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  }

  return (
    <Container>
      <Content>

        <TouchableOpacity onPress={() => goTo('Home')}>
          <ContentText>
            <Icon source={iconHome} />
            <TextIcon>Home</TextIcon>
          </ContentText>
        </TouchableOpacity>



        <TouchableOpacity onPress={() => goTo('Profile')}>
          <ContentText>
            <Icon source={iconProfile} />
            <TextIcon>{user.name}</TextIcon>
          </ContentText>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <ContentText>
            <Icon source={iconLogout} />
            <TextIcon>Logout</TextIcon>
          </ContentText>
        </TouchableOpacity>


      </Content>
    </Container>
  );
}
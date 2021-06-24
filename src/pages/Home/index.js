import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';


//API

import Api from '../../../services/api';

// COMPONENTES
import Header from '../../components/Header';


//ICONS

import IconCqsupervisao from '../../assets/clipboard.png';
import IconSuporte from '../../assets/phone.png';
import IconDoubleCheck from '../../assets/polaroids.png';
import IconBacklogTT from '../../assets/bolt.png';


import { Container, Content, IconHome, ContentText, TextIcon, BoxMessage, TextMessage } from './styles';


export default function Home(state) {

  const { state: { user } } = useContext(UserContext);

  const route = useRoute();

  const params = route.params;

  const navigation = useNavigation();

  const [message, setMessage] = useState(null);
  const [supervisor, setSupervisor] = useState("");
  const [tecnico, setTecnico] = useState("");


  function papelSupervisor() {
    const res = user.papel.filter(value => {
      return value.substr(0, 10) == "supervisor"
    });

    setSupervisor(res)
  }

  function papelTecnico() {
    const res = user.papel.filter(value => {
      return value == "tecnico"
    });
    setTecnico(res)
  }


  const handleBacklogTt = () => {
    navigation.navigate('BacklogTT');
  }

  useEffect(() => {
    papelSupervisor()
    papelTecnico()
    if (params !== undefined) {
      setMessage(params);
    }


  }, [route])

  return (


    <Container>
      <Header />
      <Content>

        {
          supervisor[0] &&

          <TouchableOpacity onPress={handleBacklogTt}>
            <IconHome source={IconBacklogTT} />
            <ContentText>
              <TextIcon>Backlog TT</TextIcon>
            </ContentText>
          </TouchableOpacity>
        }

        {
          tecnico[0] &&

          <TouchableOpacity >
            <IconHome source={IconDoubleCheck} />
            <ContentText>
              <TextIcon>Double Check</TextIcon>
            </ContentText>
          </TouchableOpacity>
        }
      </Content>

      {
        message !== null &&
        <BoxMessage>
          <TextMessage>{message.message}</TextMessage>
        </BoxMessage>
      }

    </Container>



  )
}

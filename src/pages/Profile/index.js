import React, { useContext, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { UserContext } from '../../contexts/UserContext';
import { Container, Content, ContentInfo, Form, Title, Input, ListPapel, Avatar } from './styles';

import Api from '../../../services/api';

import Header from '../../components/Header';
import ImagePlaceHolder from '../../assets/image-placeholder.png';

export default function Profile(state, navigation) {

    const [avatar, setAvatar] = useState(null);

    const { state: { user } } = useContext(UserContext);

    let url = `${Api.imageAvatar.urlAssets}/${user.avatar}`;
    console.log(url)
    return (
        <Container>
            <Header />
            <Content>
                <TouchableOpacity style={{ alignItems: "center", marginBottom: 50 }} onPress={() => { }}>
                    {
                        user ?
                            <Avatar source={{ uri:  url}} />
                            :
                            <Avatar source={ImagePlaceHolder} />
                    }
                    <Text style={{ marginTop: 10 }}>Altere sua foto de perfil</Text>

                </TouchableOpacity>
                <ContentInfo>
                    <Form>
                        <Title>Nome:</Title>
                        <Input>{user.name}</Input>
                    </Form>
                    <Form>
                        <Title>Email:</Title>
                        <Input>{user.email}</Input>
                    </Form>
                    <Form>
                        <Title>Matricula:</Title>
                        <Input>{user.matricula}</Input>
                    </Form>

                    <Title>Papeis</Title>
                    <ListPapel>

                        {

                            user.papel.map((item, key) => (
                                <Input key={key}>{item}</Input>
                            ))

                        }
                    </ListPapel>
                </ContentInfo>
            </Content>

        </Container>
    )

}

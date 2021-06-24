import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native'



import {
    Container,
    Logo,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
    SignUpLink,
    SignUpLinkText,
    LogoText
} from './styles';



import logo from '../../assets/globe.png';

import Api from '../../../services/api';


export default function Login() {


    const [matricula, setMatricula] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigation = useNavigation();

    function routeRegister() {
        navigation.navigate('Register');
    }

    const logar = async () => {
        if (matricula !== '' && password !== '') {
            const response = await Api.signIn(matricula, password);
            if (response.message) {
                setError(response.message);
            } else {

                await AsyncStorage.setItem('token', response.token);

                navigation.reset({
                    routes: [{ name: 'Preload' }]
                  });

            }
        } else {
            setError('Por favor preencha os campos!!!');
        }

    }



    return (
        <Container>
            <Logo source={logo} resizeMode="contain" />
            <LogoText>Unity</LogoText>
            <Input
                placeholder="Matricula"
                onChangeText={(text) => setMatricula(text)}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Input
                placeholder="Senha"
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
            />
            {error.length !== 0 && <ErrorMessage>{error}</ErrorMessage>}
            <Button onPress={logar}>
                <ButtonText>Entrar</ButtonText>
            </Button>
            <SignUpLink onPress={routeRegister}>
                <SignUpLinkText>Criar conta</SignUpLinkText>
            </SignUpLink>
        </Container>
    )

}
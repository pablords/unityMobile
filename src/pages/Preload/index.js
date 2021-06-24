import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';



// COMPONENTES
import logo from '../../assets/globe.png';


//API

import Api from '../../../services/api';


import { Container, Icon, TextIcon } from './styles';

export default function Prelod() {

    const { dispatch: userDispatch } = useContext(UserContext);

    const [load, setLoad] = useState(false);

    const navigation = useNavigation();

    const checkToken = async () => {
        setLoad(true);
        const token = await AsyncStorage.getItem('token');

        if (token) {

            //let tokenI = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjQzLjE2XC91bml0eVwvcHVibGljXC9hcGlcL3JlZnJlc2giLCJpYXQiOjE2MDkzMDIwMzYsImV4cCI6MTYwOTMwNTk4NywibmJmIjoxNjA5MzAyMzg3LCJqdGkiOiJtakF4c0pmamRSTEpMWUhsIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.HUmGqCfSeo_38DxuzicZG-6UaZXL8Io_q2eUdUPdglY";
            const response = await Api.checkToken(token);

            if (response.status == 400) {
                await AsyncStorage.removeItem('token');
                navigation.reset({
                    routes: [{ name: 'Login' }]
                });

            } else {

                await AsyncStorage.setItem('token', response.data.token);

                const { user } = await Api.user();
                let res = user.papeis;
                let arrayPapel = res.map(function (item, indice) {
                    return item.nome;

                });


                userDispatch({
                    type: 'setUser',
                    payload: {
                        id: user.id,
                        name: user.name,
                        matricula: user.matricula,
                        email: user.email,
                        papel: arrayPapel,
                        avatar: user.avatar
                    }
                });

                navigation.reset({
                    routes: [{ name: 'MainTab' }]
                });
            }
        } else {
            navigation.reset({
                routes: [{ name: 'Login' }]
            });
        }
    }

    useEffect(() => {
        checkToken();
    }, []);

    return (

        <Container>
            <Icon source={logo} resizeMode="contain" />
            <TextIcon>Unity</TextIcon>
            <ActivityIndicator color={'#ADD8E6'} style={{ position: 'relative', top: 30 }} size={50} />
        </Container>
    );
}
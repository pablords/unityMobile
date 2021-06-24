import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text } from "react-native";
import Clipboard from 'expo-clipboard';


import {
    Container,
    Top,
    Content,
    Box,
    Title,
    Item,
    Button,
    ButtonText

} from './styles';

import Header from '../../../components/Header';
import Api from '../../../../services/api';
import { TouchableOpacity } from "react-native-gesture-handler";


export default function DetailBacklog() {

    const navigation = useNavigation();
    const route = useRoute();

    const [reparoInfo, setReparoInfo] = useState({})
    const [copiedInstancia, setCopiedInstancia] = useState(null);
    const [copiedPon, setCopiedPon] = useState(null);

    const getReparo = () => {

        const params = route.params;

        setReparoInfo(params);
    }

    const routeCq = () => {
        navigation.navigate('RegistrarCq', {
            id: reparoInfo.id,
            instancia: reparoInfo.TELEPHONENUMERIC,
            pon: reparoInfo.COD_SS,
            armario: reparoInfo.ARMARIO,
            cidade: reparoInfo.CITY,
            cluster: reparoInfo.VALIDA_CLUSTER

        });
    }


    const copyInstancia = () => {
        setCopiedPon(null)
        Clipboard.setString(reparoInfo.TELEPHONENUMERIC);
        fetchCopiedInstancia();
    }

    const fetchCopiedInstancia = async () => {
        const text = await Clipboard.getStringAsync();
        setCopiedInstancia(text);
    };

    const copyPon = () => {
        setCopiedInstancia(null);
        Clipboard.setString(reparoInfo.COD_SS);
        fetchCopiedPon();
    }

    const fetchCopiedPon = async () => {
        const text = await Clipboard.getStringAsync();
        setCopiedPon(text);
    };



    useEffect(() => {
        getReparo();
        setCopiedInstancia(null);
        setCopiedPon(null)
    }, [route]);


    return (
        <Container>
            <Header />
            <Top>
                <TouchableOpacity onPress={copyPon}>
                    <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 10 }}>Detalhe: {reparoInfo.COD_SS}</Text>
                </TouchableOpacity>
                {copiedPon &&
                    <Text style={{ color: "green" }}>Copiado</Text>
                }
            </Top>
            <Content>
                <Box>

                    <Title>ID:</Title>
                    <Item>{reparoInfo.id}</Item>
                    <Title>TIPO:</Title>
                    <Item>{reparoInfo.VALIDA_TT}</Item>
                    <Title>DISTANCIA:</Title>
                    <Item>{reparoInfo.distancia}km</Item>
                    <Title>INSTANCIA:</Title>

                    <TouchableOpacity onPress={copyInstancia}>
                        <Item>{reparoInfo.TELEPHONENUMERIC}</Item>
                    </TouchableOpacity>

                    {copiedInstancia &&
                        <Item style={{ color: "green" }}>Copiado</Item>

                    }

                </Box>
                <Box>
                    <Title>STATUS:</Title>
                    <Item>{reparoInfo.STATUS}</Item>
                    <Title>DATA VENCIMENTO:</Title>
                    <Item>{reparoInfo.DATA_VENCIMENTO}</Item>
                </Box>
                <Box>
                    <Title>PRODUTO:</Title>
                    <Item>{reparoInfo.SPECIFICATION_PRODUCT}</Item>
                    <Title>DETALHE:</Title>
                    <Item>{reparoInfo.DETAIL}</Item>

                </Box>
                <Box>
                    <Title>ARMARIO:</Title>
                    <Item>{reparoInfo.ARMARIO}</Item>
                    <Title>TECNOLOGIA:</Title>
                    <Item>{reparoInfo.PHYSICAL_LINK_MEDIA_TYPE}</Item>
                </Box>
                <Box>
                    <Title>END:</Title>
                    <Item>{reparoInfo.STREETNAME},</Item>
                    <Item>{reparoInfo.NEIGHBORDHOOD},</Item>
                    <Item>{reparoInfo.CITY}</Item>
                </Box>
                <Box>
                    <Title>REPETIDO:</Title>
                    <Item style={{ color: reparoInfo.TOTAL_REPETIDO_30D_PL > 0 ? "red" : "green" }}>{reparoInfo.TOTAL_REPETIDO_30D_PL}</Item>
                    <Title>RECENTE:</Title>
                    <Item style={{ color: reparoInfo.num_Ba == null ? "green" : "red" }}>{reparoInfo.num_Ba == null ? "NÃO" : "SIM"}</Item>
                    <Title>CLIENTE_V:</Title>
                    <Item>{reparoInfo.VALIDA_CLIENTE_V}</Item>

                </Box>
                {reparoInfo.tecnico_tt_repetido &&
                    < Box >
                        <Title>Ofensor Repetido:</Title>
                        <Item>{reparoInfo.tecnico_tt_repetido}</Item>
                    </Box>
                }

                <Button>
                    <ButtonText onPress={routeCq}>Realizar CQ</ButtonText>
                </Button>

            </Content>
        </Container >
    );


}
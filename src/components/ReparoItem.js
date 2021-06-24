import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { TouchableOpacity } from 'react-native';

const Area = styled.View`
width:100%;
background-color:#fff;
margin-bottom: 20px;
border-radius:20px;
padding:10px;


`;


const InfoArea = styled.View`
width:100%;
flex-direction:row;
padding:10px;
`;

const LeftBox = styled.View`
width:50%;
justify-content:center;

`;

const RightBox = styled.View`
width:50%;
justify-content:center;
align-items:center;

`;

const TextTitle = styled.Text`
font-size:13px;

`;

const Text = styled.Text`
font-size:13px;

`;

const BorderInput = styled.View`
border: solid 1px #708090;
width:140px;


`;

const DetailButton = styled.View`
width: 100%;
height: 26px;
border:1px solid #708090;
border-radius:10px;
justify-content:center;
align-items:center;
margin-top:10px;
background-color:#4EADBE;
`;

const DetailButtonText = styled.Text`
font-size:13px;
color:#ffff;
font-weight:bold;
`;


export default ({ data }) => {

    const navigation = useNavigation();
    const dataFormatString = parseISO(data.DATA_VENCIMENTO);
    const dateFormat = format(new Date(dataFormatString), 'dd/MM/yyyy HH:mm:ss');

    const handleClick = () => {
        navigation.navigate('DetailBacklog', {
            id: data.id,
            COD_SS: data.COD_SS,
            DATA_ABERTURA: data.DATA_ABERTURA,
            VALIDA_B2B: data.VALIDA_B2B,
            TELEPHONENUMERIC: data.TELEPHONENUMERIC,
            STATUS: data.STATUS,
            ARMARIO: data.ARMARIO,
            CITY: data.CITY,
            VALIDA_CLUSTER: data.VALIDA_CLUSTER,
            DETAIL: data.DETAIL,
            PHYSICAL_LINK_MEDIA_TYPE: data.PHYSICAL_LINK_MEDIA_TYPE,
            SPECIFICATION_PRODUCT: data.SPECIFICATION_PRODUCT,
            DATA_VENCIMENTO: dateFormat,
            TOTAL_REPETIDO_30D_PL: data.TOTAL_REPETIDO_30D_PL,
            tecnico_tt_repetido: data.tecnico_tt_repetido,
            num_Ba: data.num_Ba,
            VALIDA_CLIENTE_V: data.VALIDA_CLIENTE_V,
            VALIDA_TT: data.VALIDA_TT,
            STATUS_ZEUS: data.STATUS_ZEUS,
            RECURSO: data.RECURSO,
            STREETNAME: data.STREETNAME,
            NEIGHBORDHOOD: data.NEIGHBORDHOOD,
            distancia: Math.round(data.distancia)

        });

    }

    return (
        <Area style={{
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            borderRadius: 10
        }}>
            <InfoArea >
                <LeftBox>
                    <TextTitle>TIPO:</TextTitle>
  
                    <TextTitle>STATUS PL: </TextTitle>
                    
                    <TextTitle>STATUS ZEUS: </TextTitle>
              
                    <TextTitle>ARMARIO: </TextTitle>
                
                    <TextTitle>TECNOLOGIA: </TextTitle>
            
                    <TextTitle>PRODUTO: </TextTitle>
            
                    <TextTitle>SEGMENTO: </TextTitle>
             
                    <TextTitle>CLIENTE_V: </TextTitle>
             
                    <TextTitle>REPETIDO: </TextTitle>
          
                    <TextTitle>RECENTE: </TextTitle>

                    <TextTitle>DATA VENCIMENTO: </TextTitle>

                    <TextTitle>DISTANCIA:</TextTitle>
                </LeftBox>

                <RightBox>
                    <Text>{data.VALIDA_TT}</Text>

                    <Text>{data.STATUS}</Text>

                    <Text>{data.STATUS_ZEUS}</Text>

                    <Text>{data.ARMARIO}</Text>

                    <Text>{data.PHYSICAL_LINK_MEDIA_TYPE}</Text>

                    <Text>{data.SPECIFICATION_PRODUCT}</Text>

                    <Text>{data.VALIDA_B2B}</Text>

                    <Text>{data.VALIDA_CLIENTE_V}</Text>

                    <Text style={{
                        color: data.TOTAL_REPETIDO_30D_PL > 0 ? "red" : "green",
                        fontWeight: data.TOTAL_REPETIDO_30D_PL > 0 ? "bold" : "normal"
                    }}>{data.TOTAL_REPETIDO_30D_PL}</Text>

                    <Text style={{color: data.num_Ba == null ? "green" : "red"}}>{data.num_Ba == null ? "NÃO" : "SIM" }</Text>

                    <Text>{dateFormat}</Text>

                    <Text>{
                        Math.round(data.distancia) == 0 ? "Menos de 1km" : Math.round(data.distancia) + "km"
                    }</Text>
                </RightBox>

            </InfoArea>
            <TouchableOpacity onPress={handleClick}>
                <DetailButton>
                    <DetailButtonText>Ver Detalhes</DetailButtonText>
                </DetailButton>
            </TouchableOpacity>
        </Area >
    );
}
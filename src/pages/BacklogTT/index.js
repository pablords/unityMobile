import React, { useState, useEffect, useContext } from "react";
import { Alert, Platform, RefreshControl, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { UserContext } from '../../contexts/UserContext';
import * as Location from 'expo-location';

import ApiMap from '../../../services/apiMapBox';
import Api from '../../../services/api';

import ReparoItem from '../../components/ReparoItem';
import Header from '../../components/Header';
import IconSearch from '../../assets/search.png';
import IconLocation from '../../assets/location.png';


import {

    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder,
    LoadingIcon,
    ListArea,
    Icon

} from './styles';
import { TouchableOpacity } from "react-native-gesture-handler";
import api from "../../../services/api";

export default function BacklogTT(state) {

    const { state: { user } } = useContext(UserContext);

    const navigation = useNavigation();
    const [locationText, setLocationText] = useState('');
    const [errorText, setErrorText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleLocationFinder = async () => {
        setLoading(true);
        setCoords(null);
        setErrorText('')
        setList([])

        const { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('A permissão para acessar o local foi negada');
        } else {

            const location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
     
            setCoords(location.coords);

            let lat = null;
            let long = null;

            if (coords) {

                lat = coords.latitude;
                long = coords.longitude;
            }

            const response = await ApiMap.handleLocationCity(long, lat);

            const [rua, bairro, cidade] = response;

            setLocationText(rua + "," + bairro + "," + cidade);

            getReparos();
            sendLocation();
            setLoading(false);
        }



    }

    const sendLocation = async () => {

        let lat = null;
        let long = null;

        if (coords) {

            lat = coords.latitude;
            long = coords.longitude;
        }

        let name = user.name;
        let user_id = user.id;


        const response = await api.sendLocation(name, user_id, lat, long)
       if(response.data.latitude !== null && response.data.latitude !== null){
         
       }
    }



    const getReparos = async () => {
        setLoading(true);
        setList([])

        let lat = null;
        let long = null;

        //lat = -22.964602;
        //long = -43.2044817;

        if (coords) {
            lat = coords.latitude;
            long = coords.longitude;
        }


        const response = await Api.getReparos(lat, long);

        if (response.data.erro) {
            setLocationText('');
            setErrorText(response.data.erro);
        } else {
            setList(response.data.data);
        }

        setLoading(false);
    }

    useEffect(() => {
        handleLocationFinder()
        getReparos()

    }, [])


    const OnRefresh = () => {
        handleLocationFinder();


    }

    const handleLocationSearch = async () => {


    }

    return (
        <Container>
            <Header />

            <HeaderArea>
                <HeaderTitle numberOfLines={2}>Econtre Reparos Próximos</HeaderTitle>
                <SearchButton onPress={() => navigation.navigate('Home')}>
                    <Icon source={IconSearch} />
                </SearchButton>
            </HeaderArea>

            <LocationArea>
                <LocationInput editable={false} placeholder="Onde Você está?"
                    placeholderTextColor="#fff"
                    value={locationText}
                    onChangeText={t => setLocationText(t)}
                    onEndEditing={handleLocationSearch}
                />
                <TouchableOpacity onPress={handleLocationFinder}>
                    <Icon source={IconLocation} onPress={handleLocationFinder} />
                </TouchableOpacity>

            </LocationArea>

            <Text style={{ fontSize: 14, fontWeight: "bold", color: "#708090", marginTop: 2 }}>{errorText}</Text>

            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={OnRefresh} />
            }>

                {loading &&
                    <LoadingIcon size="large" color="#fff" />
                }

                {
                    coords === [] ?

                        locationText.map((item: any, key: any) => (
                            < Text key={key} > { item.place_name}</Text>

                        ))


                        :
                        <ListArea>
                            {

                                list.map((item, key) => (
                                    <ReparoItem data={item} key={key} />
                                ))

                            }
                        </ListArea>
                }
            </Scroller>
        </Container >
    )

}
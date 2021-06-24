import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemeProvider, Select, Button, Icon } from 'react-native-magnus';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';


import logo from '../../assets/globe.png';

import ImagePlaceHolder from '../../assets/image-placeholder.png';


import Api from '../../../services/api';

import {
    Container,
    Logo,
    Input,
    ErrorMessage,
    ButtonRegister,
    ButtonText,
    SignUpLink,
    SignUpLinkText,
    LogoText,
    Modal,
    ModalArea,
    ModalBody,
    ModalItem,
    Avatar
} from './styles';


export default function Register() {

    const [name, setName] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [success, setsuccess] = useState();
    const [fails, setFails] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [papeis, setPapeis] = useState([]);
    const [clusterSelected, setClusterSelected] = useState('');
    const [papelSelected, setPapelSelected] = useState();
    const [showModal, setShowModal] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const [selectValueCluster, setSelectedValueCluster] = useState({});
    const selectRefCluster = React.createRef()

    const [selectValuePapel, setSelectedValuePapel] = useState({});
    const selectRefPapel = React.createRef()


    const navigation = useNavigation();

    function VoltarLogin() {
        navigation.navigate('Login');
    }

    async function imagePickerCall() {


        if (Constants.platform.ios) {

            const status = await Permissions.askAsync(Permissions.CAMERA);
            const statusRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status.status !== "granted" && statusRoll.status !== "granted") {
                Alert.alert("Nós precisamos dessa permissão.");
                return;
            }

        }

        const data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });

        if (data.cancelled) {
            return;
        }

        if (!data.uri) {
            return;
        }

        ImageManipulator.manipulateAsync(
            data.uri,
            [
                { resize: { width: 350, height: 350 } },
            ],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        )
            .then(response => {

                setAvatar(response)
            })
            .catch(err => {
                console.log(err)

            });

    }



    async function HandleSignup() {

        if (!avatar) {
            alert('Por favor, insira sua imagem de perfil');
            return
        }

        var formData = new FormData();
        var url = avatar.uri;
        var nameImage = url.substring(url.lastIndexOf('/') + 1);

        formData.append('avatar', { type: 'image/jpg', uri: url, name: nameImage });
        formData.append('name', name);
        formData.append('matricula', matricula);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);
        formData.append('cluster', clusterSelected);
        formData.append('papel', papelSelected);


        const response = await Api.signUp(formData);



        if (response.fails) {

            if (response.fails.name) {
                fails.push(response.fails.name)
            }
            if (response.fails.email) {
                fails.push(response.fails.email)
            }
            if (response.fails.matricula) {
                fails.push(response.fails.matricula)
            }
            if (response.fails.password) {
                fails.push(response.fails.password)
            }
            if (response.fails.password_confirmation) {
                fails.push(response.fails.password_confirmation)
            }
            if (response.fails.cluster) {
                fails.push(response.fails.cluster)
            }

            if (response.fails.papel) {
                fails.push(response.fails.papel)
            }

            setShowModal(true)
            return
        }

        setsuccess(response.message)
        setTimeout(() => {
            navigation.reset({
                routes: [{ name: 'Login' }]
            });
        }, 2000)

    }



    const handlePapeis = async () => {
        const response = await Api.getPapeis();

        setPapeis(response.data)

    }

    const onSelectOptionPapel = (option) => {
        setPapelSelected(option);
    }

    const handleClusters = async () => {
        const response = await Api.getClusters();
        setClusters(response.data)
    }


    const onSelectOptionCluster = (option) => {
        setClusterSelected(option);
    }

    const handleCloseButton = () => {
        setFails([])
        setShowModal(false);
    }

    useEffect(() => {
        handleClusters()
        handlePapeis()
        setAvatar(null)
    }, []);

    return (
        <ThemeProvider>

            <Container>

                <TouchableOpacity style={{ alignItems: "center", marginBottom: 10 }} onPress={imagePickerCall}>
                    {
                        avatar ?
                            <Avatar source={{ uri: avatar.uri }} />
                            :
                            <Avatar source={ImagePlaceHolder} />
                    }
                    <Text style={{ color: "#ffff", fontWeight: "bold" }}>Tire um Selfie</Text>

                </TouchableOpacity>

                <Input
                    placeholder="Nome"
                    onChangeText={(text) => setName(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Input
                    placeholder="Matricula"
                    onChangeText={(text) => setMatricula(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Input
                    placeholder="Endereço de e-mail"
                    onChangeText={(text) => setEmail(text)}
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
                <Input
                    placeholder="Confirme sua senha"
                    onChangeText={(text) => setPasswordConfirmation(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                />
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                    <Button
                        block
                        suffix={
                            <Icon
                                position="absolute"
                                right={8}
                                name="arrowup"
                                color="white"
                            />
                        }
                        borderColor="#ffff"
                        borderWidth={1}
                        bg="#708090"
                        mt={10}
                        p={15}
                        mr={20}
                        ml={20}
                        w={170}
                        color="white"
                        rounded="circle"
                        onPress={() => {
                            if (selectRefCluster.current) {
                                selectRefCluster.current.open();
                            }
                        }}>
                        {selectValueCluster.length ? selectValueCluster.toString() : clusterSelected}
                    </Button>
                    <Select
                        onSelect={onSelectOptionCluster}
                        ref={selectRefCluster}
                        value={selectValueCluster}
                        title="Cluster"
                        mt="md"
                        pb="2xl"
                        message="Selecione o Cluster em que trabalha"
                        roundedTop={20}
                        data={clusters}
                        renderItem={(item, index) => (
                            <Select.Option value={item} py="md" px="xl">
                                <Text style={{ fontSize: 20 }}>{item}</Text>
                            </Select.Option>
                        )}
                    />




                    <Button
                        block
                        suffix={
                            <Icon
                                position="absolute"
                                right={8}
                                name="arrowup"
                                color="white"
                            />
                        }
                        borderColor="#ffff"
                        borderWidth={1}
                        bg="#708090"
                        mt={10}
                        p={15}
                        mr={20}
                        ml={20}
                        w={170}
                        color="white"
                        rounded="circle"
                        onPress={() => {
                            if (selectRefPapel.current) {
                                selectRefPapel.current.open();
                            }
                        }}>
                        {selectValuePapel.length ? selectValuePapel.toString() : papelSelected}
                    </Button>
                    <Select
                        onSelect={onSelectOptionPapel}
                        ref={selectRefPapel}
                        value={selectValuePapel}
                        title="Papel"
                        mt="md"
                        pb="2xl"
                        message="Selecione o Papel"
                        roundedTop={20}
                        data={papeis}
                        renderItem={(item, index) => (
                            <Select.Option value={item} py="md" px="xl">
                                <Text style={{ fontSize: 20 }}>{item}</Text>
                            </Select.Option>
                        )}
                    />


                </View>


                <ButtonRegister onPress={HandleSignup}>
                    <ButtonText>Registrar</ButtonText>
                </ButtonRegister>
                <SignUpLink onPress={VoltarLogin}>
                    <SignUpLinkText>Logar</SignUpLinkText>
                </SignUpLink>

                <LogoText>Unity</LogoText>
                {success &&
                    <Text style={{ textAlign: "center", color: "#fff", fontSize: 15 }}>{success}</Text>
                }
                <Modal
                    transparent={true}
                    visible={showModal}
                    animationType="slide"
                >
                    <ModalArea>
                        <ModalBody>
                            <TouchableOpacity onPress={handleCloseButton}>
                                <Icon
                                    position="absolute"
                                    right={-8}
                                    fontSize={40}
                                    name="arrowdown"
                                    color="#00BFFF"
                                    pt={2}

                                />
                            </TouchableOpacity>
                            {
                                fails.length !== 0 &&
                                fails.map((item, index) => (
                                    <ErrorMessage key={index}>{item}</ErrorMessage>
                                ))

                            }
                        </ModalBody>
                    </ModalArea>
                </Modal>
            </Container>
        </ThemeProvider>
    )

}
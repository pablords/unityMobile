import React, { useState, useEffect, useContext, useMemo } from "react";
import { useRoute } from '@react-navigation/native';
import { Alert, SafeAreaView, TouchableOpacity } from "react-native";
import { Div, ThemeProvider, Radio, Text, Icon } from "react-native-magnus";
import { UserContext } from '../../../contexts/UserContext';
import { ScrollView } from "react-native-gesture-handler";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
//import ImageResizer from 'react-native-image-resizer';




import Header from '../../../components/Header';
import Api from '../../../../services/api';
import IconcloseModal from '../../../assets/arrow-down.png';

import ImagePlaceHolder from '../../../assets/image-placeholder.png';

import {

  Container,
  Content,
  Box,
  Button,
  ButtonText,
  Title,
  Item,
  InputText,
  ImageCq,
  ImageCqPrincipal,
  ContentImage,
  ContentItems,
  TextImage,
  Modal,
  ModalArea,
  ModalBody,
  IconcloseImage,
  CloseButton,
  ImageSelected,
  ContentImageModal,
  ButtonRemove,
  LoadingIcon,
  ModalErros,
  ModalAreaErros,
  ModalBodyErros,
  ModalItemErros,
  ErrorMessage


} from './styles';




export default function RegistrarCq(state, navigation) {

  const nav = useNavigation();

  const { state: { user } } = useContext(UserContext);


  const [loading, setLoading] = useState(false);
  const [textSubmmit, setTextSubmmit] = useState('Enviar')
  const [reparoInfo, setReparoInfo] = useState({});
  const [checkcto, setCheckCto] = useState('');
  const [checkTrajeto, setCheckTrajeto] = useState('');
  const [checkDropInterno, setCheckDropInterno] = useState('');
  const [checkCordaoOptico, setCheckCordaoOptico] = useState('');
  const [checkRedeInterna, setCheckRedeInterna] = useState('');
  const [checkNavegacao, setCheckNavegacao] = useState('');
  const [checkIptv, setCheckIptv] = useState('');
  const [checkVoip, setCheckVoip] = useState('');
  const [checkOrientacao, setCheckOrientacao] = useState('');
  const [checkSatisfacao, setCheckSatisfacao] = useState('');
  const [obsGeral, setObsGeral] = useState('');
  const [fails, setFails] = useState([]);
  const [showModalErros, setShowModalErros] = useState(false);
  const [fotos, setfotos] = useState();
  const [array, setArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [imageText, setImageText] = useState(null);


  const route = useRoute();

  const getReparo = () => {
    setCheckCto('')
    setCheckTrajeto('')
    setCheckDropInterno('')
    setCheckCordaoOptico('')
    setCheckRedeInterna('')
    setCheckNavegacao('')
    setCheckIptv('')
    setCheckVoip('')
    setCheckOrientacao('')
    setCheckSatisfacao('')
    setObsGeral('')
    const params = route.params;
    setReparoInfo(params);

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


    const data = await ImagePicker.launchCameraAsync({
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
        array.push(response);
        setImageText(array.length)
        if (array.length <= 5) {
          setfotos(array);
        } else {
          Alert.alert('O limite de 6 fotos já foi exedido!')
        }
      })
      .catch(err => {
        console.log(err)

      });


    /*ImageResizer.createResizedImage(
      data.uri,
      350,
      350,
      'JPEG',
      100,
      0,
      undefined,
      false,
      {},
    )*/



  }

  function handleCloseButtonErros() {
    setShowModalErros(false)
    setFails([])
    setLoading(false)
    setTextSubmmit('Enviar')
  }

  function imageSelected(key) {
    setImage(null);

    setShowModal(true)
    const data = {
      key: key,
      path: array[key]
    }
    setImage(data);



  }

  function handleRemoveFotos() {
    setLoading(true)
    setImageText(array.length)
    array.splice(image.key, 1)
    setShowModal(false)
    setLoading(false)

    if (array.length < 1) {
      setImageText(null)
    }
  }


  function handleCloseButton() {
    setShowModal(false);
  }



  const routeFinalizarCq = async () => {
    setTextSubmmit('')
    setLoading(true);

    if (fotos == null) {

      Alert.alert("Por favor insira as imagens!");
      setLoading(false);
      setTextSubmmit('Enviar')
      return;

    } else {

      let formData = new FormData();

      var i;
      for (i = 0; i < fotos.length; i++) {

        var url = fotos[i].uri;
        var nameImage = url.substring(url.lastIndexOf('/') + 1) //fotos[i].name;
        formData.append('patch[]', { type: 'image/jpg', uri: url, name: nameImage });
      }

      const data = new Date();

      var date = data.getDate();
      var month = data.getMonth() + 1;
      var year = data.getFullYear();
      var hora = data.getHours();          // 0-23
      var min = data.getMinutes();        // 0-59
      var seg = data.getSeconds();        // 0-59

      const dataBaixa = `${year}-${month}-${date} ${hora}:${min}:${seg}`;


      formData.append('pon', reparoInfo.pon);
      formData.append('instancia', reparoInfo.instancia);
      formData.append('armario', reparoInfo.armario);
      formData.append('cidade', reparoInfo.cidade);
      formData.append('cluster', reparoInfo.cluster);
      formData.append('data_baixa', dataBaixa);
      formData.append('usuario_baixa', user.name);

      formData.append('conexao_cto', checkcto);
      formData.append('trajeto_drop_externo', checkTrajeto);
      formData.append('drop_interno', checkDropInterno);
      formData.append('cordao_optico', checkCordaoOptico);
      formData.append('rede_interna', checkRedeInterna);
      formData.append('navegacao_velocidade', checkNavegacao);
      formData.append('iptv', checkIptv);
      formData.append('voip', checkVoip);
      formData.append('orientacao_cliente', checkOrientacao);
      formData.append('satisfacao_cliente', checkSatisfacao);
      formData.append('obs_baixa', obsGeral);
      formData.append('status', "FECHADO");



      const response = await Api.registrarCq(formData);


      if (response.data.fails) {
        setLoading(false)
        if (response.data.fails.conexao_cto) {
          fails.push(response.data.fails.conexao_cto)
        }
        if (response.data.fails.trajeto_drop_externo) {
          fails.push(response.data.fails.trajeto_drop_externo)
        }
        if (response.data.fails.drop_interno) {
          fails.push(response.data.fails.drop_interno)
        }
        if (response.data.fails.cordao_optico) {
          fails.push(response.data.fails.cordao_optico)
        }
        if (response.data.fails.rede_interna) {
          fails.push(response.data.fails.rede_interna)
        }
        if (response.data.fails.navegacao_velocidade) {
          fails.push(response.data.fails.navegacao_velocidade)
        }

        if (response.data.fails.orientacao_cliente) {
          fails.push(response.data.fails.orientacao_cliente)
        }

        if (response.data.fails.iptv) {
          fails.push(response.data.fails.iptv)
        }

        if (response.data.fails.voip) {
          fails.push(response.data.fails.voip)
        }

        if (response.data.fails.satisfacao_cliente) {
          fails.push(response.data.fails.satisfacao_cliente)
        }

        if (response.data.fails.obs_baixa) {
          fails.push(response.data.fails.obs_baixa)
        }

        if (response.data.fails.patch) {
          fails.push(response.data.fails.patch)
        }

        setShowModalErros(true)
      }


      if (response.data.message && response.status == 200) {
        nav.reset({
          routes: [{ name: 'Home', params: response.data }]
        });
      }

      if (response.status == 400) {
        nav.reset({
          routes: [{ name: 'Login' }]
        });
      }

      if (response.status == 500) {
        setLoading(false);
        setTextSubmmit('Enviar')
        Alert.alert('Erro no servidor!')
      }

      if (response.message) {
        setLoading(false);
        setTextSubmmit('Enviar')
        Alert.alert(response.message)
      }

    }




  }


  useMemo(() => {

  }, [array, fotos, image, imageText])

  useEffect(() => {
    getReparo()
    setArray([])
    setLoading(false)
    setTextSubmmit('Enviar')
    setfotos(null)
    setImage(null)
    setImageText(null)
  }, [route]);

  return (

    <ThemeProvider>
      <Container>

        <Header />

        <Box>
          <Title>ID:</Title>
          <Item>{reparoInfo.id}</Item>
          <Title>PON:</Title>
          <Item>{reparoInfo.pon}</Item>
          <Title>INSTANCIA:</Title>
          <Item>{reparoInfo.instancia}</Item>
        </Box>


        <ScrollView>

          <SafeAreaView>

            <Div m={10} style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 15 }}>CONEXAO CTO - DGOI - SCDOI</Text>
              <Radio.Group onChange={setCheckCto} row style={{ marginTop: 10, marginLeft: 50, marginRight: 50 }}>
                {["NOK", "OK"].map((item, key) => (
                  <Radio value={item} key={key}  >
                    {({ checked }) => (
                      <Div style={{ width: "70%", margin: 10, padding: 10 }}
                        bg={checkcto && checked ? "#00BFFF" : "blue100"}
                        px="xl"
                        py="md"
                        mr="md"
                        rounded="circle"
                      >
                        <Text color={checkcto && checked ? "white" : "gray800"} >{item}</Text>

                      </Div>
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </Div>

            <Div m={10} style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 15 }}>TRAJETO DROP EXTERNO</Text>
              <Radio.Group onChange={setCheckTrajeto} row style={{ marginTop: 10, marginLeft: 50, marginRight: 50 }}>
                {["NOK", "OK"].map((item, key) => (
                  <Radio value={item} key={key}  >
                    {({ checked }) => (
                      <Div style={{ width: "70%", margin: 10, padding: 10 }}
                        bg={checkTrajeto && checked ? "#00BFFF" : "blue100"}
                        px="xl"
                        py="md"
                        mr="md"
                        rounded="circle"
                      >
                        <Text color={checkTrajeto && checked ? "white" : "gray800"} >{item}</Text>

                      </Div>
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </Div>

            <Div m={10} style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 15 }}>DROP INTERNO</Text>
              <Radio.Group onChange={setCheckDropInterno} row style={{ marginTop: 10, marginLeft: 50, marginRight: 50 }}>
                {["NOK", "OK"].map((item, key) => (
                  <Radio value={item} key={key}  >
                    {({ checked }) => (
                      <Div style={{ width: "70%", margin: 10, padding: 10 }}
                        bg={checkDropInterno && checked ? "#00BFFF" : "blue100"}
                        px="xl"
                        py="md"
                        mr="md"
                        rounded="circle"
                      >
                        <Text color={checkDropInterno && checked ? "white" : "gray800"} >{item}</Text>

                      </Div>
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </Div>

            <Div m={10} style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 15 }}>ACOMODACAO CORDAO OPTICO</Text>
              <Radio.Group onChange={setCheckCordaoOptico} row style={{ marginTop: 10, marginLeft: 50, marginRight: 50 }}>
                {["NOK", "OK"].map((item, key) => (
                  <Radio value={item} key={key}  >
                    {({ checked }) => (
                      <Div style={{ width: "70%", margin: 10, padding: 10 }}
                        bg={checkCordaoOptico && checked ? "#00BFFF" : "blue100"}
                        px="xl"
                        py="md"
                        mr="md"
                        rounded="circle"
                      >
                        <Text color={checkCordaoOptico && checked ? "white" : "gray800"} >{item}</Text>

                      </Div>
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </Div>

            <Div m={10} style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 15 }}>REDE INTERNA</Text>
              <Radio.Group onChange={setCheckRedeInterna} row style={{ marginTop: 10, marginLeft: 50, marginRight: 50 }}>
                {["NOK", "OK"].map((item, key) => (
                  <Radio value={item} key={key}  >
                    {({ checked }) => (
                      <Div style={{ width: "70%", margin: 10, padding: 10 }}
                        bg={checkRedeInterna && checked ? "#00BFFF" : "blue100"}
                        px="xl"
                        py="md"
                        mr="md"
                        rounded="circle"
                      >
                        <Text color={checkRedeInterna && checked ? "white" : "gray800"} >{item}</Text>

                      </Div>
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </Div>

            <Div m={10} style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 15 }}>IPTV</Text>
              <Radio.Group onChange={setCheckIptv} row style={{ marginTop: 10, marginLeft: 115, marginRight: 115 }}>
                {["NOK", "OK", "NA"].map((item, key) => (
                  <Radio value={item} key={key}  >
                    {({ checked }) => (
                      <Div style={{ width: "80%", margin: 10, padding: 10 }}
                        bg={checkIptv && checked ? "#00BFFF" : "blue100"}
                        px="xl"
                        py="md"
                        mr="md"
                        rounded="circle"
                      >
                        <Text color={checkIptv && checked ? "white" : "gray800"} >{item}</Text>

                      </Div>
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </Div>

            <Div m={10} style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 15 }}>VOIP - FAZ E RECEBE TODAS OPERADORAS</Text>
              <Radio.Group onChange={setCheckVoip} row style={{ marginTop: 10, marginLeft: 50, marginRight: 50 }}>
                {["NOK", "OK"].map((item, key) => (
                  <Radio value={item} key={key}  >
                    {({ checked }) => (
                      <Div style={{ width: "70%", margin: 10, padding: 10 }}
                        bg={checkVoip && checked ? "#00BFFF" : "blue100"}
                        px="xl"
                        py="md"
                        mr="md"
                        rounded="circle"
                      >
                        <Text color={checkVoip && checked ? "white" : "gray800"} >{item}</Text>

                      </Div>
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </Div>

            <Div m={10} style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 15 }}>NAVEGACAO / VELOCIDADE CONTRATADA</Text>
              <Radio.Group onChange={setCheckNavegacao} row style={{ marginTop: 10, marginLeft: 50, marginRight: 50 }}>
                {["NOK", "OK"].map((item, key) => (
                  <Radio value={item} key={key}  >
                    {({ checked }) => (
                      <Div style={{ width: "70%", margin: 10, padding: 10 }}
                        bg={checkNavegacao && checked ? "#00BFFF" : "blue100"}
                        px="xl"
                        py="md"
                        mr="md"
                        rounded="circle"
                      >
                        <Text color={checkNavegacao && checked ? "white" : "gray800"} >{item}</Text>

                      </Div>
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </Div>

            <Div m={10} style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 15 }}>ORIENTACAO CLIENTE</Text>
              <Radio.Group onChange={setCheckOrientacao} row style={{ marginTop: 10, marginLeft: 50, marginRight: 50 }}>
                {["NOK", "OK"].map((item, key) => (
                  <Radio value={item} key={key}  >
                    {({ checked }) => (
                      <Div style={{ width: "70%", margin: 10, padding: 10 }}
                        bg={checkOrientacao && checked ? "#00BFFF" : "blue100"}
                        px="xl"
                        py="md"
                        mr="md"
                        rounded="circle"
                      >
                        <Text color={checkOrientacao && checked ? "white" : "gray800"} >{item}</Text>

                      </Div>
                    )}
                  </Radio>
                ))}
              </Radio.Group>
            </Div>


            <Div m={10} style={{ display: "flex", alignItems: "center" }}>
              <Text style={{ fontSize: 15 }}>SATISFACAO CLIENTE</Text>
              <ScrollView horizontal={true}>
                <Radio.Group onChange={setCheckSatisfacao} row style={{ marginTop: 10, marginLeft: 100, marginRight: 100 }}>

                  {["OTIMA", "BOA", "REGULAR", "PESSIMA"].map((item, key) => (
                    <Radio value={item} key={key}  >
                      {({ checked }) => (
                        <Div style={{ width: 100, margin: 10, padding: 10 }}
                          bg={checkSatisfacao && checked ? "#00BFFF" : "blue100"}
                          px="xl"
                          py="md"
                          mr="md"
                          rounded="circle"
                        >
                          <Text fontSize={10} color={checkSatisfacao && checked ? "white" : "gray800"} >{item}</Text>
                        </Div>
                      )}
                    </Radio>
                  ))}

                </Radio.Group>
              </ScrollView>

              <InputText multiline numberOfLines={4} value={obsGeral} placeholder="Observacao geral.."
                onChangeText={(text) => setObsGeral(text)} />

              <ScrollView horizontal={true}>
                <ContentImage>
                  <ContentItems onPress={imagePickerCall}>
                    {
                      array.length > 0 && array.length <= 5 &&
                      <ImageCq source={ImagePlaceHolder} />
                    }

                    {
                      array.length == 0 &&
                      <ImageCqPrincipal source={ImagePlaceHolder} />
                    }
                  </ContentItems>

                  {
                    array.map((item, key) => (
                      <ContentItems key={key} onPress={() => imageSelected(key)}>
                        <ImageCq source={{ uri: array ? item.uri : ImagePlaceHolder }} />
                      </ContentItems>
                    ))
                  }

                </ContentImage>
              </ScrollView>
              {
                imageText &&
                <TextImage>Selecione uma imagem a ser removida</TextImage>

              }
              <Text style={{ color: "#778899", marginTop: -10 }}>{array.length > 1 ? array.length + " " + "Fotos adicionadas" : array.length + " " + "Foto adicionada"} </Text>
            </Div>

            <Button>
              <ButtonText onPress={routeFinalizarCq}>{textSubmmit}
                {loading &&
                  <LoadingIcon size="large" color="#778899" />
                }
              </ButtonText>
            </Button>

          </SafeAreaView>
        </ScrollView>

        <ModalErros
          transparent={true}
          visible={showModalErros}
          animationType="slide"
        >
          <ModalAreaErros>
            <ModalBodyErros>
              <CloseButton onPress={handleCloseButtonErros}>
                <IconcloseImage source={IconcloseModal} />
              </CloseButton>
              {
                fails.length !== 0 &&
                fails.map((item, index) => (
                  <ErrorMessage key={index}>{item}</ErrorMessage>
                ))

              }
            </ModalBodyErros>
          </ModalAreaErros>
        </ModalErros>

        <Modal
          transparent={true}
          visible={showModal}
          animationType="slide"
        >
          <ModalArea>
            {image &&
              <ModalBody>

                <CloseButton onPress={handleCloseButton}>
                  <IconcloseImage source={IconcloseModal} />
                </CloseButton>

                <ContentImageModal style={{ marginTop: 15, justifyContent: "center", alignItems: "center" }}>


                  <ImageSelected source={{ uri: image.path.uri }} />


                </ContentImageModal>
                <ButtonRemove>
                  <ButtonText onPress={handleRemoveFotos}>Remover</ButtonText>
                </ButtonRemove>

              </ModalBody>
            }
          </ModalArea>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}

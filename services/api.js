import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";


//192.168.43.35
//192.168.15.110

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

const url = "http://127.0.0.1:8000/api";
const urlAssets = "http://127.0.0.1:8000";

export default {

    imageAvatar: {
        urlAssets
    },

    checkToken: async (token) => {

        try {
            const response = await api.post("refresh", { token: token });
            return response;
        } catch (error) {
            let erro = {
                status: 400
            }
            return erro;
            //console.log('Whoops! Houve um erro.', error.message || error)
        }


    },

    signIn: async (matricula, password) => {

        try {
            const response = await api.post("login", { matricula, password });

            return response.data;
        } catch (err) {
            return JSON.stringify(err)
        }
    },

    signUp: async (data) => {

        try {
            const response = await axios(`${url}/register`, {
                method: "post",
                data: data,
                headers: {
                    Accept: 'aplication/json',
                    'Content-Type': 'multipart/form-data',
                },

            });

            return response.data;

        } catch (err) {
            return JSON.stringify(err)
        }
    },

    logout: async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await api.post("logout", { token });
            await AsyncStorage.removeItem('token');
            return response.data;
        } catch (err) {
            return JSON.stringify(err)
        }
    },

    user: async () => {
        const token = await AsyncStorage.getItem('token');
        try {
            const response = await api.post("user", { token });

            return response.data;
        } catch (err) {
            return JSON.stringify(err)
        }
    },


    getReparos: async (lat = null, long = null) => {

        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                "lat": lat,
                "long": long,
                "token": token
            };

            const response = await api.get("reparos", { params });

            return response;
        } catch (err) {
            return JSON.stringify(err)
        }
    },


    getReparo: async (id = null) => {
        const token = await AsyncStorage.getItem('token');
        try {

            const response = await api.get(`reparo/${id}?token=${token}`);

            return response;
        } catch (err) {
            return JSON.stringify(err)
        }
    },



    registrarCq: async (data) => {


        const token = await AsyncStorage.getItem('token');

        try {
            const response = await axios(`${url}/registrar-cq?token=${token}`, {
                method: 'POST',
                data: data,
                headers: {
                    Accept: 'aplication/json',
                    'Content-Type': 'multipart/form-data',
                },


            });

            return response;
        } catch (err) {
            return err;
        }

    },


    sendLocation: async (name, user_id, lat, long) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                "name": name,
                "user_id": user_id,
                "latitude": long, //para mostrar no mapa do mapbox precisa passar invertido
                "longitude": lat,
                "token": token

            };


            const response = await api.post('send-location', params);
            return response;

        } catch (err) {
            return JSON.stringify(err)
        }

    },


    getClusters: async () => {

        try {
            const response = await api.get('localidades/get-clusters');

            return response;
        } catch (err) {
            return JSON.stringify(err)
        }

    },


    getPapeis: async () => {

        try {
            const response = await api.get('get-papeis');

            return response;
        } catch (err) {
            return JSON.stringify(err)
        }

    }



};
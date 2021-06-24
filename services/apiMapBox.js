import axios from "axios";


const api = axios.create({
    baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
});

const ACCESS_TOKEN_MAP_BOX =
    "access_token=pk.eyJ1IjoicGFibG9yZHMiLCJhIjoiY2tpYWo0dnljMGxldzJ3bXZxMXg3Z3FrbCJ9.bYhImpwMX8z7MgCsUxdybg";

export default {

    handleLocationCity: async (long = null, lat = null) => {
        
        try {
            const response = await api.get(`${long},${lat}.json?${ACCESS_TOKEN_MAP_BOX}`);
            console.log(response)
            let res = response.data.features;
            let data = res.map(function (item, indice) {
                return item.text;

            });

            return data;

        } catch (err) {
            return JSON.stringify(err)
        }


    }



};




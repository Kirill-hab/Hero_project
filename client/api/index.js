import axios from 'axios';

import { apiPrefix } from '../../config.json';

export default {
    listHeroes() {
        return axios.get(`${apiPrefix}/heroes`);
    },

    updateHero(id, data){
        return axios.patch(`${apiPrefix}/heroes/${id}`, data);
    },

    createHero(data) {
        return axios.post(`${apiPrefix}/heroes`, data);
    },

    deleteHero(id) {
        return axios.delete(`${apiPrefix}/heroes/${id}`);
    }
}

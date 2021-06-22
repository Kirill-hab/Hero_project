import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

export default class HeroActions {
    static loadHeroes() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_HEROES_REQUEST
        });

        api.listHeroes()
            .then(({data}) => {
                    AppDispatcher.dispatch({
                        type: Constants.LOAD_HEROES_SUCCESS,
                        heroes: data
                    })
                }
            )
            .catch(err =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_HEROES_FAIL,
                    error: err
                })
            );
    }

    static createHero(data) {
        api.createHero(data)
            .then(() =>
                this.loadHeroes()
            )
            .catch(err =>
                console.error(err)
            );
    }

    static updateHero(id, data) {
        api.updateHero(id, data)
            .then(() => this.loadHeroes())
            .catch(err => console.error(err))
    }

    static deleteHero(id) {
        api.deleteHero(id)
            .then(() =>
                this.loadHeroes()
            )
            .catch(err =>
                console.error(err)
            );
    }
};
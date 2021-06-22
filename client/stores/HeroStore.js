import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../constants/AppConstants";

const EventEmitter = require("events");

const CHANGE_EVENT = 'change';

let _heroes = [];
let _loadingError = null;
let _isLoading = true;

function formatHero(hero) {
    return {
        id: hero._id,
        ...hero
    };
}
const HeroStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getHeroes() {
        return _heroes;
    },

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_HEROES_REQUEST: {
            _isLoading = true;

            HeroStore.emitChange();
            break;
        }

        case AppConstants.LOAD_HEROES_SUCCESS: {
            _isLoading = false;
            _heroes = action.heroes.map( formatHero );
            _loadingError = null;

            HeroStore.emitChange();
            break;
        }

        case AppConstants.LOAD_HEROES_FAIL: {
            _loadingError = action.error;

            HeroStore.emitChange();
            break;
        }

        default: {
            console.log('err');
        }
    }
});

export default HeroStore;

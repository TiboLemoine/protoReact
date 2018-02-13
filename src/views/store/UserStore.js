import UserService from "../service/UserService";
import emitter from '../utils/eventEmitter'
import {events} from "../utils/eventsIndex";
import logger from "../utils/logger";

class UserStore {
    static instance;

    constructor() {
        if (UserStore.instance) {
            return UserStore.instance
        }
        UserStore.instance = this;
    }

    checkUserValidity = (username) => {
        if (!username) {
            emitter.emit(this, events.EMPTY_USER)
            //TODO : notify error
        } else {
            UserService.getUser(username)
                .then(([error, response]) => {
                    logger.debug("UserService", error, response);
                    if (error || !response) {
                        emitter.emit(this, events.ERROR_USER, username)
                    } else {
                        emitter.emit(this, events.SUCCESS_USER, username)
                    }
                })
        }
    }
}

export default UserStore = new UserStore()
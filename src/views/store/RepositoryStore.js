import RepositoryService from "../service/RepositoryService";
import {events} from "../utils/eventsIndex";
import emitter from "../utils/eventEmitter";
import logger from "../utils/logger";

class RepositoryStore {
    static instance;

    constructor() {
        if (RepositoryStore.instance) {
            return RepositoryStore.instance
        }
        RepositoryStore.instance = this;
    }

    getRepositories = (username, forceRefresh) => {
        if (!username) {
            emitter.emit(this, events.EMPTY_USER);
        } else {
            RepositoryService.getRepositories(username)
                .then(([error, response]) => {
                    logger.debug("RepoService", error, response);
                    if (error || !response) {
                        logger.debug("RepoService", "Send error");
                        emitter.emit(this, events.ERROR_REPOSITORY)
                    } else {
                        //TODO : notify success
                    }
                })
        }
    }
}

export default RepositoryStore = new RepositoryStore()